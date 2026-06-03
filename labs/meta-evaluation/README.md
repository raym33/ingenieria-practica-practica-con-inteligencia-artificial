# Laboratorio: meta-evaluación de jueces LLM

Este laboratorio acompaña al Capítulo 31. Su objetivo es mostrar la idea central sin depender de APIs externas:

1. partir de respuestas buenas;
2. introducir perturbaciones controladas;
3. ejecutar un juez;
4. medir si el juez detecta degradaciones conocidas.

El archivo `meta_eval_judge.py` usa un juez heurístico para que el ejemplo sea ejecutable en local. En un proyecto real, sustituye `heuristic_judge` por un juez LLM con structured outputs y una rúbrica específica de dominio.

## Ejecutar

```bash
python3 labs/meta-evaluation/meta_eval_judge.py
```

## Qué mirar

- `detection_rate`: porcentaje de perturbaciones detectadas.
- `mean_delta`: cuánto baja la puntuación media al degradar una respuesta.
- `missed`: perturbaciones que el juez no detectó.

Si el juez no detecta perturbaciones obvias, no está listo para evaluar producción.
