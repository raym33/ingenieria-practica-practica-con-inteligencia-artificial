---
title: "Capítulo 22 — Chatbots para soporte"
chapter: "23"
part: "Parte VI — Chatbots, copilotos y asistentes"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "intermedio"
estimated_reading_time: "40 minutos"
---

# Capítulo 22 — Chatbots para soporte

El soporte es uno de los usos más obvios de los chatbots con IA.

También es uno de los más peligrosos si se diseña mal.

Un buen chatbot de soporte puede:

- responder preguntas repetidas;
- reducir carga del equipo;
- guiar al usuario;
- consultar documentación;
- crear tickets;
- clasificar incidencias;
- resumir conversaciones;
- escalar a humano;
- mejorar tiempos de respuesta;
- detectar problemas frecuentes.

Un mal chatbot de soporte puede:

- bloquear al usuario;
- inventar soluciones;
- repetir respuestas genéricas;
- ocultar el contacto humano;
- frustrar;
- aumentar tickets;
- dar instrucciones peligrosas;
- dañar marca;
- generar falsa confianza;
- crear costes inesperados.

El objetivo de un chatbot de soporte no es “quitar humanos”.

El objetivo es resolver mejor.

A veces resolver mejor significa automatizar.

A veces significa escalar rápido a una persona.

---

## 22.1 Qué problema resuelve un chatbot de soporte

Un chatbot de soporte puede resolver problemas como:

- preguntas frecuentes;
- problemas de configuración;
- dudas sobre producto;
- recuperación de información;
- seguimiento de estado;
- clasificación de incidencias;
- generación de borradores;
- recopilación de datos antes de escalar;
- reducción de tiempos de espera;
- soporte 24/7 básico.

Pero no todos los problemas de soporte son buenos candidatos.

Buen candidato:

```text
¿Cómo cambio mi contraseña?
```

Mal candidato para automatización completa:

```text
He recibido un cargo duplicado y necesito que lo reviséis.
```

El segundo puede requerir datos internos, permisos, verificación y humano.

---

## 22.2 Tipos de soporte

### Soporte informativo

Responde dudas.

Ejemplo:

```text
¿Cuál es el horario?
```

### Soporte técnico

Ayuda a resolver errores.

Ejemplo:

```text
No puedo conectar la API.
```

### Soporte transaccional

Consulta o modifica datos.

Ejemplo:

```text
¿Cuál es el estado de mi pedido?
```

### Soporte sensible

Afecta dinero, salud, legal, seguridad o datos personales.

Ejemplo:

```text
Quiero cancelar un contrato con penalización.
```

Cada tipo necesita controles distintos.

No uses la misma arquitectura para todo.

---

## 22.3 La base de conocimiento

Un chatbot de soporte necesita conocimiento.

Puede venir de:

- FAQs;
- manuales;
- documentación;
- tickets resueltos;
- políticas;
- procedimientos internos;
- estado de sistemas;
- CRM;
- ERP;
- base de datos;
- APIs;
- historial de usuario.

La calidad del bot depende de la calidad de esta base.

Si la documentación está desactualizada, el bot responderá mal.

Antes de construir, revisa:

- qué documentos existen;
- quién los mantiene;
- cuándo se actualizaron;
- qué preguntas cubren;
- qué falta;
- qué contradicciones hay.

Un bot de soporte puede revelar el desorden documental de una empresa.

Eso no es fallo del bot.

Es diagnóstico.

---

## 22.4 FAQ vs RAG

Para soporte simple, una FAQ estructurada puede ser suficiente.

Ejemplo:

```text
Pregunta: ¿Cómo cambio mi contraseña?
Respuesta: Entra en Ajustes > Seguridad > Cambiar contraseña.
```

Ventajas:

- control;
- rapidez;
- bajo coste;
- fácil de revisar;
- menos riesgo.

RAG tiene sentido si:

- hay mucha documentación;
- las preguntas varían;
- hay manuales largos;
- el conocimiento cambia;
- necesitas citas;
- quieres buscar en tickets/documentos.

No uses RAG si una tabla de FAQ resuelve el 80 %.

Empieza simple.

---

## 22.5 Intención del usuario

El bot debe entender qué quiere el usuario.

Ejemplos de intenciones:

- pregunta frecuente;
- problema técnico;
- estado de pedido;
- facturación;
- cancelación;
- hablar con humano;
- queja;
- bug;
- consulta comercial;
- fuera de alcance.

Clasificar intención permite enrutar.

```text
mensaje → intención → flujo
```

No todo debe ir al mismo prompt.

Un bot de soporte robusto suele ser una mezcla de:

- reglas;
- clasificación;
- RAG;
- tools;
- formularios;
- humano.

---

## 22.6 Datos necesarios antes de responder

A veces el bot necesita recopilar datos.

Ejemplo técnico:

- sistema operativo;
- versión;
- mensaje de error;
- pasos realizados;
- cuenta afectada;
- captura opcional.

Ejemplo pedido:

- número de pedido;
- email;
- código postal;
- verificación.

Prompt útil:

```text
Si falta información necesaria para resolver la incidencia, pide solo los datos mínimos.
No pidas datos sensibles innecesarios.
```

Minimizar datos es buena UX y buena privacidad.

---

## 22.7 Escalado humano

El escalado no es fracaso.

Es una función esencial.

Escalar cuando:

- usuario lo pide;
- baja confianza;
- tema sensible;
- error repetido;
- enfado;
- fuera de alcance;
- acción crítica;
- datos insuficientes;
- posible daño;
- el bot ya intentó resolver sin éxito.

El bot debe decir:

```text
Voy a pasar esta conversación a una persona con el contexto necesario.
```

Y debe pasar:

- resumen;
- intención;
- datos recopilados;
- historial relevante;
- fuentes consultadas;
- motivo de escalado.

No hagas repetir al usuario.

---

## 22.8 Handoff bien diseñado

Un handoff malo:

```text
Contacta con soporte.
```

Un handoff bueno:

```text
He preparado un resumen para soporte:
- Problema: no puedes acceder a tu cuenta.
- Pasos probados: restablecimiento de contraseña.
- Error: código 403.
- Usuario solicita ayuda humana.
```

Esto ahorra tiempo.

El bot puede generar resúmenes de handoff muy útiles.

Incluso si no resuelve, mejora soporte.

---

## 22.9 Crear tickets

Un bot de soporte puede crear tickets.

Pero debe hacerlo bien.

Campos:

- usuario;
- categoría;
- prioridad;
- resumen;
- descripción;
- pasos;
- adjuntos;
- producto;
- versión;
- urgencia;
- consentimiento;
- canal.

Prompt:

```text
Convierte esta conversación en un ticket de soporte.
Incluye solo hechos confirmados.
No inventes datos.
Marca como "desconocido" lo que falte.
```

Crear tickets de calidad es una de las mejores automatizaciones.

---

## 22.10 Clasificar prioridad

El bot puede sugerir prioridad.

Ejemplo:

- baja;
- media;
- alta;
- crítica.

Criterios:

- impacto;
- número de usuarios;
- bloqueo;
- pérdida económica;
- seguridad;
- salud;
- SLA;
- cliente premium.

Pero la prioridad final puede requerir reglas de negocio.

No dejes que el modelo decida solo casos críticos.

---

## 22.11 Soporte técnico

Para soporte técnico, el bot debe evitar inventar comandos peligrosos.

Reglas:

- pedir contexto;
- citar documentación;
- advertir antes de acciones destructivas;
- no pedir contraseñas;
- no exponer claves;
- no ejecutar comandos sin explicación;
- diferenciar diagnóstico de solución;
- escalar si hay riesgo.

Ejemplo:

```text
Antes de sugerir borrar datos o reiniciar servicios, explica el impacto y pide confirmación humana.
```

La IA puede ser excelente en soporte técnico, pero debe estar controlada.

---

## 22.12 Soporte con documentación técnica

RAG técnico debe manejar:

- versiones;
- APIs;
- errores;
- logs;
- snippets;
- comandos;
- configuración;
- sistemas operativos;
- dependencias.

Búsqueda híbrida suele ser útil porque hay términos exactos:

- códigos de error;
- nombres de funciones;
- endpoints;
- versiones;
- paquetes.

No confíes solo en embeddings.

---

## 22.13 Soporte de facturación

Facturación es sensible.

El bot puede:

- explicar facturas;
- indicar dónde descargar;
- recoger incidencia;
- crear ticket;
- consultar estado si tiene permisos.

Debe tener cuidado con:

- importes;
- datos personales;
- métodos de pago;
- cancelaciones;
- reembolsos;
- cargos;
- cambios contractuales.

Acciones como reembolsar o cancelar deben estar controladas.

---

## 22.14 Soporte legal o contractual

Si el usuario pregunta por condiciones legales:

- cita contrato o términos;
- no inventes;
- indica límites;
- escala si hay disputa;
- no des asesoramiento legal definitivo;
- muestra fuentes.

Ejemplo:

```text
Según la cláusula 6.2 del contrato, ...
Para una interpretación legal definitiva, debe revisarlo el equipo correspondiente.
```

---

## 22.15 Soporte sanitario

En salud, extrema cautela.

Un bot puede:

- orientar sobre uso de una app sanitaria;
- recordar pasos administrativos;
- recoger síntomas para profesional;
- escalar urgencias;
- ofrecer información general.

No debe:

- diagnosticar definitivamente;
- retrasar atención urgente;
- recomendar tratamientos peligrosos;
- sustituir criterio clínico.

Debe detectar señales de alarma y escalar.

---

## 22.16 Soporte emocional

Usuarios enfadados o frustrados necesitan trato cuidadoso.

El bot debe:

- reconocer frustración;
- no discutir;
- no culpar;
- ofrecer pasos claros;
- escalar pronto;
- evitar respuestas robóticas.

Ejemplo:

```text
Entiendo que esto es frustrante. Voy a intentar resolverlo contigo y, si no podemos avanzar rápido, lo paso a una persona con el contexto.
```

El tono importa.

---

## 22.17 No esconder al humano

Un error frecuente es usar el bot para ocultar el contacto humano.

Eso genera rechazo.

Mejor:

- permitir “hablar con persona”;
- explicar cuándo está disponible;
- ofrecer ticket;
- dar número/canal si procede;
- no forzar bucles.

La IA debe mejorar soporte.

No convertirse en muro.

---

## 22.18 Métricas de soporte

Mide:

- resolución automática;
- tasa de escalado;
- satisfacción;
- tiempo hasta primera respuesta;
- tiempo hasta resolución;
- tickets evitados;
- tickets creados correctamente;
- coste por conversación;
- errores;
- respuestas no encontradas;
- uso de fuentes;
- abandono;
- quejas;
- temas frecuentes.

Cuidado con medir solo reducción de tickets.

Si reduces tickets frustrando usuarios, no es éxito.

---

## 22.19 Métrica: deflection

Deflection mide cuántos casos no llegan a humano.

Puede ser útil.

Pero peligrosa.

Una deflection alta puede significar:

- el bot resolvió bien;
- o el usuario se rindió.

Combínala con:

- satisfacción;
- recontacto;
- resolución real;
- feedback;
- tiempos;
- calidad de respuesta.

No optimices para evitar humanos a toda costa.

---

## 22.20 Métrica: resolución real

Mejor pregunta:

```text
¿El usuario resolvió su problema?
```

Esto puede medirse con:

- feedback;
- no recontacto;
- confirmación explícita;
- ticket cerrado;
- evento de producto;
- encuesta breve.

La resolución real es más importante que la conversación bonita.

---

## 22.21 Soporte omnicanal

Un usuario puede empezar en web y seguir en email o WhatsApp.

Retos:

- identidad;
- historial;
- privacidad;
- sincronización;
- consentimiento;
- contexto;
- formato;
- adjuntos;
- tiempos.

No empieces omnicanal si aún no resuelves bien un canal.

Primero un canal.

Luego expande.

---

## 22.22 Integración con helpdesk

Herramientas típicas:

- Zendesk;
- Intercom;
- Freshdesk;
- HubSpot;
- Salesforce;
- Jira Service Management;
- sistemas propios.

Integraciones útiles:

- crear ticket;
- buscar artículos;
- ver estado;
- etiquetar;
- resumir conversación;
- sugerir respuesta al agente humano;
- detectar prioridad.

No hace falta que el bot hable directamente con cliente al principio.

Puede empezar como copiloto del equipo de soporte.

---

## 22.23 Copiloto para agentes humanos

A veces el mejor chatbot de soporte no responde al cliente.

Ayuda al agente humano.

Funciones:

- resumir conversación;
- buscar artículos;
- sugerir respuesta;
- detectar tono;
- traducir;
- clasificar;
- completar campos;
- sugerir siguiente paso;
- generar macros.

Esto reduce riesgo porque el humano revisa.

Para dominios sensibles, suele ser mejor empezar aquí.

---

## 22.24 Macros inteligentes

Soporte ya usa macros.

La IA puede mejorarlas.

En vez de respuesta fija:

```text
Gracias por contactar...
```

Puede generar una respuesta adaptada:

- al problema;
- al tono del usuario;
- a la política actual;
- al historial;
- al canal.

Pero debe citar o basarse en fuente.

Y el humano debe poder editar.

---

## 22.25 Base de conocimiento viva

Cada ticket resuelto puede revelar una brecha.

Proceso:

```text
ticket repetido → artículo nuevo → revisión → indexación → bot responde mejor
```

El bot no debe ser solo consumidor de conocimiento.

Debe ayudar a detectar qué falta.

Métricas:

- preguntas sin respuesta;
- fuentes incorrectas;
- temas repetidos;
- artículos obsoletos;
- tickets que podrían automatizarse.

---

## 22.26 Evaluación del chatbot de soporte

Dataset mínimo:

- 30 FAQs;
- 20 problemas técnicos;
- 10 facturación;
- 10 usuarios enfadados;
- 10 fuera de alcance;
- 10 solicitudes de humano;
- 10 prompt injections;
- 10 casos sensibles.

Evalúa:

- intención;
- respuesta;
- fuente;
- tono;
- escalado;
- seguridad;
- coste;
- latencia.

---

## 22.27 Prompt de soporte básico

```text
Eres un asistente de soporte.

Objetivo:
Ayudar al usuario a resolver su problema usando la base de conocimiento y las herramientas disponibles.

Reglas:
- Si hay fuentes, basa la respuesta en ellas.
- No inventes políticas, precios ni datos de cuenta.
- Si falta información, pide solo los datos mínimos.
- Si el usuario pide una persona, escala.
- Si el problema es sensible o no estás seguro, escala.
- Mantén tono claro, amable y breve.

Formato:
1. Respuesta directa
2. Pasos recomendados
3. Fuente si aplica
4. Opción de escalar
```

---

## 22.28 Prompt para crear ticket

```text
Convierte esta conversación en un ticket de soporte.

Reglas:
- Incluye solo hechos confirmados.
- No inventes datos.
- Si falta algo, escribe "desconocido".
- Resume en lenguaje claro.
- Clasifica categoría y prioridad sugerida.
- Incluye próximos pasos recomendados.

Formato:
- Título
- Resumen
- Categoría
- Prioridad sugerida
- Datos conocidos
- Datos faltantes
- Conversación resumida
```

---

## 22.29 Prompt para sugerir respuesta a agente humano

```text
Actúa como copiloto de soporte.

Con esta conversación y fuentes, sugiere una respuesta para que un agente humano la revise.

Reglas:
- No envíes nada automáticamente.
- Basa la respuesta en fuentes.
- Indica incertidumbres.
- Mantén tono empático.
- Si hay riesgo legal, financiero o de seguridad, marca revisión obligatoria.

Devuelve:
1. Respuesta sugerida
2. Fuentes usadas
3. Riesgos
4. Datos que faltan
```

---

## 22.30 Prompt para detectar escalado

```text
Determina si esta conversación debe escalarse a humano.

Criterios de escalado:
- usuario lo pide;
- enfado alto;
- problema sensible;
- baja confianza;
- datos insuficientes;
- posible pérdida económica;
- tema legal/médico/seguridad;
- dos intentos fallidos;
- fuera de alcance.

Devuelve JSON:
{
  "escalar": true/false,
  "motivo": "...",
  "prioridad": "baja|media|alta|critica"
}
```

---

## 22.31 Herramientas para soporte

Un bot de soporte puede usar:

- search_kb;
- get_order_status;
- create_ticket;
- get_ticket_status;
- escalate_to_human;
- summarize_conversation;
- classify_issue;
- check_service_status;
- send_email_draft.

Cada tool debe tener permisos.

Acciones de escritura requieren confirmación o reglas estrictas.

---

## 22.32 Seguridad en soporte

Riesgos:

- revelar datos de cuenta;
- aceptar ingeniería social;
- cambiar datos sin verificar;
- dar instrucciones peligrosas;
- exponer políticas internas;
- ejecutar tools maliciosas;
- prompt injection;
- logs sensibles.

Controles:

- autenticación;
- verificación;
- permisos;
- minimización de datos;
- rate limits;
- confirmación;
- auditoría;
- revisión humana;
- no mostrar información interna.

---

## 22.33 Privacidad en soporte

Soporte maneja datos personales.

Reglas:

- pedir solo lo necesario;
- no pedir contraseñas;
- no guardar más de lo necesario;
- ocultar datos sensibles;
- definir retención;
- permitir borrado;
- controlar logs;
- informar al usuario;
- cumplir RGPD.

En Europa, un chatbot de soporte no puede tratar datos como si fueran texto cualquiera.

---

## 22.34 Coste de soporte con IA

Costes:

- conversaciones;
- tokens;
- RAG;
- tools;
- escalado;
- observabilidad;
- almacenamiento;
- evaluación;
- mantenimiento.

Optimización:

- FAQ determinista para casos simples;
- modelos pequeños para clasificación;
- RAG solo cuando hace falta;
- respuestas breves;
- cache de artículos;
- handoff rápido en casos complejos;
- limitar loops.

El bot debe ahorrar, no crear coste invisible.

---

## 22.35 Latencia en soporte

Soporte necesita rapidez.

Si el bot tarda demasiado, el usuario se va.

Estrategias:

- respuesta inicial rápida;
- streaming;
- mensajes de estado;
- evitar workflows largos;
- buscar en KB eficiente;
- no hacer OCR en tiempo real;
- escalar si se bloquea;
- cache.

---

## 22.36 MVP de chatbot de soporte

MVP razonable:

- un canal;
- 30-50 FAQs;
- RAG con artículos;
- detección de intención;
- fallback;
- crear ticket;
- escalar humano;
- logs;
- feedback;
- evaluación básica.

No incluir al principio:

- omnicanal completo;
- agentes autónomos;
- acciones críticas;
- memoria avanzada;
- personalización compleja;
- automatización de reembolsos;
- integración total con CRM.

---

## 22.37 Roadmap

### Fase 1 — Copiloto interno

Ayuda al equipo humano.

### Fase 2 — Bot público limitado

Responde FAQs y crea tickets.

### Fase 3 — RAG documental

Consulta base de conocimiento con fuentes.

### Fase 4 — Integraciones

Estado de pedidos, tickets, cuenta.

### Fase 5 — Automatización controlada

Acciones simples con confirmación.

### Fase 6 — Optimización

Evaluación, feedback, costes, analítica.

---

## 22.38 Antipatrones

### Ocultar al humano

Frustra.

### Responder sin fuentes

Riesgo.

### Medir solo deflection

Puede engañar.

### No actualizar base de conocimiento

El bot envejece.

### No gestionar enfado

Mala experiencia.

### No verificar identidad

Riesgo de datos.

### Tools con permisos amplios

Peligro.

### No evaluar casos sensibles

Riesgo legal/reputacional.

### Bot omnicanal desde el día uno

Complejidad prematura.

### Vender soporte totalmente autónomo

Expectativas irreales.

---

## 22.39 Ideas clave del capítulo

- Un chatbot de soporte debe resolver problemas, no bloquear humanos.
- La base de conocimiento es tan importante como el modelo.
- FAQ, RAG, tools y humano deben combinarse con criterio.
- El escalado humano es una función, no un fracaso.
- Crear tickets buenos ya aporta mucho valor.
- Medir solo deflection puede llevar a malas decisiones.
- Soporte sensible exige límites, fuentes y revisión.
- Un copiloto para agentes humanos puede ser mejor primera fase que un bot público.
- Seguridad, privacidad y verificación son esenciales.
- El soporte con IA debe optimizar resolución real, no conversación aparente.

---

## 22.40 Checklist práctica

Antes de lanzar un chatbot de soporte:

- ¿Qué casos resuelve?
- ¿Qué casos escala?
- ¿Tiene base de conocimiento actualizada?
- ¿Usa RAG cuando hace falta?
- ¿Cita fuentes?
- ¿Puede crear tickets?
- ¿Resume handoff?
- ¿Detecta enfado?
- ¿Detecta temas sensibles?
- ¿Permite hablar con humano?
- ¿Pide solo datos mínimos?
- ¿Verifica identidad cuando procede?
- ¿Tiene logs seguros?
- ¿Cumple privacidad?
- ¿Mide resolución real?
- ¿Mide satisfacción?
- ¿Mide coste?
- ¿Tiene dataset de evaluación?
- ¿Se ha probado con prompt injection?
- ¿Hay responsable de base de conocimiento?

---

## 22.41 Plantilla de diseño para soporte

```markdown
# Chatbot de soporte

## Objetivo

Qué problema de soporte reduce.

## Casos incluidos

Lista.

## Casos excluidos

Lista.

## Base de conocimiento

Fuentes y responsable.

## Canales

Web, WhatsApp, email, etc.

## Intenciones

Categorías.

## RAG

Sí/no, fuentes y citas.

## Tools

Crear ticket, consultar estado, etc.

## Handoff humano

Criterios y formato.

## Datos personales

Qué se pide y por qué.

## Seguridad

Verificación, permisos, logs.

## Métricas

Resolución, satisfacción, escalado, coste.

## Evaluación

Dataset y casos sensibles.

## Roadmap

Fases.
```

---

## 22.42 Qué puede cambiar en el futuro

Cambiarán:

- plataformas de soporte;
- integraciones;
- modelos;
- voz;
- agentes;
- MCP;
- canales;
- expectativas del usuario;
- regulación;
- costes.

Pero seguirá siendo cierto:

> El mejor chatbot de soporte no es el que evita más humanos, sino el que resuelve mejor con el menor riesgo y la menor fricción.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 21 — Chatbots modernos
- Capítulo 16 — Qué problema resuelve RAG
- Capítulo 20 — Herramientas RAG
- Capítulo 23 — Diferencia entre chatbot, copiloto y agente
- Capítulo 24 — Qué es un agente de IA
- Capítulo 25 — Function calling
- Capítulo 26 — MCP
- Capítulo 29 — Agentes de voz
- Capítulo 35 — IA para PYMEs
- Capítulo 50 — Evaluación
