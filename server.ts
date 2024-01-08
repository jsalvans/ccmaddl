import { Capitol, Enllac, Item, ProgramaQuery, Sx3Capitol } from "./types.d.ts";

const CCMA_VIDEO_URL =
  "https://api-media.ccma.cat/pvideo/media.jsp?media=video&versio=vast&profile=pc&producte=sx3&broadcast=false&format=dm&idint=";
const CCMA_PROGRAMA_URL =
  "https://api.ccma.cat/videos?version=2.0&_format=json&tipus_contingut=PPD&ordre=capitol&programatv_id=";

const obtenirInfoCapitol = async (
  videoId: string,
  retry = 0,
): Promise<Capitol | null> => {
  const url = CCMA_VIDEO_URL + videoId;
  try {
    const response = await fetch(url);
    const data: Sx3Capitol = await response.json();

    const capitol: Capitol = {
      id: data.informacio.id,
      slug: data.informacio.slug,
      programa_id: data.informacio.programa_id,
      programa: data.informacio.programa,
      capitol: data.informacio.capitol,
      titol: data.informacio.titol,
      descripcio: data.informacio.descripcio,
      url_imatge: data.imatges.url,
    };

    const tempCap = data.informacio.slug.split("-")[0];
    if (tempCap.match(/t(\d+)xc(\d+)/)) {
      const [tempT, tempC] = tempCap.split("x");
      capitol.temporada = tempT.replace("t", "");
      capitol.capitol_temporada = tempC.replace("c", "");
    }

    const url_video = data.media.url.reduce((a: Enllac, b: Enllac): Enllac => {
      const resA = obtenirResolucioNum(a.label);
      const resB = obtenirResolucioNum(b.label);
      return resA > resB ? a : b;
    })?.file;
    capitol.url_video = url_video;

    const url_subtitols = data.subtitols?.find((s) => s.iso === "ca")?.url;
    capitol.url_subtitols = url_subtitols;

    return capitol;
  } catch (error) {
    if (retry > 3) {
      console.error(error, url);
      return null;
    }
    return obtenirInfoCapitol(videoId, retry + 1);
  }
};

const obtenirCapitolsPrograma = async (
  programaId: number,
  ultimCapitol = 0,
  pagina = 1,
  retry = 0,
): Promise<number[]> => {
  const url = CCMA_PROGRAMA_URL + programaId + "&pagina=" + pagina;
  try {
    const response = await fetch(url);
    const data: ProgramaQuery = await response.json();
    const capitols = data.resposta.items.item.filter((c) =>
      c.capitol > ultimCapitol
    ).map((c: Item) => c.id);

    if (data.resposta.paginacio.total_pagines > pagina) {
      capitols.push(
        ...(await obtenirCapitolsPrograma(
          programaId,
          ultimCapitol,
          pagina + 1,
        )),
      );
    }
    return capitols;
  } catch (error) {
    if (retry > 3) {
      console.error(error, url);
      return [];
    }
    return obtenirCapitolsPrograma(programaId, ultimCapitol, pagina, retry + 1);
  }
};

const obtenirResolucioNum = (resolucio: string): number => {
  if (!resolucio) return 0;
  let res = Number(resolucio);
  if (!isNaN(res)) return res;
  res = Number(resolucio.replace("p", ""));
  if (!isNaN(res)) return res;
  return 0;
};

const obtenirJsonCapitols = async (
  videoId: string,
): Promise<Capitol[]> => {
  const primerCapitol = await obtenirInfoCapitol(videoId);
  if (!primerCapitol) return [];

  const capitolsId = await obtenirCapitolsPrograma(
    primerCapitol.programa_id,
    primerCapitol.capitol,
  );

  const capitols = [primerCapitol];
  for (const idCapitol of capitolsId) {
    const capitol = await obtenirInfoCapitol(String(idCapitol));
    if (capitol) capitols.push(capitol);
  }
  return capitols;
};

const port = 8000;
Deno.serve({ port }, async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(undefined, { status: 204 });
  }

  const reqUrl = new URL(req.url);
  const path = reqUrl.pathname;

  if (req.method === "GET") {
    if (path === "/favicon.png") {
      return new Response(Deno.readFileSync("./public" + path), {
        status: 200,
        headers: { "content-type": "image/png" },
      });
    }

    if (path === "/main.js") {
      return new Response(Deno.readFileSync("./public" + path), {
        status: 200,
        headers: { "content-type": "text/javascript" },
      });
    }

    if (path === "/style.css") {
      return new Response(Deno.readFileSync("./public" + path), {
        status: 200,
        headers: { "content-type": "text/css" },
      });
    }

    if (path === "/") {
      return new Response(Deno.readFileSync("./public/index.html"), {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    }
    return new Response("Not found", { status: 404 });
  }

  if (req.method !== "POST") {
    return new Response("Not found", { status: 404 });
  }

  let url = await req.text();
  if (!url || (!url.startsWith("https://www.ccma.cat/3cat/") && !url.startsWith("https://www.ccma.cat/tv3/sx3/"))) {
    return new Response("Bad request", { status: 400 });
  }
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  const videoId = url.split("/").pop();
  if (!videoId) {
    return new Response("Bad request", { status: 400 });
  }

  const capitols = await obtenirJsonCapitols(videoId);
  return new Response(JSON.stringify(capitols), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
});
