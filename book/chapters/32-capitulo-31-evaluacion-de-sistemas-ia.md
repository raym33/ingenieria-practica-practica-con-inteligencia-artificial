---
title: "Capítulo 31 — Evaluación de sistemas IA"
chapter: "32"
part: "Parte VIII — Producción, seguridad y operación"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "avanzado"
estimated_reading_time: "48 minutos"
---

# Capítulo 31 — Evaluación de sistemas IA

La evaluación es la diferencia entre creer que un sistema funciona y saber dónde falla.

Este capítulo cierra una pieza que faltaba en el libro: pasar de entender una técnica a saber operarla en un producto real.

La idea no es añadir complejidad por añadir complejidad. La idea es que cada sistema con IA tenga una forma clara de responder a tres preguntas:

- ¿qué debe hacer?;
- ¿cómo sabemos que lo está haciendo bien?;
- ¿qué ocurre cuando se equivoca?


## 31.1 El problema

Los equipos suelen evaluar sistemas IA leyendo diez respuestas a mano. Eso sirve para una demo, pero no sirve para decidir cambios de modelo, prompts, retrieval, tools o memoria. Sin evaluación, cada mejora es una apuesta.


## 31.2 Principios prácticos

- Define una suite pequeña de casos reales antes de optimizar.
- Separa evaluación de retrieval, respuesta, tools, seguridad y experiencia.
- Mide regresiones cada vez que cambie modelo, prompt, índice o esquema.
- Combina evaluación automática con revisión humana en casos de alto riesgo.
- No uses una única métrica para decidir calidad.


## 31.3 Arquitectura mínima

Un diseño razonable puede empezar con este flujo:

```text
1. dataset de casos versionado
2. runner de evaluación
3. modelo o sistema candidato
4. evaluadores automáticos
5. muestreo humano
6. informe de regresión
```

No todos los proyectos necesitan todas las piezas desde el primer día. Pero si una pieza falta, debe faltar por decisión, no por despiste.


## 31.4 Implementación práctica

Empieza con cincuenta casos. Diez normales, diez difíciles, diez ambiguos, diez fuera de alcance y diez adversariales. Cada caso debe tener entrada, usuario, permisos, salida esperada, fuentes esperadas y criterios de fallo.

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


## 31.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **exactitud por tarea**
- **cobertura de respuesta**
- **validez de citas**
- **tasa de abstención correcta**
- **tool call accuracy**
- **unsafe action rate**
- **coste por caso**

No hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.


## 31.6 Checklist

- Existe dataset versionado.
- Cada caso tiene criterio de aceptación.
- Las pruebas cubren permisos y datos sensibles.
- Se mide coste y latencia durante la evaluación.
- Hay umbrales mínimos para publicar.
- Las regresiones bloquean despliegue.
- Los cambios de modelo se comparan contra baseline.


## 31.7 Antipatrones

### evaluar solo con ejemplos felices

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### cambiar prompt sin suite de regresión

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### usar al propio modelo como único juez

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### medir solo satisfacción subjetiva

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### olvidar casos de permisos

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.


## 31.8 Proyecto guiado

Crea un archivo `evals/support-rag.jsonl` con cincuenta preguntas reales de soporte. Ejecuta la misma suite con dos modelos, dos prompts y dos configuraciones de retrieval. Publica una tabla con calidad, coste y latencia.


## 31.9 Qué puede cambiar en el futuro

La evaluación se moverá hacia suites continuas, trazas reales anonimizadas, jueces especializados y benchmarks internos por dominio. Pero la base seguirá siendo la misma: casos claros, criterios claros y comparación contra baseline.


## 31.10 Ideas clave del capítulo

- La evaluación es la diferencia entre creer que un sistema funciona y saber dónde falla.
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
