---
title: "Apéndice B — Proyectos guiados"
chapter: "B"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "práctico"
estimated_reading_time: "14 minutos"
---

# Apéndice B — Proyectos guiados

Un libro sobre construir con IA debe terminar llevando al lector a construir.

Este apéndice propone proyectos guiados que conectan los capítulos con sistemas reales. No son ejercicios decorativos. Están pensados como prototipos que podrían convertirse en productos internos, demos comerciales o bases de aprendizaje profundo.

Cada proyecto incluye objetivo, arquitectura mínima, criterios de aceptación y ampliaciones.

---

## Proyecto 1 — Chatbot de soporte con RAG

### Objetivo

Construir un chatbot que responda preguntas frecuentes de soporte usando una base documental propia.

No debe inventar respuestas. Debe citar fuentes, reconocer límites y escalar a humano cuando no tenga suficiente contexto.

### Arquitectura mínima

- Interfaz web sencilla.
- Colección de documentos de soporte.
- Pipeline de ingestión.
- Chunking controlado.
- Embeddings.
- Vector store.
- Recuperación top-k.
- Prompt de respuesta con fuentes.
- Registro de conversaciones.
- Evaluación manual de respuestas.

### Criterios de aceptación

El sistema es aceptable si:

- responde correctamente al menos el 80% de preguntas frecuentes conocidas;
- cita la fuente usada;
- no responde cuando el contexto es insuficiente;
- propone escalado a humano en casos ambiguos;
- permite revisar conversaciones fallidas;
- no expone documentos fuera del alcance previsto.

### Capítulos relacionados

- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 17 — Arquitectura RAG básica
- Capítulo 18 — Problemas reales en RAG
- Capítulo 21 — Chatbots modernos
- Capítulo 22 — Chatbots para soporte

### Ampliaciones

- Añadir reranking.
- Añadir evaluación automática.
- Añadir perfiles de usuario.
- Añadir permisos por documento.
- Añadir analítica de temas frecuentes.

---

## Proyecto 2 — Copiloto interno para un equipo técnico

### Objetivo

Crear un copiloto que ayude a un equipo de desarrollo a consultar documentación interna, decisiones técnicas, issues y convenciones del proyecto.

El objetivo no es que programe solo, sino que reduzca tiempo de búsqueda y mejore consistencia.

### Arquitectura mínima

- Fuente de conocimiento: README, ADRs, documentación, issues, changelogs.
- Indexación por repositorio.
- Búsqueda semántica y textual.
- Interfaz conversacional.
- Prompt con reglas del proyecto.
- Respuestas con referencias.
- Modo "explica" y modo "propón".

### Criterios de aceptación

El sistema debe:

- responder preguntas sobre arquitectura del proyecto;
- localizar documentos relevantes;
- explicar convenciones;
- no modificar código;
- distinguir entre información documentada y sugerencia;
- enlazar a las fuentes.

### Capítulos relacionados

- Capítulo 10 — Prompts como herramientas de ingeniería
- Capítulo 12 — Prompts para crear software
- Capítulo 14 — Reglas para agentes de código
- Capítulo 23 — Diferencia entre chatbot, copiloto y agente

### Ampliaciones

- Integración con GitHub.
- Lectura de PRs.
- Generación de borradores de ADR.
- Evaluación de preguntas frecuentes del equipo.

---

## Proyecto 3 — Agente de investigación técnica

### Objetivo

Construir un sistema que recopile novedades de IA, repos, papers y documentación, las clasifique y proponga actualizaciones editoriales.

Este proyecto es la base del libro vivo.

### Arquitectura mínima

- Fuentes RSS.
- GitHub releases.
- arXiv o Semantic Scholar.
- Bandeja manual.
- Clasificación por tags.
- Resumen.
- Mapeo a capítulos.
- Informe diario.
- Revisión humana.

### Criterios de aceptación

El sistema funciona si:

- recoge novedades sin romperse cuando una fuente falla;
- distingue señales importantes de ruido;
- propone capítulos afectados;
- conserva enlaces;
- genera un informe legible;
- no publica cambios automáticamente sin revisión.

### Capítulos relacionados

- Capítulo 5 — Cómo elegir un modelo
- Capítulo 11 — Técnicas avanzadas
- Capítulo 24 — Qué es un agente de IA
- Capítulo 25 — Function calling
- Capítulo 26 — MCP

### Ampliaciones

- Añadir ranking de relevancia.
- Añadir embeddings.
- Añadir comparación entre fuentes.
- Añadir generación de parches sugeridos.
- Añadir releases automáticas semanales.

---

## Proyecto 4 — Banco de pruebas de modelos locales

### Objetivo

Evaluar modelos locales en tareas reales para decidir cuáles sirven para un caso concreto.

No se trata de repetir benchmarks públicos, sino de construir un benchmark propio y útil.

### Arquitectura mínima

- Lista de modelos.
- Dataset pequeño de tareas reales.
- Prompts fijos.
- Métricas manuales y automáticas.
- Registro de latencia.
- Registro de memoria.
- Comparativa de calidad.

### Criterios de aceptación

El benchmark debe permitir responder:

- qué modelo responde mejor;
- qué modelo es suficientemente rápido;
- qué modelo cabe en el hardware disponible;
- qué tareas fallan más;
- cuándo conviene usar API externa.

### Capítulos relacionados

- Capítulo 5 — Cómo elegir un modelo
- Capítulo 7 — Modelos locales
- Capítulo 8 — Hardware real para IA local

### Ampliaciones

- Integrar Ollama.
- Integrar LM Studio.
- Probar cuantizaciones.
- Probar modelos especializados.
- Generar informe mensual.

---

## Proyecto 5 — Sistema con tools y function calling

### Objetivo

Construir una aplicación donde el modelo no solo responda, sino que pueda llamar funciones controladas.

Ejemplos:

- consultar estado de pedido;
- crear ticket;
- buscar producto;
- calcular presupuesto;
- consultar disponibilidad;
- actualizar un registro con confirmación humana.

### Arquitectura mínima

- Modelo con function calling.
- Definición estricta de tools.
- Validación de argumentos.
- Ejecución controlada.
- Confirmación antes de acciones sensibles.
- Logs.
- Respuesta final al usuario.

### Criterios de aceptación

El sistema es aceptable si:

- llama la función correcta;
- no inventa argumentos;
- valida entradas;
- pide confirmación cuando hace falta;
- registra acciones;
- maneja errores de herramientas.

### Capítulos relacionados

- Capítulo 23 — Diferencia entre chatbot, copiloto y agente
- Capítulo 24 — Qué es un agente de IA
- Capítulo 25 — Function calling
- Capítulo 26 — MCP

### Ampliaciones

- Añadir varias tools.
- Añadir permisos por usuario.
- Añadir MCP.
- Añadir evaluación de tool calls.
- Añadir simulación antes de ejecución real.

---

## Cómo elegir proyecto

Elige según tu situación:

- Si trabajas con documentación: empieza por RAG.
- Si trabajas en soporte: empieza por chatbot de soporte.
- Si trabajas en desarrollo: empieza por copiloto interno.
- Si quieres producto: empieza por tools/function calling.
- Si investigas mucho: empieza por agente de investigación.
- Si tienes hardware local: empieza por benchmark de modelos.

La regla es simple:

> El mejor proyecto no es el más impresionante. Es el que te obliga a conectar modelo, datos, contexto, evaluación y usuario real.

