---
title: "Capítulo 29 — Agentes de voz"
chapter: "30"
part: "Parte VII — Agentes, tools y automatización"
version: "0.1"
last_updated: "2026-06-03"
status: "muy cambiante"
level: "intermedio"
estimated_reading_time: "42 minutos"
---

# Capítulo 29 — Agentes de voz

La voz cambia la relación con la IA.

Un chatbot de texto puede esperar.  
Un asistente de voz no.  

En texto puedes leer una respuesta larga.  
En voz, una respuesta larga cansa.  

En texto puedes copiar, revisar y volver atrás.  
En voz necesitas turnos, confirmaciones y memoria inmediata.  

En texto un error se ve.  
En voz un error puede pasar desapercibido.  

Por eso un agente de voz no es simplemente un chatbot leído en alto.

Es otro tipo de producto.

Un agente de voz combina:

- captura de audio;
- transcripción;
- detección de turnos;
- modelo conversacional;
- RAG;
- herramientas;
- memoria;
- síntesis de voz;
- latencia baja;
- interrupciones;
- confirmaciones;
- seguridad.

Este capítulo explica cómo diseñar agentes de voz útiles, seguros y realistas.

---

## 29.1 Qué es un agente de voz

Un agente de voz es un sistema que permite interactuar con IA mediante conversación hablada.

Flujo básico:

```text
usuario habla
→ STT/transcripción
→ modelo/agente
→ tools/RAG si hace falta
→ respuesta textual
→ TTS/síntesis de voz
→ usuario escucha
```

Pero en la práctica hay más:

```text
audio
→ detección de voz
→ transcripción parcial
→ gestión de turnos
→ contexto
→ decisión
→ tool/RAG
→ generación
→ voz
→ interrupción si el usuario habla
```

La voz añade tiempo real.

Y el tiempo real cambia todo.

---

## 29.2 STT y TTS

Dos piezas básicas:

### STT

Speech-to-text.

Convierte audio en texto.

Ejemplo:

```text
audio: "quiero cambiar mi cita"
texto: "Quiero cambiar mi cita."
```

### TTS

Text-to-speech.

Convierte texto en voz.

Ejemplo:

```text
texto: "Tu cita es mañana a las diez."
audio generado
```

Un agente de voz depende de la calidad de ambas.

Un modelo excelente con mala transcripción parecerá tonto.

Una buena respuesta con mala voz parecerá poco profesional.

---

## 29.3 La latencia manda

En voz, la latencia es crítica.

Si el usuario habla y el sistema tarda demasiado, la experiencia se rompe.

Componentes de latencia:

```text
captura audio
+ detección fin de turno
+ STT
+ razonamiento
+ RAG/tools
+ generación
+ TTS
+ reproducción
```

Cada etapa suma.

Optimizar agentes de voz es optimizar pipeline completo.

No solo el modelo.

---

## 29.4 Respuestas cortas

En voz, menos es más.

Malo:

```text
Según la documentación disponible, y teniendo en cuenta diferentes factores que podrían ser relevantes...
```

Mejor:

```text
Puedes cambiar la cita desde el área de usuario. ¿Quieres que te guíe paso a paso?
```

La voz necesita:

- frases cortas;
- estructura clara;
- pausas;
- confirmaciones;
- preguntas concretas;
- no demasiadas opciones a la vez.

El texto se puede hojear.

La voz no.

---

## 29.5 Turnos

El sistema debe saber cuándo el usuario ha terminado.

Problemas:

- silencios;
- interrupciones;
- ruido;
- dudas;
- frases incompletas;
- usuarios lentos;
- varios hablantes.

Si corta demasiado pronto, interrumpe.

Si espera demasiado, parece lento.

La gestión de turnos es parte central del producto.

---

## 29.6 Interrupciones

Un buen agente de voz debe poder ser interrumpido.

Usuario:

```text
No, espera, eso no era...
```

El sistema debe parar o adaptarse.

Sin interrupciones, la voz se siente torpe.

Especialmente cuando el sistema da respuestas largas.

Interrupción requiere:

- detectar voz del usuario mientras TTS habla;
- detener reproducción;
- conservar estado;
- responder al cambio.

---

## 29.7 Confirmaciones

En voz, las confirmaciones son esenciales.

Ejemplo:

```text
He entendido que quieres cancelar la cita de mañana a las 10. ¿Confirmas?
```

Para acciones críticas:

- cancelar;
- enviar;
- borrar;
- comprar;
- reservar;
- modificar datos;
- compartir información;
- crear compromiso.

La voz puede inducir errores.

Confirma antes de ejecutar.

---

## 29.8 Memoria inmediata

En una conversación de voz, el usuario espera continuidad.

Ejemplo:

```text
Usuario: Quiero cambiar mi cita.
Agente: ¿Para qué día?
Usuario: Para el viernes.
```

El agente debe recordar que “viernes” se refiere a la cita.

Esto es memoria de sesión.

No necesariamente memoria persistente.

La mayoría de agentes de voz necesitan buena memoria inmediata antes que memoria larga.

---

## 29.9 Voz no es texto leído

Una respuesta escrita puede ser:

```markdown
Para cambiar su cita:
1. Acceda al portal.
2. Seleccione "Mis citas".
3. Pulse "Modificar".
4. Elija nueva fecha.
5. Confirme.
```

En voz, mejor:

```text
Primero entra en el portal y abre “Mis citas”. Cuando estés ahí, dime “listo” y seguimos.
```

Voz es guiada, paso a paso.

No dump de información.

---

## 29.10 Diseño conversacional

Un agente de voz debe diseñarse como conversación.

Principios:

- una pregunta cada vez;
- opciones limitadas;
- confirmaciones claras;
- fallback amable;
- repetir solo lo necesario;
- adaptar ritmo;
- evitar tecnicismos;
- resumir estado;
- permitir salir;
- permitir humano.

Ejemplo:

```text
Puedo ayudarte con tres cosas: cambiar cita, consultar cita o cancelar. ¿Cuál necesitas?
```

No des diez opciones.

---

## 29.11 Casos de uso razonables

Buenos primeros casos:

- FAQs por voz;
- soporte básico;
- reserva o cambio de cita con confirmación;
- práctica de idiomas;
- dictado asistido;
- resumen de información;
- búsqueda documental hablada;
- recepción telefónica;
- cualificación de leads;
- guía paso a paso;
- recopilación de datos para ticket.

Casos de alto riesgo:

- diagnóstico médico autónomo;
- asesoramiento legal definitivo;
- operaciones financieras;
- decisiones contractuales;
- acciones irreversibles;
- emergencias.

En alto riesgo, humano en el loop.

---

## 29.12 Agente de voz para soporte

Flujo:

```text
usuario llama
→ agente saluda
→ detecta intención
→ pide datos mínimos
→ consulta KB/RAG
→ guía solución
→ crea ticket si no resuelve
→ escala a humano si procede
```

Reglas:

- no bloquear humano;
- detectar enfado;
- confirmar datos;
- resumir antes de crear ticket;
- no pedir contraseñas;
- no inventar políticas;
- escalar temas sensibles.

---

## 29.13 Agente de voz para leads

Puede:

- responder dudas;
- cualificar;
- recoger datos;
- agendar llamada;
- enviar resumen al comercial.

Debe evitar:

- prometer disponibilidad falsa;
- inventar precios;
- presionar;
- recoger datos sin informar;
- incumplir privacidad.

Ejemplo:

```text
Puedo tomar tus datos para que un asesor te llame. ¿Me das permiso?
```

---

## 29.14 Agente de voz educativo

Uso potente:

- practicar speaking;
- corregir pronunciación;
- simular entrevista;
- hacer preguntas;
- adaptar nivel;
- dar feedback.

En idiomas, voz aporta valor real.

Reglas:

- no interrumpir demasiado;
- corregir con tacto;
- adaptar nivel;
- separar fluidez de precisión;
- dar feedback breve;
- permitir repetir.

Ejemplo:

```text
Muy bien. Te corrijo solo una cosa: en vez de “I am agree”, di “I agree”. Repite la frase.
```

---

## 29.15 Agente de voz para profesionales

Puede ayudar a:

- dictar informes;
- resumir reuniones;
- registrar tareas;
- buscar información;
- crear notas;
- preparar borradores;
- consultar agenda;
- registrar incidencias.

La voz es útil cuando las manos o la atención están ocupadas.

Ejemplos:

- médicos;
- técnicos de campo;
- comerciales;
- profesores;
- conductores;
- operarios;
- abogados preparando notas;
- administrativos.

---

## 29.16 Agente telefónico vs agente en app

No es lo mismo.

### Teléfono

- audio limitado;
- sin pantalla;
- identificación difícil;
- espera menor;
- contexto limitado;
- usuarios variados.

### App

- puede mostrar texto;
- botones;
- confirmaciones visuales;
- historial;
- autenticación;
- adjuntos.

La interfaz define arquitectura.

No diseñes igual ambos.

---

## 29.17 Voz + pantalla

La mejor experiencia suele combinar voz y pantalla.

Ejemplo:

```text
Agente explica por voz.
Pantalla muestra opciones.
Usuario confirma con botón.
```

Ventajas:

- menos errores;
- mejor verificación;
- accesibilidad;
- fuentes visibles;
- formularios;
- confirmaciones seguras.

No todo debe pasar por audio.

---

## 29.18 Voz + RAG

Un agente de voz puede consultar documentos.

Pero debe responder de forma oral.

Mal:

```text
Según el documento 1, sección 4.2, párrafo 3...
```

Mejor:

```text
La política dice que debes avisar con 15 días. Te puedo mostrar la fuente en pantalla o enviártela por email.
```

En voz:

- cita de forma breve;
- ofrece ver fuente;
- no leas fragmentos largos;
- confirma incertidumbre;
- permite enviar resumen.

---

## 29.19 Voz + tools

Tools posibles:

- consultar cita;
- crear ticket;
- agendar;
- enviar borrador;
- consultar estado;
- buscar documento;
- registrar nota;
- activar recordatorio.

Reglas:

- confirmación explícita;
- repetir datos importantes;
- logs;
- permisos;
- límites;
- fallback humano.

Ejemplo:

```text
Voy a crear un ticket con prioridad media sobre el error de acceso. ¿Confirmas?
```

---

## 29.20 Voz + MCP

MCP puede conectar el agente de voz con:

- calendario;
- email;
- CRM;
- base documental;
- tickets;
- navegador;
- filesystem;
- workflows.

Pero voz + tools aumenta riesgo.

Una mala transcripción puede ejecutar una acción equivocada.

Por eso:

- confirmar;
- mostrar si hay pantalla;
- limitar tools;
- read-only primero;
- logs;
- no acciones críticas sin humano.

---

## 29.21 Voz local

Un agente de voz local puede ejecutar:

- STT local;
- modelo local;
- RAG local;
- TTS local;
- tools locales.

Ventajas:

- privacidad;
- baja dependencia externa;
- coste fijo;
- uso en LAN;
- datos sensibles.

Riesgos:

- latencia;
- calidad STT/TTS;
- hardware;
- mantenimiento;
- instalación;
- ruido;
- actualizaciones.

Útil para:

- clínicas;
- despachos;
- PYMEs;
- educación;
- industria;
- entornos privados.

---

## 29.22 Voz cloud

Ventajas:

- mejor calidad;
- menor hardware;
- modelos avanzados;
- baja barrera;
- APIs gestionadas.

Riesgos:

- privacidad;
- coste variable;
- dependencia;
- latencia de red;
- cumplimiento;
- logs del proveedor.

Buena opción para prototipos y casos no sensibles.

---

## 29.23 Voz híbrida

Arquitectura:

```text
wake word / VAD local
+ STT local o cloud según sensibilidad
+ RAG local
+ modelo cloud para casos complejos
+ TTS local/cloud
```

O:

```text
datos sensibles → local
conversación general → cloud
```

Lo importante:

- mapa de datos;
- consentimiento;
- logs;
- permisos;
- fallback.

Híbrido sin mapa es peligroso.

---

## 29.24 Wake word y activación

Un agente de voz puede activarse por:

- botón;
- wake word;
- llamada;
- push-to-talk;
- evento;
- presencia;
- interfono.

Wake word permanente implica privacidad.

Preguntas:

- ¿escucha siempre?
- ¿qué se guarda?
- ¿se procesa local?
- ¿hay indicador visual?
- ¿puede apagarse?
- ¿se informa al usuario?

La confianza depende de esto.

---

## 29.25 Detección de voz y ruido

Necesitas manejar:

- ruido ambiente;
- ecos;
- micrófonos malos;
- varias personas;
- acentos;
- interrupciones;
- silencio;
- voz baja.

La IA de voz no vive en laboratorio.

Vive en oficinas, coches, casas, clínicas, aulas y teléfonos.

Prueba en condiciones reales.

---

## 29.26 Identidad del usuario

Por voz, identificar usuario es difícil.

Opciones:

- login previo en app;
- número de teléfono;
- PIN;
- verificación por SMS;
- preguntas de seguridad;
- biometría de voz;
- contexto de dispositivo.

No uses solo “suena como X” para acciones sensibles.

Verifica.

---

## 29.27 Privacidad en voz

La voz puede contener datos sensibles.

Reglas:

- informar grabación/procesamiento;
- pedir consentimiento si aplica;
- minimizar;
- no guardar audio si no hace falta;
- cifrar;
- retención limitada;
- transcripciones seguras;
- borrado;
- control de acceso.

El audio es más sensible de lo que parece.

Contiene contenido y rasgos biométricos.

---

## 29.28 Logs en agentes de voz

Qué registrar:

- transcripción;
- intención;
- tools llamadas;
- confirmaciones;
- errores;
- latencia;
- coste;
- escalados;
- feedback.

Qué evitar:

- audio completo sin necesidad;
- datos sensibles;
- contraseñas;
- información médica/legal sin controles.

Si guardas audio, justifica por qué.

---

## 29.29 Evaluación de agentes de voz

Evalúa:

- precisión STT;
- latencia;
- intención;
- resolución;
- interrupciones;
- confirmaciones;
- tono;
- seguridad;
- escalado;
- satisfacción;
- errores por ruido;
- coste.

Dataset:

- acentos;
- ruido;
- frases cortas;
- usuarios enfadados;
- interrupciones;
- datos ambiguos;
- acciones críticas;
- fuera de alcance.

No evalúes solo en escritorio silencioso.

---

## 29.30 Métricas específicas de voz

- tiempo hasta primera respuesta;
- latencia de turno;
- tasa de interrupción exitosa;
- tasa de transcripción correcta;
- repetición requerida;
- escalados;
- abandono;
- duración media;
- resolución;
- satisfacción;
- coste por minuto.

La voz se mide por experiencia temporal.

---

## 29.31 Seguridad en voz

Riesgos:

- mala transcripción;
- suplantación;
- acciones no confirmadas;
- capturar conversaciones ajenas;
- prompt injection oral;
- tool injection desde audio;
- datos sensibles;
- urgencias mal gestionadas.

Medidas:

- confirmación;
- autenticación;
- límites;
- humano en el loop;
- detección de riesgo;
- logs;
- no acciones críticas sin verificación;
- fallback.

---

## 29.32 Prompt de agente de voz

```text
Eres un agente de voz.

Reglas:
- Responde de forma breve.
- Haz una pregunta cada vez.
- Confirma antes de acciones.
- Si no estás seguro, pide aclaración.
- Si el usuario se enfada o pide humano, escala.
- No leas textos largos.
- Ofrece enviar o mostrar detalles cuando existan.
- No inventes información.
```

El prompt de voz debe ser distinto al de chat escrito.

---

## 29.33 Prompt para soporte por voz

```text
Eres un asistente de soporte por voz.

Objetivo:
Resolver dudas simples o crear un ticket claro para el equipo humano.

Reglas:
- Pide solo datos mínimos.
- No pidas contraseñas.
- Si el usuario pide persona, escala.
- Si el caso es sensible, escala.
- Resume antes de crear ticket.
- Confirma datos importantes.
- Responde en frases cortas.
```

---

## 29.34 Prompt para práctica de idiomas

```text
Eres un tutor de conversación en inglés.

Reglas:
- Mantén conversación natural.
- Corrige máximo una o dos cosas por turno.
- Da feedback breve.
- Adapta nivel.
- Haz preguntas abiertas.
- No interrumpas demasiado.
- Si el usuario se bloquea, ofrece una pista.
```

---

## 29.35 MVP de agente de voz

MVP razonable:

- push-to-talk;
- STT;
- LLM;
- TTS;
- un caso de uso;
- sin actions críticas;
- logs básicos;
- fallback texto;
- evaluación con 20-50 conversaciones.

No empezar con:

- wake word permanente;
- omnicanal;
- tools críticas;
- memoria larga;
- llamadas reales;
- usuarios finales sin supervisión.

Primero controla la experiencia.

---

## 29.36 Roadmap de voz

### Fase 1

Chat escrito funcional.

### Fase 2

Añadir TTS.

### Fase 3

Añadir STT push-to-talk.

### Fase 4

Optimizar turnos y latencia.

### Fase 5

Añadir RAG/tools read-only.

### Fase 6

Añadir confirmaciones y acciones seguras.

### Fase 7

Piloto con usuarios reales.

### Fase 8

Voz en tiempo real avanzada.

Este orden reduce riesgo.

---

## 29.37 Agentes de voz para PYMEs

Casos vendibles:

- recepción telefónica básica;
- cualificación de leads;
- recordatorios;
- soporte FAQ;
- citas;
- asistente interno por voz;
- dictado de notas;
- búsqueda documental por voz.

Cuidado:

- expectativas;
- privacidad;
- calidad de voz;
- soporte;
- mantenimiento;
- coste por minuto;
- escalado humano.

La voz impresiona mucho.

Pero debe resolver algo concreto.

---

## 29.38 Antipatrones

### Leer respuestas largas

Mala UX.

### No permitir interrupción

Frustrante.

### No confirmar acciones

Peligroso.

### Voz para todo

No siempre conviene.

### Guardar audio sin motivo

Riesgo privacidad.

### Sin fallback humano

Mala experiencia.

### Wake word sin transparencia

Desconfianza.

### Tools críticas por voz

Alto riesgo.

### No probar con ruido

Demo irreal.

### Copiar prompt de chatbot

No sirve.

---

## 29.39 Ideas clave del capítulo

- Un agente de voz no es un chatbot leído en alto.
- La latencia y los turnos son parte central del producto.
- Las respuestas deben ser breves y guiadas.
- La interrupción mejora mucho la experiencia.
- Las acciones requieren confirmación explícita.
- Voz + tools aumenta riesgo por errores de transcripción.
- Voz + pantalla suele ser mejor que solo voz.
- La privacidad del audio debe tratarse con especial cuidado.
- Para PYMEs, voz puede ser muy útil si el caso está acotado.
- Primero controla un caso de uso; luego añade autonomía.

---

## 29.40 Checklist práctica

Antes de crear un agente de voz:

- ¿Qué problema resuelve?
- ¿Por qué voz es mejor que texto?
- ¿Es teléfono, app o dispositivo?
- ¿Necesita pantalla?
- ¿Qué STT usarás?
- ¿Qué TTS usarás?
- ¿Cuál es la latencia aceptable?
- ¿Permite interrupciones?
- ¿Necesita wake word?
- ¿Qué datos se graban?
- ¿Se guarda audio?
- ¿Cómo se autentica usuario?
- ¿Qué acciones puede ejecutar?
- ¿Qué requiere confirmación?
- ¿Cuándo escala a humano?
- ¿Qué pasa si transcribe mal?
- ¿Qué logs guardas?
- ¿Cómo se borra información?
- ¿Se ha probado con ruido?
- ¿Se ha probado con acentos?

---

## 29.41 Plantilla de diseño de agente de voz

```markdown
# Agente de voz

## Objetivo

Qué tarea resuelve.

## Canal

Teléfono / app / web / dispositivo.

## Usuario

Quién lo usa.

## STT

Proveedor/modelo.

## TTS

Proveedor/modelo/voz.

## Latencia objetivo

Tiempo.

## Turnos

Cómo detecta fin de turno.

## Interrupciones

Sí/no.

## RAG

Fuentes.

## Tools

Acciones permitidas.

## Confirmaciones

Qué se confirma.

## Autenticación

Cómo identifica usuario.

## Privacidad

Audio, transcripción, retención.

## Logs

Qué se guarda.

## Fallback

Texto/humano/ticket.

## Evaluación

Casos de prueba y métricas.

## Riesgos

Lista.
```

---

## 29.42 Qué puede cambiar en el futuro

Cambiarán:

- modelos de voz en tiempo real;
- STT local;
- TTS expresivo;
- latencia;
- agentes telefónicos;
- hardware;
- regulación;
- biometría;
- integración con herramientas;
- costes por minuto.

Pero probablemente seguirá siendo cierto:

> En voz, la confianza se gana con rapidez, claridad, confirmaciones y límites.

---

## Recursos relacionados

Este capítulo conecta con:

- Capítulo 21 — Chatbots modernos
- Capítulo 22 — Chatbots para soporte
- Capítulo 24 — Qué es un agente de IA
- Capítulo 25 — Function calling
- Capítulo 26 — MCP
- Capítulo 27 — Arquitecturas agenticas
- Capítulo 28 — Memoria
- Capítulo 32 — Por qué IA local
- Capítulo 35 — IA para PYMEs
- Capítulo 48 — Seguridad
- Capítulo 50 — Evaluación
