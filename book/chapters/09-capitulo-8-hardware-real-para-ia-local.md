---
title: "Capítulo 8 — Hardware real para IA local"
chapter: "09"
part: "Parte II — Fundamentos prácticos de LLMs"
version: "0.1"
last_updated: "2026-06-02"
status: "muy cambiante"
level: "básico-intermedio"
estimated_reading_time: "42 minutos"
---

# Capítulo 8 — Hardware real para IA local

Hablar de modelos locales sin hablar de hardware es quedarse a medias.

Un modelo local no vive en abstracto.

Vive en memoria.  
Consume ancho de banda.  
Genera calor.  
Usa CPU, GPU, NPU o memoria unificada.  
Necesita disco.  
Depende del runtime.  
Depende de la cuantización.  
Depende del contexto.  
Depende de cuántos usuarios lo usan a la vez.

Por eso una de las preguntas más prácticas de la IA local es:

> ¿Qué hardware necesito para ejecutar modelos útiles?

La respuesta no es única.

Depende de qué quieres hacer.

No necesitas lo mismo para clasificar emails que para ejecutar un modelo de 70B parámetros.  
No necesitas lo mismo para una app personal que para una PYME con diez usuarios.  
No necesitas lo mismo para RAG privado que para agentes de código.  
No necesitas lo mismo para texto que para visión o voz.  
No necesitas lo mismo para un laboratorio que para producción.

Este capítulo ofrece un mapa práctico para tomar decisiones.

No es una lista cerrada de compras.

Es una forma de pensar.

---

## 8.1 La regla principal: la memoria manda

En IA local, la memoria suele importar más que la potencia bruta.

Para ejecutar un modelo necesitas que los pesos del modelo y la memoria de contexto quepan en RAM, VRAM o memoria unificada.

Si no caben, el sistema puede:

- no cargar el modelo;
- hacer offloading a CPU;
- usar swap;
- volverse muy lento;
- fallar con contexto largo;
- degradar la experiencia.

En GPUs discretas, el límite principal suele ser la VRAM.

En Apple Silicon, el punto fuerte es la memoria unificada: CPU y GPU comparten un pool de memoria.

En CPU-only, usas RAM del sistema, pero la velocidad suele ser menor.

Regla práctica:

```text
Si el modelo no cabe en memoria rápida, la experiencia se degrada mucho.
```

Por eso, para IA local, muchas veces es mejor una GPU con más VRAM que una GPU más nueva pero con menos memoria.

---

## 8.2 Parámetros, bits y memoria

El tamaño de un modelo suele medirse en parámetros.

Ejemplos:

- 3B;
- 7B;
- 13B;
- 27B;
- 32B;
- 70B;
- 100B+.

Cuantos más parámetros, más memoria necesita.

Pero también importa la precisión o cuantización.

Un modelo en FP16 usa mucha más memoria que uno cuantizado a 4 bits.

Aproximación muy simplificada:

```text
memoria del modelo ≈ parámetros × bits por parámetro
```

Pero en la práctica hay que añadir:

- overhead del runtime;
- tokenizer;
- KV cache;
- contexto;
- batch;
- multimodalidad;
- concurrencia;
- sistema operativo.

Por eso no conviene calcular al límite.

Hay que dejar margen.

---

## 8.3 Cuantización y hardware

La cuantización reduce memoria.

Ejemplo conceptual:

```text
70B FP16 → enorme, difícil en hardware de consumo
70B Q8  → todavía muy grande
70B Q5  → más calidad, más memoria
70B Q4  → viable en memoria alta, con pérdida controlada
70B Q2  → cabe en menos memoria, pero puede perder mucha calidad
```

La cuantización permite ejecutar modelos más grandes en hardware limitado.

Pero no es gratis.

Puede afectar:

- razonamiento;
- seguimiento de instrucciones;
- calidad en español;
- precisión;
- estabilidad;
- formato;
- uso de herramientas.

Regla práctica:

```text
La mejor cuantización es la más pequeña que mantiene calidad suficiente para tu tarea.
```

No elijas solo por velocidad.

Prueba.

---

## 8.4 Contexto y KV cache

La memoria no depende solo del tamaño del modelo.

También depende del contexto.

Cuando el modelo procesa una conversación larga o muchos documentos RAG, necesita mantener información intermedia llamada KV cache.

Cuanto mayor es la ventana de contexto usada, más memoria se consume.

Esto significa que un modelo puede caber con 4k tokens de contexto, pero no con 32k o 128k en el mismo hardware.

Ejemplo conceptual:

```text
modelo 13B Q4 con contexto corto → cabe bien
modelo 13B Q4 con contexto enorme → puede quedarse sin memoria
```

En RAG, agentes y análisis documental, el contexto puede crecer mucho.

Por eso, al dimensionar hardware, pregunta:

- ¿qué modelo?
- ¿qué cuantización?
- ¿qué contexto real?
- ¿cuántos usuarios?
- ¿cuántas herramientas?
- ¿cuánto historial?
- ¿cuántos chunks RAG?

No dimensionas solo el modelo.

Dimensionas el flujo.

---

## 8.5 Tokens por segundo no lo es todo

La velocidad suele medirse en tokens por segundo.

Pero para producto importan varias métricas.

### Time to first token

Tiempo hasta que aparece el primer token.

Importa mucho en chat.

### Throughput

Tokens generados por segundo.

Importa en respuestas largas.

### Prefill

Tiempo de procesar el prompt de entrada.

Importa mucho con contexto largo.

### Latencia total

Tiempo completo de la interacción.

Incluye RAG, tools, red, validación, modelo y postprocesado.

### Concurrencia

Cuántas peticiones simultáneas soporta.

Un modelo puede ir bien para una persona y mal para diez.

### Estabilidad térmica

Un portátil puede ir rápido al principio y reducir rendimiento por temperatura.

Por eso, en hardware local, mide el flujo completo.

---

## 8.6 CPU

La CPU puede ejecutar modelos locales, especialmente pequeños o cuantizados.

Ventajas:

- no necesitas GPU;
- aprovecha RAM del sistema;
- útil para pruebas;
- buena compatibilidad;
- bajo coste si ya tienes equipo;
- suficiente para modelos pequeños.

Limitaciones:

- menor velocidad;
- mala experiencia con modelos grandes;
- más latencia;
- menos adecuada para usuarios concurrentes;
- puede saturar el sistema.

CPU-only puede tener sentido para:

- aprendizaje;
- modelos 1B-7B;
- clasificación batch no urgente;
- pruebas;
- edge simple;
- servidores baratos con baja demanda.

Pero para una experiencia fluida con modelos medianos o grandes, normalmente querrás GPU o Apple Silicon potente.

---

## 8.7 GPU NVIDIA

NVIDIA sigue siendo la referencia para mucho despliegue de IA local y semi-profesional.

Ventajas:

- CUDA;
- ecosistema maduro;
- vLLM;
- TensorRT;
- TGI;
- frameworks optimizados;
- buena concurrencia;
- alto rendimiento;
- comunidad enorme.

El factor clave es la VRAM.

Perfiles orientativos:

```text
8 GB VRAM  → modelos pequeños
12 GB VRAM → 7B-13B cómodos según cuantización/contexto
16 GB VRAM → 13B-20B, algunos 30B muy ajustados
24 GB VRAM → 30B cómodos, 70B con compromisos/offload
48 GB+ VRAM → 70B mucho más razonable
80 GB+ VRAM → modelos grandes y producción seria
```

Estas cifras son orientativas.

Dependen de cuantización, contexto y runtime.

Para IA local, una GPU antigua con 24 GB puede ser más útil que una nueva con 12 o 16 GB para ciertos modelos.

La VRAM manda.

---

## 8.8 RTX 3060, 3090, 4090 y 5090

En hardware de consumo, algunas GPUs se han vuelto populares para IA local.

### RTX 3060 12 GB

Ventajas:

- barata;
- 12 GB VRAM;
- suficiente para muchos 7B/13B;
- buena puerta de entrada.

Limitaciones:

- no ideal para modelos grandes;
- velocidad limitada frente a gamas altas.

### RTX 3090 24 GB

Ventajas:

- 24 GB VRAM;
- muy interesante de segunda mano;
- buena para modelos medianos;
- útil para laboratorio local.

Limitaciones:

- consumo alto;
- calor;
- hardware usado;
- requiere caja/fuente adecuadas.

### RTX 4090 24 GB

Ventajas:

- muy rápida;
- 24 GB VRAM;
- excelente para modelos medianos y cargas intensas.

Limitaciones:

- cara;
- consumo;
- sigue limitada por 24 GB para modelos muy grandes.

### RTX 5090 y generaciones nuevas

Ventajas:

- más rendimiento;
- nuevas capacidades;
- mejor eficiencia según generación.

Limitaciones:

- precio;
- disponibilidad;
- VRAM concreta del modelo;
- compatibilidad de software inicial;
- no siempre gana si la VRAM es insuficiente.

Conclusión práctica:

```text
Para LLMs, compra memoria antes que marketing.
```

---

## 8.9 AMD GPU

AMD puede ser interesante, pero históricamente ha tenido más fricción en IA local que NVIDIA.

Ventajas:

- buena relación precio/hardware en algunos casos;
- más VRAM en ciertos modelos;
- ROCm;
- Vulkan en algunas herramientas;
- alternativa a NVIDIA.

Limitaciones:

- compatibilidad más variable;
- menos soporte en algunos frameworks;
- instalación más delicada;
- rendimiento dependiente de software;
- menor ecosistema CUDA.

Uso recomendado:

- usuarios técnicos;
- Linux;
- LM Studio/Vulkan;
- pruebas concretas;
- cuando el modelo de GPU y stack estén validados.

No descartes AMD, pero verifica antes de comprar.

---

## 8.10 Apple Silicon

Apple Silicon es especialmente interesante para IA local por su memoria unificada.

En un Mac con 64, 96, 128 o más GB de memoria unificada, la GPU puede acceder a una gran cantidad de memoria sin el límite rígido de VRAM de una GPU discreta.

Ventajas:

- memoria unificada;
- eficiencia energética;
- bajo ruido;
- buen formato de escritorio;
- buen rendimiento con MLX, llama.cpp, Ollama y LM Studio;
- excelente para desarrollo;
- buena experiencia local;
- ideal para laboratorios personales y PYMEs pequeñas.

Limitaciones:

- no puedes ampliar memoria después;
- precio de RAM alto;
- menos throughput absoluto que servidores NVIDIA en muchos escenarios;
- menos opciones de producción multiusuario pesada;
- ecosistema todavía en evolución.

Apple Silicon destaca cuando quieres:

- mucha memoria en un equipo compacto;
- bajo consumo;
- privacidad;
- desarrollo local;
- RAG privado;
- modelos medianos/grandes cuantizados;
- laboratorio silencioso.

---

## 8.11 Mac mini

El Mac mini es uno de los equipos más interesantes para IA local por precio, tamaño, consumo y silencio.

Casos de uso:

- laboratorio personal;
- servidor local pequeño;
- RAG privado;
- prototipos;
- asistentes internos;
- modelos medianos según RAM;
- Open WebUI;
- Ollama;
- MLX;
- pruebas con agentes.

Puntos a considerar:

- compra toda la memoria que vayas a necesitar;
- no podrás ampliar RAM después;
- el almacenamiento interno puede ser caro;
- considera SSD externo rápido para modelos;
- revisa refrigeración si estará 24/7;
- protege acceso remoto;
- haz backups.

Configuraciones orientativas:

```text
16 GB → modelos pequeños, aprendizaje, 7B
24 GB → 7B/13B más cómodo
48 GB → modelos medianos y algunos grandes cuantizados
64 GB+ → mejor para RAG, contexto largo y modelos grandes
```

La cifra exacta depende del modelo y cuantización.

---

## 8.12 Mac Studio

El Mac Studio tiene sentido cuando necesitas más memoria, más rendimiento y uso local serio.

Casos:

- modelos grandes cuantizados;
- RAG pesado;
- desarrollo intensivo;
- laboratorio IA;
- múltiples servicios locales;
- procesamiento multimedia;
- usuarios internos;
- agentes privados;
- workloads largos.

Ventajas:

- mucha memoria unificada;
- buen rendimiento;
- bajo ruido relativo;
- eficiencia;
- formato compacto;
- buena opción para escritorio profesional.

Limitaciones:

- precio;
- no ampliable;
- menor ecosistema de serving masivo que NVIDIA;
- no siempre justifica coste para una PYME pequeña.

El Mac Studio puede ser ideal para un laboratorio personal avanzado o un pequeño servidor IA privado.

---

## 8.13 MacBook Pro

Un MacBook Pro potente permite llevar IA local contigo.

Ventajas:

- portátil;
- buena memoria unificada según configuración;
- desarrollo local;
- demos;
- pruebas;
- modelos medianos;
- batería razonable en tareas ligeras.

Limitaciones:

- thermal throttling en cargas largas;
- precio;
- no ideal como servidor 24/7;
- menos cómodo para producción local;
- depende de configuración de memoria.

Uso recomendado:

- desarrollo;
- demos a clientes;
- prototipos;
- pruebas de modelos;
- trabajo offline;
- no como servidor permanente salvo casos concretos.

---

## 8.14 Mini-PCs y NUCs

Los mini-PCs y NUCs son atractivos por precio, tamaño y consumo.

Casos:

- servidor local barato;
- automatizaciones;
- RAG ligero;
- modelos pequeños;
- servicios auxiliares;
- edge empresarial;
- n8n;
- bases de datos;
- gateway local;
- dashboards;
- OCR batch ligero.

Limitaciones:

- GPU integrada limitada;
- CPU-only lento para modelos grandes;
- RAM máxima variable;
- refrigeración;
- compatibilidad;
- menor rendimiento IA que GPUs dedicadas o Apple Silicon potente.

Un mini-PC puede ser muy útil si no intentas pedirle demasiado.

Ejemplo realista:

```text
Mini-PC 32-64 GB RAM
+ modelo 7B/13B cuantizado
+ embeddings
+ Qdrant/pgvector
+ interfaz web
+ automatizaciones internas
```

No esperes rendimiento de workstation.

---

## 8.15 Raspberry Pi y edge

Una Raspberry Pi no es una workstation de IA.

Pero puede ser muy útil en edge.

Casos:

- sensores;
- cámaras;
- monitorización;
- voz simple;
- gateway local;
- reglas deterministas;
- alertas;
- captura de datos;
- comunicación con API;
- modelos muy pequeños;
- automatización física.

Estrategia realista:

```text
Raspberry Pi → captura datos / ejecuta lógica local simple
modelo pequeño → clasificación básica
API o servidor local → análisis complejo
humano → revisión/acción
```

No intentes meter un 70B en una Raspberry.

Úsala como nodo inteligente, no como cerebro completo.

---

## 8.16 Servidores con varias GPUs

Si necesitas servir modelos grandes o muchos usuarios, puedes considerar servidores con varias GPUs.

Ventajas:

- gran rendimiento;
- concurrencia;
- modelos grandes;
- fine-tuning;
- batch;
- producción interna;
- experimentación avanzada.

Limitaciones:

- coste alto;
- consumo;
- calor;
- ruido;
- administración;
- drivers;
- refrigeración;
- red;
- seguridad;
- mantenimiento.

Esto empieza a parecerse más a infraestructura de datacenter que a laboratorio doméstico.

Para la mayoría de PYMEs, no es el primer paso.

---

## 8.17 Clúster doméstico de IA

Un clúster de varios equipos pequeños puede ser atractivo.

Ejemplo:

```text
MacBook / Mac mini principal
+ varios Mac mini auxiliares
+ PC con GPU
+ NAS
+ red local
```

Casos:

- separar tareas;
- modelos especializados;
- RAG;
- OCR;
- embeddings;
- generación de imágenes;
- automatizaciones;
- pruebas distribuidas;
- laboratorio personal.

Ventajas:

- modular;
- escalable poco a poco;
- aprovecha hardware existente;
- resiliencia;
- aprendizaje.

Limitaciones:

- complejidad;
- red;
- coordinación;
- despliegue;
- logs;
- consumo;
- mantenimiento;
- actualizaciones.

Un clúster doméstico es útil para aprender y experimentar.

Para producto, debe simplificarse o industrializarse.

---

## 8.18 Red local

La red importa más de lo que parece.

Si varios equipos colaboran, necesitas:

- Ethernet estable;
- preferiblemente 2.5GbE o más si mueves muchos datos;
- IPs fijas o DNS local;
- firewall;
- segmentación;
- VPN si hay acceso remoto;
- evitar exponer servicios IA a Internet sin protección.

Casos donde la red importa:

- RAG con documentos en NAS;
- varios nodos de inferencia;
- agentes que llaman herramientas;
- bases de datos separadas;
- backups;
- dashboards;
- streaming de audio/vídeo.

Para un laboratorio simple, 1GbE puede bastar.

Para mover modelos, documentos y tráfico pesado, más velocidad ayuda.

---

## 8.19 Almacenamiento

Los modelos ocupan mucho disco.

Además, un sistema IA puede guardar:

- documentos;
- embeddings;
- bases vectoriales;
- logs;
- conversaciones;
- backups;
- datasets;
- imágenes;
- audio;
- vídeo;
- checkpoints;
- modelos duplicados.

Recomendaciones prácticas:

- SSD rápido para modelos activos;
- suficiente espacio libre;
- separar datos y sistema si puedes;
- backups externos;
- cifrado para datos sensibles;
- limpieza periódica de modelos no usados;
- cuidado con discos externos lentos;
- NAS para almacenamiento, no siempre para inferencia.

Un modelo puede tardar mucho en cargar desde almacenamiento lento.

---

## 8.20 Consumo eléctrico

El consumo importa si el sistema estará 24/7.

Comparar hardware solo por precio de compra es incompleto.

Costes:

- electricidad;
- calor;
- ruido;
- refrigeración;
- fuente de alimentación;
- desgaste;
- espacio.

Un PC con GPUs puede ser muy potente, pero consumir mucho.

Un Mac mini puede ser menos potente, pero muy eficiente.

Un mini-PC puede ser suficiente para tareas ligeras.

La elección depende del caso.

Para una PYME, bajo ruido y bajo consumo pueden importar más que rendimiento extremo.

---

## 8.21 Ruido y calor

Esto parece secundario hasta que el equipo está en una oficina.

Un servidor ruidoso puede ser inviable en un despacho.

Una GPU potente puede generar mucho calor.

Un portátil puede reducir rendimiento por temperatura.

Un mini-PC puede hacer thermal throttling.

Preguntas:

- ¿dónde estará físicamente?
- ¿quién lo escuchará?
- ¿tiene ventilación?
- ¿funcionará en verano?
- ¿estará 24/7?
- ¿hay SAI?
- ¿hay mantenimiento físico?

El hardware local no es solo benchmark.

Es instalación.

---

## 8.22 SAI y continuidad

Si el sistema da servicio real, considera un SAI.

Un corte de luz puede:

- corromper base de datos;
- interrumpir procesos;
- perder logs;
- afectar backups;
- dejar sin servicio;
- dañar experiencia.

Para sistemas locales en empresas:

- SAI básico;
- apagado controlado;
- backups;
- monitorización;
- recuperación;
- documentación.

No hace falta sobredimensionar.

Pero ignorarlo es mala práctica.

---

## 8.23 Hardware para RAG privado

Un RAG privado no solo necesita inferencia.

Necesita:

- extracción documental;
- OCR si hay escaneos;
- embeddings;
- base vectorial;
- modelo generador;
- almacenamiento;
- interfaz;
- logs;
- backups.

Hardware orientativo:

### RAG pequeño

```text
Mac mini / mini-PC 16-32 GB
modelo 7B/13B
documentos limitados
pocos usuarios
```

### RAG medio

```text
Mac mini/Studio 48-128 GB o PC con GPU 24 GB+
modelo 13B-32B o 70B cuantizado
Qdrant/pgvector
varios usuarios
```

### RAG serio

```text
servidor dedicado
GPU o Apple Silicon alto
base de datos separada
OCR batch
observabilidad
backups
```

La clave es medir.

---

## 8.24 Hardware para agentes

Los agentes pueden consumir más de lo esperado.

Porque no hacen una sola llamada.

Hacen varias.

Pueden:

- planificar;
- llamar tools;
- leer resultados;
- volver a razonar;
- reintentar;
- resumir;
- validar.

Esto implica:

- más tokens;
- más latencia;
- más memoria;
- más logs;
- más CPU;
- más llamadas a herramientas.

Para agentes locales:

- usa modelos rápidos;
- limita pasos;
- usa tools simples;
- evita contextos enormes;
- monitoriza;
- usa humano en el loop;
- separa agentes de tareas críticas.

Un agente lento se vuelve frustrante.

Un agente sin límites se vuelve peligroso.

---

## 8.25 Hardware para voz

Un agente de voz necesita varias piezas:

- micrófono;
- STT;
- LLM;
- TTS;
- altavoz;
- detección de turnos;
- baja latencia.

Hardware:

- CPU/GPU para transcripción;
- modelo LLM local o API;
- TTS local o cloud;
- buena entrada de audio;
- dispositivo estable.

La voz exige latencia baja.

Un sistema que tarda 10 segundos en responder por texto puede ser tolerable.

Por voz, se siente roto.

Para voz local, a veces conviene usar:

```text
STT local rápido
+ LLM local pequeño para comandos simples
+ cloud/local fuerte para tareas complejas
+ TTS eficiente
```

---

## 8.26 Hardware para visión y documentos

La visión y los documentos visuales pueden requerir más recursos.

Casos:

- OCR;
- tablas;
- facturas;
- formularios;
- capturas;
- imágenes;
- vídeo.

A veces es mejor usar herramientas especializadas:

- OCR dedicado;
- parsers de PDF;
- modelos de layout;
- pipelines batch;
- GPU para visión;
- modelos multimodales solo cuando aportan valor.

No uses un LLM multimodal para todo si una herramienta clásica extrae mejor una tabla.

La ingeniería consiste en combinar.

---

## 8.27 Hardware para generación de imágenes

La generación de imágenes local es otro mundo.

Necesita GPU, VRAM y almacenamiento.

Casos:

- portadas;
- imágenes para educación;
- prototipos visuales;
- marketing;
- assets;
- diseño.

Herramientas:

- ComfyUI;
- Stable Diffusion;
- Flux y otros modelos;
- workflows;
- upscalers.

Aquí NVIDIA suele tener ventaja por ecosistema.

Una RTX con buena VRAM puede ser más útil que un Mac para ciertos workflows de imagen.

En sistemas mixtos, puedes separar:

```text
Mac/servidor local → LLM/RAG
PC GPU → imágenes
```

---

## 8.28 Hardware para desarrollo AI-native

Si usas Codex, Claude Code, Cursor, Grok, Gemini o ChatGPT para programar, el hardware local no siempre ejecuta el modelo.

Pero sigue importando.

Necesitas:

- buen editor;
- repos grandes;
- Docker;
- bases de datos;
- navegadores;
- emuladores;
- herramientas de testing;
- builds;
- servidores locales;
- quizá modelos locales auxiliares.

Un portátil con poca RAM puede sufrir aunque el modelo esté en la nube.

Para desarrollo moderno con IA:

```text
32 GB RAM → cómodo
64 GB RAM → mejor para Docker, repos, modelos pequeños
128 GB+ → laboratorio local avanzado
```

---

## 8.29 Comprar hardware: criterios prácticos

Antes de comprar, responde:

- ¿qué modelo quieres ejecutar?
- ¿qué tamaño?
- ¿qué cuantización?
- ¿qué contexto?
- ¿cuántos usuarios?
- ¿texto, voz, imagen o vídeo?
- ¿RAG?
- ¿agentes?
- ¿producción o laboratorio?
- ¿consumo 24/7?
- ¿ruido aceptable?
- ¿presupuesto?
- ¿necesitas ampliar?
- ¿necesitas portabilidad?
- ¿necesitas soporte empresarial?

No compres hardware por “por si acaso” sin caso de uso.

Pero tampoco compres tan justo que el sistema nazca obsoleto.

---

## 8.30 Matriz de decisión de hardware

```markdown
| Caso de uso | Hardware orientativo | Prioridad |
|---|---|---|
| Aprender IA local | Portátil actual / Mac mini básico | Bajo coste |
| Chat local personal | 16-32 GB RAM | Simplicidad |
| RAG privado pequeño | Mac mini / mini-PC 32-48 GB | Memoria + estabilidad |
| RAG medio | Mac Studio / PC GPU 24 GB+ | Memoria + almacenamiento |
| Agentes locales | GPU/Apple Silicon potente | Latencia + logs |
| Imagen local | NVIDIA con VRAM alta | CUDA + VRAM |
| Voz edge | mini-PC / Raspberry + API/local | Latencia + audio |
| PYME 24/7 | equipo silencioso + SAI + backups | Fiabilidad |
| Laboratorio avanzado | Mac Studio + PC GPU + NAS | Flexibilidad |
```

Esta tabla debe actualizarse cada trimestre.

---

## 8.31 Estrategia incremental

No hace falta comprar el hardware perfecto desde el principio.

Puedes avanzar por fases.

### Fase 1

Usar APIs cloud y probar conceptos.

### Fase 2

Ejecutar modelos pequeños localmente.

### Fase 3

Montar RAG local con documentos propios.

### Fase 4

Comprar hardware dedicado.

### Fase 5

Separar servicios: RAG, embeddings, modelos, imagen, automatización.

### Fase 6

Crear instalación reproducible para clientes.

Esta estrategia evita gastar antes de saber qué necesitas.

---

## 8.32 Hardware para vender IA local a PYMEs

Si vas a ofrecer soluciones local-first a PYMEs, necesitas paquetes claros.

### Paquete básico

```text
Mini-PC o Mac mini
RAG pequeño
modelo local pequeño/mediano
documentos internos
1-5 usuarios
soporte mensual
```

### Paquete profesional

```text
Mac mini potente / Mac Studio básico / PC GPU
RAG privado
usuarios y permisos
backups
acceso remoto seguro
mantenimiento
```

### Paquete avanzado

```text
servidor dedicado
modelo local grande o híbrido
integraciones
MCP/tools
monitorización
soporte prioritario
```

Lo importante es vender solución, no hardware.

El cliente no compra tokens por segundo.

Compra ahorro, privacidad y utilidad.

---

## 8.33 Hardware propio frente a cloud GPU

Otra opción es alquilar GPU en la nube.

Ventajas:

- no compras hardware;
- escalas según necesidad;
- acceso a GPUs potentes;
- útil para pruebas;
- útil para fine-tuning;
- útil para cargas puntuales.

Desventajas:

- coste recurrente;
- datos fuera;
- configuración;
- dependencia;
- facturas imprevisibles;
- latencia;
- apagado/encendido;
- seguridad cloud.

Usa cloud GPU cuando:

- tienes cargas puntuales;
- necesitas hardware caro temporalmente;
- entrenas o ajustas modelos;
- haces batch;
- quieres comparar antes de comprar.

Compra hardware cuando:

- el uso es constante;
- la privacidad importa;
- el coste mensual se vuelve alto;
- necesitas control;
- quieres instalación local.

---

## 8.34 Dimensionamiento rápido

Reglas orientativas, no absolutas:

```text
7B Q4  → 6-8 GB memoria útil
13B Q4 → 10-16 GB memoria útil
30B Q4 → 20-32 GB memoria útil
70B Q4 → 40-64 GB memoria útil
```

Añade margen para:

- contexto;
- runtime;
- sistema;
- embeddings;
- usuarios;
- RAG;
- tools;
- multimodalidad.

No compres al límite.

Si un modelo “cabe justo”, probablemente la experiencia no será buena en producto.

---

## 8.35 Benchmark antes de vender

Antes de ofrecer una configuración a un cliente, prueba.

Benchmark mínimo:

- 20 preguntas reales;
- 10 documentos reales;
- 5 preguntas fuera de alcance;
- contexto esperado;
- usuario simultáneo si aplica;
- medición de latencia;
- medición de memoria;
- medición de temperatura;
- prueba de reinicio;
- backup;
- recuperación;
- logs.

No vendas por ficha técnica.

Vende por prueba.

---

## 8.36 Ejemplo práctico: Mac mini como servidor IA local

Caso:

Una PYME quiere consultar documentos internos y generar borradores.

Configuración conceptual:

```text
Mac mini con memoria suficiente
+ Ollama/MLX
+ Qdrant o pgvector
+ embeddings locales
+ Open WebUI o frontend propio
+ acceso LAN
+ backups
+ mantenimiento mensual
```

Casos de uso iniciales:

- preguntas sobre procedimientos;
- resumen de documentos;
- borradores de email;
- búsqueda interna;
- clasificación simple.

Evitar al principio:

- muchos usuarios simultáneos;
- agentes autónomos;
- modificación de datos críticos;
- promesas de “igual que ChatGPT premium”;
- modelos demasiado grandes para la RAM.

---

## 8.37 Ejemplo práctico: PC con RTX para laboratorio

Caso:

Un ingeniero quiere laboratorio local potente.

Configuración conceptual:

```text
PC con GPU NVIDIA 24 GB+
+ Linux o Windows validado
+ Ollama / llama.cpp / vLLM
+ ComfyUI para imágenes
+ Qdrant/pgvector
+ Docker
+ Open WebUI
```

Casos:

- modelos de código;
- RAG;
- generación de imágenes;
- pruebas de agentes;
- fine-tuning ligero;
- benchmarking.

Cuidado:

- consumo;
- calor;
- drivers;
- ruido;
- espacio;
- backups;
- seguridad.

---

## 8.38 Ejemplo práctico: Raspberry Pi en agricultura

Caso:

Monitorizar una planta o instalación remota.

Arquitectura realista:

```text
Raspberry Pi
+ cámara/sensores
+ conexión 4G
+ reglas locales
+ modelo pequeño opcional
+ envío de eventos a servidor/API
+ voz simple si procede
+ panel de control
```

No uses la Raspberry como cerebro LLM principal.

Úsala como nodo edge.

El análisis complejo puede ir a:

- servidor local;
- API cloud;
- Mac mini;
- PC GPU;
- humano.

---

## 8.39 Anti-patrones de hardware

### Comprar GPU cara con poca VRAM

Para LLMs puede no ser buena compra.

### Comprar Mac con poca memoria

No se amplía después.

### Intentar producción con portátil personal

Puede servir para demo, no para servicio.

### No considerar consumo

La factura y el calor importan.

### No hacer backups

Grave en RAG local.

### No proteger APIs locales

Riesgo de seguridad.

### Comprar antes de tener caso de uso

Puedes gastar mal.

### Dimensionar solo por modelo

Olvidas contexto, RAG y usuarios.

### Ignorar ruido

Una oficina no es un datacenter.

### No medir con datos reales

Los benchmarks genéricos engañan.

---

## 8.40 Ideas clave del capítulo

- En IA local, la memoria suele ser más importante que la potencia bruta.
- VRAM, RAM y memoria unificada determinan qué modelos puedes ejecutar.
- El contexto consume memoria adicional mediante KV cache.
- Tokens/s no basta: mide latencia total, TTFT, prefill y concurrencia.
- NVIDIA domina muchos escenarios por CUDA y ecosistema.
- Apple Silicon destaca por memoria unificada, eficiencia y bajo ruido.
- Mini-PCs y Raspberry son útiles si se usan para tareas adecuadas.
- Un RAG local necesita más que modelo: extracción, embeddings, base vectorial, almacenamiento y backups.
- Para PYMEs, fiabilidad, silencio, soporte y mantenimiento importan tanto como rendimiento.
- No compres ni vendas hardware sin benchmark real.

---

## 8.41 Checklist práctica

Antes de elegir hardware:

- ¿Cuál es el caso de uso?
- ¿Qué modelo quieres ejecutar?
- ¿Qué tamaño y cuantización?
- ¿Qué contexto real?
- ¿Cuántos usuarios simultáneos?
- ¿Necesitas RAG?
- ¿Necesitas embeddings locales?
- ¿Necesitas reranking?
- ¿Necesitas voz, imagen o vídeo?
- ¿Qué latencia es aceptable?
- ¿Qué memoria requiere?
- ¿Qué margen de memoria necesitas?
- ¿Será 24/7?
- ¿Dónde estará físicamente?
- ¿Importa el ruido?
- ¿Importa el consumo?
- ¿Hay SAI?
- ¿Hay backups?
- ¿Hay acceso remoto seguro?
- ¿Puedes ampliarlo?
- ¿Qué runtime usarás?
- ¿Hay benchmark con datos reales?
- ¿Qué plan de mantenimiento tendrá?

---

## 8.42 Plantilla de ficha de hardware

```markdown
# Ficha de hardware IA local

## Equipo

Nombre y configuración.

## CPU

Modelo.

## GPU / NPU

Modelo y memoria.

## RAM / memoria unificada

Cantidad.

## Almacenamiento

Tipo y capacidad.

## Sistema operativo

Versión.

## Runtimes probados

Ollama / llama.cpp / MLX / vLLM / LM Studio / otros.

## Modelos probados

| Modelo | Cuantización | Contexto | Tokens/s | TTFT | Memoria | Nota |
|---|---|---:|---:|---:|---:|---|

## Casos de uso adecuados

Lista.

## Limitaciones

Lista.

## Consumo y ruido

Observaciones.

## Seguridad

Firewall, acceso, usuarios, cifrado.

## Backup

Estrategia.

## Estado

Laboratorio / piloto / producción.

## Fecha de revisión

Fecha.
```

---

## 8.43 Qué puede cambiar en el futuro

Este capítulo es muy cambiante.

Cambiarán:

- GPUs;
- Apple Silicon;
- NPUs;
- memoria máxima;
- formatos de cuantización;
- runtimes;
- rendimiento MLX;
- vLLM;
- llama.cpp;
- Ollama;
- modelos locales;
- consumo;
- precios;
- disponibilidad;
- hardware edge;
- aceleradores especializados.

Por eso las recomendaciones concretas de compra deben mantenerse en una tabla viva.

Lo que probablemente no cambiará:

> El hardware debe elegirse por tarea, memoria, contexto, latencia, coste, privacidad y mantenimiento.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 7 — Modelos locales
- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 20 — Herramientas RAG
- Capítulo 29 — Agentes de voz
- Capítulo 31 — Edge AI y sistemas físicos
- Capítulo 32 — Por qué IA local
- Capítulo 33 — Arquitectura local-first
- Capítulo 35 — IA para PYMEs
- Capítulo 51 — Costes
- Apéndice E — Tabla viva de hardware

---

## Referencias para actualización futura

Estas referencias deben revisarse periódicamente:

- Documentación oficial de Ollama.
- Repositorio y documentación de llama.cpp.
- Documentación de MLX y mlx-lm.
- Documentación de vLLM.
- Catálogos técnicos de Apple Silicon.
- Especificaciones de GPUs NVIDIA y AMD.
- Benchmarks propios del proyecto.
- Foros técnicos como LocalLLaMA, Ollama y comunidades de hardware IA.
