---
title: "Capítulo 13 — Vibe coding"
chapter: "14"
part: "Parte IV — Vibe Coding y desarrollo asistido por IA"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "intermedio"
estimated_reading_time: "36 minutos"
---

# Capítulo 13 — Vibe coding

Vibe coding es una de las expresiones más populares de la nueva forma de programar con IA.

La idea básica es sencilla:

> Describes lo que quieres, la IA genera código, tú pruebas, corriges, iteras y sigues construyendo.

En su versión más informal, parece casi mágico.

Abres Cursor, Claude Code, Codex, Grok, ChatGPT o cualquier herramienta agentic.  
Escribes lo que quieres.  
El modelo genera archivos.  
Tú le dices “corrige esto”.  
Vuelve a generar.  
Pruebas.  
Sigues.

En pocas horas puedes tener una demo que antes habría llevado días.

Eso es real.

Pero también es real el otro lado:

- código que no entiendes;
- arquitectura improvisada;
- dependencias innecesarias;
- bugs silenciosos;
- tests inexistentes;
- seguridad débil;
- estilos mezclados;
- deuda técnica;
- repositorios que se vuelven inmantenibles;
- agentes que modifican demasiado;
- sensación de avance sin producto real.

Vibe coding no es malo.

El problema es usarlo como sustituto de ingeniería.

Este capítulo trata de cómo usarlo bien.

---

## 13.1 Qué es vibe coding

Vibe coding es programar mediante conversación, intención e iteración rápida con modelos de IA.

En vez de escribir todo manualmente, el desarrollador dirige.

Dice qué quiere.  
Revisa lo generado.  
Corrige.  
Afina.  
Pide cambios.  
Prueba.  
Refactoriza.  
Vuelve a pedir.

El modelo actúa como:

- generador de código;
- copiloto;
- revisor;
- documentador;
- buscador de bugs;
- creador de tests;
- ayudante de arquitectura;
- implementador parcial.

La palabra “vibe” captura la sensación de fluir con la herramienta.

Pero el flujo puede ser productivo o caótico.

Depende del método.

---

## 13.2 Vibe coding no es no-code

Vibe coding no significa que ya no haga falta saber programar.

Al contrario.

Cuanto más sabes, más partido le sacas.

Necesitas entender:

- arquitectura;
- dependencias;
- errores;
- seguridad;
- bases de datos;
- APIs;
- tests;
- despliegue;
- rendimiento;
- estructura de proyecto;
- límites del modelo.

Una persona sin conocimientos puede generar una demo.

Un ingeniero puede convertir esa demo en software mantenible.

La IA reduce fricción.

No elimina responsabilidad.

---

## 13.3 La promesa real

La promesa real del vibe coding no es:

> Cualquiera puede construir cualquier cosa sin saber nada.

La promesa real es:

> Una persona con criterio puede construir, probar y aprender mucho más rápido.

Permite:

- prototipar ideas;
- explorar stacks;
- generar boilerplate;
- acelerar CRUDs;
- crear interfaces;
- escribir tests;
- documentar;
- migrar código;
- depurar;
- entender repos;
- crear scripts;
- comparar opciones;
- pasar de idea a MVP.

Esto es enorme.

Pero solo si el humano mantiene dirección.

---

## 13.4 La trampa principal

La trampa es confundir velocidad con progreso.

Un agente puede generar veinte archivos en dos minutos.

Eso se siente como avance.

Pero puede ser ruido.

Preguntas:

- ¿compila?
- ¿pasan tests?
- ¿entiendes el código?
- ¿la arquitectura tiene sentido?
- ¿hay seguridad?
- ¿resuelve el flujo real?
- ¿se puede desplegar?
- ¿se puede mantener?
- ¿se puede explicar a otro desarrollador?
- ¿se puede vender como producto?

Si no, tienes movimiento.

No necesariamente progreso.

---

## 13.5 Vibe coding bueno vs vibe coding malo

### Vibe coding malo

```text
Hazme una app completa.
Corrige los errores.
Ahora añade login.
Ahora añade pagos.
Ahora añade IA.
Ahora arréglalo todo.
```

Resultado probable:

- repo caótico;
- decisiones implícitas;
- dependencias aleatorias;
- módulos grandes;
- bugs;
- sin tests;
- sin documentación.

### Vibe coding bueno

```text
Primero definimos MVP.
Después arquitectura.
Después estructura.
Después tareas pequeñas.
Después implementamos una tarea.
Después tests.
Después revisión.
Después siguiente tarea.
```

Resultado probable:

- avance más lento al principio;
- menos caos;
- código más revisable;
- mejor mantenimiento;
- más control.

La diferencia está en el proceso.

---

## 13.6 El humano como director técnico

En vibe coding, el humano cambia de rol.

Antes era principalmente escritor de código.

Ahora también es:

- director técnico;
- product manager;
- revisor;
- tester;
- arquitecto;
- responsable de seguridad;
- integrador;
- editor de instrucciones;
- evaluador de calidad.

El modelo puede escribir.

Pero el humano debe decidir.

Qué construir.  
Qué no construir.  
Qué aceptar.  
Qué rechazar.  
Qué simplificar.  
Qué probar.  
Qué desplegar.  
Qué vender.

La ventaja competitiva ya no está solo en teclear rápido.

Está en dirigir bien.

---

## 13.7 El problema del contexto

Los modelos no conocen automáticamente tu proyecto.

Necesitan contexto.

Si no se lo das, improvisan.

Contexto útil:

- objetivo del producto;
- stack;
- estructura;
- convenciones;
- comandos;
- variables de entorno;
- qué archivos tocar;
- qué no tocar;
- estado actual;
- errores conocidos;
- criterios de aceptación;
- definición de done.

Por eso los repositorios AI-native necesitan archivos de instrucciones.

Ejemplos:

```text
CLAUDE.md
AGENTS.md
.cursorrules
.cursor/rules/
README.md
CONTRIBUTING.md
docs/architecture.md
```

Estos archivos convierten conocimiento del proyecto en contexto reutilizable.

---

## 13.8 Reglas persistentes

Las reglas persistentes son una de las claves para hacer vibe coding mantenible.

Ejemplo:

```markdown
# Reglas para agentes IA

- Trabaja en cambios pequeños.
- No reescribas módulos completos sin permiso.
- Antes de modificar, explica plan.
- Añade tests cuando cambies lógica.
- No introduzcas dependencias sin justificar.
- No toques secretos ni .env reales.
- Respeta la estructura del proyecto.
- Si algo no está claro, pregunta.
- Después de cada cambio, resume archivos modificados.
```

Estas reglas reducen improvisación.

No garantizan perfección, pero ayudan mucho.

---

## 13.9 El archivo CLAUDE.md / AGENTS.md

Un archivo de instrucciones para agentes debería incluir:

- descripción del proyecto;
- objetivo del producto;
- stack;
- estructura de carpetas;
- comandos de desarrollo;
- comandos de test;
- estilo de código;
- reglas de seguridad;
- límites;
- definición de done;
- workflows aceptados;
- qué no debe hacer el agente.

Ejemplo:

```markdown
# Project Instructions

This is a private RAG assistant for SMEs.

## Stack

- Frontend: Next.js
- Backend: FastAPI
- Database: PostgreSQL + pgvector
- Local AI: Ollama optional
- Deployment: Docker Compose

## Rules

- Prefer small, reviewable changes.
- Do not rewrite architecture without approval.
- Never commit secrets.
- Add tests for backend logic.
- Keep RAG answers grounded in sources.
- Do not send private documents to external APIs unless configured.
```

Este archivo puede ahorrar muchas conversaciones repetidas.

---

## 13.10 Vibe coding y Git

Git es obligatorio.

Si trabajas con agentes, usa Git con disciplina.

Buenas prácticas:

- crear rama por tarea;
- commits pequeños;
- revisar diff;
- no aceptar cambios masivos sin entender;
- revertir si el agente se desvía;
- usar PR aunque trabajes solo;
- escribir mensajes claros;
- etiquetar hitos;
- guardar estado funcional antes de cambios grandes.

El agente puede romper algo.

Git te permite volver atrás.

Sin Git, vibe coding es una ruleta.

---

## 13.11 El diff es la verdad

No creas al agente cuando dice “ya está”.

Mira el diff.

Preguntas al revisar:

- ¿tocó archivos inesperados?
- ¿borró lógica?
- ¿añadió dependencias?
- ¿cambió nombres públicos?
- ¿alteró migraciones?
- ¿metió secretos?
- ¿duplicó código?
- ¿añadió TODOs innecesarios?
- ¿rompió tests?
- ¿cambió comportamiento fuera de alcance?

El resumen del agente es útil.

El diff manda.

---

## 13.12 Tests como control de realidad

Los tests son el antídoto contra la fantasía.

Un modelo puede sonar convincente y generar código roto.

Tests:

- detectan regresiones;
- obligan a definir comportamiento;
- ayudan a refactorizar;
- permiten aceptar cambios con más confianza;
- facilitan trabajo de agentes;
- convierten el desarrollo en ciclo medible.

Prompt básico:

```text
Añade tests para el comportamiento nuevo.
No modifiques la lógica para hacer que el test pase sin explicar el bug.
```

Si el proyecto no tiene tests, empieza por añadir algunos.

Aunque sean pocos.

---

## 13.13 Ejecutar antes de seguir

Una mala práctica es encadenar prompts sin ejecutar.

```text
Añade login.
Añade dashboard.
Añade pagos.
Añade IA.
Añade exportación PDF.
```

Si no pruebas entre pasos, los errores se acumulan.

Mejor:

```text
Implementa login básico.
Ejecuta tests.
Corrige.
Commit.
Siguiente tarea.
```

El ritmo correcto es:

```text
pedir → generar → ejecutar → revisar → corregir → commit
```

No:

```text
pedir → pedir → pedir → pedir → caos
```

---

## 13.14 Pedir planes antes de código

Antes de que el agente modifique archivos, pídele plan.

```text
Antes de escribir código:
1. Resume la tarea.
2. Lista archivos que tocarás.
3. Explica el enfoque.
4. Indica riesgos.
5. Espera confirmación.
```

Esto reduce cambios impulsivos.

También te permite detectar si ha entendido mal.

Para tareas pequeñas puedes saltar confirmación.

Para tareas grandes, no.

---

## 13.15 Cambios pequeños

La regla de oro:

> Cuanto más pequeño el cambio, más fácil revisarlo.

Pide:

```text
Haz el cambio mínimo necesario.
```

Y añade:

```text
No refactorices.
No cambies nombres.
No actualices dependencias.
No modifiques archivos no relacionados.
Si ves mejoras, enuméralas pero no las implementes.
```

Esto evita que el agente “arregle” medio proyecto.

---

## 13.16 Vibe coding para prototipos

Vibe coding brilla en prototipos.

Casos:

- landing page;
- dashboard;
- CRUD básico;
- script;
- prueba de API;
- demo RAG;
- mock de interfaz;
- herramienta interna;
- plugin pequeño;
- visualización;
- integración inicial.

Aquí puedes permitir más velocidad.

El objetivo es aprender.

Pero incluso en prototipos, documenta:

- qué funciona;
- qué es fake;
- qué está hardcodeado;
- qué falta para producción;
- riesgos conocidos.

Una demo honesta vale mucho.

Una demo que se disfraza de producto crea problemas.

---

## 13.17 Vibe coding para productos

Para productos, necesitas más disciplina.

Añade:

- issues claros;
- instrucciones persistentes;
- tests;
- revisión de seguridad;
- arquitectura documentada;
- CI/CD;
- logs;
- métricas;
- privacidad;
- control de dependencias;
- despliegue reproducible;
- documentación.

La IA acelera.

Pero producción sigue exigiendo ingeniería.

---

## 13.18 Vibe coding con repos existentes

Trabajar sobre un repo existente es más delicado que crear uno nuevo.

Prompt recomendado:

```text
Analiza primero el repositorio.
No hagas cambios todavía.

Necesito que entiendas:
- estructura;
- stack;
- comandos;
- patrones;
- módulos relevantes;
- tests existentes;
- riesgos.

Después propón cómo implementar esta tarea con cambios mínimos.
```

El modelo debe adaptarse al repo.

No imponer su arquitectura favorita.

---

## 13.19 Vibe coding con repos nuevos

Para repos nuevos, define base.

Prompt:

```text
Crea la estructura inicial de un proyecto, pero no implementes todas las funciones.

Incluye:
- estructura de carpetas;
- configuración;
- README;
- Docker Compose;
- .env.example;
- endpoint health;
- test básico;
- instrucciones para agentes.

No añadas funcionalidades fuera del MVP.
```

Un buen esqueleto inicial ahorra mucho caos.

---

## 13.20 Vibe coding y dependencias

Los agentes tienden a instalar paquetes.

No siempre hace falta.

Regla:

```text
Antes de añadir una dependencia, justifica:
- qué problema resuelve;
- alternativa sin dependencia;
- mantenimiento;
- licencia;
- riesgo de seguridad;
- impacto en bundle o imagen Docker.
```

Dependencias innecesarias son deuda técnica.

---

## 13.21 Vibe coding y seguridad

Riesgos frecuentes:

- secrets en código;
- .env commiteado;
- APIs sin autenticación;
- endpoints sin validación;
- CORS abierto;
- subida de archivos insegura;
- SQL injection;
- path traversal;
- logs con datos sensibles;
- tool calling peligroso;
- prompt injection;
- permisos excesivos.

Prompt útil:

```text
Revisa los cambios desde perspectiva de seguridad.
Busca secretos, permisos excesivos, validación insuficiente y exposición de datos.
No implementes cambios todavía; primero lista riesgos.
```

Seguridad debe entrar en el ciclo, no al final.

---

## 13.22 Vibe coding y bases de datos

Los agentes pueden romper esquemas.

Reglas:

- no cambiar schema sin migración;
- no borrar columnas sin confirmación;
- no cambiar tipos sin plan;
- no modificar datos productivos;
- crear seeds ficticios;
- añadir índices con criterio;
- documentar migraciones.

Prompt:

```text
Si necesitas cambiar base de datos:
1. Propón migración.
2. Explica impacto.
3. Indica rollback.
4. Añade test.
5. No borres datos.
```

---

## 13.23 Vibe coding y frontend

La IA es muy buena creando UI.

Pero puede producir:

- componentes enormes;
- lógica duplicada;
- estado mal gestionado;
- accesibilidad pobre;
- estilos inconsistentes;
- dependencias visuales innecesarias;
- diseños bonitos pero poco usables.

Prompt:

```text
Crea componentes pequeños y reutilizables.
No metas toda la lógica en una sola página.
Incluye estados loading, empty y error.
Prioriza accesibilidad básica.
Respeta el sistema de diseño existente.
```

---

## 13.24 Vibe coding y backend

En backend, pide:

- validación;
- errores claros;
- tests;
- logs;
- separación de servicios;
- no mezclar lógica de negocio con rutas;
- manejo de permisos;
- límites;
- documentación de endpoints.

Prompt:

```text
Implementa el endpoint siguiendo el patrón existente:
route → service → repository.
Añade validación de entrada.
Devuelve errores HTTP adecuados.
Añade tests.
No mezcles lógica de base de datos en la ruta.
```

---

## 13.25 Vibe coding y RAG

Los agentes pueden crear un RAG demo muy rápido.

Pero un RAG serio necesita:

- extracción robusta;
- chunking;
- embeddings;
- vector DB;
- retrieval;
- reranking;
- prompt con fuentes;
- citas;
- evaluación;
- permisos;
- logs.

Prompt:

```text
Crea una primera versión RAG mínima.
Limitaciones:
- documentos TXT/Markdown primero;
- citas obligatorias;
- si no hay fuentes, responder no encontrado;
- no implementar agentes todavía;
- añadir tests de retrieval con datos ficticios.
```

Empieza simple.

Luego endurece.

---

## 13.26 Vibe coding y agentes

Agentes de código pueden modificar mucho.

Reglas:

- permisos mínimos;
- plan antes de actuar;
- límite de archivos;
- tests;
- no tocar secrets;
- no ejecutar acciones destructivas;
- no desplegar sin confirmación;
- logs de acciones.

Prompt:

```text
Trabaja como agente limitado.
Solo puedes modificar archivos relacionados con la tarea.
Si necesitas tocar más archivos, explica por qué y espera confirmación.
```

---

## 13.27 Vibe coding y MCP

MCP puede ampliar muchísimo las capacidades del agente.

Puede conectarlo a:

- GitHub;
- filesystem;
- bases de datos;
- navegador;
- herramientas internas;
- documentación;
- tickets;
- cloud.

Pero más herramientas significan más riesgo.

Reglas:

- no exponer credenciales amplias;
- permisos por herramienta;
- read-only por defecto;
- logs;
- confirmación para acciones de escritura;
- no dar acceso completo a producción;
- separar entorno dev/staging/prod.

MCP debe tratarse como infraestructura de permisos, no como juguete.

---

## 13.28 Vibe coding y documentación

Cada cambio importante debe actualizar docs.

Prompt:

```text
Si el cambio modifica comportamiento, actualiza:
- README si afecta instalación;
- docs/architecture.md si afecta arquitectura;
- .env.example si añade variables;
- CHANGELOG si es relevante;
- comentarios solo donde aporten claridad.
```

La documentación es parte del producto.

---

## 13.29 Vibe coding y aprendizaje

Vibe coding también es una forma de aprender.

Puedes pedir:

```text
Explícame qué acabas de cambiar.
```

```text
Explícame este patrón como si fuera un desarrollador junior.
```

```text
¿Qué debería aprender para mantener este módulo?
```

No aceptes código como caja negra.

Usa la IA para entender.

---

## 13.30 Vibe coding para no programadores

Una persona no técnica puede usar vibe coding para crear prototipos.

Pero debe saber límites.

Puede construir:

- landing pages;
- demos;
- formularios;
- dashboards simples;
- automatizaciones pequeñas;
- apps internas básicas.

Pero para producción necesitará:

- revisión técnica;
- seguridad;
- despliegue;
- privacidad;
- mantenimiento;
- tests;
- soporte.

Vibe coding democratiza prototipos.

No elimina necesidad de ingeniería profesional.

---

## 13.31 El rol del ingeniero aumenta

Paradójicamente, cuanto más código genera la IA, más importante es el ingeniero.

Porque alguien debe:

- definir arquitectura;
- detectar errores;
- controlar seguridad;
- evaluar calidad;
- revisar dependencias;
- decidir trade-offs;
- mantener producto;
- entender negocio;
- limitar autonomía;
- decir no.

La IA baja la barrera de entrada.

Pero sube el valor del criterio.

---

## 13.32 Vibe coding como ventaja competitiva personal

Para alguien que quiere construir productos, consultoría o herramientas propias, vibe coding bien usado es una ventaja enorme.

Permite:

- crear prototipos rápidos;
- validar ideas;
- generar demos para clientes;
- construir portfolio;
- mejorar repos;
- aprender frameworks;
- documentar procesos;
- crear productos pequeños;
- iterar sin equipo grande.

Pero la ventaja no está en “usar IA”.

Mucha gente usa IA.

La ventaja está en combinar:

```text
idea + criterio + prompts + arquitectura + tests + producto + negocio
```

Ahí aparece el valor.

---

## 13.33 Vibe coding en consultoría para PYMEs

En una consultoría IA para PYMEs, vibe coding puede servir para:

- crear demos sectoriales;
- prototipar automatizaciones;
- generar herramientas internas;
- montar dashboards;
- crear conectores;
- simular flujos;
- validar ROI;
- preparar propuestas;
- crear documentación.

Pero no deberías entregar una demo sin endurecer.

Flujo recomendado:

```text
demo rápida → validación cliente → MVP técnico → seguridad → piloto → mantenimiento
```

No vendas vibe coding.

Vende solución.

---

## 13.34 Vibe coding y portfolio

Para buscar trabajo o clientes, los repos importan.

Un buen repo AI-assisted debe mostrar:

- README claro;
- problema que resuelve;
- arquitectura;
- instrucciones de instalación;
- screenshots;
- roadmap;
- tests;
- issues;
- decisiones técnicas;
- limitaciones;
- seguridad;
- uso de IA documentado.

No basta con subir código generado.

Hay que mostrar criterio.

---

## 13.35 Cómo documentar uso de IA en un repo

Puedes añadir una sección:

```markdown
## AI-assisted development

This project was developed with AI assistance.

AI was used for:
- scaffolding;
- code review;
- test generation;
- documentation;
- refactoring suggestions.

Human review was applied to:
- architecture;
- security;
- database design;
- deployment;
- final code decisions.
```

Esto transmite madurez.

No oculta el uso de IA, pero deja claro que hubo control humano.

---

## 13.36 Ciclo recomendado

```text
1. Define problema.
2. Define MVP.
3. Crea arquitectura.
4. Crea reglas de agente.
5. Divide tareas.
6. Implementa una tarea.
7. Ejecuta tests.
8. Revisa diff.
9. Documenta.
10. Commit.
11. Repite.
```

Este ciclo convierte vibe coding en ingeniería asistida.

---

## 13.37 Antipatrones

### Programar sin Git

Peligroso.

### No revisar diff

El agente decide por ti.

### No ejecutar tests

Confías en texto, no en realidad.

### Pedir todo de golpe

Caos.

### Permitir refactors masivos

Difícil de revisar.

### No documentar instrucciones

Cada sesión empieza desde cero.

### No proteger secretos

Riesgo grave.

### No definir MVP

Alcance infinito.

### No entender el código

No puedes mantenerlo.

### Confundir demo con producto

El error más caro.

---

## 13.38 Ideas clave del capítulo

- Vibe coding acelera prototipos, pero no sustituye ingeniería.
- El humano debe actuar como director técnico.
- Los mejores resultados vienen de contexto, reglas, tareas pequeñas y tests.
- Git, diff y tests son herramientas obligatorias.
- Las reglas persistentes convierten vibe coding caótico en flujo controlado.
- Los agentes deben trabajar con permisos y límites.
- MCP amplía capacidades, pero también riesgos.
- Vibe coding es excelente para aprender, prototipar y crear portfolio.
- Para producto, hay que añadir seguridad, documentación, evaluación y mantenimiento.
- La ventaja competitiva está en dirigir bien la IA, no solo en usarla.

---

## 13.39 Checklist práctica

Antes de una sesión de vibe coding:

- ¿Tengo Git limpio?
- ¿Estoy en una rama?
- ¿Está claro el objetivo?
- ¿La tarea es pequeña?
- ¿Hay criterio de aceptación?
- ¿El agente conoce el stack?
- ¿Hay instrucciones persistentes?
- ¿Sé qué archivos puede tocar?
- ¿Tengo tests?
- ¿Sé cómo ejecutar el proyecto?
- ¿Hay secretos protegidos?
- ¿Está claro qué NO debe hacer?
- ¿Voy a revisar el diff?
- ¿Voy a ejecutar antes de seguir?
- ¿Voy a documentar cambios?

Después de la sesión:

- ¿Compila?
- ¿Pasan tests?
- ¿Entiendo los cambios?
- ¿El diff es razonable?
- ¿Hay dependencias nuevas?
- ¿Hay riesgos de seguridad?
- ¿Hay documentación actualizada?
- ¿Hay commit claro?
- ¿Quedaron TODOs?
- ¿La tarea cumple definición de done?

---

## 13.40 Plantilla de prompt para vibe coding controlado

```markdown
Actúa como agente de desarrollo senior.

## Contexto

[Describe proyecto, stack y objetivo]

## Tarea

[Describe una tarea pequeña]

## Reglas

- Antes de modificar, resume plan.
- Cambios mínimos.
- No toques archivos no relacionados.
- No añadas dependencias sin justificar.
- No cambies arquitectura sin confirmación.
- Añade o actualiza tests.
- No toques secretos.
- Respeta estilo existente.

## Criterio de aceptación

- [ ] ...
- [ ] ...
- [ ] ...

## Entrega

Al final responde:
1. Archivos modificados.
2. Qué cambió.
3. Tests ejecutados.
4. Riesgos o TODOs.
```

---

## 13.41 Qué puede cambiar en el futuro

Cambiarán:

- IDEs;
- agentes de código;
- MCP;
- integración con GitHub;
- generación de tests;
- modelos especializados;
- revisión automática;
- despliegue asistido;
- seguridad;
- frameworks.

Pero probablemente seguirá siendo cierto:

> Cuanto más poderosa sea la IA programando, más importantes serán las reglas, los tests y el criterio humano.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 12 — Prompts para crear software
- Capítulo 14 — Reglas para agentes de código
- Capítulo 15 — De idea a prototipo
- Capítulo 24 — Qué es un agente de IA
- Capítulo 26 — MCP
- Capítulo 27 — Arquitecturas agenticas
- Capítulo 46 — Despliegue de sistemas IA
- Capítulo 48 — Seguridad
- Capítulo 50 — Evaluación
- Apéndice B — Plantillas de prompts
- Apéndice G — Tabla viva de frameworks agenticos
