# Radar Grok — Meta-evaluación de jueces LLM

Fecha de análisis: 2026-06-03

Origen: texto aportado por Grok sobre meta-evaluación de LLM-as-Judge. Este documento registra ideas editoriales para revisión y no sustituye verificación directa de herramientas, repos o documentación.

## Señales editoriales

1. Los jueces LLM pueden ponerse de acuerdo entre sí y aun así alejarse del criterio experto del dominio.
2. La meta-evaluación debe medir al evaluador con perturbaciones controladas, acuerdo humano, robustez y consistencia.
3. Las perturbaciones son una forma práctica de comprobar si el juez detecta degradaciones conocidas.
4. El acuerdo con expertos debe medirse con métricas como accuracy, F1 o Cohen's Kappa cuando haya etiquetas humanas suficientes.
5. Los jueces deben anclarse a reglas deterministas o humanos para evitar meta-evaluation collapse.
6. Herramientas mencionadas: EvalSense, MetaEvaluator, DeepEval, LangSmith, Arize Phoenix.

## Decisión editorial

Actualizar el Capítulo 31 con una sección más práctica de meta-evaluación e incluir un laboratorio local ejecutable en `labs/meta-evaluation/`.
