---
title: "Capítulo 19 — RAG avanzado"
chapter: "20"
part: "Parte V — RAG y conocimiento privado"
version: "0.1"
last_updated: "2026-06-03"
status: "muy cambiante"
level: "intermedio-avanzado"
estimated_reading_time: "45 minutos"
---

# Capítulo 19 — RAG avanzado

Un RAG básico bien construido ya puede resolver mucho.

Pero cuando aparecen documentos complejos, muchas fuentes, preguntas ambiguas, permisos, tablas, versiones, usuarios reales y necesidad de alta precisión, el RAG básico empieza a mostrar límites.

Entonces aparecen técnicas avanzadas:

- búsqueda híbrida;
- reranking;
- query transformation;
- multi-query retrieval;
- HyDE;
- contextual retrieval;
- compression;
- corrective RAG;
- self-RAG;
- GraphRAG;
- Agentic RAG;
- memoria;
- evaluación continua;
- pipelines multi-modelo.

Estas técnicas pueden mejorar mucho.

También pueden complicar el sistema sin necesidad.

La pregunta no es:

> ¿Qué técnica avanzada puedo añadir?

La pregunta correcta es:

> ¿Qué problema concreto de mi RAG quiero resolver?

Este capítulo explica técnicas avanzadas con criterio de ingeniería.

No como colección de modas.

---

## 19.1 Primero diagnostica

Antes de añadir complejidad, diagnostica.

Un RAG puede fallar por:

- mala extracción;
- chunks malos;
- embeddings inadecuados;
- top-k incorrecto;
- falta de filtros;
- documentos obsoletos;
- permisos;
- prompt débil;
- modelo generador;
- falta de evaluación;
- pregunta ambigua;
- fuentes contradictorias.

No añadas GraphRAG si el problema es que los PDFs se extraen mal.

No añadas agentes si el problema es que no hay citas.

No añadas multi-query si el problema es que faltan permisos.

Orden correcto:

```text
datos → extracción → chunking → metadata → retrieval → prompt → modelo → técnicas avanzadas
```

La técnica avanzada debe resolver un fallo medido.

---

## 19.2 Búsqueda híbrida

La búsqueda vectorial encuentra similitud semántica.

Pero a veces necesitas coincidencias exactas.

Ejemplos:

- número de expediente;
- nombre de cliente;
- referencia legal;
- código de producto;
- error técnico;
- identificador;
- cláusula;
- fecha;
- importe.

La búsqueda híbrida combina:

```text
búsqueda semántica + búsqueda por palabras clave
```

Ejemplo:

```text
vector search + BM25
```

Ventajas:

- mejora recall;
- encuentra términos exactos;
- útil en documentación técnica;
- útil en legal;
- útil en soporte;
- reduce fallos de embeddings.

Limitaciones:

- más complejidad;
- hay que combinar scores;
- puede traer más ruido;
- requiere evaluación.

Cuándo usarla:

- si tus usuarios buscan códigos, nombres, IDs o términos exactos;
- si el retrieval semántico pierde fuentes obvias;
- si los documentos tienen vocabulario técnico.

---

## 19.3 Reranking

El retrieval inicial suele traer candidatos.

El reranker decide cuáles son más relevantes.

Flujo:

```text
pregunta → retrieval top 30 → reranker → top 5 → LLM
```

El reranker compara pregunta y fragmentos con más precisión que una búsqueda vectorial simple.

Ventajas:

- mejora precisión;
- reduce ruido;
- ayuda con documentos parecidos;
- mejora citas;
- permite recuperar más candidatos inicialmente.

Limitaciones:

- añade latencia;
- añade coste;
- requiere infraestructura o modelo extra;
- debe evaluarse.

Cuándo usarlo:

- hay muchos documentos;
- el top-k trae ruido;
- el sistema cita fuentes parecidas pero incorrectas;
- necesitas alta precisión.

No uses reranking por defecto si tu RAG básico ya funciona.

---

## 19.4 Query transformation

Los usuarios hacen preguntas vagas.

Ejemplo:

```text
¿Y si me voy antes?
```

El sistema puede transformarla en:

```text
terminación anticipada contrato penalización preaviso desistimiento
```

Tipos de transformación:

- reformulación;
- expansión;
- extracción de palabras clave;
- traducción;
- normalización;
- generación de consultas alternativas;
- detección de intención;
- desambiguación.

Ventajas:

- mejora retrieval;
- maneja lenguaje natural;
- ayuda con preguntas cortas.

Riesgos:

- cambia la intención;
- busca algo que el usuario no pidió;
- añade coste;
- puede sesgar respuesta.

Buena práctica:

Guardar la pregunta original y la transformada.

Evaluar ambas.

---

## 19.5 Multi-query retrieval

Multi-query genera varias consultas para la misma pregunta.

Ejemplo:

Pregunta:

```text
¿Qué pasa si cancelo antes el contrato?
```

Consultas:

```text
cancelación anticipada contrato
terminación antes de plazo
penalización por desistimiento
preaviso para finalizar contrato
```

Después se combinan resultados.

Ventajas:

- mejora cobertura;
- captura sinónimos;
- ayuda en documentos largos;
- mejora recall.

Limitaciones:

- más búsquedas;
- más coste;
- más ruido;
- necesita deduplicación;
- suele necesitar reranking.

Útil cuando el vocabulario del usuario y el de los documentos no coinciden.

---

## 19.6 HyDE

HyDE significa *Hypothetical Document Embeddings*.

La idea:

1. El modelo genera un documento hipotético que respondería a la pregunta.
2. Se crea embedding de ese documento hipotético.
3. Se usa para buscar documentos reales.

Flujo:

```text
pregunta → respuesta hipotética → embedding → retrieval → fuentes reales → respuesta final
```

Puede funcionar cuando la pregunta es muy abstracta o corta.

Ejemplo:

```text
¿Cómo se gestiona una baja?
```

El documento hipotético puede incluir términos como:

```text
incapacidad temporal, comunicación, justificante, plazo, RRHH
```

Riesgos:

- el documento hipotético puede inventar;
- puede sesgar la búsqueda;
- añade una llamada al modelo;
- no siempre mejora.

HyDE debe probarse con dataset.

No activarse por moda.

---

## 19.7 Contextual retrieval

Contextual retrieval añade contexto adicional a cada chunk.

Problema:

Un chunk aislado puede perder sentido.

Ejemplo:

```text
El plazo será de 15 días.
```

Contextual retrieval puede enriquecerlo:

```text
Este fragmento pertenece a la sección "Terminación anticipada" del contrato de alquiler. Habla del plazo de preaviso.
```

Esto mejora embeddings y retrieval.

Formas:

- añadir título;
- añadir resumen de sección;
- añadir metadata textual;
- añadir contexto jerárquico;
- generar descripción breve por chunk.

Ventajas:

- mejora chunks pequeños;
- ayuda con documentos jerárquicos;
- mejora recuperación.

Limitaciones:

- más procesamiento;
- riesgo de generar contexto incorrecto;
- más almacenamiento;
- más coste de embeddings.

---

## 19.8 Parent-child retrieval

En parent-child retrieval se indexan chunks pequeños, pero se devuelven bloques mayores.

Ejemplo:

- chunk hijo: párrafo exacto;
- documento padre: sección completa.

Flujo:

```text
buscar chunk pequeño → recuperar sección padre → pasar al LLM
```

Ventajas:

- precisión en búsqueda;
- más contexto para generación;
- mejores respuestas;
- útil en documentos largos.

Limitaciones:

- más complejidad;
- puede meter contexto excesivo;
- requiere estructura documental.

Muy útil cuando las respuestas requieren ver el entorno de un fragmento.

---

## 19.9 Summary retrieval

Otra técnica es crear resúmenes de documentos o secciones y buscarlos.

Flujo:

```text
documento → resumen por sección → índice de resúmenes → recuperar secciones → respuesta
```

Útil cuando:

- documentos son muy largos;
- quieres navegación semántica;
- preguntas son generales;
- necesitas identificar secciones relevantes.

Riesgos:

- los resúmenes pierden detalles;
- pueden introducir errores;
- requieren actualización;
- no sustituyen texto original para citas.

Buenas prácticas:

- usar resumen para localizar;
- usar texto original para responder.

---

## 19.10 Compression

Context compression reduce los chunks antes de pasarlos al modelo.

Ejemplo:

```text
retrieval top 10 → compresor → fragmentos relevantes → LLM
```

Puede hacerse con:

- modelo pequeño;
- extracción de frases relevantes;
- resumen;
- reglas;
- filtros.

Ventajas:

- reduce coste;
- reduce contexto;
- elimina ruido;
- mejora foco.

Riesgos:

- puede borrar información importante;
- puede introducir sesgo;
- añade latencia;
- difícil de auditar.

Úsalo con cuidado en dominios sensibles.

---

## 19.11 Corrective RAG

Corrective RAG intenta detectar si las fuentes recuperadas son suficientes.

Flujo:

```text
pregunta → retrieval → evaluación de fuentes → si malas, reformular/buscar otra vez → responder
```

Puede incluir:

- judge de relevancia;
- query rewriting;
- búsqueda web/interna adicional;
- fallback;
- respuesta “no encontrado”.

Ventajas:

- reduce respuestas con fuentes malas;
- mejora robustez;
- permite reintentos controlados.

Limitaciones:

- más coste;
- más latencia;
- más complejidad;
- el evaluador puede equivocarse.

Útil cuando el retrieval falla con frecuencia.

---

## 19.12 Self-RAG

Self-RAG introduce autoevaluación durante el proceso de respuesta.

El modelo puede decidir:

- si necesita recuperar más;
- si la fuente es relevante;
- si la respuesta está soportada;
- si debe revisar.

Conceptualmente:

```text
responder → criticar soporte → ajustar → responder final
```

Puede mejorar fidelidad.

Pero también puede ser costoso y difícil de depurar.

En producción, suele ser mejor implementar pasos explícitos:

```text
retrieval → judge → generación → judge → respuesta
```

Más controlable que meter todo en un prompt gigante.

---

## 19.13 Agentic RAG

Agentic RAG usa un agente para decidir cómo buscar, qué fuentes consultar y cómo responder.

Ejemplo:

```text
Usuario pregunta
→ agente decide buscar en manuales
→ luego busca en tickets
→ luego consulta base de datos
→ compara resultados
→ responde con fuentes
```

Ventajas:

- flexible;
- útil con múltiples herramientas;
- puede manejar tareas complejas;
- puede hacer varias búsquedas;
- puede pedir aclaración.

Limitaciones:

- coste;
- latencia;
- riesgo de loops;
- dificultad de depuración;
- seguridad;
- permisos;
- tool injection.

Cuándo usarlo:

- múltiples fuentes;
- preguntas complejas;
- herramientas heterogéneas;
- necesidad de decidir estrategia.

No lo uses si una búsqueda simple basta.

---

## 19.14 GraphRAG

GraphRAG usa grafos de entidades y relaciones para mejorar recuperación y síntesis.

En vez de tratar documentos solo como chunks, extrae o representa:

```text
entidades → relaciones → comunidades → resúmenes → consultas
```

Ejemplo:

- Persona A trabaja en proyecto X.
- Proyecto X pertenece a cliente Y.
- Cliente Y tiene contrato Z.
- Contrato Z contiene cláusula K.

GraphRAG puede ayudar cuando importan relaciones.

Casos:

- investigación;
- inteligencia corporativa;
- documentación compleja;
- relaciones entre entidades;
- expedientes;
- redes de conocimiento;
- análisis multi-documento;
- preguntas globales.

Ejemplo de pregunta:

```text
¿Qué proveedores están relacionados con incidencias de seguridad repetidas?
```

Un vector search simple puede quedarse corto.

---

## 19.15 Cuándo usar GraphRAG

GraphRAG puede tener sentido cuando:

- necesitas responder preguntas globales;
- hay muchas entidades;
- las relaciones importan;
- los documentos se conectan entre sí;
- necesitas descubrir patrones;
- hay análisis multi-hop;
- quieres navegar conocimiento.

No tiene sentido si:

- solo tienes pocos PDFs;
- las preguntas son directas;
- no hay relaciones complejas;
- no tienes evaluación;
- no puedes mantener el grafo;
- el equipo no puede operar la complejidad.

GraphRAG no es un upgrade automático.

Es otra arquitectura.

---

## 19.16 Problemas de GraphRAG

GraphRAG puede fallar por:

- extracción incorrecta de entidades;
- relaciones inventadas;
- duplicados;
- normalización de nombres;
- grafos ruidosos;
- coste de construcción;
- dificultad de actualización;
- explicabilidad;
- mantenimiento;
- complejidad de consultas;
- evaluación difícil.

Ejemplo:

```text
IBM
I.B.M.
International Business Machines
IBM España
```

¿Son la misma entidad?

La normalización importa.

---

## 19.17 Hybrid Graph + Vector RAG

Una arquitectura avanzada puede combinar:

```text
vector search → fragmentos relevantes
graph search → entidades/relaciones
LLM → síntesis con fuentes
```

Esto permite:

- recuperar texto exacto;
- incorporar relaciones;
- responder preguntas multi-hop;
- citar documentos;
- navegar entidades.

Pero requiere mucha ingeniería.

No lo uses en MVP salvo que el problema lo exija.

---

## 19.18 RAG con bases de datos SQL

No todo conocimiento vive en documentos.

A veces la respuesta está en una base de datos.

Ejemplo:

```text
¿Cuántas incidencias abiertas tiene el cliente ACME?
```

Esto no debería responderse con vector search sobre documentos.

Debe consultarse SQL o una API.

Patrón:

```text
intención → SQL/tool → resultado estructurado → explicación LLM
```

RAG documental y consultas estructuradas pueden convivir.

No uses embeddings para reemplazar SQL.

---

## 19.19 RAG con APIs

Muchas respuestas requieren datos vivos:

- estado de pedido;
- ticket actual;
- disponibilidad;
- saldo;
- calendario;
- inventario;
- CRM;
- ERP.

Patrón:

```text
pregunta → tool/API → datos actuales → LLM redacta
```

Esto se parece más a tool calling que a RAG clásico.

Pero el principio es similar:

> el modelo responde con contexto externo recuperado en el momento.

---

## 19.20 RAG multimodal

RAG no tiene que ser solo texto.

Puede incluir:

- imágenes;
- capturas;
- diagramas;
- audio;
- vídeo;
- tablas;
- PDFs escaneados;
- planos;
- radiografías;
- gráficos.

Riesgos:

- extracción multimodal difícil;
- coste;
- evaluación;
- permisos;
- precisión;
- fuentes visuales;
- trazabilidad.

En muchos casos conviene convertir a representaciones intermedias:

- OCR;
- descripciones;
- tablas estructuradas;
- captions;
- metadatos;
- embeddings multimodales.

---

## 19.21 RAG temporal

Algunas preguntas dependen de tiempo.

Ejemplo:

```text
¿Qué política estaba vigente en marzo de 2024?
```

Necesitas:

- fecha de documento;
- fecha de vigencia;
- versión;
- estado;
- historial;
- filtros temporales.

Sin eso, el RAG puede responder con la versión actual a una pregunta histórica.

Metadata temporal es crítica en legal, administración, RRHH y compliance.

---

## 19.22 RAG con permisos dinámicos

Permisos pueden depender de:

- usuario;
- departamento;
- cliente;
- proyecto;
- contrato;
- rol;
- fecha;
- estado del caso.

Retrieval debe aplicar filtros.

Ejemplo:

```text
where tenant_id = X
and user_has_access(document_id)
and status = active
```

No basta con prompt.

Permisos son backend.

---

## 19.23 RAG multi-tenant

Si vendes RAG a varias empresas, necesitas multi-tenancy.

Riesgos:

- fuga entre clientes;
- índices compartidos mal filtrados;
- logs mezclados;
- backups;
- permisos;
- borrado de datos;
- auditoría.

Opciones:

- base/índice separado por cliente;
- tenant_id fuerte en todos los registros;
- aislamiento por schema;
- aislamiento físico para clientes sensibles.

La decisión afecta coste y seguridad.

---

## 19.24 RAG local avanzado

En RAG local avanzado puedes combinar:

- embeddings locales;
- vector DB local;
- modelo local;
- reranker local;
- interfaz LAN;
- backups;
- permisos;
- modelos cloud opcionales.

Ventajas:

- privacidad;
- coste fijo;
- independencia;
- control.

Limitaciones:

- hardware;
- latencia;
- calidad;
- mantenimiento;
- actualizaciones;
- soporte.

Un RAG local avanzado debe tener instalación reproducible.

No puede depender de pasos manuales caóticos.

---

## 19.25 RAG híbrido avanzado

Arquitectura posible:

```text
datos sensibles → local
retrieval → local
clasificación → modelo local pequeño
respuesta simple → local
respuesta compleja anonimizada → cloud
evaluación → local/cloud según riesgo
```

El punto clave:

> Decide qué sale y qué no sale.

No basta con decir “híbrido”.

Hay que documentar flujo de datos.

---

## 19.26 Evaluación continua

RAG avanzado requiere evaluación continua.

Cada cambio puede romper algo:

- nuevo modelo;
- nuevo embedding;
- nuevo chunking;
- nuevo prompt;
- nuevo reranker;
- nuevos documentos;
- nueva versión.

Proceso:

```text
cambio → ejecutar golden dataset → comparar métricas → aceptar/rechazar
```

Métricas:

- retrieval recall;
- faithfulness;
- citation accuracy;
- answer correctness;
- refusal accuracy;
- latency;
- cost.

Sin evaluación continua, RAG avanzado es apuesta.

---

## 19.27 Observabilidad avanzada

Registra:

- query original;
- query transformada;
- filtros aplicados;
- chunks candidatos;
- chunks rerankeados;
- fuentes finales;
- prompt version;
- modelo;
- coste;
- latencia por etapa;
- respuesta;
- feedback;
- errores.

Esto permite responder:

```text
¿Por qué el sistema respondió eso?
```

Si no puedes responder, el sistema no está listo para entornos serios.

---

## 19.28 RAG y caché

Cachear puede reducir coste y latencia.

Tipos:

- cache de embeddings;
- cache de retrieval;
- cache de respuestas;
- cache de documentos procesados;
- cache de reranking.

Cuidado:

- permisos;
- documentos actualizados;
- respuestas obsoletas;
- usuarios distintos;
- datos sensibles.

Nunca sirvas respuesta cacheada a un usuario sin verificar permisos y versión de fuentes.

---

## 19.29 RAG y feedback loops

Feedback de usuarios puede alimentar:

- golden dataset;
- mejora de documentos;
- ajuste de chunking;
- nuevos sinónimos;
- reglas de query transformation;
- detección de documentos obsoletos;
- nuevas FAQs;
- mejoras de prompt.

Pero no automatices todo feedback sin revisión.

Un usuario puede estar equivocado.

Feedback debe curarse.

---

## 19.30 RAG y memoria

Memoria puede mejorar experiencia.

Ejemplo:

```text
usuario suele preguntar sobre cliente ACME
usuario trabaja en departamento legal
conversación actual trata sobre contrato X
```

Pero cuidado:

- privacidad;
- permisos;
- memoria obsoleta;
- mezcla de clientes;
- contaminación de contexto;
- datos sensibles.

Memoria no debe saltarse retrieval ni permisos.

---

## 19.31 RAG y agentes

RAG aporta conocimiento.

Agentes aportan acción.

Combinación:

```text
RAG encuentra procedimiento
Agente prepara borrador
Humano confirma
Tool ejecuta
```

Buenas prácticas:

- RAG read-only;
- tools con permisos mínimos;
- confirmación para acciones;
- logs;
- separación de fuentes e instrucciones;
- evitar que documentos ordenen acciones.

---

## 19.32 RAG y MCP

MCP puede conectar RAG con herramientas:

- filesystem;
- GitHub;
- Postgres;
- navegador;
- documentación;
- tickets;
- CRMs;
- wikis.

Arquitectura:

```text
LLM/agent → MCP tools → fuentes/herramientas → contexto → respuesta/acción
```

Riesgos:

- credenciales;
- permisos amplios;
- prompt injection;
- tool injection;
- acciones no deseadas;
- auditoría insuficiente.

MCP es potente.

Pero debe entrar con gobernanza.

---

## 19.33 RAG y seguridad

RAG avanzado debe considerar:

- prompt injection;
- data exfiltration;
- permisos;
- logs;
- multi-tenancy;
- documentos maliciosos;
- tool injection;
- proveedores externos;
- retención;
- borrado;
- auditoría.

Prompt no basta.

Necesitas controles en backend.

---

## 19.34 RAG y privacidad

Preguntas:

- ¿qué datos se envían al modelo?
- ¿qué datos se envían al embedding provider?
- ¿qué queda en logs?
- ¿qué se almacena en vector DB?
- ¿cómo se borra un documento?
- ¿cómo se borran sus embeddings?
- ¿hay backups?
- ¿hay terceros?
- ¿hay datos personales?
- ¿hay datos sensibles?

RAG puede multiplicar copias de información.

Cada copia cuenta.

---

## 19.35 RAG y coste por etapa

Desglosa coste:

```text
ingesta
extracción
OCR
embedding
almacenamiento
retrieval
reranking
generación
evaluación
logs
mantenimiento
```

Si no sabes qué etapa cuesta más, no puedes optimizar.

---

## 19.36 Arquitectura avanzada por capas

```text
1. Fuentes
2. Ingesta
3. Extracción
4. Normalización
5. Chunking
6. Enriquecimiento contextual
7. Embeddings
8. Índice híbrido
9. Retrieval
10. Reranking
11. Compresión
12. Prompt
13. Generación
14. Verificación
15. Respuesta con fuentes
16. Feedback
17. Evaluación
18. Observabilidad
```

No todas las capas son necesarias siempre.

Pero el mapa ayuda.

---

## 19.37 Cuándo añadir cada técnica

```markdown
| Problema | Técnica posible |
|---|---|
| No encuentra términos exactos | Búsqueda híbrida |
| Trae fuentes parecidas pero malas | Reranking |
| Preguntas vagas | Query transformation |
| Vocabulario usuario ≠ documentos | Multi-query |
| Chunks pierden contexto | Contextual retrieval |
| Necesitas precisión + contexto | Parent-child retrieval |
| Documentos enormes | Summary retrieval |
| Mucho ruido en contexto | Compression |
| Fuentes malas frecuentes | Corrective RAG |
| Relaciones entre entidades | GraphRAG |
| Varias fuentes/tools | Agentic RAG |
| Datos estructurados | SQL/tool calling |
| Datos vivos | APIs/tools |
```

La técnica sigue al problema.

---

## 19.38 Antipatrones

### Añadir GraphRAG sin necesidad

Complejidad prematura.

### Usar agentes para una pregunta simple

Coste y riesgo.

### Multi-query sin deduplicación

Más ruido.

### HyDE sin evaluación

Puede sesgar búsqueda.

### Reranking sin medir

Más latencia sin beneficio.

### Context compression en legal sin control

Puede borrar detalles críticos.

### RAG híbrido sin mapa de datos

Privacidad dudosa.

### Cache sin permisos

Riesgo de fuga.

### Graph con entidades no normalizadas

Caos.

### Evaluación solo automática

Falsa seguridad.

---

## 19.39 Ideas clave del capítulo

- RAG avanzado debe responder a problemas concretos.
- Búsqueda híbrida mejora recuperación de términos exactos.
- Reranking mejora precisión cuando hay muchos candidatos.
- Query transformation y multi-query ayudan con preguntas vagas.
- HyDE puede mejorar retrieval, pero puede sesgar.
- Contextual y parent-child retrieval ayudan a no perder contexto.
- Corrective RAG añade control cuando retrieval falla.
- GraphRAG sirve si las relaciones importan, no como upgrade universal.
- Agentic RAG es útil con múltiples herramientas, pero aumenta riesgo.
- RAG avanzado sin evaluación y observabilidad es peligroso.

---

## 19.40 Checklist práctica

Antes de añadir RAG avanzado:

- ¿Qué problema concreto quiero resolver?
- ¿Tengo ejemplos donde falla?
- ¿Tengo golden dataset?
- ¿Puedo medir mejora?
- ¿Cuánto coste añade?
- ¿Cuánta latencia añade?
- ¿Aumenta complejidad operativa?
- ¿Afecta permisos?
- ¿Afecta privacidad?
- ¿Afecta citas?
- ¿Se puede depurar?
- ¿Se puede hacer rollback?
- ¿Hay alternativa más simple?
- ¿El equipo puede mantenerlo?
- ¿El usuario notará mejora?

---

## 19.41 Plantilla de decisión para técnica RAG avanzada

```markdown
# Decisión técnica RAG

## Problema observado

Descripción.

## Evidencia

Ejemplos del golden dataset o logs.

## Técnica propuesta

Nombre.

## Alternativas

Opciones más simples.

## Impacto esperado

Qué métrica debe mejorar.

## Coste

Tokens, infraestructura, mantenimiento.

## Latencia

Impacto esperado.

## Riesgos

Privacidad, seguridad, complejidad.

## Plan de prueba

Dataset, métricas, duración.

## Criterio de adopción

Qué debe cumplirse.

## Resultado

Adoptar / rechazar / seguir probando.
```

---

## 19.42 Qué puede cambiar en el futuro

Cambiarán:

- rerankers;
- frameworks;
- GraphRAG;
- Agentic RAG;
- embeddings;
- context windows;
- modelos locales;
- herramientas de evaluación;
- protocolos como MCP;
- vector databases;
- costes.

Pero probablemente seguirá siendo cierto:

> La técnica avanzada correcta es la que mejora un fallo real de forma medible y mantenible.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 17 — Arquitectura RAG básica
- Capítulo 18 — Problemas reales en RAG
- Capítulo 20 — Herramientas RAG
- Capítulo 24 — Qué es un agente de IA
- Capítulo 26 — MCP
- Capítulo 27 — Arquitecturas agenticas
- Capítulo 48 — Seguridad
- Capítulo 50 — Evaluación
- Apéndice C — Plantillas RAG
- Apéndice F — Tabla viva de herramientas RAG
