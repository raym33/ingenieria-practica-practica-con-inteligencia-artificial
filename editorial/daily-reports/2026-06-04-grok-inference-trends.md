# Radar Grok/X — 10 tendencias de inferencia local

Fecha: 2026-06-04

Fuente: respuesta de Grok con acceso a X, filtrada por señales prácticas de los últimos 14 días.

## Lectura editorial

La inferencia local está dejando de ser una pregunta única de "qué modelo corre en mi máquina". Los temas con más tracción combinan cuatro ejes:

- modelos multimodales pequeños que ya entran en hardware de consumidor;
- backends y runtimes que cambian mucho la experiencia real;
- memoria y KV cache como cuello de botella principal del contexto largo;
- serving con métricas de producto: TTFT, goodput, p95/p99 y concurrencia.

## Tendencias detectadas

1. **Gemma 4 12B encoder-free multimodal**
   - Decisión práctica: probar multimodal local en RTX consumer y Apple Silicon antes de ir directo a APIs cloud.
   - Merece: noticia, guía y comparativa.
   - Verificar: calidad real de visión/audio, estabilidad de GGUF/MLX, TTFT con contexto largo.

2. **AMD Strix Halo / Ryzen AI Max+ 395**
   - Decisión práctica: comprar solo si aceptas gaps de software, forks custom o inferencia GPU sin NPU.
   - Merece: radar y guía de workarounds.
   - Verificar: soporte mainline, particionado de memoria y números reproducibles.

3. **MLX + mlx-vlm en Apple Silicon**
   - Decisión práctica: en Mac, MLX puede ser primera opción para multimodal y contexto largo.
   - Merece: guía y comparativa frente a llama.cpp Metal y Ollama.
   - Verificar: estabilidad, calidad frente a GGUF y escalabilidad real.

4. **vLLM / SGLang en producción**
   - Decisión práctica: para multiusuario, pasar de servidores simples a KV cache paged, batching y schedulers.
   - Merece: guía de despliegue y benchmark.
   - Verificar: ganancias en hardware objetivo, compatibilidad con quants/MTP y coste de operación.

5. **MTP y speculative decoding local**
   - Decisión práctica: activar drafters cuando el modelo/runtime lo soporte para ganar velocidad sin cambiar de GPU.
   - Merece: guía de flags y comparativa.
   - Verificar: calidad, estabilidad en contexto largo y soporte Metal/HIP/Vulkan.

6. **Cuantización y compresión de KV cache**
   - Decisión práctica: extender contexto local sin comprar más memoria, si la pérdida de calidad es aceptable.
   - Merece: guía práctica y noticia sobre adopción.
   - Verificar: pérdida real en tareas diversas, estabilidad y efecto en TTFT.

7. **llama.cpp como servidor OpenAI-compatible**
   - Decisión práctica: usar llama-server cuando necesitas control fino y últimas optimizaciones.
   - Merece: guía y comparativa contra Ollama, LM Studio y vLLM.
   - Verificar: estabilidad de versiones recientes y diferencias por backend.

8. **AMD RX 7000 discretas: ROCm vs Vulkan**
   - Decisión práctica: probar ambos backends antes de sacar conclusiones sobre AMD.
   - Merece: comparativa precio/rendimiento y guía de setup.
   - Verificar: drivers, rendimiento sostenido y soporte de features nuevas.

9. **Elección de plataforma: Apple vs AMD vs NVIDIA**
   - Decisión práctica: elegir por workload, no por marca: Mac para eficiencia/MLX, NVIDIA para madurez, AMD para valor si se acepta trabajo extra.
   - Merece: comparativa detallada.
   - Verificar: benchmarks apples-to-apples, eficiencia energética y apps completas.

10. **TurboQuant y optimizaciones avanzadas de KV cache**
    - Decisión práctica: vigilar compresión near-lossless para edge y consumer.
    - Merece: noticia y guía cuando madure fuera de QVAC.
    - Verificar: calidad, integración y efecto en velocidad.

## Conclusión de portada

El tema de portada no debería ser "un modelo nuevo", sino **la pila de inferencia local como sistema medible**: modelo, formato, runtime, backend, memoria, KV cache, contexto, concurrencia y métricas.

