---
title: "Capítulo 12 — Prompts para crear software"
chapter: "13"
part: "Parte III — Prompt Engineering y Context Engineering"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "intermedio"
estimated_reading_time: "38 minutos"
---

# Capítulo 12 — Prompts para crear software

La IA ha cambiado la forma de crear software.

Antes, un desarrollador escribía casi todo el código manualmente.  
Ahora puede diseñar, generar, revisar, refactorizar, documentar y probar con ayuda de modelos.  

Pero esto no significa que programar haya desaparecido.

Significa que la programación se ha desplazado.

Una parte del trabajo pasa de escribir cada línea a dirigir sistemas que escriben, modifican y revisan código.

Eso exige una habilidad nueva:

> Saber pedir software de forma que el modelo produzca algo útil, mantenible y verificable.

No basta con decir:

```text
Hazme una app.
```

Eso produce demos.

Para construir software real con IA necesitas prompts que definan contexto, arquitectura, restricciones, pasos, tests, límites y criterios de aceptación.

Este capítulo trata de eso.

No de “vibe coding” caótico.

Sino de usar prompts como herramientas para construir software con disciplina.

---

## 12.1 El error de pedir demasiado de golpe

El error más común es pedirle al modelo que construya todo de una vez.

Ejemplo:

```text
Crea una aplicación completa de gestión de clientes con login, base de datos, dashboard, pagos, IA, notificaciones y despliegue.
```

El modelo puede generar algo.

Pero probablemente será:

- incompleto;
- difícil de mantener;
- lleno de supuestos;
- sin tests;
- con estructura improvisada;
- con dependencias innecesarias;
- con errores ocultos;
- con seguridad débil;
- difícil de desplegar.

Los modelos funcionan mejor cuando la tarea está acotada.

El software real se construye por capas.

Prompt correcto:

```text
Primero ayúdame a definir el MVP.
No escribas código todavía.
Quiero entender entidades, flujos, arquitectura y riesgos.
```

La primera habilidad no es generar código.

Es frenar.

---

## 12.2 Antes del código: contexto del proyecto

Un buen prompt de software empieza con contexto.

Ejemplo:

```text
Estoy creando una aplicación web para una pequeña gestoría en España.
Objetivo: consultar documentos internos y generar borradores de respuesta.
Usuarios: 5 empleados.
Datos: PDFs, DOCX y emails.
Restricciones: privacidad alta, bajo coste, mantenimiento sencillo.
Stack preferido: Next.js, FastAPI, PostgreSQL y pgvector.
Fase actual: MVP.
```

Esto es mucho mejor que:

```text
Hazme un RAG.
```

El contexto debe incluir:

- objetivo del producto;
- usuarios;
- flujo principal;
- datos;
- stack;
- restricciones;
- fase;
- criterios de éxito;
- qué no quieres hacer;
- nivel técnico del equipo;
- entorno de despliegue.

El modelo no debe adivinar el producto.

Debe recibir el mapa.

---

## 12.3 Prompt para definir MVP

Antes de implementar, define MVP.

```text
Actúa como arquitecto de producto y software.

Quiero crear un MVP de una aplicación RAG privada para una PYME.
Contexto:
- 10 usuarios internos
- documentos PDF y DOCX
- preguntas sobre procedimientos
- privacidad alta
- presupuesto bajo
- despliegue local o híbrido

No escribas código todavía.

Devuelve:
1. Problema que resuelve
2. Usuario principal
3. Flujo principal del MVP
4. Funciones incluidas
5. Funciones excluidas
6. Entidades principales
7. Riesgos técnicos
8. Plan de implementación en 7 fases
```

Este prompt evita empezar por la pantalla o el endpoint.

Primero define alcance.

Un MVP claro reduce deuda técnica.

---

## 12.4 Prompt para arquitectura inicial

Después del MVP, pide arquitectura.

```text
Actúa como arquitecto de software.

Diseña la arquitectura técnica para el MVP descrito.

Requisitos:
- frontend web
- backend API
- autenticación básica
- subida de documentos
- extracción de texto
- embeddings
- búsqueda vectorial
- respuesta RAG con citas
- logs básicos
- despliegue con Docker

Stack preferido:
- Next.js
- FastAPI
- PostgreSQL
- pgvector
- Docker Compose

Devuelve:
1. Diagrama textual de componentes
2. Flujo de datos
3. Estructura de carpetas
4. Modelo de datos inicial
5. Endpoints API
6. Riesgos
7. Decisiones que dejarías para más adelante
```

Una buena arquitectura inicial no tiene que ser perfecta.

Pero debe evitar improvisación.

---

## 12.5 Prompt para estructura de carpetas

```text
Propón una estructura de carpetas para este proyecto.

Stack:
- frontend Next.js con TypeScript
- backend FastAPI
- PostgreSQL
- Docker Compose
- tests básicos

Criterios:
- simple para MVP;
- fácil de entender;
- preparada para crecer;
- separar frontend, backend, scripts y docs;
- no sobrearquitecturar.

Devuelve solo la estructura de carpetas con una breve explicación por bloque.
```

La estructura de carpetas condiciona cómo trabajará luego el agente.

Una estructura clara reduce errores futuros.

---

## 12.6 Prompt para modelo de datos

```text
Actúa como ingeniero backend.

Define el modelo de datos inicial para una app RAG documental.

Entidades:
- usuarios
- documentos
- extracciones de texto
- chunks
- embeddings
- conversaciones
- mensajes
- fuentes citadas
- logs de uso

Base de datos: PostgreSQL.

Devuelve:
1. Tablas recomendadas
2. Campos principales
3. Relaciones
4. Índices importantes
5. Qué dejarías fuera del MVP
6. Riesgos de privacidad
```

Pedir modelo de datos antes de código evita que el agente invente tablas en cada endpoint.

---

## 12.7 Prompt para dividir en tareas

```text
Divide esta implementación en tareas pequeñas para un agente de código.

Reglas:
- cada tarea debe ser independiente;
- cada tarea debe tener criterio de aceptación;
- no mezcles frontend y backend si no hace falta;
- incluye tests cuando proceda;
- prioriza un MVP funcional;
- evita tareas demasiado grandes.

Devuelve una tabla con:
- ID
- tarea
- archivos probables
- criterio de aceptación
- dependencia previa
```

Esto convierte una idea en backlog.

Los modelos trabajan mucho mejor con tareas pequeñas.

---

## 12.8 Prompt para implementar una tarea concreta

Malo:

```text
Implementa todo.
```

Mejor:

```text
Implementa solo la tarea BACKEND-03.

Tarea:
Crear endpoint POST /documents/upload para subir documentos PDF, DOCX y TXT.

Contexto:
- Backend FastAPI
- Base de datos PostgreSQL
- Modelo Document ya existe
- Guardar archivo en /data/uploads
- Registrar metadatos en tabla documents
- Calcular SHA-256
- No extraer texto todavía

Reglas:
- No modifiques frontend.
- No cambies estructura global.
- No añadas dependencias salvo que sea imprescindible.
- Añade tests básicos.
- Si necesitas asumir algo, dilo antes.

Criterio de aceptación:
- El endpoint acepta archivo.
- Guarda metadatos.
- Rechaza extensiones no permitidas.
- Devuelve document_id.
- Tests pasan.
```

Este prompt es mucho más operativo.

---

## 12.9 Prompt para modificar código existente

Cuando ya hay repo, el prompt debe ser más cuidadoso.

```text
Vas a modificar un repositorio existente.

Antes de cambiar código:
1. Inspecciona la estructura relevante.
2. Identifica archivos afectados.
3. Explica el plan.
4. Espera confirmación si el cambio afecta arquitectura.

Reglas:
- cambios mínimos;
- no reescribas módulos completos;
- respeta estilo existente;
- no borres lógica sin justificar;
- añade o actualiza tests;
- resume cambios al final.

Tarea:
Añadir validación de tamaño máximo de archivo en el endpoint de subida.
```

Los agentes tienden a tocar más de lo necesario.

El prompt debe limitar alcance.

---

## 12.10 Prompt para refactor

Refactorizar con IA es útil, pero peligroso.

```text
Actúa como ingeniero senior.

Refactoriza este módulo para mejorar legibilidad y separación de responsabilidades.

Reglas:
- No cambies comportamiento externo.
- Mantén compatibilidad de API.
- No cambies nombres públicos salvo necesidad justificada.
- Añade tests o asegúrate de que los existentes cubren el comportamiento.
- Explica cada cambio importante.

Antes de escribir código:
1. Enumera problemas actuales.
2. Propón plan de refactor.
3. Indica riesgos.
```

No pidas “mejóralo” sin límites.

Un modelo puede reescribir demasiado.

---

## 12.11 Prompt para tests

```text
Actúa como ingeniero QA/backend.

Genera tests para el endpoint POST /documents/upload.

Cubre:
- subida válida PDF;
- subida válida TXT;
- extensión no permitida;
- archivo vacío;
- archivo demasiado grande;
- error de base de datos simulado;
- cálculo de SHA-256;
- respuesta JSON esperada.

Stack:
- FastAPI
- pytest
- TestClient

No modifiques la lógica de producción salvo que detectes un bug y lo expliques.
```

Los tests son una de las mejores formas de usar IA.

Un agente que genera código sin tests es mucho menos útil.

---

## 12.12 Prompt para depurar errores

```text
Actúa como ingeniero backend.

Tengo este error al ejecutar tests:

```text
{error}
```

Contexto:
- Stack: FastAPI + SQLAlchemy + PostgreSQL
- Archivo relacionado: app/api/documents.py
- Test que falla: test_upload_pdf

Quiero que:
1. Expliques la causa probable.
2. Propongas 2-3 hipótesis.
3. Indiques qué archivo revisar.
4. Propongas el cambio mínimo.
5. No reescribas todo el módulo.
```

Al depurar, pide hipótesis antes de solución.

Evita que el modelo invente una corrección enorme.

---

## 12.13 Prompt para revisar seguridad

```text
Actúa como revisor de seguridad de aplicaciones web con LLMs.

Revisa este flujo:
- subida de documentos;
- extracción de texto;
- almacenamiento;
- RAG;
- respuesta al usuario.

Busca:
- exposición de datos;
- path traversal;
- subida de archivos peligrosos;
- prompt injection en documentos;
- logs con datos sensibles;
- permisos insuficientes;
- falta de límites de tamaño;
- ausencia de auditoría;
- problemas RGPD.

Devuelve:
1. Riesgos críticos
2. Riesgos medios
3. Recomendaciones
4. Cambios mínimos para MVP
```

La seguridad no se improvisa al final.

---

## 12.14 Prompt para revisar arquitectura IA

```text
Actúa como arquitecto de sistemas IA.

Revisa esta arquitectura:

```text
{arquitectura}
```

Evalúa:
- separación determinista/probabilística;
- calidad del RAG;
- seguridad;
- privacidad;
- coste;
- latencia;
- observabilidad;
- mantenibilidad;
- escalabilidad;
- puntos únicos de fallo.

Devuelve:
1. Diagnóstico
2. Riesgos críticos
3. Mejoras prioritarias
4. Qué no harías todavía
5. Roadmap de endurecimiento
```

Este tipo de prompt es ideal antes de convertir demo en MVP.

---

## 12.15 Prompt para documentación técnica

```text
Genera documentación técnica para este módulo.

Audiencia:
- desarrolladores que mantendrán el proyecto.

Incluye:
1. Propósito del módulo
2. Flujo principal
3. Funciones importantes
4. Variables de entorno
5. Errores comunes
6. Cómo ejecutar tests
7. Decisiones de diseño
8. Limitaciones actuales

No inventes funciones que no estén en el código.
Si falta información, marca TODO.
```

La IA es muy buena documentando si le das código y límites.

---

## 12.16 Prompt para README

```text
Crea un README inicial para este proyecto.

Proyecto:
Asistente documental RAG privado para PYMEs.

Stack:
- Next.js
- FastAPI
- PostgreSQL
- pgvector
- Docker Compose
- modelo local o cloud configurable

Incluye:
1. Descripción
2. Funcionalidades MVP
3. Arquitectura
4. Instalación local
5. Variables de entorno
6. Comandos útiles
7. Roadmap
8. Limitaciones
9. Seguridad y privacidad
10. Licencia pendiente

Tono:
claro, técnico y práctico.
```

Un buen README hace que el proyecto parezca más serio.

---

## 12.17 Prompt para crear instrucciones de agente

Los agentes de código necesitan reglas persistentes.

Ejemplo para `CLAUDE.md`, `.cursorrules` o instrucciones equivalentes:

```text
Crea un archivo de instrucciones para agentes IA que trabajen en este repositorio.

Debe incluir:
- objetivo del proyecto;
- stack;
- estructura de carpetas;
- comandos de instalación;
- comandos de test;
- reglas de estilo;
- qué archivos no tocar;
- cómo proponer cambios;
- política de seguridad;
- política de secrets;
- cómo documentar cambios;
- definición de done.

Tono:
claro, imperativo y breve.
```

Esto convierte “vibe coding” en flujo controlado.

---

## 12.18 Ejemplo de reglas para agente

```markdown
# AI Agent Instructions

## Project

Private RAG assistant for SMEs.

## Rules

- Do not rewrite large modules unless explicitly requested.
- Prefer small, reviewable changes.
- Run tests after backend changes.
- Never commit secrets.
- Do not change database schema without migration.
- Do not send private documents to external APIs unless configured.
- Keep RAG answers grounded in sources.
- Add TODO comments only when necessary.
- Update documentation when behavior changes.

## Commands

- Backend tests: `pytest`
- Frontend dev: `npm run dev`
- Docker: `docker compose up --build`

## Definition of done

- Code compiles.
- Tests pass.
- New behavior is documented.
- Security implications are mentioned.
```

Este tipo de archivo es una de las herramientas más importantes para desarrollo con agentes.

---

## 12.19 Prompt para generar migraciones

```text
Actúa como ingeniero backend.

Necesito añadir una tabla document_chunks.

Contexto:
- PostgreSQL
- SQLAlchemy
- Alembic
- Tabla documents ya existe

Campos:
- id UUID primary key
- document_id FK documents.id
- chunk_index integer
- text text
- token_count integer nullable
- metadata jsonb
- created_at timestamp

Genera:
1. modelo SQLAlchemy;
2. migración Alembic;
3. índices recomendados;
4. test básico;
5. riesgos de migración.

No modifiques otras tablas salvo necesidad justificada.
```

Las migraciones deben controlarse.

Un agente puede romper datos si improvisa.

---

## 12.20 Prompt para API design

```text
Diseña endpoints REST para el módulo de documentos.

Funciones:
- subir documento;
- listar documentos;
- ver metadatos;
- borrar documento;
- extraer texto;
- listar chunks;
- preguntar sobre documentos.

Devuelve:
- método HTTP;
- ruta;
- request;
- response;
- errores;
- permisos;
- notas de seguridad.

No escribas implementación todavía.
```

Diseñar API antes de implementar evita inconsistencias.

---

## 12.21 Prompt para frontend

```text
Actúa como frontend engineer.

Diseña la pantalla de documentos para un MVP RAG.

Stack:
- Next.js
- TypeScript
- Tailwind
- API REST existente

Funcionalidades:
- subir documento;
- ver estado de procesamiento;
- listar documentos;
- abrir detalle;
- hacer pregunta sobre documento;
- mostrar respuesta con fuentes.

Antes de escribir código:
1. Propón componentes.
2. Define estado.
3. Define llamadas API.
4. Lista casos de error.
```

El frontend también necesita planificación.

No solo “haz una UI bonita”.

---

## 12.22 Prompt para UX de errores

```text
Diseña mensajes de error para una app RAG documental.

Casos:
- archivo demasiado grande;
- tipo no permitido;
- OCR fallido;
- no se encontraron fuentes;
- el modelo no responde;
- usuario sin permisos;
- sesión expirada;
- error interno.

Criterios:
- lenguaje claro;
- sin detalles técnicos sensibles;
- útil para usuario;
- indicar siguiente acción;
- tono profesional.
```

La IA puede ayudar mucho a pulir UX.

---

## 12.23 Prompt para observabilidad

```text
Actúa como ingeniero de plataforma.

Define qué logs y métricas debe registrar una aplicación RAG.

Incluye:
- subida de documentos;
- extracción;
- embeddings;
- búsquedas;
- llamadas al modelo;
- latencia;
- coste;
- errores;
- fuentes usadas;
- usuario;
- permisos;
- feedback.

Distingue:
1. logs técnicos;
2. métricas de producto;
3. métricas de calidad IA;
4. datos que NO deben loggearse por privacidad.
```

Los sistemas IA necesitan observabilidad desde el principio.

---

## 12.24 Prompt para evaluación

```text
Crea un plan de evaluación para este asistente RAG.

Incluye:
- dataset mínimo;
- preguntas con respuesta esperada;
- preguntas fuera de alcance;
- documentos contradictorios;
- métricas;
- evaluación humana;
- LLM-as-a-judge;
- frecuencia de revisión;
- criterios de aceptación para producción.
```

Sin evaluación, el desarrollo con IA se vuelve subjetivo.

---

## 12.25 Prompt para coste

```text
Estima el coste operativo de esta arquitectura IA.

Datos:
- 100 usuarios
- 20 consultas por usuario/mes
- media 3.000 tokens entrada
- media 700 tokens salida
- embeddings al subir documentos
- reranking opcional
- modelo cloud para respuesta
- modelo local para clasificación

Devuelve:
1. Fórmula de coste
2. Coste por consulta
3. Coste mensual aproximado
4. Palancas para reducir coste
5. Riesgos de coste oculto
```

Pide fórmulas, no solo una cifra.

---

## 12.26 Prompt para despliegue

```text
Actúa como DevOps engineer.

Diseña un despliegue MVP para esta app:

- frontend Next.js
- backend FastAPI
- PostgreSQL + pgvector
- worker de extracción
- almacenamiento local
- modelo Ollama local opcional
- Docker Compose

Incluye:
1. docker-compose.yml conceptual
2. variables de entorno
3. volúmenes
4. backups
5. logs
6. healthchecks
7. riesgos de producción
8. qué cambiaría para una versión cloud
```

El despliegue no debe ser una ocurrencia final.

---

## 12.27 Prompt para revisar PR

```text
Actúa como revisor senior de pull requests.

Revisa estos cambios:

```diff
{diff}
```

Evalúa:
- si resuelven la tarea;
- bugs;
- seguridad;
- tests;
- legibilidad;
- impacto en arquitectura;
- migraciones;
- compatibilidad;
- documentación.

Devuelve:
1. Aprobado / cambios requeridos
2. Problemas críticos
3. Comentarios línea por línea si procede
4. Tests adicionales recomendados
```

La IA puede ayudar a revisar, pero no debe sustituir revisión humana en cambios críticos.

---

## 12.28 Prompt para escribir issues

```text
Convierte esta idea en un issue técnico de GitHub.

Idea:
{idea}

El issue debe incluir:
- contexto;
- objetivo;
- alcance;
- fuera de alcance;
- tareas;
- criterio de aceptación;
- riesgos;
- notas técnicas;
- prioridad.
```

Buenos issues producen mejores agentes.

Un agente con issue malo genera código malo.

---

## 12.29 Prompt para roadmap técnico

```text
Crea un roadmap técnico de 6 semanas para este MVP.

Proyecto:
RAG privado para PYMEs.

Incluye:
- hitos semanales;
- entregables;
- riesgos;
- dependencias;
- qué validar cada semana;
- criterios para pasar de demo a MVP;
- criterios para pasar de MVP a piloto.
```

Roadmap claro evita dispersión.

---

## 12.30 Prompt para reducir deuda técnica

```text
Analiza este repositorio desde el punto de vista de deuda técnica.

Busca:
- módulos demasiado grandes;
- falta de tests;
- duplicación;
- acoplamiento;
- errores de estructura;
- dependencias innecesarias;
- problemas de configuración;
- riesgos de seguridad;
- documentación insuficiente.

Devuelve:
1. Top 10 problemas
2. Impacto
3. Esfuerzo
4. Orden recomendado
5. Quick wins
```

Muy útil después de una fase intensa de vibe coding.

---

## 12.31 Prompt para convertir demo en producto

```text
Tengo una demo funcional de una app IA.

Ayúdame a convertirla en MVP serio.

Evalúa:
- autenticación;
- permisos;
- datos;
- seguridad;
- logs;
- errores;
- tests;
- coste;
- privacidad;
- despliegue;
- documentación;
- soporte;
- mantenimiento.

Devuelve:
1. Qué falta
2. Riesgos críticos
3. Plan de endurecimiento
4. Qué puede esperar
5. Checklist de salida a piloto
```

Este prompt es central para este libro.

La diferencia entre demo y producto está aquí.

---

## 12.32 Prompt para elegir entre librerías

```text
Compara estas opciones para implementar RAG:

- LlamaIndex
- LangChain
- Haystack
- implementación propia ligera

Contexto:
- MVP para PYME
- equipo pequeño
- Python
- FastAPI
- PostgreSQL
- necesidad de citas
- bajo mantenimiento

Criterios:
- curva de aprendizaje;
- control;
- flexibilidad;
- producción;
- dependencia;
- comunidad;
- facilidad de debug.

Termina con recomendación.
```

No preguntes “cuál es mejor”.

Define contexto.

---

## 12.33 Prompt para evitar sobreingeniería

```text
Revisa esta propuesta técnica y detecta sobreingeniería.

Criterios:
- ¿hay componentes innecesarios para MVP?
- ¿hay agentes donde bastan workflows?
- ¿hay fine-tuning prematuro?
- ¿hay infraestructura excesiva?
- ¿hay abstracciones innecesarias?
- ¿hay herramientas de moda sin necesidad?
- ¿qué simplificarías?

Devuelve una versión más simple.
```

Este prompt ahorra meses.

La IA tiende a proponer arquitecturas completas.

Tú debes pedir simplicidad.

---

## 12.34 Prompt para seleccionar stack

```text
Ayúdame a elegir stack para este proyecto.

Proyecto:
Asistente documental privado para una pequeña empresa.

Opciones:
1. Next.js + FastAPI + PostgreSQL + pgvector
2. Django + HTMX + PostgreSQL + pgvector
3. Full-stack Next.js + Supabase
4. Python Streamlit + Qdrant para demo

Criterios:
- velocidad de MVP;
- mantenibilidad;
- privacidad;
- despliegue local;
- facilidad para agentes IA;
- coste;
- escalabilidad razonable.

Devuelve tabla comparativa y recomendación.
```

El stack correcto depende del producto y del equipo.

---

## 12.35 Prompt para crear scripts

```text
Crea scripts de desarrollo para este proyecto.

Necesito:
- instalar dependencias backend;
- instalar dependencias frontend;
- levantar Docker Compose;
- ejecutar migraciones;
- ejecutar tests;
- limpiar datos temporales;
- crear usuario admin de desarrollo.

Devuelve:
1. lista de scripts;
2. contenido sugerido;
3. dónde guardarlos;
4. advertencias de seguridad.
```

Los scripts hacen que el proyecto sea mantenible y facilitan trabajo de agentes.

---

## 12.36 Prompt para entorno local reproducible

```text
Diseña un entorno local reproducible para este proyecto.

Debe incluir:
- .env.example
- Docker Compose
- Makefile o scripts
- README de instalación
- seed de datos demo
- comprobación de salud
- tests básicos
- instrucciones para modelo local opcional

Objetivo:
Que un nuevo desarrollador pueda levantar el proyecto en menos de 30 minutos.
```

La reproducibilidad es una ventaja enorme cuando trabajas con IA.

---

## 12.37 Prompt para proteger secretos

```text
Revisa este proyecto para evitar exposición de secretos.

Busca:
- API keys en código;
- .env commiteado;
- logs con tokens;
- claves en documentación;
- credenciales en tests;
- secretos pasados al modelo;
- configuración insegura.

Devuelve:
1. riesgos;
2. archivos a revisar;
3. cambios recomendados;
4. plantilla .env.example segura.
```

Los agentes pueden copiar secretos si no los proteges.

---

## 12.38 Prompt para tool calling en software

```text
Diseña tools para que un agente pueda operar este sistema de forma segura.

Acciones posibles:
- buscar documentos;
- leer metadatos;
- crear borrador de respuesta;
- listar clientes;
- crear tarea interna.

Reglas:
- ninguna tool debe borrar datos;
- acciones que escriben deben requerir confirmación;
- cada tool debe validar permisos;
- registrar auditoría.

Devuelve:
- nombre de tool;
- descripción;
- parámetros;
- permisos;
- riesgos;
- ejemplo de uso.
```

Esto conecta prompts, agentes y backend.

---

## 12.39 Prompt para MCP

```text
Diseña una estrategia MCP para este proyecto.

Objetivo:
Permitir que agentes accedan de forma controlada a herramientas internas.

Herramientas candidatas:
- GitHub
- PostgreSQL
- filesystem de documentos
- navegador interno
- sistema de tickets

Evalúa:
1. qué servidores MCP usarías;
2. qué permisos darías;
3. qué NO expondrías;
4. cómo auditarías acciones;
5. riesgos de credenciales;
6. plan MVP.
```

MCP puede ser muy potente, pero debe entrar con permisos mínimos.

---

## 12.40 Prompt para crear ejemplos del repo

```text
Crea un ejemplo mínimo en la carpeta examples/ para demostrar:

- subida de documento;
- extracción de texto;
- creación de chunks;
- búsqueda por similitud;
- respuesta con fuentes.

El ejemplo debe:
- ser pequeño;
- poder ejecutarse localmente;
- usar datos ficticios;
- no requerir claves externas;
- incluir README.
```

Los ejemplos hacen que un proyecto técnico sea aprendible.

---

## 12.41 Prompt para actualizar código generado por IA

```text
Este código fue generado por IA y funciona como demo.

Revisa qué habría que cambiar para producción.

Evalúa:
- seguridad;
- manejo de errores;
- tests;
- estructura;
- logs;
- rendimiento;
- privacidad;
- configuración;
- dependencias;
- documentación.

Devuelve:
1. problemas críticos;
2. problemas medios;
3. quick wins;
4. plan de refactor en fases.
```

Muy útil después de una sesión larga con Codex, Claude Code, Cursor o Grok.

---

## 12.42 Prompt para mantener estilo del proyecto

```text
Antes de generar código, analiza el estilo existente del proyecto.

Fíjate en:
- nombres de archivos;
- estructura;
- patrones de imports;
- estilo de endpoints;
- manejo de errores;
- tests;
- convenciones de tipos;
- uso de servicios/repositorios.

Luego implementa la tarea respetando ese estilo.
No introduzcas un patrón nuevo salvo que lo justifiques.
```

Esto evita que cada agente programe con una personalidad distinta.

---

## 12.43 Prompt para pedir cambios pequeños

```text
Haz el cambio más pequeño posible que resuelva la tarea.

No refactorices.
No cambies nombres.
No actualices dependencias.
No modifiques archivos no relacionados.
Si detectas mejoras adicionales, enuméralas al final como sugerencias, pero no las implementes.
```

Esta instrucción es muy importante.

Los agentes tienden a “mejorar” demasiado.

---

## 12.44 Prompt para sesión larga de desarrollo

```text
Vamos a trabajar por iteraciones.

Reglas:
1. En cada iteración implementa solo una tarea.
2. Antes de cambiar, resume plan.
3. Después de cambiar, resume archivos modificados.
4. Ejecuta tests relevantes si puedes.
5. Si no puedes ejecutar tests, explica cómo hacerlo.
6. Espera mi siguiente instrucción antes de continuar.
```

Trabajar con IA en sesiones largas requiere ritmo.

No dejes que el agente se vaya solo demasiado lejos.

---

## 12.45 Prompt para “definition of done”

```text
Define la Definition of Done para este proyecto.

Debe cubrir:
- código;
- tests;
- seguridad;
- documentación;
- rendimiento;
- privacidad;
- migraciones;
- UX;
- observabilidad;
- revisión humana.

Devuelve una checklist que pueda usarse en cada PR.
```

Sin definición de hecho, el agente puede considerar terminado algo que solo compila.

---

## 12.46 Prompt para revisar alucinaciones de código

Los modelos inventan APIs.

Prompt:

```text
Revisa este código buscando APIs, métodos, imports o paquetes que puedan no existir.

Para cada hallazgo:
- explica por qué sospechas;
- indica cómo verificarlo;
- sugiere alternativa;
- no asumas que una librería existe si no está en dependencias.
```

Esto es especialmente útil con librerías recientes.

---

## 12.47 Prompt para dependencias

```text
Antes de añadir una dependencia nueva, evalúa si es necesaria.

Para cada dependencia propuesta:
- qué problema resuelve;
- alternativa sin dependencia;
- mantenimiento;
- licencia;
- tamaño;
- seguridad;
- popularidad;
- riesgo de abandono.

No añadas dependencias si el código nativo basta.
```

Los agentes pueden llenar un proyecto de paquetes.

Controla.

---

## 12.48 Prompt para migrar de demo a repo serio

```text
Tengo una demo en un solo archivo.

Quiero convertirla en un repositorio mantenible.

Stack:
- Python
- FastAPI
- PostgreSQL
- Docker

Propón:
1. estructura de carpetas;
2. separación de módulos;
3. configuración;
4. tests;
5. Docker;
6. README;
7. pasos de migración;
8. qué no cambiarías todavía.
```

Una demo puede ser semilla de producto, pero necesita orden.

---

## 12.49 Prompt para explicar código al humano

```text
Explícame este código como si fuera el mantenedor del proyecto.

Incluye:
- qué hace;
- flujo principal;
- funciones clave;
- dependencias;
- supuestos;
- riesgos;
- qué parte tocarías para modificar X;
- qué tests deberían existir.
```

Entender el código generado es obligatorio.

Si no lo entiendes, no lo mantienes.

---

## 12.50 Prompt para crear un plan de pruebas manuales

```text
Crea un plan de pruebas manuales para este MVP.

Incluye:
- escenarios felices;
- errores esperados;
- casos límite;
- permisos;
- datos malos;
- documentos grandes;
- preguntas fuera de alcance;
- prueba de reinicio;
- prueba de backup;
- prueba de usuario no técnico.
```

No todo se automatiza desde el primer día.

Las pruebas manuales bien diseñadas también ayudan.

---

## 12.51 Prompt para generar datos ficticios

```text
Genera datos ficticios para probar esta app.

Requisitos:
- no usar datos reales;
- documentos simulados;
- clientes inventados;
- emails inventados;
- casos normales y casos raros;
- incluir errores típicos.

Formato:
JSON y pequeños textos de ejemplo.
```

Nunca uses datos reales sensibles en prompts de prueba si no hace falta.

---

## 12.52 Prompt para revisar privacidad

```text
Revisa este flujo desde perspectiva de privacidad y RGPD.

Flujo:
- usuario sube documento;
- se extrae texto;
- se generan embeddings;
- se consulta con RAG;
- se guardan logs.

Evalúa:
- datos personales tratados;
- base legal posible;
- minimización;
- retención;
- acceso;
- borrado;
- terceros;
- logs;
- backups;
- riesgos.

No des asesoramiento legal definitivo.
Devuelve checklist técnica para hablar con asesor legal.
```

El prompt debe reconocer límites.

---

## 12.53 Prompt para producto comercial

```text
Convierte este MVP técnico en una propuesta comercial para una PYME.

Incluye:
- problema;
- solución;
- beneficios;
- alcance;
- entregables;
- exclusiones;
- requisitos del cliente;
- precio orientativo por fases;
- mantenimiento mensual;
- riesgos;
- próximos pasos.

Tono:
claro, profesional, sin prometer magia.
```

Construir software con IA no termina en código.

También hay que venderlo y explicarlo.

---

## 12.54 Prompt para documentación de decisiones

```text
Crea un ADR para esta decisión técnica.

Decisión:
Usar PostgreSQL + pgvector en lugar de Qdrant para el MVP.

Incluye:
- contexto;
- opciones consideradas;
- decisión;
- motivos;
- consecuencias;
- riesgos;
- cuándo reconsiderar.
```

Los ADR ayudan a que el proyecto sea mantenible.

---

## 12.55 Prompt para mantener un libro/repositorio vivo

Este libro también es software.

Prompt útil:

```text
Actualiza este capítulo manteniendo:
- tono práctico;
- estructura Markdown;
- orientación a ingenieros;
- ejemplos copiables;
- advertencias de producción;
- checklist final.

No añadas datos recientes sin fuente.
Marca como TODO cualquier afirmación que requiera verificación.
```

Esto conecta directamente con la idea de libro vivo.

---

## 12.56 Flujo recomendado con agentes de código

Un flujo práctico:

```text
1. Explicar objetivo.
2. Pedir MVP.
3. Pedir arquitectura.
4. Pedir backlog.
5. Crear instrucciones de agente.
6. Implementar tarea pequeña.
7. Ejecutar tests.
8. Revisar diff.
9. Documentar.
10. Repetir.
```

No empieces en el paso 6.

La mayoría de errores vienen de saltarse pasos 1-5.

---

## 12.57 Cómo usar Codex, Claude Code, Cursor o Grok sin perder control

Reglas prácticas:

- no abras todo el repo si no hace falta;
- da instrucciones persistentes;
- trabaja por ramas;
- exige plan;
- limita archivos;
- revisa diff;
- ejecuta tests;
- no aceptes cambios que no entiendes;
- protege secretos;
- separa demo de producción;
- documenta decisiones;
- usa issues claros.

La herramienta importa.

Pero el método importa más.

---

## 12.58 Antipatrones

### “Hazme una app completa”

Demasiado amplio.

### “Arréglalo todo”

El agente tocará demasiado.

### “Mejóralo”

No define criterio.

### “Añade IA”

No define problema.

### No pedir tests

Código frágil.

### No revisar diff

Peligroso.

### No proteger secretos

Riesgo grave.

### No definir stack

El modelo inventa.

### No definir MVP

El alcance explota.

### No versionar instrucciones

Cada sesión cambia estilo.

---

## 12.59 Ideas clave del capítulo

- Crear software con IA exige prompts específicos, no peticiones vagas.
- Antes de pedir código, define MVP, arquitectura y tareas.
- Los agentes trabajan mejor con instrucciones persistentes.
- Cada tarea debe tener criterio de aceptación.
- Pide cambios pequeños y revisables.
- Los tests son esenciales para controlar código generado por IA.
- El prompt debe limitar alcance, archivos, dependencias y comportamiento.
- Seguridad, privacidad, costes y despliegue deben aparecer pronto.
- Vibe coding sin reglas produce deuda técnica.
- El objetivo no es que la IA programe sola, sino que el humano dirija mejor.

---

## 12.60 Checklist práctica

Antes de pedir código a una IA:

- ¿Está claro el objetivo?
- ¿Está definido el MVP?
- ¿Está definido el stack?
- ¿Existe estructura de proyecto?
- ¿Hay instrucciones para agentes?
- ¿La tarea es pequeña?
- ¿Hay criterio de aceptación?
- ¿Se sabe qué archivos tocar?
- ¿Se han definido restricciones?
- ¿Se piden tests?
- ¿Se protege información sensible?
- ¿Se limita el alcance?
- ¿Se evita cambiar dependencias innecesarias?
- ¿Se revisará el diff?
- ¿Se ejecutarán tests?
- ¿Se documentará el cambio?
- ¿Hay plan de rollback?
- ¿El humano entiende el código resultante?

---

## 12.61 Plantilla base para tarea de código

```markdown
# Tarea

[Descripción concreta]

# Contexto

[Proyecto, stack, módulo, estado actual]

# Objetivo

[Qué debe quedar funcionando]

# Fuera de alcance

[Qué NO debe tocar]

# Archivos probables

[Lista si se conoce]

# Reglas

- Cambios mínimos.
- No reescribir módulos completos.
- No añadir dependencias sin justificar.
- Añadir tests.
- Respetar estilo existente.
- No tocar secretos.

# Criterio de aceptación

- [ ] ...
- [ ] ...
- [ ] ...

# Entrega esperada

1. Resumen del plan.
2. Cambios realizados.
3. Tests ejecutados.
4. Riesgos o TODOs.
```

---

## 12.62 Qué puede cambiar en el futuro

Cambiarán:

- herramientas de código con IA;
- agentes;
- IDEs;
- MCP;
- integración con repos;
- generación de tests;
- revisión automática;
- modelos de código;
- capacidades multimodales;
- flujos de CI/CD;
- seguridad.

Pero probablemente seguirá siendo cierto:

> La IA escribe mejor software cuando el humano define mejor el problema.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 9 — Prompt engineering que sigue funcionando
- Capítulo 10 — Prompts como herramientas de ingeniería
- Capítulo 11 — Técnicas avanzadas
- Capítulo 13 — Vibe coding
- Capítulo 14 — Reglas para agentes de código
- Capítulo 15 — De idea a prototipo
- Capítulo 24 — Qué es un agente de IA
- Capítulo 26 — MCP
- Capítulo 46 — Despliegue de sistemas IA
- Capítulo 50 — Evaluación
- Apéndice B — Plantillas de prompts
