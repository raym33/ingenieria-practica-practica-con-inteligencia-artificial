# Radar Grok/X — productos e inferencia local

Fecha: 2026-06-04

## Señales recibidas

- RTX 4060 Laptop ejecutando Gemma 4 12B Q4_K_M en LM Studio con unos 8.35 tokens/s y unos 7.04 GiB de VRAM usados.
- Mac con Apple Silicon ejecutando Gemma 4 12B vía llama.cpp/Metal con reporte de 36 tok/s.
- Avances de llama.cpp en multi-GPU y tensor parallelism vinculados a colaboración con NVIDIA.
- Casos de X sobre clusters de Mac Studio y Mac mini monetizando inferencia local.
- Setup Apple con Ollama, MLX y Qwen 27B como daily driver.
- CVE-2026-7482 en Ollama como alerta crítica de seguridad para servidores expuestos.
- RTX Spark como señal de NVIDIA en PCs de IA local y agentes on-device.

## Lectura editorial

Estas señales no deben publicarse como ranking. Deben convertirse en piezas con verificación:

- modelo exacto;
- cuantización;
- runtime;
- versión;
- hardware;
- memoria;
- contexto;
- TTFT/prefill/decode;
- refrigeración;
- concurrencia;
- seguridad si hay servidor local.

## Acciones

1. Convertir RTX 4060 Laptop + Gemma 4 en ficha de laboratorio móvil.
2. Convertir Apple Silicon + Gemma 4 en comparativa MLX/Metal/llama.cpp.
3. Abrir seguimiento de llama.cpp tensor parallelism en RTX.
4. Tratar clusters Apple como tendencia de negocio pendiente de auditoría.
5. Publicar alerta editorial de Ollama: actualizar, no exponer, controlar endpoints.

