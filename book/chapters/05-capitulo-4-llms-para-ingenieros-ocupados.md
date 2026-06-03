---
title: "Capítulo 4 — LLMs para ingenieros ocupados"
chapter: "05"
part: "Parte II — Fundamentos prácticos de LLMs"
version: "0.1"
last_updated: "2026-06-02"
status: "estable"
level: "básico-intermedio"
estimated_reading_time: "30 minutos"
---

# Capítulo 4 — LLMs para ingenieros ocupados

Un ingeniero no necesita saber entrenar un modelo fundacional desde cero para construir buenos sistemas con IA.

Pero sí necesita entender cómo se comporta un LLM.

No como investigador.

Como constructor.

Necesita saber por qué un modelo responde de una forma y no de otra.  
Por qué a veces inventa.  
Por qué el contexto importa tanto.  
Por qué una respuesta puede cambiar si cambia el orden de los mensajes.  
Por qué los tokens cuestan dinero.  
Por qué una ventana de contexto grande no soluciona todos los problemas.  
Por qué un modelo local puede ser suficiente para unas tareas y malo para otras.  
Por qué una aplicación con IA necesita evaluación.

Este capítulo explica los conceptos mínimos que un ingeniero debería dominar antes de diseñar productos con LLMs.

No vamos a entrar en matemáticas profundas.

Vamos a construir intuición técnica.

---

## 4.1 Qué es un LLM en términos prácticos

Un LLM, o *Large Language Model*, es un modelo entrenado para procesar y generar lenguaje.

Desde el punto de vista de un ingeniero que construye aplicaciones, puedes pensar en un LLM como un componente que recibe contexto y genera una continuación probable.

Ese contexto puede incluir:

- instrucciones del sistema;
- mensajes del usuario;
- historial conversacional;
- documentos recuperados;
- resultados de herramientas;
- ejemplos;
- restricciones;
- formato esperado.

El modelo no “consulta una base de datos interna” como lo haría una aplicación clásica.

Genera una salida basándose en patrones aprendidos durante entrenamiento y en la información que recibe en el contexto actual.

Por eso, en una aplicación real, la calidad de la salida depende de dos cosas:

1. La capacidad del modelo.
2. La calidad del contexto que le das.

Un buen modelo con mal contexto puede fallar.

Un modelo mediano con buen contexto puede resolver muchas tareas útiles.

---

## 4.2 Un LLM no es una función tradicional

En programación clásica, una función debería ser predecible.

```python
def sumar(a, b):
    return a + b
```

Si llamas a `sumar(2, 3)`, esperas siempre `5`.

Un LLM no funciona así.

Le das una entrada y genera una respuesta probable. Esa respuesta puede variar por muchos factores:

- modelo usado;
- versión del modelo;
- temperatura;
- parámetros de sampling;
- contexto previo;
- longitud de la conversación;
- orden de instrucciones;
- formato de los documentos;
- idioma;
- ambigüedad de la pregunta;
- herramientas disponibles;
- políticas del proveedor.

Esto no significa que sea imposible construir sistemas fiables con LLMs.

Significa que no debes tratarlos como funciones puras.

Debes tratarlos como componentes probabilísticos que necesitan:

- límites;
- validación;
- evaluación;
- observabilidad;
- recuperación de fuentes;
- fallback;
- control de costes;
- revisión humana en tareas sensibles.

---

## 4.3 Tokens

Los modelos no procesan texto exactamente como nosotros.

Procesan tokens.

Un token puede ser una palabra, parte de una palabra, un signo de puntuación o una combinación de caracteres.

Ejemplo aproximado:

```text
"Construir con IA es diferente"
```

Podría dividirse en algo parecido a:

```text
["Constru", "ir", " con", " IA", " es", " diferente"]
```

La división real depende del tokenizer del modelo.

Los tokens importan por tres motivos:

### 1. Límite de contexto

Cada modelo tiene una cantidad máxima de tokens que puede procesar en una conversación o llamada.

### 2. Coste

En modelos cloud, normalmente pagas por tokens de entrada y tokens de salida.

### 3. Latencia

Cuantos más tokens procesas y generas, más puede tardar la respuesta.

Por eso, en producción, los tokens son una unidad técnica y económica.

No son un detalle.

---

## 4.4 Tokens de entrada y tokens de salida

Cuando llamas a un modelo, suele haber dos grandes grupos de tokens:

### Tokens de entrada

Son los tokens que envías al modelo:

- system prompt;
- instrucciones;
- mensajes anteriores;
- pregunta del usuario;
- documentos RAG;
- resultados de herramientas;
- ejemplos;
- formato esperado.

### Tokens de salida

Son los tokens que genera el modelo como respuesta.

Ambos cuentan.

Un error típico en aplicaciones RAG es meter demasiado contexto en cada llamada.

Por ejemplo:

```text
System prompt largo
+ historial completo
+ 20 chunks de documentos
+ instrucciones de formato
+ pregunta del usuario
```

Eso puede mejorar alguna respuesta puntual, pero también puede aumentar coste, latencia y ruido.

Más contexto no siempre significa mejor resultado.

El contexto debe seleccionarse.

---

## 4.5 Ventana de contexto

La ventana de contexto es la cantidad máxima de tokens que el modelo puede tener en cuenta en una llamada.

Una ventana grande permite enviar más información.

Pero hay tres trampas.

### Trampa 1: contexto grande no equivale a buena comprensión

Un modelo puede aceptar muchos tokens y aun así perder detalles, ignorar partes importantes o confundirse con información contradictoria.

### Trampa 2: contexto grande cuesta más

Enviar mucho texto aumenta coste y latencia.

### Trampa 3: contexto grande puede introducir ruido

Si metes documentos irrelevantes, el modelo puede usarlos mal.

Una ventana de contexto grande es útil, pero no sustituye una buena recuperación, una buena selección de información ni una buena arquitectura.

El objetivo no es llenar el contexto.

El objetivo es darle al modelo lo necesario.

---

## 4.6 Prompt

Un prompt es la entrada textual que guía al modelo.

En aplicaciones modernas, el prompt no suele ser un único bloque.

Suele estar compuesto por varias partes:

```text
System instructions
Developer instructions
User message
Retrieved context
Tool results
Output format
Examples
```

Un buen prompt debe aclarar:

- rol;
- objetivo;
- contexto;
- límites;
- formato;
- criterios de calidad;
- comportamiento ante incertidumbre;
- restricciones de seguridad.

Ejemplo simple:

```text
Eres un asistente técnico.
Responde solo con información basada en las fuentes proporcionadas.
Si no hay suficiente información, di que no lo sabes.
Incluye citas a las fuentes usadas.
Devuelve la respuesta en Markdown.
```

Esto es mucho mejor que:

```text
Responde bien.
```

Pero el prompt, por sí solo, no arregla un sistema mal diseñado.

---

## 4.7 System prompt

El *system prompt* define instrucciones de alto nivel.

Suele usarse para establecer:

- identidad del asistente;
- tono;
- límites;
- reglas de seguridad;
- formato general;
- prioridad de instrucciones.

Ejemplo:

```text
Eres un asistente de soporte interno.
Tu objetivo es ayudar a empleados a encontrar información en la documentación.
No inventes respuestas.
Si la documentación no contiene la respuesta, indícalo claramente.
No reveles información de documentos no autorizados.
```

El system prompt es importante, pero no debe contenerlo todo.

Si se vuelve enorme, puede ser difícil de mantener.

Una buena práctica es separar:

- instrucciones globales;
- instrucciones por tarea;
- contexto recuperado;
- políticas;
- ejemplos.

Y versionarlo.

---

## 4.8 Temperatura

La temperatura controla, de forma simplificada, cuánta variabilidad permite el modelo al generar.

Temperatura baja:

- respuestas más deterministas;
- menos creatividad;
- útil para extracción, clasificación, respuestas estructuradas.

Temperatura alta:

- respuestas más variadas;
- más creatividad;
- útil para brainstorming, escritura creativa o generación de ideas.

Regla práctica:

```text
Tareas de precisión → temperatura baja
Tareas creativas → temperatura más alta
```

Ejemplos:

- Extraer fecha de una factura: baja.
- Clasificar ticket: baja.
- Responder con cita documental: baja.
- Escribir ideas de marketing: media.
- Crear nombres de producto: media-alta.
- Generar relatos: alta.

En producción, conviene ser conservador.

La creatividad no siempre es una virtud.

---

## 4.9 Sampling y parámetros de generación

Además de la temperatura, muchos modelos permiten configurar otros parámetros:

- `top_p`;
- `top_k`;
- `max_tokens`;
- penalizaciones de repetición;
- stop sequences;
- seed;
- reasoning budget en algunos modelos;
- formato estructurado;
- tool choice.

No hace falta obsesionarse al principio.

Pero sí conviene entender tres ideas:

### 1. `max_tokens`

Limita la longitud de la respuesta.

Si es demasiado bajo, la respuesta se corta.

Si es demasiado alto, puedes gastar más de lo necesario.

### 2. Stop sequences

Permiten detener la generación cuando aparece una secuencia concreta.

Útil para integraciones controladas.

### 3. Formato estructurado

Algunos modelos permiten forzar JSON u otros formatos.

Esto es muy útil para integrar LLMs en pipelines.

Siempre que puedas, prefiere salidas estructuradas para tareas de backend.

---

## 4.10 Embeddings

Un embedding es una representación numérica de un texto.

Textos con significado parecido deberían tener vectores cercanos en el espacio de embeddings.

Ejemplo conceptual:

```text
"contrato de alquiler"
"arrendamiento de vivienda"
```

Deberían estar relativamente cerca.

Los embeddings son fundamentales para RAG y búsqueda semántica.

Flujo típico:

```text
documento → chunks → embeddings → vector database
consulta del usuario → embedding → búsqueda de chunks similares
```

Los embeddings no generan respuestas.

Sirven para encontrar información relevante.

Después, un LLM puede usar esa información para redactar la respuesta.

---

## 4.11 Bases vectoriales

Una base vectorial almacena embeddings y permite buscar vectores similares.

Herramientas habituales:

- pgvector;
- Qdrant;
- Chroma;
- Weaviate;
- FAISS;
- Milvus;
- Pinecone.

En un sistema RAG, la base vectorial permite encontrar fragmentos de documentos relacionados con la pregunta del usuario.

Pero una base vectorial no entiende documentos como un humano.

Busca similitud.

Eso puede fallar cuando:

- la pregunta usa términos distintos;
- hay documentos duplicados;
- hay información obsoleta;
- los chunks están mal cortados;
- el embedding no captura bien el dominio;
- se necesita precisión exacta;
- las palabras clave importan más que la similitud semántica.

Por eso muchas arquitecturas combinan búsqueda vectorial con búsqueda léxica, filtros y reranking.

---

## 4.12 Reranking

El reranking es una segunda fase de ordenación.

Primero recuperas varios candidatos.

Luego un modelo o algoritmo más preciso reordena esos candidatos según relevancia.

Flujo:

```text
consulta → recuperación inicial → 20 chunks candidatos → reranker → top 5 chunks → LLM
```

Esto suele mejorar mucho la calidad de RAG.

La búsqueda inicial puede ser rápida y amplia.

El reranker puede ser más caro pero se aplica a pocos documentos.

En sistemas reales, reranking es una de las diferencias entre una demo RAG y un RAG más serio.

---

## 4.13 Alucinaciones

Una alucinación ocurre cuando el modelo genera información falsa, inventada o no justificada con apariencia de seguridad.

Ejemplo:

> Según el documento, la cláusula 7 establece una penalización del 15 %.

Si el documento no dice eso, el modelo ha inventado.

Las alucinaciones pueden surgir por:

- falta de información;
- contexto ambiguo;
- instrucciones malas;
- presión para responder;
- documentos irrelevantes;
- errores de recuperación;
- exceso de confianza del modelo;
- preguntas mal formuladas;
- mezcla de conocimiento general y fuentes específicas.

Reducir alucinaciones requiere varias estrategias:

- pedir citas;
- permitir “no lo sé”;
- limitar respuesta a fuentes;
- mejorar RAG;
- usar validación;
- evaluar respuestas;
- evitar preguntas demasiado abiertas en contextos sensibles;
- usar humanos en el loop.

No existe una solución única.

---

## 4.14 “No lo sé” es una funcionalidad

En sistemas de IA, enseñar al modelo a decir “no lo sé” es fundamental.

Muchos productos fallan porque intentan responder siempre.

Un sistema serio debe poder decir:

- no hay información suficiente;
- las fuentes no contienen la respuesta;
- la pregunta está fuera de alcance;
- necesito una aclaración;
- esto requiere revisión humana;
- no tengo permisos para acceder a esos datos.

Esto no reduce valor.

Aumenta confianza.

Un asistente que reconoce límites es más útil que uno que inventa con seguridad.

---

## 4.15 Memoria

La memoria en sistemas LLM puede significar varias cosas.

### Memoria de conversación

El historial de mensajes dentro de una sesión.

### Memoria de usuario

Preferencias, datos o información persistente sobre un usuario.

### Memoria de sistema

Información acumulada por la aplicación: tareas, acciones, decisiones, feedback.

### Memoria semántica

Información guardada en una base vectorial para recuperarse cuando sea relevante.

La memoria es poderosa, pero delicada.

Riesgos:

- guardar información innecesaria;
- mezclar usuarios;
- usar datos obsoletos;
- introducir sesgos;
- violar privacidad;
- aumentar coste;
- degradar respuestas con contexto irrelevante.

La memoria debe diseñarse, no improvisarse.

---

## 4.16 Context engineering

El *prompt engineering* se centra en cómo pedir.

El *context engineering* se centra en qué información dar al modelo y cómo organizarla.

Incluye:

- selección del historial;
- recuperación de documentos;
- resultados de herramientas;
- perfil del usuario;
- reglas de negocio;
- formato esperado;
- instrucciones de seguridad;
- límites de tarea.

El contexto es el verdadero combustible del modelo.

Una aplicación avanzada no solo manda prompts.

Construye contexto dinámico.

Ejemplo:

```text
System prompt
+ perfil del usuario
+ pregunta actual
+ intención detectada
+ documentos relevantes
+ resultados de tools
+ instrucciones de salida
```

La calidad del contexto suele importar más que la longitud.

---

## 4.17 Tool calling

Tool calling permite que el modelo solicite el uso de funciones externas.

El modelo no debería tener acceso libre al mundo.

El sistema le ofrece herramientas concretas.

Ejemplo:

```json
{
  "name": "buscar_cliente",
  "description": "Busca información básica de un cliente por ID",
  "parameters": {
    "type": "object",
    "properties": {
      "cliente_id": {
        "type": "string"
      }
    },
    "required": ["cliente_id"]
  }
}
```

El modelo puede pedir usar esa herramienta.

Pero el backend debe:

- validar parámetros;
- comprobar permisos;
- ejecutar la función;
- registrar la acción;
- devolver el resultado;
- decidir si necesita confirmación humana.

Tool calling convierte al modelo en una capa de decisión lingüística, pero no elimina la responsabilidad del sistema.

---

## 4.18 Agentes

Un agente es un sistema donde el modelo puede planificar, usar herramientas, observar resultados y continuar.

Flujo simple:

```text
objetivo
  ↓
razonamiento
  ↓
tool call
  ↓
observación
  ↓
nuevo razonamiento
  ↓
respuesta o acción
```

Los agentes son útiles cuando la tarea requiere varios pasos.

Pero también introducen riesgo.

Errores típicos:

- loops infinitos;
- demasiadas llamadas;
- herramientas equivocadas;
- mala interpretación de resultados;
- costes altos;
- acciones no deseadas;
- dificultad de auditoría.

Un buen agente necesita:

- herramientas limitadas;
- instrucciones claras;
- presupuesto de pasos;
- control de costes;
- logs;
- validación;
- permisos;
- posibilidad de parar;
- humano en el loop cuando proceda.

---

## 4.19 Multimodalidad

Los modelos multimodales pueden trabajar con más de un tipo de entrada o salida.

Por ejemplo:

- texto;
- imagen;
- audio;
- vídeo;
- documentos visuales;
- capturas de pantalla.

Esto permite casos como:

- analizar una factura escaneada;
- describir una imagen;
- interpretar una interfaz;
- leer una gráfica;
- convertir voz en texto;
- responder por voz;
- analizar una captura de error.

La multimodalidad amplía mucho el espacio de productos IA.

Pero también amplía los riesgos.

Una imagen puede interpretarse mal.  
Un audio puede transcribirse mal.  
Un gráfico puede ser ambiguo.  
Un documento escaneado puede perder cifras importantes.

En tareas críticas, la multimodalidad requiere validación.

---

## 4.20 Latencia

La latencia es el tiempo que tarda el sistema en responder.

En IA, la latencia depende de:

- tamaño del modelo;
- proveedor;
- hardware;
- tokens de entrada;
- tokens de salida;
- RAG;
- reranking;
- tool calls;
- red;
- carga del servidor;
- streaming;
- número de pasos del agente.

Un sistema puede ser técnicamente correcto y fracasar por lento.

Distintos casos toleran distinta latencia:

- autocompletado: muy baja;
- chat de soporte: baja-media;
- análisis documental: media-alta;
- generación de informe largo: alta aceptable;
- proceso batch: menos crítica.

Diseñar con IA implica decidir qué latencia es aceptable para cada flujo.

---

## 4.21 Streaming

El streaming permite mostrar la respuesta mientras el modelo la genera.

Esto no siempre reduce el tiempo total, pero mejora la percepción.

En interfaces conversacionales, streaming suele ser recomendable.

El usuario empieza a leer antes.

Pero en tareas estructuradas, puede no convenir.

Por ejemplo, si necesitas validar un JSON completo antes de mostrarlo, quizá prefieras esperar a la respuesta final.

Streaming es una decisión de UX y arquitectura.

---

## 4.22 Coste

El coste de un sistema LLM puede venir de varias partes:

- tokens de entrada;
- tokens de salida;
- embeddings;
- reranking;
- llamadas a herramientas;
- almacenamiento;
- vector database;
- servidores;
- observabilidad;
- desarrollo;
- mantenimiento;
- soporte;
- hardware local.

En modelos cloud, el coste variable puede crecer con el uso.

En modelos locales, el coste inicial puede ser mayor, pero el coste marginal por llamada puede ser bajo.

No hay una respuesta universal.

Preguntas prácticas:

- ¿cuántos usuarios habrá?
- ¿cuántas consultas por usuario?
- ¿cuántos tokens por consulta?
- ¿cuánto contexto RAG se envía?
- ¿qué modelo se usa?
- ¿hay caché?
- ¿hay tareas batch?
- ¿hay modelos locales para tareas simples?
- ¿qué coste por resultado es aceptable?

El coste debe diseñarse desde el principio.

---

## 4.23 Privacidad

La privacidad es uno de los grandes temas en aplicaciones IA.

Preguntas necesarias:

- ¿qué datos se envían al modelo?
- ¿a qué proveedor?
- ¿en qué país se procesan?
- ¿se usan para entrenamiento?
- ¿hay datos personales?
- ¿hay datos médicos?
- ¿hay datos legales?
- ¿hay secretos empresariales?
- ¿se guardan logs?
- ¿quién puede acceder?
- ¿cuánto tiempo se retienen?

En algunos casos, una API cloud es perfectamente aceptable.

En otros, puede ser inadecuada.

Por eso son importantes las arquitecturas locales o híbridas.

La decisión no debe ser ideológica.

Debe depender del riesgo, regulación, coste y calidad necesaria.

---

## 4.24 Seguridad

La seguridad en LLMs tiene problemas específicos.

Algunos ejemplos:

### Prompt injection

El usuario o un documento intenta manipular instrucciones.

### Data leakage

El sistema revela información que no debería.

### Tool misuse

El modelo usa una herramienta de forma incorrecta o peligrosa.

### Over-permissioning

El agente tiene más permisos de los necesarios.

### Hallucinated authority

El modelo da una respuesta falsa con tono seguro.

### Insecure output handling

La salida del modelo se ejecuta o renderiza sin validación.

La seguridad debe diseñarse en capas:

- validación de entrada;
- separación de instrucciones y datos;
- permisos mínimos;
- revisión humana;
- output validation;
- logs;
- rate limits;
- pruebas adversariales;
- políticas de acceso.

---

## 4.25 Evaluación

Evaluar un LLM no es solo preguntar “¿me gusta la respuesta?”.

Hay que medir según la tarea.

Para extracción:

- exactitud de campos;
- tasa de errores;
- valores faltantes.

Para RAG:

- relevancia de documentos;
- fidelidad a fuentes;
- calidad de citas;
- tasa de alucinación.

Para chatbots:

- resolución;
- satisfacción;
- escalado;
- tiempo de respuesta;
- cobertura.

Para agentes:

- éxito de tarea;
- número de pasos;
- coste;
- acciones erróneas;
- necesidad de intervención humana.

Para código:

- tests pasan;
- calidad;
- seguridad;
- mantenibilidad.

La evaluación es una pieza de ingeniería, no una opinión.

---

## 4.26 Salidas estructuradas

Una de las formas más prácticas de integrar LLMs en software es pedir salidas estructuradas.

Por ejemplo:

```json
{
  "categoria": "facturacion",
  "prioridad": "alta",
  "resumen": "El cliente solicita corrección de una factura duplicada.",
  "requiere_humano": true
}
```

Esto permite usar el modelo dentro de pipelines.

Pero hay que validar.

Aunque el modelo prometa JSON, puede fallar.

Buenas prácticas:

- usar JSON schema cuando el proveedor lo permita;
- validar con Pydantic, Zod u otra librería;
- rechazar salidas inválidas;
- reintentar con límites;
- registrar fallos;
- no ejecutar acciones críticas sin validación.

Una salida estructurada convierte texto en software.

Pero solo si se valida.

---

## 4.27 Modelos pequeños y modelos grandes

No siempre necesitas el modelo más grande.

Modelos pequeños pueden ser útiles para:

- clasificación;
- extracción simple;
- tareas locales;
- routing;
- resumen ligero;
- generación breve;
- edge AI;
- privacidad.

Modelos grandes suelen ser mejores para:

- razonamiento complejo;
- programación avanzada;
- instrucciones largas;
- análisis ambiguo;
- redacción de alta calidad;
- tareas multi-step;
- conversación compleja.

Una arquitectura eficiente puede combinar varios modelos:

```text
modelo pequeño → clasifica intención
modelo mediano → responde tareas normales
modelo grande → casos difíciles
modelo local → datos sensibles
modelo cloud → razonamiento complejo
```

Esto se llama estrategia multi-modelo.

Puede reducir costes y mejorar privacidad.

---

## 4.28 Fine-tuning

Fine-tuning significa ajustar un modelo con datos específicos.

Puede ser útil, pero a menudo se usa como respuesta prematura.

Antes de fine-tuning, pregunta:

- ¿el problema se resuelve con mejor prompt?
- ¿se resuelve con RAG?
- ¿se resuelve con ejemplos?
- ¿se resuelve con salida estructurada?
- ¿se resuelve con reglas deterministas?
- ¿hay datos de entrenamiento suficientes?
- ¿cómo se evaluará?
- ¿quién lo mantendrá?

Fine-tuning suele tener sentido cuando quieres modificar estilo, formato, comportamiento repetido o conocimiento de dominio en tareas muy concretas.

Pero para consultar documentos cambiantes, RAG suele ser mejor.

Regla práctica:

```text
Conocimiento cambiante → RAG
Formato/comportamiento repetido → fine-tuning posible
Tarea simple → prompt + validación
Acción externa → tools/agentes
```

---

## 4.29 Modelos locales frente a modelos cloud

La comparación no debería plantearse como guerra.

Ambos tienen ventajas.

### Cloud

Ventajas:

- mejor calidad general;
- menos mantenimiento;
- multimodalidad avanzada;
- escalabilidad inicial;
- actualizaciones automáticas;
- acceso a modelos frontier.

Desventajas:

- coste variable;
- dependencia de proveedor;
- privacidad;
- rate limits;
- cambios de modelo;
- posible latencia de red.

### Local

Ventajas:

- privacidad;
- control;
- coste marginal bajo;
- offline;
- independencia;
- experimentación;
- despliegue interno.

Desventajas:

- hardware;
- mantenimiento;
- menor calidad en algunos casos;
- velocidad limitada;
- complejidad operativa;
- consumo;
- actualizaciones manuales.

Lo más realista suele ser híbrido.

---

## 4.30 Un LLM dentro de una arquitectura

Una aplicación seria no debería tener esta forma:

```text
usuario → LLM → usuario
```

Sino algo más parecido a:

```text
usuario
  ↓
validación
  ↓
detección de intención
  ↓
selección de contexto
  ↓
RAG / tools / memoria
  ↓
modelo adecuado
  ↓
validación de salida
  ↓
evaluación / logs
  ↓
respuesta
```

La ingeniería está en todo lo que rodea al modelo.

El modelo es potente.

Pero sin arquitectura, es frágil.

---

## 4.31 Ideas clave del capítulo

- Un LLM genera respuestas probables a partir de contexto.
- No debe tratarse como una función determinista.
- Los tokens afectan a contexto, coste y latencia.
- Una ventana de contexto grande no sustituye una buena selección de información.
- El prompt importa, pero el context engineering importa cada vez más.
- Los embeddings permiten búsqueda semántica.
- RAG depende de la calidad de recuperación, no solo del modelo.
- Las alucinaciones se reducen con fuentes, límites, validación y evaluación.
- Tool calling permite conectar modelos con acciones, pero exige permisos y logs.
- Los agentes son útiles, pero necesitan límites.
- Coste, privacidad, seguridad y evaluación deben diseñarse desde el principio.
- Modelos locales y cloud deben combinarse con criterio.

---

## 4.32 Checklist práctica

Antes de usar un LLM en una aplicación, responde:

- ¿Qué tarea concreta hará el modelo?
- ¿Debe generar, clasificar, extraer, resumir, buscar o actuar?
- ¿Qué modelo usarás?
- ¿Por qué ese modelo?
- ¿Cuántos tokens de entrada esperas?
- ¿Cuántos tokens de salida?
- ¿Qué temperatura usarás?
- ¿Necesitas salida estructurada?
- ¿Cómo validarás la salida?
- ¿Necesitas RAG?
- ¿Necesitas embeddings?
- ¿Necesitas herramientas?
- ¿Necesitas memoria?
- ¿Hay datos sensibles?
- ¿Debe ser local, cloud o híbrido?
- ¿Cómo medirás calidad?
- ¿Cómo controlarás coste?
- ¿Qué pasa si el modelo inventa?
- ¿Qué pasa si tarda demasiado?
- ¿Qué pasa si el proveedor falla?
- ¿Quién mantiene prompts y evaluaciones?

---

## 4.33 Qué puede cambiar en el futuro

Este capítulo contiene fundamentos que deberían mantenerse, pero cambiarán detalles importantes:

- aumentarán las ventanas de contexto;
- bajará el coste de inferencia;
- mejorarán los modelos locales;
- las salidas estructuradas serán más fiables;
- los agentes usarán herramientas mejor;
- la multimodalidad será más normal;
- el hardware especializado será más accesible;
- los frameworks abstraerán más complejidad;
- la regulación exigirá más trazabilidad.

Pero una idea seguirá siendo central:

> Un LLM no es un producto. Es un componente dentro de un sistema.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 5 — Cómo elegir un modelo
- Capítulo 6 — Modelos propietarios
- Capítulo 7 — Modelos locales
- Capítulo 8 — Hardware real para IA local
- Capítulo 9 — Prompt engineering que sigue funcionando
- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 24 — Qué es un agente de IA
- Capítulo 46 — Despliegue de sistemas IA
- Capítulo 50 — Evaluación
- Capítulo 51 — Costes
