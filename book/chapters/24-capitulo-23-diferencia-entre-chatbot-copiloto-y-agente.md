---
title: "Capítulo 23 — Diferencia entre chatbot, copiloto y agente"
chapter: "24"
part: "Parte VI — Chatbots, copilotos y asistentes"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "intermedio"
estimated_reading_time: "38 minutos"
---

# Capítulo 23 — Diferencia entre chatbot, copiloto y agente

En IA se usan muchas palabras como si significaran lo mismo.

Chatbot.  
Asistente.  
Copiloto.  
Agente.  
Workflow.  
Automatización.  
Sistema agentic.  
AI employee.  
Autonomous assistant.

El problema no es solo lingüístico.

Si llamas agente a cualquier chatbot, diseñas mal.  
Si vendes un copiloto como automatización completa, generas expectativas falsas.  
Si das herramientas a un sistema que solo debía responder preguntas, creas riesgo.  
Si automatizas una decisión que debía revisar un humano, puedes causar daño.  

Nombrar bien importa.

Este capítulo explica la diferencia práctica entre chatbot, asistente, copiloto, workflow y agente.

No desde una definición académica.

Desde la ingeniería y el producto.

---

## 23.1 La pregunta clave

La pregunta que separa estos conceptos es:

> ¿El sistema solo responde, ayuda a decidir, o también actúa?

A partir de ahí podemos ordenar.

```text
Chatbot → conversa
Asistente → ayuda con contexto
Copiloto → acompaña a un profesional
Workflow → ejecuta pasos predefinidos
Agente → decide pasos y usa herramientas
```

No son categorías completamente cerradas.

Un producto puede mezclar varias.

Pero distinguirlas ayuda a diseñar con menos riesgo.

---

## 23.2 Chatbot

Un chatbot es una interfaz conversacional.

Puede responder preguntas, guiar al usuario o recoger datos.

Ejemplo:

```text
Usuario: ¿Cuál es el horario de atención?
Bot: El horario es de lunes a viernes de 9:00 a 14:00.
```

Un chatbot puede ser simple o avanzado.

Puede usar:

- FAQ;
- RAG;
- reglas;
- LLM;
- clasificación de intención;
- handoff humano.

Pero su función principal es conversar.

No necesariamente actuar.

---

## 23.3 Chatbot con RAG

Un chatbot con RAG responde usando fuentes.

Ejemplo:

```text
Usuario: ¿Qué dice la política de vacaciones?
Bot: Según el Manual de RRHH, las solicitudes deben presentarse antes del día 20...
Fuente: Manual RRHH, sección 3.2.
```

Esto ya es más útil que un chatbot genérico.

Pero sigue siendo un chatbot documental.

No es agente solo por usar RAG.

Recuperar información no es actuar.

---

## 23.4 Asistente

Un asistente ayuda al usuario a completar una tarea.

Puede tener más contexto que un chatbot.

Ejemplo:

```text
Ayúdame a preparar una respuesta a este cliente.
```

El asistente puede:

- resumir;
- redactar;
- analizar;
- sugerir;
- comparar;
- explicar;
- organizar.

Pero normalmente no ejecuta acciones críticas sin confirmación.

Un asistente aumenta capacidad del usuario.

---

## 23.5 Copiloto

Un copiloto trabaja junto a un profesional dentro de un flujo.

Ejemplos:

- copiloto legal;
- copiloto médico;
- copiloto de soporte;
- copiloto de ventas;
- copiloto de programación;
- copiloto administrativo.

La idea central:

> El humano sigue al mando.

El copiloto puede sugerir, redactar, buscar, resumir, alertar o revisar.

Pero el profesional decide.

Esto es especialmente importante en dominios sensibles.

---

## 23.6 Copiloto vs asistente

La diferencia es de integración y contexto.

Un asistente puede ser general.

Un copiloto suele estar integrado en un flujo profesional.

Ejemplo asistente:

```text
Resume este contrato.
```

Ejemplo copiloto legal:

```text
Mientras reviso este contrato, señala cláusulas de renovación, penalización, jurisdicción y riesgos, citando cada fuente.
```

El copiloto conoce la tarea profesional.

No solo conversa.

---

## 23.7 Workflow

Un workflow ejecuta pasos predefinidos.

Ejemplo:

```text
1. Recibir email.
2. Clasificarlo.
3. Extraer datos.
4. Crear ticket.
5. Notificar al equipo.
```

Puede usar IA en algunos pasos.

Pero el flujo está definido.

Esto no es necesariamente un agente.

Puede ser una automatización clásica con LLMs dentro.

Ventaja:

- más control;
- más predecible;
- más fácil de auditar;
- menos riesgo.

Muchos casos empresariales necesitan workflows, no agentes autónomos.

---

## 23.8 Agente

Un agente decide pasos para alcanzar un objetivo y puede usar herramientas.

Ejemplo:

```text
Objetivo: preparar informe semanal de incidencias.
Agente:
- consulta tickets;
- agrupa por categoría;
- detecta tendencias;
- busca incidencias críticas;
- genera informe;
- propone acciones.
```

Un agente puede:

- planificar;
- usar tools;
- observar resultados;
- decidir siguiente acción;
- reintentar;
- pedir aclaración;
- escalar.

Esto es más potente.

Y más arriesgado.

---

## 23.9 Agente no significa autónomo total

Un agente puede tener distintos niveles de autonomía.

### Nivel 0 — Sin autonomía

Solo responde.

### Nivel 1 — Sugiere acciones

No ejecuta.

### Nivel 2 — Ejecuta acciones seguras

Con permisos limitados.

### Nivel 3 — Ejecuta acciones con confirmación

Humano aprueba.

### Nivel 4 — Ejecuta autónomamente en dominio limitado

Con auditoría.

### Nivel 5 — Autonomía amplia

Muy raro y muy riesgoso en empresa.

La mayoría de productos reales deberían quedarse entre niveles 1 y 3.

---

## 23.10 Tabla comparativa

```markdown
| Tipo | Qué hace | Usa herramientas | Riesgo | Humano |
|---|---|---:|---:|---|
| Chatbot | Conversa/responde | Opcional | Bajo-medio | Usuario pregunta |
| Chatbot RAG | Responde con fuentes | Retrieval | Medio | Verifica fuentes |
| Asistente | Ayuda a una tarea | Opcional | Medio | Usuario decide |
| Copiloto | Acompaña trabajo profesional | Sí, limitado | Medio-alto | Profesional manda |
| Workflow | Ejecuta pasos definidos | Sí | Controlado | Diseñador define |
| Agente | Decide pasos y usa tools | Sí | Alto | Supervisión variable |
```

Esta tabla no es rígida.

Pero ayuda a evitar confusión.

---

## 23.11 Ejemplo: soporte

### Chatbot

```text
Responde preguntas frecuentes.
```

### Chatbot RAG

```text
Busca en base de conocimiento y responde con artículos.
```

### Copiloto

```text
Sugiere respuestas al agente humano.
```

### Workflow

```text
Clasifica ticket y lo asigna al equipo correcto.
```

### Agente

```text
Investiga la incidencia, consulta logs, crea resumen y propone solución.
```

No empieces por agente si el problema se resuelve con FAQ + ticket.

---

## 23.12 Ejemplo: legal

### Chatbot

```text
Explica términos generales.
```

### RAG documental

```text
Responde sobre contratos concretos con citas.
```

### Copiloto legal

```text
Ayuda al abogado a revisar cláusulas y riesgos.
```

### Workflow

```text
Extrae partes, fechas, importes y cláusulas estándar.
```

### Agente

```text
Compara contrato, busca precedentes internos, genera informe y prepara borrador.
```

En legal, el copiloto suele ser más apropiado que un agente autónomo.

---

## 23.13 Ejemplo: programación

### Chatbot

```text
Explica un error.
```

### Asistente

```text
Sugiere cómo implementar una función.
```

### Copiloto

```text
Ayuda dentro del IDE.
```

### Workflow

```text
Ejecuta lint, tests y genera changelog.
```

### Agente

```text
Lee el repo, planifica, modifica archivos, ejecuta tests y prepara PR.
```

Aquí los agentes son muy útiles.

Pero también pueden romper cosas si no hay reglas.

---

## 23.14 Ejemplo: PYME

Una PYME pide “un agente de IA”.

Pero quizá necesita:

```text
RAG documental + clasificación de emails + borradores revisables
```

Eso es:

- chatbot documental;
- workflow;
- copiloto administrativo.

No necesariamente agente autónomo.

La palabra agente vende.

Pero la solución correcta puede ser más simple.

---

## 23.15 El peligro de llamar agente a todo

Si llamas agente a todo:

- aumentas expectativas;
- aumentas riesgo;
- diseñas herramientas innecesarias;
- complicas venta;
- complicas soporte;
- generas miedo;
- dificultas evaluación.

Un cliente puede imaginar:

```text
La IA trabajará sola.
```

Pero tú quizás estás ofreciendo:

```text
Un asistente que genera borradores para revisión.
```

Mejor ser preciso.

---

## 23.16 El valor de los copilotos

Los copilotos son una de las formas más realistas de IA en empresa.

Porque mantienen humano en el loop.

Ventajas:

- menor riesgo;
- adopción más fácil;
- mejora productividad;
- permite revisión;
- aprovecha criterio profesional;
- útil en dominios sensibles;
- más fácil de vender al principio.

Casos:

- soporte;
- ventas;
- legal;
- salud;
- administración;
- educación;
- desarrollo software.

El copiloto no elimina al profesional.

Lo potencia.

---

## 23.17 El valor de los workflows

Muchos procesos empresariales no necesitan un agente que “piense”.

Necesitan pasos claros.

Ejemplo:

```text
Cuando llega un email:
1. Clasificar.
2. Extraer datos.
3. Buscar cliente.
4. Crear tarea.
5. Generar borrador.
6. Esperar revisión.
```

Esto se puede hacer con:

- código;
- n8n;
- Activepieces;
- Make;
- scripts;
- LLMs;
- reglas;
- tools.

Más control que un agente abierto.

Los workflows son infravalorados.

---

## 23.18 Cuándo usar chatbot

Usa chatbot cuando:

- el usuario necesita preguntar;
- la interacción es conversacional;
- hay dudas frecuentes;
- quieres interfaz flexible;
- la respuesta es el producto;
- hay bajo riesgo;
- el usuario no necesita ejecutar acciones complejas.

Ejemplo:

```text
Chatbot de documentación interna.
```

---

## 23.19 Cuándo usar asistente

Usa asistente cuando:

- el usuario trabaja sobre contenido;
- necesita ayuda contextual;
- quiere generar, resumir o revisar;
- la tarea no es solo pregunta-respuesta;
- el usuario mantiene control.

Ejemplo:

```text
Asistente para redactar propuestas comerciales.
```

---

## 23.20 Cuándo usar copiloto

Usa copiloto cuando:

- hay un profesional;
- hay flujo de trabajo;
- el criterio humano importa;
- el riesgo es medio/alto;
- la IA debe sugerir, no decidir sola;
- hay herramientas y datos internos.

Ejemplo:

```text
Copiloto para soporte técnico que sugiere respuestas.
```

---

## 23.21 Cuándo usar workflow

Usa workflow cuando:

- el proceso está claro;
- los pasos son repetibles;
- quieres control;
- puedes definir reglas;
- la IA solo aparece en algunos pasos;
- necesitas auditoría.

Ejemplo:

```text
Clasificar facturas y crear tareas de revisión.
```

---

## 23.22 Cuándo usar agente

Usa agente cuando:

- la tarea requiere decidir pasos;
- hay múltiples herramientas;
- el camino no siempre es el mismo;
- se necesita planificar;
- hay incertidumbre operativa;
- puedes limitar permisos;
- hay logs y supervisión;
- el beneficio compensa riesgo.

Ejemplo:

```text
Agente que investiga incidencias consultando logs, tickets y documentación.
```

No uses agente para tareas lineales.

---

## 23.23 La escala de autonomía

```markdown
| Nivel | Descripción | Ejemplo |
|---|---|---|
| 0 | Responde | FAQ bot |
| 1 | Sugiere | Copiloto redacta borrador |
| 2 | Ejecuta lectura | Busca documentos/logs |
| 3 | Escribe con confirmación | Crea ticket tras aprobar |
| 4 | Ejecuta acciones limitadas | Reintenta tarea segura |
| 5 | Autonomía amplia | Opera procesos completos |
```

Diseña explícitamente el nivel.

No lo dejes implícito.

---

## 23.24 Riesgo por nivel de autonomía

A mayor autonomía:

- más riesgo;
- más necesidad de permisos;
- más logs;
- más evaluación;
- más guardrails;
- más supervisión;
- más diseño de fallbacks.

No subas autonomía sin necesidad.

La autonomía es coste y responsabilidad.

---

## 23.25 Herramientas y permisos

El salto crítico ocurre cuando el sistema usa tools.

Leer documentos tiene riesgo limitado.

Enviar email, borrar datos o modificar CRM tiene riesgo alto.

Clasifica tools:

### Lectura

- buscar documentos;
- consultar estado;
- leer tickets.

### Escritura segura

- crear borrador;
- crear ticket;
- añadir nota.

### Escritura crítica

- enviar email;
- cambiar precio;
- borrar datos;
- emitir reembolso;
- modificar contrato.

Cada grupo necesita permisos distintos.

---

## 23.26 Confirmación humana

Patrón seguro:

```text
IA prepara → humano revisa → humano confirma → sistema ejecuta
```

Ejemplos:

- enviar email;
- crear presupuesto;
- modificar datos;
- responder a cliente;
- generar informe final;
- presentar documentación.

Este patrón convierte agentes peligrosos en copilotos útiles.

---

## 23.27 Auditoría

Todo sistema que actúa debe registrar:

- quién pidió;
- qué decidió la IA;
- qué herramienta usó;
- qué datos recibió;
- qué acción ejecutó;
- quién confirmó;
- cuándo ocurrió;
- resultado;
- error.

Sin auditoría, no hay producción seria.

---

## 23.28 Evaluación por tipo

### Chatbot

Evalúa precisión, tono, no encontrado.

### RAG

Evalúa retrieval, fidelidad, citas.

### Copiloto

Evalúa utilidad para profesional y tiempo ahorrado.

### Workflow

Evalúa tasa de éxito y errores.

### Agente

Evalúa tareas completadas, pasos, seguridad y fallos.

No uses la misma métrica para todo.

---

## 23.29 Producto y marketing

Puedes llamar al producto de forma comercial:

```text
AI Assistant
AI Copilot
AI Agent
```

Pero internamente debes saber qué es.

Marketing puede simplificar.

Ingeniería no.

Si vendes “agente autónomo” y entregas un chatbot, habrá decepción.

Si vendes “copiloto supervisado”, generas confianza.

---

## 23.30 IA para PYMEs: recomendación práctica

Para PYMEs, normalmente el orden correcto es:

```text
1. Workflow simple
2. Chatbot documental
3. Copiloto para empleados
4. Tools con confirmación
5. Agentes limitados
```

No empezar por:

```text
agente autónomo multi-tool conectado a todo
```

Una PYME necesita utilidad, no arquitectura de moda.

---

## 23.31 Casos donde NO usar agente

No uses agente si:

- el flujo es lineal;
- las reglas son claras;
- el riesgo es alto;
- no tienes logs;
- no tienes permisos;
- no tienes evaluación;
- no puedes supervisar;
- no hay beneficio frente a workflow;
- no puedes explicar decisiones;
- el cliente no entiende límites.

Muchos “agentes” deberían ser formularios inteligentes.

---

## 23.32 Casos donde sí usar agente

Tiene sentido si:

- hay investigación;
- múltiples fuentes;
- herramientas heterogéneas;
- tareas largas;
- decisiones de ruta;
- necesidad de reintentos;
- planificación;
- supervisión disponible;
- entorno limitado.

Ejemplo:

```text
Analizar incidencias recurrentes consultando tickets, logs y documentación.
```

---

## 23.33 Diseño seguro por defecto

Empieza con:

```text
read-only
```

Luego:

```text
borrador
```

Luego:

```text
confirmación
```

Luego:

```text
automatización limitada
```

No al revés.

La autonomía se gana.

No se concede desde el principio.

---

## 23.34 Arquitectura progresiva

```text
Fase 1: Chatbot FAQ
Fase 2: Chatbot RAG con fuentes
Fase 3: Copiloto con borradores
Fase 4: Tools read-only
Fase 5: Tools con confirmación
Fase 6: Agente limitado
```

Este roadmap reduce riesgo y aumenta aprendizaje.

---

## 23.35 Ejemplo: inmobiliaria

Una inmobiliaria pide IA.

### Chatbot

Responde dudas sobre promociones.

### RAG

Consulta memoria de calidades, planos, precios públicos y disponibilidad.

### Copiloto

Ayuda al comercial a preparar respuesta personalizada.

### Workflow

Cuando llega lead, clasifica, resume y crea tarea.

### Agente

Busca información, prepara propuesta y agenda visita con confirmación.

Cada nivel añade valor y riesgo.

---

## 23.36 Ejemplo: gestoría

### Chatbot

Responde preguntas frecuentes de clientes.

### RAG

Consulta normativa interna y documentación.

### Copiloto

Prepara borradores de emails para revisión.

### Workflow

Clasifica documentos entrantes.

### Agente

Recopila datos, genera checklist y prepara expediente, con humano revisando.

No automatices presentación fiscal sin control.

---

## 23.37 Ejemplo: educación

### Chatbot

Responde dudas de contenido.

### Asistente

Explica ejercicios.

### Copiloto

Ayuda al profesor a preparar actividades.

### Workflow

Genera lección, ejercicios y audio.

### Agente

Planifica unidad completa y adapta según progreso, con supervisión.

La educación necesita pedagogía, no solo automatización.

---

## 23.38 Antipatrones

### Llamar agente a un chatbot

Confunde.

### Dar tools a un bot sin necesidad

Aumenta riesgo.

### Automatizar antes de entender flujo

Error.

### Eliminar humano demasiado pronto

Peligroso.

### No definir nivel de autonomía

Ambigüedad.

### No auditar acciones

Inaceptable en producción.

### Usar agente para proceso lineal

Sobreingeniería.

### Vender autonomía total

Expectativas irreales.

---

## 23.39 Ideas clave del capítulo

- Chatbot, asistente, copiloto, workflow y agente no son lo mismo.
- La diferencia principal es el nivel de contexto, integración y acción.
- Recuperar información no convierte un chatbot en agente.
- Un copiloto mantiene al humano al mando.
- Un workflow ejecuta pasos definidos.
- Un agente decide pasos y usa herramientas.
- Más autonomía implica más riesgo, permisos, logs y evaluación.
- Muchas empresas necesitan workflows y copilotos antes que agentes.
- En PYMEs, la utilidad suele estar en soluciones simples y supervisadas.
- Nombrar bien evita diseñar mal.

---

## 23.40 Checklist práctica

Antes de decidir qué construir:

- ¿El sistema solo responde?
- ¿Necesita consultar documentos?
- ¿Necesita ayudar a un profesional?
- ¿Debe ejecutar pasos definidos?
- ¿Debe decidir pasos?
- ¿Necesita tools?
- ¿Las tools son de lectura o escritura?
- ¿Hay acciones críticas?
- ¿Necesita confirmación humana?
- ¿Qué nivel de autonomía tendrá?
- ¿Hay permisos?
- ¿Hay logs?
- ¿Hay evaluación?
- ¿Hay fallback?
- ¿Qué pasa si falla?
- ¿Es realmente necesario un agente?
- ¿Bastaría un workflow?
- ¿Bastaría un copiloto?
- ¿Bastaría RAG?

---

## 23.41 Plantilla de clasificación de sistema IA

```markdown
# Clasificación del sistema

## Nombre

Producto o módulo.

## Tipo principal

Chatbot / asistente / copiloto / workflow / agente.

## Usuario

Quién lo usa.

## Objetivo

Qué tarea resuelve.

## Nivel de autonomía

0-5.

## Herramientas

Lectura / escritura segura / escritura crítica.

## Humano en el loop

Sí/no y cuándo.

## Fuentes

Documentos, APIs, bases de datos.

## Riesgos

Privacidad, seguridad, coste, error.

## Evaluación

Qué se medirá.

## Justificación

Por qué este tipo es suficiente.
```

---

## 23.42 Qué puede cambiar en el futuro

Cambiarán:

- nombres comerciales;
- frameworks agenticos;
- capacidades de modelos;
- integración con herramientas;
- MCP;
- memoria;
- voz;
- autonomía;
- regulación.

Pero seguirá siendo cierto:

> Antes de construir, hay que decidir si el sistema debe responder, asistir, acompañar, ejecutar un flujo o actuar como agente.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 21 — Chatbots modernos
- Capítulo 22 — Chatbots para soporte
- Capítulo 24 — Qué es un agente de IA
- Capítulo 25 — Function calling
- Capítulo 26 — MCP
- Capítulo 27 — Arquitecturas agenticas
- Capítulo 28 — Memoria
- Capítulo 35 — IA para PYMEs
- Capítulo 48 — Seguridad
- Capítulo 50 — Evaluación
