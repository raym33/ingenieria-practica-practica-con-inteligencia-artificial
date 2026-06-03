# Informe editorial — RAG en producción

Fecha: 2026-06-03

Fuente: análisis aportado por Grok sobre señales de X de 2025-2026 relacionadas con RAG en producción.

## Lectura editorial

La señal principal no es "añadir más vectores".

La señal es que RAG de producción deja de ser un pipeline simple y se convierte en un sistema de ingeniería de contexto.

El patrón demo suele ser:

```text
chunking -> embeddings -> vector DB -> top-k -> LLM
```

El patrón de producción añade:

- diseño de corpus;
- metadatos obligatorios;
- permisos;
- búsqueda híbrida;
- filtros;
- reranking;
- compresión;
- freshness;
- evaluación de retrieval;
- observabilidad;
- control de coste y latencia.

## Decisión editorial

El libro debe reforzar RAG como disciplina de `context engineering`.

Un sistema RAG no debe evaluarse solo por la respuesta final. Hay que evaluar:

- si recupera los documentos correctos;
- si filtra por permisos;
- si evita contaminación entre clientes, empresas o departamentos;
- si mantiene contexto jerárquico;
- si cita fuentes reales;
- si responde "no lo sé" cuando el contexto no basta;
- si el coste y la latencia siguen siendo aceptables.

## Cambios recomendados

1. Ampliar RAG avanzado con una sección de producción centrada en context engineering.
2. Añadir checklist de técnicas de retrieval engineering.
3. Añadir métricas mínimas: Recall@K, MRR, precisión, groundedness, faithfulness y hallucination rate.
4. Añadir laboratorio local para medir retrieval con datos sintéticos.
5. Reforzar metadata filtering como control de permisos y ruido.

## Riesgo editorial

Si el libro trata RAG como "base vectorial + prompt", se quedará al nivel de demo.

El diferencial debe ser enseñar a diagnosticar y operar RAG:

- corpus;
- permisos;
- retrieval;
- reranking;
- evaluación;
- observabilidad;
- coste.

