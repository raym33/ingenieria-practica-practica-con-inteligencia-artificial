# Informe editorial — Modelos locales y hardware real

Fecha: 2026-06-03

Fuente: análisis aportado por Grok sobre señales de X de 2025-2026 relacionadas con Ollama, LM Studio, MLX, llama.cpp, Apple Silicon, GPUs, cuantización y hardware real.

## Lectura editorial

La señal principal no es que un hardware sea "el mejor".

La señal es que IA local ya no se dimensiona solo por tamaño del modelo. Se dimensiona por:

- memoria disponible;
- formato del modelo;
- cuantización;
- runtime;
- contexto real;
- prefill;
- decode;
- offload;
- ancho de banda de memoria;
- caso de uso.

Los posts más útiles reportan configuraciones concretas: modelo, cuantización, RAM/VRAM, runtime, tokens por segundo y limitaciones. El libro debe enseñar al lector a leer esas señales sin caer en benchmarks aislados.

## Decisión editorial

El libro debe reforzar una tesis:

> En IA local, "cabe" no significa "sirve".

Un modelo puede caber en memoria y aun así ser demasiado lento, perder calidad por cuantización, no soportar bien tools, saturar el equipo o no aguantar contexto largo.

## Cambios recomendados

1. Añadir una guía por rangos de RAM/VRAM.
2. Añadir sección sobre GGUF vs MLX como decisión práctica en Mac.
3. Explicar MoE/offload como patrón emergente, con sus impuestos de velocidad.
4. Añadir laboratorio local de benchmark con Ollama.
5. Recomendar fichas de hardware con modelo, cuantización, runtime, contexto y tokens/s.

## Riesgo editorial

Los datos de X envejecen rápido. Deben tratarse como señales de campo, no como tabla definitiva.

El contenido estable debe ser el método:

- medir;
- comparar;
- registrar configuración;
- probar en la tarea real;
- revisar limitaciones.

