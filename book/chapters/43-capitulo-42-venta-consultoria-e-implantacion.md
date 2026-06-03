---
title: "Capítulo 42 — Venta, consultoría e implantación"
chapter: "43"
part: "Parte IX — Producto, empresa y adopción"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "intermedio"
estimated_reading_time: "45 minutos"
---

# Capítulo 42 — Venta, consultoría e implantación

Vender IA práctica no consiste en prometer magia; consiste en reducir un problema caro con una solución medible.

Este capítulo cierra una pieza que faltaba en el libro: pasar de entender una técnica a saber operarla en un producto real.

La idea no es añadir complejidad por añadir complejidad. La idea es que cada sistema con IA tenga una forma clara de responder a tres preguntas:

- ¿qué debe hacer?;
- ¿cómo sabemos que lo está haciendo bien?;
- ¿qué ocurre cuando se equivoca?


## 42.1 El problema

Muchas ofertas IA fracasan porque venden tecnología en abstracto. Las empresas compran reducción de tiempos, menos errores, mejor atención, mejor documentación o más capacidad operativa.


## 42.2 Principios prácticos

- Empieza por proceso y dolor, no por modelo.
- Define métrica de éxito antes de demo.
- Vende piloto acotado.
- Incluye datos, integración y adopción en el alcance.
- No prometas autonomía total al principio.


## 42.3 Arquitectura mínima

Un diseño razonable puede empezar con este flujo:

```text
1. descubrimiento
2. diagnóstico
3. piloto
4. evaluación
5. implantación
6. operación
```

No todos los proyectos necesitan todas las piezas desde el primer día. Pero si una pieza falta, debe faltar por decisión, no por despiste.


## 42.4 Implementación práctica

Una propuesta seria debe incluir objetivo, alcance, fuentes de datos, integraciones, riesgos, criterios de aceptación, calendario, precio, mantenimiento y responsabilidades del cliente.

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


## 42.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **horas ahorradas**
- **tiempo de respuesta**
- **errores reducidos**
- **tickets desviados**
- **coste operativo**
- **adopción**

No hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.


## 42.6 Checklist

- El problema tiene dueño.
- La métrica de éxito es concreta.
- El piloto está limitado.
- Los datos están disponibles.
- Las integraciones están identificadas.
- Hay plan de adopción.
- Hay mantenimiento posterior.


## 42.7 Antipatrones

### vender chatbot genérico

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### prometer ahorro sin medir proceso

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### ignorar datos del cliente

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no incluir soporte

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### hacer demo que no se puede operar

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.


## 42.8 Proyecto guiado

Prepara una oferta de piloto de cuatro semanas para un chatbot de soporte con RAG: alcance, entregables, exclusiones, métricas, precio y plan de paso a producción.


## 42.9 Qué puede cambiar en el futuro

El mercado castigará soluciones genéricas y premiará implantaciones con conocimiento de dominio, integración real, evaluación y mantenimiento.


## 42.10 Ideas clave del capítulo

- Vender IA práctica no consiste en prometer magia; consiste en reducir un problema caro con una solución medible.
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
