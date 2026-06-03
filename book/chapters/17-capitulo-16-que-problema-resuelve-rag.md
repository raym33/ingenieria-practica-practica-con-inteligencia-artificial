---
title: "Capítulo 16 — Qué problema resuelve RAG"
chapter: "17"
part: "Parte V — RAG y conocimiento privado"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "básico-intermedio"
estimated_reading_time: "38 minutos"
---

# Capítulo 16 — Qué problema resuelve RAG

RAG es una de las siglas más repetidas en la ingeniería con LLMs.

Significa **Retrieval-Augmented Generation**.

En español podríamos traducirlo como:

> Generación aumentada mediante recuperación de información.

Pero esa definición suena más complicada de lo necesario.

Una forma más práctica de entenderlo es esta:

> RAG permite que un modelo responda usando información externa recuperada en el momento de la pregunta.

El modelo no responde solo con lo que “sabe” por entrenamiento.

Responde con ayuda de documentos, bases de conocimiento, fragmentos, fuentes, registros, manuales, contratos, tickets, emails, páginas o datos internos que el sistema le proporciona.

RAG no es una moda.

Es una respuesta a un problema muy concreto:

> Los modelos de lenguaje no tienen acceso fiable, actualizado y verificable a todo el conocimiento que necesita una aplicación real.

Este capítulo explica qué problema resuelve RAG, cuándo usarlo, cuándo no, y por qué es una pieza central para productos de IA en empresas, PYMEs, administraciones, educación, legal, salud y software.

---

## 16.1 El problema del conocimiento en los LLMs

Un LLM tiene conocimiento aprendido durante entrenamiento.

Ese conocimiento puede ser enorme.

Pero tiene límites.

### No siempre está actualizado

El modelo puede no conocer información reciente.

### No conoce tus documentos internos

No sabe tus contratos, manuales, políticas, emails, expedientes, tickets o procedimientos.

### No puede citar por defecto

Puede responder con seguridad, pero no necesariamente con fuentes verificables.

### Puede mezclar conocimiento general con información inventada

Esto es especialmente peligroso en dominios sensibles.

### No sabe qué versión es correcta

Si hay documentos contradictorios, obsoletos o duplicados, puede equivocarse.

### No respeta permisos por sí solo

Si no diseñas control de acceso, puede usar información que un usuario no debería ver.

RAG aparece para resolver parte de estos problemas.

No todos.

Pero sí una parte muy importante.

---

## 16.2 El problema no es que el modelo sea “tonto”

A veces se plantea mal:

> El modelo no sabe responder. Necesito entrenarlo más.

Pero muchas veces el problema no es capacidad.

Es acceso a información correcta.

Ejemplo:

Usuario:

```text
¿Cuál es el procedimiento interno para solicitar vacaciones?
```

El modelo puede saber en general cómo se solicitan vacaciones.

Pero no sabe el procedimiento específico de tu empresa.

Necesita fuentes.

Otro ejemplo:

```text
¿Qué dice la cláusula de renovación automática de este contrato?
```

El modelo no debería responder desde conocimiento general.

Debe leer el contrato.

Otro ejemplo:

```text
¿Cuál es el horario actualizado de atención al ciudadano para este trámite?
```

Si la información cambia, el modelo necesita una fuente actual.

RAG no hace al modelo omnisciente.

Le da contexto específico.

---

## 16.3 RAG frente a conocimiento general

Sin RAG:

```text
usuario → modelo → respuesta basada en entrenamiento/contexto previo
```

Con RAG:

```text
usuario → recuperación de información relevante → modelo → respuesta basada en fuentes
```

La diferencia es enorme.

Sin RAG, el modelo improvisa más.

Con RAG, el sistema puede decir:

> Responde solo usando estos fragmentos.

Eso permite:

- respuestas más verificables;
- citas;
- actualización de conocimiento sin reentrenar;
- uso de documentos internos;
- control por permisos;
- trazabilidad;
- reducción de alucinaciones;
- productos más confiables.

Pero solo si el RAG está bien diseñado.

---

## 16.4 La idea central de RAG

RAG combina dos capacidades:

### Recuperar

Encontrar información relevante.

```text
Pregunta → búsqueda → fragmentos relevantes
```

### Generar

Usar esos fragmentos para responder.

```text
fragmentos + pregunta → respuesta
```

El modelo no busca mágicamente.

El sistema busca.

Luego el modelo redacta.

Ese matiz es importante.

En una arquitectura RAG seria, hay mucho software alrededor del modelo:

- ingestión de documentos;
- extracción de texto;
- limpieza;
- división en chunks;
- embeddings;
- índices;
- búsqueda;
- filtros;
- reranking;
- permisos;
- prompts;
- citas;
- evaluación;
- logs;
- feedback.

RAG no es una llamada a un modelo.

Es un sistema.

---

## 16.5 Ejemplo simple de RAG

Imagina una empresa con un manual interno.

Manual:

```text
Las solicitudes de vacaciones deben registrarse en el portal interno antes del día 20 del mes anterior.
El responsable directo debe aprobar la solicitud en un plazo máximo de 5 días laborables.
```

Pregunta:

```text
¿Cuándo debo pedir vacaciones?
```

El sistema RAG:

1. Convierte la pregunta en una búsqueda.
2. Encuentra el fragmento del manual.
3. Lo inserta en el contexto del modelo.
4. Pide responder solo con esa fuente.
5. Devuelve:

```text
Debes registrar la solicitud de vacaciones en el portal interno antes del día 20 del mes anterior. Después, tu responsable directo debe aprobarla en un plazo máximo de 5 días laborables.

Fuente: Manual interno de vacaciones.
```

Esto parece simple.

Pero es muy poderoso.

---

## 16.6 RAG no es solo búsqueda semántica

Muchos confunden RAG con vector database.

Una base vectorial puede ser parte de RAG.

Pero RAG no es solo embeddings.

RAG incluye:

```text
datos → extracción → chunks → indexación → recuperación → selección → generación → evaluación
```

Puedes tener RAG con:

- búsqueda semántica;
- búsqueda por palabras clave;
- búsqueda híbrida;
- filtros metadata;
- bases SQL;
- APIs;
- graph databases;
- motores documentales;
- reranking;
- reglas deterministas.

La búsqueda vectorial es una herramienta.

No toda la arquitectura.

---

## 16.7 Cuándo usar RAG

RAG tiene sentido cuando:

- necesitas responder con información específica;
- hay documentos o datos externos;
- el conocimiento cambia;
- necesitas citas;
- quieres evitar reentrenar;
- tienes información privada;
- el usuario pregunta sobre una base documental;
- quieres trazabilidad;
- necesitas controlar permisos;
- quieres reducir alucinaciones;
- tienes fuentes recuperables.

Casos típicos:

- asistente documental;
- chatbot interno;
- soporte técnico;
- legal;
- salud supervisada;
- educación;
- administración pública;
- manuales de empresa;
- documentación de producto;
- onboarding de empleados;
- knowledge base;
- preguntas sobre contratos;
- análisis de expedientes.

---

## 16.8 Cuándo no usar RAG

RAG no siempre es necesario.

No lo uses si:

- la tarea no necesita fuentes externas;
- el conocimiento está en la propia entrada;
- basta una regla determinista;
- basta una consulta SQL;
- el problema es generación creativa;
- los documentos son pocos y caben directamente en contexto;
- la información no debe recuperarse automáticamente;
- no tienes datos de calidad;
- no puedes evaluar;
- no necesitas citas ni actualización.

Ejemplo:

```text
Genera 10 nombres para una app de notas.
```

No necesitas RAG.

Ejemplo:

```text
Clasifica este email como soporte o ventas.
```

Probablemente no necesitas RAG.

Ejemplo:

```text
Calcula el IVA de esta factura.
```

Necesitas cálculo y validación, no RAG.

RAG es potente, pero no debe usarse por moda.

---

## 16.9 RAG frente a fine-tuning

Una duda frecuente:

> ¿Uso RAG o fine-tuning?

Regla práctica:

```text
Conocimiento cambiante o documental → RAG
Comportamiento, estilo o formato repetido → fine-tuning posible
```

RAG sirve para consultar información.

Fine-tuning sirve para adaptar comportamiento del modelo.

Ejemplo:

Quieres que el modelo responda con documentos internos actualizados.

Usa RAG.

Quieres que el modelo escriba siempre con un estilo específico o clasifique un tipo de texto muy concreto.

Fine-tuning podría tener sentido.

Pero incluso con fine-tuning, muchas aplicaciones siguen necesitando RAG.

Fine-tuning no es una base de datos.

---

## 16.10 RAG frente a contexto largo

Otra duda:

> Si el modelo tiene mucho contexto, ¿sigo necesitando RAG?

A veces sí.

Una ventana de contexto grande permite meter más texto.

Pero no soluciona todo.

Problemas:

- coste;
- latencia;
- ruido;
- documentos irrelevantes;
- dificultad para seleccionar;
- permisos;
- actualización;
- duplicados;
- fuentes;
- trazabilidad;
- límites prácticos;
- pérdida de atención.

RAG no solo reduce contexto.

RAG selecciona.

Aunque tengas contexto largo, necesitas saber qué información meter.

---

## 16.11 RAG frente a búsqueda clásica

Búsqueda clásica encuentra documentos.

RAG genera respuestas a partir de documentos.

Ambas pueden convivir.

Ejemplo:

Búsqueda clásica:

```text
Resultados:
- Manual vacaciones.pdf
- Política RRHH.pdf
- FAQ interna
```

RAG:

```text
Debes solicitar vacaciones antes del día 20 del mes anterior...
Fuente: Manual vacaciones.pdf
```

RAG mejora experiencia cuando el usuario no quiere abrir diez documentos.

Pero búsqueda clásica sigue siendo útil.

Especialmente si el usuario quiere verificar, comparar o navegar.

Un buen sistema puede ofrecer ambas cosas:

- respuesta sintética;
- fuentes;
- enlaces;
- fragmentos;
- documentos completos.

---

## 16.12 RAG frente a agentes

RAG responde con conocimiento.

Un agente actúa con herramientas.

Pueden combinarse.

Ejemplo:

```text
RAG → encuentra política de vacaciones
Agente → prepara solicitud en portal interno
Humano → confirma envío
```

Pero no confundas.

Si solo necesitas responder preguntas documentales, no necesitas un agente autónomo.

Si necesitas ejecutar acciones, entonces quizá necesitas tools o agentes.

Muchos productos se complican porque añaden agentes donde bastaba RAG.

---

## 16.13 RAG para empresas

Las empresas tienen información dispersa:

- documentos;
- wikis;
- emails;
- tickets;
- PDFs;
- manuales;
- contratos;
- presentaciones;
- hojas de cálculo;
- bases de datos;
- normativa;
- conversaciones.

RAG ayuda a convertir esa información en una interfaz consultable.

Valor:

- ahorrar tiempo;
- reducir dependencia de expertos internos;
- mejorar onboarding;
- responder soporte;
- encontrar conocimiento;
- generar borradores;
- detectar inconsistencias;
- mejorar acceso a documentación.

Pero requiere gobernanza.

Si la documentación está mal, el RAG sufrirá.

---

## 16.14 RAG para PYMEs

En PYMEs, RAG puede ser especialmente útil porque suele haber mucho conocimiento informal.

Ejemplos:

- “eso lo sabe María”;
- carpetas compartidas;
- PDFs antiguos;
- emails;
- procedimientos no actualizados;
- presupuestos previos;
- contratos;
- normativa;
- plantillas.

Un RAG simple puede aportar mucho si:

- organiza documentación;
- responde con fuentes;
- reduce búsquedas;
- genera borradores;
- funciona con bajo mantenimiento.

Pero la solución debe ser sencilla.

Una PYME no quiere administrar un sistema complejo.

Quiere ahorrar tiempo.

---

## 16.15 RAG local

RAG local significa que documentos, embeddings, búsqueda y generación pueden ejecutarse en infraestructura propia.

Ventajas:

- privacidad;
- control;
- coste predecible;
- instalación on-premise;
- independencia;
- uso con documentos sensibles.

Casos:

- despachos;
- clínicas;
- gestorías;
- asesorías;
- administración pública;
- investigación;
- educación;
- empresas con IP sensible.

Riesgos:

- calidad del modelo local;
- mantenimiento;
- hardware;
- backups;
- seguridad;
- actualizaciones;
- latencia.

RAG local es uno de los casos más fuertes para IA local.

Pero no es gratis.

---

## 16.16 RAG híbrido

Un patrón frecuente:

```text
documentos y embeddings locales
+ recuperación local
+ modelo cloud para respuesta
```

O:

```text
modelo local para preguntas simples
+ modelo cloud para casos complejos
```

O:

```text
RAG local con datos sensibles
+ cloud solo con contexto anonimizado
```

Híbrido permite equilibrar:

- privacidad;
- calidad;
- coste;
- velocidad;
- mantenimiento.

No hay una única respuesta.

Depende del riesgo.

---

## 16.17 RAG y permisos

En sistemas reales, no todos los usuarios deben ver todo.

Ejemplo:

- RRHH ve documentos laborales;
- ventas ve propuestas;
- legal ve contratos;
- soporte ve tickets;
- dirección ve informes;
- empleados ven políticas generales.

RAG debe respetar permisos antes de recuperar.

No después.

Flujo correcto:

```text
usuario → permisos → documentos autorizados → retrieval → respuesta
```

Flujo peligroso:

```text
todos los documentos → retrieval → modelo decide qué mostrar
```

El modelo no debe ser el sistema de permisos.

Los permisos son lógica determinista.

---

## 16.18 RAG y citas

Las citas son una de las grandes ventajas de RAG.

Permiten:

- verificar;
- auditar;
- confiar;
- corregir;
- detectar errores;
- enseñar fuentes;
- reducir alucinaciones.

Una respuesta RAG sin fuentes puede ser cómoda, pero menos confiable.

Formato útil:

```markdown
## Respuesta

...

## Fuentes

- Documento: Política RRHH, sección 3.2
- Documento: Manual interno, página 14
```

O incluso:

```text
[Fuente 1], [Fuente 2]
```

Lo importante es poder ir al origen.

---

## 16.19 RAG y “no encontrado”

Un buen RAG debe saber decir:

```text
No encuentro información suficiente en las fuentes disponibles.
```

Esto es una funcionalidad.

No un fallo.

Si el sistema responde siempre, inventará.

Casos donde debe decir no:

- retrieval vacío;
- fuentes irrelevantes;
- pregunta fuera de alcance;
- información contradictoria;
- documentos sin respuesta;
- usuario sin permisos;
- información obsoleta.

La confianza aumenta cuando el sistema reconoce límites.

---

## 16.20 RAG y documentos malos

Los documentos reales son caóticos.

Problemas:

- PDFs escaneados;
- tablas mal extraídas;
- encabezados repetidos;
- pies de página;
- columnas;
- documentos duplicados;
- versiones antiguas;
- nombres inconsistentes;
- imágenes;
- anexos;
- firmas;
- OCR defectuoso;
- documentos enormes;
- mezcla de idiomas.

Un RAG no arregla mágicamente documentos malos.

Necesita pipeline de ingestión.

---

## 16.21 RAG y actualización

Los documentos cambian.

Por tanto, el índice debe actualizarse.

Preguntas:

- ¿cada cuánto se reindexa?
- ¿qué pasa si un documento se modifica?
- ¿qué pasa si se borra?
- ¿cómo se versionan documentos?
- ¿cómo se detectan duplicados?
- ¿cómo se invalidan embeddings antiguos?
- ¿cómo se evita responder con versiones obsoletas?

Un RAG sin estrategia de actualización envejece.

Y un RAG viejo puede ser peor que no tener RAG.

---

## 16.22 RAG y evaluación

RAG debe evaluarse.

No basta con probar dos preguntas.

Métricas:

- ¿recupera fuentes correctas?
- ¿responde fielmente?
- ¿cita bien?
- ¿dice no cuando debe?
- ¿evita alucinaciones?
- ¿maneja preguntas ambiguas?
- ¿respeta permisos?
- ¿responde con latencia aceptable?
- ¿cuánto cuesta por consulta?

Dataset mínimo:

- preguntas frecuentes;
- preguntas con respuesta exacta;
- preguntas fuera de alcance;
- preguntas ambiguas;
- documentos contradictorios;
- documentos obsoletos;
- preguntas por usuario con permisos distintos.

Sin evaluación, RAG es una caja negra.

---

## 16.23 El pipeline RAG básico

```text
1. Ingesta
2. Extracción de texto
3. Limpieza
4. Chunking
5. Embeddings
6. Indexación
7. Consulta
8. Retrieval
9. Reranking opcional
10. Construcción de prompt
11. Generación
12. Citas
13. Evaluación/logs
```

Cada paso puede fallar.

Por eso RAG es ingeniería.

---

## 16.24 Ingesta

La ingesta decide qué entra en el sistema.

Fuentes:

- PDFs;
- DOCX;
- TXT;
- Markdown;
- HTML;
- emails;
- bases de datos;
- tickets;
- wikis;
- Notion;
- SharePoint;
- Google Drive;
- GitHub;
- APIs.

Preguntas:

- ¿qué formatos aceptas?
- ¿quién puede subir?
- ¿qué tamaño máximo?
- ¿qué tipos bloqueas?
- ¿cómo detectas duplicados?
- ¿cómo registras fuente?
- ¿cómo actualizas?
- ¿cómo borras?

La calidad de RAG empieza en la ingesta.

---

## 16.25 Extracción

Extraer texto parece fácil hasta que llegan PDFs reales.

Problemas:

- texto en columnas;
- tablas;
- imágenes;
- OCR;
- encabezados;
- pies;
- saltos raros;
- encoding;
- documentos escaneados;
- formularios.

Herramientas posibles:

- parsers PDF;
- OCR;
- extractores de DOCX;
- herramientas de layout;
- servicios document AI;
- pipelines propios.

La extracción debe preservar metadatos:

- documento;
- página;
- sección;
- fecha;
- autor;
- versión;
- permisos;
- origen.

Sin metadatos, las citas se vuelven débiles.

---

## 16.26 Chunking

Chunking divide documentos en fragmentos.

Si los chunks son demasiado pequeños, pierdes contexto.

Si son demasiado grandes, introduces ruido.

Estrategias:

- por tamaño de tokens;
- por párrafo;
- por sección;
- por títulos;
- por página;
- por estructura;
- con overlap;
- section-aware chunking.

No hay chunking perfecto universal.

Depende de:

- tipo de documento;
- preguntas esperadas;
- modelo;
- embeddings;
- contexto;
- necesidad de citas.

Chunking es una de las decisiones más importantes en RAG.

---

## 16.27 Embeddings

Los embeddings convierten texto en vectores para búsqueda semántica.

Un buen embedding captura similitud de significado.

Pero debe evaluarse en tu dominio.

Preguntas:

- ¿funciona bien en español?
- ¿funciona con jerga legal?
- ¿funciona con lenguaje administrativo?
- ¿funciona con términos técnicos?
- ¿qué coste tiene?
- ¿es local o cloud?
- ¿qué dimensión tiene?
- ¿qué pasa si cambias de modelo?

Cambiar embedding puede requerir reindexar todo.

---

## 16.28 Retrieval

Retrieval busca fragmentos relevantes.

Puede ser:

- vectorial;
- keyword;
- híbrido;
- filtrado por metadata;
- SQL;
- graph-based;
- API-based.

El retrieval determina qué ve el modelo.

Si recupera mal, la respuesta será mala.

La generación no puede arreglar fuentes equivocadas.

---

## 16.29 Reranking

Reranking reordena resultados candidatos.

Flujo:

```text
retrieval inicial → 30 chunks → reranker → top 5 → modelo
```

Puede mejorar mucho.

Especialmente cuando hay:

- muchos documentos;
- chunks similares;
- preguntas ambiguas;
- documentos largos;
- búsqueda híbrida.

Coste:

- más latencia;
- más cómputo;
- más complejidad.

Úsalo cuando mejore mediblemente.

---

## 16.30 Prompt RAG

Prompt básico:

```text
Responde usando exclusivamente las fuentes proporcionadas.
Si no hay información suficiente, dilo.
Cita fuentes.
No inventes.
```

El prompt debe separar:

- instrucciones;
- contexto recuperado;
- pregunta;
- formato de salida.

Ejemplo:

```text
# Instrucciones
Usa solo el contexto.

# Contexto
{chunks}

# Pregunta
{question}

# Formato
Respuesta + fuentes.
```

No mezcles todo sin estructura.

---

## 16.31 RAG y logs

Registra:

- pregunta;
- usuario;
- documentos recuperados;
- scores;
- modelo;
- prompt version;
- latencia;
- coste;
- fuentes citadas;
- feedback;
- errores;
- respuesta “no encontrado”.

No registres contenido sensible sin necesidad.

Los logs permiten mejorar.

También pueden crear riesgos de privacidad.

---

## 16.32 RAG y feedback

El usuario puede ayudar.

Feedback simple:

- útil / no útil;
- fuente incorrecta;
- respuesta incompleta;
- debería saber esto;
- documento obsoleto;
- pregunta no respondida.

Ese feedback puede alimentar:

- mejora de documentos;
- reindexación;
- nuevos ejemplos de evaluación;
- ajustes de chunking;
- mejoras de prompt;
- detección de brechas.

Un RAG mejora si escucha uso real.

---

## 16.33 RAG no es magia empresarial

Un RAG no arregla:

- documentación inexistente;
- procesos caóticos;
- permisos mal definidos;
- datos obsoletos;
- decisiones sin responsable;
- mala calidad documental;
- expectativas irreales;
- falta de mantenimiento.

RAG amplifica conocimiento organizado.

Si el conocimiento está desordenado, parte del proyecto será ordenar.

---

## 16.34 RAG como producto

Un producto RAG necesita:

- onboarding documental;
- permisos;
- interfaz;
- citas;
- feedback;
- logs;
- evaluación;
- actualizaciones;
- backups;
- seguridad;
- monitorización;
- coste controlado;
- soporte;
- documentación.

La demo es fácil.

El producto es el sistema completo.

---

## 16.35 RAG para este libro

Este libro también podría tener RAG.

Casos:

- consultar capítulos;
- buscar plantillas;
- encontrar ejemplos;
- responder sobre arquitectura;
- sugerir capítulos relacionados;
- actualizar apéndices;
- detectar duplicados;
- crear índice temático.

Pero incluso aquí habría que:

- versionar capítulos;
- citar fichero y sección;
- actualizar índice;
- evitar mezclar versiones;
- marcar TODOs;
- evaluar respuestas.

Un libro vivo puede convertirse en base de conocimiento consultable.

---

## 16.36 Antipatrones

### Meter todos los documentos en contexto

Coste y ruido.

### Usar vector DB como solución mágica

Solo es una pieza.

### No citar fuentes

Pierdes confianza.

### No permitir “no encontrado”

El sistema inventa.

### No evaluar retrieval

No sabes si busca bien.

### No controlar permisos

Riesgo grave.

### No actualizar índice

Respuestas obsoletas.

### No limpiar documentos

Garbage in, garbage out.

### Empezar con GraphRAG sin necesitarlo

Complejidad prematura.

### Usar RAG cuando bastaba SQL

Sobreingeniería.

---

## 16.37 Ideas clave del capítulo

- RAG resuelve el problema de conectar modelos con conocimiento externo, específico y actualizable.
- No hace al modelo omnisciente; le da contexto recuperado.
- RAG no es solo una base vectorial.
- RAG es un pipeline completo: ingesta, extracción, chunks, embeddings, retrieval, generación, citas y evaluación.
- Es especialmente útil para conocimiento privado y documental.
- No sustituye permisos, seguridad ni orden documental.
- Un buen RAG sabe decir “no encontrado”.
- Las citas son fundamentales para confianza.
- El retrieval importa tanto como el modelo.
- RAG local e híbrido son claves para privacidad y PYMEs.

---

## 16.38 Checklist práctica

Antes de crear un RAG:

- ¿Qué problema resuelve?
- ¿Quién lo usará?
- ¿Qué documentos usará?
- ¿Los documentos están actualizados?
- ¿Qué formatos hay?
- ¿Hay PDFs escaneados?
- ¿Necesitas OCR?
- ¿Qué permisos existen?
- ¿Necesitas citas?
- ¿Qué pasa si no encuentra respuesta?
- ¿Qué embedding usarás?
- ¿Qué vector DB o índice?
- ¿Necesitas búsqueda híbrida?
- ¿Necesitas reranking?
- ¿Qué modelo generará respuestas?
- ¿Local, cloud o híbrido?
- ¿Cómo evaluarás retrieval?
- ¿Cómo evaluarás fidelidad?
- ¿Cómo se actualizarán documentos?
- ¿Cómo se borrarán datos?
- ¿Qué logs guardarás?
- ¿Qué datos no debes loggear?
- ¿Cómo recogerás feedback?

---

## 16.39 Plantilla de diseño RAG

```markdown
# Diseño RAG

## Problema

Qué pregunta o flujo resuelve.

## Usuarios

Quién consulta.

## Fuentes

Qué documentos o datos se usarán.

## Sensibilidad

Baja / media / alta.

## Permisos

Cómo se filtra acceso.

## Ingesta

Formatos aceptados.

## Extracción

Herramientas y limitaciones.

## Chunking

Estrategia.

## Embeddings

Modelo y motivo.

## Índice

Vector DB, búsqueda híbrida, filtros.

## Retrieval

Top-k, filtros, metadata.

## Reranking

Sí/no y motivo.

## Prompt

Reglas de respuesta.

## Citas

Formato.

## No encontrado

Comportamiento.

## Evaluación

Dataset y métricas.

## Logs

Qué se registra.

## Actualización

Cómo se reindexa.

## Riesgos

Lista.
```

---

## 16.40 Qué puede cambiar en el futuro

Cambiarán:

- modelos de embeddings;
- vector databases;
- rerankers;
- GraphRAG;
- Agentic RAG;
- herramientas de extracción;
- OCR;
- context windows;
- modelos locales;
- evaluación automática;
- frameworks;
- MCP y conectores.

Pero probablemente seguirá siendo cierto:

> RAG es útil cuando necesitas que un modelo responda con conocimiento externo verificable, actualizado y controlado.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 4 — LLMs para ingenieros ocupados
- Capítulo 7 — Modelos locales
- Capítulo 8 — Hardware real para IA local
- Capítulo 17 — Arquitectura RAG básica
- Capítulo 18 — Problemas reales en RAG
- Capítulo 19 — RAG avanzado
- Capítulo 20 — Herramientas RAG
- Capítulo 21 — Chatbots modernos
- Capítulo 32 — Por qué IA local
- Capítulo 50 — Evaluación
- Apéndice C — Plantillas RAG
- Apéndice F — Tabla viva de herramientas RAG
