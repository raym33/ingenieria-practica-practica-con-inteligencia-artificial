# Prompt para Grok con acceso a X

Usa este prompt cuando quieras traer señales recientes de X al radar editorial del libro.

```text
Actúa como analista editorial para un libro práctico en español sobre ingeniería con IA.

Busca en X señales recientes, no hype genérico, sobre:
- modelos nuevos o cambios de modelos;
- agentes de código como Codex, Claude Code, Cursor o similares;
- RAG, MCP, function calling y herramientas;
- modelos locales, Ollama, LM Studio y hardware;
- prácticas de producción: evaluación, observabilidad, seguridad, costes;
- workflows reales en empresas.

Devuélveme solo 10 señales de alta calidad.

Para cada señal incluye:
1. título breve;
2. enlace directo;
3. autor/cuenta;
4. fecha;
5. qué se afirma;
6. evidencia observable;
7. si es hecho, opinión o experimento;
8. capítulos del libro que podría afectar;
9. cambio editorial recomendado;
10. confianza: baja, media o alta.

No incluyas anuncios sin enlace.
No incluyas posts virales sin evidencia.
No inventes URLs.
Separa claramente hechos de inferencias.
Prioriza señales que cambien decisiones de arquitectura, herramientas, costes, evaluación, seguridad o implementación.
```

## Cómo usar la respuesta

1. Pegar la respuesta en `editorial/daily-reports/`.
2. Convertir cada señal útil en una propuesta de cambio.
3. Verificar fuentes fuera de X cuando sea posible.
4. Actualizar capítulos solo si cambia una decisión práctica.
5. Crear release si el cambio afecta al libro publicado.
