# Radar Grok — Evaluación domain-specific

Fecha de análisis: 2026-06-03

Origen: texto aportado por Grok sobre frameworks de evaluación de dominio específico para LLMs e IA en producción. Este documento registra ideas editoriales para revisión y no sustituye verificación directa de herramientas, papers o benchmarks.

## Señales editoriales

1. Las métricas genéricas no detectan bien fallos reales de dominio.
   - Aplicación: Capítulo 31 — Evaluación de sistemas IA.

2. El enfoque más útil combina top-down risk assessment y bottom-up error analysis.
   - Aplicación: Capítulos 31, 32 y 40.

3. La evaluación debe crear métricas por failure mode, no una sola puntuación global.
   - Aplicación: Capítulo 31.

4. Los jueces LLM necesitan calibración frente a expertos humanos.
   - Aplicación: Capítulo 31.

5. Los benchmarks públicos sirven como baseline o filtro, no como veredicto de producción.
   - Aplicación: Capítulos 31 y 40.

6. Las evals deben integrarse en CI/CD, observabilidad, guardrails runtime y monitoreo de drift.
   - Aplicación: Capítulos 31, 32 y 36.

7. Las herramientas como LangSmith, Phoenix, Evidently, RAGAS, DeepEval o similares deben presentarse como capas de trabajo, no como sustituto del criterio de dominio.
   - Aplicación: Capítulos 20, 31 y 32.

## Decisión editorial

Actualizar el Capítulo 31 con:

- marco top-down + bottom-up;
- ejemplos por salud/legal/finanzas/soporte;
- rúbrica domain-specific;
- ejemplo de LLM-as-judge calibrado;
- meta-evaluación;
- uso prudente de benchmarks;
- playbook de implementación en producción.
