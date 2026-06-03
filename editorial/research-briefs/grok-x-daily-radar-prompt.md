# Prompt para Grok/X — Radar diario de IA práctica

Usa este prompt para pedir señales recientes de X que complementen Hugging Face, GitHub, arXiv y blogs oficiales.

```text
Busca en X señales recientes, idealmente de las últimas 24-72 horas, sobre IA aplicada para programadores y builders.

Contexto:
Estoy manteniendo un libro/web vivo llamado "De preguntar a construir", enfocado en construir sistemas reales con IA: modelos, RAG, agentes, tool calling, MCP, modelos locales, hardware, observabilidad, evaluación, costes y producción.

No quiero hype ni una lista de posts sueltos. Quiero patrones accionables y ejemplos concretos que puedan convertirse en:
- noticia breve del radar;
- actualización de capítulo;
- lab ejecutable;
- checklist;
- comparación de herramientas/modelos/hardware.

Devuélveme:

1. Señales fuertes.
2. Señales débiles o dudosas.
3. Configuraciones concretas reportadas por usuarios: hardware, RAM/VRAM, modelo, runtime, velocidad, caso de uso y limitaciones.
4. Herramientas que se repiten: repos, librerías, CLIs, runtimes, frameworks.
5. Problemas de producción repetidos: coste, latencia, fallos, evals, trazas, permisos, seguridad.
6. Modelos nuevos o modelos que estén ganando uso real.
7. Frases literales o ideas repetidas entre builders.
8. Qué deberíamos evitar publicar porque suena a hype o no está suficientemente comprobado.
9. Recomendaciones editoriales concretas para el libro/web.

Además, al final dame un bloque JSON válido con esta forma:

[
  {
    "title": "Título breve de la señal",
    "url": "URL del post o hilo principal si existe",
    "publishedAt": "YYYY-MM-DD",
    "summary": "Resumen en español, 2-4 frases, con cautelas si las hay",
    "tags": ["x", "modelos-locales", "hardware"],
    "relevance": "alta|media|baja",
    "confidence": "alta|media|baja",
    "editorialAction": "guardar_para_contexto|nota_breve|actualizar_seccion|nueva_subseccion|revision_humana",
    "target": "capítulo, lab o sección sugerida"
  }
]

No inventes URLs. Si no puedes verificar una URL concreta, deja "url" vacío y baja la confianza.
```

## Cómo integrarlo

1. Pega el JSON final de Grok en un archivo dentro de `knowledge/manual/`.
2. Cada elemento debe ser un objeto con `title`, `summary`, `url`, `publishedAt` y `tags`.
3. Ejecuta:

```bash
npm run daily
```

Si Grok devuelve un análisis largo además del JSON, guarda el análisis como informe en `editorial/daily-reports/` y el JSON como entrada manual.
