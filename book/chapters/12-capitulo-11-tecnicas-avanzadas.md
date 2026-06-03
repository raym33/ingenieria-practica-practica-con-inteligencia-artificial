---
title: "Capítulo 11 — Técnicas avanzadas"
chapter: "12"
part: "Parte III — Prompt Engineering y Context Engineering"
version: "0.1"
last_updated: "2026-06-02"
status: "estable"
level: "intermedio"
estimated_reading_time: "36 minutos"
---

# Capítulo 11 — Técnicas avanzadas

Las técnicas avanzadas de prompting no son hechizos.

Son formas de estructurar mejor una tarea.

Algunas ayudan mucho.  
Algunas solo ayudan en casos concretos.  
Algunas añaden coste y latencia sin mejorar lo suficiente.  
Algunas funcionan bien en demos y peor en producción.  
Algunas son útiles como método de trabajo humano, pero no como arquitectura final.

El error habitual es coleccionar técnicas sin criterio.

Few-shot.  
Chain-of-thought.  
Self-criticism.  
Reflection.  
LLM-as-a-judge.  
Prompt chaining.  
Meta-prompting.  
Prompt optimization.  
Multi-agent debate.  
Constitutional prompting.  

Todas pueden sonar sofisticadas.

Pero la pregunta importante es siempre la misma:

> ¿Esta técnica mejora calidad, reduce riesgo o aumenta control de forma medible?

Si la respuesta es no, probablemente estás añadiendo complejidad.

Este capítulo presenta las técnicas más útiles desde una perspectiva de ingeniería.

---

## 11.1 La regla principal: técnica avanzada no sustituye contexto

Antes de aplicar técnicas avanzadas, asegúrate de tener lo básico bien hecho.

Un prompt claro.  
Datos correctos.  
Contexto suficiente.  
Formato definido.  
Fuentes relevantes.  
Validación.  
Evaluación.  
Restricciones.  
Criterios de calidad.

Muchos problemas no requieren técnicas avanzadas.

Requieren mejor contexto.

Ejemplo:

Si un RAG responde mal porque recupera documentos irrelevantes, no lo arreglas con self-criticism.

Primero arregla retrieval.

Si el modelo genera JSON inválido, no empieces con multi-agent debate.

Primero usa structured outputs y validación.

Si el agente usa mal una herramienta, revisa schema, permisos y descripción.

Las técnicas avanzadas deben aplicarse sobre una base sólida.

---

## 11.2 Zero-shot

Zero-shot significa pedir una tarea sin ejemplos.

Ejemplo:

```text
Clasifica este email como soporte, ventas, facturación u otro.
```

Ventajas:

- simple;
- rápido;
- barato;
- fácil de mantener;
- útil con modelos fuertes.

Limitaciones:

- puede interpretar categorías de forma distinta;
- puede fallar con dominios específicos;
- puede ser inconsistente;
- depende mucho de la claridad de instrucciones.

Zero-shot es buen punto de partida.

No compliques si funciona.

---

## 11.3 Few-shot

Few-shot consiste en dar ejemplos.

Ejemplo:

```text
Clasifica emails.

Categorías:
- soporte
- facturación
- ventas
- otro

Ejemplos:

Email: "No puedo acceder a mi cuenta"
Categoría: soporte

Email: "Necesito la factura de abril"
Categoría: facturación

Email: "Quiero contratar el plan premium"
Categoría: ventas

Email:
{{email}}

Categoría:
```

Ventajas:

- mejora consistencia;
- enseña formato;
- reduce ambigüedad;
- útil para clasificación;
- útil para estilo;
- útil para extracción.

Limitaciones:

- aumenta tokens;
- ejemplos malos empeoran resultados;
- puede sobreajustar al patrón;
- difícil mantener muchos ejemplos;
- requiere elegir ejemplos representativos.

Few-shot funciona muy bien cuando las categorías o formatos no son obvios.

---

## 11.4 Cómo elegir buenos ejemplos

Los ejemplos deben cubrir variedad.

Para clasificación, incluye:

- casos típicos;
- casos ambiguos;
- casos límite;
- casos negativos;
- ejemplos con lenguaje real;
- errores frecuentes.

Malo:

```text
Tres ejemplos perfectos y muy obvios.
```

Mejor:

```text
Ejemplos representativos del caos real.
```

Si los usuarios escriben con faltas, incluye faltas.

Si mezclan temas, incluye ejemplos mixtos.

Si hay emails largos, incluye emails largos.

Si hay consultas ambiguas, incluye ambigüedad.

El modelo aprende de lo que le muestras.

---

## 11.5 Chain-of-thought

Chain-of-thought se refiere a pedir al modelo que razone paso a paso.

Históricamente se usó con prompts como:

```text
Piensa paso a paso.
```

Puede ayudar en tareas complejas.

Pero en producción hay que tener cuidado.

No siempre quieres mostrar razonamiento detallado al usuario.  
No siempre mejora.  
Puede aumentar coste.  
Puede introducir explicaciones falsas.  
Puede hacer la respuesta demasiado larga.  
Puede dar sensación de rigor donde no lo hay.

En vez de pedir razonamiento largo visible, suele ser mejor pedir estructura.

Ejemplo:

```text
Analiza el problema siguiendo estos criterios:
1. Requisitos
2. Restricciones
3. Riesgos
4. Opciones
5. Recomendación
```

Esto guía el razonamiento sin depender de una cadena interna extensa.

---

## 11.6 Razonamiento estructurado

Una alternativa práctica a chain-of-thought es pedir un análisis estructurado.

Ejemplo:

```text
Evalúa esta arquitectura usando:
- privacidad;
- coste;
- latencia;
- mantenimiento;
- seguridad;
- escalabilidad.

Después da una recomendación final.
```

Ventajas:

- más control;
- fácil de revisar;
- útil para decisiones;
- no expone razonamiento innecesario;
- reduce respuestas vagas.

Para ingeniería, esto suele ser más útil que “piensa paso a paso”.

---

## 11.7 Scratchpad oculto vs respuesta final

En algunas arquitecturas se separa:

- razonamiento interno;
- respuesta final.

No todos los proveedores lo gestionan igual.

Como principio de producto:

> El usuario debe recibir una respuesta clara, no necesariamente todo el proceso interno.

Puedes pedir al modelo:

```text
Analiza internamente la información y devuelve solo la conclusión estructurada.
```

Pero no confíes en que eso garantice nada.

La arquitectura debe controlar salida, no solo pedirlo.

---

## 11.8 Self-criticism

Self-criticism consiste en pedir al modelo que critique su propia respuesta.

Ejemplo:

```text
Revisa tu respuesta anterior.
Busca:
- afirmaciones no justificadas;
- falta de fuentes;
- errores;
- ambigüedades;
- recomendaciones demasiado generales.

Después escribe una versión mejorada.
```

Útil para:

- mejorar redacción;
- detectar omisiones;
- hacer respuestas más completas;
- mejorar claridad;
- revisar planes.

Limitaciones:

- el modelo puede no detectar sus propios errores;
- puede inventar una crítica;
- puede cambiar una respuesta correcta a peor;
- aumenta coste y latencia.

Self-criticism es útil como herramienta de edición.

No como garantía de verdad.

---

## 11.9 Reflection

Reflection es una variante donde el modelo reflexiona sobre el resultado y decide si debe corregirlo.

Flujo:

```text
respuesta inicial → revisión → respuesta final
```

Puede aplicarse en:

- generación de código;
- planes de proyecto;
- respuestas RAG;
- arquitectura;
- escritura técnica;
- análisis de riesgos.

Ejemplo:

```text
Primero genera una propuesta.
Después revisa si cumple las restricciones.
Finalmente devuelve una versión corregida.
```

En producción, conviene separar pasos y registrar cada resultado.

Si todo ocurre dentro de un prompt gigante, es más difícil depurar.

---

## 11.10 LLM-as-a-judge

LLM-as-a-judge usa un modelo para evaluar una respuesta.

Ejemplo:

```text
Pregunta: ...
Fuentes: ...
Respuesta: ...

Evalúa:
- ¿La respuesta está basada en fuentes?
- ¿Hay alucinación?
- ¿Responde a la pregunta?
- ¿Las citas son correctas?
```

Útil para:

- evaluar RAG;
- comparar prompts;
- revisar respuestas;
- crear evals semi-automáticas;
- priorizar revisión humana;
- detectar regresiones.

Riesgos:

- el juez puede equivocarse;
- puede favorecer respuestas largas;
- puede tener sesgos;
- puede no verificar hechos;
- puede ser inconsistente;
- añade coste.

Buenas prácticas:

- usar rúbricas claras;
- usar escalas simples;
- comparar con humanos;
- usar ejemplos calibrados;
- evaluar al juez;
- no usarlo como única verdad.

---

## 11.11 Rúbricas

Una rúbrica define criterios de evaluación.

Ejemplo para RAG:

```text
Puntuación 5:
La respuesta responde completamente, usa solo fuentes, cita correctamente y no inventa.

Puntuación 3:
Responde parcialmente, con alguna omisión o cita débil.

Puntuación 1:
No responde, inventa o contradice las fuentes.
```

Una rúbrica mejora consistencia.

Sin rúbrica, el judge improvisa.

Rúbricas útiles:

- precisión;
- fidelidad;
- completitud;
- claridad;
- tono;
- formato;
- seguridad;
- utilidad;
- citas;
- incertidumbre.

---

## 11.12 Prompt chaining

Prompt chaining divide una tarea en varias llamadas.

Ejemplo para RAG:

```text
1. Detectar intención.
2. Recuperar documentos.
3. Filtrar resultados.
4. Generar respuesta.
5. Evaluar fidelidad.
6. Reformular si falla.
```

Ventajas:

- control;
- depuración;
- uso de modelos distintos;
- validación intermedia;
- menor complejidad por paso.

Desventajas:

- más coste;
- más latencia;
- más orquestación;
- más puntos de fallo.

Prompt chaining es útil cuando una tarea compleja se rompe mejor en pasos claros.

---

## 11.13 Decomposition

Decomposition consiste en dividir un problema en subproblemas.

Ejemplo:

```text
Tarea: diseñar un sistema RAG para una PYME.

Subtareas:
1. Identificar requisitos.
2. Identificar datos.
3. Elegir arquitectura.
4. Evaluar riesgos.
5. Definir MVP.
6. Estimar coste.
```

Esto mejora respuestas complejas.

También ayuda mucho en desarrollo con IA.

Malo:

```text
Crea toda la app.
```

Mejor:

```text
Primero define arquitectura.
Después modelo de datos.
Después endpoints.
Después UI.
Después tests.
```

Los modelos trabajan mejor cuando la tarea está acotada.

---

## 11.14 Map-reduce prompting

Map-reduce se usa cuando hay mucho contenido.

Ejemplo:

1. Divides documentos en fragmentos.
2. Resumes o extraes información de cada fragmento.
3. Combinas resultados.
4. Generas conclusión global.

Flujo:

```text
documentos → análisis por partes → síntesis final
```

Útil para:

- documentos largos;
- muchas entrevistas;
- análisis de feedback;
- logs;
- expedientes;
- resúmenes de reuniones;
- investigación.

Riesgos:

- pérdida de detalles;
- errores acumulados;
- síntesis incorrecta;
- coste;
- dificultad de citar.

Para RAG y documentos largos, map-reduce puede ser más controlable que meter todo en contexto.

---

## 11.15 Query transformation

En RAG, la pregunta del usuario puede no ser ideal para búsqueda.

Query transformation reformula la consulta.

Ejemplo:

Usuario:

```text
¿Qué pasa si me voy antes?
```

Reformulación:

```text
penalización por terminación anticipada contrato salida anticipada
```

Tipos:

- reformulación;
- expansión;
- traducción;
- extracción de palabras clave;
- generación de consultas múltiples;
- HyDE.

Ventajas:

- mejora retrieval;
- captura intención;
- maneja preguntas vagas.

Riesgos:

- cambia intención;
- añade coste;
- puede buscar lo equivocado.

Siempre evalúa con preguntas reales.

---

## 11.16 HyDE

HyDE significa *Hypothetical Document Embeddings*.

La idea es generar una respuesta o documento hipotético a la pregunta y usarlo para búsqueda semántica.

Flujo:

```text
pregunta → documento hipotético → embedding → búsqueda → RAG
```

Puede mejorar recuperación cuando la pregunta es muy corta o abstracta.

Pero tiene riesgos:

- el documento hipotético puede inventar;
- puede sesgar la búsqueda;
- añade coste;
- no siempre mejora.

HyDE puede ser útil, pero no debe activarse sin evaluación.

---

## 11.17 Multi-query retrieval

En vez de una sola búsqueda, generas varias consultas.

Ejemplo:

Pregunta:

```text
¿Qué obligaciones tiene el arrendatario si termina antes el contrato?
```

Consultas:

```text
terminación anticipada arrendatario
obligaciones del inquilino al desistir
penalización por salida antes de plazo
cláusula de desistimiento arrendamiento
```

Ventajas:

- mejora cobertura;
- útil con vocabulario variado;
- mejora RAG en dominios complejos.

Riesgos:

- más coste;
- más ruido;
- más resultados duplicados;
- necesidad de reranking.

Funciona mejor combinado con reranking.

---

## 11.18 Constitutional prompting

Consiste en definir principios que guían respuesta.

Ejemplo:

```text
Principios:
- Prioriza seguridad del usuario.
- No inventes información.
- Cita fuentes cuando uses documentos.
- Explica límites.
- Escala a humano en casos sensibles.
```

Útil para:

- tono;
- seguridad;
- coherencia;
- productos regulados;
- asistentes con límites.

Pero los principios no sustituyen reglas externas.

Si algo es crítico, refuérzalo con código.

---

## 11.19 Role debate

Role debate consiste en usar varios roles para analizar un problema.

Ejemplo:

- arquitecto;
- especialista en seguridad;
- responsable de costes;
- usuario final;
- revisor legal.

Puede ayudar a descubrir riesgos.

Ejemplo:

```text
Analiza esta propuesta desde tres perspectivas:
1. Arquitectura
2. Seguridad
3. Negocio

Después sintetiza una recomendación.
```

No hace falta crear agentes separados.

Muchas veces basta con pedir perspectivas.

Riesgo:

- respuestas largas;
- coste;
- falsa sensación de revisión;
- roles inventados sin datos.

Úsalo para análisis, no como validación final.

---

## 11.20 Multi-agent

Multi-agent usa varios agentes o modelos con funciones distintas.

Ejemplo:

```text
planner → executor → critic → finalizer
```

Puede ser útil en tareas complejas.

Pero añade mucha complejidad.

Problemas:

- coste;
- latencia;
- coordinación;
- loops;
- errores acumulados;
- dificultad de depuración;
- exceso de arquitectura para tareas simples.

No empieces por multi-agent.

Empieza por workflow simple.

Añade agentes solo cuando un paso separado aporte valor medible.

---

## 11.21 Planner-executor

Patrón muy útil.

Un modelo planifica.

Otro, o el mismo en otro paso, ejecuta.

Flujo:

```text
objetivo → plan → revisión del plan → ejecución paso a paso
```

Ejemplo para coding:

```text
1. Analiza el repo.
2. Propón plan.
3. Espera confirmación.
4. Ejecuta cambios mínimos.
5. Añade tests.
6. Resume.
```

Ventajas:

- reduce acciones impulsivas;
- mejora control humano;
- útil para agentes;
- facilita revisión.

Limitaciones:

- más pasos;
- más latencia;
- el plan puede ser malo;
- requiere validación.

---

## 11.22 Critic-reviewer

Patrón:

```text
generator → critic → revised output
```

Útil para:

- propuestas;
- arquitectura;
- código;
- documentación;
- respuestas RAG;
- capítulos de un libro;
- emails importantes.

Ejemplo:

```text
Genera una propuesta técnica.
Después actúa como revisor crítico y detecta riesgos.
Finalmente mejora la propuesta.
```

En producción, puedes separar roles en llamadas distintas.

Así puedes loggear y evaluar.

---

## 11.23 Prompt optimization

Prompt optimization busca mejorar prompts de forma sistemática.

Puede ser manual o automática.

Proceso manual:

1. Definir dataset.
2. Ejecutar prompt actual.
3. Medir errores.
4. Modificar prompt.
5. Repetir benchmark.
6. Guardar versión.

Proceso semi-automático:

- LLM propone variantes;
- se evalúan contra dataset;
- se elige la mejor;
- humano revisa.

Riesgo:

- sobreoptimizar a un dataset pequeño;
- prompts demasiado largos;
- mejoras falsas;
- coste de evaluación.

Optimizar sin dataset no es optimizar.

Es improvisar.

---

## 11.24 DSPy y optimización declarativa

DSPy y enfoques similares tratan los prompts y pipelines como programas optimizables.

La idea general:

- defines entradas y salidas;
- defines métricas;
- el sistema busca mejores prompts o ejemplos;
- evalúa con datos.

Esto es interesante porque mueve el prompt engineering hacia ingeniería medible.

Pero no siempre hace falta.

Para proyectos pequeños, puede ser demasiada complejidad.

Tiene sentido cuando:

- tienes dataset;
- tienes métrica;
- el prompt es crítico;
- la tarea se repite mucho;
- quieres optimización sistemática;
- el equipo puede mantenerlo.

No uses herramientas avanzadas sin capacidad de evaluación.

---

## 11.25 ReAct

ReAct combina razonamiento y acción.

Patrón conceptual:

```text
Thought → Action → Observation → Thought → Action...
```

Es muy usado en agentes.

La idea:

- el modelo piensa qué hacer;
- llama una herramienta;
- observa resultado;
- decide siguiente paso.

Ventajas:

- útil para tools;
- permite tareas multi-step;
- natural para agentes.

Riesgos:

- loops;
- coste;
- acciones incorrectas;
- razonamiento visible innecesario;
- dificultad de control.

En producción, el patrón debe tener límites:

- máximo de pasos;
- tools permitidas;
- presupuesto;
- logs;
- parada segura;
- humano en el loop.

---

## 11.26 Tree of Thoughts

Tree of Thoughts explora varias ramas de razonamiento.

Ejemplo:

```text
Genera tres estrategias.
Evalúa cada una.
Elige la mejor.
```

Útil para:

- problemas abiertos;
- planificación;
- arquitectura;
- decisiones;
- creatividad.

Pero puede ser caro.

No lo uses para tareas simples.

A veces basta con:

```text
Dame 3 opciones, compara pros/contras y recomienda una.
```

---

## 11.27 Self-consistency

Self-consistency consiste en generar varias respuestas y elegir la más consistente.

Ejemplo:

- generar 5 soluciones;
- comparar;
- elegir mayoría o mejor puntuación.

Útil para:

- razonamiento;
- clasificación delicada;
- generación de opciones;
- evaluación de incertidumbre.

Riesgos:

- coste multiplicado;
- no garantiza verdad;
- puede reforzar error común;
- requiere criterio de selección.

Úsalo solo cuando la mejora justifica coste.

---

## 11.28 Retrieval-augmented prompting

No todo RAG requiere arquitectura pesada.

A veces basta con enriquecer prompt con información recuperada.

Ejemplo:

```text
Antes de responder, consulta esta lista de políticas internas:
...
```

Esto es útil para prototipos.

Pero si el volumen de documentos crece, necesitarás RAG real:

- extracción;
- chunking;
- embeddings;
- búsqueda;
- reranking;
- citas;
- evaluación.

Retrieval-augmented prompting es una etapa.

No siempre una solución final.

---

## 11.29 Context compression

Cuando el contexto es demasiado largo, puedes comprimirlo.

Ejemplo:

```text
Resume este historial manteniendo:
- decisiones tomadas;
- preferencias del usuario;
- tareas pendientes;
- restricciones;
- datos importantes.
```

Útil para:

- chats largos;
- agentes;
- sesiones persistentes;
- reducción de coste;
- memoria.

Riesgos:

- pérdida de detalles;
- resumen sesgado;
- información crítica omitida;
- acumulación de errores.

La compresión debe evaluarse.

---

## 11.30 Memory prompting

La memoria puede inyectarse como contexto.

Ejemplo:

```text
Datos relevantes del usuario:
- Prefiere soluciones local-first.
- Quiere vender a PYMEs.
- Usa GitHub como canal de producto.
```

Esto personaliza respuestas.

Pero la memoria debe ser:

- relevante;
- actual;
- mínima;
- autorizada;
- fácil de borrar;
- no sensible salvo necesidad.

Memoria irrelevante contamina.

Memoria sensible mal gestionada crea riesgo.

---

## 11.31 Guardrail prompting

Guardrail prompting añade instrucciones de seguridad.

Ejemplo:

```text
Si el usuario pide ejecutar una acción destructiva, no la ejecutes.
Explica el riesgo y solicita confirmación explícita.
```

Útil, pero insuficiente.

Guardrails reales deben estar en:

- código;
- permisos;
- herramientas;
- validadores;
- políticas;
- logs;
- aprobación humana.

El prompt es una capa más.

No la única.

---

## 11.32 Prompt routing

Prompt routing elige prompt según intención.

Ejemplo:

```text
si intención = soporte → support_prompt
si intención = facturación → billing_prompt
si intención = legal → legal_prompt
si intención = fuera de alcance → fallback_prompt
```

Ventajas:

- prompts más cortos;
- especialización;
- mejor control;
- menor coste;
- mejor UX.

Riesgos:

- clasificación errónea;
- rutas duplicadas;
- mantenimiento;
- inconsistencias.

Prompt routing suele ser muy útil en chatbots empresariales.

---

## 11.33 Model routing combinado con prompt routing

Puedes enrutar modelo y prompt.

Ejemplo:

```text
consulta simple → modelo barato + prompt breve
consulta documental → modelo medio + prompt RAG
consulta sensible → modelo local + prompt prudente
consulta compleja → modelo fuerte + prompt analítico
```

Esto es arquitectura IA.

No solo prompting.

Ventajas:

- coste optimizado;
- privacidad;
- calidad;
- flexibilidad.

Requiere:

- clasificación;
- evals;
- logs;
- fallback;
- mantenimiento.

---

## 11.34 Cuándo NO usar técnicas avanzadas

No uses técnicas avanzadas cuando:

- la tarea es simple;
- no tienes evaluación;
- no sabes qué problema resuelven;
- aumentan coste sin medir mejora;
- aumentan latencia inaceptable;
- complican mantenimiento;
- sustituyen seguridad real;
- ocultan problemas de datos;
- crean falsa confianza.

A veces el mejor prompt avanzado es uno simple, claro y evaluado.

---

## 11.35 Ejemplo: mejorar un RAG con técnicas avanzadas

Problema:

El asistente responde con fuentes irrelevantes.

Orden correcto de mejora:

1. Revisar extracción documental.
2. Revisar chunking.
3. Mejorar embeddings.
4. Añadir hybrid search.
5. Añadir reranking.
6. Mejorar prompt RAG.
7. Añadir query transformation.
8. Añadir judge de fidelidad.
9. Añadir fallback si no hay fuentes.

Orden incorrecto:

1. Añadir self-criticism.
2. Añadir multi-agent.
3. Añadir debate.
4. Culpar al modelo.

Primero datos y retrieval.

Luego prompting avanzado.

---

## 11.36 Ejemplo: mejorar un agente de código

Problema:

El agente rompe archivos.

Mejoras:

1. Pedir plan antes de actuar.
2. Limitar alcance de archivos.
3. Exigir tests.
4. Usar ramas.
5. Añadir revisión humana.
6. Añadir critic.
7. Registrar cambios.
8. Prohibir tocar secretos.
9. Limitar pasos.

Prompt:

```text
Antes de modificar archivos, explica el plan y lista archivos afectados.
No modifiques archivos fuera de esa lista sin confirmación.
Después de cambiar, ejecuta tests disponibles y resume resultados.
```

Esto es más útil que pedirle “sé cuidadoso”.

---

## 11.37 Ejemplo: mejorar generación de propuestas comerciales

Problema:

Las propuestas son genéricas.

Mejoras:

- añadir contexto del cliente;
- definir sector;
- definir dolor;
- definir restricciones;
- usar plantilla;
- pedir riesgos;
- pedir plan de 7 días;
- pedir precio orientativo;
- pedir lenguaje no técnico;
- pedir qué no se incluye.

Técnica útil:

```text
Primero genera diagnóstico.
Después propuesta.
Después revisa si suena demasiado genérica.
Finalmente mejora con detalles del sector.
```

---

## 11.38 Técnicas avanzadas y coste

Cada técnica puede multiplicar coste.

Ejemplo:

```text
respuesta simple → 1 llamada
self-criticism → 2 llamadas
judge → 2-3 llamadas
multi-query RAG → más embeddings/búsquedas
multi-agent → muchas llamadas
self-consistency 5 muestras → 5x coste
```

No optimices calidad ignorando coste.

En producto, coste importa.

Calcula:

```text
mejora de calidad / coste adicional
```

Si la mejora no se mide, la técnica es sospechosa.

---

## 11.39 Técnicas avanzadas y latencia

Más pasos implican más espera.

En chat, latencia alta destruye experiencia.

En batch, puede ser aceptable.

Clasifica tareas:

### Interactivas

- soporte;
- chat;
- voz;
- autocompletado.

Necesitan baja latencia.

### Analíticas

- informes;
- revisión documental;
- auditoría.

Pueden tolerar más latencia.

### Batch

- procesamiento nocturno;
- indexación;
- evaluación.

Pueden usar técnicas caras.

No uses el mismo pipeline para todo.

---

## 11.40 Ideas clave del capítulo

- Las técnicas avanzadas deben resolver problemas medibles.
- Few-shot mejora consistencia cuando los ejemplos son buenos.
- Razonamiento estructurado suele ser mejor que pedir “piensa paso a paso”.
- Self-criticism ayuda a editar, no garantiza verdad.
- LLM-as-a-judge es útil con rúbricas, pero no infalible.
- Prompt chaining mejora control, pero aumenta coste y latencia.
- Query transformation y multi-query pueden mejorar RAG.
- Multi-agent no debe ser el punto de partida.
- Optimizar prompts sin dataset es improvisar.
- Las técnicas avanzadas no sustituyen datos, retrieval, seguridad ni evaluación.

---

## 11.41 Checklist práctica

Antes de usar una técnica avanzada:

- ¿Qué problema concreto resuelve?
- ¿Tienes métrica?
- ¿Tienes dataset de prueba?
- ¿Cuánto aumenta el coste?
- ¿Cuánto aumenta la latencia?
- ¿Se puede depurar?
- ¿Se puede registrar?
- ¿Se puede revertir?
- ¿Mejora calidad de forma medible?
- ¿Introduce nuevos riesgos?
- ¿Sustituye algo que debería estar en código?
- ¿Es necesaria para producción?
- ¿Puede hacerse más simple?
- ¿Se ha probado con datos reales?
- ¿Se ha probado con casos límite?

---

## 11.42 Plantilla de evaluación de técnica avanzada

```markdown
# Evaluación de técnica avanzada

## Técnica

Nombre.

## Problema que intenta resolver

Descripción.

## Flujo actual

Cómo funciona hoy.

## Flujo propuesto

Cómo cambia.

## Coste adicional

Tokens, llamadas, infraestructura.

## Latencia adicional

Estimación.

## Métrica de éxito

Qué debe mejorar.

## Dataset de prueba

Qué casos se usarán.

## Resultado

Comparativa antes/después.

## Riesgos

Lista.

## Decisión

Adoptar / rechazar / seguir probando.

## Fecha de revisión

Fecha.
```

---

## 11.43 Qué puede cambiar en el futuro

Cambiarán:

- técnicas de prompting;
- modelos de razonamiento;
- tool calling;
- agentes;
- frameworks de evaluación;
- optimizadores de prompts;
- costes;
- latencia;
- ventanas de contexto;
- memoria;
- protocolos.

Pero probablemente seguirá siendo cierto:

> Una técnica avanzada solo merece la pena si mejora un resultado importante y medible.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 9 — Prompt engineering que sigue funcionando
- Capítulo 10 — Prompts como herramientas de ingeniería
- Capítulo 12 — Prompts para crear software
- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 19 — RAG avanzado
- Capítulo 24 — Qué es un agente de IA
- Capítulo 27 — Arquitecturas agenticas
- Capítulo 50 — Evaluación
- Apéndice B — Plantillas de prompts
