---
title: "Capítulo 7 — Modelos locales"
chapter: "08"
part: "Parte II — Fundamentos prácticos de LLMs"
version: "0.1"
last_updated: "2026-06-02"
status: "muy cambiante"
level: "básico-intermedio"
estimated_reading_time: "38 minutos"
---

# Capítulo 7 — Modelos locales

Ejecutar modelos de lenguaje en local es una de las áreas más importantes de la IA aplicada.

No porque todo deba ejecutarse en local.

No porque los modelos locales sean siempre mejores que los modelos propietarios.

No porque la nube deje de tener sentido.

Sino porque los modelos locales cambian la relación entre inteligencia artificial, privacidad, coste, control y producto.

Durante los primeros años de adopción masiva de LLMs, la mayoría de aplicaciones dependían de APIs externas. Era lógico: los mejores modelos estaban en manos de grandes proveedores, la infraestructura era compleja y la forma más rápida de construir era llamar a una API.

Pero el ecosistema open weights y las herramientas de inferencia local han madurado mucho.

Hoy es posible ejecutar modelos útiles en un portátil, un Mac mini, una workstation, un servidor propio, un mini-PC, una GPU de consumo o incluso dispositivos edge para tareas pequeñas.

Esto abre una pregunta nueva:

> ¿Qué partes de mi sistema IA deberían ejecutarse en mi propia infraestructura?

Este capítulo trata de eso.

No de defender local contra cloud.

Sino de entender cuándo, cómo y por qué usar modelos locales.

---

## 7.1 Qué es un modelo local

Un modelo local es un modelo que ejecutas en hardware controlado por ti o por tu organización.

Puede ejecutarse en:

- tu portátil;
- un Mac mini;
- un PC con GPU;
- un servidor propio;
- una workstation;
- una máquina on-premise en una empresa;
- un mini-PC;
- un dispositivo edge;
- una infraestructura privada.

Lo importante no es si el dispositivo está físicamente debajo de tu mesa.

Lo importante es que no dependes de enviar cada petición a una API externa para que el modelo genere la respuesta.

Tienes más control sobre:

- datos;
- ejecución;
- costes;
- versiones;
- disponibilidad;
- red;
- privacidad;
- experimentación.

Pero también asumes más responsabilidad.

---

## 7.2 Por qué interesan los modelos locales

Los modelos locales interesan por varias razones.

### Privacidad

Puedes evitar enviar datos sensibles a terceros.

Esto es importante para:

- despachos jurídicos;
- clínicas;
- PYMEs;
- administraciones;
- educación;
- datos personales;
- propiedad intelectual;
- documentación interna.

### Coste variable bajo

Una vez comprado el hardware, cada inferencia no tiene coste por token externo.

Esto puede ser interesante si el volumen es alto o si quieres experimentar mucho.

### Independencia

Reduces dependencia de proveedores.

Si una API cambia precio, modelo o política, sigues teniendo una base propia.

### Offline

Puedes operar sin conexión o con conectividad limitada.

### Control

Puedes fijar versión de modelo, cuantización, prompts, logs, red y acceso.

### Aprendizaje

Ejecutar modelos locales enseña mucho sobre inferencia, memoria, cuantización, latencia y arquitectura.

### Producto

Puedes vender soluciones local-first a clientes que valoran privacidad y control.

---

## 7.3 Por qué no siempre convienen

Los modelos locales también tienen límites.

### Calidad

El mejor modelo local disponible para tu hardware puede ser peor que un modelo propietario de gama alta.

### Velocidad

La inferencia puede ser lenta si el hardware no acompaña.

### Memoria

Los modelos necesitan RAM, VRAM o memoria unificada.

### Mantenimiento

Hay que instalar, actualizar, monitorizar y resolver problemas.

### Compatibilidad

No todos los modelos funcionan bien en todos los runtimes.

### Multimodalidad

Las capacidades avanzadas de visión, audio o vídeo pueden estar menos maduras en local.

### Concurrencia

Servir muchos usuarios simultáneos puede requerir infraestructura seria.

### Operación

Backups, logs, seguridad, despliegue y actualizaciones pasan a ser tu problema.

La pregunta no es:

> ¿Puedo correrlo en local?

La pregunta es:

> ¿Puedo correrlo con calidad, velocidad, seguridad y mantenimiento adecuados para este caso de uso?

---

## 7.4 Local no significa privado por defecto

Un error común es asumir que local equivale automáticamente a privado.

No siempre.

Un modelo local puede guardar logs.  
Una herramienta local puede guardar historial.  
Una interfaz puede exponer el servidor en la red.  
Una mala configuración puede abrir el puerto a Internet.  
Un plugin puede enviar datos fuera.  
Una app puede registrar prompts en texto plano.  
Un usuario puede compartir capturas o exports.

La privacidad local requiere configuración.

Buenas prácticas:

- revisar logs;
- limitar acceso a localhost o LAN segura;
- usar firewall;
- no exponer APIs sin autenticación;
- cifrar discos;
- controlar historial;
- separar usuarios;
- revisar plugins;
- documentar retención de datos;
- auditar accesos.

Ejecutar local reduce riesgos de terceros, pero no elimina riesgos internos.

---

## 7.5 Casos de uso ideales para modelos locales

Los modelos locales encajan especialmente bien en:

### Clasificación

Ejemplo: clasificar emails, tickets, documentos o intenciones.

### Extracción simple

Ejemplo: extraer campos de textos no demasiado complejos.

### RAG privado

El modelo responde usando documentos internos sin enviar datos fuera.

### Borradores internos

Generar respuestas, informes o resúmenes que revisará un humano.

### Automatización de bajo riesgo

Tareas repetitivas con validación.

### Apps personales

Notas, memoria, organización, diarios, productividad.

### Edge AI

Sistemas con conectividad limitada o necesidad de baja dependencia.

### Educación offline

Materiales y asistentes en entornos sin conectividad constante.

### Laboratorio de pruebas

Comparar modelos, prompts, cuantizaciones y arquitecturas.

### Coste controlado

Tareas de mucho volumen donde un modelo pequeño o mediano basta.

---

## 7.6 Casos donde cloud puede ser mejor

Cloud puede ser mejor cuando:

- necesitas máxima calidad;
- necesitas razonamiento avanzado;
- necesitas multimodalidad de alto nivel;
- tienes pocos usuarios;
- el coste por respuesta es aceptable;
- no quieres mantener infraestructura;
- necesitas escalar rápido;
- los datos no son sensibles;
- necesitas modelos frontier;
- necesitas soporte empresarial;
- necesitas capacidades nuevas de inmediato.

Ejemplo:

Un agente de código que debe modificar un repositorio complejo quizá merezca un modelo propietario fuerte.

Un asistente médico supervisado que requiere máxima calidad puede no ser buen candidato para un modelo local pequeño.

Un análisis multimodal avanzado puede requerir modelos cloud.

El local-first no debe convertirse en dogma.

---

## 7.7 Arquitectura híbrida

La arquitectura híbrida suele ser la opción más realista.

Ejemplo:

```text
modelo local pequeño → clasificación de intención
RAG local → recuperación de documentos sensibles
modelo cloud fuerte → razonamiento complejo sobre contexto filtrado
modelo local → borrador interno
humano → aprobación
```

Otro ejemplo:

```text
modelo local → tareas frecuentes y privadas
modelo cloud → tareas difíciles
fallback local → si la API falla
router → decide por coste, privacidad y dificultad
```

Ventajas:

- privacidad donde importa;
- calidad donde hace falta;
- coste optimizado;
- resiliencia;
- flexibilidad.

Riesgos:

- más complejidad;
- más evaluación;
- más rutas de error;
- necesidad de logging claro;
- diferencias de comportamiento entre modelos.

Híbrido es potente, pero debe diseñarse con cuidado.

---

## 7.8 Familias de herramientas para IA local

El ecosistema local puede dividirse en varias capas.

### Runtimes

Ejecutan el modelo.

Ejemplos:

- llama.cpp;
- Ollama;
- MLX;
- vLLM;
- MLC-LLM;
- ExLlamaV2;
- SGLang;
- Text Generation Inference.

### Interfaces

Permiten conversar o gestionar modelos.

Ejemplos:

- LM Studio;
- Open WebUI;
- Jan;
- AnythingLLM;
- GPT4All;
- interfaces propias.

### Gateways

Permiten exponer modelos locales con APIs compatibles o enrutar entre proveedores.

Ejemplos:

- LiteLLM;
- servidores OpenAI-compatible;
- routers propios.

### Orquestadores

Integran modelos con RAG, tools y agentes.

Ejemplos:

- LlamaIndex;
- LangChain;
- LangGraph;
- Haystack;
- frameworks propios.

### Bases de conocimiento

Permiten crear RAG local.

Ejemplos:

- pgvector;
- Qdrant;
- Chroma;
- FAISS;
- Weaviate;
- SQLite + embeddings para casos pequeños.

La herramienta adecuada depende del objetivo.

---

## 7.9 Ollama

Ollama es una de las formas más sencillas de empezar con modelos locales.

Ofrece:

- instalación sencilla;
- CLI;
- gestión de modelos;
- API local;
- integración con herramientas;
- soporte en macOS, Linux y Windows;
- ejecución de muchos modelos open weights;
- facilidad para prototipar.

Ejemplo típico:

```bash
ollama pull llama3
ollama run llama3
```

O llamada vía API local:

```bash
curl http://localhost:11434/api/generate \
  -d '{
    "model": "llama3",
    "prompt": "Resume qué es RAG en una frase."
  }'
```

Ventajas:

- muy cómodo;
- buena experiencia de desarrollador;
- ideal para empezar;
- fácil de integrar con frontends;
- útil para prototipos locales;
- compatible con muchas herramientas.

Limitaciones:

- no siempre es lo más rápido;
- abstrae detalles que a veces necesitas controlar;
- concurrencia y producción requieren cuidado;
- debes proteger el servidor si lo expones;
- dependes del catálogo y plantillas de modelos.

Uso recomendado:

- aprendizaje;
- prototipos;
- RAG local pequeño o medio;
- apps internas;
- pruebas de modelos;
- integración rápida con herramientas.

---

## 7.10 LM Studio

LM Studio es una herramienta de escritorio muy popular para ejecutar modelos locales con interfaz gráfica.

Suele ser útil para:

- probar modelos sin escribir código;
- descargar modelos;
- chatear con modelos locales;
- exponer un servidor compatible con APIs;
- experimentar con parámetros;
- enseñar IA local a usuarios no técnicos.

Ventajas:

- interfaz amigable;
- buena experiencia para explorar;
- facilita comparar modelos;
- útil en macOS, Windows y Linux;
- ayuda a usuarios no expertos.

Limitaciones:

- puede no ser ideal para producción;
- menos automatizable que un runtime puro;
- depende de interfaz gráfica;
- no sustituye una arquitectura backend.

Uso recomendado:

- exploración;
- demos;
- pruebas locales;
- formación;
- selección inicial de modelos.

---

## 7.11 llama.cpp

llama.cpp es una de las piezas fundamentales de la IA local moderna.

Permite ejecutar modelos en CPU y GPU con gran eficiencia, especialmente usando formatos como GGUF.

Es muy importante porque:

- funciona en hardware de consumo;
- soporta muchas arquitecturas;
- permite cuantización;
- tiene comunidad enorme;
- sirve de base o inspiración para muchas herramientas;
- permite ejecutar modelos sin depender de grandes frameworks.

Ejemplo conceptual:

```bash
llama-cli -m modelo.gguf -p "Explica qué es un embedding"
```

Ventajas:

- eficiente;
- flexible;
- muy extendido;
- ideal para GGUF;
- útil en CPU, GPU y Apple Silicon;
- gran ecosistema.

Limitaciones:

- más técnico;
- requiere entender parámetros;
- modelos nuevos pueden requerir versiones recientes;
- compatibilidad cambia rápido;
- producción requiere más trabajo.

Uso recomendado:

- usuarios técnicos;
- experimentación profunda;
- despliegues controlados;
- benchmarking;
- integración propia;
- sistemas ligeros.

---

## 7.12 GGUF

GGUF es un formato de archivo muy usado para modelos locales compatibles con llama.cpp y herramientas relacionadas.

Un archivo GGUF contiene pesos y metadatos del modelo en un formato adecuado para inferencia local.

Suele aparecer con nombres como:

```text
modelo-Q4_K_M.gguf
modelo-Q5_K_M.gguf
modelo-Q8_0.gguf
```

La parte final suele indicar cuantización.

Ejemplos:

- Q4: menor tamaño, menor memoria, posible pérdida de calidad;
- Q5: más calidad, más memoria;
- Q8: más cercano a precisión alta, más pesado.

GGUF es muy práctico porque permite descargar un solo archivo y ejecutarlo con herramientas compatibles.

Pero hay que vigilar:

- arquitectura soportada;
- versión de llama.cpp;
- chat template;
- tokenizer;
- contexto;
- cuantización;
- compatibilidad con tu runtime.

Un GGUF moderno puede no funcionar en una versión antigua del runtime.

Actualizar herramientas es parte del mantenimiento local.

---

## 7.13 MLX

MLX es un framework de Apple orientado a machine learning en Apple Silicon.

En IA local es especialmente interesante porque aprovecha la memoria unificada de Apple Silicon y permite ejecutar modelos de forma eficiente en Macs modernos.

Ventajas:

- buen rendimiento en Apple Silicon;
- integración natural con hardware Apple;
- útil para modelos optimizados en MLX;
- interesante para Mac mini, MacBook Pro y Mac Studio;
- buena opción para entornos local-first en Mac.

Limitaciones:

- centrado en ecosistema Apple;
- no sustituye a todos los runtimes;
- requiere modelos convertidos o compatibles;
- ecosistema cambiante.

Uso recomendado:

- desarrollo en Mac;
- laboratorios locales;
- productos internos en Apple Silicon;
- inferencia privada;
- comparación con Ollama/llama.cpp.

---

## 7.14 vLLM

vLLM está orientado a servir modelos de forma eficiente, especialmente en entornos con GPU y concurrencia.

Es más relevante para servidores que para pruebas personales.

Ventajas:

- alto rendimiento;
- batching;
- serving multiusuario;
- API compatible con OpenAI en muchos despliegues;
- útil para producción;
- buena opción con GPUs NVIDIA.

Limitaciones:

- requiere más conocimientos;
- infraestructura más compleja;
- más orientado a servidores;
- no es la vía más sencilla para empezar.

Uso recomendado:

- producción;
- múltiples usuarios;
- servidores con GPU;
- APIs internas;
- despliegues empresariales;
- cargas concurrentes.

---

## 7.15 Text Generation Inference y SGLang

Text Generation Inference y SGLang son opciones relevantes para servir modelos en entornos más avanzados.

Se usan cuando importan:

- rendimiento;
- concurrencia;
- serving;
- batching;
- APIs;
- control de despliegue;
- optimización;
- integración con infraestructura.

No suelen ser el punto de entrada para un principiante.

Pero son importantes si el proyecto pasa de laboratorio a producción.

Regla práctica:

```text
Probar en local → Ollama / LM Studio / llama.cpp
Optimizar en Mac → MLX / llama.cpp
Servir a usuarios → vLLM / TGI / SGLang
```

---

## 7.16 Open WebUI

Open WebUI es una interfaz web popular para trabajar con modelos locales o remotos.

Puede conectarse a Ollama y otros backends.

Permite:

- interfaz tipo chat;
- usuarios;
- modelos;
- herramientas;
- documentos;
- configuración;
- experiencia más cercana a producto.

Es útil para:

- demos internas;
- laboratorios;
- equipos;
- pruebas con usuarios;
- frontends rápidos para modelos locales.

Pero conviene recordar:

Una interfaz no es toda la arquitectura.

Si quieres un producto serio, deberás revisar autenticación, permisos, logs, seguridad, RAG, backups y despliegue.

---

## 7.17 AnythingLLM

AnythingLLM es una herramienta interesante para asistentes documentales y RAG local o privado.

Puede ser útil para:

- cargar documentos;
- crear workspaces;
- consultar información;
- conectar modelos;
- montar demos empresariales;
- validar casos de uso;
- comparar con soluciones propias.

Ventajas:

- acelera pruebas de RAG;
- accesible;
- útil para PYMEs;
- permite demostrar valor rápido.

Limitaciones:

- puede no encajar con todos los productos;
- personalización limitada frente a arquitectura propia;
- hay que revisar seguridad, privacidad y mantenimiento;
- no sustituye evaluación seria.

Uso recomendado:

- validación;
- demos;
- pilotos;
- pequeñas instalaciones;
- comparación contra soluciones a medida.

---

## 7.18 Modelos locales para RAG

En RAG local, el sistema puede mantener documentos, embeddings y generación dentro de infraestructura propia.

Componentes:

```text
documentos
  ↓
extracción
  ↓
chunks
  ↓
embeddings locales o privados
  ↓
vector database local
  ↓
modelo local
  ↓
respuesta con citas
```

Ventajas:

- privacidad;
- control;
- coste predecible;
- instalación on-premise;
- independencia;
- posibilidad de funcionar en LAN.

Retos:

- calidad del modelo;
- calidad de embeddings;
- extracción de PDFs;
- velocidad;
- memoria;
- mantenimiento;
- evaluación;
- permisos;
- actualización documental.

En RAG, el modelo local no tiene que saberlo todo.

Debe saber usar bien el contexto recuperado.

Esto hace que modelos medianos puedan ser útiles si el retrieval es bueno y la tarea está bien limitada.

---

## 7.19 Embeddings locales

También puedes ejecutar embeddings en local.

Ventajas:

- privacidad;
- coste variable bajo;
- independencia;
- control de modelo;
- coherencia con RAG local.

Riesgos:

- menor calidad que algunos embeddings comerciales;
- necesidad de benchmarking;
- mayor carga local;
- compatibilidad;
- actualización de vectores si cambias modelo.

Modelos de embeddings locales pueden ser muy suficientes para muchos casos empresariales.

Pero deben probarse con consultas reales.

No todos los embeddings funcionan igual en español, legal, médico, técnico o documentos administrativos.

---

## 7.20 Rerankers locales

Un reranker local reordena resultados recuperados antes de pasarlos al LLM.

Puede mejorar mucho RAG.

Flujo:

```text
consulta → búsqueda inicial → 30 chunks → reranker local → top 5 → modelo
```

Ventajas:

- mejora relevancia;
- reduce ruido;
- puede ejecutarse privado;
- permite usar menos contexto final.

Riesgos:

- añade latencia;
- consume recursos;
- requiere evaluación;
- no arregla documentos mal troceados.

En muchos RAG, un buen reranker local puede aportar más que cambiar a un modelo generador más grande.

---

## 7.21 Modelos locales para código

Los modelos locales de código pueden ser útiles para:

- autocompletado;
- explicación de código;
- generación simple;
- revisión ligera;
- documentación;
- scripts;
- tareas privadas;
- repos que no quieres enviar fuera.

Pero para tareas complejas multi-archivo, los modelos propietarios fuertes todavía pueden superar a muchos setups locales según hardware y modelo.

Estrategia realista:

```text
modelo local → tareas simples y privadas
modelo propietario fuerte → refactors complejos o agentes avanzados
humano → revisión final
```

---

## 7.22 Modelos locales para voz

La voz local puede dividirse en:

- speech-to-text;
- text-to-speech;
- voice activity detection;
- diarización;
- modelos conversacionales;
- wake words;
- procesamiento de audio.

Ejemplos de uso:

- asistentes offline;
- transcripción privada;
- dictado;
- educación;
- agentes en edge;
- interfaces para dispositivos físicos.

Retos:

- latencia;
- calidad de micrófono;
- ruido;
- acentos;
- consumo;
- memoria;
- sincronización entre STT, LLM y TTS.

La voz local es viable, pero el diseño de experiencia es exigente.

---

## 7.23 Modelos locales multimodales

Los modelos locales multimodales permiten trabajar con imágenes, documentos visuales o capturas.

Casos:

- OCR asistido;
- análisis de capturas;
- revisión de interfaces;
- interpretación de imágenes;
- documentos escaneados;
- clasificación visual.

Retos:

- más memoria;
- menor velocidad;
- compatibilidad;
- calidad inferior a modelos cloud en algunos casos;
- integración más compleja;
- validación necesaria.

Para tareas críticas con documentos visuales, conviene combinar:

- OCR especializado;
- extracción estructurada;
- modelo multimodal;
- validación;
- revisión humana.

---

## 7.24 Memoria y almacenamiento local

Un sistema local no es solo el modelo.

Necesita guardar:

- documentos;
- embeddings;
- conversaciones;
- configuraciones;
- logs;
- usuarios;
- permisos;
- feedback;
- evaluaciones;
- modelos descargados;
- backups.

Esto introduce preguntas:

- ¿dónde se guardan los modelos?
- ¿quién puede acceder?
- ¿se cifran documentos?
- ¿se guarda historial?
- ¿cómo se borran datos?
- ¿cómo se hacen backups?
- ¿cómo se actualizan embeddings?
- ¿cómo se separan clientes?
- ¿cómo se auditan consultas?

IA local no significa “sin backend”.

Al contrario: si quieres producto, necesitas arquitectura local completa.

---

## 7.25 Seguridad en local

Riesgos específicos:

- exponer servidor Ollama a Internet;
- API sin autenticación;
- historiales en texto plano;
- modelos descargados de fuentes no confiables;
- prompts con datos sensibles en logs;
- usuarios compartiendo instancia;
- permisos de archivos mal configurados;
- plugins inseguros;
- ejecución de herramientas sin sandbox.

Buenas prácticas:

- bind a localhost por defecto;
- VPN para acceso remoto;
- autenticación delante de interfaces web;
- firewall;
- TLS si hay red;
- roles;
- logs controlados;
- cifrado de disco;
- backups seguros;
- revisión de modelos descargados;
- evitar ejecutar código generado sin sandbox.

La seguridad local es responsabilidad tuya.

---

## 7.26 Cuantización

La cuantización reduce memoria y puede mejorar velocidad.

Ejemplo conceptual:

```text
modelo FP16 → alta memoria, más calidad
modelo Q8 → menor memoria, buena calidad
modelo Q5 → equilibrio
modelo Q4 → más pequeño, posible pérdida
modelo Q3/Q2 → muy compacto, más degradación
```

No hay una cuantización perfecta.

Depende de:

- modelo;
- tarea;
- hardware;
- contexto;
- idioma;
- tolerancia a error;
- velocidad necesaria.

Regla práctica:

```text
Para tareas simples, Q4 puede bastar.
Para tareas complejas, prueba Q5/Q6/Q8.
Para producción, benchmark propio.
```

No decidas solo por tamaño.

Evalúa calidad real.

---

## 7.27 Memoria necesaria

La memoria necesaria depende de:

- número de parámetros;
- cuantización;
- contexto;
- batch;
- runtime;
- KV cache;
- multimodalidad;
- concurrencia.

Regla aproximada muy simplificada:

```text
más parámetros + más contexto + más usuarios = más memoria
```

Un modelo que cabe con contexto corto puede no caber con contexto largo.

Un modelo que funciona para un usuario puede no servir para diez concurrentes.

Un modelo cuantizado puede caber, pero ser lento.

Por eso hay que probar en el hardware real.

---

## 7.28 Velocidad

La velocidad se mide a menudo en tokens por segundo.

Pero no basta.

También importa:

- time to first token;
- prefill;
- velocidad de generación;
- streaming;
- latencia de RAG;
- carga del modelo;
- concurrencia;
- longitud de contexto;
- temperatura;
- tool calls;
- red local.

Un sistema puede generar rápido pero tardar mucho en arrancar.

O responder bien con prompts cortos y mal con contexto largo.

Mide el flujo completo.

---

## 7.29 Chat templates

Muchos modelos requieren una plantilla de chat específica.

La plantilla define cómo se formatean mensajes de sistema, usuario y asistente.

Si usas mal la plantilla, el modelo puede responder peor.

Problemas típicos:

- ignorar system prompt;
- responder con tokens raros;
- no seguir instrucciones;
- mezclar roles;
- fallar en tool calling;
- generar formatos incorrectos.

Herramientas como Ollama, LM Studio o Hugging Face suelen gestionar plantillas, pero no siempre perfectamente.

Al integrar modelos locales, revisa:

- tokenizer;
- chat template;
- formato instruct;
- stop tokens;
- sistema de roles;
- compatibilidad del runtime.

---

## 7.30 Modelos locales y español

No todos los modelos locales funcionan igual de bien en español.

Evalúa:

- comprensión;
- naturalidad;
- terminología técnica;
- documentos administrativos;
- lenguaje legal;
- lenguaje médico;
- faltas de ortografía;
- mezcla inglés/español;
- instrucciones en español;
- respuestas con citas en español.

Un modelo excelente en benchmarks ingleses puede ser mediocre para una PYME española.

Para productos en español, crea dataset propio.

---

## 7.31 Cómo elegir un modelo local

Criterios:

- tarea;
- idioma;
- tamaño;
- cuantización;
- contexto;
- velocidad;
- memoria;
- licencia;
- runtime;
- comunidad;
- frecuencia de actualización;
- calidad en tu dominio;
- soporte de herramientas;
- facilidad de despliegue.

Preguntas:

- ¿qué hará el modelo?
- ¿en qué hardware?
- ¿cuántos usuarios?
- ¿qué latencia aceptas?
- ¿qué documentos usará?
- ¿requiere razonamiento?
- ¿requiere código?
- ¿requiere multimodalidad?
- ¿hay datos sensibles?
- ¿qué calidad mínima es aceptable?

No elijas por ranking.

Elige por prueba real.

---

## 7.32 Benchmark local básico

Crea un benchmark simple.

```markdown
# Benchmark local

## Hardware

- CPU:
- GPU:
- RAM/VRAM:
- Sistema:
- Runtime:
- Versión:

## Modelo

- Nombre:
- Tamaño:
- Cuantización:
- Contexto:
- Fuente:

## Tareas

- 20 preguntas generales en español
- 20 preguntas RAG
- 10 extracciones JSON
- 10 clasificaciones
- 5 tareas de código
- 5 preguntas fuera de alcance

## Métricas

- calidad humana 1-5
- tokens/s
- time to first token
- memoria usada
- coste energético aproximado
- errores de formato
- alucinaciones
- comportamiento ante “no lo sé”
```

Sin benchmark, elegirás por sensación.

---

## 7.33 Arquitectura local mínima

Un stack local mínimo para pruebas puede ser:

```text
Ollama o LM Studio
+ modelo local
+ interfaz chat
+ carpeta de documentos
```

Un stack local más serio:

```text
Ollama / llama.cpp / MLX / vLLM
+ FastAPI
+ PostgreSQL
+ pgvector o Qdrant
+ extractor de documentos
+ embeddings locales
+ reranker opcional
+ Open WebUI o frontend propio
+ logs
+ autenticación
+ backups
```

Un stack local para PYME:

```text
mini-servidor local
+ modelo local
+ RAG privado
+ interfaz web
+ usuarios y permisos
+ backups automáticos
+ acceso LAN/VPN
+ mantenimiento mensual
+ actualización trimestral de modelos
```

La diferencia entre demo local y producto local es enorme.

---

## 7.34 Local-first para PYMEs

La IA local puede ser atractiva para PYMEs porque promete:

- privacidad;
- coste predecible;
- instalación propia;
- independencia de SaaS;
- uso con documentos internos;
- control de datos;
- argumento comercial sencillo.

Pero una PYME no quiere administrar modelos.

Quiere solución.

Por tanto, una oferta local-first debe incluir:

- instalación;
- configuración;
- interfaz;
- casos de uso claros;
- formación;
- backups;
- soporte;
- actualizaciones;
- documentación;
- mantenimiento.

No vendas “un modelo local”.

Vende una solución que usa IA local para resolver un problema.

---

## 7.35 Local para administración pública

La administración pública puede valorar IA local por:

- soberanía de datos;
- privacidad;
- control;
- auditoría;
- cumplimiento;
- reducción de dependencia;
- despliegue interno;
- transparencia.

Casos:

- chatbot ciudadano con fuentes públicas;
- asistente interno para funcionarios;
- consulta normativa;
- clasificación documental;
- generación de borradores;
- accesibilidad.

Pero requiere:

- seguridad;
- trazabilidad;
- fuentes oficiales;
- actualización;
- revisión humana;
- accesibilidad;
- cumplimiento normativo;
- procesos de contratación.

IA local puede ser argumento, pero no sustituye gobierno del sistema.

---

## 7.36 Local para despachos profesionales

Despachos jurídicos, asesorías, gestorías y consultorías pueden beneficiarse mucho.

Casos:

- consultar contratos;
- resumir documentos;
- extraer obligaciones;
- comparar versiones;
- organizar expedientes;
- preparar borradores;
- buscar normativa;
- responder preguntas internas.

Ventajas:

- confidencialidad;
- control;
- menor fricción con clientes;
- instalación dedicada;
- RAG privado.

Riesgos:

- responsabilidad profesional;
- necesidad de citas;
- documentos sensibles;
- errores con consecuencias;
- actualización normativa.

Recomendación:

> Asistente documental con citas y revisión humana, no “abogado automático”.

---

## 7.37 Local para educación

Casos:

- generación de ejercicios;
- tutor local;
- corrección asistida;
- práctica de idiomas;
- contenidos offline;
- adaptación de nivel;
- resúmenes;
- audio local;
- privacidad de estudiantes.

Ventajas:

- menor coste por uso;
- privacidad;
- offline;
- personalización;
- control curricular.

Riesgos:

- errores pedagógicos;
- alucinaciones;
- calidad variable;
- sesgos;
- falta de revisión;
- dependencia excesiva.

Un sistema educativo local debe incluir revisión, evaluación y criterios pedagógicos.

---

## 7.38 Local para salud

En salud, local puede ser atractivo por privacidad.

Casos seguros:

- transcripción local;
- estructuración de notas;
- resumen para profesional;
- consulta de protocolos internos;
- generación de borradores;
- triaje asistido para profesionales.

Pero hay que ser extremadamente prudente.

Requisitos:

- uso profesional;
- trazabilidad;
- límites claros;
- revisión humana;
- privacidad;
- cumplimiento;
- evaluación;
- auditoría;
- seguridad.

No vendas diagnóstico automático.

Vende asistencia documental, estructuración y apoyo supervisado.

---

## 7.39 Local y agentes

Los agentes locales son posibles, pero tienen límites.

Un agente local puede:

- leer archivos;
- consultar base de datos local;
- usar navegador interno;
- ejecutar scripts;
- operar tools;
- trabajar con RAG privado.

Pero necesitas:

- sandbox;
- permisos;
- logs;
- límites de pasos;
- confirmación humana;
- control de coste/tiempo;
- protección de archivos;
- seguridad de tools.

Un agente local con acceso a archivos puede ser muy útil.

También puede ser peligroso.

El hecho de que sea local no lo hace automáticamente seguro.

---

## 7.40 Local y MCP

MCP permite conectar modelos o agentes con herramientas.

En local, puede conectar con:

- filesystem;
- GitHub;
- PostgreSQL;
- SQLite;
- navegador;
- documentación;
- herramientas internas;
- sistemas de archivos;
- CRMs;
- APIs locales.

Esto encaja muy bien con arquitecturas local-first.

Pero aumenta riesgos:

- credenciales;
- permisos;
- ejecución de acciones;
- exposición de datos;
- auditoría;
- servidores MCP mal configurados.

Regla:

```text
MCP local sí, pero con permisos mínimos y logs.
```

---

## 7.41 Actualización de modelos locales

Los modelos locales cambian rápido.

Actualizar puede mejorar calidad, pero también romper comportamiento.

Antes de actualizar:

- guarda modelo anterior;
- registra versión;
- ejecuta benchmark;
- revisa prompts;
- revisa templates;
- prueba RAG;
- prueba español;
- revisa latencia;
- revisa memoria;
- documenta cambio.

No actualices un modelo de producción solo porque salió uno nuevo.

Actualiza por mejora medida.

---

## 7.42 Gestión de modelos

En una instalación local puedes acabar con muchos modelos.

Problemas:

- ocupan disco;
- confunden usuarios;
- versiones duplicadas;
- cuantizaciones distintas;
- modelos no usados;
- dificultad de mantenimiento.

Buenas prácticas:

- catálogo interno;
- nombre claro;
- fecha de instalación;
- uso recomendado;
- benchmark;
- estado: activo / prueba / retirado;
- tamaño;
- licencia;
- fuente;
- responsable.

Ejemplo:

```markdown
| Modelo | Cuantización | Uso | Estado | Fecha |
|---|---|---|---|---|
| qwen-coder-32b | Q4_K_M | código | activo | 2026-06 |
| llama-70b | Q5_K_M | análisis | prueba | 2026-06 |
| phi-mini | Q8 | clasificación | activo | 2026-06 |
```

---

## 7.43 Monitorización local

También hay que monitorizar en local.

Métricas:

- CPU;
- GPU;
- RAM/VRAM;
- disco;
- temperatura;
- tokens/s;
- latencia;
- errores;
- número de peticiones;
- modelo usado;
- prompts fallidos;
- coste energético aproximado;
- uso por usuario;
- saturación.

Sin monitorización, no sabrás cuándo el sistema se vuelve lento o inestable.

---

## 7.44 Backups

Un sistema local puede guardar datos críticos.

Haz backups de:

- documentos;
- base de datos;
- embeddings si procede;
- configuraciones;
- prompts;
- usuarios;
- logs necesarios;
- evaluaciones;
- plantillas;
- scripts;
- versiones de modelo si son difíciles de recuperar.

Pero cuidado:

- los backups también contienen datos sensibles;
- deben cifrarse;
- deben probarse;
- deben tener política de retención.

Un RAG local sin backup puede perder mucho valor.

---

## 7.45 Despliegue local para cliente

Si instalas IA local en un cliente, necesitas procedimiento.

Checklist:

- hardware validado;
- sistema operativo;
- runtime;
- modelos;
- base de datos;
- interfaz;
- autenticación;
- backups;
- acceso remoto seguro;
- logs;
- firewall;
- documentación;
- formación;
- plan de mantenimiento;
- plan de actualización;
- contrato de soporte.

Esto ya no es solo IA.

Es IT.

Y eso es precisamente donde un ingeniero tiene ventaja.

---

## 7.46 Anti-patrones en modelos locales

### Vender local como si fuera magia

Local no significa mejor.

### Usar hardware insuficiente

La experiencia será mala.

### No evaluar calidad

El modelo puede parecer bueno y fallar en dominio real.

### Exponer APIs sin seguridad

Riesgo grave.

### Descargar modelos sin revisar licencia

Problema legal.

### No controlar logs

Riesgo de privacidad.

### No planificar actualizaciones

El sistema envejece.

### No tener backups

Riesgo operativo.

### Elegir cuantización solo por tamaño

Puede degradar calidad.

### No medir latencia

Producto frustrante.

### Confundir demo local con solución empresarial

Error comercial.

---

## 7.47 Ejemplo práctico: RAG local para despacho

Objetivo:

Un despacho quiere consultar contratos y expedientes sin enviar datos fuera.

Arquitectura posible:

```text
servidor local
+ almacenamiento cifrado
+ extractor PDF/DOCX
+ embeddings locales
+ Qdrant o pgvector
+ modelo local mediano
+ interfaz web con usuarios
+ respuestas con citas
+ logs auditables
+ backup cifrado
+ revisión humana
```

Decisiones:

- no prometer asesoramiento automático;
- limitar a búsqueda, resumen y citas;
- usar permisos por cliente/expediente;
- revisar calidad con preguntas reales;
- mantener humano en el loop.

Valor:

- ahorro de búsqueda;
- organización documental;
- privacidad;
- mejor preparación de borradores.

---

## 7.48 Ejemplo práctico: asistente local para PYME

Objetivo:

Una PYME quiere consultar procedimientos, presupuestos anteriores y documentación interna.

Arquitectura posible:

```text
mini-PC o Mac mini
+ Ollama
+ Open WebUI o frontend propio
+ carpeta de documentos
+ RAG local
+ usuarios internos
+ backup
+ mantenimiento mensual
```

Primeros casos de uso:

- preguntas sobre procedimientos;
- resumen de documentos;
- borradores de email;
- búsqueda de información interna;
- extracción simple.

Evitar al principio:

- agente autónomo;
- envío automático de emails;
- modificación de datos críticos;
- promesas de precisión absoluta.

---

## 7.49 Ejemplo práctico: app personal local

Objetivo:

Una app organiza notas, ideas y recordatorios.

Arquitectura posible:

```text
app local
+ modelo pequeño
+ embeddings locales
+ base de datos local
+ clasificación
+ resúmenes
+ búsqueda semántica
+ cloud opcional para tareas difíciles
```

Valor:

- privacidad;
- uso offline;
- coste bajo;
- experiencia personal;
- control de datos.

Riesgos:

- batería;
- velocidad;
- calidad limitada;
- sincronización;
- seguridad de almacenamiento.

---

## 7.50 Ideas clave del capítulo

- Los modelos locales aportan privacidad, control, independencia y coste variable bajo.
- No siempre son mejores que modelos cloud.
- Local no significa privado por defecto: hay que configurar seguridad.
- Ollama, LM Studio, llama.cpp, MLX y vLLM cubren necesidades distintas.
- GGUF y cuantización son claves para ejecutar modelos en hardware de consumo.
- La elección local depende de tarea, hardware, idioma, memoria, latencia y licencia.
- RAG local es uno de los casos más fuertes para empresas.
- Una arquitectura híbrida suele ser más realista que local vs cloud.
- Instalar IA local en clientes implica soporte, backups, seguridad y mantenimiento.
- Los modelos locales deben evaluarse con datos reales, no solo por rankings.

---

## 7.51 Checklist práctica

Antes de elegir un modelo local:

- ¿Qué tarea resolverá?
- ¿Qué datos procesará?
- ¿Hay datos sensibles?
- ¿Qué hardware tienes?
- ¿Cuánta RAM/VRAM?
- ¿Qué runtime usarás?
- ¿El modelo cabe con el contexto necesario?
- ¿Qué cuantización usarás?
- ¿Funciona bien en español?
- ¿La licencia permite tu uso?
- ¿Qué velocidad ofrece?
- ¿Cuál es el time to first token?
- ¿Cuántos usuarios habrá?
- ¿Necesitas RAG?
- ¿Necesitas embeddings locales?
- ¿Necesitas reranking?
- ¿Necesitas tools o MCP?
- ¿Hay logs?
- ¿Dónde se guarda el historial?
- ¿La API está protegida?
- ¿Hay backups?
- ¿Hay benchmark propio?
- ¿Hay plan de actualización?
- ¿Hay fallback cloud o alternativo?

---

## 7.52 Plantilla de ficha de modelo local

```markdown
# Ficha de modelo local

## Modelo

Nombre y familia.

## Fuente

Repositorio o proveedor.

## Licencia

Uso permitido.

## Tamaño

Parámetros y tamaño en disco.

## Cuantización

Q4 / Q5 / Q8 / otra.

## Runtime

Ollama / llama.cpp / MLX / vLLM / otro.

## Hardware probado

CPU, GPU, RAM/VRAM, sistema operativo.

## Rendimiento

- Tokens/s:
- Time to first token:
- Memoria usada:
- Contexto probado:

## Calidad

- Español:
- Código:
- RAG:
- Extracción:
- Razonamiento:
- Seguimiento de instrucciones:

## Uso recomendado

Tareas adecuadas.

## Limitaciones

Dónde falla.

## Estado

Activo / prueba / retirado.

## Fecha de revisión

Próxima revisión.
```

---

## 7.53 Qué puede cambiar en el futuro

Este capítulo cambiará mucho.

Cambiarán:

- modelos open weights;
- formatos;
- runtimes;
- cuantizaciones;
- rendimiento en Apple Silicon;
- rendimiento en GPUs de consumo;
- modelos multimodales locales;
- modelos de voz locales;
- herramientas como Ollama, LM Studio, llama.cpp, MLX y vLLM;
- licencias;
- hardware;
- capacidades edge;
- integración con MCP;
- estándares de despliegue local.

Lo que probablemente no cambiará:

> La decisión local/cloud debe tomarse por caso de uso, datos, coste, privacidad y mantenimiento.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 5 — Cómo elegir un modelo
- Capítulo 6 — Modelos propietarios
- Capítulo 8 — Hardware real para IA local
- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 20 — Herramientas RAG
- Capítulo 26 — MCP
- Capítulo 32 — Por qué IA local
- Capítulo 33 — Arquitectura local-first
- Capítulo 34 — Sistema híbrido local + cloud
- Capítulo 51 — Costes
- Apéndice D — Tabla viva de modelos
- Apéndice E — Tabla viva de hardware
