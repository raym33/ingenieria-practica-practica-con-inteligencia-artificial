# Lab — Benchmark local de modelos

Este lab mide una interacción sencilla contra un servidor Ollama local.

No intenta ser un benchmark universal. Sirve para crear una ficha reproducible de tu hardware: modelo, runtime, latencia, tokens aproximados, caso de uso y limitaciones.

## Requisitos

- Ollama instalado.
- Un modelo descargado, por ejemplo:

```bash
ollama pull llama3.2
```

## Ejecutar

```bash
python3 labs/local-model-benchmark/benchmark_ollama.py --model llama3.2
```

Con prompt propio:

```bash
python3 labs/local-model-benchmark/benchmark_ollama.py \
  --model llama3.2 \
  --prompt "Resume este ticket de soporte en tres puntos."
```

## Qué registra

- modelo;
- endpoint;
- duración total;
- tokens aproximados de salida;
- tokens/s aproximados;
- metadatos de Ollama si están disponibles.

## Cómo usarlo

Ejecuta el mismo prompt con varios modelos y guarda resultados.

La comparación útil no es "qué modelo gana el benchmark", sino:

- cuál responde suficientemente bien;
- cuál cabe sin swapping;
- cuál mantiene latencia aceptable;
- cuál funciona con tu contexto real;
- cuál conserva calidad en español;
- cuál sirve para tu caso de uso.

