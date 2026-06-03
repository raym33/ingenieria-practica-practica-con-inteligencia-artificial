---
title: "Capítulo 5 — Cómo elegir un modelo"
chapter: "06"
part: "Parte II — Fundamentos prácticos de LLMs"
version: "0.1"
last_updated: "2026-06-02"
status: "cambiante"
level: "básico-intermedio"
estimated_reading_time: "32 minutos"
---

# Capítulo 5 — Cómo elegir un modelo

Elegir un modelo es una de las decisiones más visibles en cualquier proyecto de inteligencia artificial.

También es una de las decisiones que más fácilmente se sobredimensionan.

El ecosistema empuja constantemente hacia una pregunta:

> ¿Cuál es el mejor modelo?

Pero esa no suele ser la pregunta correcta.

La pregunta correcta es:

> ¿Cuál es el modelo adecuado para esta tarea, con estos datos, estos usuarios, este presupuesto, estos riesgos y esta arquitectura?

No existe un único modelo perfecto.

Hay modelos mejores para razonar.  
Modelos mejores para programar.  
Modelos mejores para resumir.  
Modelos mejores para funcionar en local.  
Modelos mejores para tareas rápidas.  
Modelos mejores para multimodalidad.  
Modelos mejores para tool calling.  
Modelos mejores por coste.  
Modelos mejores por privacidad.  
Modelos mejores por licencia.

Un ingeniero no debería elegir modelo por moda.

Debería elegirlo por ajuste al problema.

---

## 5.1 El error de empezar por el modelo

Muchos proyectos IA empiezan así:

> Vamos a usar el modelo más potente disponible.

Puede parecer lógico, pero suele ser una mala forma de empezar.

Antes de elegir modelo, deberías entender:

- qué tarea debe resolver;
- qué datos usará;
- qué nivel de precisión necesita;
- qué latencia es aceptable;
- cuántos usuarios habrá;
- qué presupuesto existe;
- qué información es sensible;
- si necesita herramientas;
- si necesita multimodalidad;
- si debe ejecutarse en local;
- cómo se evaluará el resultado.

El modelo debe venir después del caso de uso.

No antes.

Si empiezas por el modelo, puedes acabar construyendo una arquitectura cara, lenta o innecesariamente compleja.

---

## 5.2 La matriz básica de decisión

Una forma simple de evaluar modelos es usar una matriz con criterios.

```text
Modelo = calidad + coste + velocidad + privacidad + capacidades + integración
```

Criterios principales:

1. Calidad.
2. Razonamiento.
3. Código.
4. Contexto.
5. Tool calling.
6. Multimodalidad.
7. Latencia.
8. Coste.
9. Privacidad.
10. Ejecución local.
11. Licencia.
12. Estabilidad del proveedor.
13. Facilidad de integración.
14. Evaluación en tu dominio.

Cada criterio pesa de forma distinta según el caso.

Para un chatbot público, quizá importan tono, seguridad y coste.  
Para un asistente jurídico, importan citas, fidelidad y privacidad.  
Para un agente de código, importa razonamiento, tool calling y contexto.  
Para una app móvil, importan tamaño, latencia y ejecución local.  
Para una automatización interna, quizá basta un modelo pequeño y barato.

---

## 5.3 Calidad general

La calidad general mide lo bien que el modelo responde en tareas amplias.

Incluye:

- comprensión de instrucciones;
- claridad;
- coherencia;
- razonamiento;
- capacidad de síntesis;
- conocimiento general;
- adaptación al idioma;
- seguimiento de formato;
- gestión de ambigüedad.

Pero la calidad general no basta.

Un modelo puede ser excelente en conversación general y mediocre en extracción estructurada.

Puede escribir muy bien y programar regular.

Puede razonar bien pero ser lento.

Puede ser barato pero inventar demasiado.

Puede tener buen benchmark y fallar en tus documentos.

Por eso siempre hay que probar modelos en tareas reales del proyecto.

No solo en rankings.

---

## 5.4 Calidad en español

Si el producto será usado en España o Latinoamérica, la calidad en español importa.

No todos los modelos responden igual de bien en todos los idiomas.

Evalúa:

- comprensión de instrucciones en español;
- naturalidad del tono;
- terminología técnica;
- terminología legal, médica o administrativa;
- capacidad de resumir documentos españoles;
- manejo de formatos habituales;
- sensibilidad cultural;
- calidad de traducción si mezcla idiomas.

Un modelo puede parecer excelente en inglés y ser menos preciso en español.

Para un libro, una plataforma educativa, un chatbot municipal o una solución para PYMEs españolas, esto debe probarse.

No lo asumas.

---

## 5.5 Razonamiento

El razonamiento es la capacidad del modelo para resolver tareas que requieren varios pasos.

Ejemplos:

- analizar un problema técnico;
- comparar opciones;
- diseñar una arquitectura;
- detectar contradicciones;
- planificar una implementación;
- priorizar tareas;
- depurar un error;
- evaluar riesgos;
- decidir qué herramienta usar.

Los modelos de razonamiento suelen ser útiles para:

- agentes;
- arquitectura;
- programación compleja;
- análisis documental;
- toma de decisiones asistida;
- planificación de proyectos.

Pero suelen tener costes o latencias mayores.

No siempre necesitas un modelo de razonamiento avanzado.

Para clasificar emails, extraer campos o generar respuestas simples, puede bastar un modelo más pequeño.

Regla práctica:

```text
Tarea simple y repetitiva → modelo pequeño o medio
Tarea ambigua y multi-paso → modelo fuerte en razonamiento
```

---

## 5.6 Código

Si vas a usar IA para desarrollo de software, evalúa el modelo específicamente en código.

No basta con que explique bien.

Debe poder:

- entender un repositorio;
- seguir instrucciones técnicas;
- generar código mantenible;
- respetar convenciones;
- escribir tests;
- refactorizar sin romper;
- detectar errores;
- explicar cambios;
- trabajar con varios archivos;
- no inventar APIs inexistentes;
- no borrar lógica importante.

Un modelo de código debe evaluarse con tareas reales:

- arreglar un bug;
- añadir endpoint;
- crear test;
- migrar una función;
- mejorar una query;
- revisar seguridad;
- documentar un módulo;
- integrar una librería.

La métrica no es “el código parece bien”.

La métrica es:

- compila;
- pasan tests;
- respeta arquitectura;
- es mantenible;
- no introduce vulnerabilidades;
- resuelve la tarea.

---

## 5.7 Ventana de contexto

La ventana de contexto indica cuánto texto puede procesar el modelo en una llamada.

Una ventana grande es útil para:

- analizar documentos largos;
- trabajar con repositorios;
- mantener conversaciones extensas;
- usar muchos resultados RAG;
- comparar textos;
- procesar logs;
- generar informes largos.

Pero no es una solución mágica.

Problemas posibles:

- coste alto;
- latencia alta;
- pérdida de atención en partes intermedias;
- ruido;
- contradicciones;
- exceso de confianza;
- peor control de respuesta.

No elijas un modelo solo porque tenga mucho contexto.

Pregúntate:

- ¿realmente necesito enviar tanto texto?
- ¿puedo recuperar solo fragmentos relevantes?
- ¿puedo resumir antes?
- ¿puedo dividir la tarea?
- ¿puedo usar RAG?
- ¿puedo usar herramientas?

Muchas veces una buena arquitectura de contexto vence a una ventana enorme mal usada.

---

## 5.8 Tool calling

Si el modelo va a usar herramientas, el tool calling es crítico.

Evalúa si el modelo:

- llama herramientas cuando debe;
- no las llama cuando no debe;
- rellena bien argumentos;
- respeta schemas;
- interpreta resultados;
- sabe continuar después de una tool;
- pide aclaración cuando faltan datos;
- no inventa herramientas inexistentes;
- no insiste en acciones imposibles.

Tareas típicas:

- buscar documentos;
- consultar base de datos;
- crear ticket;
- enviar borrador;
- abrir issue;
- ejecutar workflow;
- recuperar datos de cliente;
- navegar;
- llamar API.

El tool calling no depende solo del modelo.

También depende de cómo diseñes las herramientas.

Una herramienta mal descrita generará malas llamadas incluso con buen modelo.

---

## 5.9 Multimodalidad

La multimodalidad importa cuando el sistema trabaja con:

- imágenes;
- capturas de pantalla;
- PDFs visuales;
- gráficos;
- audio;
- vídeo;
- documentos escaneados;
- interfaces;
- fotografías.

Evalúa:

- comprensión de imagen;
- OCR implícito;
- extracción de tablas;
- análisis de gráficos;
- descripción visual;
- razonamiento sobre capturas;
- transcripción;
- calidad de voz;
- latencia;
- coste.

No todos los modelos multimodales sirven para lo mismo.

Algunos son buenos describiendo imágenes, pero no extrayendo datos precisos.

Otros entienden documentos visuales, pero fallan con tablas.

En tareas críticas, combina multimodalidad con validación.

---

## 5.10 Latencia

La latencia puede decidir si un producto se siente útil.

No es lo mismo:

- autocompletar mientras escribes;
- responder en un chat;
- generar un informe;
- analizar cien documentos;
- ejecutar un agente con diez pasos.

Cada caso tolera una latencia distinta.

Preguntas prácticas:

- ¿el usuario espera respuesta inmediata?
- ¿puede mostrarse streaming?
- ¿puede procesarse en segundo plano?
- ¿puede dividirse en fases?
- ¿puede usarse un modelo rápido primero?
- ¿puede cachearse?
- ¿puede precalcularse parte del trabajo?

Un modelo más potente pero lento puede ser peor producto que uno algo menos capaz pero fluido.

La experiencia importa.

---

## 5.11 Coste por token

En modelos cloud, el coste suele depender de tokens.

Hay que considerar:

- tokens de entrada;
- tokens de salida;
- contexto RAG;
- historial;
- tool results;
- reintentos;
- evaluación automática;
- embeddings;
- reranking.

Un error común es calcular coste solo por una llamada simple.

Pero una interacción real puede incluir:

```text
1 llamada para clasificar intención
+ 1 búsqueda RAG
+ 1 reranker
+ 1 llamada principal al LLM
+ 1 validación
+ 1 posible reintento
```

El coste real es el flujo completo.

No solo la llamada final.

---

## 5.12 Coste total de propiedad

El coste de un modelo no es solo precio por token.

Incluye:

- desarrollo;
- integración;
- infraestructura;
- observabilidad;
- evaluación;
- almacenamiento;
- mantenimiento;
- soporte;
- revisión humana;
- gestión de errores;
- hardware local si aplica;
- consumo eléctrico;
- actualizaciones;
- dependencia de proveedor.

Para modelos locales, el coste por token puede parecer cero, pero hay otros costes:

- compra de hardware;
- configuración;
- rendimiento;
- mantenimiento;
- monitorización;
- backups;
- tiempo técnico;
- menor calidad en algunas tareas.

Compara siempre coste total, no solo precio visible.

---

## 5.13 Privacidad

La privacidad puede ser el criterio principal en algunos proyectos.

Preguntas:

- ¿el modelo recibirá datos personales?
- ¿datos médicos?
- ¿datos legales?
- ¿secretos empresariales?
- ¿contratos?
- ¿expedientes?
- ¿información de menores?
- ¿datos financieros?
- ¿propiedad intelectual?

Si la respuesta es sí, evalúa cuidadosamente:

- proveedor;
- condiciones de uso;
- retención de datos;
- región de procesamiento;
- cifrado;
- logs;
- permisos;
- posibilidad de local-first;
- arquitectura híbrida.

En algunos casos, un modelo local o una nube privada pueden ser obligatorios.

En otros, una API comercial con garantías puede ser suficiente.

Lo importante es decidirlo explícitamente.

---

## 5.14 Licencia

En modelos open weights, la licencia importa.

No todos los modelos “abiertos” pueden usarse igual.

Preguntas:

- ¿permite uso comercial?
- ¿requiere atribución?
- ¿tiene restricciones de escala?
- ¿permite fine-tuning?
- ¿permite redistribución?
- ¿permite uso en productos cerrados?
- ¿hay limitaciones geográficas?
- ¿hay restricciones por sector?

No basta con que el modelo esté en Hugging Face.

Lee la licencia.

Especialmente si vas a vender un producto.

---

## 5.15 Estabilidad del proveedor

Si usas modelos cloud, el proveedor se convierte en dependencia crítica.

Evalúa:

- disponibilidad;
- documentación;
- SDKs;
- soporte;
- cambios de precio;
- cambios de modelo;
- límites de uso;
- cumplimiento;
- regiones;
- historial de estabilidad;
- facilidad de migración;
- compatibilidad con APIs estándar.

Una estrategia razonable es evitar acoplar toda la aplicación a un único proveedor.

Herramientas de enrutamiento como LiteLLM o abstracciones propias pueden ayudar.

Pero abstraer demasiado pronto también puede añadir complejidad.

Equilibrio.

---

## 5.16 Facilidad de integración

Un modelo puede ser muy bueno, pero difícil de integrar.

Evalúa:

- API clara;
- SDKs;
- streaming;
- tool calling;
- JSON mode;
- multimodalidad;
- límites de rate;
- errores claros;
- documentación;
- compatibilidad con frameworks;
- facilidad de despliegue local;
- observabilidad.

Para un producto, la calidad de integración importa mucho.

Un modelo ligeramente inferior pero más estable y fácil de operar puede ser mejor decisión.

---

## 5.17 Modelos propietarios

Los modelos propietarios suelen destacar en:

- calidad general;
- razonamiento;
- multimodalidad;
- tool calling;
- estabilidad;
- documentación;
- soporte empresarial;
- actualizaciones frecuentes.

Son muy útiles para:

- prototipos rápidos;
- tareas complejas;
- agentes;
- análisis avanzado;
- aplicaciones con alto valor por respuesta;
- desarrollo asistido;
- multimodalidad.

Riesgos:

- coste variable;
- dependencia;
- privacidad;
- cambios de comportamiento;
- límites;
- condiciones comerciales.

No son buenos o malos por sí mismos.

Son una herramienta.

---

## 5.18 Modelos open weights

Los modelos open weights permiten ejecutar, adaptar o inspeccionar pesos bajo ciertas condiciones.

Ventajas:

- más control;
- posibilidad de ejecución local;
- independencia;
- privacidad;
- experimentación;
- adaptación;
- menor coste variable;
- comunidad.

Riesgos:

- mantenimiento;
- calidad variable;
- licencias;
- despliegue;
- optimización;
- hardware;
- menor soporte;
- necesidad de evaluación propia.

Son especialmente importantes para:

- IA local;
- investigación aplicada;
- productos privados;
- entornos con datos sensibles;
- aprendizaje técnico;
- reducción de dependencia.

---

## 5.19 Modelos locales

Elegir un modelo local añade criterios específicos:

- tamaño en parámetros;
- cuantización;
- RAM/VRAM necesaria;
- velocidad en tu hardware;
- calidad en tu idioma;
- compatibilidad con Ollama, llama.cpp, MLX o vLLM;
- soporte de contexto largo;
- licencia;
- consumo;
- estabilidad.

Un modelo local debe probarse en el hardware real donde se ejecutará.

No basta con leer benchmarks.

La experiencia depende mucho de:

- CPU;
- GPU;
- memoria;
- backend;
- cuantización;
- batch size;
- sistema operativo;
- temperatura;
- longitud del contexto;
- número de usuarios.

La pregunta práctica es:

> ¿Este modelo responde suficientemente bien, suficientemente rápido y con coste aceptable en mi hardware real?

---

## 5.20 Cuantización

La cuantización reduce el tamaño del modelo para ejecutarlo con menos memoria y más velocidad.

Ejemplos habituales:

- 8-bit;
- 6-bit;
- 5-bit;
- 4-bit;
- variantes GGUF;
- AWQ;
- GPTQ;
- EXL2;
- formatos específicos según backend.

Cuantizar implica compromisos.

Menos bits suele significar:

- menos memoria;
- más velocidad;
- posible pérdida de calidad.

No todas las tareas sufren igual.

Una cuantización agresiva puede ser aceptable para clasificación simple, pero mala para razonamiento complejo.

Regla práctica:

```text
Si la tarea es sensible o compleja, prueba varias cuantizaciones.
No asumas que Q4 siempre basta.
```

---

## 5.21 Modelos pequeños

Los modelos pequeños son cada vez más útiles.

Pueden servir para:

- clasificación;
- extracción;
- routing;
- resúmenes breves;
- moderación;
- tareas edge;
- apps móviles;
- privacidad;
- preprocesamiento;
- generación simple.

Ventajas:

- rápidos;
- baratos;
- locales;
- fáciles de desplegar;
- menor consumo;
- útiles como primera capa.

Limitaciones:

- peor razonamiento;
- menor conocimiento;
- más errores en tareas complejas;
- peor seguimiento de instrucciones largas;
- menor robustez.

No hay que despreciarlos.

Un buen sistema puede usar modelos pequeños para el 80 % de tareas simples y reservar modelos grandes para el 20 % difícil.

---

## 5.22 Modelos grandes

Los modelos grandes suelen destacar en:

- razonamiento;
- contexto;
- instrucciones complejas;
- programación;
- análisis;
- escritura de calidad;
- uso de herramientas;
- tareas ambiguas.

Pero tienen costes:

- mayor latencia;
- mayor precio;
- mayor consumo;
- más dependencia;
- más infraestructura local si se ejecutan en privado.

No uses un modelo grande por ego técnico.

Úsalo cuando el problema lo justifique.

---

## 5.23 Modelos especializados

Algunos modelos están optimizados para tareas específicas:

- código;
- embeddings;
- reranking;
- visión;
- audio;
- traducción;
- extracción;
- moderación;
- matemáticas;
- razonamiento;
- medicina;
- legal;
- español;
- edge.

Un sistema IA no tiene por qué usar un único modelo.

Ejemplo:

```text
embedding model → búsqueda
reranker → ordenación
LLM pequeño → clasificación
LLM grande → respuesta compleja
modelo de voz → transcripción
TTS → respuesta hablada
```

La arquitectura moderna tiende a composición de modelos.

No a modelo único para todo.

---

## 5.24 Estrategia multi-modelo

Una estrategia multi-modelo consiste en usar distintos modelos según tarea.

Ejemplo:

```text
Consulta simple → modelo barato
Consulta documental → modelo con buen RAG
Consulta sensible → modelo local
Consulta compleja → modelo frontier
Código → modelo especializado en programación
Clasificación → modelo pequeño
```

Ventajas:

- reduce costes;
- mejora privacidad;
- aumenta resiliencia;
- permite optimizar latencia;
- evita dependencia de un único proveedor.

Desventajas:

- más complejidad;
- más evaluación;
- más routing;
- más mantenimiento;
- más posibles diferencias de comportamiento.

Conviene implementarla cuando el producto ya lo necesita.

No siempre desde el día uno.

---

## 5.25 Routing de modelos

El routing decide qué modelo usar para cada tarea.

Puede ser:

### Manual

Reglas definidas por el desarrollador.

```text
si tarea = clasificación → modelo pequeño
si tarea = razonamiento → modelo grande
```

### Basado en intención

Primero se detecta intención, luego se elige modelo.

### Basado en coste

Se intenta resolver con modelo barato y se escala si falla.

### Basado en riesgo

Datos sensibles van a local; datos no sensibles pueden ir a cloud.

### Basado en calidad

Se compara confianza o evaluación y se decide.

Routing añade potencia, pero también complejidad.

Empieza simple.

---

## 5.26 Fallbacks

Un fallback es un plan B.

Ejemplos:

- si falla el modelo principal, usar otro;
- si la API no responde, usar modelo local;
- si RAG no encuentra fuentes, decir “no lo sé”;
- si la salida JSON falla, reintentar;
- si el agente supera pasos, parar;
- si la confianza es baja, escalar a humano.

Los fallbacks son parte esencial de producción.

Un sistema sin fallback depende de que todo funcione siempre.

Eso no es realista.

---

## 5.27 Evaluar modelos en tu caso de uso

No elijas modelos solo por benchmark.

Crea tu propio conjunto de pruebas.

Ejemplos:

### Para chatbot documental

- 50 preguntas frecuentes;
- 20 preguntas fuera de alcance;
- 20 preguntas ambiguas;
- 20 preguntas con documentos contradictorios;
- evaluación de citas;
- evaluación de “no lo sé”.

### Para código

- 10 bugs reales;
- 10 tareas de refactor;
- 10 tests;
- 5 tareas multi-archivo;
- revisión de seguridad.

### Para clasificación

- dataset etiquetado;
- precisión;
- recall;
- matriz de confusión;
- coste por clasificación.

### Para agentes

- tareas completadas;
- número de pasos;
- errores de herramienta;
- coste;
- necesidad de intervención.

Tu benchmark debe parecerse a tu producto.

---

## 5.28 Matriz práctica de puntuación

Puedes puntuar modelos del 1 al 5.

```markdown
| Criterio | Peso | Modelo A | Modelo B | Modelo C |
|---|---:|---:|---:|---:|
| Calidad general | 3 | 5 | 4 | 3 |
| Español | 4 | 4 | 5 | 3 |
| Coste | 5 | 2 | 4 | 5 |
| Latencia | 3 | 3 | 4 | 5 |
| Privacidad | 5 | 2 | 3 | 5 |
| Tool calling | 4 | 5 | 3 | 2 |
| RAG | 4 | 5 | 4 | 3 |
| Código | 2 | 5 | 3 | 2 |
```

La puntuación ponderada ayuda a discutir con criterio.

No es perfecta, pero evita decisiones impulsivas.

---

## 5.29 Recomendaciones por tipo de proyecto

### Chatbot simple

Prioriza:

- coste;
- velocidad;
- tono;
- seguridad;
- facilidad de integración.

No necesitas necesariamente el modelo más potente.

### RAG documental

Prioriza:

- fidelidad a fuentes;
- contexto;
- calidad en español;
- citas;
- bajo nivel de alucinación;
- buen comportamiento ante “no lo sé”.

### Agente con herramientas

Prioriza:

- tool calling;
- razonamiento;
- seguimiento de instrucciones;
- manejo de errores;
- coste por paso;
- observabilidad.

### App móvil

Prioriza:

- latencia;
- tamaño;
- privacidad;
- consumo;
- UX;
- posibilidad local.

### IA para PYME

Prioriza:

- coste total;
- mantenibilidad;
- privacidad;
- simplicidad;
- utilidad clara;
- soporte.

### Desarrollo de software

Prioriza:

- calidad de código;
- contexto largo;
- razonamiento;
- integración con repos;
- capacidad multi-archivo;
- generación de tests.

---

## 5.30 Cuándo usar modelo cloud

Usa cloud cuando:

- necesitas máxima calidad;
- necesitas razonamiento fuerte;
- necesitas multimodalidad avanzada;
- quieres prototipar rápido;
- no quieres gestionar infraestructura;
- los datos no son especialmente sensibles;
- el coste por uso es aceptable;
- necesitas escalabilidad inicial;
- necesitas tool calling robusto.

Cloud suele ser la mejor opción para empezar muchos proyectos.

Pero no siempre para terminarlos.

---

## 5.31 Cuándo usar modelo local

Usa local cuando:

- hay datos sensibles;
- necesitas privacidad;
- quieres coste variable bajo;
- trabajas offline;
- quieres control;
- necesitas despliegue interno;
- el caso de uso admite menor calidad;
- el volumen justifica hardware;
- quieres independencia;
- necesitas experimentar sin pagar por token.

Local suele tener sentido en:

- RAG privado;
- despachos;
- clínicas;
- PYMEs con datos internos;
- educación offline;
- automatizaciones internas;
- clasificación simple;
- edge AI.

---

## 5.32 Cuándo usar híbrido

Usa híbrido cuando:

- algunas tareas son sensibles y otras no;
- quieres reducir coste;
- necesitas calidad alta solo en casos difíciles;
- quieres fallback;
- tienes modelos locales para tareas simples;
- usas cloud para razonamiento complejo;
- quieres evitar dependencia total;
- necesitas escalabilidad gradual.

Ejemplo:

```text
modelo local pequeño → clasifica intención
RAG local → recupera documentos sensibles
modelo cloud fuerte → razona sobre contexto anonimizado
modelo local → genera borrador interno
humano → revisa y aprueba
```

Híbrido no significa complicar por complicar.

Significa asignar cada tarea al recurso adecuado.

---

## 5.33 Cuándo cambiar de modelo

Cambiar de modelo puede ser necesario, pero no debe hacerse a ciegas.

Motivos válidos:

- mejora clara de calidad;
- reducción de coste;
- mejor privacidad;
- menor latencia;
- mejor tool calling;
- proveedor más estable;
- nueva capacidad necesaria;
- licencia más adecuada;
- modelo local suficientemente bueno.

Antes de cambiar:

- ejecuta tu benchmark;
- compara coste;
- revisa prompts;
- prueba casos límite;
- mide latencia;
- revisa formato de salida;
- evalúa seguridad;
- prueba rollback.

No cambies el motor de un producto sin pruebas.

---

## 5.34 Versionado de modelos

En producción, deberías registrar qué modelo generó cada respuesta importante.

Guarda:

- proveedor;
- nombre del modelo;
- versión si existe;
- parámetros;
- prompt version;
- fecha;
- coste;
- latencia;
- documentos usados;
- tools usadas.

Esto permite auditar.

Si una respuesta fue incorrecta, necesitas saber con qué modelo, contexto y prompt se generó.

El versionado de modelos es parte de la trazabilidad.

---

## 5.35 Modelos y prompts evolucionan juntos

No todos los prompts funcionan igual en todos los modelos.

Un prompt diseñado para un modelo puede fallar en otro.

Al cambiar modelo, revisa:

- longitud de instrucciones;
- formato esperado;
- sensibilidad a ejemplos;
- idioma;
- cumplimiento de JSON;
- comportamiento con tools;
- tendencia a ser prolijo;
- tendencia a negarse;
- tendencia a inventar;
- manejo de citas.

No existe “prompt universal perfecto”.

Cada modelo tiene personalidad técnica.

---

## 5.36 Arquitectura anti-dependencia

Para reducir dependencia, puedes diseñar una capa de abstracción.

Ejemplo conceptual:

```python
class LLMProvider:
    def generate(self, messages, tools=None, response_format=None):
        pass
```

Luego implementas:

```text
OpenAIProvider
AnthropicProvider
LocalOllamaProvider
GeminiProvider
```

Ventajas:

- cambiar proveedor es más fácil;
- puedes hacer routing;
- puedes tener fallback;
- puedes probar modelos.

Riesgo:

- abstraer demasiado puede ocultar capacidades específicas;
- tool calling cambia entre proveedores;
- formatos no son idénticos;
- multimodalidad varía.

La abstracción debe ser útil, no dogmática.

---

## 5.37 Anti-patrones al elegir modelos

### Elegir por hype

“Todo el mundo habla de este modelo.”

Mala razón.

### Elegir por benchmark genérico

Los benchmarks ayudan, pero no sustituyen pruebas propias.

### Elegir el más caro

Más caro no siempre es mejor para tu tarea.

### Elegir el más barato

Barato puede salir caro si falla.

### Elegir local por ideología

Local no siempre es mejor.

### Elegir cloud por comodidad

Cloud no siempre es aceptable.

### No evaluar en español

Error grave si tus usuarios trabajan en español.

### No considerar mantenimiento

Un modelo es una dependencia viva.

### No controlar costes

El coste oculto aparece tarde.

### No planificar fallback

Todo proveedor puede fallar.

---

## 5.38 Ejemplo práctico: chatbot para una PYME

Supongamos que una PYME quiere un chatbot interno para consultar procedimientos.

Criterios:

- documentos internos;
- usuarios empleados;
- preguntas frecuentes;
- bajo riesgo;
- privacidad media;
- coste limitado;
- español;
- necesidad de citas.

Estrategia posible:

```text
Embeddings locales o baratos
+ pgvector/Qdrant
+ modelo cloud medio para respuestas
+ modelo local opcional para clasificación
+ respuestas siempre con fuentes
+ fallback a “no encontrado”
```

No hace falta empezar con un agente autónomo.

No hace falta fine-tuning.

No hace falta el modelo más caro.

La clave es buen RAG, buenas fuentes y límites claros.

---

## 5.39 Ejemplo práctico: agente de código

Supongamos que quieres usar un agente para modificar repositorios.

Criterios:

- razonamiento;
- contexto largo;
- tool calling;
- calidad de código;
- tests;
- seguridad;
- coste por tarea;
- integración con Git.

Estrategia posible:

```text
modelo fuerte en código
+ instrucciones del repo
+ ramas separadas
+ tests obligatorios
+ PR revisable
+ permisos limitados
+ no acceso a secretos
```

Aquí sí puede tener sentido usar un modelo más potente.

El coste de un bug puede superar el ahorro de usar un modelo barato.

---

## 5.40 Ejemplo práctico: app local de notas inteligentes

Supongamos una app móvil o de escritorio que organiza notas personales.

Criterios:

- privacidad alta;
- tareas simples;
- latencia razonable;
- coste bajo;
- offline deseable;
- datos personales.

Estrategia posible:

```text
modelo local pequeño
+ embeddings locales
+ clasificación automática
+ resúmenes breves
+ cloud opcional para tareas avanzadas
```

Aquí la privacidad puede pesar más que la máxima calidad.

---

## 5.41 Ideas clave del capítulo

- No existe “el mejor modelo” en abstracto.
- El modelo debe elegirse según tarea, datos, usuarios, coste y riesgo.
- Calidad general no equivale a calidad en tu caso de uso.
- Evalúa siempre en español si tus usuarios trabajan en español.
- Tool calling, contexto, latencia y privacidad pueden pesar más que el benchmark.
- Modelos pequeños son útiles para tareas simples.
- Modelos grandes deben reservarse para tareas complejas o de alto valor.
- Local y cloud no son enemigos; pueden combinarse.
- La estrategia multi-modelo puede reducir costes y mejorar resiliencia.
- Cambiar de modelo requiere evaluación, no intuición.

---

## 5.42 Checklist práctica

Antes de elegir modelo:

- ¿Cuál es la tarea principal?
- ¿Generación, clasificación, extracción, razonamiento, código, voz o visión?
- ¿Qué nivel de calidad necesita?
- ¿Qué idioma usan los usuarios?
- ¿Necesitas español excelente?
- ¿Necesitas contexto largo?
- ¿Necesitas tool calling?
- ¿Necesitas salida JSON?
- ¿Necesitas multimodalidad?
- ¿Cuál es la latencia máxima aceptable?
- ¿Cuál es el coste máximo por interacción?
- ¿Hay datos sensibles?
- ¿Debe ejecutarse localmente?
- ¿La licencia permite uso comercial?
- ¿Qué proveedor usarás?
- ¿Hay fallback?
- ¿Cómo versionarás modelo y prompts?
- ¿Cómo evaluarás calidad?
- ¿Tienes dataset de prueba?
- ¿Qué pasa si el proveedor cambia el modelo?
- ¿Qué pasa si el coste sube?
- ¿Qué pasa si el modelo falla?

---

## 5.43 Plantilla de decisión

```markdown
# Decisión de modelo

## Caso de uso

Descripción breve del flujo.

## Usuarios

Quién usará el sistema.

## Datos

Qué datos se enviarán al modelo.

## Riesgo

Bajo / Medio / Alto.

## Requisitos

- Idioma:
- Latencia:
- Coste:
- Privacidad:
- Contexto:
- Tool calling:
- Multimodalidad:
- Salida estructurada:

## Modelos candidatos

| Modelo | Tipo | Ventajas | Riesgos | Coste | Latencia | Nota |
|---|---|---|---|---:|---:|---:|

## Evaluación realizada

Dataset, tareas y resultados.

## Decisión

Modelo elegido y motivo.

## Fallback

Modelo o estrategia alternativa.

## Fecha de revisión

Próxima revisión recomendada.
```

---

## 5.44 Qué puede cambiar en el futuro

Este capítulo debe actualizarse con frecuencia.

Cambiarán:

- modelos propietarios;
- modelos open weights;
- precios;
- licencias;
- capacidades multimodales;
- tool calling;
- rendimiento local;
- hardware;
- frameworks;
- estándares de evaluación;
- regulación;
- proveedores.

Por eso el estado del capítulo es “cambiante”.

La metodología de decisión debería mantenerse.

Los nombres concretos de modelos deberán revisarse periódicamente.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 4 — LLMs para ingenieros ocupados
- Capítulo 6 — Modelos propietarios
- Capítulo 7 — Modelos locales
- Capítulo 8 — Hardware real para IA local
- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 24 — Qué es un agente de IA
- Capítulo 34 — Sistema híbrido local + cloud
- Capítulo 50 — Evaluación
- Capítulo 51 — Costes
- Apéndice D — Tabla viva de modelos
- Apéndice E — Tabla viva de hardware
