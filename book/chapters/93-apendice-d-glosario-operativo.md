---
title: "Apéndice D — Glosario operativo"
chapter: "D"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "práctico"
estimated_reading_time: "10 minutos"
---

# Apéndice D — Glosario operativo

Este glosario no busca definiciones académicas perfectas.

Busca definiciones operativas: qué significa cada concepto cuando estás construyendo software real con IA.

---

## Agente

Sistema que usa un modelo para decidir pasos, llamar herramientas, observar resultados y avanzar hacia un objetivo dentro de ciertos límites.

Un agente no es solo un chatbot. Necesita tools, estado, contexto, reglas y supervisión.

---

## Alucinación

Respuesta generada que parece plausible pero no está respaldada por información correcta.

En producción no basta con decir "los modelos alucinan". Hay que diseñar límites, recuperación de contexto, citas, evaluación y rutas de escalado.

---

## Chunk

Fragmento de documento usado en un sistema RAG.

El tamaño y la forma del chunk afectan directamente a la recuperación. Un mal chunking puede hacer que el sistema falle aunque el modelo sea bueno.

---

## Copiloto

Sistema que ayuda a un usuario a trabajar, pero no sustituye completamente su criterio.

Un copiloto suele proponer, explicar, completar o acelerar. El usuario mantiene control de la decisión final.

---

## Embedding

Representación vectorial de texto, imagen u otro dato.

En RAG, los embeddings permiten buscar fragmentos semánticamente parecidos a una pregunta, aunque no compartan exactamente las mismas palabras.

---

## Evaluación

Proceso para medir si el sistema responde mejor o peor.

Puede incluir tests automáticos, revisión humana, datasets de preguntas, métricas de recuperación, análisis de errores y comparación entre versiones.

---

## Function calling

Capacidad de un modelo para devolver una llamada estructurada a una función definida por el sistema.

No significa que el modelo ejecute código por sí solo. El sistema recibe la llamada, valida argumentos, ejecuta si procede y devuelve el resultado.

---

## Grounding

Conectar la respuesta del modelo con información concreta, como documentos, bases de datos, resultados de búsqueda o herramientas.

El grounding reduce respuestas inventadas y mejora trazabilidad, pero no elimina todos los riesgos.

---

## Guardrail

Mecanismo que limita, filtra, valida o corrige el comportamiento del sistema.

Puede ser un prompt, una regla de código, un clasificador, una validación de argumentos, una política de permisos o una revisión humana.

---

## Ingestión

Proceso de introducir datos en el sistema: leer documentos, limpiarlos, dividirlos, generar embeddings, guardar metadatos e indexarlos.

En RAG, la ingestión suele ser más importante de lo que parece.

---

## Latencia

Tiempo que tarda el sistema en responder.

En aplicaciones con IA, la latencia no depende solo del modelo. También influyen recuperación, reranking, llamadas a tools, red, streaming, tamaño de contexto y procesamiento posterior.

---

## MCP

Model Context Protocol.

Un protocolo para conectar modelos o agentes con herramientas, recursos y contexto de forma más estandarizada.

MCP no elimina la necesidad de permisos, validación, logs y diseño de seguridad.

---

## Modelo local

Modelo ejecutado en hardware propio o controlado directamente por el equipo.

Puede aportar privacidad, control y ahorro en ciertos escenarios, pero exige gestionar rendimiento, memoria, instalación, actualización y calidad.

---

## Prompt

Instrucción o conjunto de instrucciones que guía al modelo.

En ingeniería real, un prompt importante debe versionarse, evaluarse y mantenerse como cualquier otra pieza crítica del sistema.

---

## Prompt injection

Intento de manipular al modelo mediante instrucciones maliciosas o contradictorias incluidas por el usuario, documentos o fuentes externas.

Es especialmente peligroso en sistemas con RAG, tools o agentes.

---

## RAG

Retrieval-Augmented Generation.

Arquitectura donde el sistema recupera información relevante antes de pedir al modelo que genere una respuesta.

RAG no es una base vectorial. Es una cadena completa: fuentes, ingestión, recuperación, generación, citas, permisos, evaluación y mantenimiento.

---

## Reranking

Reordenar resultados recuperados para mejorar la calidad del contexto que recibe el modelo.

Suele usarse después de una primera búsqueda amplia y antes de generar la respuesta.

---

## Tool

Función, API, comando o recurso externo que el sistema puede usar.

Una tool debe tener contrato claro: nombre, descripción, argumentos, validaciones, permisos, errores y límites.

---

## Trazabilidad

Capacidad de reconstruir por qué el sistema respondió o actuó de una determinada manera.

Incluye prompts, contexto usado, documentos recuperados, tool calls, resultados, modelo, versión y logs.

---

## Vector store

Base o índice usado para guardar vectores y buscar elementos similares.

Es una pieza habitual en RAG, pero no garantiza por sí sola que el sistema responda bien.

