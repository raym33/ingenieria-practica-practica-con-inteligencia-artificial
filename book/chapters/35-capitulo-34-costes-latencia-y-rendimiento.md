---
title: "Capítulo 34 — Costes, latencia y rendimiento"
chapter: "35"
part: "Parte VIII — Producción, seguridad y operación"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "intermedio"
estimated_reading_time: "44 minutos"
---

# Capítulo 34 — Costes, latencia y rendimiento

Un sistema IA puede ser correcto y aun así inviable si cuesta demasiado o responde demasiado tarde.

La calidad técnica no compensa una mala economía.

Tampoco compensa una mala experiencia.

Un copiloto que responde en quince segundos puede ser brillante y no usarse.

Un agente que cuesta más que el trabajo que automatiza puede ser elegante y no tener sentido.

Por eso coste, latencia y rendimiento no son temas financieros al final del proyecto.

Son decisiones de arquitectura desde el principio.

La pregunta no es solo:

> ¿Qué modelo funciona mejor?

La pregunta completa es:

> ¿Qué combinación de modelo, contexto, herramientas y flujo entrega suficiente calidad al coste y velocidad que el caso de uso tolera?


## 34.1 El problema

La mayoría de prototipos no calculan coste real. Ignoran retries, prompts largos, contexto excesivo, rerankers, STT, TTS, llamadas a tools, infraestructura y revisión humana.


## 34.2 Principios prácticos

- Presupuesta por caso de uso, no solo por token.
- Mide latencia por etapa.
- Usa modelos pequeños donde baste.
- Reduce contexto antes de cambiar a un modelo más grande.
- Cachea con permisos y caducidad.


## 34.3 Arquitectura mínima

Un diseño razonable puede empezar con este flujo:

```text
1. presupuesto por feature
2. router de modelos
3. medidor de tokens
4. caché segura
5. colas para tareas lentas
6. alertas de coste
```

No todos los proyectos necesitan todas las piezas desde el primer día. Pero si una pieza falta, debe faltar por decisión, no por despiste.


## 34.4 Implementación práctica

Divide cada request en etapas: entrada, retrieval, reranking, modelo, tools, salida y postprocesado. Si no puedes asignar coste a una etapa, no puedes optimizarla.

Una forma útil de trabajar es escribir primero la ficha técnica del sistema. Esa ficha debe ser corta, revisable y concreta:

```text
Objetivo:
Usuario:
Datos usados:
Acciones permitidas:
Riesgos principales:
Métricas:
Criterio para publicar:
Criterio para apagar o revertir:
```

Cuando no puedes completar esta ficha, el proyecto todavía está demasiado borroso.

### Desglose por etapa

Un request RAG puede medirse así:

```json
{
  "request_id": "req_042",
  "feature": "support_copilot",
  "stages": {
    "input_validation_ms": 12,
    "retrieval_ms": 95,
    "reranking_ms": 180,
    "model_ms": 1450,
    "tool_ms": 0,
    "output_validation_ms": 20
  },
  "tokens": {
    "input": 2200,
    "output": 420
  },
  "cost": {
    "model_usd": 0.018,
    "reranker_usd": 0.002,
    "infra_usd_estimated": 0.001,
    "total_usd": 0.021
  }
}
```

Este desglose permite responder preguntas útiles:

- ¿el cuello de botella está en el modelo o en retrieval?;
- ¿el reranker mejora lo suficiente para justificar su latencia?;
- ¿el prompt está creciendo sin control?;
- ¿el coste viene de respuestas largas o de contexto excesivo?;
- ¿hay retries ocultos?;
- ¿hay usuarios o tenants especialmente caros?

### Fórmula simple de coste

Para texto:

```text
coste_request =
  coste_input_tokens
  + coste_output_tokens
  + coste_retrieval
  + coste_reranking
  + coste_tools
  + coste_infra
```

Para voz:

```text
coste_request =
  coste_stt
  + coste_modelo
  + coste_tools
  + coste_tts
  + coste_telefonia
  + coste_fallback_humano
```

Para agentes:

```text
coste_tarea =
  suma(costes_de_pasos)
  + retries
  + verificaciones
  + revisión humana
```

Los agentes son especialmente peligrosos para el coste porque multiplican pasos.

Un agente de cinco pasos no cuesta “una llamada”.

Cuesta cinco decisiones, varias tools, contexto acumulado y posiblemente verificación.

### Call depth

El precio por token puede bajar y aun así la factura subir.

La razón suele ser `call_depth`: cuántas llamadas al modelo dispara una petición real de usuario.

Ejemplo:

```text
usuario pide resolver un ticket
  -> clasificar intención
  -> buscar contexto
  -> reescribir query
  -> rerank
  -> generar respuesta
  -> validar seguridad
  -> crear borrador
  -> resumir acción
```

Una petición visible puede convertirse en ocho llamadas.

Si además hay retries, agentes o verificación, el coste real se multiplica.

Mide:

- llamadas LLM por request;
- llamadas LLM por tarea completada;
- llamadas por feature;
- llamadas por usuario;
- llamadas por agente;
- llamadas fallidas;
- llamadas repetidas por retry.

Regla:

```text
coste_real = precio_tokens x volumen x call_depth x retries x contexto
```

### Context bloat

El contexto excesivo es una de las fugas de coste más comunes.

No porque un prompt largo sea siempre malo.

Porque muchos prompts largos no aportan valor.

Señales de context bloat:

- siempre envías el historial completo;
- metes demasiados chunks RAG;
- repites instrucciones estáticas en cada llamada;
- incluyes tools que no aplican;
- añades ejemplos que el flujo ya no necesita;
- envías documentos completos cuando bastan fragmentos;
- no recortas contexto tras cada paso del agente.

Antes de cambiar a un modelo más barato, revisa si puedes bajar:

```text
14.000 tokens -> 1.000 tokens
```

sin perder calidad.

Muchas optimizaciones fuertes vienen de poda de contexto, no de cambiar de proveedor.

### Retries amplificados

Los retries son útiles.

Sin límite, son una factura escondida.

Ejemplo:

```text
tool falla
  -> retry modelo
  -> retry tool
  -> retry generación
  -> retry validación
```

Si el error viene de una mala entrada, repetir no arregla nada.

Checklist:

- límite máximo de retries;
- backoff;
- causa de retry registrada;
- coste acumulado por retry;
- corte cuando el error es determinista;
- fallback a humano o cola;
- alerta si el retry rate sube.

### Caching semántico y prompt caching

Hay dos cachés distintas.

**Prompt caching** reutiliza prefijos estables: instrucciones, tool definitions, ejemplos o contexto común.

Funciona mejor cuando el prefijo no cambia.

Puede romperse por detalles tontos:

- timestamp dentro del system prompt;
- orden cambiante de tools;
- serialización JSON no determinista;
- ejemplos reordenados;
- espacios o campos variables en el prefijo.

**Semantic caching** reutiliza respuestas o resultados cuando preguntas distintas son equivalentes.

Ejemplo:

```text
"¿Cuál es la política de devolución?"
"Dime el plazo para devolver un producto"
```

Riesgos:

- permisos;
- documentos obsoletos;
- usuarios distintos;
- contexto de tenant;
- respuestas que parecen iguales pero no lo son.

La caché no es solo técnica.

Es una decisión de producto y seguridad.

### Token budgets y AI gateway

Un sistema serio debe poder decir:

```text
esta feature no puede gastar más de X por usuario al mes
esta API key no puede superar Y tokens diarios
este modelo no puede usarse para tareas de bajo riesgo
este agente se apaga si supera N retries
```

Eso puede vivir en un AI gateway, middleware propio o capa de proveedor.

Lo importante:

- límites por API key;
- límites por usuario;
- límites por tenant;
- límites por modelo;
- límites por feature;
- alertas;
- bloqueo o degradación;
- trazabilidad de quién gastó qué.

Sin budgets, el coste se descubre tarde.

Y tarde significa caro.

### Matriz de optimización

Si la latencia es alta, mira primero:

- tamaño del contexto;
- modelo usado;
- llamadas secuenciales;
- reranking;
- tools externas;
- streaming;
- colas para tareas no interactivas.

Si el coste es alto, mira primero:

- tokens de entrada;
- tokens de salida;
- número de pasos;
- retries;
- modelo sobredimensionado;
- contexto repetido;
- usuarios que disparan flujos caros.

Si la calidad es baja, no optimices coste todavía.

Primero encuentra la causa:

- retrieval malo;
- prompt ambiguo;
- modelo insuficiente;
- fuentes malas;
- tool mal diseñada;
- evaluación incompleta.

Optimizar un sistema que aún no funciona solo produce un sistema barato que falla.

### Optimización específica en RAG

En RAG, coste y latencia no viven solo en el modelo generador.

También viven en:

- query rewriting;
- embeddings;
- búsqueda híbrida;
- filtros;
- reranking;
- compresión;
- síntesis;
- citas;
- validación;
- observabilidad.

Patrones útiles:

- cachear resultados de retrieval para consultas frecuentes;
- cachear respuestas solo si permisos, tenant y versión documental coinciden;
- enrutar preguntas simples a un flujo sin reranker;
- usar reranker solo cuando el top-k inicial tiene baja confianza;
- reducir contexto antes de cambiar a modelo más caro;
- separar flujos interactivos de flujos batch;
- medir latencia p95 por etapa, no solo total;
- degradar con gracia: menos resultados, modelo más pequeño o respuesta diferida.

Regla importante:

> En RAG, una caché insegura puede ser peor que no tener caché.

Una respuesta cacheada debe estar asociada a:

- usuario o grupo;
- tenant;
- permisos;
- versión de documentos;
- versión de prompt;
- modelo;
- fecha de caducidad.

Si no puedes invalidarla correctamente, úsala solo para datos públicos o de bajo riesgo.

### Router de modelos

No todo necesita el mismo modelo.

Un router simple puede decidir por tipo de tarea:

```python
def choose_model(task):
    if task["type"] == "classification":
        return "small-fast-model"
    if task["type"] == "rewrite" and task["risk"] == "low":
        return "medium-model"
    if task["type"] == "legal_answer" or task["risk"] == "high":
        return "strong-model"
    if task["type"] == "batch_summary":
        return "cheap-batch-model"
    return "default-model"
```

El router no debe decidir solo por coste.

### Métricas locales: prefill y decode

En modelos locales, "tokens por segundo" puede ocultar dos fases distintas:

- **prefill**: procesar prompt y contexto de entrada.
- **decode**: generar tokens de salida.

Un equipo puede reportar prefill muy rápido y decode modesto.

Para producto, importa cómo se siente el flujo:

- en RAG con contexto largo, el prefill pesa mucho;
- en chat largo, el decode se nota en cada respuesta;
- en agentes, muchas llamadas pequeñas acumulan overhead;
- en batch, puede importar más throughput que latencia interactiva.

Cuando compares hardware local, registra:

```text
modelo:
cuantización:
runtime:
contexto:
prompt tokens:
output tokens:
prefill tok/s:
decode tok/s:
time to first token:
RAM/VRAM:
temperatura/ruido si importa:
```

Sin esta ficha, dos benchmarks con el mismo modelo pueden no ser comparables.

Debe decidir por riesgo, dificultad, latencia esperada y valor del resultado.

### Costes inducidos por código generado

El coste de IA no termina en la llamada al modelo.

Un asistente de código puede introducir un bug que dispare costes de infraestructura:

- logs en bucle;
- cardinalidad explosiva en métricas;
- retries infinitos;
- llamadas repetidas a APIs externas;
- jobs batch sin límite;
- consultas caras;
- colas que no drenan;
- trazas demasiado verbosas.

Por eso la revisión de código generado debe mirar efectos de segundo orden.

No basta con preguntar:

> ¿Compila?

Hay que preguntar:

> ¿Qué pasa si esto se ejecuta mil veces por minuto?

Checklist para código generado que toca producción:

- ¿puede generar logs en bucle?;
- ¿tiene límites de retry?;
- ¿tiene timeout?;
- ¿tiene rate limit?;
- ¿puede crear cardinalidad alta en métricas?;
- ¿puede disparar costes por evento?;
- ¿hay alerta de coste?;
- ¿hay kill-switch?;
- ¿hay dry-run?;
- ¿hay rollback?

Un pequeño bug de logging puede costar más que muchas llamadas al modelo.

La factura no distingue si el error lo escribió una persona o un agente.

### Latencia como sistema distribuido

Cuando un producto IA va lento, la causa no siempre es "el modelo".

Puede estar en:

- gateway;
- autenticación;
- tokenización;
- routing;
- cold start;
- KV cache;
- filtros de seguridad;
- streaming;
- retrieval;
- reranking;
- tool externa;
- observabilidad;
- facturación;
- red entre regiones.

La inferencia moderna es un sistema distribuido.

Diagnóstico práctico:

```text
latencia_total =
  red_cliente
  + api_gateway
  + auth
  + retrieval
  + reranking
  + cola_modelo
  + inferencia
  + safety
  + tools
  + postprocesado
  + streaming
```

Si solo mides `model_ms`, verás una parte de la película.

Mide cada etapa.

Luego decide:

- mover región;
- activar streaming;
- reducir contexto;
- precalentar workers;
- cambiar modelo;
- quitar reranking en preguntas fáciles;
- pasar tareas lentas a batch;
- cachear respuestas seguras;
- separar flujos interactivos y no interactivos.

La latencia se optimiza con trazas, no con intuición.


## 34.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **coste por conversación**
- **coste por usuario activo**
- **latencia p95**
- **tokens por respuesta**
- **cache hit rate**
- **retry rate**
- **coste de revisión humana**
- **coste por log/evento**
- **cost anomaly alerts**
- **latencia por etapa**

No hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.


## 34.6 Checklist

- Hay presupuesto por feature.
- Se mide coste real por request.
- Se mide latencia por etapa.
- Hay límites por usuario y organización.
- Hay modelos alternativos para tareas simples.
- La caché respeta permisos.
- Las tareas lentas van a cola.


## 34.7 Antipatrones

### usar siempre el modelo más grande

El modelo más grande suele ser una buena forma de ocultar problemas de diseño.

Puede compensar un prompt flojo, retrieval mediocre o tools mal descritas. Pero esa compensación se paga en coste y latencia. Empieza midiendo qué tareas realmente necesitan el modelo fuerte y cuáles pueden resolverse con modelos pequeños, reglas o búsqueda clásica.

### meter demasiado contexto

Más contexto no siempre significa más verdad.

Puede significar más ruido, más coste, más latencia y más oportunidad para que el modelo se distraiga. El contexto debe ser seleccionado, ordenado y recortado. Si diez chunks funcionan igual que treinta, treinta es deuda.

### hacer reranking sin medir

El reranking puede mejorar mucho un RAG.

También puede añadir latencia y coste sin aportar nada en tu caso concreto. Antes de adoptarlo, compara retrieval con y sin reranker sobre una suite real: fuentes esperadas, respuesta final, latencia y coste.

### no contar retries

Los retries son coste invisible.

Una llamada fallida que se repite tres veces no aparece en la demo, pero sí en la factura y en la experiencia de usuario. Registra retries por proveedor, modelo, tool y tipo de error.

### ignorar coste de humano en el loop

El humano en el loop no es gratis.

Puede ser necesario, pero debe presupuestarse. Si cada respuesta ahorra treinta segundos pero exige dos minutos de revisión, no has automatizado: has movido trabajo. Mide tiempo humano antes y después.


## 34.8 Proyecto guiado

Toma un flujo RAG y genera una tabla con coste y latencia por etapa. Luego optimiza solo una cosa: reducción de contexto, cambio de modelo o caché. Mide antes y después.


## 34.9 Qué puede cambiar en el futuro

Los modelos serán más baratos, pero las expectativas subirán. El coste relevante será coste por resultado útil, no coste por token aislado.


## 34.10 Ideas clave del capítulo

- Un sistema IA puede ser correcto y aun así inviable si cuesta demasiado o responde demasiado tarde.
- El sistema debe tener límites visibles.
- La calidad debe medirse antes y después de cada cambio.
- La operación importa tanto como la primera demo.
- Los errores deben ser trazables.
- La versión siguiente debe ser una mejora deliberada, no una reacción al ruido.

## Recursos relacionados

- Capítulo 30 — Laboratorio de implementación.
- Apéndice B — Proyectos guiados.
- Apéndice C — Checklists de producción.
- Apéndice D — Glosario operativo.
