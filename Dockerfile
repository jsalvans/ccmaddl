FROM denoland/deno:alpine-1.36.0

EXPOSE 8000
WORKDIR /app
USER deno

RUN chown -R deno:deno /app

COPY . .
RUN deno cache --config deno.json *.ts
CMD ["run", "--allow-net", "server.ts"]