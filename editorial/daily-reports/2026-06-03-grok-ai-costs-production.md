# Informe editorial — Costes reales de IA en producción

Fecha: 2026-06-03

Fuente: análisis aportado por Grok sobre señales de X de 2025-2026 relacionadas con costes reales de IA en producción.

## Lectura editorial

La señal principal es contraintuitiva: aunque el precio por token baja, las facturas pueden subir.

La causa no suele ser un modelo caro aislado. Suele ser arquitectura:

- workflows agentic con muchas llamadas;
- RAG que infla contexto;
- retries sin límite;
- cron jobs olvidados;
- cache hit rate bajo;
- llamadas rutinarias enviadas al modelo más caro;
- prompts con prefijos inestables que rompen prompt caching;
- falta de límites por usuario, API key, modelo o feature.

## Decisión editorial

El libro debe tratar FinOps de IA como arquitectura, no como contabilidad.

La frase guía:

> La factura LLM es arquitectura diferida.

Si el sistema no mide profundidad de llamadas, tokens por etapa, hit rate de caché, retries y coste por feature, el equipo no controla el producto.

## Cambios recomendados

1. Ampliar el capítulo de costes con call depth, retries, context bloat y caching.
2. Ampliar observabilidad con campos específicos de coste.
3. Añadir laboratorio local de simulación de costes.
4. Añadir etiquetas semánticas: AI FinOps, semantic caching, prompt caching, token budgets, AI gateway.

## Riesgo editorial

No convertir esto en una tabla de precios que envejece.

El contenido duradero es el método:

- medir por feature;
- limitar presupuesto;
- enrutar por complejidad;
- cachear con cuidado;
- podar contexto;
- detectar retries y jobs olvidados;
- revisar la factura como señal de diseño.

