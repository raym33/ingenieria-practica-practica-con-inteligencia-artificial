---
title: "Capítulo 6 — Modelos propietarios"
chapter: "07"
part: "Parte II — Fundamentos prácticos de LLMs"
version: "0.1"
last_updated: "2026-06-02"
status: "muy cambiante"
level: "básico-intermedio"
estimated_reading_time: "34 minutos"
---

# Capítulo 6 — Modelos propietarios

Los modelos propietarios son una de las piezas más importantes del ecosistema actual de IA generativa.

Son modelos ofrecidos por empresas que controlan su entrenamiento, despliegue, infraestructura, condiciones de uso, API, precios, límites, actualizaciones y roadmap.

Ejemplos habituales de proveedores propietarios son OpenAI, Anthropic, Google, xAI, Mistral en su oferta comercial, Cohere, Perplexity, Microsoft, Amazon, Meta en algunos servicios gestionados y otros proveedores especializados.

Este capítulo no pretende ser una tabla cerrada de modelos.

Eso caducaría demasiado rápido.

La idea es más útil:

> Aprender a evaluar proveedores y modelos propietarios con criterio de ingeniería.

Los nombres concretos cambiarán.  
Las versiones cambiarán.  
Los precios cambiarán.  
Los límites cambiarán.  
Las ventanas de contexto cambiarán.  
Las capacidades multimodales cambiarán.  
Las APIs cambiarán.

Pero los criterios de decisión deberían durar más.

---

## 6.1 Qué entendemos por modelo propietario

En este libro llamaremos modelo propietario a un modelo que se consume principalmente a través de una plataforma controlada por una empresa.

Normalmente:

- no descargas los pesos;
- no controlas el entrenamiento;
- no controlas la infraestructura;
- accedes por API o interfaz web;
- pagas por uso, suscripción o contrato;
- dependes de condiciones de servicio;
- dependes de cambios de versión;
- dependes de límites de uso;
- dependes de disponibilidad del proveedor.

Esto incluye modelos totalmente cerrados y también modelos de empresas que ofrecen una mezcla de modelos cerrados, open weights y servicios gestionados.

La distinción importante no es ideológica.

La distinción importante es operativa:

> ¿Cuánto control tienes sobre el modelo y su ejecución?

En un modelo propietario, el control suele estar en el proveedor.

En un modelo local u open weights desplegado por ti, el control se desplaza hacia tu infraestructura.

---

## 6.2 Por qué usar modelos propietarios

Los modelos propietarios tienen ventajas claras.

### Calidad

Suelen estar entre los modelos más capaces del mercado en razonamiento, programación, multimodalidad, tool calling, escritura y seguimiento de instrucciones.

### Facilidad de uso

No necesitas desplegar infraestructura compleja.

Puedes empezar con una API.

### Velocidad de prototipado

Permiten crear demos, MVPs y productos iniciales rápidamente.

### Multimodalidad

Muchos proveedores propietarios integran texto, imagen, audio, vídeo, documentos y herramientas en una sola plataforma.

### Tool calling

Suelen ofrecer APIs robustas para function calling, structured outputs, agentes, búsqueda, ejecución de código o conexión con herramientas.

### Escalabilidad inicial

El proveedor gestiona la infraestructura.

### Actualizaciones

Recibes mejoras sin tener que entrenar ni desplegar modelos nuevos.

Estas ventajas explican por qué muchos proyectos serios empiezan usando modelos propietarios.

---

## 6.3 Por qué no depender ciegamente de ellos

Las ventajas no eliminan los riesgos.

### Coste variable

Cada llamada puede costar dinero.

El coste crece con usuarios, tokens, contexto, herramientas, reintentos y evaluación.

### Dependencia de proveedor

Si tu producto depende de un modelo concreto, un cambio de precio, política o comportamiento puede afectarte.

### Privacidad

Enviar datos a un tercero no siempre es aceptable.

### Cambios de modelo

El proveedor puede actualizar, retirar o sustituir modelos.

### Límites de uso

Rate limits, cuotas, disponibilidad regional y restricciones de uso pueden condicionar tu arquitectura.

### Menor control

No puedes inspeccionar pesos, cambiar entrenamiento base ni garantizar comportamiento interno.

### Riesgo de acoplamiento

Si usas APIs muy específicas, migrar puede ser difícil.

Usar modelos propietarios no es un problema.

El problema es usarlos sin estrategia.

---

## 6.4 Cuándo tienen sentido

Los modelos propietarios suelen tener mucho sentido cuando:

- necesitas máxima calidad;
- estás prototipando rápido;
- necesitas razonamiento fuerte;
- necesitas multimodalidad avanzada;
- necesitas tool calling fiable;
- no quieres gestionar infraestructura;
- el volumen inicial es bajo o medio;
- el valor por respuesta justifica el coste;
- los datos pueden enviarse al proveedor con garantías;
- necesitas modelos muy recientes;
- necesitas soporte empresarial.

Ejemplos:

- desarrollo asistido con agentes de código;
- análisis complejo de documentos;
- generación de informes de alto valor;
- copilotos internos;
- chatbots con alta calidad de lenguaje;
- tareas multimodales;
- razonamiento multi-step;
- prototipos comerciales;
- investigación aplicada.

---

## 6.5 Cuándo pueden no tener sentido

Pueden no ser la mejor opción cuando:

- los datos son extremadamente sensibles;
- el coste por uso es demasiado alto;
- necesitas ejecución offline;
- necesitas control total;
- necesitas predecibilidad fuerte;
- el volumen de consultas es muy alto;
- la tarea es simple y puede hacerla un modelo pequeño;
- hay restricciones regulatorias;
- quieres evitar dependencia externa;
- el cliente exige instalación on-premise;
- el rendimiento local es suficiente.

Ejemplos:

- RAG privado con documentos confidenciales;
- clasificación simple a gran volumen;
- tareas internas repetitivas;
- asistentes locales para despachos;
- aplicaciones edge;
- sistemas con conectividad limitada;
- productos donde el margen no soporta coste por token alto.

En estos casos, modelos locales o híbridos pueden ser mejores.

---

## 6.6 Categorías de proveedores propietarios

No todos los proveedores compiten igual.

Podemos dividirlos en varias categorías.

### Proveedores frontier generalistas

Ofrecen modelos muy capaces para texto, razonamiento, código, visión y herramientas.

Ejemplos típicos:

- OpenAI;
- Anthropic;
- Google;
- xAI.

### Proveedores europeos o híbridos

Ofrecen modelos comerciales y, en algunos casos, open weights o despliegues más flexibles.

Ejemplo típico:

- Mistral AI.

### Proveedores especializados

Se centran en áreas concretas:

- embeddings;
- reranking;
- búsqueda;
- generación de voz;
- transcripción;
- visión;
- vídeo;
- enterprise search;
- documentación;
- agentes;
- seguridad.

### Plataformas cloud

Ofrecen acceso gestionado a modelos propios y de terceros:

- Azure;
- AWS Bedrock;
- Google Vertex AI;
- otros proveedores cloud.

### Capas de agregación

Permiten enrutar entre modelos y proveedores:

- gateways;
- routers;
- plataformas multi-modelo;
- herramientas de observabilidad y costes.

Para un producto real, puede ser tan importante elegir bien la capa de acceso como elegir el modelo.

---

## 6.7 OpenAI

OpenAI ha sido uno de los proveedores más influyentes en la adopción de LLMs.

Su ecosistema suele incluir:

- modelos de conversación;
- modelos de razonamiento;
- modelos multimodales;
- generación y análisis de imagen;
- audio;
- embeddings;
- APIs para tool calling;
- structured outputs;
- asistentes o capas de agentes según evolución de la plataforma.

Puntos fuertes habituales:

- calidad general;
- ecosistema de desarrolladores;
- documentación amplia;
- APIs maduras;
- buen soporte de herramientas;
- facilidad de prototipado;
- integración con productos populares.

Riesgos habituales:

- dependencia de proveedor;
- cambios de modelos disponibles;
- coste a escala;
- diferencias entre ChatGPT y API;
- necesidad de revisar políticas de datos;
- posible acoplamiento a funciones específicas.

Uso recomendado:

- prototipos rápidos;
- productos que necesitan buena calidad general;
- aplicaciones multimodales;
- agentes con tools;
- generación de código y texto;
- pipelines con structured outputs;
- tareas donde la facilidad de integración pesa mucho.

Criterio práctico:

> OpenAI suele ser una opción fuerte cuando quieres velocidad de desarrollo, APIs maduras y buena calidad general, pero debes controlar coste, privacidad y dependencia.

---

## 6.8 Anthropic

Anthropic se ha posicionado especialmente fuerte en razonamiento, escritura, análisis largo, seguridad, agentes de código y uso de herramientas.

Su familia Claude suele ser muy apreciada en tareas de:

- análisis de documentos;
- programación;
- escritura técnica;
- instrucciones complejas;
- razonamiento;
- agentes;
- flujos con herramientas;
- trabajo con repositorios;
- asistencia a desarrolladores.

Puntos fuertes habituales:

- calidad de redacción;
- razonamiento práctico;
- buen comportamiento en código;
- seguimiento de instrucciones largas;
- orientación a seguridad;
- experiencia fuerte con Claude Code y flujos agentic.

Riesgos habituales:

- coste en modelos de gama alta;
- cambios rápidos de plataforma;
- límites y disponibilidad;
- necesidad de probar bien tool calling;
- posible dependencia de herramientas propias.

Uso recomendado:

- desarrollo asistido;
- agentes de código;
- análisis documental;
- tareas complejas de escritura;
- flujos internos de conocimiento;
- revisión y razonamiento sobre información extensa.

Criterio práctico:

> Anthropic suele ser una opción fuerte cuando el producto necesita razonamiento, código, escritura técnica o agentes con buen seguimiento de instrucciones.

---

## 6.9 Google Gemini

Google Gemini destaca por su apuesta multimodal, contexto largo, integración con el ecosistema Google y capacidades de búsqueda, documentos, imagen, audio, vídeo y herramientas según versión.

En documentación oficial de Gemini, Google describe modelos con capacidades como long context, multimodalidad, function calling, structured outputs, code execution, grounding y procesamiento de PDFs, imagen, audio o vídeo, dependiendo del modelo concreto.

Puntos fuertes habituales:

- contexto largo;
- multimodalidad;
- integración con Google AI Studio, Gemini API y Vertex AI;
- procesamiento de documentos grandes;
- grounding y búsqueda;
- buenas opciones coste/rendimiento en modelos Flash;
- capacidades de código y análisis.

Riesgos habituales:

- diferencias entre versiones preview, latest y stable;
- cambios rápidos;
- complejidad del catálogo;
- necesidad de revisar disponibilidad regional;
- comportamiento variable según modalidad.

Uso recomendado:

- análisis de documentos largos;
- productos multimodales;
- tareas con PDFs, vídeo, audio o imagen;
- aplicaciones integradas con Google Cloud;
- prototipos donde el contexto largo sea crítico;
- sistemas que necesiten grounding.

Criterio práctico:

> Gemini suele ser una opción fuerte cuando necesitas multimodalidad, contexto largo o integración con el ecosistema Google.

---

## 6.10 xAI Grok

xAI, con Grok, se ha orientado a modelos conversacionales, razonamiento, integración con productos del ecosistema X y capacidades competitivas en tareas generales y de desarrollo según la evolución de su API.

Puntos a evaluar:

- calidad en razonamiento;
- calidad en código;
- coste;
- disponibilidad API;
- tool calling;
- contexto;
- estabilidad;
- política de datos;
- integración con X;
- soporte empresarial.

Uso potencial:

- productos conversacionales;
- análisis de información pública;
- experimentación con modelos frontier alternativos;
- flujos donde interese diversidad de proveedor;
- comparación frente a OpenAI, Anthropic y Gemini.

Criterio práctico:

> xAI puede ser interesante como proveedor alternativo o complementario, pero debe evaluarse con pruebas propias en tu caso de uso.

---

## 6.11 Mistral AI

Mistral es especialmente interesante porque combina modelos comerciales, modelos open weights y una orientación fuerte hacia despliegues flexibles.

Su documentación presenta una línea de modelos para tareas generalistas, multimodales, código, razonamiento, audio, OCR y despliegues comerciales o abiertos, según modelo y licencia.

Puntos fuertes habituales:

- enfoque europeo;
- modelos open weights y comerciales;
- opciones de despliegue flexible;
- buena relación coste/rendimiento;
- modelos eficientes;
- interés para empresas que quieren alternativas a proveedores estadounidenses;
- modelos para código, razonamiento, OCR o audio según catálogo.

Riesgos habituales:

- catálogo cambiante;
- diferencias importantes entre modelos open y premier;
- necesidad de revisar licencias;
- menor ecosistema que los proveedores más grandes en algunos casos;
- evaluación necesaria en español y dominios concretos.

Uso recomendado:

- empresas europeas;
- arquitecturas híbridas;
- despliegues con más control;
- productos que valoran open weights;
- código;
- RAG;
- OCR/document AI;
- modelos eficientes.

Criterio práctico:

> Mistral es una opción especialmente interesante cuando buscas equilibrio entre calidad, control, coste, Europa y modelos abiertos/comerciales.

---

## 6.12 Cohere

Cohere ha sido relevante especialmente en el mundo enterprise, búsqueda, embeddings, reranking y RAG.

Puntos fuertes habituales:

- embeddings;
- reranking;
- búsqueda empresarial;
- APIs orientadas a producción;
- casos de uso RAG;
- enfoque enterprise.

Uso recomendado:

- RAG;
- búsqueda semántica;
- reranking;
- clasificación;
- aplicaciones empresariales con recuperación documental.

Criterio práctico:

> Cohere puede ser muy útil aunque no uses su modelo principal de chat, especialmente para embeddings y reranking en sistemas RAG.

---

## 6.13 Perplexity y proveedores con búsqueda

Algunos proveedores se orientan a respuestas con búsqueda web, grounding o recuperación online.

Esto es útil cuando el sistema necesita información reciente.

Casos:

- investigación;
- análisis de mercado;
- seguimiento de noticias;
- comparación de productos;
- respuestas con fuentes web;
- generación de informes actualizados.

Riesgos:

- calidad de fuentes;
- frescura real;
- dependencia de ranking;
- alucinaciones con citas;
- límites de copyright;
- coste;
- trazabilidad.

Criterio práctico:

> Para información cambiante, no confíes solo en conocimiento interno del modelo. Usa búsqueda, grounding o fuentes actualizadas.

---

## 6.14 Plataformas cloud: Azure, AWS y Google Cloud

Muchas empresas no consumen modelos directamente desde el proveedor original.

Los consumen a través de plataformas cloud.

Ventajas:

- cumplimiento empresarial;
- contratos existentes;
- gestión de identidad;
- regiones;
- seguridad;
- observabilidad;
- integración con infraestructura;
- facturación centralizada;
- acceso a varios modelos.

Riesgos:

- complejidad;
- coste;
- latencia;
- disponibilidad regional;
- versiones distintas;
- dependencia cloud;
- configuración empresarial más lenta.

Uso recomendado:

- grandes empresas;
- administraciones;
- equipos con requisitos de compliance;
- productos que ya viven en una nube concreta;
- despliegues con gobierno de datos.

Criterio práctico:

> Para empresa grande, la pregunta no suele ser solo “qué modelo”, sino “desde qué plataforma aprobada podemos consumirlo”.

---

## 6.15 Modelos propietarios para RAG

En RAG, el modelo propietario no trabaja solo.

Trabaja con:

- embeddings;
- vector database;
- reranking;
- chunking;
- contexto;
- citas;
- evaluación.

El modelo principal debe ser bueno en:

- usar fuentes;
- no inventar;
- citar correctamente;
- decir “no lo sé”;
- sintetizar fragmentos;
- resolver contradicciones;
- seguir instrucciones;
- responder en el tono adecuado.

Pero si el RAG recupera mal, el mejor modelo también puede fallar.

Para elegir modelo en RAG, prueba:

- preguntas con respuesta exacta;
- preguntas fuera de alcance;
- documentos contradictorios;
- documentos largos;
- tablas;
- PDFs mal formateados;
- preguntas ambiguas;
- necesidad de citas.

No evalúes solo la redacción.

Evalúa fidelidad.

---

## 6.16 Modelos propietarios para agentes

En agentes, el modelo debe saber:

- planificar;
- elegir herramientas;
- rellenar argumentos;
- interpretar resultados;
- corregir errores;
- no entrar en bucles;
- pedir aclaración;
- detenerse;
- cumplir límites.

Aquí importan mucho:

- tool calling;
- reasoning;
- contexto;
- coste por paso;
- latencia;
- estabilidad;
- logs;
- soporte para structured outputs.

Un modelo excelente en conversación puede ser mediocre como agente.

Evalúa con tareas reales:

- crear issue;
- leer documento;
- consultar base de datos;
- generar borrador;
- pedir confirmación;
- modificar archivo;
- ejecutar flujo limitado.

Métrica:

```text
éxito de tarea / coste / pasos / errores / seguridad
```

---

## 6.17 Modelos propietarios para código

Para código, evalúa:

- comprensión de repositorios;
- capacidad multi-archivo;
- generación de tests;
- corrección;
- no inventar dependencias;
- respetar arquitectura;
- seguridad;
- explicación de cambios;
- uso con agentes;
- integración con Git.

No basta con que genere código bonito.

Debe pasar tests.

Debe mantener el proyecto.

Debe no borrar cosas.

Debe no introducir paquetes falsos.

Debe no exponer secretos.

En código, una alucinación puede convertirse en vulnerabilidad o deuda técnica.

---

## 6.18 Modelos propietarios para multimodalidad

En multimodalidad, compara modelos según tarea.

### Imagen

- descripción;
- OCR;
- análisis visual;
- clasificación;
- comparación;
- diseño;
- UI screenshots.

### Audio

- transcripción;
- análisis de conversación;
- generación de voz;
- interacción en tiempo real.

### Vídeo

- resumen;
- detección de eventos;
- análisis de escenas;
- extracción de información temporal.

### Documentos

- PDF;
- tablas;
- formularios;
- escaneos;
- gráficos.

No asumas que un modelo multimodal es bueno en todo.

Prueba con tus datos reales.

---

## 6.19 El problema de las versiones

Los proveedores actualizan modelos constantemente.

Puede haber versiones:

- stable;
- preview;
- latest;
- experimental;
- deprecated;
- legacy;
- API-only;
- chat-only;
- region-specific.

Esto importa mucho.

Un alias como “latest” puede cambiar.

Un modelo preview puede desaparecer.

Un modelo stable puede quedarse atrás.

Un modelo disponible en ChatGPT o una interfaz web puede no estar igual en API.

Buenas prácticas:

- fijar versiones en producción;
- evitar aliases inestables;
- leer avisos de deprecación;
- registrar modelo usado;
- tener pruebas de regresión;
- preparar fallback;
- revisar changelog del proveedor;
- no actualizar modelos críticos sin benchmark.

---

## 6.20 Diferencia entre interfaz web y API

Un error común es probar en una interfaz web y asumir que la API se comportará igual.

No siempre ocurre.

La interfaz web puede incluir:

- system prompts internos;
- memoria;
- herramientas ocultas;
- búsqueda;
- filtros;
- optimizaciones;
- contexto adicional;
- políticas específicas;
- modelos no disponibles en API.

La API suele ser más controlable, pero también más desnuda.

Si vas a construir producto, evalúa en la API real.

No solo en el chat del proveedor.

---

## 6.21 Privacidad y condiciones de datos

Antes de enviar datos a un proveedor propietario, revisa:

- si los datos se usan para entrenamiento;
- retención de logs;
- opciones enterprise;
- región de procesamiento;
- cifrado;
- acuerdos de tratamiento de datos;
- cumplimiento RGPD;
- controles de acceso;
- auditoría;
- eliminación de datos;
- política para prompts y outputs.

Para prototipos personales puede parecer excesivo.

Para empresas, salud, legal, educación o administración pública es imprescindible.

No diseñes arquitectura sin entender esto.

---

## 6.22 Vendor lock-in

Vendor lock-in significa que tu producto queda demasiado atado a un proveedor.

Puede ocurrir por:

- API específica;
- prompts optimizados para un modelo;
- herramientas propietarias;
- formato de salida específico;
- embeddings incompatibles;
- vectorización con modelo concreto;
- funciones beta;
- dependencia de precios;
- dependencia de interfaz.

No siempre es malo.

A veces usar capacidades específicas te da ventaja.

Pero debe ser una decisión consciente.

Estrategias para reducir lock-in:

- capa interna de proveedor;
- prompts versionados;
- evaluación multi-modelo;
- fallback;
- formatos estándar;
- separar RAG del modelo;
- usar herramientas como LiteLLM si tiene sentido;
- no depender de preview models en producción crítica.

---

## 6.23 Structured outputs

Los modelos propietarios suelen ofrecer mecanismos para salida estructurada.

Esto es fundamental para aplicaciones reales.

Ejemplos:

- JSON validado;
- schemas;
- tool calls;
- function outputs;
- extracción de campos;
- clasificación;
- generación de objetos.

Uso típico:

```json
{
  "tipo": "incidencia",
  "prioridad": "alta",
  "requiere_humano": true,
  "resumen": "El cliente informa de un cargo duplicado."
}
```

Buenas prácticas:

- definir schema;
- validar en backend;
- limitar campos;
- usar enums;
- manejar errores;
- reintentar con límite;
- no confiar ciegamente en salida generada.

La salida estructurada convierte LLMs en componentes de pipelines.

Pero solo si validas.

---

## 6.24 Grounding y búsqueda

Algunos proveedores ofrecen grounding con búsqueda web, fuentes, conectores o recuperación integrada.

Esto es útil para información actualizada.

Pero no sustituye criterio.

Preguntas:

- ¿qué fuentes usa?
- ¿cita correctamente?
- ¿puedo auditar?
- ¿puedo limitar dominios?
- ¿puedo desactivar?
- ¿cuánto cuesta?
- ¿qué pasa si no encuentra?
- ¿puede mezclar fuentes malas?
- ¿cumple copyright?
- ¿cumple privacidad?

Para temas cambiantes, grounding puede ser imprescindible.

Para datos internos, normalmente necesitarás tu propio RAG o conectores controlados.

---

## 6.25 Evaluar modelos propietarios

No evalúes proveedores con impresiones sueltas.

Crea un benchmark propio.

Ejemplo:

```markdown
# Benchmark interno de modelos

## Tareas
- 30 preguntas RAG
- 20 clasificaciones
- 10 extracciones JSON
- 10 tareas de código
- 10 preguntas fuera de alcance
- 5 tareas con tools

## Métricas
- exactitud
- fidelidad
- formato válido
- latencia
- coste
- tasa de alucinación
- calidad de citas
- éxito de tool calling
- satisfacción humana
```

Registra resultados por modelo y versión.

Repite cada vez que cambies modelo.

---

## 6.26 Comparar coste real

Para comparar coste, no mires solo precio por millón de tokens.

Calcula flujo completo.

Ejemplo:

```text
Clasificación intención
+ embedding consulta
+ búsqueda vectorial
+ reranking
+ llamada principal
+ validación
+ posible reintento
+ evaluación offline
```

Coste real:

```text
coste por interacción = coste de todos los pasos / interacciones útiles
```

Y luego:

```text
coste mensual = coste por interacción × interacciones mensuales
```

Añade margen para:

- crecimiento;
- errores;
- pruebas;
- logs;
- tareas internas;
- evaluación;
- soporte.

---

## 6.27 Modelos propietarios en arquitecturas híbridas

Una arquitectura híbrida puede usar modelos propietarios solo donde aportan más valor.

Ejemplo:

```text
modelo local pequeño → clasifica intención
RAG local → recupera documentos sensibles
modelo propietario fuerte → razona sobre fragmentos filtrados
modelo local → genera resumen interno
humano → aprueba salida
```

Otro ejemplo:

```text
modelo barato → responde preguntas simples
modelo potente → casos difíciles
modelo especializado → embeddings
modelo de voz → transcripción
modelo propietario multimodal → análisis de imagen
```

La pregunta no es cloud o local.

La pregunta es:

> ¿Qué pieza debe resolver cada parte del flujo?

---

## 6.28 Cuándo pagar por el modelo caro

Paga por el modelo caro cuando:

- el coste del error es alto;
- la tarea es compleja;
- el usuario paga suficiente;
- ahorra mucho tiempo;
- reduce riesgo;
- mejora calidad de forma medible;
- evita intervención humana costosa;
- el volumen es bajo pero el valor por respuesta alto;
- el modelo barato falla en evaluación.

No pagues por el modelo caro cuando:

- la tarea es simple;
- hay mucho volumen y bajo margen;
- la calidad extra no se nota;
- puedes resolver con reglas;
- puedes resolver con modelo local;
- puedes usar un modelo barato con buen RAG.

La eficiencia consiste en asignar presupuesto donde impacta.

---

## 6.29 Cuándo usar un modelo barato

Un modelo barato puede ser ideal para:

- clasificación;
- routing;
- extracción simple;
- moderación inicial;
- resúmenes cortos;
- borradores;
- detección de intención;
- etiquetado;
- preprocesamiento;
- tareas batch;
- respuestas frecuentes.

Pero evalúa.

Un modelo barato que falla demasiado puede salir caro por:

- reintentos;
- soporte;
- pérdida de confianza;
- revisión humana;
- errores de negocio.

Barato no significa rentable.

Rentable significa coste adecuado para calidad suficiente.

---

## 6.30 La importancia del idioma y dominio

Un modelo puede comportarse distinto según idioma y dominio.

Prueba con:

- español de España;
- español latinoamericano si aplica;
- términos técnicos;
- jerga interna;
- documentos legales;
- documentación médica;
- normativa administrativa;
- código;
- logs;
- emails reales;
- faltas de ortografía;
- entradas mixtas inglés/español.

Para productos en España, no des por hecho que un benchmark inglés sirve.

El dominio importa.

---

## 6.31 Política de actualización de modelos

Cada proyecto debería tener una política de actualización.

Ejemplo:

```markdown
# Política de modelos

- Producción usa modelos versionados, no alias latest.
- Los modelos preview solo se usan en staging.
- Todo cambio de modelo exige benchmark.
- Se mantiene fallback al modelo anterior durante 30 días.
- Se registra modelo, versión, prompt y coste por respuesta.
- Se revisan precios y deprecaciones cada trimestre.
```

Esto parece burocrático.

Pero evita problemas.

---

## 6.32 Plantilla de evaluación de proveedor

```markdown
# Evaluación de proveedor LLM

## Proveedor

Nombre.

## Modelos candidatos

Lista de modelos.

## Capacidades

- Texto:
- Código:
- Imagen:
- Audio:
- Vídeo:
- PDFs:
- Tool calling:
- Structured outputs:
- Contexto:
- Grounding:
- Batch:

## Coste

Precio por entrada, salida y componentes adicionales.

## Privacidad

Condiciones de uso de datos, retención, región, enterprise.

## Integración

API, SDKs, documentación, streaming, errores, rate limits.

## Riesgos

Lock-in, deprecaciones, cambios de comportamiento, disponibilidad.

## Resultado del benchmark

Resumen.

## Decisión

Usar / no usar / usar solo para tareas concretas.

## Fecha de revisión

Próxima revisión.
```

---

## 6.33 Anti-patrones con modelos propietarios

### Usar siempre el modelo más potente

Puede disparar coste sin mejorar producto.

### Usar siempre el modelo más barato

Puede degradar calidad y confianza.

### No leer condiciones de datos

Peligroso en empresa.

### Probar solo en interfaz web

La API puede comportarse diferente.

### Usar modelos preview en producción crítica

Riesgo de cambios y retirada.

### No registrar versiones

Imposible auditar.

### No tener fallback

Fragilidad operativa.

### Acoplar prompts a un solo modelo

Dificulta migración.

### No evaluar en español

Error común en productos hispanohablantes.

### Ignorar latencia

La experiencia puede fracasar aunque la respuesta sea buena.

---

## 6.34 Ejemplo práctico: elegir proveedor para un chatbot documental

Caso:

Una empresa quiere un chatbot interno para consultar documentación.

Requisitos:

- español;
- documentos internos;
- citas;
- coste moderado;
- privacidad media;
- 200 usuarios;
- preguntas frecuentes y procedimientos;
- no ejecuta acciones.

Decisión posible:

```text
RAG propio con pgvector o Qdrant
+ embeddings coste/privacidad optimizados
+ modelo propietario medio para respuesta
+ modelo barato/local para intención
+ fallback a "no encontrado"
+ evaluación mensual
```

No hace falta usar siempre el modelo más caro.

La calidad dependerá mucho más de:

- documentos;
- chunking;
- retrieval;
- reranking;
- citas;
- evaluación.

---

## 6.35 Ejemplo práctico: agente de desarrollo

Caso:

Un equipo quiere usar IA para modificar código.

Requisitos:

- razonamiento alto;
- contexto de repositorio;
- generación multi-archivo;
- tests;
- PRs;
- seguridad;
- revisión humana.

Decisión posible:

```text
modelo propietario fuerte en código
+ agente controlado
+ reglas en CLAUDE.md / instrucciones del repo
+ ramas separadas
+ tests obligatorios
+ PR revisable
+ sin acceso a secretos
+ logs de cambios
```

Aquí sí puede merecer la pena pagar por un modelo fuerte.

El coste de un bug puede ser mayor que el ahorro de usar un modelo barato.

---

## 6.36 Ejemplo práctico: automatización de emails en PYME

Caso:

Una PYME recibe muchos emails repetitivos.

Requisitos:

- clasificar emails;
- generar borradores;
- no enviar automáticamente;
- bajo coste;
- privacidad;
- revisión humana.

Decisión posible:

```text
modelo barato/local → clasificar
modelo medio → generar borrador
humano → revisar
logs → medir ahorro
fallback → dejar sin automatizar si hay duda
```

No hace falta agente autónomo.

No hace falta modelo frontier para todo.

La clave es mejorar el flujo sin perder control.

---

## 6.37 Ideas clave del capítulo

- Los modelos propietarios son potentes, pero introducen dependencia.
- No elijas proveedor por moda.
- Evalúa según tarea, datos, coste, privacidad, latencia y riesgo.
- La interfaz web y la API pueden comportarse de forma distinta.
- Los modelos cambian: versiona y registra.
- Las capacidades como tool calling, structured outputs y grounding son tan importantes como la calidad textual.
- En RAG, el modelo principal no compensa un mal retrieval.
- En agentes, importa mucho la fiabilidad usando herramientas.
- En código, el modelo debe probarse con tests reales.
- Local y propietario pueden combinarse en arquitecturas híbridas.
- El coste real es el flujo completo, no solo la llamada principal.
- Un proveedor debe evaluarse también por privacidad, estabilidad e integración.

---

## 6.38 Checklist práctica

Antes de usar un modelo propietario en producción:

- ¿Qué tarea concreta resolverá?
- ¿Por qué no basta un modelo local o más barato?
- ¿Qué datos se enviarán?
- ¿Hay datos personales o sensibles?
- ¿Has revisado condiciones de uso de datos?
- ¿Qué modelo y versión usarás?
- ¿Es stable, preview, latest o experimental?
- ¿Hay riesgo de deprecación?
- ¿Has probado API real, no solo interfaz web?
- ¿Funciona bien en español?
- ¿Soporta tool calling si lo necesitas?
- ¿Soporta structured outputs si lo necesitas?
- ¿Necesitas multimodalidad?
- ¿Necesitas grounding?
- ¿Cuál es la latencia media?
- ¿Cuál es el coste por flujo completo?
- ¿Hay fallback?
- ¿Registras modelo, prompt y versión?
- ¿Tienes benchmark propio?
- ¿Puedes migrar a otro proveedor si hace falta?

---

## 6.39 Qué puede cambiar en el futuro

Este capítulo es uno de los más cambiantes del libro.

Cambiarán:

- nombres de modelos;
- precios;
- ventanas de contexto;
- capacidades multimodales;
- tool calling;
- structured outputs;
- políticas de datos;
- modelos retirados;
- modelos nuevos;
- integración con agentes;
- regulación;
- proveedores dominantes.

Por eso, los detalles concretos de proveedores deben mantenerse en tablas vivas.

Este capítulo debe conservar el criterio.

La tabla de modelos debe actualizarse de forma periódica.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 5 — Cómo elegir un modelo
- Capítulo 7 — Modelos locales
- Capítulo 8 — Hardware real para IA local
- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 24 — Qué es un agente de IA
- Capítulo 34 — Sistema híbrido local + cloud
- Capítulo 46 — Despliegue de sistemas IA
- Capítulo 50 — Evaluación
- Capítulo 51 — Costes
- Apéndice D — Tabla viva de modelos
- Apéndice G — Tabla viva de frameworks agenticos

---

## Referencias para actualización futura

Estas referencias deben revisarse periódicamente porque el catálogo cambia con rapidez:

- OpenAI Documentation — Models.
- Anthropic Documentation — Claude models.
- Google AI for Developers — Gemini models.
- Mistral AI Documentation — Models.
- xAI Documentation — Models.
- Azure AI Foundry / Azure OpenAI model catalog.
- AWS Bedrock model providers.
- Google Vertex AI model garden.
