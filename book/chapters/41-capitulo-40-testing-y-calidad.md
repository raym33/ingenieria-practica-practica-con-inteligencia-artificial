---
title: "Capítulo 40 — Testing y calidad"
chapter: "41"
part: "Parte IX — Producto, empresa y adopción"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "avanzado"
estimated_reading_time: "43 minutos"
---

# Capítulo 40 — Testing y calidad

Testear sistemas IA exige probar código determinista y comportamiento probabilístico sin confundirlos.

Este capítulo cierra una pieza que faltaba en el libro: pasar de entender una técnica a saber operarla en un producto real.

La idea no es añadir complejidad por añadir complejidad. La idea es que cada sistema con IA tenga una forma clara de responder a tres preguntas:

- ¿qué debe hacer?;
- ¿cómo sabemos que lo está haciendo bien?;
- ¿qué ocurre cuando se equivoca?


## 40.1 El problema

Los equipos intentan probar IA como si todo fuera determinista o se rinden porque el modelo varía. Ambas posturas son malas. Hay que testear capas.


## 40.2 Principios prácticos

- Prueba funciones deterministas con tests normales.
- Prueba prompts y modelos con evaluación por casos.
- Prueba tools con entradas válidas, inválidas y maliciosas.
- Prueba retrieval con fuentes esperadas.
- Prueba producto con usuarios reales.


## 40.3 Arquitectura mínima

Un diseño razonable puede empezar con este flujo:

```text
1. unit tests
2. contract tests
3. eval tests
4. security tests
5. integration tests
6. user acceptance tests
```

No todos los proyectos necesitan todas las piezas desde el primer día. Pero si una pieza falta, debe faltar por decisión, no por despiste.


## 40.4 Implementación práctica

No intentes verificar palabra por palabra. Verifica contrato, fuentes, puntos obligatorios, ausencia de datos prohibidos, tool correcta y comportamiento ante incertidumbre.

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


## 40.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **test pass rate**
- **eval pass rate**
- **regresiones por release**
- **bugs por feature**
- **fallos de tool**
- **errores detectados antes de producción**

No hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.


## 40.6 Checklist

- Hay tests unitarios para validadores.
- Hay tests de contrato JSON.
- Hay evals para respuestas.
- Hay tests de permisos.
- Hay tests de prompt injection.
- Hay tests de tools.
- Hay pruebas manuales de UX.


## 40.7 Antipatrones

### snapshot exacto de respuesta completa

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no probar errores

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no probar permisos

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### solo evaluar en producción

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no separar código de comportamiento IA

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.


## 40.8 Proyecto guiado

Construye una suite mixta: diez unit tests para tools, veinte eval cases para RAG y cinco ataques de seguridad. Haz que corra antes de cada release.


## 40.9 Qué puede cambiar en el futuro

El testing IA incorporará más simuladores, jueces especializados y trazas reales. Pero los contratos y casos seguirán siendo la base.


## 40.10 Ideas clave del capítulo

- Testear sistemas IA exige probar código determinista y comportamiento probabilístico sin confundirlos.
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
