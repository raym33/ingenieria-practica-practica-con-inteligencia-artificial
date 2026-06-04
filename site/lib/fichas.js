// Fichas de producto — esquema editorial reutilizable.
// Cada ficha responde: qué es, para qué sirve de verdad, qué runtime/modelos admite,
// dónde está el límite y cuál es el veredicto. Sin cifras de benchmark inventadas.

export const fichas = [
  {
    slug: "apple-mac-mini",
    marca: "Apple",
    nombre: "Mac mini (Apple Silicon)",
    tipo: "Sobremesa compacto",
    memoria: "Memoria unificada CPU/GPU (configurable; alta en M4 Pro)",
    aceleracion: "GPU integrada + Neural Engine (Apple Silicon)",
    usoRecomendado: "Laboratorio local silencioso: RAG privado, pruebas de modelos cuantizados, agentes personales.",
    runtimes: ["MLX", "llama.cpp", "Ollama", "LM Studio"],
    modelos: "Modelos cuantizados que entren en la memoria unificada; muy cómodo para 7B-70B según configuración.",
    limitaciones: "Sin CUDA; no es servidor multiusuario; el throughput pico queda por debajo de una GPU dedicada en lo que cabe en VRAM.",
    veredicto: "Compra de referencia como laboratorio de IA local silencioso y de bajo consumo. Configura memoria generosa: es lo que decide qué modelos puedes cargar.",
    etiqueta: "Comprar con criterio",
    fuentes: [["Apple Mac mini", "https://www.apple.com/mac-mini/"]]
  },
  {
    slug: "apple-mac-studio",
    marca: "Apple",
    nombre: "Mac Studio (M-series Ultra)",
    tipo: "Estación de trabajo compacta",
    memoria: "Memoria unificada muy alta (cientos de GB en configuración Ultra)",
    aceleracion: "GPU integrada de muchos núcleos + Neural Engine",
    usoRecomendado: "Cargar modelos grandes cuantizados en local, en silencio y con bajo consumo.",
    runtimes: ["MLX", "llama.cpp", "Ollama", "LM Studio"],
    modelos: "Modelos grandes cuantizados que no caben en una sola GPU de consumo, gracias a la memoria unificada.",
    limitaciones: "Sin CUDA: vLLM/SGLang/TensorRT no aplican; no es plataforma de serving multiusuario pesado.",
    veredicto: "Laboratorio compacto premium para quien prioriza memoria, silencio y eficiencia sobre throughput CUDA. Caro, pero único en su categoría de memoria por vatio.",
    etiqueta: "Comprar con criterio",
    fuentes: [["Apple Mac Studio", "https://www.apple.com/mac-studio/"]]
  },
  {
    slug: "nvidia-dgx-spark",
    marca: "NVIDIA",
    nombre: "NVIDIA DGX Spark",
    tipo: "Sobremesa de IA",
    memoria: "Memoria unificada elevada orientada a modelos grandes en local",
    aceleracion: "GPU NVIDIA + stack CUDA",
    usoRecomendado: "Prototipar, hacer fine-tuning ligero y desplegar modelos grandes en local con ecosistema NVIDIA.",
    runtimes: ["CUDA", "vLLM", "llama.cpp", "Ollama", "NIM"],
    modelos: "Modelos grandes en local apoyados en memoria amplia y stack NVIDIA.",
    limitaciones: "Precio, disponibilidad y curva más técnica que un equipo de consumo; verifica el stack antes de comprometerte.",
    veredicto: "Señal seria para quien quiere desarrollo local con ecosistema NVIDIA de extremo a extremo. Antes de recomendarlo como compra, pide benchmark reproducible con tu workload.",
    etiqueta: "Vigilar",
    fuentes: [["NVIDIA DGX Spark", "https://www.nvidia.com/en-us/products/workstations/dgx-spark/"]]
  },
  {
    slug: "nvidia-rtx-4090",
    marca: "NVIDIA",
    nombre: "GeForce RTX 4090 (24 GB)",
    tipo: "GPU de consumo tope",
    memoria: "24 GB GDDR6X (VRAM dedicada)",
    aceleracion: "GPU Ada Lovelace + CUDA / Tensor Cores",
    usoRecomendado: "Máximo throughput de inferencia local y serving para modelos que caben en 24 GB.",
    runtimes: ["CUDA", "vLLM", "SGLang", "TensorRT-LLM", "llama.cpp", "Ollama"],
    modelos: "Modelos medianos cuantizados con alta velocidad; los grandes exigen offload (lento) o multi-GPU.",
    limitaciones: "24 GB limitan tamaño de modelo y contexto; consumo y calor altos; requiere buena refrigeración y fuente.",
    veredicto: "La referencia de consumo para inferencia CUDA rápida si tu modelo entra en 24 GB. Para modelos enormes, planifica multi-GPU o mira memoria unificada.",
    etiqueta: "Comprar con criterio",
    fuentes: [["NVIDIA GeForce RTX 4090", "https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/"]]
  },
  {
    slug: "copilot-plus-pc",
    marca: "Microsoft / OEMs",
    nombre: "Copilot+ PC (NPU 40+ TOPS)",
    tipo: "Portátil con NPU",
    memoria: "RAM del sistema; sin VRAM dedicada grande",
    aceleracion: "NPU de 40+ TOPS (Snapdragon X, Intel/AMD según gama)",
    usoRecomendado: "Funciones de IA del sistema, privacidad y batería: traducción, imagen, modelos pequeños locales.",
    runtimes: ["Windows AI / ONNX Runtime", "Foundry Local", "llama.cpp (CPU/GPU según equipo)"],
    modelos: "Modelos pequeños (SLMs) y tareas locales eficientes; no para servir LLMs grandes.",
    limitaciones: "La etiqueta AI PC no garantiza VRAM ni memoria para LLMs grandes; la NPU acelera tareas concretas, no sustituye GPU/VRAM.",
    veredicto: "Buena compra por batería, privacidad y funciones locales. No la vendas como workstation de LLMs: para inferencia seria manda la memoria y el runtime.",
    etiqueta: "Comprar con criterio",
    fuentes: [["Microsoft Copilot+ PCs", "https://learn.microsoft.com/en-us/windows/ai/npu-devices/"]]
  },
  {
    slug: "dell-pro-precision-rtx-pro",
    marca: "Dell",
    nombre: "Dell Pro Precision + NVIDIA RTX PRO",
    tipo: "Workstation",
    memoria: "VRAM RTX PRO (gama alta) + RAM de workstation",
    aceleracion: "GPU NVIDIA RTX PRO + CUDA",
    usoRecomendado: "Desarrollo de IA, inferencia local, agentes, RAG y despliegue edge-to-cloud con soporte y garantía.",
    runtimes: ["CUDA", "vLLM", "SGLang", "TensorRT-LLM", "llama.cpp"],
    modelos: "Modelos medianos y grandes según VRAM de la RTX PRO elegida (48/72/96 GB cambian mucho el techo).",
    limitaciones: "Coste alto; hay que configurar bien VRAM, drivers y workloads; valor real si vas a medir, servir o automatizar.",
    veredicto: "Tiene sentido para consultores y pymes técnicas que necesitan integración, soporte y camino de despliegue. La memoria de la RTX PRO es la decisión clave, no la marca.",
    etiqueta: "Comprar con criterio",
    fuentes: [["Dell Pro Precision con NVIDIA RTX PRO", "https://www.dell.com/en-us/lp/nvidia-dell-pro-precision"]]
  }
];

export function getFicha(slug) {
  return fichas.find((item) => item.slug === slug);
}
