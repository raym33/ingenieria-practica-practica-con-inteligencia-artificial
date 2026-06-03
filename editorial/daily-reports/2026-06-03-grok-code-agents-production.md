# Informe editorial — Agentes de código en producción

Fecha: 2026-06-03

Fuente: análisis aportado por Grok sobre señales de X de 2025-2026 relacionadas con agentes de código en equipos reales.

## Lectura editorial

La señal principal es clara: los equipos que sacan valor de agentes de código no los tratan como magia autónoma.

Los tratan como fuerza de ejecución dentro de un sistema de ingeniería:

- especificaciones previas;
- `AGENTS.md` como contrato de comportamiento;
- cambios pequeños;
- validación rápida;
- revisión humana;
- revisión adversarial;
- gates de seguridad;
- despliegues por fases;
- SOP vivo;
- trazas y métricas.

El fallo recurrente no es que el agente no pueda programar. El fallo es darle un repositorio real sin límites, sin tests rápidos, sin permisos adecuados y sin una definición clara de qué no debe tocar.

## Decisión editorial

El libro debe reforzar el capítulo de reglas para agentes de código con una idea más dura:

> Un agente de código en producción no es un programador autónomo. Es un ejecutor acotado por specs, reglas, tests, permisos y revisión.

## Cambios recomendados

1. Añadir plantillas descargables para:
   - `AGENTS.md`;
   - spec de tarea;
   - prompt de revisión adversarial;
   - prompt de tests de seguridad;
   - SOP de agente.
2. Ampliar el capítulo 14 con un workflow spec-driven.
3. Explicar la deuda por precedente: el código malo entra en contexto y se propaga.
4. Añadir un gate de seguridad para APIs y tools.
5. Medir agentic coding con métricas operativas, no con sensación de velocidad.

## Riesgo editorial

Si el libro habla de agentes de código solo como productividad, se parecerá a recursos de vibe coding.

El diferencial debe ser producción:

- cómo limitar autonomía;
- cómo evitar deuda técnica autoamplificada;
- cómo validar rápido;
- cómo proteger producción;
- cómo revisar código generado con criterio.

