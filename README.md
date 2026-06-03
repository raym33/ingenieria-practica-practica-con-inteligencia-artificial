# De preguntar a construir - libro vivo local

Este proyecto convierte el manuscrito en un sistema editorial local:

- ingiere fuentes RSS, GitHub releases, arXiv y una bandeja manual;
- clasifica novedades con Ollama cuando esta disponible;
- genera informes editoriales y propuestas de cambios;
- recompila el libro a PDF con Pandoc + Tectonic;
- publica una release local y un dashboard HTML.

## Flujo rapido

```bash
cd living-book
npm run daily
```

## Web para Vercel

La carpeta `site/` contiene una web estatica moderna para estudiar el libro online:

```bash
npm run site:dev
npm run site:build
```

Vercel puede publicar el repo usando `vercel.json`, con salida en `site/out`.

Para una pasada mas rapida:

```bash
MAX_AI_CLASSIFY=2 MAX_AI_PROPOSALS=2 npm run daily
```

Para usar el modelo grande solo cuando quieras una revision mas profunda:

```bash
OLLAMA_MODEL=qwen3.6:27b MAX_AI_CLASSIFY=6 MAX_AI_PROPOSALS=6 npm run daily
```

Salida principal:

- `releases/latest/`: ultima edicion local.
- `editorial/daily-reports/`: informes diarios.
- `editorial/change-proposals/`: propuestas estructuradas.
- `knowledge/items/`: base de conocimiento en JSON.
- `dashboard/index.html`: panel local.

## Anadir una fuente manual

```bash
npm run add -- "Titulo de la novedad" "https://url" "Notas o resumen"
npm run daily
```

Esto sirve para posts de X, configuraciones que te funcionan, pruebas con LM Studio, benchmarks propios o notas que no tengan RSS.

## Automatizacion diaria en macOS

```bash
chmod +x install-launchd.sh
./install-launchd.sh
```

Esto instala un LaunchAgent local que ejecuta `npm run daily` cada dia a las 08:30.

## Politica editorial recomendada

El sistema genera borradores y propuestas. Para vender el libro, conviene que las releases mensuales estables pasen revision humana antes de publicarse fuera del Mac.
