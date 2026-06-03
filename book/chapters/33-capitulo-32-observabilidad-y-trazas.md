---
title: "Capítulo 32 — Observabilidad y trazas"
chapter: "33"
part: "Parte VIII — Producción, seguridad y operación"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "avanzado"
estimated_reading_time: "42 minutos"
---

# Capítulo 32 — Observabilidad y trazas

Un sistema IA sin trazas no se puede depurar, auditar ni mejorar con seriedad.

En software tradicional ya es difícil entender un error sin logs.

En sistemas con IA es peor, porque el fallo puede venir de muchas capas a la vez:

- el usuario pidió algo ambiguo;
- el retrieval trajo mal contexto;
- una fuente estaba obsoleta;
- el prompt cambió;
- el modelo eligió una tool incorrecta;
- la tool devolvió un error;
- la memoria introdujo una preferencia equivocada;
- la respuesta final sonó convincente aunque faltaba evidencia.

Si no registras esa cadena, no estás operando un producto.

Estás interpretando síntomas.


## 32.1 El problema

Cuando un usuario dice que la IA respondió mal, necesitas reconstruir qué pasó: prompt, modelo, contexto, tools, memoria, permisos, latencia y coste. Si solo guardas la respuesta final, llegas tarde.


## 32.2 Principios prácticos

- Registra eventos de principio a fin, no solo errores.
- Separa trazas técnicas de datos sensibles.
- Guarda identificadores de fuentes, tools y memoria usada.
- Convierte logs en métricas de producto.
- Diseña observabilidad desde el MVP.


## 32.3 Arquitectura mínima

Un diseño razonable puede empezar con este flujo:

```text
1. request id
2. span de entrada
3. span de retrieval
4. span de modelo
5. span de tools
6. span de validación
7. evento final de usuario
```

No todos los proyectos necesitan todas las piezas desde el primer día. Pero si una pieza falta, debe faltar por decisión, no por despiste.


## 32.4 Implementación práctica

Define un evento `ai_trace` con `request_id`, `user_id`, `feature`, `model`, `prompt_version`, `retrieved_chunks`, `tools_called`, `latency_ms`, `cost_usd`, `error` y `feedback`. Ese evento ya permite operar un primer producto.

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

### Evento mínimo

Un evento útil no necesita guardar todo.

Necesita guardar lo suficiente para reconstruir una decisión.

```json
{
  "request_id": "req_2026_06_03_00042",
  "timestamp": "2026-06-03T16:40:00Z",
  "feature": "support_copilot",
  "user_id_hash": "usr_hash_91ab",
  "tenant_id": "tenant_demo",
  "model": "provider/model-name",
  "prompt_version": "support-rag-v7",
  "retrieval": {
    "query": "politica devoluciones producto abierto",
    "top_k": 6,
    "chunk_ids": [
      "politica-devoluciones-2026:04",
      "faq-soporte:18"
    ]
  },
  "tools": [
    {
      "name": "create_ticket_draft",
      "status": "success",
      "latency_ms": 180
    }
  ],
  "tokens": {
    "input": 1840,
    "output": 310
  },
  "latency_ms": 2150,
  "cost_usd": 0.014,
  "outcome": "answered_with_sources",
  "feedback": null
}
```

No guardes datos sensibles por comodidad.

Guarda identificadores, versiones y decisiones.

### Trazas por capas

Una buena traza separa etapas:

```text
request
  -> input_normalization
  -> permission_check
  -> retrieval
  -> context_building
  -> model_call
  -> tool_call
  -> output_validation
  -> user_response
```

Cuando el sistema falla, quieres saber en qué etapa ocurrió.

Si el retrieval trajo basura, no arregles el prompt.

Si el prompt pidió una acción ambigua, no culpes al modelo.

Si la tool devolvió error no estructurado, no cambies el RAG.

La observabilidad evita que optimices la pieza equivocada.

### Qué redactar

No todo debe llegar al log completo.

Redacta:

- emails;
- teléfonos;
- nombres de terceros si no son necesarios;
- direcciones;
- claves;
- tokens;
- fragmentos largos de documentos sensibles;
- audio completo salvo necesidad justificada.

Conserva:

- hashes de usuario;
- ids de fuente;
- ids de chunk;
- versión de prompt;
- versión de modelo;
- nombre de tool;
- error estructurado;
- coste;
- latencia;
- feedback.

La trazabilidad no exige vigilancia total.

Exige evidencia suficiente y respeto por los datos.

### Fallos silenciosos

En un sistema IA, muchos fallos no lanzan excepción.

El servidor responde 200.

La UI muestra una respuesta.

El log parece limpio.

Y aun así el usuario piensa:

> Esto no me sirve.

Luego se va.

Ese es un fallo de producto, aunque no haya stack trace.

Para detectar fallos silenciosos, mide señales implícitas:

- regeneraciones;
- reformulaciones inmediatas;
- abandono tras respuesta;
- copiar cero veces;
- edición excesiva antes de usar;
- escalado a humano;
- cancelación de acción;
- scroll rápido sin interacción;
- sesiones que no vuelven.

Y señales explícitas:

- thumbs down;
- motivo de rechazo;
- comentario de usuario;
- reporte de fuente incorrecta;
- marca de "no resolvió mi tarea".

La observabilidad buena conecta estas señales con la traza completa.

No basta saber que hubo feedback negativo.

Hay que saber qué intención tenía el usuario, qué fuentes se recuperaron, qué modelo respondió, qué tool se llamó y qué versión del prompt estaba activa.

### Clusterizar por intención

Cuando acumules suficientes trazas, no las mires una a una.

Agrúpalas por intención.

Ejemplo:

```text
intención: resumir tickets de facturación
volumen semanal: 840
feedback negativo: 18%
regeneraciones: 24%
causa probable: el resumen pierde productos secundarios
acción: convertir el flujo en workflow semideterminístico
```

El objetivo es transformar una masa de conversaciones en una cola de mejoras de producto.

Primero arreglas los clusters con más volumen, más frustración o más riesgo.

Este enfoque evita una trampa común: intentar mejorar "el asistente" en abstracto.

No mejoras el asistente.

Mejoras workflows concretos.


## 32.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **latencia p50/p95/p99**
- **tokens por request**
- **coste por feature**
- **errores por tool**
- **respuestas sin fuente**
- **feedback negativo**
- **interacciones escaladas a humano**
- **regeneration rate**
- **intent failure rate**
- **silent abandonment rate**

No hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.


## 32.6 Checklist

- Cada request tiene identificador.
- Cada prompt tiene versión.
- Cada tool call queda registrada.
- Cada fuente recuperada queda identificada.
- Los datos sensibles se redactan.
- Los errores son estructurados.
- Hay panel semanal de calidad, coste y latencia.


## 32.7 Antipatrones

### guardar prompts completos con datos sensibles

Parece cómodo porque permite depurar rápido.

También puede convertir tu sistema de logs en el sitio más sensible de toda la arquitectura.

Guarda versión de prompt, plantilla, variables redactadas e identificadores. Si necesitas capturar una muestra completa, hazlo con retención corta, consentimiento y acceso restringido.

### no versionar prompts

Si no sabes qué prompt respondió, no puedes reproducir el fallo.

El prompt es código de comportamiento. Debe tener versión, fecha, responsable y motivo de cambio. Un cambio de dos frases puede alterar retrieval, tool choice, tono, abstención y coste.

### no saber qué modelo respondió

Muchos equipos prueban varios modelos y luego olvidan registrar cuál produjo cada respuesta.

Cuando aparece un fallo, no saben si viene del modelo, del prompt, del contexto o del proveedor. Registra proveedor, modelo, fecha, configuración y temperatura si aplica.

### registrar solo errores

Los errores explícitos son la parte fácil.

Los problemas más caros son respuestas aceptadas pero pobres: citas irrelevantes, acciones innecesarias, costes altos, latencia lenta o usuarios que dejan de usar el sistema. Para ver eso necesitas eventos normales, no solo excepciones.

### no conectar feedback con trazas

Un pulgar abajo sin traza no enseña casi nada.

Un pulgar abajo conectado a pregunta, fuentes, prompt, modelo, tools y latencia se convierte en material de mejora. El feedback debe apuntar al evento que lo produjo.


## 32.8 Proyecto guiado

Construye un panel simple con tres tablas: interacciones recientes, tools fallidas y preguntas sin respuesta. No necesitas una plataforma compleja al principio; una tabla Postgres bien diseñada ya cambia el proyecto.


## 32.9 Qué puede cambiar en el futuro

La observabilidad IA tenderá a integrarse con trazas estándar, OpenTelemetry, evaluaciones online y alertas de deriva. Lo importante será mantener una cadena auditable entre usuario, contexto, modelo y acción.


## 32.10 Ideas clave del capítulo

- Un sistema IA sin trazas no se puede depurar, auditar ni mejorar con seriedad.
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
