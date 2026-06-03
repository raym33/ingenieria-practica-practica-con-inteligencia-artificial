---
title: "Capítulo 15 — De idea a prototipo"
chapter: "16"
part: "Parte IV — Vibe Coding y desarrollo asistido por IA"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "intermedio"
estimated_reading_time: "40 minutos"
---

# Capítulo 15 — De idea a prototipo

Una de las mayores ventajas de construir con IA es la velocidad con la que puedes pasar de una idea a algo visible.

Antes, muchas ideas morían en la fase de intención.

Había que diseñar, programar, montar infraestructura, escribir textos, crear interfaz, integrar APIs, preparar datos y desplegar.

Ahora, con buenos modelos y buenas herramientas, puedes avanzar mucho más rápido.

Puedes crear una landing.  
Puedes generar un backend inicial.  
Puedes probar un flujo RAG.  
Puedes simular un agente.  
Puedes montar una demo para un cliente.  
Puedes crear datos ficticios.  
Puedes escribir documentación.  
Puedes generar tests.  
Puedes desplegar en Vercel, Render, Railway, Fly, Docker o una máquina local.

Pero esta velocidad tiene una trampa:

> Es muy fácil crear algo que parece producto, pero solo es una maqueta frágil.

Este capítulo trata de cómo pasar de idea a prototipo de forma útil, sin engañarte.

---

## 15.1 La idea no vale nada hasta que toca realidad

Una idea de IA puede sonar brillante.

Un chatbot para ayuntamientos.  
Un asistente legal local.  
Una app móvil con memoria.  
Un tutor de inglés con voz.  
Un agente para autónomos.  
Un RAG para clínicas.  
Un comparador inteligente.  
Una herramienta para programadores.  
Una plataforma educativa generada con IA.  

Pero antes de construir, hay que hacer preguntas incómodas:

- ¿Quién lo usará?
- ¿Qué problema exacto resuelve?
- ¿Ese problema ocurre con frecuencia?
- ¿El usuario pagaría por resolverlo?
- ¿Hay datos disponibles?
- ¿La IA mejora claramente el flujo?
- ¿Qué pasa si falla?
- ¿Puede hacerse con algo más simple?
- ¿Es una demo, un MVP o un producto?
- ¿Qué riesgo legal, médico, financiero o reputacional existe?

La IA permite prototipar rápido.

Pero no convierte automáticamente una idea en buena idea.

---

## 15.2 Idea, demo, prototipo, MVP y producto

Conviene separar términos.

### Idea

Una posibilidad.

```text
Un asistente documental para gestorías.
```

### Demo

Una muestra visual o funcional que enseña la posibilidad.

```text
Subes tres PDFs y haces preguntas.
```

### Prototipo

Una versión experimental que prueba un flujo técnico.

```text
Ingesta documentos, crea chunks, embeddings, busca y responde.
```

### MVP

Una versión mínima que resuelve un problema real para un usuario real.

```text
Cinco empleados consultan documentación interna con respuestas citadas.
```

### Piloto

Un uso controlado en entorno real.

```text
La gestoría lo usa dos semanas con documentos reales no críticos.
```

### Producto

Una solución mantenible, segura, documentada, vendible y soportable.

```text
Instalación, usuarios, permisos, backups, soporte, métricas, costes y roadmap.
```

Cada fase tiene objetivos distintos.

El error es vender una demo como producto.

---

## 15.3 La pregunta inicial correcta

No empieces por:

> ¿Qué puedo construir con IA?

Empieza por:

> ¿Qué problema concreto puedo reducir, acelerar o hacer más fácil con IA?

Ejemplo malo:

```text
Quiero hacer una app con agentes.
```

Ejemplo mejor:

```text
Quiero reducir el tiempo que una gestoría dedica a buscar información en PDFs y emails internos.
```

Ejemplo aún mejor:

```text
Quiero que una gestoría de 12 empleados pueda encontrar respuestas sobre procedimientos internos en menos de 30 segundos, con citas a documentos, sin enviar datos sensibles fuera.
```

La precisión de la idea determina la calidad del prototipo.

---

## 15.4 La ficha de oportunidad

Antes de construir, rellena una ficha.

```markdown
# Ficha de oportunidad

## Problema

¿Qué duele?

## Usuario

¿Quién lo sufre?

## Frecuencia

¿Cuántas veces ocurre?

## Solución actual

¿Cómo lo resuelven hoy?

## Coste actual

Tiempo, dinero, errores o frustración.

## Propuesta IA

¿Qué parte mejora la IA?

## Datos disponibles

Documentos, emails, bases de datos, voz, imágenes.

## Riesgos

Legal, privacidad, seguridad, calidad.

## MVP

¿Qué versión mínima probaría valor?

## Métrica

¿Cómo sabremos si funciona?
```

Si no puedes rellenarla, quizá no tienes idea.

Tienes intuición.

Y eso está bien.

Pero todavía no construyas demasiado.

---

## 15.5 Elegir el flujo mínimo

Un prototipo debe probar un flujo, no una visión completa.

Ejemplo: asistente documental.

Visión completa:

- login;
- permisos;
- subida de documentos;
- OCR;
- embeddings;
- RAG;
- citas;
- chat;
- historial;
- feedback;
- panel admin;
- analytics;
- backups;
- despliegue local;
- agente con tools;
- exportación PDF;
- facturación.

Flujo mínimo:

```text
subir documento → extraer texto → hacer pregunta → responder con cita
```

Eso basta para validar si el núcleo tiene sentido.

La pregunta es:

> ¿Cuál es el camino más corto para probar la hipótesis principal?

No para construir todo.

---

## 15.6 Hipótesis

Cada prototipo debería probar una hipótesis.

Ejemplos:

```text
Los empleados pierden tiempo buscando procedimientos.
```

```text
Un RAG con citas reduce ese tiempo.
```

```text
El cliente acepta una solución local-first.
```

```text
Un modelo local es suficientemente bueno para respuestas internas.
```

```text
El usuario revisará borradores antes de enviarlos.
```

```text
Un agente de voz mejora la práctica oral de inglés.
```

Sin hipótesis, el prototipo se convierte en juguete.

Con hipótesis, puedes aprender.

---

## 15.7 Métrica de éxito

Una hipótesis necesita métrica.

Ejemplos:

- reducir tiempo de búsqueda de 10 minutos a 1 minuto;
- responder correctamente 80 % de preguntas frecuentes;
- generar borradores aceptables en 70 % de casos;
- disminuir emails repetitivos en 30 %;
- permitir crear una lección en 5 minutos;
- clasificar tickets con 90 % de precisión;
- lograr que 3 usuarios reales lo usen una semana;
- reducir coste de tokens por interacción un 40 %.

La métrica no tiene que ser perfecta.

Pero debe existir.

Sin métrica, solo tienes sensación.

---

## 15.8 Datos reales, pero seguros

Un prototipo con datos falsos puede servir para la interfaz.

Pero para validar IA necesitas datos representativos.

No siempre datos reales completos.

Puedes usar:

- documentos anonimizados;
- ejemplos sintéticos basados en casos reales;
- fragmentos no sensibles;
- datos públicos;
- documentos ficticios con estructura real;
- subset pequeño autorizado;
- logs limpiados.

Nunca subas datos sensibles a herramientas externas sin permiso y sin entender condiciones.

Para PYMEs, legal, salud o administración pública, esto es crítico.

---

## 15.9 Prototipo técnico vs prototipo comercial

Hay dos tipos de prototipos.

### Prototipo técnico

Prueba si se puede construir.

Preguntas:

- ¿funciona el RAG?
- ¿el modelo local responde?
- ¿la latencia es aceptable?
- ¿el OCR extrae bien?
- ¿el agente usa tools?
- ¿el stack se despliega?

### Prototipo comercial

Prueba si alguien lo quiere.

Preguntas:

- ¿el cliente entiende el valor?
- ¿lo usaría?
- ¿pagaría?
- ¿qué objeciones tiene?
- ¿qué flujo le importa?
- ¿qué miedo tiene?
- ¿qué integración necesita?

Muchas ideas pasan prototipo técnico y fallan comercialmente.

Y al revés: algunas ideas simples tienen mucho valor comercial.

---

## 15.10 El prototipo no debe parecer más maduro de lo que es

Una demo demasiado pulida puede engañar.

Al cliente.  
Al equipo.  
A ti mismo.

Por eso conviene etiquetar claramente:

```text
Demo técnica
No usar con datos sensibles
No conectado a producción
Sin garantías de precisión
Respuestas para revisión humana
```

La honestidad aumenta confianza.

Especialmente en IA.

---

## 15.11 Herramientas para prototipar rápido

Puedes usar muchas herramientas.

### Para UI rápida

- Next.js;
- Vite;
- Streamlit;
- Gradio;
- Lovable;
- v0;
- Bolt;
- Replit;
- Cursor;
- Claude Code;
- Codex.

### Para backend

- FastAPI;
- Flask;
- Django;
- Express;
- Supabase;
- Firebase;
- PocketBase.

### Para IA

- OpenAI-compatible APIs;
- Anthropic;
- Gemini;
- Mistral;
- Ollama;
- LM Studio;
- llama.cpp;
- LlamaIndex;
- LangChain;
- Haystack.

### Para RAG

- pgvector;
- Qdrant;
- Chroma;
- FAISS;
- Weaviate;
- LlamaIndex;
- LangChain;
- RAGFlow;
- AnythingLLM.

### Para automatización

- n8n;
- Activepieces;
- Make;
- Zapier;
- scripts Python;
- MCP;
- Playwright.

La herramienta depende de la hipótesis.

No al revés.

---

## 15.12 Stack de prototipo recomendado

Para muchos proyectos IA, un stack práctico puede ser:

```text
Frontend simple
+ backend FastAPI
+ PostgreSQL
+ pgvector o Qdrant
+ proveedor LLM configurable
+ Docker Compose
+ README
+ datos demo
```

Para una demo más rápida:

```text
Streamlit
+ modelo API
+ Chroma local
+ carpeta de documentos
```

Para local-first:

```text
Ollama
+ Open WebUI o frontend propio
+ Qdrant/pgvector
+ documentos locales
```

Para producto futuro, piensa desde el principio:

- autenticación;
- permisos;
- logs;
- costes;
- backups;
- seguridad;
- despliegue.

No lo implementes todo en la demo.

Pero no lo ignores.

---

## 15.13 Prompt para diseñar prototipo

```text
Actúa como arquitecto de producto IA.

Tengo esta idea:
[idea]

Quiero crear un prototipo en 7 días.

Ayúdame a definir:
1. Hipótesis principal
2. Usuario objetivo
3. Flujo mínimo
4. Datos necesarios
5. Stack recomendado
6. Qué simularía
7. Qué implementaría de verdad
8. Métrica de éxito
9. Riesgos
10. Qué NO construiría todavía
```

Este prompt evita construir por ansiedad.

---

## 15.14 Prompt para reducir alcance

```text
Esta es mi idea completa:
[idea larga]

Reduce el alcance a un prototipo mínimo que pueda construirse en una semana.

Reglas:
- mantener solo el flujo que valida más valor;
- eliminar funciones secundarias;
- no incluir pagos;
- no incluir multiusuario si no es imprescindible;
- no incluir agentes si basta un workflow;
- priorizar aprendizaje.

Devuelve:
1. Versión mínima
2. Funciones eliminadas
3. Motivo
4. Próximas fases
```

Reducir alcance es una habilidad clave.

---

## 15.15 Prompt para elegir stack de prototipo

```text
Ayúdame a elegir stack para este prototipo.

Idea:
[idea]

Restricciones:
- quiero avanzar rápido;
- soy un equipo pequeño;
- quiero poder evolucionarlo a producto;
- prefiero Python para backend;
- puede necesitar RAG;
- quizá se despliegue localmente en una PYME.

Compara:
1. Streamlit
2. Next.js + FastAPI
3. Supabase + Next.js
4. Django
5. herramienta no-code/low-code

Devuelve recomendación por fase:
- demo;
- MVP;
- producto.
```

El stack de demo no siempre es el stack de producto.

Pero debe permitir aprender.

---

## 15.16 Crear prototipo con datos ficticios

Datos ficticios permiten avanzar sin riesgo.

Prompt:

```text
Genera datos ficticios para probar un asistente documental de una gestoría.

Incluye:
- 5 clientes inventados;
- 10 documentos simulados;
- 20 preguntas frecuentes;
- 10 preguntas fuera de alcance;
- 5 documentos con información ambigua;
- 5 emails largos;
- nombres claramente ficticios;
- ninguna información real.
```

Los datos ficticios deben parecer reales en estructura, no en contenido.

---

## 15.17 Crear una demo RAG mínima

Flujo mínimo:

```text
1. Cargar documentos.
2. Extraer texto.
3. Dividir en chunks.
4. Crear embeddings.
5. Buscar chunks.
6. Generar respuesta con fuentes.
```

No empieces con:

- agentes;
- memoria avanzada;
- permisos complejos;
- multiusuario;
- fine-tuning;
- dashboards;
- automatización completa.

Primero demuestra que las respuestas con fuentes funcionan.

---

## 15.18 Crear una demo de agente mínima

Un agente mínimo no debe tener acceso a todo.

Ejemplo:

```text
Agente puede:
- leer una lista de tareas;
- crear un borrador;
- buscar en documentos;
- sugerir una acción.

Agente no puede:
- enviar emails;
- borrar datos;
- modificar base de datos;
- comprar;
- desplegar;
- acceder a producción.
```

El primer agente debe ser asistido.

No autónomo total.

---

## 15.19 Crear una demo de voz mínima

Flujo mínimo:

```text
audio → transcripción → respuesta → voz
```

Pero para validar, puedes empezar más simple:

```text
texto → respuesta → voz
```

Luego:

```text
audio → texto
```

Después integras.

La voz requiere baja latencia.

No intentes resolver todo en la primera demo.

---

## 15.20 Crear una demo local-first

Flujo:

```text
modelo local
+ interfaz local
+ documentos locales
+ respuesta privada
```

Objetivo:

- demostrar privacidad;
- demostrar coste fijo;
- demostrar que funciona sin enviar documentos fuera.

Cuidado:

- no prometas calidad frontier;
- mide latencia;
- indica límites;
- prueba en hardware real;
- documenta configuración.

---

## 15.21 Crear prototipos para PYMEs

Para PYMEs, el prototipo debe ser concreto.

Malo:

```text
Le ponemos IA a tu empresa.
```

Mejor:

```text
Sube tus procedimientos internos y pregunta sobre ellos con fuentes.
```

O:

```text
Clasificamos emails entrantes y generamos borradores revisables.
```

O:

```text
Extraemos datos de facturas y los dejamos listos para revisión.
```

La PYME no compra IA.

Compra menos tiempo perdido.

---

## 15.22 La entrevista antes del prototipo

Antes de construir para un cliente, haz discovery.

Preguntas:

- ¿Qué tarea repetís cada semana?
- ¿Dónde perdéis más tiempo?
- ¿Qué documentos consultáis más?
- ¿Qué errores se repiten?
- ¿Qué emails respondéis una y otra vez?
- ¿Qué proceso depende de una persona concreta?
- ¿Qué os da miedo automatizar?
- ¿Qué datos no pueden salir de la empresa?
- ¿Qué herramienta usáis hoy?
- ¿Cómo mediríamos ahorro?

Muchas veces el mejor prototipo aparece después de escuchar.

No antes.

---

## 15.23 Guion de discovery para AI Assessment

```markdown
# Discovery IA para PYME

## Empresa

Sector, tamaño, herramientas actuales.

## Procesos repetitivos

Lista de tareas frecuentes.

## Documentos

Tipos, volumen, calidad, ubicación.

## Comunicación

Email, WhatsApp, teléfono, formularios.

## Datos sensibles

Qué no puede salir.

## Dolor principal

Tiempo, coste, errores, dependencia de personas.

## Oportunidades IA

RAG, automatización, clasificación, voz, generación.

## Riesgos

Privacidad, calidad, legal, adopción.

## Primer prototipo

Flujo mínimo.

## Métrica

Ahorro estimado o mejora concreta.
```

Esto puede convertirse en servicio comercial.

---

## 15.24 Del discovery al prototipo

Después de la entrevista, crea matriz impacto/esfuerzo.

```markdown
| Oportunidad | Impacto | Esfuerzo | Riesgo | Datos disponibles | Prioridad |
|---|---:|---:|---:|---|---:|
| RAG procedimientos | Alto | Medio | Medio | PDFs internos | 1 |
| Clasificar emails | Medio | Bajo | Bajo | Gmail/IMAP | 2 |
| Agente autónomo ventas | Alto | Alto | Alto | CRM incompleto | 4 |
```

El primer prototipo debe estar en:

```text
alto impacto + bajo/medio esfuerzo + riesgo controlado
```

No en “lo más espectacular”.

---

## 15.25 Prototipo como venta

Una demo puede ayudar a vender.

Pero debe vender de forma honesta.

Estructura de presentación:

1. Problema observado.
2. Flujo actual.
3. Demo del flujo mejorado.
4. Qué hace la IA.
5. Qué no hace.
6. Riesgos y límites.
7. Qué habría que endurecer.
8. Propuesta de piloto.
9. Coste y mantenimiento.

No presentes solo magia.

Presenta camino.

---

## 15.26 Qué simular y qué construir

En un prototipo puedes simular partes.

Simulable:

- login;
- datos de ejemplo;
- emails ficticios;
- pagos;
- panel admin;
- notificaciones;
- integración final;
- permisos avanzados.

Debe ser real si valida hipótesis:

- recuperación documental;
- calidad de respuesta;
- clasificación;
- latencia;
- flujo principal;
- generación de borradores;
- extracción de campos.

Regla:

```text
Simula lo que no afecta a la hipótesis.
Construye lo que sí la valida.
```

---

## 15.27 Prototipo en una semana

Plan posible:

### Día 1

Discovery, hipótesis, flujo mínimo, datos ficticios.

### Día 2

Estructura proyecto, README, entorno local, pantalla básica.

### Día 3

Backend mínimo, subida de datos o carga de ejemplos.

### Día 4

Integración IA: RAG, clasificación o generación.

### Día 5

Interfaz usable y manejo de errores.

### Día 6

Tests básicos, seguridad mínima, documentación.

### Día 7

Demo, feedback, lista de mejoras y decisión.

El objetivo no es terminar producto.

Es aprender lo suficiente para decidir siguiente paso.

---

## 15.28 Criterios para seguir o abandonar

Después del prototipo, decide.

Seguir si:

- usuario entiende valor;
- problema es real;
- datos existen;
- IA mejora flujo;
- riesgo es controlable;
- coste parece razonable;
- usuario quiere probar;
- hay camino a MVP.

Abandonar o pausar si:

- nadie siente el dolor;
- el problema es raro;
- datos no existen;
- calidad es insuficiente;
- riesgo es demasiado alto;
- coste no cuadra;
- usuario no lo usaría;
- solución simple sin IA basta.

Abandonar una mala idea pronto es éxito.

---

## 15.29 Convertir prototipo en MVP

Para pasar a MVP, añade:

- usuarios reales;
- autenticación;
- permisos;
- datos representativos;
- logs;
- manejo de errores;
- tests;
- privacidad;
- costes;
- feedback;
- documentación;
- despliegue reproducible;
- soporte básico.

No hace falta todo el producto.

Pero sí lo mínimo para que alguien lo use con seguridad razonable.

---

## 15.30 Convertir MVP en piloto

Para piloto:

- define duración;
- define usuarios;
- define datos permitidos;
- define soporte;
- define métricas;
- define riesgos;
- define quién revisa salidas;
- define canal de feedback;
- define criterios de éxito;
- define qué pasa al terminar.

Ejemplo:

```text
Piloto de 2 semanas
5 usuarios internos
Solo documentos no críticos
Respuestas revisadas por humano
Métrica: tiempo medio de búsqueda y satisfacción
```

Un piloto sin criterios se convierte en prueba eterna.

---

## 15.31 Convertir piloto en producto

Producto requiere:

- onboarding;
- roles;
- permisos;
- auditoría;
- backups;
- monitorización;
- soporte;
- billing si aplica;
- documentación cliente;
- actualizaciones;
- política de datos;
- seguridad;
- evaluación continua;
- roadmap;
- contrato.

Aquí termina la fase romántica.

Empieza el negocio.

---

## 15.32 Prototipos personales

No todos los prototipos son para clientes.

También puedes crear prototipos para:

- aprender;
- portfolio;
- GitHub;
- LinkedIn;
- validar habilidades;
- preparar entrevistas;
- crear contenido;
- construir marca personal.

Un prototipo personal debe mostrar:

- problema;
- arquitectura;
- código;
- README;
- screenshots;
- limitaciones;
- próximos pasos;
- qué aprendiste.

No escondas que es prototipo.

Explícalo bien.

---

## 15.33 Prototipos como portfolio profesional

Un buen prototipo puede valer más que un certificado.

Ejemplos:

- RAG privado con citas;
- agente con tools limitadas;
- app local-first con Ollama;
- pipeline de evaluación RAG;
- asistente de voz;
- dashboard de costes LLM;
- comparador de modelos;
- generador educativo;
- agente de código con reglas;
- mini-OS para autónomos.

Lo importante es mostrar criterio.

No solo pantallas.

---

## 15.34 README de prototipo

Un prototipo debe tener README.

Incluye:

- qué problema resuelve;
- estado: demo/prototipo/MVP;
- stack;
- arquitectura;
- instalación;
- uso;
- limitaciones;
- seguridad;
- datos de prueba;
- roadmap;
- screenshots;
- decisiones técnicas.

Esto diferencia un experimento serio de una carpeta de código.

---

## 15.35 Prompt para README de prototipo

```text
Crea un README para este prototipo IA.

Incluye:
1. Qué problema intenta resolver
2. Estado actual
3. Stack
4. Arquitectura
5. Cómo ejecutarlo
6. Datos demo
7. Limitaciones
8. Riesgos de seguridad/privacidad
9. Roadmap hacia MVP
10. Capturas pendientes

Tono:
honesto, técnico y práctico.
```

---

## 15.36 Prototipo y coste

Aunque sea prototipo, estima coste.

Preguntas:

- ¿cuántas llamadas al modelo?
- ¿cuántos tokens?
- ¿embeddings?
- ¿reranking?
- ¿almacenamiento?
- ¿hosting?
- ¿modelo local?
- ¿hardware?
- ¿mantenimiento?
- ¿soporte?

Un prototipo barato puede volverse caro en producción.

Detectarlo pronto evita sorpresas.

---

## 15.37 Prototipo y privacidad

Incluso una demo puede tratar datos sensibles.

Reglas:

- usa datos ficticios si puedes;
- anonimiza;
- no subas documentos reales a herramientas desconocidas;
- revisa proveedores;
- no guardes logs sensibles;
- borra datos de prueba;
- documenta límites;
- usa `.env.example`, no `.env`.

La privacidad no empieza en producción.

Empieza en el primer archivo.

---

## 15.38 Prototipo y seguridad

Seguridad mínima:

- no hardcodear claves;
- validar entradas;
- limitar tamaño de archivos;
- evitar ejecución de código arbitrario;
- no exponer puertos públicamente sin protección;
- no permitir borrados destructivos;
- no conectar producción;
- usar datos ficticios;
- controlar CORS;
- logs básicos.

La frase “solo es una demo” no justifica inseguridad grave.

---

## 15.39 Prototipo y evaluación

Aunque sea simple, evalúa.

Para RAG:

- 20 preguntas con respuesta esperada;
- 10 fuera de alcance;
- 5 ambiguas;
- revisar citas;
- medir no encontrados.

Para clasificación:

- dataset pequeño etiquetado;
- precisión;
- errores típicos.

Para agente:

- tareas completadas;
- pasos;
- errores;
- necesidad de intervención.

La evaluación convierte sensación en evidencia.

---

## 15.40 Ejemplo: LexLocal AI como prototipo

Una idea tipo asistente legal local puede empezar así:

Flujo mínimo:

```text
subir contrato → extraer texto → preguntar → responder con citas
```

No incluir al principio:

- asesoramiento legal definitivo;
- integración con bases externas;
- agentes autónomos;
- generación automática de escritos;
- multiusuario complejo;
- facturación.

Métrica:

- tiempo de encontrar cláusulas;
- calidad de citas;
- satisfacción del profesional;
- tasa de respuestas “no encontrado” correctas.

Mensaje comercial:

```text
Asistente documental privado para acelerar búsqueda y revisión.
No sustituye criterio profesional.
```

---

## 15.41 Ejemplo: Aulafy como prototipo

Una plataforma educativa generada con IA puede empezar así:

Flujo mínimo:

```text
tema → generar lección → generar ejercicios → generar audio → publicar página
```

No incluir al principio:

- todo el currículo;
- usuarios;
- pagos;
- gamificación compleja;
- app móvil;
- evaluación adaptativa avanzada.

Métrica:

- calidad de lecciones;
- coherencia de nivel;
- utilidad para estudiantes;
- tiempo de generación;
- revisión humana necesaria.

El riesgo no es generar mucho.

Es generar mucho sin calidad.

---

## 15.42 Ejemplo: Recorda como prototipo

Una app de memoria personal puede empezar así:

Flujo mínimo:

```text
capturar nota → clasificar → resumir → recordar después
```

No incluir al principio:

- agentes autónomos;
- integraciones complejas;
- red social;
- sincronización avanzada;
- IA cloud obligatoria.

Métrica:

- rapidez de captura;
- utilidad del recordatorio;
- precisión de clasificación;
- confianza del usuario;
- privacidad.

---

## 15.43 Ejemplo: chatbot municipal

Flujo mínimo:

```text
pregunta ciudadana → buscar fuente pública → responder con enlace/cita
```

No incluir al principio:

- trámites personalizados;
- datos personales;
- acciones administrativas;
- respuestas sin fuente;
- automatización de expedientes.

Métrica:

- preguntas frecuentes resueltas;
- precisión;
- enlaces correctos;
- tasa de escalado;
- claridad para ciudadano.

En administración pública, prudencia máxima.

---

## 15.44 Ejemplo: OfficeAI para autónomos

Flujo mínimo:

```text
email/documento → clasificar → generar borrador → humano revisa
```

No incluir al principio:

- envío automático;
- integración bancaria;
- borrado de datos;
- agente autónomo completo;
- acceso total al correo.

Métrica:

- tiempo ahorrado;
- calidad de borradores;
- tasa de revisión;
- errores evitados;
- facilidad de uso.

---

## 15.45 Antipatrones

### Construir antes de escuchar

Puedes resolver el problema equivocado.

### Demo demasiado grande

No sabes qué parte aporta valor.

### Sin métrica

No sabes si funciona.

### Datos irreales

La demo no prueba nada.

### Datos sensibles sin control

Riesgo serio.

### Usar agentes desde el día uno

Quizá bastaba un workflow.

### Empezar con fine-tuning

Prematuro en la mayoría de MVPs.

### No documentar límites

El usuario sobreconfía.

### No planificar siguiente fase

La demo muere.

### Vender prototipo como producto

Pérdida de confianza.

---

## 15.46 Ideas clave del capítulo

- La IA acelera el paso de idea a prototipo, pero también acelera el autoengaño.
- Idea, demo, prototipo, MVP, piloto y producto son fases distintas.
- Un prototipo debe probar una hipótesis concreta.
- El flujo mínimo es más importante que la visión completa.
- Los datos deben ser representativos y seguros.
- Para PYMEs, prototipa ahorro real, no “IA en general”.
- Discovery antes de construir aumenta probabilidad de acierto.
- Un prototipo debe tener métrica, límites y README.
- Pasar a MVP exige seguridad, usuarios, logs, tests y despliegue.
- Abandonar una mala idea pronto es una victoria.

---

## 15.47 Checklist práctica

Antes de prototipar:

- ¿Qué problema concreto resuelve?
- ¿Quién es el usuario?
- ¿Con qué frecuencia ocurre?
- ¿Cómo se resuelve hoy?
- ¿Qué parte mejora la IA?
- ¿Qué hipótesis quiero probar?
- ¿Cuál es la métrica?
- ¿Qué datos necesito?
- ¿Puedo usar datos ficticios o anonimizados?
- ¿Cuál es el flujo mínimo?
- ¿Qué voy a simular?
- ¿Qué debo construir de verdad?
- ¿Qué riesgos hay?
- ¿Qué no voy a incluir?
- ¿Cuánto tiempo dedicaré?
- ¿Cómo decidiré si sigo?

Después del prototipo:

- ¿Funciona el flujo principal?
- ¿Lo ha probado alguien real?
- ¿La IA aporta valor?
- ¿La calidad es suficiente?
- ¿El coste parece razonable?
- ¿El riesgo es controlable?
- ¿Qué falta para MVP?
- ¿Qué aprendí?
- ¿Sigo, pauso o abandono?

---

## 15.48 Plantilla de prototipo

```markdown
# Prototipo

## Idea

Descripción breve.

## Problema

Qué problema resuelve.

## Usuario

Quién lo usará.

## Hipótesis

Qué queremos validar.

## Flujo mínimo

Paso 1 → paso 2 → paso 3.

## Datos

Qué datos se usan y si son ficticios, anonimizados o reales.

## Stack

Herramientas elegidas.

## Qué se implementa

Lista.

## Qué se simula

Lista.

## Qué queda fuera

Lista.

## Métrica

Cómo se medirá éxito.

## Riesgos

Privacidad, seguridad, calidad, coste.

## Resultado

Qué se aprendió.

## Decisión

Seguir / pausar / abandonar / convertir en MVP.
```

---

## 15.49 Qué puede cambiar en el futuro

Cambiarán:

- herramientas de prototipado;
- agentes de código;
- plataformas low-code;
- modelos;
- costes;
- frameworks RAG;
- MCP;
- despliegues locales;
- herramientas de voz;
- hardware.

Pero probablemente seguirá siendo cierto:

> El mejor prototipo no es el más impresionante. Es el que más rápido reduce incertidumbre real.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 3 — La diferencia entre jugar con IA y construir con IA
- Capítulo 12 — Prompts para crear software
- Capítulo 13 — Vibe coding
- Capítulo 14 — Reglas para agentes de código
- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 21 — Chatbots modernos
- Capítulo 24 — Qué es un agente de IA
- Capítulo 35 — IA para PYMEs
- Capítulo 36 — AI Assessment
- Capítulo 46 — Despliegue de sistemas IA
