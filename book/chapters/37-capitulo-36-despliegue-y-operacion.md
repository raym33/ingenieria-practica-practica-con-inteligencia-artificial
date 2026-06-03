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

### El gap entre chat y sistemas mission-critical

Pasar de un chat interno a un sistema conectado a producción no es un cambio incremental.

Es otro tipo de proyecto.

En un chat aislado, los riesgos principales son calidad de respuesta, coste y experiencia.

En un sistema mission-critical aparecen capas nuevas:

- permisos reales;
- datos sensibles;
- auditoría;
- trazas de acciones;
- revisión humana;
- integración con sistemas existentes;
- rollback;
- gestión de cambios de modelo;
- soporte operativo;
- responsables por área.

El error frecuente es pensar:

> Ya tenemos el prototipo. Solo falta conectarlo.

Conectar suele ser la parte difícil.

Checklist antes de conectar producción:

- ¿qué sistemas toca?;
- ¿qué datos lee?;
- ¿qué datos escribe?;
- ¿qué usuario autoriza cada acción?;
- ¿qué logs quedan?;
- ¿qué ocurre si cambia el modelo?;
- ¿qué ocurre si sube el coste?;
- ¿qué ocurre si una tool falla?;
- ¿quién revisa incidentes?;
- ¿quién puede apagar el sistema?

Si estas preguntas no tienen respuesta, el prototipo todavía no está listo para producción.

### Cambios de modelo como evento operativo

Los modelos cambian.

Mejoran, empeoran, se abaratan, suben de precio, alteran estilo, cambian tool calling, modifican latencia o dejan de estar disponibles.

Cada cambio de modelo debe tratarse como una release.

No como un ajuste menor.

Plan mínimo:

```text
1. Ejecutar suite de evaluación.
2. Comparar calidad, coste y latencia.
3. Revisar tool calls.
4. Revisar casos de permisos.
5. Probar en staging.
6. Publicar con porcentaje limitado.
7. Monitorizar regresiones.
8. Mantener rollback.
```

La arquitectura debe permitir cambiar de modelo sin rehacer todo el producto.

Eso implica separar:

- prompts;
- contratos de salida;
- tools;
- evaluación;
- routing;
- observabilidad;
- políticas de seguridad.

Cuando todo está acoplado al modelo de moda, cada actualización del proveedor se convierte en un susto.


## 36.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **deploy frequency**
- **regression rate**
- **rollback rate**
- **errores por versión**
- **coste por deploy**
- **tiempo hasta detectar fallo**
- **model change regression rate**
- **rollback time**

No hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.

### Matriz de demo a producción

Una demo suele optimizar una cosa: que se vea posible.

Producción optimiza otra: que siga funcionando cuando cambian usuarios, datos, modelos, costes y expectativas.

Antes de publicar, revisa esta matriz:

- **Prompt**: en demo suele ser texto pegado en el código; en producción debe estar versionado, probado y ser reversible.
- **Modelo**: en demo se elige el que mejor impresiona; en producción se elige por calidad, coste, latencia y riesgo.
- **Datos**: en demo se usan ejemplos preparados; en producción hay datos vivos, permisos, caducidad y fuentes contradictorias.
- **RAG**: en demo basta con una búsqueda que parece responder; en producción necesitas recall medido, citas, reranking si hace falta y reindexación controlada.
- **Tools**: en demo una función funciona una vez; en producción hay contratos, validación, permisos, errores y auditoría.
- **Evaluación**: en demo manda la prueba manual; en producción hay suite con casos, regresiones y umbral de publicación.
- **Observabilidad**: en demo hay logs básicos; en producción hay trazas por request, coste, latencia, feedback y fallo por intención.
- **Seguridad**: en demo se confía en el usuario; en producción hay límites explícitos, aislamiento, revisión y bloqueo de abuso.
- **Coste**: en demo parece irrelevante; en producción hay coste por feature, alertas, límites y degradación.
- **Rollback**: en demo vuelves a tocar el prompt; en producción restauras modelo, prompt, índice, tools y configuración.

La pregunta no es si el sistema puede responder bien una vez.

La pregunta es si puedes explicar, medir y revertir su comportamiento cuando responde mal.

### Production angle

Cada cambio importante debe tener una nota corta de operación:

```text
Qué cambia:
Por qué cambia:
Qué métrica debería mejorar:
Qué métrica podría empeorar:
Qué casos de evaluación cubren el cambio:
Qué trazas miraremos después:
Cómo revertimos:
```

Esta nota obliga a pensar como constructor, no como usuario de una herramienta.

Si no sabes qué puede empeorar, todavía no entiendes el cambio.


## 36.6 Checklist

- Hay staging.
- La evaluación corre antes de publicar.
- Los prompts tienen versión.
- Los índices tienen versión.
- Las tools tienen versión.
- Hay rollback.
- Hay alertas postdeploy.
- Hay una matriz demo a producción revisada.
- Cada release tiene nota de operación.
- El coste por feature se estima antes de abrir el acceso.
- La latencia p95 se mide con casos representativos.
- Las trazas se revisan durante las primeras horas o días tras publicar.


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
