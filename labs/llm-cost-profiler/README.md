# Lab — Simulador de costes LLM

Este lab muestra por qué una aplicación IA puede encarecerse aunque el precio por token baje.

Simula tres escenarios:

- baseline sin control;
- optimización con poda de contexto;
- optimización con routing, caché y límite de retries.

## Ejecutar

```bash
python3 labs/llm-cost-profiler/cost_profiler.py
```

## Qué enseña

- `call_depth`: número de llamadas LLM por petición de usuario.
- `context_bloat`: tokens de entrada innecesarios.
- `retry_cost`: coste oculto de reintentos.
- `cache_hit_rate`: cuánto trabajo evitas.
- `routing`: cuándo usar modelo barato o caro.

## Idea clave

La factura no depende solo del precio por millón de tokens.

Depende de:

```text
usuarios x peticiones x llamadas x contexto x retries x modelo
```

Si no mides esas capas, no controlas el coste.

