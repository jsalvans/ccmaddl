const error = document.getElementById('error');
const main = document.getElementById('main');
const taulaCapitols = document.getElementById('taulaCapitols');
const taulaFooter = document.getElementById('taulaFooter');
const loader = document.getElementById('loader');

const obtenirEpisodis = (url) => {
  main.style.display = 'none';
  error.style.display = 'none';
  loader.style.display = 'inline-block';

  return new Promise((resolve, reject) => {
    fetch('/', {
      method: 'POST',
      body: url
    }).then(res => {
      if (res.status === 400) {
        error.textContent = '⚠ La url no es vàlida';
        error.style.display = 'block';
        setTimeout(() => {
          error.style.display = 'none';
        }, 3000);
        throw new Error('400');
      }
      loader.style.display = 'none';
      return res.json();
    }).then(json => resolve(json))
      .catch(err => {
        loader.style.display = 'none';
        console.error(err);
        reject(err);
      });
  });
};

const crearTaula = (capitols) => {
  let tbody = document.getElementById('tbody');
  if (tbody) taulaCapitols.removeChild(tbody);

  let tbodyFooter = document.getElementById('tbodyFooter');
  if (tbodyFooter) taulaFooter.removeChild(tbodyFooter);

  tbody = document.createElement('tbody');
  tbody.id = 'tbody';
  for (const capitol of capitols) {
    const trBody = document.createElement('tr');

    const tdPrograma = document.createElement('td');
    tdPrograma.textContent = capitol.programa;
    trBody.appendChild(tdPrograma);

    const tdTemporada = document.createElement('td');
    tdTemporada.textContent = capitol.temporada;
    tdTemporada.style.textAlign = 'center';
    trBody.appendChild(tdTemporada);

    const tdCapitolTemporada = document.createElement('td');
    tdCapitolTemporada.textContent = capitol.capitol_temporada;
    tdCapitolTemporada.style.textAlign = 'center';
    trBody.appendChild(tdCapitolTemporada);

    const tdCapitolPrograma = document.createElement('td');
    tdCapitolPrograma.textContent = capitol.capitol;
    tdCapitolPrograma.style.textAlign = 'center';
    trBody.appendChild(tdCapitolPrograma);

    const tdMiniatura = document.createElement('td');
    const imgMiniatura = document.createElement('img');
    imgMiniatura.src = capitol.url_imatge;

    tdMiniatura.appendChild(imgMiniatura);
    trBody.appendChild(tdMiniatura);

    const tdTitol = document.createElement('td');
    tdTitol.textContent = capitol.titol;
    trBody.appendChild(tdTitol);

    const tdDescripcio = document.createElement('td');
    tdDescripcio.textContent = capitol.descripcio;
    trBody.appendChild(tdDescripcio);

    const tdVideo = document.createElement('td');
    const aVideo = document.createElement('button');
    aVideo.id = `video-${capitol.id}`;
    aVideo.addEventListener('click', async (e) => {
      e.preventDefault();
      await descarregarEspisodi(capitol);
    });
    aVideo.textContent = '⬇ Baixar';

    tdVideo.appendChild(aVideo);
    tdVideo.style.textAlign = 'center';
    trBody.appendChild(tdVideo);

    tbody.appendChild(trBody);
  }

  tbodyFooter = document.createElement('tbody');
  tbodyFooter.id = 'tbodyFooter';

  const trFooter = document.createElement('tr');
  const tdFooterTotal = document.createElement('td');
  tdFooterTotal.colSpan = 7;
  tdFooterTotal.style.textAlign = 'right';
  tdFooterTotal.textContent = `Total: ${capitols.length}`;
  trFooter.appendChild(tdFooterTotal);

  const tdFooterVideo = document.createElement('td');
  const aVideo = document.createElement('button');
  aVideo.addEventListener('click', async (e) => {
    e.preventDefault();
    aVideo.textContent = 'Descarregant...';
    aVideo.disabled = true;
    await descarregarEspisodis(capitols);
    aVideo.textContent = '⬇ Baixar tots';
    aVideo.disabled = false;
  });
  aVideo.textContent = '⬇ Baixar tots';
  tdFooterVideo.appendChild(aVideo);
  tdFooterVideo.style.textAlign = 'center';
  trFooter.appendChild(tdFooterVideo);

  tbodyFooter.appendChild(trFooter);

  taulaCapitols.appendChild(tbody);
  taulaFooter.appendChild(tbodyFooter);
  main.style.display = 'block';
};

const descarregarEspisodis = async (capitols, subtitols = false) => {
  for (const capitol of capitols) {
    try {
      await descarregarEspisodi(capitol, subtitols);
    } catch (e) {
      console.error(e);
      alert(`Error al descarregar el capitol S${capitol.temporada}E${capitol.capitol_temporada}`);
    }
  }
};

const descarregarEspisodi = async (capitol, subtitols = false, retry = 0) => {
  const aVideo = document.getElementById(`video-${capitol.id}`);
  aVideo.textContent = 'Descarregant...';
  aVideo.style.backgroundColor = 'greenyellow';
  aVideo.disabled = true;

  try {
    const url = subtitols ? capitol.url_subtitols : capitol.url_video;
    if (!url) return;
    const videoBlob = await fetch(url)
      .then(res => {
        return res.blob();
      })
    const href = window.URL.createObjectURL(videoBlob);
    const a = document.createElement("a");

    const nomFitxer = `${capitol.programa} ${capitol.capitol} - S${capitol.temporada}E${capitol.capitol_temporada}`;
    a.download = nomFitxer;
    a.href = href;
    a.click();
    a.href = "";

    aVideo.textContent = '✔ Completat';
    aVideo.disabled = false;
  } catch (e) {
    if (retry > 3) {
      aVideo.textContent = '⚠ Error';
      aVideo.disabled = false;
      aVideo.style.backgroundColor = 'red';
      throw e;
    }
    aVideo.textContent = '⚠ Reintentant';
    aVideo.style.background = 'orange !important';
    aVideo.style.backgroundColor = 'orange !important';
    await timeOut(5);
    await descarregarEspisodi(capitol, subtitols, retry + 1);
  }
};

const timeOut = (secs) => new Promise((res) => setTimeout(res, secs * 1000));

document.getElementById("cercar").addEventListener("click", async (_e) => {
  const url = document.getElementById("inputurlcapitol").value;
  const episodis = await obtenirEpisodis(url);
  crearTaula(episodis);
});
