// El Comparador — núcleo de datos editorial.
// Reglas: valores cualitativos y verificables, sin números de benchmark inventados.
// Cuando hace falta medir, lo decimos; no fabricamos cifras.

export const comparativas = [
  {
    slug: "mac-mini-vs-portatil-rtx",
    categoria: "Hardware",
    eyebrow: "Hardware · Laboratorio local",
    title: "Mac mini vs portátil RTX",
    deck: "Sobremesa silencioso con memoria unificada frente a portátil con GPU dedicada. La pregunta no es cuál es mejor, sino qué tarea vas a repetir.",
    ejes: [
      { key: "memoria", label: "Memoria para modelos" },
      { key: "runtime", label: "Runtime nativo" },
      { key: "movilidad", label: "Movilidad" },
      { key: "serving", label: "Serving / concurrencia" },
      { key: "ruido", label: "Ruido y consumo" },
      { key: "ecosistema", label: "Ecosistema" }
    ],
    opciones: [
      {
        nombre: "Mac mini (Apple Silicon)",
        etiqueta: "Sobremesa unificado",
        valores: {
          memoria: "Memoria unificada CPU/GPU; configurable alto en M4 Pro. Buena para modelos cuantizados grandes en un solo equipo.",
          runtime: "MLX, llama.cpp y Ollama nativos. Sin CUDA.",
          movilidad: "Nula: equipo de mesa, pero compacto y transportable.",
          serving: "Suficiente para 1 usuario o pruebas; no es plataforma multiusuario.",
          ruido: "Silencioso y de bajo consumo. Ideal como laboratorio permanente.",
          ecosistema: "macOS, MLX en crecimiento; menos herramientas de serving que CUDA."
        },
        ideal: "Laboratorio local silencioso para RAG privado, pruebas de modelos y agentes personales.",
        evitar: "Si necesitas CUDA, serving multiusuario o entrenar más allá de fine-tuning ligero."
      },
      {
        nombre: "Portátil RTX",
        etiqueta: "GPU dedicada móvil",
        valores: {
          memoria: "VRAM dedicada limitada (típico 8-16 GB en portátil); el modelo debe caber en VRAM para ir rápido.",
          runtime: "CUDA, llama.cpp, vLLM, Ollama. Máxima compatibilidad de stack.",
          movilidad: "Total: te lo llevas, pero batería corta bajo carga de inferencia.",
          serving: "Mejor throughput por GPU, pero VRAM limita modelo y contexto.",
          ruido: "Ventiladores ruidosos y caliente bajo carga sostenida.",
          ecosistema: "CUDA maduro: vLLM, SGLang, TensorRT, casi todo funciona."
        },
        ideal: "Compatibilidad CUDA y movilidad, con modelos que caben en VRAM.",
        evitar: "Si quieres cargar modelos grandes en memoria barata o trabajar en silencio horas seguidas."
      }
    ],
    veredicto: "Mac mini si tu trabajo es explorar modelos grandes cuantizados en silencio y memoria abundante. Portátil RTX si necesitas CUDA, movilidad y los modelos caben en VRAM. Decide por la tarea que repites cada día, no por la ficha.",
    comoDecidir: [
      "¿El modelo cabe en la VRAM del portátil? Si no, la memoria unificada del Mac gana.",
      "¿Necesitas CUDA, vLLM o TensorRT? Entonces RTX, no discusión.",
      "¿Trabajas horas seguidas en una mesa? El ruido y consumo del Mac importan más de lo que crees.",
      "Mide TTFT y tokens/s con TU modelo y TU contexto antes de comprar."
    ],
    fuentes: [
      ["Apple Mac mini", "https://www.apple.com/mac-mini/"],
      ["NVIDIA GeForce RTX laptops", "https://www.nvidia.com/en-us/geforce/laptops/"]
    ]
  },
  {
    slug: "mac-studio-vs-rtx-4090",
    categoria: "Hardware",
    eyebrow: "Hardware · Estación de trabajo",
    title: "Mac Studio vs RTX 4090",
    deck: "Memoria unificada masiva frente a la GPU de consumo más potente para inferencia. Dos filosofías para cargar modelos grandes en local.",
    ejes: [
      { key: "memoria", label: "Memoria para modelos" },
      { key: "velocidad", label: "Velocidad bruta" },
      { key: "runtime", label: "Runtime / compatibilidad" },
      { key: "modelos", label: "Tamaño de modelo" },
      { key: "coste", label: "Coste y consumo" },
      { key: "produccion", label: "Producción / serving" }
    ],
    opciones: [
      {
        nombre: "Mac Studio (M-series Ultra)",
        etiqueta: "Memoria unificada masiva",
        valores: {
          memoria: "Memoria unificada muy alta (hasta cientos de GB en config Ultra). Cabe lo que en una sola GPU no entra.",
          velocidad: "Buen rendimiento por vatio, pero menos throughput pico que una GPU dedicada en modelos que caben en VRAM.",
          runtime: "MLX y llama.cpp nativos. Sin CUDA: algunas herramientas no existen o van por detrás.",
          modelos: "Puede cargar modelos muy grandes cuantizados gracias a la memoria.",
          coste: "Caro de compra, muy eficiente en consumo y silencioso.",
          produccion: "Laboratorio compacto; no es un servidor CUDA multiusuario."
        },
        ideal: "Cargar modelos grandes cuantizados en local con silencio y bajo consumo.",
        evitar: "Si dependes de CUDA, vLLM/SGLang o necesitas el máximo throughput por GPU."
      },
      {
        nombre: "RTX 4090 (24 GB)",
        etiqueta: "GPU de consumo tope",
        valores: {
          memoria: "24 GB GDDR6X. El modelo debe caber en VRAM para máxima velocidad.",
          velocidad: "Throughput pico muy alto en lo que cabe en sus 24 GB.",
          runtime: "CUDA completo: vLLM, SGLang, TensorRT-LLM, llama.cpp, todo.",
          modelos: "Modelos medianos cuantizados; los grandes requieren offload a RAM (lento) o varias GPUs.",
          coste: "Coste de GPU + equipo; consumo alto y calor; requiere buena refrigeración.",
          produccion: "Base sólida para serving; escala añadiendo GPUs."
        },
        ideal: "Máximo throughput y compatibilidad CUDA con modelos que entran en 24 GB.",
        evitar: "Si el modelo no cabe en 24 GB y no quieres multi-GPU ni offload."
      }
    ],
    veredicto: "Mac Studio gana en capacidad de memoria y silencio para modelos grandes cuantizados de un solo equipo. RTX 4090 gana en velocidad bruta y ecosistema CUDA mientras el modelo quepa en 24 GB. El factor decisivo es el tamaño del modelo frente a la memoria disponible.",
    comoDecidir: [
      "Calcula la huella de memoria de tu modelo + KV cache con tu contexto. ¿Cabe en 24 GB?",
      "Si necesitas vLLM/SGLang/TensorRT, es RTX. MLX no los reemplaza.",
      "Para un único equipo silencioso con modelos enormes cuantizados, Mac Studio.",
      "Para serving que escala, piensa en multi-GPU desde el principio."
    ],
    fuentes: [
      ["Apple Mac Studio", "https://www.apple.com/mac-studio/"],
      ["NVIDIA GeForce RTX 4090", "https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/"]
    ]
  },
  {
    slug: "ollama-vs-lmstudio-vs-llamacpp-vs-mlx",
    categoria: "Runtimes",
    eyebrow: "Software · Inferencia local",
    title: "Ollama vs LM Studio vs llama.cpp vs MLX",
    deck: "Cuatro formas de correr modelos en tu máquina, de la más cómoda a la de más control. No compiten: resuelven momentos distintos.",
    ejes: [
      { key: "curva", label: "Curva de entrada" },
      { key: "interfaz", label: "Interfaz" },
      { key: "control", label: "Control y tuning" },
      { key: "formatos", label: "Formatos / plataforma" },
      { key: "api", label: "API / integración" },
      { key: "uso", label: "Mejor momento" }
    ],
    opciones: [
      {
        nombre: "Ollama",
        etiqueta: "Cómodo por defecto",
        valores: {
          curva: "La más fácil: instalar y `ollama run`.",
          interfaz: "CLI + API local; usa llama.cpp por debajo.",
          control: "Menos perillas; opinado por simplicidad.",
          formatos: "GGUF, multiplataforma (Mac, Linux, Windows).",
          api: "API tipo OpenAI local muy práctica para integrar.",
          uso: "Empezar rápido y servir modelos a tus apps en local."
        },
        ideal: "Arrancar sin fricción e integrar modelos locales en tus apps.",
        evitar: "Si necesitas control fino de parámetros o el máximo rendimiento por hardware."
      },
      {
        nombre: "LM Studio",
        etiqueta: "GUI para explorar",
        valores: {
          curva: "Fácil, visual: descargar y chatear desde una app de escritorio.",
          interfaz: "GUI completa + servidor local opcional.",
          control: "Parámetros accesibles desde interfaz; menos que llama.cpp puro.",
          formatos: "GGUF y MLX en Apple Silicon; multiplataforma.",
          api: "Servidor local compatible OpenAI.",
          uso: "Explorar, comparar modelos y prototipar sin tocar terminal."
        },
        ideal: "Probar y comparar modelos cómodamente con interfaz gráfica.",
        evitar: "Si quieres automatizar todo por script o exprimir el hardware al máximo."
      },
      {
        nombre: "llama.cpp",
        etiqueta: "Control total",
        valores: {
          curva: "Más técnica: compilar y manejar flags.",
          interfaz: "CLI y servidor; nivel bajo.",
          control: "Máximo: cuantización, offload, hilos, KV cache, todo.",
          formatos: "GGUF; soporta CPU y múltiples GPUs/backends.",
          api: "Servidor propio; base de muchas otras herramientas.",
          uso: "Exprimir hardware, cuantizar y entender qué pasa por dentro."
        },
        ideal: "Control fino, cuantización propia y rendimiento ajustado al hardware.",
        evitar: "Si quieres empezar en cinco minutos sin tocar compilación ni flags."
      },
      {
        nombre: "MLX",
        etiqueta: "Nativo Apple Silicon",
        valores: {
          curva: "Media: framework de Apple, requiere algo de Python.",
          interfaz: "Librería (Python/Swift); no es una app de chat.",
          control: "Alto en Apple Silicon; aprovecha memoria unificada.",
          formatos: "Modelos MLX; solo Apple Silicon.",
          api: "Se integra en código; ecosistema mlx-lm en crecimiento.",
          uso: "Sacar el máximo a un Mac y construir sobre el framework de Apple."
        },
        ideal: "Rendimiento nativo en Apple Silicon y construir tu propio stack.",
        evitar: "Si no estás en Mac o quieres una app lista para usar sin código."
      }
    ],
    veredicto: "Ollama para integrar rápido, LM Studio para explorar con GUI, llama.cpp para control total y MLX para exprimir un Mac. La mayoría de builders usa dos: una cómoda para el día a día y una de bajo nivel cuando hay que medir o ajustar.",
    comoDecidir: [
      "¿Solo quieres que funcione y llamarlo desde tu app? Ollama.",
      "¿Quieres clicar y comparar modelos? LM Studio.",
      "¿Necesitas cuantizar tú o exprimir el hardware? llama.cpp.",
      "¿Estás en Apple Silicon y construyes sobre el framework? MLX."
    ],
    fuentes: [
      ["Ollama", "https://ollama.com/"],
      ["LM Studio", "https://lmstudio.ai/"],
      ["llama.cpp", "https://github.com/ggml-org/llama.cpp"],
      ["MLX", "https://github.com/ml-explore/mlx"]
    ]
  },
  {
    slug: "codex-vs-claude-code-vs-cursor-vs-lovable",
    categoria: "Herramientas IA",
    eyebrow: "Software · Construir con IA",
    title: "Codex vs Claude Code vs Cursor vs Lovable",
    deck: "Cuatro maneras de programar con IA: agente en terminal, agente en terminal, IDE asistido y generador de apps. Cambian dónde vive el control.",
    ejes: [
      { key: "forma", label: "Forma de trabajo" },
      { key: "control", label: "Control del código" },
      { key: "contexto", label: "Contexto del repo" },
      { key: "publico", label: "Para quién" },
      { key: "salida", label: "Qué produces" },
      { key: "limite", label: "Límite a vigilar" }
    ],
    opciones: [
      {
        nombre: "Codex",
        etiqueta: "Agente CLI (OpenAI)",
        valores: {
          forma: "Agente en terminal/entornos que edita y ejecuta.",
          control: "Alto: trabajas sobre tu repo real con git.",
          contexto: "Lee el repo y ejecuta comandos.",
          publico: "Programadores que viven en la terminal.",
          salida: "Cambios en código real, commits, PRs.",
          limite: "Necesitas saber revisar diffs y guiarlo."
        },
        ideal: "Programadores que quieren un agente sobre su repo y su flujo git.",
        evitar: "Si no sabes leer un diff o quieres una app sin tocar código."
      },
      {
        nombre: "Claude Code",
        etiqueta: "Agente CLI (Anthropic)",
        valores: {
          forma: "Agente en terminal que planifica, edita y ejecuta.",
          control: "Alto: opera sobre tu repo con permisos y herramientas.",
          contexto: "Explora el repo, usa herramientas y memoria.",
          publico: "Programadores y equipos técnicos.",
          salida: "Cambios en código, refactors, PRs, automatización.",
          limite: "Como todo agente, requiere supervisión y buen prompt."
        },
        ideal: "Tareas multi-paso sobre repos reales con supervisión humana.",
        evitar: "Si buscas una GUI de arrastrar y soltar sin terminal."
      },
      {
        nombre: "Cursor",
        etiqueta: "IDE asistido",
        valores: {
          forma: "Editor (fork de VS Code) con IA integrada.",
          control: "Alto: editas tú con autocompletado y chat sobre el código.",
          contexto: "Indexa el proyecto; contexto en el editor.",
          publico: "Programadores que quieren IA dentro del editor.",
          salida: "Código que escribes y aceptas en el IDE.",
          limite: "Sigue siendo un IDE: tú conduces línea a línea."
        },
        ideal: "Quien quiere IA potente sin salir de un editor familiar.",
        evitar: "Si esperas que construya la app entera sola desde un prompt."
      },
      {
        nombre: "Lovable",
        etiqueta: "Generador de apps",
        valores: {
          forma: "Plataforma web: describes y genera una app full-stack.",
          control: "Menor sobre cada línea; mayor velocidad a producto.",
          contexto: "Trabaja sobre el proyecto que genera, no tu repo arbitrario.",
          publico: "Builders y no-devs que quieren producto rápido.",
          salida: "App web funcional y desplegable.",
          limite: "Personalización profunda y casos complejos topan antes."
        },
        ideal: "Pasar de idea a app web funcional muy rápido.",
        evitar: "Si necesitas control fino del código o arquitectura a medida."
      }
    ],
    veredicto: "Codex y Claude Code son agentes de terminal sobre tu repo real (máximo control, supervisión obligatoria). Cursor mantiene el control en el editor. Lovable cambia control por velocidad a producto. Elige por cuánto control de código necesitas y dónde quieres pasar el día.",
    comoDecidir: [
      "¿Vives en la terminal y trabajas con git? Codex o Claude Code.",
      "¿Quieres IA dentro del editor sin cambiar de flujo? Cursor.",
      "¿Quieres una app web ya, aunque sacrifiques control? Lovable.",
      "Sea cual sea: revisa siempre el output. Velocidad sin revisión es deuda."
    ],
    fuentes: [
      ["OpenAI Codex", "https://openai.com/codex/"],
      ["Claude Code", "https://www.anthropic.com/claude-code"],
      ["Cursor", "https://cursor.com/"],
      ["Lovable", "https://lovable.dev/"]
    ]
  },
  {
    slug: "openrouter-vs-openai-vs-anthropic",
    categoria: "Proveedores",
    eyebrow: "Software · API de modelos",
    title: "OpenRouter vs OpenAI vs Anthropic",
    deck: "Un agregador frente a dos proveedores de primera parte. La decisión va de flexibilidad contra integración profunda.",
    ejes: [
      { key: "catalogo", label: "Catálogo de modelos" },
      { key: "api", label: "API e integración" },
      { key: "ruteo", label: "Ruteo y fallback" },
      { key: "features", label: "Funciones avanzadas" },
      { key: "datos", label: "Datos y privacidad" },
      { key: "uso", label: "Mejor momento" }
    ],
    opciones: [
      {
        nombre: "OpenRouter",
        etiqueta: "Agregador",
        valores: {
          catalogo: "Muchos modelos de muchos proveedores tras una sola API.",
          api: "API unificada compatible OpenAI; cambias de modelo sin reescribir.",
          ruteo: "Ruteo, fallback y comparación de precios entre proveedores.",
          features: "Depende de lo que exponga cada modelo upstream.",
          datos: "Pasas por un intermediario; revisa políticas y proveedores permitidos.",
          uso: "Comparar modelos y evitar atarte a un solo proveedor."
        },
        ideal: "Flexibilidad para probar y cambiar de modelo sin reescribir código.",
        evitar: "Si necesitas la última función nativa el día de su lanzamiento o evitar intermediarios."
      },
      {
        nombre: "OpenAI",
        etiqueta: "Primera parte",
        valores: {
          catalogo: "Familia GPT y herramientas propias.",
          api: "SDK maduro y documentación amplia.",
          ruteo: "Dentro de su catálogo; sin agregación de terceros.",
          features: "Funciones nativas el día 1 (tools, structured outputs, etc.).",
          datos: "Relación directa; políticas y opciones empresariales propias.",
          uso: "Aprovechar features GPT nativas con integración directa."
        },
        ideal: "Quien construye sobre GPT y quiere lo último sin intermediarios.",
        evitar: "Si quieres comparar modelos de varios proveedores con una sola API."
      },
      {
        nombre: "Anthropic",
        etiqueta: "Primera parte",
        valores: {
          catalogo: "Familia Claude y herramientas propias.",
          api: "SDK maduro; prompt caching, tool use, contextos largos.",
          ruteo: "Dentro de su catálogo; sin agregación de terceros.",
          features: "Funciones nativas Claude el día 1.",
          datos: "Relación directa; políticas y opciones empresariales propias.",
          uso: "Aprovechar features Claude nativas con integración directa."
        },
        ideal: "Quien construye sobre Claude y quiere lo último sin intermediarios.",
        evitar: "Si quieres una sola API para comparar entre muchos proveedores."
      }
    ],
    veredicto: "OpenRouter si valoras flexibilidad, comparación y no atarte a nadie. OpenAI o Anthropic si construyes a fondo sobre su modelo y quieres funciones nativas el día del lanzamiento. Muchos equipos empiezan en OpenRouter para elegir y luego van directos al proveedor que ganó.",
    comoDecidir: [
      "¿Vas a comparar o cambiar de modelo a menudo? OpenRouter.",
      "¿Tu producto depende de funciones nativas recién salidas? Ve directo al proveedor.",
      "¿Te preocupa el intermediario por datos o latencia? Primera parte.",
      "Mide coste por respuesta válida, no por token suelto."
    ],
    fuentes: [
      ["OpenRouter", "https://openrouter.ai/"],
      ["OpenAI Platform", "https://platform.openai.com/"],
      ["Anthropic API", "https://www.anthropic.com/api"]
    ]
  }
];

export function getComparativa(slug) {
  return comparativas.find((item) => item.slug === slug);
}
