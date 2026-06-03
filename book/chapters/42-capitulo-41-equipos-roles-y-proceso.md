---
title: "Capítulo 41 — Equipos, roles y proceso"
chapter: "42"
part: "Parte IX — Producto, empresa y adopción"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "intermedio"
estimated_reading_time: "37 minutos"
---

# Capítulo 41 — Equipos, roles y proceso

Construir con IA no elimina roles; cambia cómo colaboran producto, ingeniería, datos, negocio y operaciones.

Este capítulo cierra una pieza que faltaba en el libro: pasar de entender una técnica a saber operarla en un producto real.

La idea no es añadir complejidad por añadir complejidad. La idea es que cada sistema con IA tenga una forma clara de responder a tres preguntas:

- ¿qué debe hacer?;
- ¿cómo sabemos que lo está haciendo bien?;
- ¿qué ocurre cuando se equivoca?


## 41.1 El problema

Muchos proyectos IA fallan porque los trata una sola persona como experimento aislado. En producción hacen falta decisiones de producto, datos, seguridad, soporte, coste y adopción.


## 41.2 Principios prácticos

- Define propietario de producto.
- Define propietario técnico.
- Incluye experto de dominio.
- Incluye responsable de datos y permisos.
- Crea rituales de revisión de calidad.


## 41.3 Arquitectura mínima

Un diseño razonable puede empezar con este flujo:

```text
1. product owner
2. engineer
3. domain expert
4. data owner
5. security reviewer
6. support owner
```

No todos los proyectos necesitan todas las piezas desde el primer día. Pero si una pieza falta, debe faltar por decisión, no por despiste.


## 41.4 Implementación práctica

Para un equipo pequeño, bastan tres sombreros: quien entiende el problema, quien construye el sistema y quien valida el riesgo. Lo peligroso es que nadie tenga explícitamente esos sombreros.

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


## 41.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **tiempo hasta MVP**
- **adopción por usuarios**
- **errores reportados**
- **calidad semanal**
- **coste mensual**
- **mejoras publicadas**

No hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.


## 41.6 Checklist

- Hay dueño del caso de uso.
- Hay dueño técnico.
- Hay experto de dominio.
- Hay responsable de datos.
- Hay cadencia de revisión.
- Hay canal de feedback.
- Hay criterio para apagar o cambiar el sistema.


## 41.7 Antipatrones

### proyecto IA sin usuario real

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### ingeniería sin experto de dominio

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### negocio sin revisión técnica

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### nadie mira costes

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### nadie decide riesgos

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.


## 41.8 Proyecto guiado

Define un RACI simple para un copiloto interno: responsable, aprobador, consultados e informados para datos, prompts, tools, despliegue, soporte y evaluación.


## 41.9 Qué puede cambiar en el futuro

Los equipos adoptarán roles híbridos: AI product engineer, responsable de evaluación, diseñador de workflows y especialista en integración de modelos.


## 41.10 Ideas clave del capítulo

- Construir con IA no elimina roles; cambia cómo colaboran producto, ingeniería, datos, negocio y operaciones.
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
