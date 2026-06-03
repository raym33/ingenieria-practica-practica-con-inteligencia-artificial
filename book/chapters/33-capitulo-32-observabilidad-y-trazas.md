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

Este capítulo cierra una pieza que faltaba en el libro: pasar de entender una técnica a saber operarla en un producto real.

La idea no es añadir complejidad por añadir complejidad. La idea es que cada sistema con IA tenga una forma clara de responder a tres preguntas:

- ¿qué debe hacer?;
- ¿cómo sabemos que lo está haciendo bien?;
- ¿qué ocurre cuando se equivoca?


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


## 32.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **latencia p50/p95/p99**
- **tokens por request**
- **coste por feature**
- **errores por tool**
- **respuestas sin fuente**
- **feedback negativo**
- **interacciones escaladas a humano**

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

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no versionar prompts

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no saber qué modelo respondió

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### registrar solo errores

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no conectar feedback con trazas

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.


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
