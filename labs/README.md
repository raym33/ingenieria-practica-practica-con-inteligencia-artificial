# Labs del libro

Este directorio es el companion práctico de **De preguntar a construir**.

La regla editorial es sencilla: cuando un capítulo introduce una decisión importante de ingeniería, el repositorio debe ofrecer una forma de practicarla, medirla o discutirla con evidencia.

## Cómo usar los labs

1. Lee el capítulo relacionado.
2. Ejecuta el lab localmente.
3. Cambia datos, prompts o criterios.
4. Registra qué mejora, qué empeora y qué coste introduce.
5. Lleva la conclusión al sistema real que estás construyendo.

Los labs no buscan ser frameworks completos. Buscan aislar una decisión para que puedas verla funcionar.

## Labs disponibles

| Lab | Tema | Capítulo relacionado | Objetivo |
| --- | --- | --- | --- |
| `meta-evaluation/` | Meta-evaluación de jueces LLM | Capítulo 31 | Comprobar si un juez detecta degradaciones controladas. |
| `rag-retrieval-eval/` | Evaluación de retrieval RAG | Capítulos 18-19 | Medir Recall@K, MRR y fugas de permisos antes de optimizar generación. |
| `local-model-benchmark/` | Benchmark local con Ollama | Capítulos 7-8 | Medir tokens/s, latencia y salida real de modelos locales en tu hardware. |
| `llm-cost-profiler/` | Costes IA en producción | Capítulo 34 | Simular call depth, context bloat, retries, caché y routing. |

## Labs prioritarios que debe añadir el libro

Estos son los siguientes labs que más aumentarían el valor práctico del proyecto:

| Lab propuesto | Qué demostraría |
| --- | --- |
| `trace-dashboard/` | Cómo guardar una traza mínima y convertirla en métricas de producto. |
| `cost-latency-router/` | Cómo comparar modelos por coste, latencia y calidad para una misma tarea. |
| `tool-call-eval/` | Cómo evaluar llamadas a herramientas con argumentos válidos, permisos y errores. |
| `prompt-regression/` | Cómo detectar que un cambio de prompt mejora un caso y rompe otro. |
| `release-manifest/` | Cómo versionar modelo, prompt, índice, tools y evaluación por release. |
| `code-agent-governance/` | Cómo usar specs, reglas, revisión adversarial y gates antes de mergear código generado. |

## Criterio de calidad

Un lab se considera útil si:

- se puede ejecutar sin infraestructura compleja;
- explica qué decisión de ingeniería aísla;
- tiene datos mínimos incluidos o generables;
- produce una salida verificable;
- incluye una pregunta de reflexión;
- conecta con una checklist de producción.

## Filosofía

El libro debe enseñar a construir con IA, no solo a hablar de IA.

Por eso el companion GitHub debe crecer como una biblioteca de experimentos pequeños, reproducibles y conectados con problemas reales: RAG, evaluación, observabilidad, coste, latencia, seguridad, agentes y operación.
