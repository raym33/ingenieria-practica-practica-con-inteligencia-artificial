---
title: "Capítulo 17 — Arquitectura RAG básica"
chapter: "18"
part: "Parte V — RAG y conocimiento privado"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "intermedio"
estimated_reading_time: "42 minutos"
---

# Capítulo 17 — Arquitectura RAG básica

RAG parece simple cuando se explica en una frase:

> Buscar información relevante y dársela al modelo para que responda.

Pero construir un RAG útil exige varias piezas.

No basta con subir PDFs a una base vectorial.  
No basta con crear embeddings.  
No basta con llamar a un modelo.  
No basta con decir “responde con fuentes”.  

Una arquitectura RAG básica debe resolver un flujo completo:

```text
documentos → extracción → chunks → embeddings → índice → pregunta → retrieval → contexto → generación → respuesta con fuentes
```

Cada flecha importa.

Cada paso puede fallar.

Este capítulo describe una arquitectura RAG básica, pensada para proyectos reales pero sin entrar todavía en técnicas avanzadas como GraphRAG, Agentic RAG, corrective RAG o pipelines multi-etapa.

La idea es construir una base sólida.

---

## 17.1 Arquitectura mínima

Una arquitectura RAG mínima tiene dos grandes procesos:

### 1. Proceso de ingesta

Prepara el conocimiento.

```text
documentos → texto → chunks → embeddings → índice
```

### 2. Proceso de consulta

Responde preguntas.

```text
pregunta → búsqueda → contexto → LLM → respuesta con fuentes
```

Separar estos dos procesos es fundamental.

La ingesta suele ocurrir cuando se suben o actualizan documentos.

La consulta ocurre cada vez que un usuario pregunta.

No mezcles ambos sin necesidad.

---

## 17.2 Diagrama general

```text
                 ┌─────────────────────┐
                 │     Documentos       │
                 │ PDF / DOCX / TXT ... │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │  Extracción texto    │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │      Limpieza        │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │      Chunking        │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │     Embeddings       │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Índice / Vector DB │
                 └──────────┬──────────┘
                            │
                            ▼
Usuario ── pregunta ──► Retrieval ──► Contexto ──► LLM ──► Respuesta + fuentes
```

Este diagrama resume el patrón básico.

Luego cada proyecto añade permisos, logs, evaluación, reranking, feedback, memoria, tools o agentes.

Pero el núcleo es este.

---

## 17.3 Componentes principales

Una arquitectura RAG básica incluye:

- gestor de documentos;
- extractor de texto;
- limpiador o normalizador;
- chunker;
- modelo de embeddings;
- base vectorial o índice;
- motor de retrieval;
- constructor de prompt;
- modelo generador;
- sistema de citas;
- logs;
- evaluación;
- interfaz de usuario.

No todos tienen que ser complejos.

Pero todos deben existir de alguna forma.

---

## 17.4 Gestor de documentos

El gestor de documentos responde:

- qué documentos existen;
- quién los subió;
- cuándo se subieron;
- qué versión tienen;
- qué permisos tienen;
- qué estado de procesamiento tienen;
- dónde está el archivo original;
- qué texto fue extraído;
- qué chunks se generaron;
- si están indexados;
- si hay errores.

Una tabla mínima:

```text
documents
- id
- filename
- mime_type
- size_bytes
- sha256
- status
- source
- created_at
- updated_at
```

El campo `sha256` ayuda a detectar duplicados.

El campo `status` ayuda a saber si el documento está pendiente, procesado o fallido.

---

## 17.5 Estados de documento

Ejemplo de estados:

```text
uploaded
extracting
extracted
chunking
embedding
indexed
failed
deleted
```

Esto permite construir una interfaz honesta.

El usuario no debería preguntar sobre un documento que todavía no está indexado.

Tampoco debería pensar que todo fue bien si la extracción falló.

Un RAG serio muestra estado.

---

## 17.6 Extracción de texto

La extracción convierte documentos en texto utilizable.

Formatos comunes:

- PDF;
- DOCX;
- TXT;
- Markdown;
- HTML;
- EML;
- CSV;
- XLSX.

Cada formato tiene problemas.

### PDF

Puede tener texto real o ser escaneado.

### DOCX

Suele ser más estructurado, pero puede tener tablas, estilos y comentarios.

### Emails

Tienen firmas, hilos, cabeceras y adjuntos.

### Excel

No siempre es texto narrativo; puede requerir tratamiento tabular.

### HTML

Tiene navegación, menús, scripts y ruido.

La extracción debe guardar metadatos.

No solo texto plano.

---

## 17.7 Metadatos

Los metadatos son esenciales para citas, permisos y filtros.

Ejemplos:

```json
{
  "document_id": "doc_123",
  "filename": "manual_rrhh.pdf",
  "page": 14,
  "section": "Vacaciones",
  "source": "intranet",
  "uploaded_by": "user_456",
  "created_at": "2026-06-03",
  "department": "rrhh",
  "visibility": "internal"
}
```

Sin metadatos, luego no sabes de dónde salió una respuesta.

Y si no sabes de dónde salió, no puedes auditar.

---

## 17.8 Limpieza

Después de extraer texto, conviene limpiar.

Pero con cuidado.

Puedes eliminar:

- espacios duplicados;
- encabezados repetidos;
- pies de página;
- números de página irrelevantes;
- caracteres rotos;
- menús de navegación;
- HTML residual.

Pero no debes eliminar información importante.

Riesgo:

Un limpiador agresivo puede borrar fechas, importes, notas o referencias.

Regla:

```text
Limpia ruido, no significado.
```

Guarda texto original o extracción bruta si puedes.

---

## 17.9 Chunking

El chunking divide el texto en fragmentos.

Ejemplo:

```text
Documento completo
  → chunk 1
  → chunk 2
  → chunk 3
```

El objetivo es que cada chunk sea:

- suficientemente pequeño para búsqueda;
- suficientemente grande para conservar contexto;
- trazable a la fuente;
- útil para responder preguntas.

El chunking es una de las decisiones más importantes de RAG.

Un mal chunking puede arruinar el sistema.

---

## 17.10 Tamaño de chunk

No hay tamaño universal.

Orientaciones:

```text
300-500 tokens → granular, bueno para respuestas exactas
700-1.200 tokens → equilibrio frecuente
1.500+ tokens → más contexto, más ruido
```

Depende de:

- tipo de documento;
- modelo de embeddings;
- preguntas esperadas;
- necesidad de citas;
- coste;
- contexto del LLM;
- reranking;
- idioma.

No elijas tamaño por copiar una receta.

Evalúa.

---

## 17.11 Overlap

Overlap significa que los chunks comparten parte del texto.

Ejemplo:

```text
chunk 1: párrafos 1-4
chunk 2: párrafos 4-7
chunk 3: párrafos 7-10
```

Ventajas:

- evita cortar ideas;
- mejora recuperación;
- conserva contexto entre fragmentos.

Desventajas:

- más chunks;
- más coste de embeddings;
- más duplicados;
- más ruido.

Usa overlap moderado.

No es solución a todo.

---

## 17.12 Chunking por estructura

Mejor que cortar solo por tamaño es respetar estructura.

Ejemplos:

- títulos;
- secciones;
- capítulos;
- artículos;
- cláusulas;
- páginas;
- apartados;
- preguntas frecuentes;
- filas de tabla;
- bloques semánticos.

Ejemplo legal:

```text
Cláusula 1
Cláusula 2
Cláusula 3
```

Ejemplo manual:

```text
Sección: Instalación
Sección: Configuración
Sección: Solución de problemas
```

El chunking estructural suele mejorar citas.

---

## 17.13 Embeddings

Cada chunk se convierte en vector.

Tabla conceptual:

```text
chunk_id | document_id | text | embedding | metadata
```

El embedding permite buscar similitud semántica.

Cuando el usuario pregunta, su pregunta también se convierte en embedding.

Luego el sistema busca chunks cercanos.

---

## 17.14 Modelo de embeddings

Elige embedding según:

- idioma;
- dominio;
- coste;
- local/cloud;
- dimensión;
- velocidad;
- licencia;
- calidad;
- compatibilidad.

Para español y documentos empresariales, prueba con consultas reales.

No asumas que un embedding funciona igual en todos los dominios.

Si cambias embedding, normalmente debes reindexar.

---

## 17.15 Índice vectorial

El índice vectorial permite buscar chunks similares.

Opciones:

- pgvector;
- Qdrant;
- Chroma;
- FAISS;
- Weaviate;
- Milvus;
- Pinecone;
- Elasticsearch/OpenSearch con vector search.

Para MVPs:

- pgvector si ya usas PostgreSQL;
- Qdrant si quieres motor vectorial dedicado;
- Chroma para prototipos simples;
- FAISS para local/experimental.

No hay opción universal.

---

## 17.16 pgvector

Ventajas:

- vive dentro de PostgreSQL;
- simplifica stack;
- bueno para MVPs;
- permite metadata y SQL;
- fácil de desplegar si ya usas Postgres.

Limitaciones:

- puede requerir optimización a escala;
- no siempre es tan especializado como motores vectoriales dedicados;
- hay que entender índices y rendimiento.

Para PYMEs y MVPs, pgvector suele ser una elección razonable.

---

## 17.17 Qdrant

Ventajas:

- motor vectorial dedicado;
- filtros por metadata;
- buen rendimiento;
- API clara;
- útil para producción RAG;
- despliegue local o cloud.

Limitaciones:

- añade componente extra;
- más operación;
- hay que mantenerlo;
- integración con base relacional debe diseñarse.

Qdrant es una buena opción cuando el vector search es central.

---

## 17.18 Chroma y FAISS

Chroma suele ser cómodo para prototipos.

FAISS es potente para búsqueda vectorial local y experimental.

Pero en producto empresarial, revisa:

- persistencia;
- backups;
- concurrencia;
- metadata;
- permisos;
- operación;
- observabilidad;
- despliegue.

Herramientas de prototipo no siempre son herramientas de producción.

---

## 17.19 Búsqueda por metadata

No todo debe ser vectorial.

Ejemplos:

- filtrar por departamento;
- filtrar por cliente;
- filtrar por fecha;
- filtrar por tipo de documento;
- filtrar por permisos;
- filtrar por idioma;
- excluir documentos obsoletos.

Flujo:

```text
permisos + filtros metadata + búsqueda vectorial
```

Los filtros deben aplicarse antes o durante retrieval.

No después de generar respuesta.

---

## 17.20 Retrieval básico

El retrieval básico:

1. Embedding de la pregunta.
2. Búsqueda top-k en índice.
3. Devuelve los chunks más cercanos.

Ejemplo:

```text
top_k = 5
```

Si `top_k` es bajo, puedes perder información.

Si `top_k` es alto, metes ruido.

Debes evaluar.

---

## 17.21 Similaridad no es verdad

Un chunk similar no siempre contiene la respuesta.

Puede hablar de un tema parecido, pero no responder.

Ejemplo:

Pregunta:

```text
¿Cuál es la penalización por cancelar antes?
```

Chunk recuperado:

```text
El contrato se renovará automáticamente salvo aviso...
```

Relacionado, pero quizá no responde.

Por eso RAG necesita:

- buen retrieval;
- reranking si procede;
- prompt que permita “no encontrado”;
- evaluación.

---

## 17.22 Construcción de contexto

Después de recuperar chunks, construyes contexto para el LLM.

Ejemplo:

```text
Fuente 1:
Documento: contrato.pdf
Página: 4
Texto: ...

Fuente 2:
Documento: anexo.pdf
Página: 2
Texto: ...
```

Incluye metadatos.

No metas chunks sin identificar.

El modelo necesita poder citar.

---

## 17.23 Prompt RAG básico

```text
Eres un asistente documental.

Usa exclusivamente las fuentes proporcionadas.
Si las fuentes no contienen la respuesta, di:
"No encuentro información suficiente en las fuentes proporcionadas."

No inventes información.
Cita las fuentes usadas.

# Fuentes
{contexto}

# Pregunta
{pregunta}

# Respuesta
```

Este prompt debe versionarse.

Y evaluarse.

---

## 17.24 Respuesta con fuentes

Formato recomendado:

```markdown
## Respuesta

La solicitud debe presentarse antes del día 20 del mes anterior...

## Fuentes

- Manual RRHH, sección Vacaciones, página 14.
```

O si la respuesta es negativa:

```markdown
## Respuesta

No encuentro información suficiente en las fuentes proporcionadas.

## Fuentes revisadas

- Manual RRHH, sección Permisos.
```

Mostrar fuentes revisadas puede ayudar.

Pero evita dar falsa confianza si no eran relevantes.

---

## 17.25 Citas exactas vs referencias

Hay dos niveles.

### Referencias

Indican documento, página o sección.

```text
Fuente: Manual RRHH, página 14.
```

### Citas exactas

Incluyen fragmento textual.

```text
"Las solicitudes deben registrarse antes del día 20..."
```

Las citas exactas dan más confianza, pero pueden aumentar longitud.

En dominios sensibles, conviene mostrar fragmentos.

---

## 17.26 Manejo de “no encontrado”

Diseña un comportamiento claro.

Casos:

- no hay chunks;
- chunks irrelevantes;
- pregunta fuera de alcance;
- permisos insuficientes;
- información contradictoria;
- documento no indexado;
- error técnico.

No uses el mismo mensaje para todo.

Ejemplo:

```text
No encuentro información suficiente en las fuentes disponibles.
```

O:

```text
No tengo acceso a documentos que respondan a esa pregunta.
```

O:

```text
El documento todavía no ha sido procesado.
```

Cada caso debe guiar al usuario.

---

## 17.27 Logs mínimos

Registra:

- user_id;
- question;
- timestamp;
- retrieved_chunk_ids;
- document_ids;
- scores;
- model;
- prompt_version;
- latency;
- answer_status;
- error si existe;
- feedback.

Pero cuidado con privacidad.

Puedes registrar IDs y hashes en vez de texto completo.

Define política de logs.

---

## 17.28 Feedback mínimo

Añade:

```text
¿Te ha sido útil? Sí / No
```

Y opcional:

```text
- La respuesta no usa la fuente correcta.
- Falta información.
- La fuente está obsoleta.
- La respuesta es confusa.
```

El feedback ayuda a mejorar.

Pero también hay que revisarlo.

No basta con recogerlo.

---

## 17.29 Evaluación mínima

Dataset básico:

```text
20 preguntas con respuesta en documentos
10 preguntas fuera de alcance
5 preguntas ambiguas
5 preguntas con documentos similares
5 preguntas sobre documentos obsoletos
```

Mide:

- retrieval correcto;
- respuesta correcta;
- citas correctas;
- no encontrado correcto;
- latencia;
- coste.

Este dataset puede empezar pequeño.

Pero debe existir.

---

## 17.30 RAG básico en pseudocódigo

```python
def answer_question(user_id: str, question: str) -> dict:
    allowed_docs = get_allowed_documents(user_id)

    query_embedding = embed(question)

    chunks = vector_search(
        embedding=query_embedding,
        filters={"document_id": allowed_docs},
        top_k=5,
    )

    if not chunks:
        return {
            "answer": "No encuentro información suficiente en las fuentes proporcionadas.",
            "sources": [],
        }

    context = build_context(chunks)

    prompt = render_prompt(
        template="rag_answer_v1",
        context=context,
        question=question,
    )

    answer = llm_generate(prompt)

    log_interaction(
        user_id=user_id,
        question=question,
        chunks=chunks,
        prompt_version="rag_answer_v1",
    )

    return {
        "answer": answer.text,
        "sources": extract_sources(chunks),
    }
```

Esto es simplificado.

Pero muestra la lógica.

---

## 17.31 Estructura de carpetas RAG

```text
backend/
├── app/
│   ├── api/
│   │   ├── documents.py
│   │   └── chat.py
│   ├── services/
│   │   ├── ingestion_service.py
│   │   ├── extraction_service.py
│   │   ├── chunking_service.py
│   │   ├── embedding_service.py
│   │   ├── retrieval_service.py
│   │   ├── rag_service.py
│   │   └── citation_service.py
│   ├── models/
│   ├── schemas/
│   └── prompts/
│       └── rag_answer_v1.md
├── tests/
└── scripts/
```

Separar servicios facilita mantenimiento.

---

## 17.32 Modelo de datos básico

```text
documents
- id
- filename
- mime_type
- sha256
- status
- created_at

document_text_extractions
- id
- document_id
- raw_text
- extraction_method
- created_at

document_chunks
- id
- document_id
- chunk_index
- text
- metadata
- created_at

document_embeddings
- id
- chunk_id
- embedding
- embedding_model
- created_at

rag_interactions
- id
- user_id
- question
- answer
- prompt_version
- model
- latency_ms
- created_at

rag_interaction_sources
- interaction_id
- chunk_id
- score
```

Puedes simplificar para MVP.

Pero piensa desde el principio en trazabilidad.

---

## 17.33 API básica

Endpoints mínimos:

```text
POST /documents/upload
GET /documents
GET /documents/{id}
POST /documents/{id}/process
POST /chat/query
GET /chat/interactions/{id}
POST /feedback
```

Para prototipo, puedes reducir.

Para producto, necesitarás permisos y estados.

---

## 17.34 Interfaz básica

Una UI mínima:

- lista de documentos;
- estado de procesamiento;
- botón subir;
- caja de pregunta;
- respuesta;
- fuentes;
- feedback.

No empieces con dashboard complejo.

La experiencia principal es:

```text
subir → preguntar → verificar fuente
```

---

## 17.35 Seguridad básica

Incluye desde el principio:

- límite de tamaño de archivo;
- tipos permitidos;
- validación de extensión y MIME;
- almacenamiento seguro;
- no ejecutar archivos;
- permisos por usuario;
- no exponer documentos ajenos;
- no loggear texto sensible sin necesidad;
- proteger API;
- controlar CORS;
- sanitizar nombres de archivo.

RAG procesa documentos.

Eso abre riesgos.

---

## 17.36 Privacidad básica

Define:

- dónde se guardan documentos;
- qué proveedor recibe texto;
- si embeddings son locales o cloud;
- si prompts se loggean;
- cuánto tiempo se retienen datos;
- cómo se borran documentos;
- cómo se borran embeddings;
- quién puede acceder.

No esperes a producción.

---

## 17.37 Coste básico

Costes:

- extracción;
- OCR;
- embeddings;
- almacenamiento;
- vector DB;
- modelo generador;
- reranking si hay;
- logs;
- hosting.

Optimización:

- no re-embed duplicados;
- cachear respuestas si procede;
- limitar top-k;
- usar modelos más pequeños;
- comprimir contexto;
- evitar enviar documentos completos;
- batch embeddings.

RAG mal diseñado puede ser caro.

---

## 17.38 Latencia básica

La latencia incluye:

```text
embedding pregunta
+ búsqueda
+ reranking opcional
+ generación LLM
+ streaming
```

Para mejorar:

- usar embeddings rápidos;
- indexar bien;
- limitar chunks;
- usar streaming;
- usar modelos adecuados;
- cachear;
- separar tareas batch;
- no hacer OCR en tiempo de pregunta.

Nunca hagas ingesta pesada en el momento de responder si puedes evitarlo.

---

## 17.39 Despliegue básico

Para MVP local:

```text
Docker Compose
+ backend
+ frontend
+ PostgreSQL/pgvector
+ volumen documentos
+ modelo local opcional
```

Para cloud:

```text
frontend
+ backend
+ managed Postgres
+ object storage
+ vector DB
+ proveedor LLM
```

Para PYME local:

```text
mini-servidor
+ acceso LAN/VPN
+ backups
+ actualizaciones
+ monitorización básica
```

El despliegue depende del riesgo y uso.

---

## 17.40 RAG básico no significa RAG malo

Un RAG básico bien hecho puede ser muy útil.

Características:

- documentos bien procesados;
- chunks razonables;
- fuentes citadas;
- no encontrado correcto;
- permisos;
- logs;
- evaluación pequeña;
- feedback;
- actualización clara.

Eso puede ser mejor que un sistema avanzado lleno de componentes sin control.

Primero sólido.

Luego avanzado.

---

## 17.41 Cuándo añadir complejidad

Añade complejidad si hay problema medido.

### Añadir reranking

Si retrieval trae demasiados resultados irrelevantes.

### Añadir búsqueda híbrida

Si keywords exactas importan.

### Añadir GraphRAG

Si las relaciones entre entidades son centrales.

### Añadir agentes

Si necesitas acciones o múltiples pasos.

### Añadir query transformation

Si usuarios preguntan de forma vaga.

### Añadir evaluación automática

Si cambios frecuentes rompen calidad.

No añadas por moda.

---

## 17.42 Antipatrones

### Ingesta y consulta mezcladas

Hace lento el sistema.

### Sin metadatos

No hay citas ni auditoría.

### Chunks sin fuente

No puedes verificar.

### Embeddings sin versionado

No sabes qué índice tienes.

### Prompt hardcodeado

Difícil de mejorar.

### No encontrado no definido

El modelo inventa.

### Sin permisos

Riesgo grave.

### Sin evaluación

No sabes si funciona.

### Sin logs

No puedes depurar.

### Sin backups

Riesgo operativo.

---

## 17.43 Ideas clave del capítulo

- Una arquitectura RAG básica tiene dos procesos: ingesta y consulta.
- RAG no es solo vector DB; es un pipeline completo.
- La extracción y los metadatos son esenciales.
- El chunking condiciona toda la calidad.
- Embeddings e índice deben elegirse según dominio, idioma y coste.
- Retrieval determina qué ve el modelo.
- El prompt debe limitar respuesta a fuentes y permitir “no encontrado”.
- Las citas son parte central del producto.
- Logs, feedback y evaluación deben existir desde el MVP.
- Un RAG básico bien hecho puede ser más valioso que un RAG avanzado mal diseñado.

---

## 17.44 Checklist práctica

Para una arquitectura RAG básica:

- ¿Separaste ingesta y consulta?
- ¿Registras documentos?
- ¿Detectas duplicados?
- ¿Guardas estado de procesamiento?
- ¿Extraes texto de forma fiable?
- ¿Guardas metadatos?
- ¿Tienes estrategia de chunking?
- ¿Versionas modelo de embeddings?
- ¿Tienes índice vectorial?
- ¿Filtras por permisos?
- ¿Definiste top-k?
- ¿Construyes contexto con fuentes?
- ¿Tienes prompt RAG versionado?
- ¿Permites “no encontrado”?
- ¿Devuelves fuentes?
- ¿Registras interacciones?
- ¿Recoges feedback?
- ¿Tienes dataset mínimo de evaluación?
- ¿Controlas coste?
- ¿Controlas privacidad?
- ¿Tienes backups?

---

## 17.45 Plantilla de arquitectura RAG básica

```markdown
# Arquitectura RAG básica

## Objetivo

Qué problema documental resuelve.

## Fuentes

Tipos de documentos.

## Ingesta

Cómo entran documentos.

## Extracción

Herramientas y metadatos.

## Chunking

Estrategia y tamaño.

## Embeddings

Modelo y versionado.

## Índice

Vector DB o motor elegido.

## Retrieval

Top-k, filtros, permisos.

## Prompt

Nombre y versión.

## Respuesta

Formato, citas y no encontrado.

## Logs

Qué se registra.

## Feedback

Cómo se recoge.

## Evaluación

Dataset mínimo.

## Riesgos

Lista.

## Próximas mejoras

Reranking, híbrida, GraphRAG, agentes, etc.
```

---

## 17.46 Qué puede cambiar en el futuro

Cambiarán:

- bases vectoriales;
- modelos de embeddings;
- rerankers;
- frameworks RAG;
- herramientas de parsing;
- OCR;
- GraphRAG;
- Agentic RAG;
- protocolos de conexión;
- modelos locales;
- costes.

Pero la arquitectura básica seguirá siendo reconocible:

> preparar conocimiento, recuperar lo relevante, darlo al modelo, responder con fuentes y evaluar.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 18 — Problemas reales en RAG
- Capítulo 19 — RAG avanzado
- Capítulo 20 — Herramientas RAG
- Capítulo 21 — Chatbots modernos
- Capítulo 32 — Por qué IA local
- Capítulo 33 — Arquitectura local-first
- Capítulo 50 — Evaluación
- Apéndice C — Plantillas RAG
- Apéndice F — Tabla viva de herramientas RAG
