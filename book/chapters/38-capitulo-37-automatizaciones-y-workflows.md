---
title: "Capítulo 37 — Automatizaciones y workflows"
chapter: "38"
part: "Parte IX — Producto, empresa y adopción"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "intermedio"
estimated_reading_time: "41 minutos"
---

# Capítulo 37 — Automatizaciones y workflows

Muchas soluciones IA no necesitan agentes autónomos; necesitan workflows claros con IA en los puntos correctos.

Este capítulo cierra una pieza que faltaba en el libro: pasar de entender una técnica a saber operarla en un producto real.

La idea no es añadir complejidad por añadir complejidad. La idea es que cada sistema con IA tenga una forma clara de responder a tres preguntas:

- ¿qué debe hacer?;
- ¿cómo sabemos que lo está haciendo bien?;
- ¿qué ocurre cuando se equivoca?


## 37.1 El problema

El hype empuja a crear agentes para todo. Pero la mayoría de procesos empresariales tienen pasos conocidos, permisos claros y puntos donde el modelo debe ayudar, no improvisar.


## 37.2 Principios prácticos

- Modela el proceso antes de meter IA.
- Usa IA para clasificar, resumir, redactar, extraer o decidir bajo límites.
- Mantén pasos críticos como workflow explícito.
- Escala a agente solo cuando haya incertidumbre real.
- Diseña revisión humana donde el coste del error sea alto.


## 37.3 Arquitectura mínima

Un diseño razonable puede empezar con este flujo:

```text
1. trigger
2. normalización
3. paso IA
4. validación
5. acción
6. notificación
7. auditoría
```

No todos los proyectos necesitan todas las piezas desde el primer día. Pero si una pieza falta, debe faltar por decisión, no por despiste.


## 37.4 Implementación práctica

Empieza con workflows de bajo riesgo: clasificar tickets, resumir reuniones, preparar borradores, extraer datos o generar informes. Luego conecta tools de escritura con confirmación.

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

### Núcleo determinístico, IA en los bordes

Una señal práctica que se repite en sistemas reales es esta:

> La mayor parte del flujo debería ser determinístico. El LLM solo debería entrar donde hay incertidumbre que aporta valor resolver.

Ejemplo de soporte:

```text
ticket recibido
  -> validar cliente
  -> buscar contrato
  -> clasificar intención con LLM
  -> recuperar documentación
  -> generar borrador con LLM
  -> validar formato
  -> pedir revisión humana
  -> enviar por workflow determinístico
```

El LLM no tiene que decidir todo.

Puede ayudar en:

- clasificación;
- extracción;
- resumen;
- redacción;
- priorización;
- explicación;
- detección de anomalías.

Pero otros pasos deberían ser código, reglas o workflow:

- permisos;
- cálculo de importes;
- envío;
- actualización de estado;
- auditoría;
- límites de coste;
- confirmaciones;
- retries.

Cada llamada al modelo añade coste, latencia y posibilidad de fallo.

Si un paso se puede resolver con una regla clara, usa una regla clara.

### Matriz de decisión

Usa LLM cuando:

- el input sea variable;
- la tarea requiera lenguaje;
- haya ambigüedad real;
- el coste del error esté controlado;
- la mejora de experiencia sea clara.

Usa workflow determinístico cuando:

- la regla sea estable;
- haya permisos o dinero;
- la acción sea externa;
- el resultado deba ser reproducible;
- el fallo sea caro;
- la explicación deba ser auditada.

El diseño maduro no es "agente contra workflow".

Es workflow con puntos inteligentes.


## 37.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **tiempo ahorrado**
- **errores reducidos**
- **tasa de revisión humana**
- **automatizaciones completadas**
- **fallos por integración**
- **satisfacción interna**
- **LLM calls por workflow**
- **deterministic step ratio**

No hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.


## 37.6 Checklist

- El proceso está dibujado.
- Los pasos IA están acotados.
- Hay validación de salida.
- Las acciones externas requieren confirmación.
- Hay logs por ejecución.
- Hay retry o fallback.
- Hay responsable del workflow.


## 37.7 Antipatrones

### agente autónomo para proceso lineal

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### automatizar sin propietario

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no definir fallback

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no medir ahorro real

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no distinguir borrador de acción

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.


## 37.8 Proyecto guiado

Automatiza el resumen semanal de tickets: recoge tickets cerrados, agrupa temas, genera informe, pide revisión humana y publica en un canal interno.


## 37.9 Qué puede cambiar en el futuro

Las plataformas no-code y low-code se mezclarán con agents y MCP. El valor estará en diseñar procesos robustos, no en encadenar herramientas por moda.


## 37.10 Ideas clave del capítulo

- Muchas soluciones IA no necesitan agentes autónomos; necesitan workflows claros con IA en los puntos correctos.
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
