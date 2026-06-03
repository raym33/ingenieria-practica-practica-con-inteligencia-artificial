# Lab — Evaluación mínima de retrieval RAG

Este lab muestra cómo evaluar la parte de recuperación antes de culpar al modelo generador.

La idea es simple: para cada pregunta sabemos qué documentos deberían aparecer. El script simula un retriever léxico pequeño y calcula métricas básicas.

## Ejecutar

```bash
python3 labs/rag-retrieval-eval/retrieval_eval.py
```

## Qué mide

- `Recall@K`: si al menos una fuente esperada aparece entre los K resultados.
- `MRR`: qué tan arriba aparece la primera fuente esperada.
- contaminación de permisos: si aparece un documento de otro tenant.

## Por qué importa

Si el retrieval no trae las fuentes correctas, el LLM no puede responder bien.

Antes de cambiar modelo, prompt o reranker, mide:

- preguntas frecuentes;
- fuentes esperadas;
- resultados recuperados;
- errores por permisos;
- documentos obsoletos;
- chunks ruidosos.

## Extensiones

- Cambiar scoring léxico por embeddings.
- Añadir BM25.
- Añadir reranker.
- Separar métricas por tenant, idioma o tipo de documento.
- Añadir freshness y timestamps.

