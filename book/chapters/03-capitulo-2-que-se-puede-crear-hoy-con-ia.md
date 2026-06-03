---
title: "Capítulo 2 — Qué se puede crear hoy con IA"
chapter: "03"
part: "Parte I — Mi mapa mental de la IA aplicada"
version: "0.1"
last_updated: "2026-06-02"
status: "estable"
level: "introductorio"
estimated_reading_time: "25 minutos"
---

# Capítulo 2 — Qué se puede crear hoy con IA

Una de las preguntas más importantes para cualquier ingeniero que empieza a construir con inteligencia artificial es aparentemente sencilla:

> ¿Qué puedo crear con IA?

La respuesta corta sería: muchas cosas.

Pero esa respuesta no sirve demasiado.

La respuesta útil es otra:

> Puedes crear sistemas donde un modelo de lenguaje, combinado con datos, herramientas, contexto, memoria y reglas de negocio, ayuda a resolver tareas que antes requerían lenguaje humano, interpretación, búsqueda, generación, clasificación o toma de decisiones asistida.

Dicho de forma más práctica: puedes construir software que lee, escribe, busca, resume, conversa, clasifica, razona, transforma, conecta herramientas y ayuda a personas a trabajar mejor.

Pero no todos los casos de uso tienen el mismo valor.

No todos son igual de fáciles.

No todos son seguros.

No todos merecen un producto.

No todos deben automatizarse.

Este capítulo presenta un mapa de lo que se puede crear hoy con IA, separando los casos más realistas de las fantasías más peligrosas.

La idea no es memorizar categorías.

La idea es aprender a ver oportunidades.

---

## 2.1 La IA como nueva capa de producto

La IA generativa puede aparecer en un producto de muchas formas.

A veces es la interfaz principal, como en un chatbot.

A veces es una función invisible, como una clasificación automática.

A veces es una capa de ayuda, como un copiloto.

A veces es un motor de generación, como en una plataforma educativa.

A veces es una capa de automatización, como en un agente que opera herramientas.

A veces es una capa local y privada, como un asistente documental en una empresa.

Por eso, cuando pensamos en productos IA, conviene evitar una pregunta demasiado estrecha:

> ¿Qué chatbot puedo hacer?

Y sustituirla por otra más amplia:

> ¿Qué flujo humano puedo mejorar usando modelos, contexto y herramientas?

Esa pregunta abre muchas más posibilidades.

---

## 2.2 Chatbots

Los chatbots son la puerta de entrada más evidente.

Un chatbot moderno puede responder preguntas, guiar al usuario, recuperar información, generar textos, clasificar intenciones y escalar casos a una persona.

Pero hay muchos tipos de chatbots.

### Chatbot FAQ

Es el caso más simple.

Responde preguntas frecuentes a partir de una base de conocimiento limitada.

Ejemplos:

- horarios;
- precios;
- servicios;
- requisitos;
- pasos administrativos;
- preguntas repetitivas de soporte.

Ventaja: fácil de entender y vender.

Riesgo: si no tiene buenas fuentes o límites claros, inventará respuestas.

### Chatbot documental

Responde usando documentos.

Ejemplos:

- manuales internos;
- normativa;
- contratos;
- procedimientos;
- documentación técnica;
- expedientes;
- políticas de empresa.

Aquí ya aparece RAG.

La clave no es solo conversar, sino citar correctamente de dónde sale cada respuesta.

### Chatbot transaccional

No solo responde. También inicia acciones.

Ejemplos:

- crear una cita;
- abrir un ticket;
- consultar un pedido;
- modificar datos;
- generar un presupuesto;
- registrar una incidencia.

Este tipo de chatbot necesita tool calling, permisos, validación y trazabilidad.

### Chatbot interno

Está pensado para empleados.

Ejemplos:

- consultar documentación;
- preguntar por procedimientos;
- buscar información en sistemas internos;
- generar informes;
- ayudar en soporte;
- asistir a comerciales.

Suele tener más valor que un chatbot público porque opera sobre procesos concretos y datos internos.

### Chatbot público

Está pensado para clientes o ciudadanos.

Ejemplos:

- web municipal;
- ecommerce;
- atención al cliente;
- soporte de servicios;
- educación;
- turismo.

Aquí la calidad, el tono, la seguridad y la escalada a humano importan mucho.

---

## 2.3 Copilotos internos

Un copiloto interno es una herramienta que ayuda a una persona a trabajar mejor, pero no necesariamente sustituye una tarea completa.

Puede estar integrado en una aplicación existente o funcionar como interfaz independiente.

Ejemplos:

- copiloto para atención al cliente;
- copiloto para abogados;
- copiloto para médicos;
- copiloto para administrativos;
- copiloto para profesores;
- copiloto para programadores;
- copiloto para comerciales;
- copiloto para gestores de proyectos.

La diferencia con un chatbot genérico es que el copiloto está orientado a una función profesional concreta.

Un copiloto interno puede:

- resumir documentos;
- preparar respuestas;
- sugerir pasos;
- buscar antecedentes;
- redactar borradores;
- revisar errores;
- comparar versiones;
- extraer datos;
- generar informes;
- ayudar a tomar decisiones.

La clave es que el humano sigue en control.

El sistema propone, acelera y ordena.

La persona decide.

Este enfoque suele ser más seguro que intentar automatizar todo desde el principio.

---

## 2.4 Asistentes documentales

Los asistentes documentales son uno de los casos más sólidos para aplicar IA en empresas.

Muchas organizaciones tienen una gran cantidad de información enterrada en documentos:

- PDFs;
- Word;
- Excel;
- emails;
- manuales;
- contratos;
- facturas;
- normativas;
- expedientes;
- presentaciones;
- notas internas.

El problema no es que falte información.

El problema es encontrarla, entenderla y usarla.

Un asistente documental puede permitir preguntas como:

> ¿Qué dice este contrato sobre renovación automática?

> Resume los riesgos principales de estos documentos.

> Busca todas las facturas pendientes de revisión.

> Compara estas dos versiones de una cláusula.

> Extrae fechas, importes y obligaciones.

> Dame una respuesta con citas exactas a la fuente.

Este tipo de sistema suele combinar:

- extracción de texto;
- OCR;
- chunking;
- embeddings;
- búsqueda híbrida;
- reranking;
- RAG;
- citas;
- permisos;
- auditoría.

Es un caso de uso muy potente, pero también uno de los que más se rompen si se implementa de forma ingenua.

---

## 2.5 RAG privado para empresas

RAG privado significa que la empresa puede consultar sus propios datos con ayuda de un modelo.

La palabra “privado” puede significar varias cosas:

- documentos internos;
- acceso solo para empleados;
- infraestructura propia;
- modelo local;
- base vectorial local;
- datos que no se envían a terceros;
- control de permisos por usuario;
- auditoría de consultas.

Casos típicos:

- despacho jurídico que consulta contratos y legislación;
- clínica que consulta protocolos internos;
- inmobiliaria que consulta expedientes;
- gestoría que busca normativa y documentos de clientes;
- ayuntamiento que responde sobre trámites;
- empresa técnica que consulta manuales y tickets;
- academia que consulta materiales educativos.

El valor del RAG privado está en reducir tiempo de búsqueda y mejorar acceso al conocimiento interno.

Pero hay que tener cuidado con la promesa comercial.

Un RAG no entiende mágicamente toda la empresa.

Un RAG recupera fragmentos y ayuda a generar respuestas.

Si la documentación está desordenada, duplicada, obsoleta o mal escaneada, el sistema lo sufrirá.

Por eso, un buen proyecto RAG empieza muchas veces antes del modelo: empieza ordenando información.

---

## 2.6 Agentes con herramientas

Un agente con herramientas puede ir más allá de responder.

Puede actuar.

Por ejemplo:

- buscar en una base de datos;
- consultar una API;
- abrir un navegador;
- leer archivos;
- crear un issue en GitHub;
- generar una rama;
- modificar una tabla;
- enviar un email;
- crear una cita;
- ejecutar un workflow.

El patrón básico es:

```text
objetivo → razonamiento → herramienta → observación → siguiente paso
```

Esto es muy potente.

También es peligroso.

Un agente mal diseñado puede hacer demasiadas llamadas, usar mal una herramienta, interpretar mal un dato o tomar una acción que no debía.

Por eso conviene clasificar agentes por nivel de autonomía.

### Nivel 1: agente sugeridor

Propone acciones, pero no ejecuta.

### Nivel 2: agente asistido

Prepara una acción y pide confirmación humana.

### Nivel 3: agente operativo limitado

Ejecuta acciones de bajo riesgo dentro de límites definidos.

### Nivel 4: agente autónomo supervisado

Opera flujos complejos con logs, permisos y posibilidad de intervención.

### Nivel 5: agente autónomo amplio

Tiene mucha libertad. Este nivel es el más arriesgado y rara vez debería ser el punto de partida.

Para productos reales, normalmente conviene empezar en nivel 1 o 2.

---

## 2.7 Automatizaciones empresariales

Muchas oportunidades reales de IA no parecen espectaculares.

No son robots autónomos.

Son automatizaciones de tareas aburridas.

Ejemplos:

- clasificar emails entrantes;
- extraer datos de adjuntos;
- resumir reuniones;
- generar actas;
- crear respuestas preliminares;
- ordenar leads;
- generar presupuestos;
- transformar documentos;
- revisar formularios;
- crear tickets;
- comparar facturas;
- detectar incidencias;
- actualizar registros.

Estas tareas pueden ahorrar mucho tiempo.

Para una PYME, ahorrar 5, 10 o 20 horas semanales puede ser más valioso que tener un “agente avanzado”.

El error es vender IA como magia.

La oportunidad es vender IA como reducción concreta de fricción.

Una buena automatización IA suele tener estas características:

- tarea repetitiva;
- entrada textual o documental;
- criterio parcialmente definible;
- resultado revisable;
- bajo riesgo si hay supervisión;
- integración con herramientas existentes;
- ahorro medible.

---

## 2.8 Generadores de contenido

La IA generativa es muy fuerte creando contenido.

Pero “generar contenido” es una categoría demasiado amplia.

Hay que distinguir entre contenido genérico y contenido útil.

### Contenido genérico

Ejemplos:

- posts;
- descripciones;
- emails;
- titulares;
- anuncios;
- textos SEO.

Es fácil de generar, pero también muy competitivo.

### Contenido estructurado

Ejemplos:

- lecciones educativas;
- documentación técnica;
- manuales;
- ejercicios;
- fichas de producto;
- informes;
- resúmenes ejecutivos;
- plantillas comerciales.

Tiene más valor porque requiere estructura, criterios y revisión.

### Contenido personalizado

Ejemplos:

- itinerarios;
- planes de estudio;
- recomendaciones;
- propuestas comerciales;
- guías adaptadas a un usuario;
- feedback sobre ejercicios.

Tiene aún más valor porque combina generación con contexto.

### Contenido verificable

Ejemplos:

- respuestas con fuentes;
- informes basados en documentos;
- resúmenes con citas;
- materiales derivados de normativa;
- análisis comparativos.

Es más difícil, pero más defendible.

Una plataforma educativa generada con IA, por ejemplo, no debería limitarse a “crear textos”.

Debe controlar currículo, nivel, progresión, ejercicios, calidad, multimedia, revisión y actualización.

---

## 2.9 Apps móviles con IA

La IA también puede integrarse en apps móviles.

Casos posibles:

- asistentes personales;
- memoria aumentada;
- organización de notas;
- recordatorios inteligentes;
- captura rápida de ideas;
- clasificación automática;
- resúmenes de voz;
- análisis de imágenes;
- ayuda offline;
- copilotos de tareas.

En móvil, la experiencia de usuario importa especialmente.

No basta con poner un chat.

Una buena app móvil con IA debe aprovechar el contexto del dispositivo:

- notificaciones;
- cámara;
- micrófono;
- ubicación si procede;
- calendario;
- contactos;
- almacenamiento local;
- sensores;
- widgets;
- acciones rápidas.

La IA local en móvil abre posibilidades interesantes:

- privacidad;
- menor coste;
- funcionamiento offline;
- baja latencia para tareas simples.

Pero también tiene límites:

- batería;
- memoria;
- tamaño del modelo;
- velocidad;
- calidad;
- actualizaciones;
- experiencia térmica.

La clave es usar IA donde mejora claramente el flujo, no donde añade complejidad innecesaria.

---

## 2.10 Agentes de voz

La voz es una de las interfaces más naturales para la IA.

Un agente de voz combina varias piezas:

```text
audio del usuario
  ↓
speech-to-text
  ↓
LLM / agente
  ↓
herramientas / RAG
  ↓
text-to-speech
  ↓
audio de respuesta
```

Casos de uso:

- atención telefónica;
- formación;
- práctica de idiomas;
- asistencia médica supervisada;
- soporte interno;
- acompañamiento educativo;
- control de sistemas;
- agricultura remota;
- interfaces para personas con baja alfabetización digital.

Pero voz no significa simplemente leer respuestas en alto.

Un buen agente de voz necesita:

- baja latencia;
- detección de turnos;
- interrupciones;
- tono adecuado;
- memoria conversacional;
- gestión de silencios;
- confirmación de acciones;
- tolerancia a errores de transcripción.

La voz aumenta la sensación de inteligencia, pero también aumenta la frustración si el sistema falla.

---

## 2.11 IA multimodal

La IA multimodal permite trabajar con texto, imagen, audio, vídeo y documentos visuales.

Casos posibles:

- analizar capturas de pantalla;
- interpretar facturas;
- revisar interfaces;
- describir imágenes;
- extraer datos de documentos escaneados;
- analizar gráficos;
- crear contenido visual;
- asistir en soporte técnico;
- revisar diseños;
- entender pizarras, planos o diagramas.

La multimodalidad es especialmente importante porque muchas empresas no tienen sus datos perfectamente estructurados.

Tienen fotos, PDFs, escaneos, pantallazos, audios y vídeos.

La IA puede ayudar a convertir ese caos en información utilizable.

Pero, de nuevo, hay que validar.

Un modelo puede interpretar mal una imagen.  
Un OCR puede extraer mal una cifra.  
Un gráfico puede ser ambiguo.  
Una captura puede carecer de contexto.

En aplicaciones críticas, la multimodalidad debe ser asistiva, no autoridad final.

---

## 2.12 Edge AI y sistemas físicos

Edge AI significa ejecutar inteligencia cerca del lugar donde se produce la acción.

No todo tiene que ocurrir en la nube.

Casos:

- cámaras en instalaciones;
- sensores en agricultura;
- dispositivos industriales;
- Raspberry Pi;
- mini-PCs;
- robots simples;
- control remoto;
- monitorización ambiental;
- sistemas de voz locales;
- alertas automáticas.

Un sistema edge puede combinar:

- sensores;
- cámara;
- micrófono;
- conexión 4G;
- modelo pequeño local;
- API cloud para tareas complejas;
- reglas deterministas;
- alertas;
- panel de control.

Ejemplo conceptual:

```text
sensor/cámara → dispositivo edge → modelo local pequeño → alerta o consulta cloud → acción humana
```

El objetivo no siempre es tener un modelo enorme en el borde.

A veces basta con detectar eventos, resumir información, activar alertas o permitir una interfaz de voz.

---

## 2.13 Herramientas para programadores

Uno de los usos más extendidos de la IA es ayudar a crear software.

Herramientas como ChatGPT, Claude, Codex, Cursor, Claude Code, Grok, Gemini o Lovable pueden acelerar:

- generación de código;
- refactorización;
- explicación de errores;
- creación de tests;
- documentación;
- diseño de arquitectura;
- migraciones;
- creación de interfaces;
- revisión de seguridad;
- generación de scripts;
- prototipado rápido.

Pero hay una diferencia entre pedir código y dirigir un proceso de desarrollo asistido.

Un ingeniero debe saber:

- dividir tareas;
- escribir instrucciones;
- controlar contexto;
- revisar cambios;
- exigir tests;
- evitar reescrituras innecesarias;
- mantener estructura;
- usar Git;
- proteger secretos;
- validar dependencias;
- no aceptar código sin entenderlo.

La IA puede multiplicar la velocidad de desarrollo.

También puede multiplicar deuda técnica si se usa sin control.

---

## 2.14 Sistemas educativos generados con IA

La educación es un campo especialmente interesante.

La IA puede ayudar a:

- generar lecciones;
- adaptar nivel;
- crear ejercicios;
- explicar conceptos;
- generar audios;
- crear tests;
- corregir respuestas;
- simular conversaciones;
- crear materiales descargables;
- generar itinerarios;
- actualizar contenidos.

Pero la educación exige calidad.

No basta con producir mucho.

Un sistema educativo con IA debe cuidar:

- precisión;
- progresión pedagógica;
- nivel;
- evaluación;
- diversidad de ejercicios;
- revisión humana;
- accesibilidad;
- motivación;
- alineación curricular;
- actualización.

La IA puede producir materiales a gran escala, pero alguien debe diseñar el sistema que controla esa producción.

Ahí vuelve a aparecer la ingeniería.

---

## 2.15 Sistemas jurídicos asistidos

El sector legal trabaja con lenguaje, documentos, versiones, citas, plazos y riesgo.

Por eso parece un campo natural para IA.

Casos posibles:

- búsqueda en contratos;
- resumen de expedientes;
- comparación de cláusulas;
- extracción de obligaciones;
- detección de riesgos;
- generación de borradores;
- consulta de normativa;
- preparación de informes;
- organización documental.

Pero también es un campo delicado.

Un sistema jurídico no puede inventar.

Debe citar.  
Debe mostrar fuentes.  
Debe permitir revisión.  
Debe distinguir entre resumen y asesoramiento.  
Debe controlar permisos.  
Debe respetar confidencialidad.  
Debe dejar claro su límite.

Aquí la IA debe ser asistente, no sustituto irresponsable.

Un buen producto legal con IA no promete “abogado automático”.

Promete reducir tiempo documental y mejorar acceso a información verificable.

---

## 2.16 Sistemas sanitarios asistidos

La salud es otro campo donde la IA puede aportar valor, pero con muchísimo cuidado.

Casos posibles:

- ayuda a profesionales;
- triaje asistido;
- resumen de historial;
- estructuración de síntomas;
- generación de informes;
- transcripción de voz;
- consulta de protocolos;
- priorización orientativa;
- educación sanitaria supervisada.

La clave es que el usuario objetivo y el nivel de responsabilidad estén muy claros.

No es lo mismo una app para pacientes que un sistema para profesionales.

No es lo mismo educación general que triaje.

No es lo mismo resumir información que sugerir decisiones clínicas.

En salud, la IA debe diseñarse con:

- supervisión profesional;
- trazabilidad;
- límites claros;
- privacidad;
- seguridad;
- validación;
- cumplimiento normativo;
- lenguaje prudente.

La IA puede ayudar, pero el coste de equivocarse puede ser alto.

---

## 2.17 IA para administración pública

Las administraciones tienen grandes oportunidades de mejora con IA, especialmente en acceso a información.

Casos posibles:

- chatbot ciudadano;
- consulta de trámites;
- búsqueda de normativa;
- resumen de documentos públicos;
- ayuda a funcionarios;
- clasificación de solicitudes;
- generación de borradores;
- atención multilingüe;
- accesibilidad;
- análisis de expedientes.

Pero también hay riesgos:

- respuestas incorrectas con apariencia oficial;
- sesgos;
- datos personales;
- falta de trazabilidad;
- dependencia de proveedores;
- opacidad;
- errores en procedimientos;
- exclusión digital.

Para administración pública, un buen sistema IA debe ser especialmente prudente:

- fuentes citadas;
- límites visibles;
- escalado a humano;
- logs;
- transparencia;
- privacidad;
- accesibilidad;
- revisión institucional.

El objetivo no debe ser sustituir la responsabilidad pública, sino mejorar el acceso y la eficiencia.

---

## 2.18 IA para PYMEs

Las PYMEs no suelen necesitar discursos sobre transformación digital.

Necesitan resolver problemas concretos.

Ejemplos:

- responder más rápido;
- encontrar documentos;
- generar presupuestos;
- organizar leads;
- automatizar emails;
- resumir llamadas;
- crear contenido;
- revisar facturas;
- clasificar incidencias;
- consultar normativa;
- mejorar atención al cliente.

La oportunidad está en ofrecer soluciones pequeñas, útiles y mantenibles.

No hace falta empezar con un sistema multiagente complejo.

A veces el mejor primer proyecto es:

- un asistente documental;
- un clasificador de emails;
- un generador de respuestas supervisadas;
- un chatbot interno;
- un flujo de extracción de datos;
- una integración con n8n;
- un RAG privado;
- una plantilla de informes.

El valor está en el ahorro real.

Si una solución ahorra 5 horas semanales a una empresa pequeña, ya puede justificar inversión.

---

## 2.19 Laboratorios de implementación real

Una idea especialmente importante para el futuro es la necesidad de laboratorios de implementación real de IA.

No laboratorios académicos.

No informes genéricos.

Laboratorios que prueben:

- qué herramientas funcionan;
- para qué sectores;
- con qué costes;
- bajo qué condiciones;
- con qué hardware;
- con qué datos;
- con qué riesgos;
- con qué mantenimiento;
- con qué ROI.

La pregunta importante no es solo:

> ¿Qué puede hacer la IA?

La pregunta útil es:

> ¿Qué funciona, para quién, cuánto cuesta y bajo qué condiciones?

Ese tipo de análisis es especialmente valioso para PYMEs y profesionales que no pueden permitirse grandes experimentos fallidos.

Este libro puede funcionar también como base para ese tipo de laboratorio.

Cada capítulo, caso práctico, checklist y tabla viva puede convertirse en una pieza de conocimiento acumulado.

---

## 2.20 Productos que no conviene crear

No todo lo que se puede crear debe crearse.

Hay ideas peligrosas, inmaduras o poco responsables.

Ejemplos:

- agentes que ejecutan acciones críticas sin supervisión;
- sistemas médicos dirigidos a pacientes sin control profesional;
- asesoramiento legal automático sin revisión;
- automatización de despidos o decisiones sensibles;
- chatbots oficiales sin fuentes;
- sistemas que procesan datos personales sin garantías;
- modelos locales vendidos como equivalentes a modelos frontier;
- productos que prometen precisión sin evaluación;
- asistentes que ocultan incertidumbre;
- herramientas que no registran acciones.

Una parte importante de construir con IA es saber decir que no.

No a un caso de uso.

No a un nivel de autonomía.

No a una promesa comercial.

No a una arquitectura insegura.

No a una automatización prematura.

La credibilidad técnica también se construye con límites.

---

## 2.21 Cómo elegir un buen caso de uso

Un buen caso de uso de IA suele cumplir varias condiciones:

- hay una tarea repetitiva o frecuente;
- el lenguaje natural tiene un papel importante;
- hay documentos o datos disponibles;
- el resultado puede revisarse;
- el error no es catastrófico;
- el ahorro es medible;
- el usuario entiende el valor;
- la integración es viable;
- la privacidad puede gestionarse;
- el mantenimiento es razonable.

Una mala señal es cuando el caso de uso depende de que el modelo sea perfecto.

Otra mala señal es cuando nadie sabe cómo medir el éxito.

Otra mala señal es cuando el sistema necesita acceso a demasiadas herramientas desde el primer día.

Otra mala señal es cuando el cliente quiere automatizar un proceso que ni siquiera tiene bien definido.

La IA amplifica procesos.

Si el proceso es caótico, puede amplificar el caos.

---

## 2.22 Matriz simple de oportunidad

Una forma práctica de evaluar ideas es usar una matriz impacto/esfuerzo.

```text
                    ESFUERZO
                Bajo        Alto
IMPACTO Alto    Priorizar   Proyecto estratégico
        Bajo    Automatizar si es fácil   Evitar
```

Ejemplos:

### Alto impacto + bajo esfuerzo

- resumir emails;
- generar respuestas supervisadas;
- consultar documentación interna bien ordenada;
- crear borradores de informes;
- clasificar tickets.

Estos son buenos candidatos iniciales.

### Alto impacto + alto esfuerzo

- agente multi-herramienta;
- RAG complejo con permisos;
- sistema sanitario asistido;
- automatización de procesos legacy;
- plataforma educativa completa.

Pueden merecer la pena, pero requieren proyecto serio.

### Bajo impacto + bajo esfuerzo

- pequeñas utilidades internas;
- generación de textos simples;
- automatizaciones personales.

Pueden hacerse si no distraen.

### Bajo impacto + alto esfuerzo

- sistemas demasiado complejos para un problema pequeño;
- agentes autónomos sin necesidad;
- fine-tuning innecesario;
- infra local excesiva.

Mejor evitarlos.

---

## 2.23 Una clasificación práctica de productos IA

Podemos clasificar los productos IA en cinco grandes grupos.

### 1. Productos de conversación

- chatbots;
- asistentes;
- copilotos;
- agentes de voz.

### 2. Productos documentales

- RAG;
- búsqueda semántica;
- análisis de contratos;
- asistentes de conocimiento.

### 3. Productos de automatización

- workflows;
- tool calling;
- agentes;
- integración con herramientas.

### 4. Productos de generación

- contenido;
- código;
- informes;
- educación;
- diseño.

### 5. Productos de decisión asistida

- clasificación;
- priorización;
- análisis de riesgo;
- recomendaciones;
- triaje supervisado.

Cada grupo tiene riesgos distintos, métricas distintas y arquitecturas distintas.

---

## 2.24 De la idea al primer prototipo

Cuando encuentres una idea, no empieces por construir todo.

Empieza por reducir.

Preguntas útiles:

- ¿Cuál es el flujo mínimo?
- ¿Cuál es la entrada?
- ¿Cuál es la salida?
- ¿Qué datos necesita?
- ¿Qué parte puede hacer el modelo?
- ¿Qué parte debe ser determinista?
- ¿Dónde debe revisar un humano?
- ¿Qué error sería aceptable?
- ¿Qué error sería inaceptable?
- ¿Cómo sabré si funciona?

Un primer prototipo debería demostrar una sola cosa:

> Que la IA mejora un flujo concreto.

No tiene que tener la arquitectura final.

Pero sí debe evitar prometer más de lo que demuestra.

---

## 2.25 Ideas clave del capítulo

- La IA permite crear mucho más que chatbots.
- Los mejores productos IA combinan modelos, datos, contexto, herramientas y flujos claros.
- Los asistentes documentales y RAG privados son casos muy sólidos para empresas.
- Los agentes son potentes, pero deben limitarse y supervisarse.
- La voz, la multimodalidad y el edge abren nuevas interfaces.
- Las PYMEs necesitan soluciones pequeñas, útiles y medibles.
- No todo debe automatizarse.
- Un buen caso de uso debe tener impacto claro, datos disponibles y riesgo controlado.
- El valor no está en usar IA, sino en mejorar un proceso real.
- La mejor pregunta no es “qué puedo hacer con IA”, sino “qué problema concreto puedo resolver mejor con IA”.

---

## 2.26 Checklist práctica

Antes de elegir un caso de uso, revisa:

- ¿Existe un usuario real?
- ¿La tarea ocurre con frecuencia?
- ¿Hay ahorro claro de tiempo, coste o esfuerzo?
- ¿La entrada es texto, voz, imagen, documento o datos estructurados?
- ¿Hay fuentes disponibles?
- ¿El resultado puede verificarse?
- ¿Necesita citas?
- ¿Necesita permisos?
- ¿Necesita herramientas externas?
- ¿Puede empezar con humano en el loop?
- ¿Qué pasa si el modelo se equivoca?
- ¿Se puede medir calidad?
- ¿Se puede medir ROI?
- ¿Es mejor local, cloud o híbrido?
- ¿El mantenimiento es asumible?
- ¿Hay riesgo legal, médico, financiero o reputacional?
- ¿Es una demo, un MVP o un producto?

---

## 2.27 Qué puede cambiar en el futuro

Este capítulo deberá actualizarse a medida que evolucionen:

- modelos multimodales;
- agentes con herramientas;
- protocolos como MCP;
- modelos locales;
- capacidades de voz;
- hardware edge;
- regulación;
- frameworks de automatización;
- casos de uso empresariales;
- expectativas de los usuarios.

Pero probablemente se mantendrá una idea central:

> La IA será más útil cuanto mejor se conecte con problemas reales, datos reales y flujos reales.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 3 — La diferencia entre jugar con IA y construir con IA
- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 21 — Chatbots modernos
- Capítulo 24 — Qué es un agente de IA
- Capítulo 29 — Agentes de voz
- Capítulo 32 — Por qué IA local
- Capítulo 35 — IA para PYMEs
- Capítulo 36 — AI Assessment
- Capítulo 38 — Laboratorios de implementación real de IA
