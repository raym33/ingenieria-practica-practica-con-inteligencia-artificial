# Radar X vía Grok — Producción IA

Fecha de análisis: 2026-06-03

Origen: resumen aportado por Grok con acceso a posts públicos de X. Este documento registra señales editoriales para revisión humana. No sustituye verificación directa de fuentes ni documentación oficial.

## Señales seleccionadas

1. Prompt injection vía supply chain en dependencia de testing.
   - URL: https://x.com/1clawAI/status/2060744604379430970
   - Capítulos afectados: 14, 33.

2. Costes descontrolados por bug inducido por LLM en logging de producción.
   - URL: https://x.com/dreamsofcode_io/status/2061579192311943233
   - Capítulos afectados: 14, 32, 34.

3. Evaluación ineficaz por métricas genéricas frente a failure modes reales.
   - URL: https://x.com/PawelHuryn/status/1931355594130084205
   - Capítulos afectados: 31, 40.

4. Gap enterprise al pasar de chat/prototipo a sistemas mission-critical.
   - URL: https://x.com/levie/status/2059839815273824423
   - Capítulos afectados: 32, 35, 36, 38.

5. Latencia causada por infraestructura distribuida, no solo por modelo.
   - URL: https://x.com/AiCamila_/status/2059961034186580126
   - Capítulos afectados: 32, 34, 36.

6. Fallos silenciosos con usuarios reales sin excepciones visibles.
   - URL: https://x.com/jxnlco/status/1958952452511645707
   - Capítulos afectados: 31, 32, 39.

7. Sobrecarga de componentes no determinísticos en flujos que podían ser determinísticos.
   - URL: https://x.com/kashishshah/status/2059684033517461569
   - Capítulos afectados: 24, 27, 37.

8. Deuda técnica por agentes de código sin especificaciones ni límites.
   - URL: https://x.com/manthanguptaa/status/2033791563781074958
   - Capítulos afectados: 13, 14, 40.

## Decisión editorial

Estas señales no deben copiarse como autoridad final. Entran como patrones observados que refuerzan recomendaciones ya presentes en el libro:

- aislar instrucciones externas;
- medir failure modes reales;
- instrumentar señales de usuario;
- presupuestar coste y latencia por etapa;
- diseñar workflows determinísticos con LLM solo donde aporte valor;
- exigir specs, límites y revisión en agentes de código.
