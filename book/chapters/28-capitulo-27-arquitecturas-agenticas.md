---
title: "Capítulo 27 — Arquitecturas agenticas"
chapter: "28"
part: "Parte VII — Agentes, tools y automatización"
version: "0.1"
last_updated: "2026-06-03"
status: "muy cambiante"
level: "intermedio-avanzado"
estimated_reading_time: "38 minutos"
---

# Capítulo 27 — Arquitecturas agenticas

Un agente aislado puede ser útil.

Pero cuando las tareas crecen, aparecen preguntas nuevas:

- ¿Debe planificar antes de actuar?
- ¿Debe ejecutar paso a paso?
- ¿Debe haber un verificador?
- ¿Debe dividir trabajo entre subagentes?
- ¿Debe usar RAG?
- ¿Debe tener memoria?
- ¿Debe llamar tools?
- ¿Debe pedir confirmación?
- ¿Debe ejecutarse en background?
- ¿Debe integrarse con workflows clásicos?
- ¿Debe haber colas, logs y retries?
- ¿Cómo se evita que entre en bucles?

Ahí entran las arquitecturas agenticas.

Una arquitectura agentica no es poner varios modelos a hablar entre sí.

Es diseñar cómo se coordinan objetivos, contexto, herramientas, decisiones, verificación, memoria, límites y humanos.

---

## 27.1 Arquitectura agentica no significa multiagente

Un error común:

```text
agentic = muchos agentes
```

No necesariamente.

Un sistema agentic puede tener un solo agente con tools y bucle.

Y un sistema multiagente puede ser peor que uno simple.

La arquitectura correcta depende de:

- tarea;
- riesgo;
- coste;
- latencia;
- necesidad de verificación;
- complejidad;
- herramientas;
- supervisión;
- mantenibilidad.

Regla:

```text
Empieza con la arquitectura más simple que permita controlar la tarea.
```

---

## 27.2 Patrón 1: agente simple con tools

Arquitectura:

```text
usuario → agente → tool → observación → respuesta
```

Ejemplo:

```text
Usuario: ¿Qué tickets críticos hay hoy?

Agente:
1. llama list_tickets(priority="critical")
2. resume resultados
3. devuelve respuesta
```

Ventajas:

- simple;
- rápido;
- fácil de implementar;
- útil para tareas concretas.

Limitaciones:

- poco control en tareas largas;
- puede elegir mal tool;
- puede necesitar límites;
- verificación limitada.

Úsalo para consultas simples, soporte interno, tareas de lectura y prototipos.

---

## 27.3 Patrón 2: ReAct

ReAct combina razonamiento y acción.

Flujo conceptual:

```text
pensar → actuar → observar → pensar → actuar → observar
```

Ejemplo:

```text
Objetivo: encontrar solución a error 403.

1. Buscar error 403 en documentación.
2. Observar resultados.
3. Buscar tickets similares.
4. Observar.
5. Responder con pasos.
```

Ventajas:

- flexible;
- natural para tools;
- bueno para investigación;
- puede adaptarse.

Riesgos:

- loops;
- coste;
- latencia;
- acciones innecesarias;
- difícil de auditar si no hay trazas.

Necesita límite de pasos, logs, herramientas seguras y criterios de parada.

---

## 27.4 Patrón 3: planner-executor

Arquitectura:

```text
usuario → planner → plan → executor → resultado
```

El planner crea un plan.

El executor ejecuta.

Ejemplo:

```text
Objetivo: preparar informe semanal de soporte.

Planner:
1. Obtener tickets de la semana.
2. Agrupar por categoría.
3. Detectar críticos.
4. Buscar causas recurrentes.
5. Generar informe.
```

Ventajas:

- claridad;
- revisable;
- mejor para tareas largas;
- permite aprobación previa;
- facilita logs.

Limitaciones:

- más coste;
- plan puede fallar;
- necesita replanning;
- más piezas.

Útil para informes, investigación, agentes de código, análisis multi-fuente y procesos profesionales.

---

## 27.5 Patrón 4: planner-executor-verifier

Añade verificación.

```text
planner → executor → verifier → resultado final
```

El verifier revisa:

- si se cumplió objetivo;
- si hay fuentes;
- si hubo errores;
- si falta algo;
- si se violaron reglas;
- si hay que reintentar.

Ejemplo en RAG:

```text
Executor genera respuesta.
Verifier comprueba si cada afirmación está soportada por fuentes.
```

Ventajas:

- más calidad;
- menos alucinación;
- mejor seguridad;
- útil en dominios sensibles.

Limitaciones:

- más coste;
- más latencia;
- el verifier puede equivocarse;
- requiere rúbricas.

---

## 27.6 Patrón 5: humano en el loop

Arquitectura:

```text
agente prepara → humano revisa → humano aprueba → tool ejecuta
```

Ejemplos:

- enviar email;
- crear presupuesto;
- emitir reembolso;
- modificar CRM;
- publicar contenido;
- crear PR;
- responder a cliente.

Ventajas:

- reduce riesgo;
- mantiene control;
- facilita adopción;
- útil en empresas;
- ideal para primeras fases.

En muchos productos reales, este es el patrón ganador.

---

## 27.7 Patrón 6: supervisor-workers

Arquitectura:

```text
supervisor
├── worker investigación
├── worker código
├── worker redacción
├── worker verificación
└── worker pruebas
```

El supervisor reparte tareas.

Los workers ejecutan subtareas.

Ventajas:

- paralelismo conceptual;
- especialización;
- separación de roles;
- útil en tareas complejas.

Riesgos:

- coordinación difícil;
- coste alto;
- contexto duplicado;
- inconsistencias;
- debugging complejo.

No usar si un solo agente basta.

---

## 27.8 Patrón 7: multiagente deliberativo

Varios agentes discuten o revisan.

Ejemplo:

```text
Arquitecto propone.
Crítico revisa.
Implementador ajusta.
Verificador evalúa.
```

Puede ser útil para:

- diseño arquitectónico;
- decisiones complejas;
- revisión;
- generación de alternativas;
- análisis de riesgos.

Riesgos:

- coste;
- latencia;
- falsa sensación de consenso;
- agentes repiten errores;
- difícil evaluación.

La deliberación no sustituye evidencia.

---

## 27.9 Patrón 8: agente crítico

Un agente crítico revisa una salida.

Puede preguntar:

- ¿hay alucinaciones?
- ¿faltan fuentes?
- ¿cumple formato?
- ¿hay riesgo?
- ¿hay contradicciones?
- ¿se usaron tools correctas?
- ¿hay datos inventados?

Ejemplo:

```text
Critic:
La respuesta menciona una penalización de 2 meses, pero ninguna fuente lo respalda.
```

Útil para RAG, soporte, legal, salud, código, informes y propuestas comerciales.

Pero hay que calibrarlo.

---

## 27.10 Patrón 9: router

Un router decide qué subflujo usar.

```text
mensaje → router → FAQ / RAG / tool / humano / fuera de alcance
```

Ejemplo:

- pregunta simple → FAQ;
- documental → RAG;
- acción → workflow;
- riesgo alto → humano;
- soporte técnico → agente técnico.

Ventajas:

- reduce coste;
- mejora control;
- evita usar agente para todo;
- permite especialización.

Riesgos:

- error de clasificación;
- rutas mal definidas;
- fallback pobre.

Router debe evaluarse.

---

## 27.11 Patrón 10: workflow + agente

Muchos sistemas reales combinan workflow determinista y agente.

```text
workflow:
1. recibir email
2. clasificar
3. si simple → respuesta plantilla
4. si complejo → agente investiga
5. humano revisa
```

Ventajas:

- control;
- menor coste;
- agente solo donde aporta;
- fácil de auditar;
- buena opción empresarial.

Este patrón suele ser mejor que “todo agente”.

---

## 27.12 Patrón 11: agente como tool

Un workflow puede llamar a un agente como si fuera una función.

Ejemplo:

```text
analyze_contract_risks(document_id)
```

Por dentro hay un agente que:

- busca cláusulas;
- compara;
- genera informe;
- verifica fuentes.

Pero para el sistema externo es una tool.

Esto encapsula complejidad.

Muy útil para producto.

---

## 27.13 Patrón 12: RAG como tool

RAG puede ser una herramienta.

```text
search_documents(query, filters)
get_source(chunk_id)
```

Un agente puede usarla para:

- buscar políticas;
- revisar contratos;
- responder soporte;
- encontrar documentación;
- comparar fuentes.

Reglas:

- permisos antes de retrieval;
- fuentes visibles;
- no seguir instrucciones de documentos;
- logs;
- no encontrado.

---

## 27.14 Patrón 13: SQL/tool calling híbrido

Para datos estructurados:

```text
pregunta → detectar intención → consulta SQL segura → respuesta
```

Para documentos:

```text
pregunta → RAG → respuesta con fuentes
```

Para ambos:

```text
agente decide: SQL + RAG + síntesis
```

Ejemplo:

```text
¿Cuántos clientes con contrato vencido tienen incidencias abiertas?
```

Puede requerir SQL, tickets, RAG y síntesis.

Cada tool debe estar limitada.

---

## 27.15 Patrón 14: agente con memoria

Memoria puede guardar:

- preferencias del usuario;
- estado de tarea;
- decisiones previas;
- contexto de proyecto;
- errores recurrentes;
- fuentes usadas.

Arquitectura:

```text
input → recuperar memoria relevante → agente → actualizar memoria
```

Riesgos:

- privacidad;
- obsolescencia;
- contaminación;
- mezcla de usuarios;
- sobrecontexto.

Memoria debe tener política:

- qué se guarda;
- cuánto tiempo;
- quién puede verlo;
- cómo se borra;
- cómo se corrige.

---

## 27.16 Patrón 15: agente con cola

Para tareas largas, no ejecutes todo en request síncrona.

Arquitectura:

```text
usuario → crear job → cola → worker agentic → resultado → notificación
```

Útil para:

- informes largos;
- reindexación;
- análisis documental;
- generación masiva;
- revisión de repos;
- agentes nocturnos;
- procesamiento de audio/vídeo.

Necesitas estado del job, reintentos, timeouts, logs, cancelación, coste y resultados parciales.

---

## 27.17 Patrón 16: agente programado

Un agente puede ejecutarse periódicamente.

Ejemplos:

- resumen diario de tickets;
- detección de documentos obsoletos;
- informe semanal de ventas;
- revisión de errores;
- monitorización de menciones;
- actualización de base de conocimiento.

Arquitectura:

```text
cron → agente → tools → informe → humano
```

Empieza read-only.

---

## 27.18 Patrón 17: agente de monitorización

Agente que observa eventos.

```text
evento → análisis → decisión → alerta/tarea
```

Ejemplo:

- error crítico;
- ticket VIP;
- cambio en normativa;
- caída de servicio;
- coste anómalo;
- documento nuevo.

Debe evitar spam.

Usa umbrales, deduplicación y escalado.

---

## 27.19 Patrón 18: agente de código

Arquitectura típica:

```text
issue → plan → cambios → tests → diff → revisión → PR
```

Componentes:

- reglas de repo;
- acceso filesystem;
- terminal;
- Git;
- tests;
- documentación;
- verificador;
- CI;
- revisión humana.

Riesgos:

- cambios grandes;
- romper tests;
- tocar secretos;
- dependencias innecesarias;
- arquitectura incoherente.

Necesita reglas estrictas.

---

## 27.20 Patrón 19: agente de investigación

Flujo:

```text
pregunta → plan de investigación → búsqueda → lectura → extracción → síntesis → citas → verificación
```

Riesgos:

- fuentes malas;
- información obsoleta;
- citas débiles;
- sesgo;
- exceso de confianza.

Necesita fuentes, fechas, comparación, verificación y trazabilidad.

---

## 27.21 Patrón 20: agente de documentos

Flujo:

```text
documento → extracción → análisis → preguntas → informe → revisión
```

Casos:

- contratos;
- expedientes;
- informes;
- facturas;
- CVs;
- propuestas;
- normativas.

Puede usar OCR, RAG, extracción estructurada, reglas y verificador.

Necesita fuentes y trazabilidad.

---

## 27.22 Patrón 21: agente de voz

Arquitectura:

```text
audio → STT → agente → tools/RAG → respuesta breve → TTS
```

Particularidades:

- baja latencia;
- turnos;
- interrupciones;
- transcripción;
- síntesis;
- ruido;
- confirmación;
- fallback.

Para voz, las arquitecturas largas se notan mucho.

Optimiza para brevedad.

---

## 27.23 Patrón 22: agente local-first

Arquitectura:

```text
modelo local
+ RAG local
+ tools locales
+ interfaz LAN
+ logs
+ permisos
```

Casos:

- PYMEs;
- despachos;
- clínicas;
- administración;
- educación;
- homelab.

Ventajas:

- privacidad;
- control;
- coste fijo.

Riesgos:

- mantenimiento;
- hardware;
- calidad;
- backups;
- seguridad local.

---

## 27.24 Orquestador y workers LLM

Un patrón potente para construir software es:

```text
orquestador → define tarea, integra y verifica
workers → generan piezas
verificador → ejecuta tests/revisa
```

Ejemplo:

- orquestador mantiene contexto;
- worker genera backend;
- worker genera frontend;
- worker escribe tests;
- verificador ejecuta y revisa.

Principio:

```text
Generar código es barato; corregirlo es caro.
```

Por eso la arquitectura debe optimizar verificación.

---

## 27.25 Arquitectura de verificación

Un sistema agentic serio debe verificar.

Tipos:

- tests automáticos;
- lint;
- typecheck;
- ejecución real;
- snapshot;
- revisión de diff;
- evaluación LLM;
- validación contra fuentes;
- revisión humana.

En IA, verificar es más importante que generar.

---

## 27.26 Control de bucles

Los agentes pueden entrar en loops.

Ejemplo:

```text
buscar → no encuentra → buscar → no encuentra → buscar...
```

Controles:

- max_steps;
- max_tool_calls;
- max_cost;
- max_time;
- detección de repetición;
- fallback;
- escalado;
- criterio de parada.

Sin límites, agente = riesgo operativo.

---

## 27.27 Gestión de errores

Tools fallan.

El agente debe saber:

- reintentar;
- cambiar estrategia;
- pedir datos;
- escalar;
- terminar;
- explicar error.

No todos los errores se resuelven reintentando.

Errores de permisos no se arreglan con más prompts.

---

## 27.28 Estados y trazas

Guarda estado:

- objetivo;
- plan;
- paso actual;
- tools;
- resultados;
- errores;
- coste;
- fuentes;
- decisión final.

Las trazas permiten:

- depurar;
- auditar;
- evaluar;
- mejorar;
- explicar.

Arquitectura agentica sin trazas es caja negra.

---

## 27.29 Evaluación de arquitecturas

Evalúa por tareas.

Métricas:

- task success rate;
- pasos medios;
- coste medio;
- latencia;
- errores;
- escalados;
- acciones bloqueadas;
- satisfacción;
- regresiones;
- seguridad.

No basta con leer una salida bonita.

Evalúa proceso.

---

## 27.30 Coste

Arquitecturas agenticas pueden multiplicar coste.

Coste viene de:

- planner;
- executor;
- verifier;
- tools;
- RAG;
- reranking;
- memoria;
- retries;
- logs;
- evaluación.

Optimiza:

- modelos pequeños para routing;
- workflows deterministas;
- cache;
- límites;
- tareas batch;
- verificación selectiva;
- usar agente solo donde aporta.

---

## 27.31 Latencia

Más pasos = más latencia.

Para usuario en chat, cuidado.

Para tareas batch, importa menos.

Diseña según modo:

### Interactivo

- pocos pasos;
- streaming;
- respuestas parciales;
- tools rápidas.

### Batch

- más análisis;
- verificación;
- colas;
- notificaciones.

No uses arquitectura batch en conversación en tiempo real.

---

## 27.32 Seguridad

Arquitecturas agenticas amplían superficie:

- más tools;
- más datos;
- más pasos;
- más logs;
- más posibilidades de prompt injection;
- más permisos;
- más coste.

Medidas:

- permisos mínimos;
- separación lectura/escritura;
- confirmación;
- sandbox;
- allowlists;
- logs;
- evaluación adversarial;
- aislamiento por tenant;
- límites.

---

## 27.33 Arquitectura para MVP

Para MVP agentic:

```text
router simple
+ RAG/tool read-only
+ generación
+ logs
+ feedback
+ humano para acciones
```

Evita:

- multiagente complejo;
- autonomía total;
- memoria larga;
- tools críticas;
- producción sin logs;
- workflows ocultos.

El MVP debe probar valor, no demostrar moda.

---

## 27.34 Arquitectura para producción

Producción requiere:

- autenticación;
- autorización;
- herramientas limitadas;
- estado;
- logs;
- observabilidad;
- evaluación;
- límites de coste;
- límites de pasos;
- errores estructurados;
- handoff humano;
- auditoría;
- backups;
- despliegue reproducible;
- monitoreo.

La diferencia entre demo y producción está en el control.

---

## 27.35 Antipatrones

### Multiagente por hype

Más agentes no significa mejor.

### Sin verificador

Riesgo.

### Sin logs

Caja negra.

### Sin límites

Loops y coste.

### Tools demasiado poderosas

Peligro.

### Agente para proceso lineal

Sobreingeniería.

### Workflow inexistente

Caos.

### Planner que nunca se revisa

Planes malos.

### Memoria sin política

Privacidad y ruido.

### Producción sin humano en el loop

Riesgo alto.

---

## 27.36 Ideas clave del capítulo

- Arquitectura agentica no significa necesariamente multiagente.
- Empieza simple y añade complejidad solo si resuelve un problema medido.
- Patrones útiles: agente simple, ReAct, planner-executor, verifier, router, workflow + agente, supervisor-workers.
- El humano en el loop es una arquitectura, no una debilidad.
- RAG y SQL pueden ser tools dentro de agentes.
- Las colas son importantes para tareas largas.
- La verificación es más importante que la generación.
- Sin logs, límites y permisos, los agentes no están listos para producción.
- Para PYMEs, workflows y agentes modestos suelen aportar más que autonomía total.
- La mejor arquitectura es la que permite cumplir objetivo con control proporcional al riesgo.

---

## 27.37 Checklist práctica

Antes de elegir arquitectura:

- ¿La tarea es simple o variable?
- ¿Necesita tools?
- ¿Necesita plan?
- ¿Necesita verificador?
- ¿Necesita humano en el loop?
- ¿Puede ser workflow?
- ¿Puede ser router + RAG?
- ¿Necesita multiagente?
- ¿Qué acciones son críticas?
- ¿Hay límite de pasos?
- ¿Hay límite de coste?
- ¿Hay logs?
- ¿Hay estado?
- ¿Hay permisos?
- ¿Hay evaluación?
- ¿Hay fallback?
- ¿Qué ocurre si una tool falla?
- ¿Qué ocurre si el agente no encuentra respuesta?
- ¿Cómo se audita?
- ¿Cómo se hace rollback?

---

## 27.38 Plantilla de arquitectura agentica

```markdown
# Arquitectura agentica

## Objetivo

Qué tarea resuelve.

## Tipo de arquitectura

Simple / ReAct / planner-executor / workflow + agente / supervisor-workers.

## Usuario

Quién lo usa.

## Herramientas

Lista.

## Fuentes

RAG, SQL, APIs.

## Nivel de autonomía

0-5.

## Humano en el loop

Cuándo interviene.

## Planificación

Sí/no.

## Verificación

Cómo se verifica.

## Estado

Qué se guarda durante tarea.

## Memoria

Qué persiste.

## Límites

Pasos, coste, tiempo.

## Errores

Cómo se manejan.

## Logs

Qué se registra.

## Evaluación

Dataset y métricas.

## Riesgos

Lista.

## MVP

Versión mínima.
```

---

## 27.39 Qué puede cambiar en el futuro

Cambiarán:

- frameworks agenticos;
- MCP;
- memoria;
- agentes de voz;
- agentes de código;
- modelos;
- evaluación;
- observabilidad;
- estándares;
- herramientas.

Pero probablemente seguirá siendo cierto:

> La arquitectura agentica correcta no es la más compleja, sino la que coordina herramientas, contexto, verificación y supervisión con el menor riesgo posible.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 24 — Qué es un agente de IA
- Capítulo 25 — Function calling
- Capítulo 26 — MCP
- Capítulo 28 — Memoria
- Capítulo 29 — Agentes de voz
- Capítulo 14 — Reglas para agentes de código
- Capítulo 19 — RAG avanzado
- Capítulo 35 — IA para PYMEs
- Capítulo 48 — Seguridad
- Capítulo 50 — Evaluación
- Apéndice D — Plantillas de tools y agentes
- Apéndice G — Tabla viva de frameworks agenticos
