---
title: "Introducción — La nueva ingeniería con IA"
chapter: "01"
version: "0.1"
last_updated: "2026-06-02"
status: "estable"
level: "introductorio"
estimated_reading_time: "18 minutos"
---

# Introducción — La nueva ingeniería con IA

Durante décadas, construir software significaba traducir una necesidad humana a código determinista.

Un usuario quería hacer algo.  
Un analista lo convertía en requisitos.  
Un ingeniero lo transformaba en arquitectura.  
Un programador escribía lógica.  
Una base de datos guardaba estado.  
Una interfaz permitía operar el sistema.

El resultado podía ser más o menos complejo, pero el principio era claro: el software hacía aquello para lo que había sido programado.

La inteligencia artificial generativa cambia esa relación.

Por primera vez, una parte del sistema no se limita a ejecutar reglas escritas por humanos. Una parte del sistema interpreta lenguaje natural, razona de forma aproximada, genera texto, resume documentos, escribe código, usa herramientas, clasifica información, transforma datos y puede participar en flujos de trabajo que antes exigían intervención humana directa.

Eso no significa que el software tradicional desaparezca.

Significa que aparece una nueva capa.

Una capa probabilística.  
Una capa lingüística.  
Una capa capaz de trabajar con ambigüedad.  
Una capa capaz de conectar interfaces, documentos, datos y acciones.  
Una capa que, bien diseñada, puede multiplicar la capacidad de un sistema.  
Y mal diseñada, puede multiplicar sus errores.

Este libro trata sobre esa nueva capa.

No desde la fantasía.

Desde la ingeniería.

---

## Qué promete este libro

Este libro no intenta enseñarte a coleccionar herramientas.

Tampoco intenta convencerte de que un prompt brillante sustituye arquitectura.

La promesa es más concreta:

> Aprender a pasar de usar IA a construir sistemas de IA completos.

Eso significa estudiar:

- cómo funciona el modelo lo suficiente para no tratarlo como caja negra;
- cómo construir contexto;
- cómo diseñar workflows;
- cómo conectar tools sin perder control;
- cómo evaluar calidad;
- cómo observar fallos;
- cómo limitar coste;
- cómo gestionar permisos;
- cómo publicar y revertir;
- cómo mejorar con datos reales.

El lector objetivo no es solo quien quiere "probar IA".

Es quien quiere construir algo que aguante usuarios, errores, cambios de modelo, documentos imperfectos, costes, latencia, seguridad y mantenimiento.

### Lo que este libro no es

No es una lista de prompts mágicos.

No es una recopilación de noticias.

No es un curso de moda sobre la herramienta de la semana.

No es una guía para hacer demos vistosas sin operación.

Cada vez que una técnica aparece en el libro, la pregunta de fondo será:

```text
¿Cómo encaja esto en un sistema real?
```

Y cada vez que una demo parezca suficiente, volveremos a las mismas preguntas:

- ¿qué problema resuelve?;
- ¿qué contexto usa?;
- ¿qué puede hacer?;
- ¿qué no debe hacer?;
- ¿cómo sabemos que funciona?;
- ¿qué cuesta?;
- ¿cómo falla?;
- ¿quién lo revisa?;
- ¿cómo se apaga o revierte?

---

## 1. La IA no sustituye al software: lo reconfigura

Uno de los errores más frecuentes al hablar de IA generativa es imaginar que los modelos sustituyen al software.

No es así.

Los LLMs no sustituyen a las bases de datos.  
No sustituyen a las APIs.  
No sustituyen a la seguridad.  
No sustituyen al control de versiones.  
No sustituyen a los tests.  
No sustituyen a la observabilidad.  
No sustituyen al diseño de producto.  
No sustituyen a la responsabilidad técnica.

Lo que hacen es introducir una nueva capacidad dentro del sistema.

Esa capacidad permite que el software entienda instrucciones humanas, trabaje con documentos no estructurados, genere respuestas adaptadas al contexto y use herramientas para realizar tareas.

Pero alrededor del modelo sigue haciendo falta ingeniería clásica.

De hecho, hace falta más.

Porque ahora hay que diseñar sistemas donde conviven componentes deterministas y componentes probabilísticos.

Un endpoint REST falla de una manera.  
Un modelo de lenguaje falla de otra.  

Un endpoint suele devolver un error explícito.  
Un modelo puede devolver una respuesta convincente pero falsa.  

Una función mal escrita rompe un test.  
Un prompt mal diseñado puede funcionar diez veces y fallar a la undécima.  

Un bug tradicional puede reproducirse.  
Un fallo de IA puede depender del contexto, del orden de mensajes, del modelo, de la temperatura, del proveedor, de la versión y de la recuperación documental.

Por eso construir con IA no es más fácil que construir software tradicional.

Es distinto.

Y exige nuevos patrones.

---

## 2. De la aplicación clásica a la aplicación aumentada por IA

Una aplicación clásica suele tener esta estructura simplificada:

```text
Usuario → Interfaz → Backend → Base de datos → Respuesta
```

Una aplicación con IA introduce nuevas piezas:

```text
Usuario
  ↓
Interfaz
  ↓
Backend
  ↓
Construcción de contexto
  ↓
Modelo de lenguaje
  ↓
Herramientas / RAG / memoria
  ↓
Evaluación / validación
  ↓
Respuesta
```

En algunos casos, el modelo solo redacta mejor una respuesta.

En otros, decide qué herramienta usar.

En otros, consulta documentos.

En otros, genera código.

En otros, clasifica urgencias.

En otros, transforma emails en tareas.

En otros, conversa por voz.

En otros, actúa como copiloto interno de una empresa.

Cuanto más cerca está la IA de una acción real, más importante es el diseño del sistema.

No es lo mismo usar un modelo para resumir un texto que usarlo para enviar emails, modificar una base de datos, generar un informe médico, responder a ciudadanos, analizar contratos o ejecutar comandos en un repositorio.

La arquitectura debe adaptarse al riesgo.

---

## 3. El nuevo mapa: LLMs, RAG, agentes, tools y modelos locales

Para construir con IA hace falta entender varias piezas que se suelen mezclar.

### LLMs

Son los modelos de lenguaje grandes. Generan texto, interpretan instrucciones, razonan de forma aproximada y permiten construir interfaces conversacionales.

Pero un LLM por sí solo no conoce tus documentos internos, no sabe qué ha ocurrido después de su entrenamiento y no debería tener permiso directo para actuar sin control.

### RAG

RAG significa *Retrieval-Augmented Generation*.

Es una técnica para que el modelo responda usando información recuperada desde documentos, bases de datos, páginas web, manuales, expedientes, contratos, PDFs o cualquier fuente externa.

RAG intenta resolver un problema básico:

> El modelo no debe inventar lo que puede recuperar.

Pero RAG tampoco es magia.

Si recuperas mal, respondes mal.  
Si partes mal los documentos, respondes mal.  
Si no citas fuentes, pierdes confianza.  
Si metes contexto irrelevante, degradas la respuesta.  
Si los documentos están obsoletos, el sistema puede parecer correcto y estar equivocado.

### Agentes

Un agente es un sistema donde el modelo no solo responde, sino que puede decidir pasos, usar herramientas, observar resultados y continuar.

Un agente puede:

- buscar información;
- consultar una base de datos;
- leer archivos;
- navegar;
- llamar APIs;
- crear issues;
- modificar código;
- generar documentos;
- ejecutar workflows.

Pero cuanto más autónomo es un agente, más riesgo introduce.

La pregunta importante no es solo:

> ¿Puede un agente hacerlo?

La pregunta importante es:

> ¿Debe un agente hacerlo sin supervisión?

### Tool calling

El *tool calling* permite que un modelo use funciones definidas por el desarrollador.

El modelo no ejecuta magia. El sistema le ofrece herramientas con esquemas claros, parámetros validados y límites.

Ejemplo conceptual:

```json
{
  "tool": "buscar_documentos",
  "arguments": {
    "consulta": "política de privacidad",
    "limite": 5
  }
}
```

El modelo decide que necesita buscar documentos, pero el backend controla qué herramienta existe, qué parámetros acepta, qué permisos tiene y qué resultado recibe.

### MCP

MCP, o *Model Context Protocol*, es una forma estandarizada de conectar modelos y agentes con herramientas externas: archivos, bases de datos, GitHub, navegadores, CRMs, documentación, sistemas internos y otros servicios.

Su importancia no está solo en la tecnología.

Está en la dirección que marca:

> Los modelos no vivirán aislados. Vivirán conectados a herramientas.

### Modelos locales

Los modelos locales permiten ejecutar IA en tu propio hardware.

Esto importa por privacidad, coste, independencia, latencia y control.

Pero también introduce límites: memoria, velocidad, cuantización, mantenimiento, compatibilidad y calidad.

No todo debe ser local.

No todo debe ser cloud.

La ingeniería real está en saber cuándo usar cada cosa.

---

## 4. Por qué las demos engañan

La IA generativa es especialmente buena creando demos.

Una demo puede parecer increíble con pocos datos, pocos usuarios y pocos casos límite.

Un chatbot responde bien a cinco preguntas.  
Un RAG encuentra información en tres PDFs.  
Un agente crea una tarea de prueba.  
Un asistente de código genera una pantalla bonita.  
Un modelo local responde con aparente fluidez.  

Pero producción es otra cosa.

En producción aparecen:

- usuarios que escriben mal;
- preguntas ambiguas;
- documentos duplicados;
- PDFs escaneados;
- tablas mal extraídas;
- permisos;
- datos sensibles;
- costes crecientes;
- latencia;
- errores de proveedor;
- versiones de modelos;
- prompts que cambian;
- ataques de prompt injection;
- agentes que hacen demasiados pasos;
- respuestas imposibles de auditar;
- clientes que necesitan garantías.

Por eso una de las ideas centrales de este libro es:

> La demo es el principio, no el final.

La parte difícil no es conseguir que algo funcione una vez.

La parte difícil es conseguir que funcione suficientemente bien muchas veces, con usuarios reales, datos reales, errores reales y costes reales.

---

## 5. La arquitectura importa más que el modelo

El ecosistema de IA tiende a obsesionarse con modelos.

Qué modelo es mejor.  
Qué modelo razona más.  
Qué modelo programa mejor.  
Qué modelo tiene más contexto.  
Qué modelo es más barato.  
Qué modelo gana un benchmark.  

Todo eso importa.

Pero para muchas aplicaciones, la diferencia entre un producto útil y un producto frágil no está solo en el modelo.

Está en la arquitectura.

Un sistema con un modelo excelente y mala recuperación documental puede fallar.

Un sistema con un modelo mediano y buen contexto puede funcionar sorprendentemente bien.

Un modelo potente sin evaluación puede generar confianza falsa.

Un modelo local bien delimitado puede ser suficiente para muchas tareas internas.

Un sistema multi-modelo puede enrutar tareas según coste, privacidad y calidad.

La pregunta correcta no es:

> ¿Cuál es el mejor modelo?

La pregunta correcta es:

> ¿Cuál es la mejor arquitectura para este problema, con estos datos, estos usuarios, estos riesgos y este presupuesto?

---

## 6. El contexto es el nuevo backend

En una aplicación tradicional, el backend organiza la lógica de negocio.

En una aplicación con IA, además, el backend debe organizar el contexto.

Esto incluye:

- instrucciones del sistema;
- perfil del usuario;
- historial conversacional;
- documentos recuperados;
- resultados de herramientas;
- memoria;
- políticas de seguridad;
- formato esperado;
- ejemplos;
- restricciones;
- criterios de evaluación.

Construir contexto es una tarea de ingeniería.

No consiste en meter todo en el prompt.

Consiste en seleccionar lo necesario, ordenarlo bien, limitarlo, validarlo y actualizarlo.

Un mal contexto produce malas respuestas.

Un contexto excesivo produce ruido.

Un contexto insuficiente produce invención.

Un contexto desactualizado produce errores silenciosos.

Por eso el *context engineering* se está volviendo tan importante como el *prompt engineering*.

---

## 7. RAG no es una funcionalidad: es un sistema

Muchas empresas creen que “poner RAG” significa conectar una base vectorial y hacer preguntas a documentos.

En realidad, RAG es un sistema completo.

Incluye:

1. Selección de fuentes.
2. Ingesta documental.
3. Extracción de texto.
4. Limpieza.
5. Segmentación.
6. Embeddings.
7. Almacenamiento vectorial.
8. Búsqueda.
9. Filtrado.
10. Reranking.
11. Construcción de contexto.
12. Generación de respuesta.
13. Citado de fuentes.
14. Evaluación.
15. Monitorización.
16. Actualización documental.

Cada fase puede fallar.

Si el PDF se extrae mal, el embedding será malo.  
Si el chunking es malo, la recuperación será mala.  
Si la búsqueda recupera ruido, el modelo responderá peor.  
Si no hay citas, el usuario no puede confiar.  
Si no hay evaluación, nadie sabe si el sistema mejora o empeora.

Por eso este libro dedica una parte amplia a RAG.

No porque sea una moda.

Sino porque es una de las piezas más importantes para llevar LLMs a entornos reales.

---

## 8. Agentes: poderosos, pero no mágicos

Los agentes son una de las áreas más prometedoras y más peligrosas de la IA aplicada.

Un agente puede convertir un modelo en un operador de software.

Puede usar herramientas, consultar datos, ejecutar pasos y adaptarse.

Pero también puede:

- entrar en bucles;
- gastar tokens sin control;
- usar herramientas equivocadas;
- interpretar mal una instrucción;
- modificar algo que no debía;
- crear resultados imposibles de auditar;
- depender demasiado de un proveedor;
- fallar silenciosamente.

La conclusión práctica es sencilla:

> Los agentes necesitan límites.

Límites de permisos.  
Límites de herramientas.  
Límites de pasos.  
Límites de coste.  
Límites de tiempo.  
Límites de datos.  
Límites de autonomía.

Y, en muchos casos, necesitan humanos en el loop.

No porque la IA sea inútil.

Sino porque la ingeniería responsable exige controlar el riesgo.

---

## 9. Modelos locales y soberanía práctica

Ejecutar modelos en local no es solo una cuestión técnica.

También es una cuestión estratégica.

Para una empresa pequeña, un despacho, una clínica, una administración local o un profesional que trabaja con documentos sensibles, enviar todo a una API externa puede no ser aceptable.

La IA local ofrece ventajas:

- más privacidad;
- costes más predecibles;
- independencia de proveedores;
- posibilidad de funcionar offline;
- control sobre datos;
- experimentación sin coste por token.

Pero también exige realismo.

Un modelo local pequeño no hará lo mismo que el mejor modelo cloud.  
Un Mac mini no sustituye a un clúster de GPUs.  
Una cuantización agresiva puede degradar calidad.  
La inferencia local puede ser lenta.  
El mantenimiento existe.  
El hardware envejece.

La clave no es defender local contra cloud.

La clave es diseñar arquitecturas híbridas inteligentes.

Por ejemplo:

- modelo local para clasificación y tareas simples;
- API potente para razonamiento complejo;
- RAG local para documentos sensibles;
- cloud para tareas no sensibles;
- fallback entre modelos;
- routing por coste y riesgo.

Esa combinación es mucho más realista que las posturas absolutas.

---

## 10. IA para PYMEs: menos humo, más utilidad

Una parte importante de este libro está pensada desde una pregunta muy concreta:

> ¿Qué puede hacer realmente la IA por una PYME?

No en teoría.

No en una presentación.

No en un informe de consultora.

Sino en el día a día.

Una PYME no necesita necesariamente un modelo entrenado a medida.

Puede necesitar:

- responder mejor emails;
- ordenar documentos;
- extraer información de facturas;
- consultar normativa;
- atender preguntas frecuentes;
- resumir llamadas;
- generar presupuestos;
- buscar en contratos;
- automatizar tareas repetitivas;
- crear contenido;
- mejorar soporte;
- reducir tiempo administrativo.

Pero para que eso funcione hace falta entender procesos.

La IA no se implanta en abstracto.

Se implanta sobre tareas concretas.

Por eso el libro incluye AI Assessment, automatización empresarial, pricing, ROI, riesgos y mantenimiento.

Porque construir con IA también implica saber elegir problemas.

Un mal caso de uso puede hacer fracasar una buena tecnología.

---

## 11. Producción: la palabra que separa el juego del producto

Un sistema IA en producción necesita mucho más que un prompt.

Necesita:

- despliegue fiable;
- control de versiones;
- observabilidad;
- logs;
- trazas;
- métricas;
- evaluación;
- control de costes;
- seguridad;
- privacidad;
- backups;
- gestión de errores;
- fallback;
- documentación;
- mantenimiento.

Esto puede sonar menos espectacular que hablar de agentes autónomos.

Pero es lo que convierte una idea en producto.

La mayoría de sistemas IA no fallan porque el modelo sea incapaz.

Fallan porque alrededor del modelo no hay suficiente ingeniería.

---

## 12. Cómo está organizado este libro

El libro está dividido en partes que siguen un recorrido progresivo.

Primero construimos el mapa mental: qué significa crear software con IA y qué piezas componen este nuevo stack.

Después entramos en LLMs, modelos propietarios, modelos locales y hardware.

Luego estudiamos prompt engineering, context engineering y desarrollo AI-native.

A continuación entramos en RAG, chatbots, agentes, MCP, voz, multimodalidad y edge AI.

Después bajamos a empresa: PYMEs, automatización, AI Assessment, laboratorios de implementación real y productos inspirados en casos prácticos.

Finalmente tratamos producción, seguridad, privacidad, evaluación, costes, carrera profesional, negocio y actualización continua.

La intención no es que memorices herramientas.

La intención es que aprendas a pensar como constructor de sistemas IA.

---

## 13. Cómo usar este libro en GitHub

Este libro está pensado para vivir como repositorio.

La estructura recomendada incluye:

```text
construir-con-ia/
├── README.md
├── CHANGELOG.md
├── ROADMAP.md
├── book.toml
├── src/
│   ├── SUMMARY.md
│   ├── 00-prefacio.md
│   ├── 01-introduccion.md
│   └── ...
├── examples/
├── templates/
├── tables/
├── assets/
└── scripts/
```

Cada capítulo puede evolucionar.

Cada tabla puede actualizarse.

Cada ejemplo puede mejorar.

Cada patrón puede ser revisado.

Cada versión puede documentar sus cambios.

La IA cambia demasiado rápido para escribir este libro como una fotografía fija.

Debe funcionar como un producto vivo.

---

## 14. Qué deberías llevarte de esta introducción

Si solo recuerdas unas cuantas ideas, que sean estas:

1. La IA no elimina la ingeniería: la hace más importante.
2. Un LLM no es un producto; es una pieza dentro de un sistema.
3. Los prompts importan, pero el contexto y la arquitectura importan más.
4. RAG no es una función; es un pipeline completo.
5. Los agentes necesitan límites, permisos y observabilidad.
6. Los modelos locales son estratégicos, pero no siempre suficientes.
7. Las demos engañan si no se prueban con datos y usuarios reales.
8. La producción exige evaluación, seguridad, privacidad y costes controlados.
9. Las PYMEs necesitan soluciones concretas, no discursos abstractos.
10. El libro debe evolucionar como evoluciona el ecosistema.

---

## 15. El punto de partida

Construir con IA no consiste en esperar a que aparezca el modelo perfecto.

Consiste en aprender a combinar las piezas disponibles de forma útil.

Modelos.  
Prompts.  
Contexto.  
Documentos.  
Herramientas.  
Memoria.  
Hardware.  
APIs.  
Bases de datos.  
Interfaces.  
Evaluación.  
Seguridad.  
Producto.  
Negocio.

Ese es el nuevo trabajo.

Y este libro empieza ahí.
