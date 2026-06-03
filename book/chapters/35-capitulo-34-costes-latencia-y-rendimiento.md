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

Este capítulo cierra una pieza que faltaba en el libro: pasar de entender una técnica a saber operarla en un producto real.

La idea no es añadir complejidad por añadir complejidad. La idea es que cada sistema con IA tenga una forma clara de responder a tres preguntas:

- ¿qué debe hacer?;
- ¿cómo sabemos que lo está haciendo bien?;
- ¿qué ocurre cuando se equivoca?


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


## 34.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **coste por conversación**
- **coste por usuario activo**
- **latencia p95**
- **tokens por respuesta**
- **cache hit rate**
- **retry rate**
- **coste de revisión humana**

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

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### meter demasiado contexto

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### hacer reranking sin medir

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no contar retries

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### ignorar coste de humano en el loop

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.


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
