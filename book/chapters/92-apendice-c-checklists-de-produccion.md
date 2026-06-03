---
title: "Apéndice C — Checklists de producción"
chapter: "C"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "práctico"
estimated_reading_time: "12 minutos"
---

# Apéndice C — Checklists de producción

La diferencia entre una demo y un sistema útil suele aparecer en los detalles.

Este apéndice reúne checklists prácticos para revisar una aplicación con IA antes de ponerla delante de usuarios reales.

No todas las preguntas aplican a todos los proyectos. La idea es obligarte a mirar el sistema desde varios ángulos: datos, modelo, contexto, coste, seguridad, experiencia de usuario y mantenimiento.

---

## Checklist general de sistema IA

Antes de enseñar el sistema a usuarios reales, revisa:

- ¿Qué problema concreto resuelve?
- ¿Quién es el usuario principal?
- ¿Qué tarea mejora?
- ¿Qué parte hace el modelo?
- ¿Qué parte hace código determinista?
- ¿Qué datos necesita?
- ¿Qué datos no debería ver nunca?
- ¿Qué ocurre cuando el modelo falla?
- ¿Qué ocurre cuando no hay contexto suficiente?
- ¿Qué métrica define que el sistema funciona?
- ¿Hay logs?
- ¿Hay forma de revisar errores?
- ¿Hay coste estimado por uso?
- ¿Hay límites de uso?
- ¿Hay plan de mantenimiento?

Si no puedes responder estas preguntas, todavía no tienes producto. Tienes prototipo.

---

## Checklist de sistema IA completo

Una aplicación de IA en producción no es solo:

```text
usuario -> modelo -> respuesta
```

Revisa si el sistema tiene las capas necesarias:

- ¿Hay trigger claro: usuario, evento, cron, webhook o cola?
- ¿Hay normalización de entrada?
- ¿Hay construcción de contexto?
- ¿Hay separación entre instrucciones, datos y herramientas?
- ¿Hay RAG o memoria solo cuando aportan valor?
- ¿Hay tools con contratos y permisos?
- ¿Hay orquestación explícita?
- ¿Hay validación de salida?
- ¿Hay human-in-the-loop para casos sensibles?
- ¿Hay trazas por request?
- ¿Hay evaluación antes de publicar?
- ¿Hay límites de coste?
- ¿Hay estrategia de fallback?
- ¿Hay rollback?
- ¿Hay feedback loop?
- ¿Hay propietario del sistema?

Si solo puedes señalar el modelo, todavía no tienes arquitectura.

Tienes una llamada a un modelo.

---

## Checklist de prompts

Un prompt importante debe revisarse como una pieza de ingeniería.

Comprueba:

- ¿Tiene objetivo claro?
- ¿Define rol solo cuando aporta algo?
- ¿Separa instrucciones de contexto dinámico?
- ¿Incluye límites explícitos?
- ¿Define formato de salida?
- ¿Indica qué hacer si falta información?
- ¿Evita pedir razonamiento innecesario al usuario?
- ¿Está versionado?
- ¿Tiene ejemplos?
- ¿Tiene tests o casos de evaluación?
- ¿Está guardado en archivo, no escondido en código?

Una señal de alerta:

> Si cambiar una frase del prompt puede romper producción y nadie se entera, el prompt no está gestionado como parte del sistema.

---

## Checklist de RAG

Para sistemas con recuperación de documentos:

- ¿Las fuentes están identificadas?
- ¿Hay pipeline de ingestión?
- ¿El chunking está justificado?
- ¿Se han probado varios tamaños de chunk?
- ¿Se guardan metadatos?
- ¿Hay control de permisos?
- ¿Se distingue recuperación de generación?
- ¿Se citan fuentes?
- ¿Se evalúa recall?
- ¿Se evalúa precisión?
- ¿Hay reranking si hace falta?
- ¿Qué ocurre con documentos contradictorios?
- ¿Qué ocurre con documentos obsoletos?
- ¿Hay reindexación?
- ¿Hay trazabilidad de respuesta?

El error típico:

> Pensar que RAG es elegir una base vectorial. RAG es todo el circuito de conocimiento.

---

## Checklist de chatbots

Para chatbots de soporte o asistentes conversacionales:

- ¿Está claro qué puede hacer?
- ¿Está claro qué no puede hacer?
- ¿Tiene tono consistente?
- ¿Pide aclaraciones cuando la pregunta es ambigua?
- ¿Escala a humano?
- ¿Detecta frustración o bloqueo?
- ¿Evita prometer acciones que no ejecuta?
- ¿Cita fuentes cuando responde con información documental?
- ¿Se registran conversaciones?
- ¿Se pueden revisar conversaciones fallidas?
- ¿Hay métricas de satisfacción?
- ¿Hay métricas de resolución?
- ¿Hay protección contra prompt injection?

Un chatbot útil no es el que habla más.

Es el que resuelve mejor, escala antes y confunde menos.

---

## Checklist de agentes y tools

Cuando un modelo puede ejecutar acciones, el nivel de riesgo sube.

Comprueba:

- ¿Qué tools existen?
- ¿Qué permisos tiene cada tool?
- ¿Qué argumentos acepta cada tool?
- ¿Se validan los argumentos?
- ¿Se limita el número de llamadas?
- ¿Hay confirmación humana para acciones sensibles?
- ¿Hay modo simulación?
- ¿Hay logs de tool calls?
- ¿Hay rollback?
- ¿Qué pasa si una tool falla?
- ¿Qué pasa si el modelo llama una tool incorrecta?
- ¿Qué pasa si el usuario intenta forzar una acción?

Principio práctico:

> Cuanto más poder tiene el agente, menos libertad implícita debe tener.

---

## Checklist de modelos locales

Para despliegues con Ollama, LM Studio, llama.cpp, MLX u otros entornos locales:

- ¿El modelo cabe en memoria?
- ¿La latencia es aceptable?
- ¿La calidad es suficiente para la tarea?
- ¿Se ha probado con datos reales?
- ¿Qué cuantización se usa?
- ¿Qué pasa con prompts largos?
- ¿Hay límites de contexto?
- ¿Hay fallback a API externa?
- ¿Hay monitorización de recursos?
- ¿Hay control de temperatura y parámetros?
- ¿El modelo está documentado?
- ¿Se puede reproducir la configuración?

No uses local por ideología.

Usa local cuando privacidad, coste, latencia, control o soberanía lo justifiquen.

---

## Checklist de seguridad y privacidad

Preguntas mínimas:

- ¿Qué datos personales entran al sistema?
- ¿Qué datos salen hacia proveedores externos?
- ¿Qué se guarda en logs?
- ¿Durante cuánto tiempo?
- ¿Quién puede leer conversaciones?
- ¿Quién puede leer documentos indexados?
- ¿Hay datos sensibles en prompts?
- ¿Hay secretos en variables o contexto?
- ¿Hay protección contra inyección de prompt?
- ¿Hay separación por usuario o tenant?
- ¿Hay auditoría?
- ¿Hay política de borrado?

Una regla sana:

> No metas en el contexto nada que no puedas justificar ante el usuario, el cliente o tu equipo legal.

---

## Checklist de costes

Antes de escalar:

- ¿Cuánto cuesta una interacción media?
- ¿Cuánto cuesta una interacción larga?
- ¿Cuánto cuesta la indexación?
- ¿Cuánto cuesta el almacenamiento?
- ¿Cuánto cuesta el reranking?
- ¿Cuánto cuesta usar modelos grandes?
- ¿Hay caching?
- ¿Hay límites por usuario?
- ¿Hay alertas de gasto?
- ¿Hay degradación a modelos más baratos?
- ¿Hay una métrica de valor por coste?

Una aplicación con IA puede fallar técnicamente.

También puede fallar económicamente.

---

## Checklist de evaluación

Sin evaluación, no sabes si mejoras.

Define:

- dataset de preguntas;
- respuestas esperadas;
- casos fáciles;
- casos ambiguos;
- casos fuera de alcance;
- casos con información insuficiente;
- casos adversarios;
- métricas automáticas;
- revisión humana;
- frecuencia de evaluación.

Evalúa cada cambio importante de:

- modelo;
- prompt;
- chunking;
- embeddings;
- reranker;
- tools;
- interfaz.

El objetivo no es tener una puntuación perfecta.

El objetivo es detectar regresiones antes que tus usuarios.

---

## Checklist demo a producción

Usa esta lista cuando el prototipo ya impresiona y aparece la tentación de publicarlo.

### Artefactos mínimos

- ¿Existe una ficha técnica del sistema?
- ¿Existe un repositorio con el código o configuración relevante?
- ¿Hay prompt versionado?
- ¿Hay configuración de modelo versionada?
- ¿Hay manifiesto de release?
- ¿Hay dataset mínimo de evaluación?
- ¿Hay trazas de prueba?
- ¿Hay criterio de rollback?

### Calidad

- ¿Qué casos reales resuelve?
- ¿Qué casos reales no resuelve?
- ¿Cuál es el baseline?
- ¿Qué métrica debe mejorar?
- ¿Qué métrica no puede empeorar?
- ¿Se han probado casos ambiguos?
- ¿Se han probado casos fuera de alcance?
- ¿Se han probado entradas maliciosas o raras?

### Operación

- ¿Quién mantiene el sistema?
- ¿Quién revisa errores?
- ¿Quién puede apagarlo?
- ¿Qué alertas existen?
- ¿Qué coste máximo se acepta?
- ¿Qué latencia p95 se acepta?
- ¿Qué ocurre si cambia el modelo?
- ¿Qué ocurre si falla una tool?
- ¿Qué ocurre si la fuente documental queda obsoleta?

### Aprendizaje

- ¿Qué se revisará cada semana?
- ¿Qué trazas se muestrearán?
- ¿Qué feedback de usuario se recogerá?
- ¿Qué decisión se tomará si el sistema no mejora?

La señal de madurez no es que el sistema parezca inteligente.

La señal de madurez es que el equipo pueda operarlo sin depender de intuición, heroísmo o suerte.

---

## Checklist por capítulo práctico

Cada capítulo técnico del libro debería intentar dejar al menos tres de estos elementos:

- decisión de ingeniería;
- diagrama;
- ejemplo ejecutable;
- checklist;
- caso de fallo;
- métrica;
- coste aproximado;
- traza mínima;
- criterio de evaluación;
- criterio de publicación;
- criterio de rollback;
- ejercicio de laboratorio;
- enlaces a fuentes o repos relevantes;
- pregunta para adaptar el patrón a un caso real.

Un capítulo conceptual puede ser excelente.

Pero un capítulo práctico debe dejar al lector más cerca de construir.
