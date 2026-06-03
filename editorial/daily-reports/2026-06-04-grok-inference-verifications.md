# Radar Grok/X — verificaciones y caveats de inferencia

Fecha: 2026-06-04

Fuente: respuesta de Grok con posts de seguimiento, replies técnicos y caveats sobre los benchmarks recientes de inferencia local.

## Lectura editorial

La segunda pasada cambia el tono de la cobertura. Ya no basta con decir "modelo X corre a Y tokens/s". Hay que publicar cada prueba con sus límites:

- si carga o no carga en el runtime real;
- si multimodal funciona o solo texto;
- si el contexto anunciado es usable;
- si TTFT/prefill destruye la experiencia aunque decode sea rápido;
- si el sistema base tiene memoria libre para trabajar;
- si el backend elegido cambia el resultado;
- si la optimización es estable o experimental.

## Caveats publicables

1. **Gemma 4 en LM Studio puede fallar con `mmproj`**
   - El workaround reportado es mover los proyectores multimodales para cargar en modo texto.
   - Impacto: no publicar "funciona en LM Studio" sin aclarar soporte multimodal.

2. **256K de contexto no equivale a 256K práctico**
   - En GGUF/llama.cpp hay señales de límite práctico más cercano a 131K.
   - Impacto: publicar contexto real probado, no solo ventana anunciada.

3. **21 t/s en RTX 4060 no cuenta la historia completa**
   - TTFT puede ser muy alto con prompts de sistema y contexto real.
   - Impacto: medir TTFT, prefill y decode por separado.

4. **Qwen puede ganar a Gemma 4 en tareas estructuradas**
   - Reportes comparan velocidad, JSON válido y F1 en hardware real.
   - Impacto: evaluar por tarea, no por novedad del modelo.

5. **10 GB RSS en Mac deja poco margen en 16 GB**
   - Docker, navegador, IDE y servicios locales reducen mucho el margen.
   - Impacto: recomendar 24 GB como mínimo cómodo para laboratorio real.

6. **MLX long-context sigue dependiendo de memoria grande**
   - Aunque la KV cache sea eficiente, 256K en modelos grandes sigue siendo terreno de máquinas con mucha RAM.
   - Impacto: separar "posible en M3 Ultra 512 GB" de "usable en Mac base".

7. **AMD RX 7800 XT ROCm tiene baseline prometedor, pero falta Vulkan head-to-head**
   - Buenas cifras de prefill y decode, aún con validación pendiente.
   - Impacto: tratarlo como baseline, no como conclusión definitiva.

8. **Strix Halo promete mucho, pero el software manda**
   - llama.cpp no usa NPU y el particionado de memoria limita GPU.
   - Impacto: comprar por stack real, no por TOPS.

9. **MTP + KV q8 + tensor split funciona, pero no todas las variantes son estables**
   - Reportes buenos en dual 3090, con caveats sobre ngram spec.
   - Impacto: publicar receta exacta y estabilidad observada.

10. **MLX DeepSeek V4 Flash puede hacer loop de thinking**
    - Benchmarks impresionantes, pero el propio autor indica que no está prime time.
    - Impacto: separar laboratorio de producción.

## Regla editorial

Toda noticia de inferencia debe incluir como mínimo: modelo, formato, runtime, backend, hardware, contexto, TTFT/prefill/decode si están disponibles, memoria usada, limitación conocida y reproducibilidad.

