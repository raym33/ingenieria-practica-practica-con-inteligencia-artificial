---
title: "Capítulo 20 — Herramientas RAG"
chapter: "21"
part: "Parte V — RAG y conocimiento privado"
version: "0.1"
last_updated: "2026-06-03"
status: "muy cambiante"
level: "intermedio"
estimated_reading_time: "42 minutos"
---

# Capítulo 20 — Herramientas RAG

Elegir herramientas RAG es difícil porque el ecosistema cambia muy rápido.

Cada mes aparecen:

- nuevos frameworks;
- nuevos modelos de embeddings;
- nuevas bases vectoriales;
- nuevos rerankers;
- mejores parsers de PDF;
- herramientas de evaluación;
- plataformas completas;
- conectores;
- servidores MCP;
- soluciones locales;
- productos SaaS;
- repositorios open source.

El problema no es que falten herramientas.

El problema es elegir sin perder el control.

Este capítulo no es una lista definitiva.

Es un mapa práctico.

La pregunta no es:

> ¿Cuál es la mejor herramienta RAG?

La pregunta correcta es:

> ¿Qué herramienta encaja con mi caso, mi equipo, mis datos, mi presupuesto, mis riesgos y mi fase?

---

## 20.1 Las capas de herramientas RAG

Un sistema RAG puede dividirse en capas.

```text
1. Fuentes de datos
2. Ingesta
3. Extracción/parsing
4. Limpieza
5. Chunking
6. Embeddings
7. Índice / vector database
8. Retrieval
9. Reranking
10. Prompting
11. Generación
12. Citas
13. Evaluación
14. Observabilidad
15. Interfaz
16. Despliegue
```

Cada capa puede tener herramientas distintas.

No necesitas una herramienta gigante para todo.

Pero tampoco debes construirlo todo desde cero si no hace falta.

---

## 20.2 La tentación del framework completo

Frameworks como LangChain, LlamaIndex, Haystack, Dify, RAGFlow o AnythingLLM pueden acelerar mucho.

Pero también pueden ocultar decisiones.

Ventajas:

- rapidez;
- conectores;
- patrones ya implementados;
- comunidad;
- ejemplos;
- integración con modelos;
- menos código inicial.

Riesgos:

- abstracción excesiva;
- debugging difícil;
- dependencia del framework;
- cambios de API;
- sobreingeniería;
- dificultad de personalización;
- coste de migración.

Regla práctica:

```text
Usa frameworks para avanzar rápido, pero entiende cada capa.
```

No uses una herramienta que no puedas explicar.

---

## 20.3 Construir o comprar

Hay tres enfoques.

### 1. Construir propio

```text
FastAPI + pgvector/Qdrant + embeddings + prompts propios
```

Ventajas:

- control;
- simplicidad;
- integración a medida;
- menos dependencia;
- más fácil de auditar.

Desventajas:

- más trabajo;
- más responsabilidad;
- menos conectores listos;
- más mantenimiento.

### 2. Usar framework

```text
LlamaIndex / LangChain / Haystack
```

Ventajas:

- acelera desarrollo;
- muchos patrones;
- conectores;
- comunidad.

Desventajas:

- complejidad;
- curva de aprendizaje;
- cambios rápidos;
- capas opacas.

### 3. Usar plataforma

```text
Dify / AnythingLLM / RAGFlow / soluciones SaaS
```

Ventajas:

- rápido para usuarios;
- UI;
- menos código;
- ideal para demos o despliegues internos.

Desventajas:

- menos control;
- límites de personalización;
- integración;
- privacidad;
- vendor lock-in;
- coste.

No hay opción universal.

---

## 20.4 Criterios para elegir herramientas

Evalúa cada herramienta por:

- fase: demo, MVP, piloto, producción;
- control técnico;
- facilidad de instalación;
- compatibilidad local/cloud;
- soporte de español;
- soporte de documentos;
- citas;
- permisos;
- multiusuario;
- evaluación;
- observabilidad;
- coste;
- licencia;
- comunidad;
- mantenimiento;
- seguridad;
- facilidad de migración.

La herramienta más popular no siempre es la mejor para tu caso.

---

## 20.5 Herramientas de ingesta

La ingesta conecta fuentes al sistema.

Fuentes típicas:

- filesystem;
- Google Drive;
- OneDrive;
- SharePoint;
- Notion;
- Confluence;
- GitHub;
- emails;
- bases de datos;
- APIs;
- CRMs;
- ERPs;
- wikis;
- páginas web.

Opciones:

- conectores del framework;
- scripts propios;
- n8n/Activepieces;
- MCP servers;
- APIs oficiales;
- jobs batch;
- sincronización programada.

Preguntas:

- ¿necesitas sincronización continua?
- ¿necesitas permisos por documento?
- ¿necesitas detectar cambios?
- ¿necesitas borrar documentos?
- ¿necesitas versionado?
- ¿necesitas auditoría?

La ingesta es más importante de lo que parece.

---

## 20.6 Herramientas de parsing

Parsing convierte archivos en contenido utilizable.

Tipos:

- PDF;
- DOCX;
- HTML;
- Markdown;
- TXT;
- CSV;
- XLSX;
- EML;
- imágenes;
- escaneos.

Herramientas comunes:

- parsers PDF open source;
- motores OCR;
- extractores DOCX;
- librerías de email;
- servicios document AI;
- herramientas especializadas como LlamaParse u otras equivalentes;
- pipelines propios.

Criterios:

- calidad de extracción;
- tablas;
- metadatos;
- páginas;
- velocidad;
- coste;
- privacidad;
- local/cloud;
- soporte de idioma;
- facilidad de depuración.

No elijas parser solo porque “funciona con PDFs”.

Prueba con tus PDFs reales.

---

## 20.7 OCR

OCR es necesario cuando los documentos son escaneados o imágenes.

Opciones:

- Tesseract;
- OCR de proveedores cloud;
- modelos/document AI;
- herramientas comerciales;
- OCR integrado en plataformas.

Criterios:

- precisión;
- idioma;
- tablas;
- coste;
- privacidad;
- velocidad;
- despliegue local;
- manejo de documentos grandes;
- metadatos de página.

OCR malo destruye RAG.

Si tus documentos son escaneados, el OCR puede ser más importante que el modelo LLM.

---

## 20.8 Chunking tools

Puedes hacer chunking:

- con código propio;
- con LangChain text splitters;
- con LlamaIndex node parsers;
- con herramientas específicas;
- por reglas;
- por estructura;
- por secciones;
- por HTML/Markdown;
- por páginas.

Criterios:

- preservar estructura;
- conservar títulos;
- añadir metadata;
- manejar tablas;
- controlar overlap;
- versionar estrategia;
- reproducibilidad.

El chunking debe estar versionado.

Si cambias chunking, puede requerir reindexar.

---

## 20.9 Embedding models

Los embeddings son una decisión central.

Tipos:

- cloud;
- open source local;
- multilingües;
- especializados en código;
- especializados en búsqueda;
- pequeños y rápidos;
- grandes y precisos.

Criterios:

- calidad en español;
- dominio;
- coste;
- latencia;
- dimensión;
- licencia;
- privacidad;
- hardware;
- compatibilidad;
- soporte de batch;
- necesidad de reindexación.

Preguntas:

```text
¿Funciona con mis documentos reales?
¿Recupera fuentes correctas?
¿Es viable en coste?
¿Puedo ejecutarlo local?
¿Qué pasa si lo cambio?
```

No elijas embeddings por fama.

Evalúa retrieval.

---

## 20.10 Embeddings locales

Ventajas:

- privacidad;
- coste fijo;
- control;
- uso offline;
- buena opción para RAG local.

Limitaciones:

- hardware;
- latencia;
- calidad variable;
- mantenimiento;
- actualización;
- batch processing.

Casos ideales:

- documentos sensibles;
- PYMEs local-first;
- despachos;
- clínicas;
- administración;
- conocimiento interno;
- entornos sin salida a cloud.

Embedding local no significa automáticamente mejor.

Significa más control.

---

## 20.11 Vector databases

Una vector DB guarda embeddings y permite buscar similitud.

Opciones habituales:

- pgvector;
- Qdrant;
- Chroma;
- Weaviate;
- Milvus;
- Pinecone;
- FAISS;
- Elasticsearch/OpenSearch con vector search.

Cada una tiene ventajas.

No hay ganadora universal.

---

## 20.12 pgvector

Tiene mucho sentido si ya usas PostgreSQL.

Ventajas:

- un solo sistema;
- SQL;
- metadata relacional;
- backups conocidos;
- despliegue sencillo;
- bueno para MVP y PYMEs;
- menos piezas.

Limitaciones:

- optimización necesaria a escala;
- no siempre tan especializado como motores vectoriales dedicados;
- requiere saber Postgres;
- puede crecer en complejidad.

Ideal para:

- MVPs;
- apps full-stack;
- RAG con datos relacionales;
- soluciones simples;
- equipos que ya conocen Postgres.

---

## 20.13 Qdrant

Qdrant es una opción fuerte cuando quieres motor vectorial dedicado.

Ventajas:

- filtros por metadata;
- API clara;
- buen rendimiento;
- despliegue local/cloud;
- orientado a producción RAG;
- buena separación de responsabilidades.

Limitaciones:

- componente extra;
- backups separados;
- integración con DB relacional;
- operación adicional.

Ideal para:

- RAG documental serio;
- muchos vectores;
- filtros;
- despliegues local-first avanzados;
- servicios vectoriales compartidos.

---

## 20.14 Chroma

Chroma suele ser cómodo para prototipos.

Ventajas:

- rápido de empezar;
- simple;
- buena experiencia para demos;
- útil en notebooks;
- fácil con ejemplos.

Limitaciones:

- revisar cuidadosamente para producción;
- persistencia y operación según caso;
- permisos y multiusuario deben diseñarse;
- puede quedarse corto en entornos exigentes.

Ideal para:

- aprendizaje;
- prototipos;
- pruebas locales;
- notebooks;
- demos.

---

## 20.15 FAISS

FAISS es potente para búsqueda vectorial local.

Ventajas:

- rápido;
- flexible;
- local;
- útil para experimentación;
- muy usado en investigación.

Limitaciones:

- no es una base de datos completa;
- metadata y persistencia las gestionas tú;
- permisos y operación requieren diseño;
- menos producto “listo” que otras opciones.

Ideal para:

- experimentos;
- pipelines propios;
- prototipos técnicos;
- búsqueda vectorial local controlada.

---

## 20.16 Weaviate, Milvus, Pinecone y otros

Hay muchas opciones.

Criterios para compararlas:

- self-hosted vs cloud;
- filtros;
- escala;
- coste;
- latencia;
- backups;
- seguridad;
- comunidad;
- integración;
- experiencia de desarrollo;
- soporte empresarial;
- región de datos;
- cumplimiento.

Para un libro vivo, estas herramientas deben estar en una tabla actualizable.

No en una recomendación fija.

---

## 20.17 Búsqueda híbrida

Herramientas de búsqueda híbrida combinan:

- vector search;
- keyword search;
- BM25;
- metadata filters.

Puede implementarse con:

- Elasticsearch/OpenSearch;
- Postgres + full text search + pgvector;
- motores específicos;
- pipelines propios;
- frameworks RAG.

Útil cuando:

- hay IDs;
- nombres propios;
- códigos;
- términos técnicos;
- referencias legales;
- errores exactos.

No todo es semántica.

---

## 20.18 Rerankers

Rerankers reordenan candidatos.

Tipos:

- cross-encoders;
- rerankers cloud;
- rerankers open source;
- modelos multilingües;
- rerankers especializados.

Criterios:

- calidad;
- idioma;
- latencia;
- coste;
- local/cloud;
- longitud máxima;
- facilidad de integración;
- evaluación.

Reranking puede mejorar mucho RAG.

Pero añade coste.

Debe medirse.

---

## 20.19 Frameworks RAG

### LangChain

Muy amplio, con muchas integraciones.

Útil para:

- prototipos;
- chains;
- agents;
- tools;
- integraciones;
- ecosistema.

Riesgos:

- complejidad;
- abstracciones cambiantes;
- debugging.

### LlamaIndex

Muy orientado a datos, documentos, índices y RAG.

Útil para:

- ingesta;
- indexing;
- query engines;
- RAG documental;
- experimentación.

Riesgos:

- abstracción;
- dependencia;
- entender qué ocurre internamente.

### Haystack

Enfoque sólido para pipelines de NLP/RAG.

Útil para:

- arquitectura pipeline;
- búsqueda;
- producción;
- componentes conectables.

Riesgos:

- curva de aprendizaje;
- stack adicional.

Regla:

```text
Framework sí, pero con comprensión.
```

---

## 20.20 Plataformas RAG

Herramientas como Dify, RAGFlow, AnythingLLM, Open WebUI con documentos u otras plataformas pueden acelerar despliegues.

Ventajas:

- UI;
- gestión documental;
- conectores;
- usuarios;
- rápido para demo;
- útil para equipos no técnicos;
- despliegue local en algunos casos.

Riesgos:

- menos control;
- límites de personalización;
- dependencia;
- seguridad;
- permisos;
- evaluación;
- migración.

Útiles para:

- demos;
- pilotos internos;
- PYMEs;
- prototipos;
- soluciones rápidas local-first.

Pero si el producto es diferencial, quizá necesites arquitectura propia.

---

## 20.21 AnythingLLM

AnythingLLM suele ser interesante para escenarios local-first y documentación privada.

Casos:

- probar RAG local rápido;
- permitir a usuarios subir documentos;
- conectar modelos locales;
- validar interés de una PYME;
- demo interna.

Preguntas antes de usar en serio:

- ¿cómo gestiona permisos?
- ¿cómo guarda documentos?
- ¿cómo hace embeddings?
- ¿qué logs genera?
- ¿cómo se hacen backups?
- ¿se puede personalizar?
- ¿encaja con el producto final?

Puede ser una herramienta excelente para validar.

No necesariamente para todo producto final.

---

## 20.22 Open WebUI

Open WebUI puede servir como interfaz local para modelos y documentos.

Ventajas:

- interfaz lista;
- integración con modelos locales;
- útil para laboratorios;
- buena experiencia para usuarios técnicos;
- rápido de instalar.

Limitaciones:

- personalización de producto;
- flujos empresariales;
- permisos avanzados;
- UX específica;
- integración con procesos.

Útil para:

- laboratorio local;
- demos;
- uso interno;
- explorar modelos;
- validar RAG básico.

---

## 20.23 RAGFlow

RAGFlow y herramientas similares intentan ofrecer pipelines RAG más completos.

Pueden incluir:

- parsing;
- chunking;
- gestión de documentos;
- interfaz;
- evaluación;
- integración con modelos;
- flujos visuales.

Ventajas:

- acelera pruebas;
- reduce trabajo inicial;
- buena para comparar;
- útil para equipos pequeños.

Preguntas:

- ¿qué tan transparente es?
- ¿puedes auditar citas?
- ¿puedes controlar chunking?
- ¿puedes exportar datos?
- ¿puedes integrarlo?
- ¿puedes desplegarlo localmente?
- ¿puedes mantenerlo?

---

## 20.24 Dify

Dify puede ser útil para construir apps LLM y workflows con UI.

Ventajas:

- rapidez;
- interfaz;
- workflows;
- apps;
- conexión a modelos;
- útil para prototipos y equipos no expertos.

Limitaciones:

- control fino;
- arquitectura compleja;
- dependencia de plataforma;
- adaptación a producto propio.

Puede ser buena opción para validar flujos antes de construir personalizado.

---

## 20.25 Herramientas de evaluación RAG

Evaluar RAG es obligatorio.

Herramientas posibles:

- RAGAS;
- DeepEval;
- TruLens;
- LangSmith;
- Phoenix/Arize;
- evaluadores propios;
- LLM-as-a-judge;
- notebooks;
- golden datasets manuales.

Evalúan aspectos como:

- faithfulness;
- answer relevance;
- context relevance;
- retrieval;
- hallucination;
- citations;
- latency;
- cost.

No delegues todo en una métrica automática.

Combina evaluación automática y humana.

---

## 20.26 Observabilidad

Herramientas de observabilidad pueden registrar:

- prompts;
- modelos;
- latencia;
- coste;
- tool calls;
- retrieval;
- fuentes;
- errores;
- feedback;
- traces.

Opciones:

- LangSmith;
- OpenTelemetry;
- Phoenix;
- Helicone;
- Braintrust;
- logs propios;
- dashboards internos.

Para MVP puedes empezar con logs propios.

Para producción, necesitas trazabilidad real.

---

## 20.27 Herramientas de prompts

Prompts RAG deberían estar versionados.

Opciones:

- archivos Markdown;
- repos Git;
- LangSmith;
- PromptLayer;
- Braintrust;
- herramientas propias;
- configuración en base de datos.

Lo importante:

- versión;
- changelog;
- dataset de evaluación;
- rollback;
- trazabilidad.

Un prompt RAG sin versión es difícil de depurar.

---

## 20.28 Herramientas MCP

MCP puede conectar sistemas RAG/agentes con herramientas reales:

- filesystem;
- GitHub;
- bases de datos;
- navegadores;
- documentación;
- tickets;
- CRMs;
- cloud;
- APIs internas.

Riesgos:

- credenciales;
- permisos;
- tool injection;
- acciones no deseadas;
- auditoría.

MCP debe usarse con mínimos permisos.

En RAG, puede servir para acceder a fuentes o tools de forma estandarizada.

---

## 20.29 Herramientas de automatización

n8n, Activepieces, Make, Zapier o scripts propios pueden servir para:

- ingesta programada;
- sincronizar documentos;
- enviar feedback;
- crear tickets;
- notificar errores;
- ejecutar reindexación;
- conectar fuentes externas;
- generar informes.

No todo tiene que estar en el backend principal.

Pero cuidado con datos sensibles.

---

## 20.30 Herramientas para datos tabulares

Si tienes datos tabulares, quizá necesitas:

- SQL;
- DuckDB;
- Pandas;
- Polars;
- PostgreSQL;
- herramientas BI;
- CSV parsers;
- Excel parsers;
- agentes SQL controlados.

No uses RAG vectorial para todo.

Si la pregunta es agregación, filtro o cálculo, usa datos estructurados.

---

## 20.31 Herramientas para documentos legales

Para legal y contratos, prioriza:

- extracción fiable;
- páginas y cláusulas;
- citas exactas;
- metadata;
- versiones;
- confidencialidad;
- revisión humana;
- no encontrado;
- auditoría.

Herramientas generalistas pueden servir.

Pero el pipeline debe adaptarse.

No trates contratos como blogs.

---

## 20.32 Herramientas para educación

RAG educativo puede usar:

- currículo;
- apuntes;
- ejercicios;
- rúbricas;
- libros abiertos;
- material propio;
- generación de preguntas;
- evaluación de respuestas;
- audio;
- multimodalidad.

Prioriza:

- claridad;
- nivel;
- fuentes;
- adaptación;
- feedback;
- evitar errores pedagógicos.

---

## 20.33 Herramientas para PYMEs

Para PYMEs, la herramienta ideal suele ser:

- simple;
- barata;
- mantenible;
- con UI;
- con privacidad;
- con backup;
- con soporte;
- con instalación clara.

A veces la mejor opción no es la más avanzada.

Es la que puedes mantener.

Ejemplos de enfoque:

```text
AnythingLLM/Open WebUI para validación
pgvector/Qdrant + FastAPI para producto propio
n8n para automatizaciones
Ollama para modelos locales
Docker Compose para instalación
```

---

## 20.34 Stack recomendado por fase

### Demo rápida

```text
Streamlit/Gradio
+ Chroma
+ modelo cloud
+ documentos ficticios
```

### MVP controlado

```text
Next.js
+ FastAPI
+ PostgreSQL/pgvector
+ embeddings
+ prompt versionado
+ logs básicos
```

### RAG local PYME

```text
Docker Compose
+ Ollama
+ Qdrant o pgvector
+ Open WebUI/frontend propio
+ backups
+ acceso LAN/VPN
```

### Producción seria

```text
backend propio
+ vector DB robusta
+ evaluación continua
+ observabilidad
+ permisos
+ CI/CD
+ backups
+ monitorización
```

---

## 20.35 Tabla de decisión rápida

```markdown
| Necesidad | Herramienta/capa típica |
|---|---|
| Prototipo rápido | Chroma, Streamlit, LlamaIndex, LangChain |
| Control y MVP | FastAPI, pgvector, Qdrant |
| Local-first | Ollama, LM Studio, Open WebUI, AnythingLLM |
| Documentos complejos | parsers especializados, OCR, LlamaParse-like tools |
| Alta precisión | hybrid search, rerankers, golden dataset |
| Observabilidad | LangSmith, Phoenix, logs propios |
| Evaluación | RAGAS, DeepEval, TruLens, evaluadores propios |
| Automatización | n8n, Activepieces, MCP, scripts |
| Datos estructurados | SQL, DuckDB, PostgreSQL, Pandas |
```

Esta tabla debe vivir en `tables/rag-tools.md` y actualizarse.

---

## 20.36 Criterios de producción

Antes de usar una herramienta RAG en producción:

- ¿puedo hacer backup?
- ¿puedo restaurar?
- ¿puedo borrar datos?
- ¿puedo auditar?
- ¿puedo filtrar permisos?
- ¿puedo exportar?
- ¿puedo medir coste?
- ¿puedo medir latencia?
- ¿puedo evaluar calidad?
- ¿puedo actualizar modelos?
- ¿puedo versionar prompts?
- ¿puedo depurar retrieval?
- ¿cumple privacidad?
- ¿puedo mantenerla en 12 meses?

Si la respuesta a varias es no, cuidado.

---

## 20.37 Licencias

Revisa licencias.

Especialmente en:

- modelos;
- embeddings;
- rerankers;
- frameworks;
- parsers;
- plataformas;
- datasets;
- conectores.

Preguntas:

- ¿permite uso comercial?
- ¿permite redistribución?
- ¿requiere atribución?
- ¿tiene restricciones?
- ¿es realmente open source?
- ¿qué pasa con modelos derivados?
- ¿qué licencia tienen dependencias?

No ignores licencias por ir rápido.

---

## 20.38 Seguridad de herramientas

Cada herramienta añade superficie.

Riesgos:

- servicios expuestos;
- credenciales;
- logs;
- datos sensibles;
- dependencias vulnerables;
- permisos excesivos;
- plugins;
- conectores;
- MCP servers;
- acceso a filesystem;
- acceso a navegador.

Regla:

```text
Menos piezas, menos superficie.
```

Añade herramientas cuando aporten valor claro.

---

## 20.39 Migrabilidad

Evita encierro innecesario.

Buenas prácticas:

- guardar documentos originales;
- guardar texto extraído;
- guardar chunks con metadata;
- versionar embeddings;
- poder regenerar índice;
- prompts en archivos;
- APIs propias si hace falta;
- exportar logs;
- no depender de IDs opacos sin mapping.

Un RAG mantenible puede cambiar de herramientas.

---

## 20.40 Herramientas y libro vivo

Este capítulo debe mantenerse como tabla viva.

Estructura sugerida:

```text
tables/
├── rag-frameworks.md
├── vector-databases.md
├── embedding-models.md
├── rerankers.md
├── parsing-tools.md
├── rag-evaluation-tools.md
└── rag-platforms.md
```

Cada tabla debería incluir:

- nombre;
- categoría;
- local/cloud;
- licencia;
- madurez;
- casos de uso;
- riesgos;
- última revisión;
- enlace;
- notas.

La herramienta cambia.

El criterio permanece.

---

## 20.41 Antipatrones

### Elegir por hype

No por necesidad.

### Usar framework sin entender

Difícil depurar.

### Construir todo desde cero

Puede ser lento e innecesario.

### Usar plataforma cerrada para datos sensibles sin revisar

Riesgo.

### No revisar licencias

Problemas futuros.

### No pensar en migración

Lock-in.

### No medir coste

Sorpresas.

### No evaluar calidad

Falsa confianza.

### Herramienta demasiado compleja para PYME

Mala adopción.

### Meter MCP sin permisos

Riesgo grave.

---

## 20.42 Ideas clave del capítulo

- RAG es un sistema por capas, no una herramienta única.
- La herramienta correcta depende de fase, datos, equipo, privacidad y mantenimiento.
- Frameworks aceleran, pero pueden ocultar decisiones.
- Plataformas ayudan en demos y pilotos, pero hay que revisar control y privacidad.
- pgvector es muy práctico si ya usas PostgreSQL.
- Qdrant es fuerte como motor vectorial dedicado.
- Chroma y FAISS son útiles para prototipos y experimentos.
- Parsing y OCR pueden ser más importantes que el modelo.
- Evaluación y observabilidad no son opcionales en producción.
- Las herramientas deben vivir en tablas actualizables del libro vivo.

---

## 20.43 Checklist práctica

Para elegir herramienta RAG:

- ¿Qué problema resuelve?
- ¿En qué capa está?
- ¿Es para demo, MVP o producción?
- ¿Es local, cloud o híbrida?
- ¿Qué datos toca?
- ¿Permite uso comercial?
- ¿Qué licencia tiene?
- ¿Soporta español?
- ¿Soporta mis formatos?
- ¿Permite citas?
- ¿Permite permisos?
- ¿Tiene logs?
- ¿Tiene evaluación?
- ¿Puedo hacer backup?
- ¿Puedo exportar datos?
- ¿Puedo migrar?
- ¿Qué coste tiene?
- ¿Qué latencia añade?
- ¿Quién la mantiene?
- ¿Qué pasa si desaparece?
- ¿Es necesaria o moda?

---

## 20.44 Plantilla de ficha de herramienta RAG

```markdown
# Ficha de herramienta RAG

## Nombre

Herramienta.

## Categoría

Parsing / embeddings / vector DB / framework / plataforma / evaluación / observabilidad.

## Uso principal

Qué resuelve.

## Local / Cloud

Local, cloud o híbrido.

## Licencia

Tipo.

## Ventajas

Lista.

## Limitaciones

Lista.

## Casos ideales

Lista.

## Riesgos

Privacidad, seguridad, coste, lock-in.

## Alternativas

Lista.

## Encaje en el libro

Capítulos relacionados.

## Última revisión

Fecha.
```

---

## 20.45 Qué puede cambiar en el futuro

Cambiarán:

- frameworks;
- vector DBs;
- modelos de embeddings;
- rerankers;
- herramientas OCR;
- plataformas RAG;
- herramientas MCP;
- costes;
- licencias;
- hosting;
- capacidades locales.

Pero probablemente seguirá siendo cierto:

> La mejor herramienta RAG no es la más popular, sino la que puedes entender, mantener, auditar y mejorar.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 17 — Arquitectura RAG básica
- Capítulo 18 — Problemas reales en RAG
- Capítulo 19 — RAG avanzado
- Capítulo 21 — Chatbots modernos
- Capítulo 26 — MCP
- Capítulo 32 — Por qué IA local
- Capítulo 33 — Arquitectura local-first
- Capítulo 46 — Despliegue de sistemas IA
- Capítulo 50 — Evaluación
- Apéndice C — Plantillas RAG
- Apéndice F — Tabla viva de herramientas RAG
