# Web del libro

Web estatica para Vercel del libro **De preguntar a construir**.

## Desarrollo local

```bash
cd site
npm install
npm run dev
```

La web genera `public/data/chapters.json` y `public/data/radar.json` desde:

- `../book/chapters/`
- `../knowledge/items/`
- `../releases/latest/`

## Build para Vercel

Desde la raiz del repo:

```bash
npm run site:build
```

Vercel puede usar el `vercel.json` de la raiz:

```json
{
  "buildCommand": "cd site && npm install && npm run build",
  "outputDirectory": "site/out",
  "framework": "nextjs"
}
```

## Actualizar contenido

1. Edita o anade capitulos en `book/chapters/`.
2. Ejecuta `npm run daily` para regenerar radar/PDF.
3. Ejecuta `npm run site:build`.
4. Sube cambios al repo.

La pagina de descargas busca el PDF en `site/public/downloads/de-preguntar-a-construir.pdf`, que el generador copia desde `releases/latest`.

