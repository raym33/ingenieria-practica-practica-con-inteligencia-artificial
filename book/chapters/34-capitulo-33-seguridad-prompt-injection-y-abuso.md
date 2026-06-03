---
title: "Capítulo 33 — Seguridad, prompt injection y abuso"
chapter: "34"
part: "Parte VIII — Producción, seguridad y operación"
version: "0.1"
last_updated: "2026-06-03"
status: "muy cambiante"
level: "avanzado"
estimated_reading_time: "50 minutos"
---

# Capítulo 33 — Seguridad, prompt injection y abuso

La seguridad en IA no consiste en escribir mejores instrucciones, sino en limitar lo que el sistema puede hacer aunque el modelo se equivoque.

Este capítulo cierra una pieza que faltaba en el libro: pasar de entender una técnica a saber operarla en un producto real.

La idea no es añadir complejidad por añadir complejidad. La idea es que cada sistema con IA tenga una forma clara de responder a tres preguntas:

- ¿qué debe hacer?;
- ¿cómo sabemos que lo está haciendo bien?;
- ¿qué ocurre cuando se equivoca?


## 33.1 El problema

Los modelos mezclan instrucciones, datos y contexto. Un documento malicioso, un usuario creativo o una tool demasiado poderosa pueden convertir una conversación en una fuga de datos o una acción no deseada.


## 33.2 Principios prácticos

- Trata todo contenido externo como datos, nunca como instrucciones.
- Aplica permisos fuera del modelo.
- Reduce tools disponibles por usuario, tarea y entorno.
- Usa confirmaciones para acciones sensibles.
- Registra intentos de abuso y respuestas bloqueadas.


## 33.3 Arquitectura mínima

Un diseño razonable puede empezar con este flujo:

```text
1. clasificador de riesgo
2. política de permisos
3. allowlist de tools
4. separación de datos e instrucciones
5. validador de salida
6. auditoría
```

No todos los proyectos necesitan todas las piezas desde el primer día. Pero si una pieza falta, debe faltar por decisión, no por despiste.


## 33.4 Implementación práctica

Crea una política por capas: entrada, retrieval, tool selection, tool execution y salida. Si una capa falla, otra debe limitar el daño. No confíes en un único prompt de seguridad.

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


## 33.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **blocked_injection_attempts**
- **unsafe_tool_requests**
- **permission_denied_rate**
- **sensitive_data_exposure_rate**
- **manual_review_rate**
- **policy_false_positive_rate**

No hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.


## 33.6 Checklist

- Los documentos externos no pueden cambiar instrucciones del sistema.
- Las tools críticas no están siempre disponibles.
- Los permisos se verifican antes de retrieval y antes de ejecución.
- Las salidas se validan antes de mostrarse.
- Hay redacción de secretos en logs.
- Hay entorno separado para pruebas.
- Las acciones destructivas requieren doble confirmación.


## 33.7 Antipatrones

### confiar en 'ignora instrucciones maliciosas'

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### exponer filesystem completo

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### dar credenciales al modelo

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### permitir tools genéricas

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no probar ataques conocidos

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.


## 33.8 Proyecto guiado

Prepara una suite de diez ataques: exfiltración de prompt, documento con instrucciones maliciosas, petición de credenciales, salto de permisos, tool injection y acción destructiva. El sistema debe bloquear o degradar todos.


## 33.9 Qué puede cambiar en el futuro

Los ataques evolucionarán con modelos multimodales, agentes persistentes y memoria. La defensa seguirá girando alrededor de aislamiento, permisos, validación, auditoría y reducción de superficie.


## 33.10 Ideas clave del capítulo

- La seguridad en IA no consiste en escribir mejores instrucciones, sino en limitar lo que el sistema puede hacer aunque el modelo se equivoque.
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
