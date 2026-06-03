---
title: "Capítulo 36 — Despliegue y operación"
chapter: "37"
part: "Parte VIII — Producción, seguridad y operación"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "intermedio"
estimated_reading_time: "43 minutos"
---

# Capítulo 36 — Despliegue y operación

Desplegar IA no es subir una API; es operar modelos, datos, prompts, índices, tools y usuarios cambiantes.

Este capítulo cierra una pieza que faltaba en el libro: pasar de entender una técnica a saber operarla en un producto real.

La idea no es añadir complejidad por añadir complejidad. La idea es que cada sistema con IA tenga una forma clara de responder a tres preguntas:

- ¿qué debe hacer?;
- ¿cómo sabemos que lo está haciendo bien?;
- ¿qué ocurre cuando se equivoca?


## 36.1 El problema

Muchos equipos despliegan un prototipo sin rollback de prompt, sin versión de índice, sin límites de coste y sin forma de saber si el modelo nuevo empeoró el producto.


## 36.2 Principios prácticos

- Versiona prompts, modelos, índices y tools.
- Separa entorno local, staging y producción.
- Publica cambios con evaluación previa.
- Ten rollback para modelo, prompt e índice.
- Monitorea coste, latencia y calidad después del despliegue.


## 36.3 Arquitectura mínima

Un diseño razonable puede empezar con este flujo:

```text
1. repositorio
2. CI con evaluación
3. staging con datos controlados
4. producción con límites
5. observabilidad
6. rollback
```

No todos los proyectos necesitan todas las piezas desde el primer día. Pero si una pieza falta, debe faltar por decisión, no por despiste.


## 36.4 Implementación práctica

Cada release debería registrar versión de prompt, modelo, embeddings, índice, tools y política. Si un usuario reporta un fallo, debes poder reconstruir la versión exacta.

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


## 36.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **deploy frequency**
- **regression rate**
- **rollback rate**
- **errores por versión**
- **coste por deploy**
- **tiempo hasta detectar fallo**

No hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.


## 36.6 Checklist

- Hay staging.
- La evaluación corre antes de publicar.
- Los prompts tienen versión.
- Los índices tienen versión.
- Las tools tienen versión.
- Hay rollback.
- Hay alertas postdeploy.


## 36.7 Antipatrones

### cambiar prompts directamente en producción

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### reindexar sin registrar versión

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no guardar configuración de modelo

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### desplegar sin límites de coste

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.

### no tener staging

Este patrón suele aparecer cuando el equipo optimiza por velocidad de demo y no por operación. Puede funcionar una tarde, pero se vuelve caro cuando entran usuarios reales, datos reales y responsabilidad real.


## 36.8 Proyecto guiado

Añade a un proyecto IA un archivo `release.json` que registre modelo, prompt, embeddings, índice, tools, evaluación y fecha. Genera uno por cada publicación.


## 36.9 Qué puede cambiar en el futuro

La operación IA se parecerá cada vez más a MLOps ligero combinado con DevOps y producto. La clave será versionar todo lo que cambia comportamiento.


## 36.10 Ideas clave del capítulo

- Desplegar IA no es subir una API; es operar modelos, datos, prompts, índices, tools y usuarios cambiantes.
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
