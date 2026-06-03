---
title: "Capítulo 31 — Evaluación de sistemas IA"
chapter: "32"
part: "Parte VIII — Producción, seguridad y operación"
version: "0.1"
last_updated: "2026-06-03"
status: "estable"
level: "avanzado"
estimated_reading_time: "48 minutos"
---

# Capítulo 31 — Evaluación de sistemas IA

La evaluación es la diferencia entre creer que un sistema funciona y saber dónde falla.

Este capítulo cierra una pieza que faltaba en el libro: pasar de entender una técnica a saber operarla en un producto real.

La idea no es añadir complejidad por añadir complejidad. La idea es que cada sistema con IA tenga una forma clara de responder a tres preguntas:

- ¿qué debe hacer?;
- ¿cómo sabemos que lo está haciendo bien?;
- ¿qué ocurre cuando se equivoca?


## 31.1 El problema

Los equipos suelen evaluar sistemas IA leyendo diez respuestas a mano. Eso sirve para una demo, pero no sirve para decidir cambios de modelo, prompts, retrieval, tools o memoria. Sin evaluación, cada mejora es una apuesta.


## 31.2 Principios prácticos

- Define una suite pequeña de casos reales antes de optimizar.
- Separa evaluación de retrieval, respuesta, tools, seguridad y experiencia.
- Mide regresiones cada vez que cambie modelo, prompt, índice o esquema.
- Combina evaluación automática con revisión humana en casos de alto riesgo.
- No uses una única métrica para decidir calidad.


## 31.3 Arquitectura mínima

Un diseño razonable puede empezar con este flujo:

```text
1. dataset de casos versionado
2. runner de evaluación
3. modelo o sistema candidato
4. evaluadores automáticos
5. muestreo humano
6. informe de regresión
```

No todos los proyectos necesitan todas las piezas desde el primer día. Pero si una pieza falta, debe faltar por decisión, no por despiste.


## 31.4 Implementación práctica

Empieza con cincuenta casos. Diez normales, diez difíciles, diez ambiguos, diez fuera de alcance y diez adversariales. Cada caso debe tener entrada, usuario, permisos, salida esperada, fuentes esperadas y criterios de fallo.

Una forma útil de trabajar es escribir primero la ficha técnica del sistema. Esa ficha debe ser corta, revisable y concreta:

```text
Objetivo:
Usuario:
Datos usados:
Acciones permitidas:
Riesgos principales:
Métricas:
Criterio para publicar:
Criterio para apagar o revertir:
```

Cuando no puedes completar esta ficha, el proyecto todavía está demasiado borroso.

### Dataset mínimo de evaluación

Un caso de evaluación debería ser lo bastante explícito como para que otro miembro del equipo pueda entender por qué pasa o falla.

Ejemplo:

```json
{
  "id": "support_rag_014",
  "feature": "support_copilot",
  "input": "¿Puedo devolver un producto abierto?",
  "user": {
    "role": "support_agent",
    "permissions": ["docs:support:read"]
  },
  "expected": {
    "must_include": [
      "depende del tipo de producto",
      "plazo de devolución",
      "condiciones de embalaje"
    ],
    "expected_sources": ["politica-devoluciones-2026"],
    "must_not_include": ["inventar excepciones no documentadas"],
    "should_abstain": false
  },
  "risk": "medium"
}
```

Este formato permite comparar modelos, prompts y configuraciones de retrieval sin discutir cada vez desde cero.

### Runner simple de evaluación

El runner no tiene que ser sofisticado al principio.

Tiene que ser repetible.

```python
def run_eval_case(case, system):
    result = system.answer(
        question=case["input"],
        user=case["user"]
    )

    checks = {
        "has_required_points": contains_all(
            result["answer"],
            case["expected"]["must_include"]
        ),
        "uses_expected_sources": has_sources(
            result["citations"],
            case["expected"]["expected_sources"]
        ),
        "avoids_forbidden_content": contains_none(
            result["answer"],
            case["expected"]["must_not_include"]
        ),
        "abstention_ok": result.get("abstained", False) == case["expected"]["should_abstain"]
    }

    return {
        "case_id": case["id"],
        "passed": all(checks.values()),
        "checks": checks,
        "latency_ms": result["latency_ms"],
        "cost": result["cost"]
    }
```

El código exacto cambiará según tu stack.

La idea no cambia: entrada controlada, ejecución repetible, checks separados e informe comparable.

### Umbrales para publicar

Una suite de evaluación solo sirve si bloquea decisiones.

Ejemplo de umbrales razonables para un copiloto interno:

- 90% de casos normales pasan;
- 80% de casos difíciles pasan;
- 100% de casos de permisos pasan;
- 100% de casos de datos sensibles pasan;
- coste por caso dentro del presupuesto;
- latencia p95 por debajo del objetivo;
- ninguna regresión crítica respecto a la versión anterior.

Si el sistema mejora en estilo pero empeora en permisos, no se publica.

Si mejora en calidad pero duplica coste sin justificarlo, no se publica.

Si mejora en benchmarks generales pero empeora en tus casos reales, no se publica.

### Error analysis y failure modes reales

Una señal repetida en equipos que llevan IA a producción es que las métricas genéricas se quedan cortas.

Medir "alucinación", "toxicidad" o "calidad general" puede servir como primera barrera, pero no te dice por qué tu producto falla en tu dominio.

Un sistema de soporte no falla solo porque "alucine".

Puede fallar porque:

- cita una política antigua;
- responde bien pero al cliente equivocado;
- no detecta que faltan datos;
- usa una fuente sin permisos;
- convierte una excepción legal en regla general;
- genera una respuesta útil pero demasiado larga para el canal;
- propone una acción que soporte no puede ejecutar.

El trabajo de evaluación de mayor retorno suele ser el análisis de errores.

Proceso práctico:

1. Mira interacciones reales.
2. Etiqueta fallos observados.
3. Agrupa fallos en modos recurrentes.
4. Mide cuántas veces aparece cada modo.
5. Decide si el fallo se arregla con prompt, retrieval, tool, datos, UX o política.
6. Crea un evaluador para ese modo de fallo.
7. Mide si el evaluador se alinea con revisión humana.

Ejemplo de taxonomía:

```json
{
  "failure_mode": "wrong_policy_version",
  "description": "La respuesta usa una política obsoleta aunque existe una versión nueva.",
  "detection": "fuente citada con fecha anterior a la fuente esperada",
  "severity": "high",
  "fix_owner": "retrieval",
  "evaluator": "expected_source_version_check"
}
```

El objetivo no es tener nombres elegantes.

El objetivo es que cada fallo frecuente tenga dueño y prueba.

### Señales de usuario como evaluación

No todos los fallos llegan como bug report.

En productos IA, muchos fallos son silenciosos: el usuario lee, no confía, cierra la ventana y no vuelve.

Por eso la evaluación debe mirar también comportamiento:

- intentos de regenerar respuesta;
- edición manual intensa;
- copiar o no copiar;
- compartir;
- tiempo hasta abandonar;
- preguntas repetidas con reformulación;
- cambio de canal a humano;
- feedback negativo;
- cancelación de una acción sugerida.

Estas señales no sustituyen a una suite de evaluación.

La complementan.

Si muchos usuarios regeneran respuestas de una misma intención, no tienes "un problema general de modelo".

Tienes un workflow concreto que revisar.

Clusterizar interacciones por intención ayuda a pasar de:

> "El asistente no convence."

a:

> "El flujo de resumen de tickets de facturación falla cuando hay tres o más productos en el pedido."

Eso sí se puede arreglar.

## 31.5 Métricas

Las métricas no son decoración. Son el sistema nervioso del producto.

- **exactitud por tarea**
- **cobertura de respuesta**
- **validez de citas**
- **tasa de abstención correcta**
- **tool call accuracy**
- **unsafe action rate**
- **coste por caso**
- **failure mode coverage**
- **human judge agreement**
- **regeneration rate por intención**

No hace falta medir cien cosas desde el principio. Sí hace falta medir las pocas que te dirán si el sistema mejora, empeora o se vuelve demasiado caro.


## 31.6 Checklist

- Existe dataset versionado.
- Cada caso tiene criterio de aceptación.
- Las pruebas cubren permisos y datos sensibles.
- Se mide coste y latencia durante la evaluación.
- Hay umbrales mínimos para publicar.
- Las regresiones bloquean despliegue.
- Los cambios de modelo se comparan contra baseline.


## 31.7 Antipatrones

### evaluar solo con ejemplos felices

Es el error más común. El sistema parece bueno porque solo se le pregunta lo que el equipo espera que funcione.

Una buena evaluación incluye preguntas confusas, usuarios sin permisos, fuentes contradictorias, documentos incompletos, lenguaje coloquial y peticiones fuera de alcance. Ahí aparece la verdad del producto.

### cambiar prompt sin suite de regresión

Cambiar un prompt puede arreglar un caso y romper veinte.

Cada prompt publicado debería tener versión y pasar la misma suite que el anterior. Si no puedes comparar, no sabes si has mejorado o solo has movido el fallo de sitio.

### usar al propio modelo como único juez

Los jueces LLM son útiles para escalar revisión, pero no deben ser la única fuente de verdad.

Úsalos para detectar posibles problemas, clasificar errores o comparar variantes. Reserva decisiones críticas para criterios deterministas, fuentes verificables o revisión humana.

### medir solo satisfacción subjetiva

La satisfacción del usuario importa, pero puede engañar.

Una respuesta segura, rápida y bien escrita puede gustar aunque sea incorrecta. Por eso necesitas medir también fuentes, cobertura, permisos, abstención y coste.

### olvidar casos de permisos

Los fallos de permisos no son fallos de calidad.

Son fallos de confianza. Un solo caso donde el sistema usa una fuente que el usuario no podía ver puede invalidar el producto ante un cliente serio.


## 31.8 Proyecto guiado

Crea un archivo `evals/support-rag.jsonl` con cincuenta preguntas reales de soporte. Ejecuta la misma suite con dos modelos, dos prompts y dos configuraciones de retrieval. Publica una tabla con calidad, coste y latencia.


## 31.9 Qué puede cambiar en el futuro

La evaluación se moverá hacia suites continuas, trazas reales anonimizadas, jueces especializados y benchmarks internos por dominio. Pero la base seguirá siendo la misma: casos claros, criterios claros y comparación contra baseline.


## 31.10 Ideas clave del capítulo

- La evaluación es la diferencia entre creer que un sistema funciona y saber dónde falla.
- El sistema debe tener límites visibles.
- La calidad debe medirse antes y después de cada cambio.
- La operación importa tanto como la primera demo.
- Los errores deben ser trazables.
- La versión siguiente debe ser una mejora deliberada, no una reacción al ruido.

## Recursos relacionados

- Capítulo 30 — Laboratorio de implementación.
- Apéndice B — Proyectos guiados.
- Apéndice C — Checklists de producción.
- Apéndice D — Glosario operativo.
