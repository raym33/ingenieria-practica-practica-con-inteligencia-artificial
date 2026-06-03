---
title: "Capítulo 21 — Chatbots modernos"
chapter: "22"
part: "Parte VI — Chatbots, copilotos y asistentes"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "intermedio"
estimated_reading_time: "42 minutos"
---

# Capítulo 21 — Chatbots modernos

Durante años, la palabra chatbot tuvo mala fama.

Muchos chatbots eran árboles de decisión disfrazados de conversación.  
Respondían con frases rígidas.  
No entendían contexto.  
No podían consultar documentos.  
No podían usar herramientas.  
No sabían decir “no lo sé”.  
No resolvían problemas reales.  
Solo desviaban usuarios.

Con los LLMs, la idea de chatbot cambió.

Un chatbot moderno puede:

- entender lenguaje natural;
- consultar documentos;
- citar fuentes;
- usar herramientas;
- recordar contexto;
- generar borradores;
- clasificar intención;
- escalar a humano;
- operar en varios canales;
- conectarse a sistemas internos;
- funcionar con modelos cloud o locales;
- actuar como interfaz para procesos complejos.

Pero eso no significa que todo chatbot sea bueno.

Un chatbot moderno mal diseñado puede ser más peligroso que uno antiguo.

Porque suena convincente.

Este capítulo explica cómo pensar un chatbot moderno como producto de IA, no como una caja de texto conectada a un modelo.

---

## 21.1 Qué es un chatbot moderno

Un chatbot moderno no es solo:

```text
usuario → LLM → respuesta
```

Eso es una demo.

Un chatbot moderno suele ser:

```text
usuario
→ clasificación de intención
→ contexto
→ RAG / tools / reglas
→ modelo
→ validación
→ respuesta
→ feedback / logs / escalado
```

Puede incluir:

- historial;
- memoria;
- permisos;
- RAG;
- herramientas;
- flujos deterministas;
- workflows;
- guardrails;
- observabilidad;
- canales;
- evaluación.

El chat es la interfaz.

El sistema está detrás.

---

## 21.2 Chatbot vs asistente vs copiloto vs agente

Conviene distinguir términos.

### Chatbot

Interfaz conversacional.

Puede responder preguntas o guiar al usuario.

### Asistente

Ayuda a realizar tareas, normalmente con más contexto.

### Copiloto

Acompaña a un profesional dentro de un flujo de trabajo.

Ejemplo: copiloto legal, médico, técnico, administrativo.

### Agente

Puede decidir pasos y usar herramientas para actuar.

No todos los chatbots son agentes.

No todos los copilotos necesitan autonomía.

Una buena arquitectura empieza por nombrar bien el producto.

---

## 21.3 El error de poner un LLM detrás de un chat

El error típico:

```text
frontend chat
+ llamada a modelo
= producto
```

Eso puede servir para demo.

Pero un producto necesita:

- objetivo;
- usuario;
- límites;
- fuentes;
- permisos;
- manejo de errores;
- logs;
- escalado;
- coste;
- seguridad;
- evaluación;
- UX;
- mantenimiento.

Un LLM en una ventana de chat es solo una pieza.

---

## 21.4 Tipos de chatbots modernos

### Chatbot informativo

Responde preguntas sobre información pública o interna.

Ejemplo: FAQ, políticas, documentación.

### Chatbot documental

Consulta documentos con RAG.

Ejemplo: contratos, manuales, normativa.

### Chatbot transaccional

Ayuda a hacer acciones.

Ejemplo: reservar cita, crear ticket, consultar estado.

### Chatbot de soporte

Resuelve incidencias y escala a humano.

### Chatbot interno

Ayuda a empleados.

### Chatbot comercial

Califica leads, responde dudas y genera oportunidades.

### Chatbot educativo

Explica, pregunta, corrige y adapta nivel.

### Chatbot de voz

Conversación hablada con STT/TTS.

Cada tipo requiere arquitectura distinta.

---

## 21.5 La pregunta inicial

Antes de construir un chatbot, pregunta:

> ¿Qué tarea concreta debe resolver?

No:

```text
Queremos un chatbot con IA.
```

Sino:

```text
Queremos reducir preguntas repetidas al equipo de soporte.
```

O:

```text
Queremos que empleados encuentren procedimientos internos con fuentes.
```

O:

```text
Queremos captar leads cualificados desde la web.
```

O:

```text
Queremos que estudiantes practiquen speaking con feedback.
```

La arquitectura depende del problema.

---

## 21.6 Chatbot para FAQ

Un FAQ bot puede parecer simple.

Pero incluso aquí hay decisiones:

- ¿responde con conocimiento general?
- ¿usa una base de preguntas?
- ¿usa RAG?
- ¿cita fuentes?
- ¿qué hace si no sabe?
- ¿cómo se actualizan respuestas?
- ¿quién revisa?
- ¿cómo escala?

Para FAQs estables y pocas, quizá basta un flujo determinista.

Para FAQs extensas y cambiantes, RAG puede ayudar.

No uses LLM si un buscador o formulario basta.

---

## 21.7 Chatbot documental

Un chatbot documental es uno de los mejores casos de uso de RAG.

Flujo:

```text
pregunta → documentos autorizados → retrieval → respuesta con fuentes
```

Debe incluir:

- ingesta documental;
- permisos;
- citas;
- no encontrado;
- feedback;
- logs;
- evaluación.

No debe:

- inventar;
- responder sin fuente;
- mezclar documentos sin control;
- mostrar fuentes no autorizadas;
- tratar documentos como instrucciones.

Este tipo de chatbot es muy relevante para PYMEs, despachos, gestorías, clínicas, educación y administración.

---

## 21.8 Chatbot de soporte

Un chatbot de soporte necesita combinar:

- FAQ;
- base de conocimiento;
- estado de cuenta;
- tickets;
- escalado;
- tono;
- reglas de negocio;
- límites.

Flujo típico:

```text
usuario pregunta
→ detectar intención
→ buscar solución
→ pedir datos si faltan
→ responder
→ crear ticket si no resuelve
→ escalar a humano
```

No debe bloquear acceso a humano si el usuario lo necesita.

El objetivo no es evitar personas a toda costa.

Es resolver mejor.

---

## 21.9 Chatbot comercial

Un chatbot comercial puede:

- responder dudas;
- calificar leads;
- recomendar producto;
- recoger contacto;
- agendar llamada;
- pasar información a CRM.

Riesgos:

- prometer de más;
- inventar precios;
- dar información obsoleta;
- capturar datos sin consentimiento;
- incumplir privacidad;
- molestar al usuario.

Debe tener:

- guion comercial;
- límites;
- datos actualizados;
- consentimiento;
- integración CRM;
- fallback humano;
- control de tono.

Un bot comercial malo daña marca.

---

## 21.10 Chatbot interno para empresa

Un chatbot interno puede ser muy valioso.

Casos:

- políticas de RRHH;
- manuales internos;
- procedimientos;
- soporte IT;
- onboarding;
- búsqueda documental;
- generación de borradores;
- consultas sobre proyectos.

Ventajas:

- reduce interrupciones;
- conserva conocimiento;
- acelera onboarding;
- ayuda a empleados;
- mejora acceso a documentos.

Riesgos:

- permisos;
- documentos obsoletos;
- información sensible;
- dependencia excesiva;
- falta de adopción.

Debe integrarse en flujos reales.

No ser una herramienta aislada.

---

## 21.11 Chatbot educativo

Un chatbot educativo no debe limitarse a dar respuestas.

Debe:

- explicar;
- preguntar;
- adaptar nivel;
- corregir;
- dar feedback;
- detectar errores;
- proponer práctica;
- mantener motivación;
- evitar dar soluciones demasiado pronto.

Ejemplo:

```text
No respondas directamente el ejercicio.
Guía al estudiante con una pista.
Si falla dos veces, explica el concepto.
```

La pedagogía importa.

Un LLM que responde todo puede empeorar aprendizaje.

---

## 21.12 Chatbot de voz

Un chatbot de voz añade:

- transcripción;
- detección de turnos;
- latencia baja;
- síntesis de voz;
- interrupciones;
- ruido;
- errores de STT;
- UX conversacional.

Lo que funciona en texto puede no funcionar en voz.

Por voz, respuestas largas son malas.

Se necesita:

- brevedad;
- turnos claros;
- confirmaciones;
- tolerancia a errores;
- baja latencia;
- personalidad consistente.

Voz es otro producto, no solo otro canal.

---

## 21.13 Arquitectura básica de chatbot moderno

```text
Canal
→ gateway
→ gestión de sesión
→ clasificación de intención
→ recuperación de contexto
→ políticas/reglas
→ modelo
→ validación
→ respuesta
→ logs/feedback
```

Componentes:

- frontend o canal;
- backend;
- store de conversaciones;
- RAG;
- tools;
- prompt manager;
- model router;
- guardrails;
- analytics;
- handoff humano.

No todos son necesarios al principio.

Pero conviene conocer el mapa.

---

## 21.14 Canales

Un chatbot puede vivir en:

- web;
- WhatsApp;
- Telegram;
- Slack;
- Teams;
- email;
- app móvil;
- voz;
- widget embebido;
- intranet;
- CRM;
- terminal;
- IDE.

Cada canal impone restricciones:

- longitud;
- formato;
- autenticación;
- privacidad;
- velocidad;
- adjuntos;
- notificaciones;
- identidad;
- historial;
- permisos.

No diseñes solo para chat web si el usuario real vive en WhatsApp o Teams.

---

## 21.15 Gestión de sesión

La sesión define continuidad.

Preguntas:

- ¿quién es el usuario?
- ¿está autenticado?
- ¿qué conversación es?
- ¿qué historial se conserva?
- ¿cuánto dura la sesión?
- ¿qué datos se guardan?
- ¿puede borrar historial?
- ¿qué contexto se inyecta?

Sin sesión, cada mensaje empieza de cero.

Con sesión mal diseñada, puedes filtrar datos o meter ruido.

---

## 21.16 Memoria

Memoria no es historial infinito.

Tipos:

### Memoria de conversación

Lo que se ha dicho en la sesión.

### Memoria de usuario

Preferencias o datos persistentes.

### Memoria de tarea

Estado de un proceso.

### Memoria documental

Fuentes consultadas.

Riesgos:

- privacidad;
- información obsoleta;
- mezcla de usuarios;
- contexto irrelevante;
- sesgos.

Memoria debe ser mínima y útil.

No guardar todo por defecto.

---

## 21.17 Clasificación de intención

Antes de responder, a veces conviene clasificar.

Ejemplos:

```text
FAQ
RAG documental
Crear ticket
Hablar con humano
Consulta comercial
Fuera de alcance
Riesgo alto
```

Esto permite enrutar.

Flujo:

```text
mensaje → clasificador → ruta
```

Puede usarse:

- modelo pequeño;
- reglas;
- embeddings;
- LLM;
- híbrido.

La clasificación debe evaluarse.

Un error de ruta puede romper experiencia.

---

## 21.18 Routing

Routing decide qué hacer.

Ejemplo:

```text
si pregunta documental → RAG
si quiere precio → base comercial
si quiere humano → handoff
si acción crítica → confirmación
si fuera de alcance → respuesta segura
```

Routing evita que un único prompt haga todo.

Reduce coste y mejora control.

---

## 21.19 RAG en chatbots

RAG permite que el chatbot responda con conocimiento específico.

Buenas prácticas:

- usar documentos autorizados;
- citar fuentes;
- permitir no encontrado;
- mostrar fragmentos;
- registrar fuentes;
- evaluar retrieval;
- actualizar índice.

No hagas que el chatbot responda sobre documentos internos sin RAG o contexto controlado.

---

## 21.20 Tools en chatbots

Tools permiten acciones:

- consultar pedido;
- crear ticket;
- reservar cita;
- enviar email;
- consultar calendario;
- actualizar CRM;
- buscar en base de datos;
- generar PDF.

Reglas:

- permisos mínimos;
- confirmación para escritura;
- logs;
- validación;
- errores controlados;
- no dar tools peligrosas sin guardrails.

Un chatbot con tools se acerca a un agente.

Más poder, más riesgo.

---

## 21.21 Handoff humano

Un chatbot moderno debe saber escalar.

Casos:

- usuario lo pide;
- baja confianza;
- tema sensible;
- error repetido;
- enfado;
- fuera de alcance;
- acción crítica;
- documentación insuficiente.

El handoff debe incluir contexto:

- resumen;
- intención;
- mensajes recientes;
- fuentes usadas;
- datos recogidos;
- motivo de escalado.

No obligues al usuario a repetir todo.

---

## 21.22 Diseño de fallback

Fallback no es “no entiendo”.

Mejor:

```text
No tengo información suficiente para responder con seguridad.
Puedo:
1. Buscar en otra fuente.
2. Reformular la pregunta.
3. Escalar a una persona.
```

Un buen fallback mantiene confianza.

Un mal fallback rompe conversación.

---

## 21.23 Tono y personalidad

El tono debe adaptarse al caso.

Soporte:

- claro;
- empático;
- breve;
- orientado a resolver.

Legal:

- prudente;
- preciso;
- con límites.

Educación:

- motivador;
- explicativo;
- adaptativo.

Comercial:

- útil;
- no agresivo;
- honesto.

No uses personalidad excesiva si el dominio requiere precisión.

---

## 21.24 Respuestas con incertidumbre

Un chatbot debe manejar incertidumbre.

Ejemplo:

```text
No encuentro una fuente que confirme ese dato.
```

O:

```text
La información disponible parece indicar X, pero la fuente no especifica Y.
```

Esto es mejor que inventar.

La incertidumbre bien expresada aumenta confianza.

---

## 21.25 Chatbots y datos personales

Si recoges datos:

- nombre;
- email;
- teléfono;
- empresa;
- dirección;
- historial;
- documentos;
- datos de salud;
- datos legales;

necesitas:

- base legal;
- consentimiento si aplica;
- minimización;
- política de privacidad;
- retención;
- borrado;
- seguridad;
- acceso limitado;
- logs controlados.

En Europa, RGPD no es opcional.

---

## 21.26 Chatbot público vs privado

### Público

- más riesgo de abuso;
- prompt injection;
- spam;
- coste;
- contenido inseguro;
- expectativas;
- regulación;
- privacidad.

### Privado

- permisos;
- datos internos;
- acceso;
- auditoría;
- adopción;
- integración;
- seguridad.

La arquitectura cambia.

No despliegues un bot interno como si fuera público.

No despliegues un bot público sin límites.

---

## 21.27 Chatbot local

Un chatbot local puede ejecutarse en infraestructura propia.

Ventajas:

- privacidad;
- control;
- coste fijo;
- integración interna;
- uso offline o LAN;
- soberanía.

Limitaciones:

- calidad del modelo;
- latencia;
- hardware;
- mantenimiento;
- actualizaciones;
- soporte.

Casos:

- PYMEs con documentos sensibles;
- despachos;
- clínicas;
- administración;
- educación;
- industria.

Un chatbot local es especialmente potente cuando se combina con RAG local.

---

## 21.28 Chatbot híbrido

Arquitectura híbrida:

```text
RAG local
+ clasificación local
+ modelo cloud para respuestas complejas
+ modelo local para consultas sensibles
```

O:

```text
datos sensibles quedan local
solo contexto anonimizado va a cloud
```

Lo importante es documentar:

- qué sale;
- qué no sale;
- qué proveedor;
- qué logs;
- qué permisos;
- qué fallback.

Híbrido sin mapa de datos es peligroso.

---

## 21.29 Chatbot y coste

Costes:

- tokens entrada;
- tokens salida;
- embeddings;
- RAG;
- reranking;
- tools;
- voz;
- storage;
- logs;
- observabilidad;
- handoff humano;
- mantenimiento.

Optimización:

- routing;
- modelos pequeños;
- cache;
- limitar contexto;
- resumir historial;
- RAG eficiente;
- respuestas breves;
- local para tareas simples.

Un chatbot popular puede volverse caro.

Mide desde el principio.

---

## 21.30 Chatbot y latencia

Latencia percibida importa.

Estrategias:

- streaming;
- mensajes intermedios;
- retrieval rápido;
- no hacer tareas pesadas síncronas;
- cache;
- modelos adecuados;
- respuestas breves;
- procesar documentos antes;
- separar workflows largos.

En voz, la latencia es todavía más crítica.

---

## 21.31 Chatbot y evaluación

Evalúa:

- intención detectada;
- respuesta correcta;
- fidelidad a fuentes;
- tono;
- seguridad;
- escalado correcto;
- no encontrado;
- coste;
- latencia;
- satisfacción usuario.

Dataset:

- preguntas frecuentes;
- preguntas fuera de alcance;
- usuarios enfadados;
- prompt injection;
- temas sensibles;
- preguntas ambiguas;
- solicitudes de humano;
- casos con documentos contradictorios.

Un chatbot sin evaluación es una apuesta.

---

## 21.32 Chatbot y observabilidad

Registra:

- mensaje;
- intención;
- ruta;
- modelo;
- prompt version;
- fuentes;
- tools usadas;
- latencia;
- coste;
- errores;
- handoff;
- feedback.

Pero no registres datos sensibles innecesarios.

Observabilidad permite mejorar y defender decisiones.

---

## 21.33 Chatbot y seguridad

Riesgos:

- prompt injection;
- jailbreaks;
- fuga de datos;
- tool injection;
- uso abusivo;
- costes por spam;
- respuestas inseguras;
- exposición de prompts;
- permisos incorrectos;
- logs sensibles.

Medidas:

- autenticación;
- rate limits;
- permisos;
- filtros;
- RAG con fuentes;
- tools limitadas;
- confirmación;
- logs;
- evaluación adversarial;
- separación de datos e instrucciones.

---

## 21.34 Chatbot y UX

La UX no es solo diseño visual.

Incluye:

- cómo empieza conversación;
- expectativas;
- ejemplos de preguntas;
- límites;
- loading;
- errores;
- fuentes;
- botones;
- handoff;
- feedback;
- recuperación de conversación;
- accesibilidad.

Un buen chatbot guía al usuario.

No espera que el usuario sepa preguntar perfecto.

---

## 21.35 Ejemplos de buenas primeras preguntas

En lugar de una caja vacía:

```text
Puedes preguntarme:
- ¿Cuál es el procedimiento para solicitar vacaciones?
- ¿Qué documentos necesito para abrir una incidencia?
- Resume este contrato y señala riesgos.
- Busca la política de gastos.
```

Los ejemplos reducen fricción.

También orientan expectativas.

---

## 21.36 El chatbot como interfaz universal

Una idea poderosa:

> El chat puede convertirse en interfaz para sistemas complejos.

Pero cuidado.

No todo debe ser chat.

Algunas tareas son mejores con:

- formularios;
- tablas;
- dashboards;
- botones;
- filtros;
- editores;
- workflows guiados.

El mejor producto puede combinar chat + UI tradicional.

Ejemplo:

```text
Chat para preguntar
Tabla para comparar
Botón para aprobar
Formulario para confirmar
Dashboard para revisar
```

No conviertas todo en conversación.

---

## 21.37 Chatbots para PYMEs

Casos útiles:

- responder preguntas frecuentes;
- consultar documentos internos;
- generar borradores de email;
- clasificar leads;
- recoger datos de contacto;
- soporte básico;
- onboarding de empleados;
- búsqueda de procedimientos.

La clave:

- bajo mantenimiento;
- privacidad;
- coste claro;
- instalación sencilla;
- soporte;
- límites.

Una PYME no quiere “un agente autónomo”.

Quiere ahorrar tiempo sin meterse en líos.

---

## 21.38 Chatbots para webs públicas

Para webs públicas:

- limita alcance;
- usa fuentes oficiales;
- recoge mínimos datos;
- muestra política de privacidad;
- evita prometer;
- escala a humano;
- registra abuso;
- controla coste;
- actualiza contenido;
- prueba adversarialmente.

Un chatbot público es una puerta abierta.

Debe estar protegido.

---

## 21.39 Chatbot para administración pública

Requisitos:

- fuentes oficiales;
- accesibilidad;
- lenguaje claro;
- no inventar;
- no sustituir resolución administrativa;
- escalar;
- trazabilidad;
- actualización;
- multilingüe si aplica;
- privacidad.

Debe responder con prudencia.

El ciudadano puede tomar decisiones basadas en lo que lee.

---

## 21.40 Chatbot para salud

Debe ser extremadamente prudente.

Funciones razonables:

- información general;
- preparación de consulta;
- recordatorios;
- triaje asistido con profesional;
- resumen de síntomas para médico;
- educación sanitaria.

No debe:

- diagnosticar definitivamente;
- sustituir médico;
- recomendar tratamientos peligrosos;
- ignorar urgencias.

Debe escalar ante señales de alarma.

---

## 21.41 Chatbot para legal

Funciones razonables:

- búsqueda documental;
- resumen de contratos;
- identificación de cláusulas;
- borradores para revisión;
- comparación de versiones;
- checklist.

No debe:

- dar asesoramiento definitivo sin profesional;
- inventar legislación;
- ocultar incertidumbre;
- mezclar fuentes;
- actuar sin revisión.

Fuentes y citas son obligatorias.

---

## 21.42 Chatbot para educación

Funciones:

- tutor;
- práctica oral;
- explicación;
- corrección;
- generación de ejercicios;
- seguimiento;
- adaptación de nivel.

Riesgos:

- dar respuestas sin enseñar;
- errores;
- dependencia;
- contenido inadecuado;
- falta de alineación curricular.

Debe diseñarse pedagógicamente.

---

## 21.43 Chatbot como producto comercial

Para vender un chatbot, define:

- problema;
- usuario;
- datos;
- alcance;
- canales;
- integraciones;
- límites;
- mantenimiento;
- métricas;
- precio;
- soporte.

No vendas “chatbot IA”.

Vende:

```text
reducción de tickets
captación de leads
búsqueda documental
ahorro de tiempo
mejor onboarding
```

El cliente compra resultado.

---

## 21.44 MVP de chatbot

MVP mínimo:

- un canal;
- un caso de uso;
- una base de conocimiento;
- respuesta con fuentes si aplica;
- fallback;
- logs;
- feedback;
- coste medido;
- revisión humana para casos sensibles.

No empieces con omnicanal, agentes, memoria avanzada y 20 integraciones.

Primero resuelve una tarea.

---

## 21.45 Antipatrones

### Chat vacío conectado a LLM

Demo, no producto.

### Responder siempre

Alucinaciones.

### No escalar a humano

Mala experiencia.

### Sin fuentes en documental

Poca confianza.

### Sin permisos

Riesgo grave.

### Sin logs

No puedes mejorar.

### Sin coste medido

Sorpresas.

### Sin UX

El usuario no sabe qué pedir.

### Demasiada autonomía

Riesgo.

### Vender como magia

Expectativas irreales.

---

## 21.46 Ideas clave del capítulo

- Un chatbot moderno es una interfaz sobre un sistema, no solo un LLM.
- Chatbot, asistente, copiloto y agente no son lo mismo.
- RAG, tools, memoria, routing y handoff son piezas distintas.
- El diseño depende del problema y del canal.
- Un buen bot sabe decir “no lo sé” y escalar a humano.
- Las fuentes, permisos y logs son esenciales en chatbots documentales.
- Voz requiere diseño específico.
- Para PYMEs, el valor está en ahorrar tiempo con bajo mantenimiento.
- No todo debe resolverse con chat; muchas tareas necesitan UI tradicional.
- Un chatbot sin evaluación es una apuesta.

---

## 21.47 Checklist práctica

Antes de construir un chatbot:

- ¿Qué problema resuelve?
- ¿Quién lo usa?
- ¿En qué canal?
- ¿Qué datos necesita?
- ¿Usa RAG?
- ¿Usa tools?
- ¿Necesita memoria?
- ¿Necesita permisos?
- ¿Cuándo debe decir no encontrado?
- ¿Cuándo debe escalar a humano?
- ¿Qué tono debe tener?
- ¿Qué límites debe comunicar?
- ¿Qué coste por conversación esperas?
- ¿Qué latencia es aceptable?
- ¿Qué logs guardarás?
- ¿Qué datos no debes guardar?
- ¿Cómo evaluarás calidad?
- ¿Cómo recogerás feedback?
- ¿Qué pasa si falla?
- ¿Qué queda fuera del MVP?

---

## 21.48 Plantilla de diseño de chatbot

```markdown
# Diseño de chatbot

## Objetivo

Qué problema resuelve.

## Usuario

Quién lo usa.

## Canal

Web, WhatsApp, Teams, voz, etc.

## Tipo

FAQ / documental / soporte / comercial / interno / educativo / voz.

## Fuentes

Documentos, APIs, bases de datos.

## RAG

Sí/no y alcance.

## Tools

Acciones permitidas.

## Permisos

Cómo se controla acceso.

## Memoria

Qué se recuerda y cuánto tiempo.

## Fallback

Qué hace si no sabe.

## Handoff humano

Cuándo y cómo escala.

## Tono

Estilo de respuesta.

## Seguridad

Riesgos y controles.

## Privacidad

Datos tratados y retención.

## Coste

Estimación.

## Evaluación

Dataset y métricas.

## MVP

Primer alcance.
```

---

## 21.49 Qué puede cambiar en el futuro

Cambiarán:

- canales;
- modelos;
- voz en tiempo real;
- agentes;
- MCP;
- memoria;
- herramientas de soporte;
- plataformas de chatbot;
- regulación;
- costes;
- expectativas de usuario.

Pero probablemente seguirá siendo cierto:

> Un chatbot útil no es el que habla mejor, sino el que resuelve una tarea concreta con seguridad, contexto y límites claros.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 17 — Arquitectura RAG básica
- Capítulo 20 — Herramientas RAG
- Capítulo 22 — Chatbots para soporte
- Capítulo 23 — Diferencia entre chatbot, copiloto y agente
- Capítulo 24 — Qué es un agente de IA
- Capítulo 26 — MCP
- Capítulo 29 — Agentes de voz
- Capítulo 35 — IA para PYMEs
- Capítulo 48 — Seguridad
- Capítulo 50 — Evaluación
