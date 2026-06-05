export const articles = [
  {
    slug: "copilot-pc-no-es-workstation-llm",
    image: "/articulos/copilot-pc-no-es-workstation-llm.png",
    imageAlt: "Ilustración editorial: un portátil fino con NPU junto a una torre de GPU mucho mayor",
    publishedAt: "2026-04-20",
    tags: ["Compra","Hardware","Inferencia local"],
    section: "Guía de compra",
    title: "Copilot+ PC no es lo mismo que una workstation para LLMs",
    deck: "La NPU cambia la experiencia local de Windows, pero no convierte cualquier portátil en una máquina para servir modelos grandes.",
    verdict: "Compra un Copilot+ PC por batería, privacidad y funciones locales. Compra GPU/VRAM/memoria unificada si tu objetivo es inferencia LLM seria.",
    sources: [
      ["Microsoft Copilot+ PCs developer guide", "https://learn.microsoft.com/en-us/windows/ai/npu-devices/"],
      ["Microsoft Copilot+ PCs", "https://www.microsoft.com/en-us/windows/copilot-plus-pcs"]
    ],
    body: [
      {
        heading: "Qué aporta de verdad",
        text: "Un Copilot+ PC está definido por una NPU capaz de superar los 40 TOPS. Eso permite experiencias locales eficientes: traducción, efectos de imagen, funciones del sistema, modelos pequeños y tareas que conviene ejecutar sin quemar batería en CPU/GPU."
      },
      {
        heading: "Dónde empieza la confusión",
        figure: { src: "/articulos/diagramas/npu-vs-gpu-vram.png", alt: "Diagrama comparativo NPU de un AI PC frente a GPU con VRAM", caption: "NPU vs GPU+VRAM: cada una sirve para cosas distintas; la etiqueta AI PC no las equipara." },
        text: "La etiqueta AI PC no dice cuánta VRAM tienes, qué modelo cabe, qué contexto puedes usar ni si vLLM, llama.cpp o SGLang van a rendir bien. Para inferencia LLM, la memoria y el runtime siguen mandando."
      },
      {
        heading: "Para quién tiene sentido",
        text: "Tiene sentido para usuarios que quieren Windows moderno, funciones IA integradas y buena movilidad. No es mala compra; simplemente no debe venderse como sustituto automático de una workstation con RTX o de un Mac con mucha memoria unificada."
      },
      {
        heading: "Prueba mínima antes de recomendar",
        text: "Ejecuta un modelo 7B o 14B cuantizado, mide TTFT, prefill, decode, RAM usada, temperatura y batería. Si el caso real es RAG o coding, prueba con contexto largo y herramientas activadas."
      }
    ]
  },
  {
    slug: "apple-silicon-vs-nvidia-inferencia-local",
    image: "/articulos/apple-silicon-vs-nvidia-inferencia-local.png",
    imageAlt: "Ilustración editorial: dos monolitos enfrentados, memoria unificada frente a GPU con disipación",
    publishedAt: "2026-04-23",
    tags: ["Apple Silicon","NVIDIA RTX","Inferencia local","Hardware"],
    section: "Comparativa",
    title: "Apple Silicon vs NVIDIA para inferencia local",
    deck: "Mac gana como laboratorio silencioso de memoria. NVIDIA gana cuando necesitas ecosistema CUDA, serving y compatibilidad de producción.",
    verdict: "Mac para experimentar con modelos grandes cuantizados y trabajar cómodo. NVIDIA para serving, máxima compatibilidad y equipos que necesitan escalar.",
    sources: [
      ["Apple Mac Studio", "https://www.apple.com/shop/buy-mac/mac-studio/m3-ultra-chip-32-core-cpu-80-core-gpu-96gb-memory-8tb-storage"],
      ["NVIDIA RTX PRO Workstations", "https://www.nvidia.com/en-us/products/workstations/"],
      ["NVIDIA RTX PRO 6000 Blackwell", "https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000-family/"]
    ],
    body: [
      {
        heading: "La ventaja del Mac",
        text: "Apple Silicon ofrece memoria unificada, bajo ruido y una experiencia excelente para desarrollo local. MLX, llama.cpp y Ollama hacen que un Mac mini o Mac Studio pueda ser un laboratorio muy serio para RAG privado, pruebas de modelos y agentes personales."
      },
      {
        heading: "La ventaja de NVIDIA",
        text: "NVIDIA tiene CUDA, Tensor Cores, vLLM, SGLang, RTX PRO y un ecosistema más maduro para workloads de inferencia, batch, multiusuario y despliegue profesional. Si necesitas serving medible, la compatibilidad importa mucho."
      },
      {
        heading: "Dónde se decide",
        text: "No se decide por marca. Se decide por modelo, cuantización, contexto, concurrencia, consumo, ruido, coste total y equipo que lo va a mantener. Un Mac puede ser ideal para una pyme pequeña; una RTX PRO puede ser mejor para un laboratorio que sirve usuarios."
      },
      {
        heading: "Prueba mínima antes de comprar",
        text: "Mismo modelo, mismo prompt, mismo contexto, mismo objetivo. Mide TTFT, tokens/s, memoria, temperatura, estabilidad y calidad. Si no comparas así, solo estás comparando anécdotas."
      }
    ]
  },
  {
    slug: "ollama-seguridad-servidor-local",
    image: "/articulos/ollama-seguridad-servidor-local.png",
    imageAlt: "Ilustración editorial: un servidor local tras un cortafuegos con un puerto abierto en alerta",
    publishedAt: "2026-04-26",
    tags: ["Ollama","Seguridad","Inferencia local"],
    section: "Seguridad",
    title: "Ollama local también necesita seguridad de servidor",
    deck: "La inferencia local suele empezar como experimento, pero en cuanto toca documentos, red o agentes, se convierte en infraestructura sensible.",
    verdict: "Ollama debe quedarse en localhost salvo necesidad clara. Si se expone, exige autenticación, firewall, proxy, versión actualizada y mínimos privilegios.",
    sources: [
      ["NVD CVE-2026-7482", "https://nvd.nist.gov/vuln/detail/CVE-2026-7482"],
      ["SentinelOne CVE-2026-7482", "https://www.sentinelone.com/vulnerability-database/cve-2026-7482/"],
      ["IONIX CVE-2026-7482", "https://www.ionix.io/threat-center/cve-2026-7482/"]
    ],
    body: [
      {
        heading: "El error habitual",
        text: "Mucha gente instala Ollama, prueba Open WebUI y después abre puertos para acceder desde fuera. Ese salto convierte un laboratorio local en una superficie de ataque. Si además hay documentos internos o agentes con herramientas, el riesgo sube."
      },
      {
        heading: "Qué recuerda CVE-2026-7482",
        text: "La vulnerabilidad reportada en Ollama muestra que un fallo en el manejo de modelos puede exponer memoria del proceso. No hace falta dramatizar: hace falta actualizar y diseñar como si fuera infraestructura."
      },
      {
        heading: "Checklist mínimo",
        text: "Actualiza Ollama, no expongas endpoints de gestión, usa firewall, limita a VPN/Tailscale cuando sea posible, coloca reverse proxy con autenticación y registra accesos. Si hay datos de clientes, añade backups y política de logs."
      },
      {
        heading: "Regla editorial",
        text: "Toda guía de IA local debe incluir seguridad. Un setup que funciona pero queda abierto a Internet no es una recomendación; es una deuda."
      }
    ]
  },
  {
    slug: "rag-local-reddit-lecciones",
    image: "/articulos/rag-local-reddit-lecciones.png",
    imageAlt: "Ilustración editorial: documentos fluyendo por un embudo de recuperación hacia un modelo",
    publishedAt: "2026-04-29",
    tags: ["RAG","Ollama","Modelos locales","Inferencia local"],
    section: "Análisis",
    title: "Qué enseñan los setups reales de RAG local en Reddit",
    deck: "Las discusiones de self-hosting muestran una lección clara: RAG útil no empieza por el modelo, empieza por datos, retrieval y límites.",
    verdict: "Para corpus pequeños, empieza simple. Para empresas, mide permisos, chunking, búsqueda híbrida y evaluación antes de presumir de chat con documentos.",
    sources: [
      ["Local RAG sin cloud embeddings", "https://www.reddit.com/r/selfhosted/comments/1pkttll/made_my_rag_setup_actually_local_no_openai_no/"],
      ["RAG con Ollama y OpenWebUI", "https://www.reddit.com/r/ollama/comments/1kfknqf/local_llm_with_ollama_openwebui_and_database_with/"],
      ["Self-hosted AI setups", "https://www.reddit.com/r/selfhosted/comments/1lvn497/selfhosted_ai_setups_curious_how_people_here/"]
    ],
    body: [
      {
        heading: "Lo que se repite",
        text: "Los usuarios no preguntan solo qué modelo usar. Preguntan por embeddings, SQLite o Postgres, Open WebUI, chunking, búsqueda híbrida, PDFs, permisos y cómo evitar que el modelo ignore las herramientas."
      },
      {
        heading: "La arquitectura mínima",
        figure: { src: "/articulos/diagramas/pipeline-rag.png", alt: "Diagrama del pipeline de RAG: documentos, chunking, embeddings, base vectorial, retrieval, reranking, LLM y respuesta", caption: "El pipeline de RAG, paso a paso: el retrieval y el reranking pesan tanto como el modelo." },
        text: "Para empezar: documentos bien procesados, embeddings locales, almacenamiento simple, retrieval explícito y un modelo que responda con citas. Si el corpus es pequeño, una solución en memoria o SQLite puede ser suficiente."
      },
      {
        heading: "Dónde falla",
        text: "Falla cuando se confunde demo con sistema. Subir PDFs y chatear no garantiza respuestas correctas. Hay que medir si el chunk correcto aparece, si el modelo lo usa y si la respuesta final respeta permisos."
      },
      {
        heading: "Prueba mínima",
        text: "Crea 30 preguntas con respuesta conocida, documentos fuente y casos negativos. Mide retrieval, respuesta, latencia y coste. Solo después decide si necesitas reranking, graph RAG o modelos más grandes."
      }
    ]
  },
  {
    slug: "rtx-pro-blackwell-workstation-ia",
    image: "/articulos/rtx-pro-blackwell-workstation-ia.png",
    imageAlt: "Ilustración editorial: una GPU profesional con grandes pilas de VRAM iluminadas",
    publishedAt: "2026-05-02",
    tags: ["NVIDIA RTX","Hardware","Inferencia local","Compra"],
    section: "Producto",
    title: "RTX PRO Blackwell: cuándo una workstation IA tiene sentido",
    deck: "Las nuevas RTX PRO no son solo GPUs caras: son una señal de que la inferencia profesional se mueve hacia memoria, estabilidad y despliegue edge-to-cloud.",
    verdict: "Tiene sentido si vas a servir, medir, integrar o vender IA. Para aprender o hacer demos, empieza más pequeño.",
    sources: [
      ["NVIDIA RTX PRO Workstations", "https://www.nvidia.com/en-us/products/workstations/"],
      ["NVIDIA RTX PRO 5000 Blackwell", "https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-5000/"],
      ["NVIDIA RTX PRO 6000 Blackwell", "https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000-family/"],
      ["Dell Pro Precision con NVIDIA RTX PRO", "https://www.dell.com/en-us/lp/nvidia-dell-pro-precision"]
    ],
    body: [
      {
        heading: "La novedad importante es la memoria",
        text: "Para LLMs locales, la pregunta no es solo cuánta potencia tiene la GPU. La pregunta es qué modelo cabe, con qué contexto, cuántos usuarios simultáneos y cuánto margen queda para KV cache. Las gamas RTX PRO con mucha memoria cambian esa conversación."
      },
      {
        heading: "Workstation no significa servidor mágico",
        text: "Una workstation potente puede ejecutar inferencia, RAG, agentes y prototipos de producción, pero sigue necesitando runtime, colas, logs, seguridad y evaluación. Sin operación, solo tienes una demo muy cara."
      },
      {
        heading: "Para quién merece la pena",
        text: "Merece la pena para consultoras, laboratorios internos, equipos de producto y builders que necesitan probar con clientes, mantener datos cerca y tener soporte de hardware. No merece la pena si todavía no sabes qué modelo, tarea o usuario estás optimizando."
      },
      {
        heading: "Prueba mínima",
        text: "Antes de comprar, simula el workload: mismo modelo, contexto real, usuarios concurrentes, TTFT, p95, memoria, consumo y coste por respuesta útil. Si no puedes definir esa prueba, no compres aún."
      }
    ]
  },
  {
    slug: "benchmarks-llm-que-medir",
    image: "/articulos/benchmarks-llm-que-medir.png",
    imageAlt: "Ilustración editorial: un panel de instrumentos con gauges y curvas de rendimiento",
    publishedAt: "2026-05-05",
    tags: ["Benchmarks","Inferencia local","Modelos locales"],
    section: "Benchmark",
    title: "Benchmarks LLM: qué medir para no engañarte",
    deck: "Tokens por segundo es una métrica cómoda, pero puede ocultar TTFT malo, prefill lento, saturación de KV cache o mala calidad.",
    verdict: "Un benchmark publicable debe separar TTFT, prefill, decode, memoria, contexto, calidad y reproducibilidad.",
    sources: [
      ["NVIDIA RTX PRO Workstations", "https://www.nvidia.com/en-us/products/workstations/"],
      ["OpenRouter Models API", "https://openrouter.ai/docs/models"]
    ],
    body: [
      {
        heading: "La trampa de tokens/s",
        text: "Decode rápido queda bien en una captura, pero una app puede sentirse lenta si el primer token tarda demasiado. En RAG y agentes, muchas veces el cuello de botella está antes de generar: retrieval, prompt largo, prefill, tool calls y colas."
      },
      {
        heading: "La ficha mínima",
        figure: { src: "/articulos/diagramas/que-medir-llm.png", alt: "Diagrama de la línea de tiempo de una inferencia: prefill, TTFT, decode y respuesta", caption: "Qué medir: TTFT (primer token) y decode (tokens/s) cuentan historias distintas." },
        text: "Modelo exacto, cuantización, runtime, backend, versión, hardware, contexto, prompt, TTFT, prefill, decode, RAM/VRAM y calidad sobre tarea real. Sin eso, el benchmark no es comparable."
      },
      {
        heading: "Tres escenarios",
        text: "Prueba prompt corto, prompt largo y flujo real con documentos o tools. Muchos setups sobreviven al prompt corto y se rompen con contexto largo, concurrencia o memoria KV."
      },
      {
        heading: "Cómo publicarlo",
        text: "Publica números, pero también límites: temperatura, throttling, memoria libre, errores, estabilidad y si el resultado es laboratorio, daily driver o serving multiusuario."
      }
    ]
  },
  {
    slug: "de-idea-a-saas-ia-con-agentes",
    image: "/articulos/de-idea-a-saas-ia-con-agentes.png",
    imageAlt: "Ilustración editorial: una chispa-idea transformándose en un producto a través de engranajes",
    publishedAt: "2026-05-09",
    tags: ["SaaS","Agentes","Compra"],
    section: "SaaS",
    title: "De idea a SaaS con IA: cómo no construir otro wrapper",
    deck: "Un SaaS IA vendible no empieza por elegir modelo. Empieza por un problema repetido, datos útiles, workflow claro y medición.",
    verdict: "Si el producto no ahorra tiempo, reduce riesgo o aumenta ingresos en un flujo concreto, el modelo no lo salvará.",
    sources: [
      ["OpenAI Codex", "https://openai.com/index/introducing-codex/"],
      ["Claude Code", "https://www.anthropic.com/product/claude-code"],
      ["OpenRouter Models API", "https://openrouter.ai/docs/models"]
    ],
    body: [
      {
        heading: "El problema antes que el modelo",
        text: "La mayoría de ideas IA fallan porque son una interfaz bonita sobre un chat genérico. Un producto vendible necesita un usuario específico, un trabajo repetido y un resultado que pueda evaluarse."
      },
      {
        heading: "El MVP correcto",
        text: "Un buen MVP tiene input claro, transformación medible y output revisable. Por ejemplo: tickets que se clasifican, documentos que se resumen con citas, informes que se exportan o leads que se priorizan."
      },
      {
        heading: "Dónde entran los agentes de código",
        text: "Codex, Claude Code, Cursor o Lovable aceleran implementación, pero no sustituyen criterio de producto. Úsalos para crear prototipos, tests, dashboards y flujos, no para evitar hablar con usuarios."
      },
      {
        heading: "Monetización mínima",
        text: "Empieza con servicio más software: setup, adaptación, soporte y cuota mensual. Cuando el patrón se repita, conviértelo en SaaS puro."
      }
    ]
  },
  {
    slug: "codex-claude-code-openrouter-lovable",
    image: "/articulos/codex-claude-code-openrouter-lovable.png",
    imageAlt: "Ilustración editorial: cuatro módulos convergiendo sobre una estructura de código",
    publishedAt: "2026-05-12",
    tags: ["Agentes","SaaS","Modelos locales"],
    section: "Herramientas",
    title: "Codex, Claude Code, OpenRouter y Lovable: qué usar en cada fase",
    deck: "No todas las herramientas IA compiten entre sí. Algunas sirven para construir, otras para elegir modelos, otras para prototipar interfaces.",
    verdict: "El stack ganador combina agente de código, proveedor/model router, medición y una forma rápida de enseñar el MVP.",
    sources: [
      ["OpenAI Codex", "https://openai.com/index/introducing-codex/"],
      ["Codex for every role", "https://openai.com/index/codex-for-every-role-tool-workflow/"],
      ["Claude Code docs", "https://docs.anthropic.com/en/docs/claude-code/getting-started"],
      ["OpenRouter Models API", "https://openrouter.ai/docs/models"]
    ],
    body: [
      {
        heading: "Codex",
        text: "Codex encaja cuando tienes un repo, necesitas cambios verificables, pruebas, frontend, scripts o documentación. Es especialmente fuerte cuando el trabajo puede revisarse con archivos, comandos y resultados."
      },
      {
        heading: "Claude Code",
        text: "Claude Code encaja en flujos terminal-first: explorar codebases, ejecutar comandos, usar MCP, iterar cambios y mantener sesiones largas de trabajo técnico."
      },
      {
        heading: "OpenRouter",
        text: "OpenRouter ayuda a comparar modelos, costes y proveedores sin rehacer tu integración. Para un SaaS temprano, permite experimentar con calidad/precio antes de fijar proveedor."
      },
      {
        heading: "Lovable y prototipos visuales",
        text: "Lovable puede ser útil para enseñar una idea rápido, pero necesita especificación clara. Si el flujo no está pensado, solo acelera la creación de una demo confusa."
      }
    ]
  },
  {
    slug: "ollama-mlx-apple-silicon-cambio-real",
    image: "/articulos/ollama-mlx-apple-silicon-cambio-real.png",
    imageAlt: "Ilustración editorial: un chip Apple Silicon con memoria unificada alimentando un modelo local",
    publishedAt: "2026-05-15",
    tags: ["Ollama","MLX","Apple Silicon","Inferencia local"],
    section: "Análisis",
    title: "Ollama con MLX en Apple Silicon: por qué importa para builders",
    deck: "La IA local en Mac deja de ser solo comodidad: MLX, memoria unificada y servidores compatibles con OpenAI están convirtiendo Apple Silicon en un laboratorio serio.",
    verdict: "Mac es cada vez mejor para laboratorio privado y demos técnicas. Para producción multiusuario, exige medición de concurrencia, p95 y memoria.",
    sources: [
      ["Ollama MLX preview", "https://ollama.com/blog/mlx"],
      ["Docker Model Runner vLLM en macOS", "https://www.docker.com/blog/docker-model-runner-vllm-metal-macos/"],
      ["vLLM-MLX paper", "https://arxiv.org/abs/2601.19139"],
      ["PyTorch ExecuTorch MLX delegate", "https://pytorch.org/blog/running-pytorch-models-on-apple-silicon-gpus-with-the-executorch-mlx-delegate/"]
    ],
    body: [
      {
        heading: "Qué cambió",
        text: "Ollama, Docker, PyTorch y proyectos de serving están moviendo más inferencia hacia MLX y Metal. Eso reduce la distancia entre una demo cómoda en Mac y un endpoint local más serio para desarrollo, RAG privado o agentes personales."
      },
      {
        heading: "Por qué no basta con tokens por segundo",
        text: "La mejora de backend puede subir decode, pero el producto se decide por TTFT, prefill, memoria libre, contexto útil, estabilidad del servidor y facilidad de repetir la prueba en otro equipo."
      },
      {
        heading: "Dónde encaja",
        text: "Encaja muy bien para consultores, builders y pymes que quieren datos locales, ruido bajo y despliegues pequeños. También encaja para comparar modelos antes de pagar cloud. No encaja como sustituto automático de un servidor CUDA con batching y usuarios concurrentes."
      },
      {
        heading: "Prueba editorial",
        text: "Publica tres fichas: prompt corto, RAG con contexto real y dos usuarios concurrentes. Si la máquina mantiene TTFT razonable, RAM estable y calidad suficiente, entonces la recomendación empieza a ser defendible."
      }
    ]
  },
  {
    slug: "docker-vllm-macos-laboratorio-serving",
    image: "/articulos/docker-vllm-macos-laboratorio-serving.png",
    imageAlt: "Ilustración editorial: un cubo-contenedor con un motor de serving sobre un Mac",
    publishedAt: "2026-05-18",
    tags: ["vLLM","Apple Silicon","Inferencia local","Modelos locales"],
    section: "Análisis",
    title: "Docker Model Runner con vLLM en macOS: el laboratorio se parece más a producción",
    deck: "Cuando el entorno local empieza a hablar OpenAI-compatible, usar contenedores y medir serving, el salto de demo a producto se vuelve menos artesanal.",
    verdict: "Úsalo para reproducibilidad y pruebas de API. No confundas compatibilidad local con capacidad real de servir carga de producción.",
    sources: [
      ["Docker Model Runner vLLM en macOS", "https://www.docker.com/blog/docker-model-runner-vllm-metal-macos/"],
      ["vLLM docs", "https://docs.vllm.ai/"],
      ["OpenAI-compatible APIs en llama.cpp", "https://github.com/ggml-org/llama.cpp"]
    ],
    body: [
      {
        heading: "La señal importante",
        text: "Docker Model Runner llevando vLLM/Metal al Mac apunta a una tendencia: el entorno local ya no es solo una app de chat. Se está convirtiendo en una forma de probar servidores de modelos con API, aislamiento y contratos reproducibles."
      },
      {
        heading: "Qué gana un builder",
        text: "Gana una ruta más clara para desarrollar contra endpoints OpenAI-compatible, probar cambios de modelo, mantener configuraciones versionadas y enseñar demos sin depender siempre de una cuenta cloud."
      },
      {
        heading: "Qué hay que medir",
        text: "La medición debe incluir arranque, cold start, TTFT, p95, memoria, estabilidad tras varias requests y comportamiento con contexto largo. El contenedor ordena el entorno, pero no elimina los límites físicos del Mac."
      },
      {
        heading: "Veredicto práctico",
        text: "Es una pieza muy interesante para laboratorios, formación y prototipos de SaaS. En producción, sigue mandando la misma pregunta: cuántos usuarios, qué SLA, qué coste por respuesta válida y quién opera el sistema."
      }
    ]
  },
  {
    slug: "amd-rocm-vulkan-llamacpp-inferencia",
    image: "/articulos/amd-rocm-vulkan-llamacpp-inferencia.png",
    imageAlt: "Ilustración editorial: una GPU AMD con capas ROCm y Vulkan apiladas",
    publishedAt: "2026-05-21",
    tags: ["AMD","llama.cpp","Inferencia local","Hardware"],
    section: "Análisis",
    title: "AMD, ROCm, Vulkan y llama.cpp: mucho potencial, pero exige pruebas reales",
    deck: "Las GPUs AMD pueden ser atractivas para IA local, pero el backend, los drivers y el soporte de cada modelo cambian mucho la experiencia.",
    verdict: "AMD puede ser buena compra si tu stack exacto funciona. Antes de recomendar, prueba ROCm y Vulkan con el modelo, contexto y sistema operativo reales.",
    sources: [
      ["llama.cpp GitHub", "https://github.com/ggml-org/llama.cpp"],
      ["llama.cpp ROCm discussion", "https://github.com/ggml-org/llama.cpp/discussions"],
      ["LocalLLaMA multi-GPU ROCm discussion", "https://www.reddit.com/r/LocalLLaMA/comments/1sckfqf/unable_to_run_llamacpp_with_multiple_gpus_on_rocm/"],
      ["LocalLLaMA tensor parallelism discussion", "https://www.reddit.com/r/LocalLLaMA/comments/1qx0kzb/pr_to_implemt_tensor_parallelism_in_llamacpp/"]
    ],
    body: [
      {
        heading: "La promesa",
        text: "AMD ofrece VRAM atractiva por precio y un camino cada vez más serio con ROCm, Vulkan y llama.cpp. Para builders con presupuesto ajustado, eso merece atención."
      },
      {
        heading: "El problema",
        text: "El soporte no se resume en 'tiene VRAM'. Cambian drivers, kernels, backend, formato del modelo, flags, multi-GPU y estabilidad. Una RX que va bien con Vulkan puede comportarse distinto con ROCm."
      },
      {
        heading: "Cómo evaluarlo",
        text: "Mide con el modelo exacto que quieres usar, en el sistema operativo objetivo, con contexto real y al menos veinte requests. Anota errores, salida corrupta, throttling, consumo y si el runtime permite reproducir la receta."
      },
      {
        heading: "Regla de compra",
        text: "AMD es interesante si te gusta medir y puedes aceptar fricción. Para un cliente que necesita soporte predecible, NVIDIA sigue siendo más fácil de defender."
      }
    ]
  },
  {
    slug: "rtx-spark-pc-agentico-que-significa",
    image: "/articulos/rtx-spark-pc-agentico-que-significa.png",
    imageAlt: "Ilustración editorial: una caja-ordenador de IA compacta emitiendo flujos de agentes",
    publishedAt: "2026-05-24",
    tags: ["NVIDIA RTX","Agentes","Hardware","Compra"],
    section: "Producto",
    title: "RTX Spark y el PC agentico: qué significa para comprar hardware",
    deck: "La nueva narrativa de PCs con superchips IA mezcla Windows, agentes, memoria unificada y GPU Blackwell. La parte útil es separar plataforma prometedora de compra necesaria.",
    verdict: "Interesa como señal de dirección del mercado. Para comprar hoy, exige disponibilidad, precio, benchmarks reproducibles y compatibilidad de runtimes.",
    sources: [
      ["Tom's Hardware RTX Spark Computex 2026", "https://www.tomshardware.com/laptops/nvidia-unveils-rtx-spark-superchip-at-computex-2026-new-platform-promises-to-turn-windows-into-an-agentic-ai-os-with-arm-cpu-blackwell-gpu-and-128gb-unified-memory"],
      ["NVIDIA RTX PRO Workstations", "https://www.nvidia.com/en-us/products/workstations/"],
      ["Microsoft Copilot+ PC developer guide", "https://learn.microsoft.com/en-us/windows/ai/npu-devices/"]
    ],
    body: [
      {
        heading: "La tesis",
        text: "El PC se está vendiendo como plataforma agentica: más memoria, aceleradores locales, integración con Windows y capacidad de ejecutar modelos cerca del usuario. Es una dirección importante, aunque todavía necesita pruebas independientes."
      },
      {
        heading: "Qué debe mirar el lector",
        text: "No basta con TOPS ni con la palabra agente. Mira memoria utilizable, ancho de banda, VRAM o memoria unificada, compatibilidad de vLLM/llama.cpp/Ollama, consumo, ruido, drivers y precio total."
      },
      {
        heading: "Dónde puede cambiar el mercado",
        text: "Si estas plataformas llegan con 128 GB de memoria unificada, GPU moderna y buen soporte de runtimes, podrían ocupar el hueco entre portátil AI PC y workstation cara. Ese hueco es exactamente donde viven muchos builders."
      },
      {
        heading: "Veredicto editorial",
        text: "Es noticia de portada, no recomendación cerrada. Hay que seguirla, pedir benchmarks y compararla contra Mac Studio, RTX PRO y PCs con GPU tradicional antes de convertirla en guía de compra."
      }
    ]
  },
  {
    slug: "foundry-local-windows-ia-pc-builder",
    image: "/articulos/foundry-local-windows-ia-pc-builder.png",
    imageAlt: "Ilustración editorial: una plataforma que forja bloques de modelo en local",
    publishedAt: "2026-05-28",
    tags: ["Modelos locales","Inferencia local","Compra"],
    section: "Análisis",
    title: "Microsoft Foundry Local: Windows quiere ser plataforma de IA local",
    deck: "Foundry Local cambia la conversación del AI PC: no se trata solo de Copilot, sino de ejecutar modelos locales en apps reales con aceleración de hardware.",
    verdict: "Es una señal fuerte para builders Windows. Antes de apostar, valida modelos disponibles, APIs, privacidad, fallback CPU/GPU/NPU y empaquetado.",
    sources: [
      ["Windows AI developer", "https://developer.microsoft.com/en-us/windows/ai"],
      ["Foundry Local GA", "https://devblogs.microsoft.com/foundry/foundry-local-ga/"],
      ["Microsoft Build 2026", "https://news.microsoft.com/build-2026/"],
      ["Microsoft Build 2026 official blog", "https://blogs.microsoft.com/blog/2026/06/02/microsoft-build-2026-be-yourself-at-work/"]
    ],
    body: [
      {
        heading: "La noticia real",
        text: "Microsoft está empujando Windows como plataforma para desarrollar IA local, no solo como sistema con un asistente encima. Foundry Local promete ejecutar modelos en dispositivos con aceleración GPU, NPU o CPU, y eso puede importar mucho para apps de escritorio, industria, educación y pymes."
      },
      {
        heading: "Qué gana el lector",
        text: "Un builder Windows podría integrar inferencia local sin montar todo desde cero con drivers y backends distintos. Si el modelo, el runtime y la API encajan, hay menos fricción para crear apps con privacidad, baja latencia y coste predecible."
      },
      {
        heading: "La letra pequeña",
        text: "Hay que comprobar qué modelos están disponibles, cómo se empaquetan, qué pasa cuando no hay NPU, cómo se actualizan, qué logs genera el sistema y si la calidad sirve para el caso real."
      },
      {
        heading: "Prueba mínima",
        text: "Crea una app pequeña con extracción JSON, resumen y búsqueda local. Mide latencia en CPU, GPU y NPU, revisa consumo, errores y facilidad de instalación en otro PC."
      }
    ]
  },
  {
    slug: "ryzen-ai-halo-strix-halo-compra-llm-local",
    image: "/articulos/ryzen-ai-halo-strix-halo-compra-llm-local.png",
    imageAlt: "Ilustración editorial: un APU x86 compacto con un gran pool de memoria unificada",
    publishedAt: "2026-05-31",
    tags: ["AMD","Hardware","Compra","Inferencia local"],
    section: "Análisis",
    title: "Ryzen AI Halo y Strix Halo: el x86 con memoria unificada entra en la pelea",
    deck: "AMD quiere ocupar el hueco entre portátil, mini workstation y laboratorio local con mucha memoria. La oportunidad es enorme, pero la recomendación depende del runtime.",
    verdict: "Muy prometedor para IA local en formato compacto. Compra solo si tu modelo funciona bien en ROCm, Vulkan, llama.cpp, Ollama o LM Studio.",
    sources: [
      ["AMD Ryzen AI Halo developer platform", "https://www.amd.com/en/blogs/2026/amd-powers-next-generation-agent-computers-with-new-ryzen-ai-hal.html"],
      ["AMD CES 2026 Ryzen AI announcements", "https://www.amd.com/en/newsroom/press-releases/2026-1-5-amd-expands-ai-leadership-across-client-graphics-.html"],
      ["Reddit Strix Halo setups", "https://www.reddit.com/r/StrixHalo/comments/1tv41uh/strix_halo_ryzen_ai_max_395_128gb_owners_whats/"],
      ["Reddit Strix Halo LLM results", "https://www.reddit.com/r/LocalLLM/comments/1tu7xw4/collecting_strix_halo_ryzen_ai_max_395_local_llm/"]
    ],
    body: [
      {
        heading: "Por qué importa",
        text: "Ryzen AI Halo apunta a sistemas con mucha memoria y enfoque de agentes locales. Para LLMs, esa memoria puede ser más importante que la etiqueta AI PC, porque permite probar modelos y contextos que no caben en GPUs pequeñas."
      },
      {
        heading: "Dónde está el riesgo",
        text: "El hardware puede ser bueno y aun así frustrante si el runtime no está maduro. En AMD hay que mirar ROCm, Vulkan, forks de llama.cpp, drivers, sistema operativo y compatibilidad del modelo exacto."
      },
      {
        heading: "Lo que Reddit aporta",
        text: "Las discusiones de usuarios con Strix Halo son valiosas porque suelen incluir configuración real, modelos, cuantización, RAM y errores. No sustituyen un benchmark formal, pero muestran dónde se atascan los compradores reales."
      },
      {
        heading: "Veredicto práctico",
        text: "Es una plataforma que merece seguimiento editorial fuerte. Para un lector técnico puede ser una gran máquina de laboratorio. Para una pyme que necesita soporte inmediato, conviene esperar pruebas reproducibles."
      }
    ]
  },
  {
    slug: "snapdragon-x2-ai-pc-npu-no-es-llm-server",
    image: "/articulos/snapdragon-x2-ai-pc-npu-no-es-llm-server.png",
    imageAlt: "Ilustración editorial: un chip NPU móvil eficiente frente a una pila de servidor mayor",
    publishedAt: "2026-06-03",
    tags: ["Compra","Hardware","Inferencia local"],
    section: "Guía de compra",
    title: "Snapdragon X2 y los AI PC baratos: NPU no significa servidor LLM",
    deck: "Qualcomm está llevando NPUs potentes a más formatos y precios. Eso mejora apps locales, pero no convierte automáticamente un portátil ligero en workstation de inferencia.",
    verdict: "Compra Snapdragon X2 por batería, movilidad y funciones on-device. Para LLMs grandes, sigue mirando memoria, GPU, runtime y compatibilidad.",
    sources: [
      ["Qualcomm Snapdragon X Series desktop PCs", "https://www.qualcomm.com/news/onq/2026/01/accelerating-the-future-of-desktop-pcs-snapdragon-x-series"],
      ["Snapdragon X2 Plus product brief", "https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/images/company/news-media/media-center/press-kits/ces-2026/documents/ProductBrief_SnapdragonX2Plus.pdf"],
      ["Microsoft Copilot+ PC NPU guide", "https://learn.microsoft.com/en-us/windows/ai/npu-devices/"]
    ],
    body: [
      {
        heading: "La buena noticia",
        text: "NPUs más capaces en equipos más baratos pueden democratizar funciones locales: voz, cámara, traducción, clasificación, modelos pequeños y flujos privados sin nube."
      },
      {
        heading: "La confusión habitual",
        text: "TOPS de NPU no responde si puedes ejecutar un 14B con contexto largo, si tienes memoria suficiente o si tu runtime soporta el acelerador. Para LLMs, la compatibilidad pesa tanto como la ficha técnica."
      },
      {
        heading: "Cómo recomendarlo",
        text: "Recomiéndalo a quien valore movilidad, silencio y batería. No lo vendas como máquina universal de IA local hasta probar los modelos, APIs y herramientas que el lector quiere usar."
      },
      {
        heading: "Prueba mínima",
        text: "Ejecuta un modelo pequeño local, una tarea de voz o visión, y una extracción estructurada. Mide latencia, batería, temperatura y si la app puede usar la NPU sin trucos frágiles."
      }
    ]
  },
  {
    slug: "multi-rtx-3090-tensor-parallel-benchmarks-x",
    image: "/articulos/multi-rtx-3090-tensor-parallel-benchmarks-x.png",
    imageAlt: "Ilustración editorial de varias GPU idénticas en paralelo con flujos de datos teal que se fusionan en un solo haz",
    publishedAt: "2026-06-04",
    tags: ["NVIDIA RTX", "llama.cpp", "vLLM", "Inferencia local", "Benchmarks"],
    section: "Benchmark",
    title: "Multi-RTX 3090 y Tensor Parallel: lo que dicen los benchmarks de X (y cómo verificarlo)",
    deck: "Builders están sumando 3090 usadas y activando Tensor Parallel para servir modelos de 27-35B en local. Las cifras circulan en X sin fuente; la función de llama.cpp, en cambio, sí es real y está documentada.",
    verdict: "La señal de fondo es sólida: Tensor Parallel en llama.cpp existe y suma la VRAM de varias GPUs. Las velocidades concretas vienen de X y sin verificar: úsalas como punto de partida para tu propia prueba, nunca como garantía. Mide TTFT, decode y vigila el cuello de PCIe.",
    sources: [
      ["llama.cpp — documentación multi-GPU (Tensor Parallel)", "https://github.com/ggml-org/llama.cpp/blob/master/docs/multi-gpu.md"],
      ["llama.cpp — releases", "https://github.com/ggml-org/llama.cpp/releases"],
      ["Señal en X — @sakurayukiai (sin verificar)", "https://x.com/sakurayukiai/status/2062505654430859303"],
      ["Señal en X — @MatulaWojtek (sin verificar)", "https://x.com/MatulaWojtek/status/2062479026455736715"],
      ["Señal en X — @geldeki (sin verificar)", "https://x.com/geldeki/status/2060696839859413412"]
    ],
    body: [
      {
        heading: "Qué se está reportando en X",
        text: "Varios builders publican números altos exprimiendo 3090 de segunda mano. Uno reporta 44,7 tok/s de decode con 250k de contexto combinando una 3090 y una 3080 Ti. Otro, 1298 tok/s de prompt y 76 tok/s de generación con un Qwen 27B Q5 en tres 3090 (Tensor Parallel y MTP activados). Un tercero, con dos 3090 en vLLM, pasa de unos 95 tokens/s en petición única a unos 268 en concurrencia 4. Son cifras llamativas, pero ninguna trae fuente reproducible: son capturas de pantalla."
      },
      {
        heading: "La novedad técnica sí es verificable",
        figure: { src: "/articulos/diagramas/tensor-parallel-vs-capas.png", alt: "Diagrama: reparto por capas frente a Tensor Parallel entre dos GPUs", caption: "Reparto por capas vs Tensor Parallel: cómo se divide el modelo entre varias GPUs." },
        text: "Más allá de los tweets, la pieza real es que llama.cpp incorporó Tensor Parallel (build b8738, abril de 2026): en lugar de repartir capas por GPU, divide cada operación entre todas y las mantiene ocupadas en cada token, con mejoras de 3-4x sobre el reparto por capas. Un matiz importante: alguna señal lo da como 'solo CUDA', pero la documentación oficial lo describe como backend-agnóstico (NVIDIA, AMD y Apple Silicon). Cuando el tweet y los docs no coinciden, manda el doc."
      },
      {
        heading: "Por qué importa para builders",
        text: "Tres 3090 usadas suman 72 GB de VRAM por una fracción de lo que cuesta una GPU profesional. Con Tensor Parallel, eso habilita servir modelos de 27-35B cuantizados en casa, con throughput que sube al añadir concurrencia. Es la diferencia entre 'cabe el modelo' y 'puedo servir a varios a la vez'."
      },
      {
        heading: "Los límites que nadie tuitea",
        text: "El cuello de PCIe en placas de consumo penaliza la comunicación entre GPUs; en vLLM, las dimensiones del modelo deben ser divisibles por el número de GPUs (por eso una de las pruebas 'no arranca en 3'); en llama.cpp, la cuantización de KV cache aún no está soportada con Tensor Parallel y el soporte de MoE es limitado. Nada de esto aparece en las cifras de portada."
      },
      {
        heading: "Cómo verificarlo tú",
        text: "Coge tu modelo, tu cuantización y tu contexto reales. Mide TTFT y tok/s de decode, compara reparto por capas frente a Tensor Parallel, y observa la utilización por GPU (nvidia-smi) y el tráfico PCIe. Si la concurrencia es tu caso, mide a 1, 2 y 4 peticiones. Solo entonces sabrás si esos números aplican a tu máquina."
      }
    ]
  },
  {
    slug: "gemma-4-12b-modelo-local-gguf-dia-1",
    image: "/articulos/gemma-4-12b-modelo-local-gguf-dia-1.png",
    imageAlt: "Ilustración editorial de una gema facetada dorada sobre una placa, irradiando conexiones a un portátil y un mini-PC",
    publishedAt: "2026-06-04",
    tags: ["Modelos locales", "Ollama", "MLX", "Benchmarks"],
    section: "Modelos",
    title: "Gemma 4 12B: el modelo local de la semana, con GGUF el día 1",
    deck: "Google libera Gemma 4 12B (Apache 2.0, multimodal sin encoder, 256K de contexto) y el ecosistema local lo soporta desde el primer día. Qué hace falta para correrlo y qué medir antes de adoptarlo.",
    verdict: "Candidato local de referencia por licencia permisiva y soporte day-0. El '8 GB de RAM' es el mínimo cuantizado, no la experiencia recomendada: cuenta con 16 GB de VRAM o memoria unificada y mide calidad real en tu caso. Las velocidades que circulan en X van sin hardware claro: orientativas, no comparables.",
    sources: [
      ["Google AI — documentación de Gemma 4", "https://ai.google.dev/gemma/docs/core"],
      ["Hugging Face — google/gemma-4-12B", "https://huggingface.co/google/gemma-4-12B"],
      ["Hugging Face — unsloth/gemma-4-12b-it-GGUF", "https://huggingface.co/unsloth/gemma-4-12b-it-GGUF"],
      ["Señal en X — @Krongggggg (sin verificar)", "https://x.com/Krongggggg/status/2062493778414653940"],
      ["Señal en X — @_LEFBE, benchmark (sin verificar)", "https://x.com/_LEFBE/status/2062487987657548256"]
    ],
    body: [
      {
        heading: "Qué ha pasado",
        text: "Google publicó Gemma 4 12B el 3 de junio de 2026 bajo licencia Apache 2.0. Es multimodal nativo (texto, imagen, audio y vídeo), con una arquitectura sin encoder separado y ventana de contexto de 256K. Lo relevante para builders no es solo el modelo: es que llegó con soporte del ecosistema local desde el minuto uno."
      },
      {
        heading: "Por qué importa",
        text: "Apache 2.0 significa uso comercial sin ataduras. Y el soporte day-0 es real: Unsloth y LM Studio publicaron cuantizaciones GGUF el mismo día, y funciona en Ollama, llama.cpp, MLX y vLLM. Un modelo abierto, multimodal y permisivo que corre en una laptop cambia lo que una pyme técnica puede montar sin depender de la nube."
      },
      {
        heading: "Requisitos reales frente al hype",
        text: "La cifra honesta es 16 GB de VRAM o memoria unificada para una experiencia cómoda. Los 8 GB que circulan son posibles con cuantización agresiva (GPTQ, AWQ o GGUF), a costa de calidad y contexto. 'Corre en 8 GB' no es lo mismo que 'rinde bien en 8 GB'."
      },
      {
        heading: "Rendimiento reportado, con cautela",
        text: "En X aparecen números como 51 t/s para gemma-4-12B-it-GGUF, pero sin especificar hardware: sirven de orientación, no de comparación. La velocidad de un 12B depende tanto de la GPU y la cuantización como del propio modelo."
      },
      {
        heading: "Cómo probarlo",
        text: "Descárgalo con Ollama o LM Studio (GGUF) o vía MLX en Apple Silicon, y mídelo en tu tarea real: TTFT, tok/s, RAM usada y —si te interesa lo multimodal— calidad en imagen y audio. Compáralo contra el modelo que ya usas antes de migrar."
      }
    ]
  },
  {
    slug: "coste-eficiencia-inferencia-local-tokens-por-julio",
    image: "/articulos/coste-eficiencia-inferencia-local-tokens-por-julio.png",
    imageAlt: "Ilustración editorial de una balanza que equilibra un flujo de tokens contra un símbolo de energía",
    publishedAt: "2026-06-03",
    tags: ["Inferencia local", "Benchmarks", "Hardware", "Compra"],
    section: "Análisis",
    title: "Tokens por julio y coste por token: la métrica de inferencia local que casi nadie mira",
    deck: "Más allá de los tok/s de portada, lo que decide si la IA local sale a cuenta es la energía que consume y el coste por token. Tres señales recientes lo ponen sobre la mesa.",
    verdict: "Los tok/s venden, pero tok/J y coste por token deciden. Si vas a servir en local de forma sostenida, mide consumo (con tegrastats o un vatímetro) y coste por respuesta válida, no solo velocidad pico. Las cifras de X son dirección útil, no factura.",
    sources: [
      ["spark-arena — benchmark Holo-3.1-35B en DGX Spark", "https://spark-arena.com/benchmark/2bf2209e-0827-4de6-9df9-8ad70ae1b618"],
      ["Señal en X — @YuvrajS9886, metodología tok/J (sin verificar)", "https://x.com/YuvrajS9886/status/2062129348677976369"],
      ["Señal en X — @zeroclaw_build, coste/token (sin verificar)", "https://x.com/zeroclaw_build/status/2062505920064598338"],
      ["Señal en X — @spark_arena (DGX Spark)", "https://x.com/spark_arena/status/2062181904116596860"]
    ],
    body: [
      {
        heading: "Por qué tok/s no basta",
        text: "La velocidad pico es la métrica fácil de tuitear, pero no dice cuánto cuesta operar un modelo en local de forma continua. Para eso hacen falta dos números que casi nadie publica: tokens por julio (eficiencia energética) y coste por token (la factura real)."
      },
      {
        heading: "tok/J: el benchmark de Jetson",
        text: "Una señal interesante propone medir output tok/J en NVIDIA Jetson con llama.cpp: barre prompt (128-2048) por generación (64-256) por 4 modos de potencia, lo que da 384 mediciones por modelo, leyendo el consumo con tegrastats. No trae cifras de portada, pero sí algo más valioso: una metodología reproducible para comparar eficiencia, no solo velocidad."
      },
      {
        heading: "Coste por token: el caso del NUC",
        text: "Otro builder afirma 0,003 $/token ejecutando lotes nocturnos en un mini PC NUC i7 frente a 0,015 $/token de una API en la nube. La cifra va sin fuente, así que es anécdota; pero el marco es sólido: el trabajo no urgente (batch nocturno) es donde la inferencia local amortiza mejor el hardware."
      },
      {
        heading: "El contrapunto: concurrencia en DGX Spark",
        text: "Un benchmark con fuente (spark-arena) muestra un Holo-3.1-35B en NVIDIA DGX Spark pasando de 75 tok/s en petición única a casi 200 en concurrencia 10. La lección: el coste por token mejora cuando saturas el hardware con varias peticiones, no cuando lo usas a medias."
      },
      {
        heading: "Cómo medirlo tú",
        text: "Pon un vatímetro (o usa tegrastats en Jetson), apunta el precio de tu kWh y cuenta solo los tokens de respuestas válidas. Coste por token = (vatios por horas por precio del kWh) dividido entre tokens útiles. Ese número, no los tok/s, te dice si comprar hardware sale a cuenta frente a pagar una API."
      }
    ]
  },
  {
    slug: "claude-code-github-action-inyeccion-prompt-vuln",
    image: "/articulos/claude-code-github-action-inyeccion-prompt-vuln.png",
    imageAlt: "Ilustración editorial de un escudo metálico agrietado con una llave y credenciales de luz escapando",
    publishedAt: "2026-06-04",
    tags: ["Seguridad", "Agentes"],
    section: "Seguridad",
    title: "La vulnerabilidad de la GitHub Action de Claude Code: una issue podía robar tus credenciales",
    deck: "Una inyección de prompt desde una issue maliciosa permitía escribir en el repositorio y filtrar los tokens OIDC del workflow. Anthropic lo corrigió en la v1.0.94; si la usas en CI, conviene auditar.",
    verdict: "Si usas la Action de Claude Code —o cualquier agente con shell— en CI, actualiza a v1.0.94 o posterior y trata las issues y PRs externas como entrada no confiable. La lección no es 'Claude Code es inseguro', sino que un agente con shell en CI es superficie de ataque: limita permisos, secretos y comandos auto-aprobados.",
    sources: [
      ["GMO Flatt Security — análisis técnico (RyotaK)", "https://flatt.tech/research/posts/poisoning-claude-code-one-github-issue-to-break-the-supply-chain/"],
      ["SecurityWeek — agentes vulnerables a inyección vía comentarios", "https://www.securityweek.com/claude-code-gemini-cli-github-copilot-agents-vulnerable-to-prompt-injection-via-comments/"],
      ["Señal en X — @TheHackersNews", "https://x.com/TheHackersNews/status/2062559658175521227"]
    ],
    body: [
      {
        heading: "Qué pasó",
        text: "El investigador RyotaK, de GMO Flatt Security, descubrió que la GitHub Action de Claude Code confiaba en cualquier actor cuyo nombre terminara en [bot], sin comprobar permisos reales. Como las GitHub Apps pueden crear issues en repositorios públicos usando solo un token de instalación, un atacante externo no autenticado podía saltarse ese control por completo."
      },
      {
        heading: "Cómo se encadenaba el ataque",
        text: "Con el control saltado, una issue con un falso mensaje de error servía de inyección de prompt para que el agente ejecutara comandos. Claude Code permite ciertos comandos (como cat y head) sin aprobación explícita, lo que dejaba leer /proc/self/environ y exponer ACTIONS_ID_TOKEN_REQUEST_TOKEN y su URL: las credenciales para pedir un token OIDC. Con ese token se podía escribir en repos que dependían del workflow. De un comentario a un ataque de cadena de suministro."
      },
      {
        heading: "Por qué importa más allá de Claude Code",
        text: "No es el fallo de un producto concreto: es el patrón de cualquier agente con shell en CI. Inyección de prompt, más comandos aparentemente inofensivos, más secretos en el entorno del job, igual a exfiltración. Gemini CLI y GitHub Copilot han tenido variantes del mismo problema vía comentarios."
      },
      {
        heading: "Qué arregló la v1.0.94",
        text: "Anthropic añadió una comprobación de actor humano (checkHumanActor) en modo agente, desactivó por defecto el resumen del run, limpió las variables de entorno en los procesos hijos que lanza el agente, incorporó un wrapper de gh que valida argumentos y bloquea URLs de exfiltración, e hizo que se ignoren las issues y comentarios editados después de disparar el workflow. El investigador puntuó la severidad como alta (CVSS v4.0 7,8)."
      },
      {
        heading: "Qué hacer tú",
        text: "Actualiza a v1.0.94 o posterior. Trata toda issue o PR de fuera como no confiable. Da el mínimo privilegio al GITHUB_TOKEN, no metas secretos jugosos en el entorno del job, y revisa qué comandos auto-aprueba tu agente. Si automatizas con agentes en CI, asume que el prompt es código que un extraño puede influir."
      }
    ]
  },
  {
    slug: "mlxcel-motor-inferencia-rust-mlx-apple-silicon",
    image: "/articulos/mlxcel-motor-inferencia-rust-mlx-apple-silicon.png",
    imageAlt: "Ilustración editorial de un chip con bloques de memoria unificada y engranajes de tono óxido",
    publishedAt: "2026-06-04",
    tags: ["Apple Silicon", "MLX", "Inferencia local", "Modelos locales"],
    section: "Análisis",
    title: "mlxcel: un motor de inferencia en Rust sobre MLX para Apple Silicon, con benchmarks honestos",
    deck: "Un binario sin Python, compatible con la API de OpenAI, que iguala a mlx-lm y supera a Ollama en decode sobre un M1 Max. Su autor también publica dónde todavía no brilla.",
    verdict: "Prometedor para servir modelos en Apple Silicon sin entorno Python: iguala a mlx-lm (a un ~6%) y va ~1,3x sobre Ollama en decode. Pero es v0.1.0 y su KV-cache 'TurboQuant' penaliza fuerte en M1 (parece optimizado para chips M más nuevos). Pruébalo como serving ligero, no como apuesta de producción todavía.",
    sources: [
      ["Kubesimplify — mlxcel probado en M1 Max (análisis y benchmarks)", "https://blog.kubesimplify.com/mlxcel-rust-native-inference-engine-tested-on-m1-max"],
      ["MLX — framework de Apple", "https://github.com/ml-explore/mlx"],
      ["Señal en X — @kubesimplify", "https://x.com/kubesimplify/status/2062531594519499152"]
    ],
    body: [
      {
        heading: "Qué es",
        text: "mlxcel es un motor de inferencia nativo en Rust que envuelve el framework MLX de Apple mediante FFI. Llegó como v0.1.0 (28 de mayo de 2026) y ofrece una CLI y un servidor HTTP compatible con OpenAI, ambos como binarios compilados: sin entorno de Python. Se instala con brew, sin más dependencias que el runtime de Metal."
      },
      {
        heading: "Los números, con fuente y en M1 Max",
        text: "En decode con Llama 3.2 3B (4-bit): mlxcel 63,33 tok/s, mlx-lm 67,63 y Ollama 48,73. Con Qwen 2.5 7B (4-bit): 31,33 / 31,80 / 24,23. Es decir, a la par de mlx-lm (dentro de un 6%) y alrededor de 1,3x sobre Ollama. En prefill con prompts largos, los tres rondan 420-440 tok/s: paridad. Son cifras del autor, medidas y publicadas, no un tweet suelto."
      },
      {
        heading: "Lo que su propio autor admite",
        text: "El KV-cache cuantizado 'TurboQuant' penaliza 3,6x en M1 Max (de 63 a 17 tok/s en la variante más segura): los kernels Metal parecen optimizados para la generación M5, no para M1. Además, al ser v0.1.0, la inferencia distribuida está a medio validar y el speculative decoding solo cubre dos pares de modelos. Que el autor documente sus límites con números es, en sí, una buena señal editorial."
      },
      {
        heading: "Por qué importa para builders en Mac",
        text: "Un serving compatible con OpenAI, escrito en Rust, sobre MLX y sin Python, baja la fricción de montar inferencia local en un Mac. Ocupa el hueco entre mlx-lm (una librería que integras en código) y Ollama (comodidad pero menos control), ofreciendo binarios listos y rendimiento competitivo."
      },
      {
        heading: "Cómo probarlo",
        text: "Instálalo (brew tap lablup/tap && brew install mlxcel), arranca mlxcel-server y mide tok/s con tu modelo y cuantización reales. Evita TurboQuant en M1/M2 hasta que sus kernels maduren. Trátalo como un experimento serio para serving local en Apple Silicon, no como reemplazo de producción de mlx-lm u Ollama todavía."
      }
    ]
  },
  {
    slug: "mistral-ia-soberana-europa-builders",
    image: "/articulos/mistral-ia-soberana-europa-builders.png",
    imageAlt: "Ilustración editorial: un núcleo de cómputo europeo con anillo de estrellas, datos fluyendo hacia infraestructura propia",
    publishedAt: "2026-06-04",
    tags: ["Modelos locales", "Inferencia local", "Europa"],
    section: "Europa",
    title: "Mistral y la IA soberana: por qué Europa juega su propia partida",
    deck: "Mistral cerró en marzo financiación —incluidos 830 M$ de deuda— para un clúster de data center en París y multiplicó por 20 sus ingresos en un año. Su apuesta, pesos abiertos y cómputo europeo, es la jugada de soberanía del continente.",
    verdict: "Para un builder europeo, Mistral importa menos por la carrera de parámetros y más por lo que habilita: modelos de pesos abiertos que puedes ejecutar en tu propia infraestructura y un proveedor sujeto a normativa de la UE. Si tu cliente no puede mandar datos a EE. UU., esta es una vía real; mide calidad y coste antes de migrar por bandera.",
    sources: [
      ["CNBC — Mistral financia un clúster de data center en París", "https://www.cnbc.com/2026/03/30/mistral-ai-paris-data-center-cluster-debt-financing.html"],
      ["Mistral AI — European AI playbook", "https://europe.mistral.ai/"]
    ],
    body: [
      {
        heading: "Qué ha pasado",
        text: "Mistral, fundada en 2023 en París por antiguos investigadores de DeepMind y Meta, ha levantado más de 3.000 M$ en ocho rondas en menos de tres años. En marzo de 2026 cerró 830 M$ de deuda con un consorcio de siete bancos para construir un clúster de data center propio en París, y sus ingresos pasaron de unos 20 M$ a inicios de 2025 a más de 400 M$ en febrero de 2026."
      },
      {
        heading: "La jugada: soberanía y pesos abiertos",
        text: "La estrategia no es solo tamaño de modelo: es ofrecer pesos abiertos que gobiernos y empresas puedan ejecutar en su propia infraestructura. En mercados donde la preocupación por la soberanía del dato descarta a proveedores estadounidenses, poder autohospedar el modelo es una ventaja concreta, no un eslogan."
      },
      {
        heading: "Por qué importa para builders",
        text: "Un proveedor europeo con modelos abiertos cambia el cálculo de cumplimiento (RGPD, sectores regulados) y de dependencia. Puedes autohospedar vía vLLM o llama.cpp, auditar el modelo y no atarte a una sola nube extranjera. Para una consultora o pyme técnica europea, eso abre puertas que una API cerrada cierra."
      },
      {
        heading: "Las dudas honestas",
        text: "Soberano no es magia: hace falta cómputo, talento y un catálogo al día frente a OpenAI, Anthropic y Google. Financiar data centers con deuda es una apuesta intensiva en capital, y el liderazgo en calidad sigue disputado. La etiqueta europea no debe sustituir a la medición."
      },
      {
        heading: "Qué probar",
        text: "Evalúa los modelos abiertos de Mistral en tu tarea real, autohospedados o vía su API, y compara calidad y coste por respuesta válida con tu stack actual. Comprueba el encaje de cumplimiento de tu caso: si el dato no puede salir de la UE, la ecuación cambia a favor."
      }
    ]
  },
  {
    slug: "jupiter-gigafactorias-ia-europa",
    image: "/articulos/jupiter-gigafactorias-ia-europa.png",
    imageAlt: "Ilustración editorial: un superordenador como monolito de racks iluminados bajo un arco de estrellas europeas",
    publishedAt: "2026-06-04",
    tags: ["Hardware", "Europa", "Compra"],
    section: "Europa",
    title: "JUPITER y las gigafactorías de IA: Europa construye su cómputo",
    deck: "El primer superordenador exaescala europeo ya está en marcha con 24.000 chips NVIDIA, y la UE moviliza 200.000 M€ (20.000 M€ para 'gigafactorías de IA'). Qué significa para quien construye en Europa.",
    verdict: "El cómputo soberano deja de ser un eslogan: JUPITER y las cinco gigafactorías son acceso real a entrenamiento e inferencia para startups, universidades y pymes europeas. El cuello de botella deja de ser conseguir la GPU y pasa a ser saber pedir tiempo de cómputo y usarlo bien.",
    sources: [
      ["EuroHPC JU — AI Factories", "https://www.eurohpc-ju.europa.eu/eurohpc-ju-selects-six-additional-ai-factories-expand-europes-ai-capabilities-2025-10-10_en"],
      ["Comisión Europea — JUPITER, primer exaescala europeo", "https://digital-strategy.ec.europa.eu/en/factpages/digital-success-stories-jupiter-first-european-exascale-supercomputer"]
    ],
    body: [
      {
        heading: "Qué ha pasado",
        text: "JUPITER, en el Jülich Supercomputing Centre (Alemania), es el primer superordenador exaescala de Europa. Su módulo Booster monta unos 24.000 superchips NVIDIA GH200 Grace Hopper y supera 1 exaFLOP/s en doble precisión, con mucho más en cargas de IA. Está concebido como 'AI Factory': infraestructura para que startups, universidades y centros de investigación entrenen y desplieguen modelos."
      },
      {
        heading: "La apuesta de los 200.000 M€",
        text: "La Comisión lanzó InvestAI para movilizar 200.000 M€, con un fondo europeo de 20.000 M€ destinado a grandes clústeres, las llamadas 'gigafactorías de IA'. Para finales de 2026 se desplegarán cinco superordenadores de IA en Finlandia, Alemania, Italia, Luxemburgo y Suecia, equipados con alrededor de 100.000 chips de última generación."
      },
      {
        heading: "Por qué importa para builders",
        text: "Es acceso a un cómputo que ninguna pyme puede permitirse en solitario, pensado para entrenar o servir modelos sin depender únicamente de nubes estadounidenses. Para el ecosistema europeo, tener fábricas de IA públicas cambia quién puede intentar entrenar un modelo serio."
      },
      {
        heading: "Las advertencias",
        text: "Un superordenador no es una API: hay convocatorias, colas, schedulers y una curva de aprendizaje real (MPI, HPC). Y conviene el matiz: casi todo el músculo sigue siendo silicio NVIDIA. Es soberanía de cómputo y de datos, todavía no de chips."
      },
      {
        heading: "Qué hacer",
        text: "Si construyes en Europa, mira los programas de acceso de EuroHPC y las AI Factories: muchas convocatorias están abiertas a startups y academia. Aprender a solicitar y exprimir tiempo de HPC se está convirtiendo en una ventaja competitiva concreta."
      }
    ]
  },
  {
    slug: "tinybird-datos-tiempo-real-ia-espana",
    image: "/articulos/tinybird-datos-tiempo-real-ia-espana.png",
    imageAlt: "Ilustración editorial: un flujo de eventos en tiempo real convertido en una API de baja latencia",
    publishedAt: "2026-06-04",
    tags: ["SaaS", "Europa", "Inferencia local"],
    section: "Europa",
    title: "Datos en tiempo real para IA: lo que Tinybird dice del ecosistema español",
    deck: "La madrileña Tinybird convirtió la analítica en tiempo real sobre ClickHouse en producto, levantó decenas de millones y creció su ARR un 180% en 2025. Un buen caso de la IA española que va más allá del wrapper.",
    verdict: "El ecosistema español de IA ya no es solo demos: hay infraestructura real y vendible. Tinybird recuerda que el valor para builders está en lo aburrido-pero-crítico (datos, latencia, fiabilidad), no en el enésimo chatbot. Si construyes producto de IA, mira primero tu capa de datos.",
    sources: [
      ["Silicon — Tinybird levanta financiación y se expande a EE. UU.", "https://www.silicon.es/tinybird-ronda-financiacion-eeuu-236952"],
      ["Tinybird — web oficial", "https://www.tinybird.co/"],
      ["Gobierno de España — 40 M€ para casos de uso de IA en pymes", "https://digital.gob.es/comunicacion/notas-prensa/secretaria-digitalizacion-e-inteligencia-artificial/2026/03/el-gobierno-invertira-40-millones-de-euros-para-facilitar-el-acc"]
    ],
    body: [
      {
        heading: "Qué es Tinybird",
        text: "Fundada en Madrid en 2019 por Jorge Gómez Sancha y Javier Santana, Tinybird es una plataforma de datos en tiempo real, construida sobre ClickHouse, que convierte consultas analíticas en APIs de baja latencia. Cerró una Serie A de 37 M$ (CRV, Singular) y una Serie B de 30 M$ (unos 28 M€, liderada por Balderton); su ARR creció un 180% en 2025, superando los 15 M€."
      },
      {
        heading: "Por qué encaja con la IA",
        text: "Las aplicaciones de IA viven o mueren por sus datos: features en tiempo real, RAG con datos frescos, analítica de uso y de coste por respuesta. Una capa que pasa de segundos a milisegundos habilita productos que antes no eran viables, y reduce la infraestructura que hay que mantener."
      },
      {
        heading: "El contexto español",
        text: "No es un caso aislado. El ecosistema español de IA ha crecido con fuerza en capital privado, y el Gobierno destina 40 M€ a acercar casos de uso de IA a las pymes, además de instrumentos públicos no dilutivos como ENISA y CDTI. Hay financiación y hay ingeniería."
      },
      {
        heading: "La lectura sin humo",
        text: "Que una startup integre IA no la hace valiosa: lo valioso es resolver un problema caro y repetido. La infraestructura de datos —lo 'aburrido'— es justo donde España tiene ingenieros y producto de verdad, y donde un builder encuentra ventaja antes que en el modelo de moda."
      },
      {
        heading: "Qué probar y para quién",
        text: "Si montas producto de IA, evalúa tu capa de datos antes que el modelo. Herramientas como Tinybird tienen sentido cuando necesitas analítica o features en tiempo real con baja latencia y poca infraestructura que operar. Mide latencia y coste con tu volumen real antes de comprometerte."
      }
    ]
  },
  {
    slug: "nvidia-nemotron-3-ultra-modelo-abierto-agentes",
    image: "/articulos/nvidia-nemotron-3-ultra-modelo-abierto-agentes.png",
    imageAlt: "Ilustración editorial: un núcleo de modelo MoE con capas Mamba y atención, contexto largo fluyendo",
    publishedAt: "2026-06-05",
    tags: ["Agentes", "Modelos locales", "vLLM", "Benchmarks"],
    section: "Modelos",
    title: "Nemotron 3 Ultra: NVIDIA abre un modelo de 550B para agentes (y rompe el molde Transformer)",
    deck: "NVIDIA libera pesos, datos y recetas de un MoE de 550B (55B activos) híbrido Mamba-Transformer, con 1M de contexto y licencia comercial. Pensado para agentes que corren durante horas.",
    verdict: "La noticia no es 'otro modelo grande': es que NVIDIA abre pesos, datos y recetas con licencia comercial y una arquitectura híbrida Mamba que escala mejor en contexto largo. Para builders, el reto pasa de 'qué modelo' a 'tengo hardware para servir 55B activos'. Mídelo en tu tarea agéntica antes de creerte el 6x.",
    sources: [
      ["NVIDIA Research — Nemotron 3 Ultra", "https://research.nvidia.com/labs/nemotron/Nemotron-3-Ultra/"],
      ["NVIDIA Newsroom — familia Nemotron 3", "https://nvidianews.nvidia.com/news/nvidia-debuts-nemotron-3-family-of-open-models"],
      ["NVIDIA Build — probar el modelo", "https://build.nvidia.com/nvidia/nemotron-3-ultra-550b-a55b"]
    ],
    body: [
      {
        heading: "Qué ha pasado",
        text: "El 4 de junio de 2026 NVIDIA abrió Nemotron 3 Ultra: 550B de parámetros totales, 55B activos (MoE), con arquitectura híbrida Mamba-Attention. Libera pesos, datos de entrenamiento y recetas bajo licencia abierta con uso comercial, ventana de 1M de contexto y un checkpoint NVFP4 para Blackwell, Hopper y Ampere. Disponible en Hugging Face, OpenRouter, ModelScope y NIM."
      },
      {
        heading: "Por qué la arquitectura importa",
        text: "En vez de un Transformer puro, mezcla capas Mamba (escalado sub-cuadrático para secuencias largas) con unas pocas de atención (recall preciso en contextos grandes). Eso es lo que habilita el millón de tokens de contexto y el throughput alto: NVIDIA afirma hasta ~6x más throughput que LLMs abiertos comparables (5,9x frente a GLM-5.1)."
      },
      {
        heading: "Para quién y para qué",
        text: "Está optimizado para agentes de larga duración: tool calling, coding y deep research. Si construyes agentes que mantienen contexto durante horas, un modelo abierto con ventana de 1M y licencia comercial cambia el cálculo de dependencia y de coste frente a una API cerrada."
      },
      {
        heading: "El asterisco honesto",
        text: "55B activos siguen siendo mucho hardware para servir en local; la mayoría lo usará vía API (OpenRouter, NIM). Y en el índice de Artificial Analysis queda segundo entre los abiertos de EE. UU., aún por detrás de modelos chinos como Kimi K2.6. 'Abierto y rápido' no significa 'el mejor'."
      },
      {
        heading: "Qué probar",
        text: "Pruébalo en OpenRouter o NIM con tu tarea agéntica real (herramientas, contexto largo), mide latencia y coste por tarea completada, y compáralo con tu modelo actual. El 6x es de NVIDIA; el que cuenta es el tuyo."
      }
    ]
  },
  {
    slug: "red-hat-curso-cuantizar-vllm-benchmark-serving",
    image: "/articulos/red-hat-curso-cuantizar-vllm-benchmark-serving.png",
    imageAlt: "Ilustración editorial: un modelo comprimiéndose de BF16 a INT4 y sirviéndose bajo medidores de carga",
    publishedAt: "2026-06-05",
    tags: ["vLLM", "Benchmarks", "Inferencia local", "Herramientas"],
    section: "Herramientas",
    title: "Cuantizar, servir y medir: el curso gratuito de Red Hat para no comprar GPU a ciegas",
    deck: "Red Hat publica un curso práctico para pasar un modelo de BF16 a INT4 con LLM Compressor, servirlo en vLLM y medirlo bajo carga real con GuideLLM. Justo lo que falta antes de dimensionar infraestructura.",
    verdict: "Material útil y honesto: enseña los tradeoffs de la cuantización y a medir el serving (latencia, throughput, coste) en vez de fiarte de un tok/s aislado. Si vas a comprar GPUs o llevar un modelo a producción, hacer este ejercicio primero te ahorra dinero. Open-source y sin humo.",
    sources: [
      ["Red Hat Developers — formación de IA", "https://developers.redhat.com/"],
      ["LLM Compressor (vLLM project)", "https://github.com/vllm-project/llm-compressor"],
      ["Señal en X — @rhdevelopers", "https://x.com/rhdevelopers/status/2062643809435926824"]
    ],
    body: [
      {
        heading: "Qué ofrece",
        text: "Un curso hands-on de Red Hat que cubre la cuantización de BF16 a INT4 con LLM Compressor, el despliegue en vLLM y el benchmarking bajo carga realista con GuideLLM. Toca gestión de memoria, los tradeoffs de precisión de la cuantización, peticiones concurrentes y métricas de serving."
      },
      {
        heading: "Por qué importa para builders",
        text: "La pregunta cara no es '¿qué modelo?', sino '¿cuánta GPU necesito para servirlo a mi carga?'. Cuantizar bien puede meter un modelo en menos VRAM; medir bajo concurrencia real te dice el throughput y el coste por respuesta antes de gastar en hardware."
      },
      {
        heading: "Lo que mide de verdad",
        text: "GuideLLM somete el endpoint a carga concurrente y reporta latencia, throughput y coste, no el tok/s de una sola petición. Esa es la diferencia entre una demo bonita y una estimación de infraestructura sobre la que decidir compras."
      },
      {
        heading: "El sesgo a tener en cuenta",
        text: "Es material de Red Hat y gira en torno a su stack (vLLM, OpenShift AI). La metodología es transferible, pero recuerda que toda formación de fabricante empuja su ecosistema. El método vale; las conclusiones, mídelas en tu caso."
      },
      {
        heading: "Cómo aprovecharlo",
        text: "Coge tu modelo objetivo, cuantízalo con LLM Compressor, sírvelo en vLLM y pásale GuideLLM con un patrón de carga parecido al tuyo. El número que salga —coste por respuesta válida bajo concurrencia— es el que decide qué hardware comprar."
      }
    ]
  },
  {
    slug: "chema-alonso-hacking-asistentes-llm-seguridad",
    image: "/articulos/chema-alonso-hacking-asistentes-llm-seguridad.png",
    imageAlt: "Ilustración editorial: un asistente LLM con una entrada maliciosa colándose entre sus permisos",
    publishedAt: "2026-06-05",
    tags: ["Seguridad", "Agentes", "Europa"],
    section: "Seguridad",
    title: "Hackear asistentes LLM: la seguridad de la IA, contada desde España",
    deck: "Chema Alonso recopila inyección de prompt, jailbreaks y problemas de alineamiento en asistentes como Gemini. Un recordatorio, desde el ecosistema español, de que tu agente es tan seguro como su entrada menos confiable.",
    verdict: "Si pones un asistente o agente LLM delante de usuarios o de datos sensibles, trátalo como superficie de ataque desde el día uno: la inyección de prompt no es teoría. Defiende con mínimo privilegio, validación de salida y desconfianza por defecto. Y de paso, esta divulgación sitúa a la escena española de seguridad IA donde merece.",
    sources: [
      ["El lado del mal — blog de Chema Alonso", "https://www.elladodelmal.com/"],
      ["Hacking IA: Jailbreak, Prompt Injection, Hallucinations & Unalignment (0xWord)", "https://www.elladodelmal.com/2026/02/hacking-ia-jailbreak-prompt-injection.html"],
      ["Señal en X — @chemaalonso", "https://x.com/chemaalonso/status/2062779364710797810"]
    ],
    body: [
      {
        heading: "Qué ha publicado",
        text: "En su blog 'El lado del mal', Chema Alonso recopila técnicas de hacking de asistentes LLM —inyección de prompt, jailbreaks y desalineamiento— con ejemplos prácticos sobre asistentes como Gemini. Se apoya en su libro 'Hacking IA: Jailbreak, Prompt Injection, Hallucinations & Unalignment', publicado en 0xWord."
      },
      {
        heading: "Por qué importa para builders",
        text: "Cualquier agente que lea entradas no confiables —issues, emails, documentos, páginas web— puede ser manipulado para ejecutar acciones o filtrar datos. Lo vimos con el CVE de la GitHub Action de Claude Code; aquí está el cuerpo teórico-práctico que hay detrás de esos ataques."
      },
      {
        heading: "El patrón común",
        text: "El prompt es código que un extraño puede influir. Si tu asistente tiene herramientas (shell, APIs, escritura) y consume entrada externa, la inyección de prompt convierte una conversación en una vía de ataque. No es un bug de un producto: es la forma de la tecnología."
      },
      {
        heading: "El ángulo español y europeo",
        text: "Que esta divulgación venga de la escena española importa para builders del continente: hay comunidad, libros y formación en seguridad de IA en español, no solo papers en inglés. La revista para builders europeos también se nutre de esto."
      },
      {
        heading: "Qué hacer",
        text: "Mínimo privilegio para las herramientas del agente, validación y saneado de la salida, aislar lo que toca secretos, y tratar toda entrada externa como hostil. Probar tú mismo inyecciones contra tu propio asistente es la mejor forma de entender —y reducir— el riesgo."
      }
    ]
  },
  {
    slug: "rag-produccion-tres-fugas-coste-reales",
    image: "/articulos/rag-produccion-tres-fugas-coste-reales.png",
    imageAlt: "Ilustración editorial: una tubería de datos con tres fugas marcadas y un contador de coste",
    publishedAt: "2026-06-05",
    tags: ["RAG", "Inferencia local", "Benchmarks"],
    section: "Análisis",
    title: "RAG en producción: tres fugas que costaban 3.200 $ a la semana (y cómo se taparon)",
    deck: "Un builder documenta el lado caro de RAG que los tutoriales ignoran: conexiones que se filtran, prompts que se hinchan e índices vectoriales que se fragmentan. Con números reales y arreglos concretos.",
    verdict: "Lo que dispara el coste de un RAG en producción no es el modelo: es la fontanería (conexiones, calidad del retrieval, configuración del índice). Antes de cambiar de LLM, mide y arregla tu pipeline. Este caso bajó de 3.300 $ a 1.200 $ a la semana sirviendo 2,8x más peticiones, sin tocar el modelo.",
    sources: [
      ["Kubaik — Leaky RAG: 3 production traps tutorials ignore", "https://kubaik.github.io/leaky-rag-3-prod-traps-tutorials-ignore/"],
      ["Señal en X — @KubaiKevin", "https://x.com/KubaiKevin/status/2062798414971093349"]
    ],
    body: [
      {
        heading: "El problema que nadie tuitea",
        text: "Los tutoriales montan un RAG en 50 líneas, pero en producción, bajo concurrencia, el coste se dispara. Un builder lo documentó con números: 3.200 $ la primera semana en una instancia GPU p3.2xlarge, antes de optimizar nada."
      },
      {
        heading: "Fuga 1: conexiones que no se cierran",
        text: "Chroma con el pooling de LangChain abría 16 procesos worker, cada uno con su contexto CUDA; con 100 peticiones concurrentes, la memoria de GPU se llenaba de contextos muertos y llegaban los OOM y los segfaults. El arreglo: migrar a Qdrant con pooling explícito (tope de 100 conexiones, max_concurrency=10), con lo que la CPU bajó del 70% y los OOM cayeron del 1,2% al 0,02%."
      },
      {
        heading: "Fuga 2: prompts que engordan",
        text: "Sin control de calidad del retrieval, el contexto recuperado es ruidoso y el prompt crece (310 tokens de media) — y la factura del LLM lo sigue. El arreglo: un reranker (cross-encoder bge-reranker-large) filtra el top-20 a lo que de verdad vale y el prompt baja a 155 tokens. Con prefix caching de vLLM, 120 ms menos por petición."
      },
      {
        heading: "Fuga 3: el índice vectorial se fragmenta",
        text: "La configuración HNSW por defecto de Chroma (M=16, efConstruction=200) se fragmenta bajo carga: 1.000 vectores concurrentes disparaban la CPU al 95%, la latencia a 800 ms y el recall caía del 92% al 65%. El arreglo: Qdrant con HNSW afinado (M=32, efConstruction=512) y almacenamiento en disco (build de 6 h a 35 min; memoria de 8 GB a 3,2 GB), más una caché Redis que absorbe el 73% de las consultas a 15 ms. La latencia p95 pasó de 800 ms a 185 ms."
      },
      {
        heading: "La lección sin humo",
        text: "El resultado fue bajar de 3.300 $ a 1.200 $ a la semana sirviendo 2,8x más peticiones, sin cambiar de modelo. Mide tu pipeline —conexiones, tamaño de prompt, recall bajo carga— antes de culpar al LLM o comprar más GPU. El cuello de botella casi nunca es el que parece."
      }
    ]
  },
  {
    slug: "open-llm-vtuber-companero-ia-local-offline",
    image: "/articulos/open-llm-vtuber-companero-ia-local-offline.png",
    imageAlt: "Ilustración editorial: un asistente de escritorio local con capas de LLM, voz y visión, sin nube",
    publishedAt: "2026-06-05",
    tags: ["Ollama", "Modelos locales", "Inferencia local", "Agentes"],
    section: "Análisis",
    title: "Open-LLM-VTuber: un compañero de IA que corre 100% en tu máquina",
    deck: "Un proyecto open-source junta Ollama, voz local (TTS y Whisper) y un avatar animado para un asistente de escritorio sin nube. Buen ejemplo de hasta dónde llega ya el stack local.",
    verdict: "Más allá de lo simpático del avatar, es una demostración concreta de que el stack local —razonar, hablar, escuchar y ver— ya cabe en un portátil sin enviar nada a la nube. Útil como plantilla para asistentes privados; trátalo como base de la que aprender, no como producto terminado.",
    sources: [
      ["Open-LLM-VTuber — repositorio en GitHub", "https://github.com/Open-LLM-VTuber/Open-LLM-VTuber"],
      ["Señal en X — @RituWithAI", "https://x.com/RituWithAI/status/2062780612071801175"]
    ],
    body: [
      {
        heading: "Qué es",
        text: "Un proyecto open-source multiplataforma (macOS, Linux, Windows) que arma un compañero de IA de escritorio 100% offline: LLM vía Ollama, TTS local, transcripción con Whisper local, percepción visual y un modo 'mascota' flotante. Ronda las 7.900 estrellas en GitHub, con soporte para NVIDIA y CPU."
      },
      {
        heading: "Por qué importa para builders",
        text: "Demuestra que el stack local completo —razonar, hablar, escuchar y ver— ya funciona sin nube ni cuotas de API. Para casos con datos sensibles o sin internet fiable, es la prueba de que las piezas existen y encajan."
      },
      {
        heading: "Lo interesante de la arquitectura",
        text: "Cada capa es intercambiable: el LLM por Ollama, la voz por motores TTS locales, el oído por Whisper. Es una plantilla de cómo ensamblar un asistente privado por componentes, no una caja negra; justo lo que un builder necesita para adaptarlo a su caso."
      },
      {
        heading: "El asterisco",
        text: "Un proyecto comunitario joven no es software de producción: la calidad de voz, la latencia y la robustez dependen de tu hardware y de los modelos que elijas. El avatar vende, pero lo valioso es el patrón de ensamblaje local, no la mascota."
      },
      {
        heading: "Qué probar",
        text: "Clónalo, conéctalo a un modelo pequeño en Ollama y a un TTS local, y mide la latencia de voz y el consumo en tu equipo. Es un buen punto de partida para construir un asistente privado a medida sin depender de la nube."
      }
    ]
  },
  {
    slug: "google-magenta-realtime-2-musica-ia-local",
    image: "/articulos/google-magenta-realtime-2-musica-ia-local.png",
    imageAlt: "Ilustración editorial: ondas de audio generándose en tiempo real desde un núcleo en un chip Apple Silicon",
    publishedAt: "2026-06-05",
    tags: ["Apple Silicon", "Modelos locales", "Inferencia local"],
    section: "Modelos",
    title: "Magenta RealTime 2: Google abre un modelo de música que corre en tu Mac",
    deck: "Pesos abiertos para generar música reactiva en tiempo real, con control por MIDI, texto y audio, y ejemplos para DAW y plugins. La IA generativa local se sale del texto.",
    verdict: "Señal de que el 'modelo local' ya no es solo chat: la generación creativa en tiempo real, con pesos abiertos en Apple Silicon, abre productos para músicos y makers. Para builders es un recordatorio de que el stack local sirve para más que LLMs de texto. Mídelo en tu flujo creativo real antes de integrarlo.",
    sources: [
      ["Google Magenta — Magenta RealTime 2", "https://magenta.withgoogle.com/magenta-realtime-2"],
      ["Señal en X — @vinyothiemeb", "https://x.com/vinyothiemeb/status/2062724209277898831"]
    ],
    body: [
      {
        heading: "Qué ha pasado",
        text: "Google publicó Magenta RealTime 2 con pesos abiertos: un modelo de música por IA reactiva, con control por MIDI, texto y audio en tiempo real, y ejemplos para DAW y plugins. Corre en local, incluido Apple Silicon."
      },
      {
        heading: "Por qué importa",
        text: "Amplía el 'modelo local' más allá del texto. Generación creativa en tiempo real, con pesos abiertos y latencia baja, habilita instrumentos y productos que antes dependían de la nube o sencillamente no existían en local."
      },
      {
        heading: "Para quién",
        text: "Músicos, makers y builders de herramientas creativas. Que controles la música por MIDI, texto o audio y que todo corra en tu equipo cambia lo que se puede integrar en un DAW o en un plugin sin enviar nada fuera."
      },
      {
        heading: "El matiz honesto",
        text: "'Tiempo real' depende de tu hardware, y la calidad y el control fino de la música generativa siguen siendo terreno de prueba. Es una base potente, no un sustituto del criterio musical ni un producto cerrado."
      },
      {
        heading: "Qué probar",
        text: "Descárgalo, intégralo en tu DAW o en un prototipo de plugin, y mide latencia y control en tu flujo real. Compáralo con lo que ya usas antes de construir producto encima."
      }
    ]
  },
  {
    slug: "alibaba-open-code-review-agentes-deterministas",
    image: "/articulos/alibaba-open-code-review-agentes-deterministas.png",
    imageAlt: "Ilustración editorial: un diff de código revisado por una capa determinista que acota dónde mira un agente",
    publishedAt: "2026-06-05",
    tags: ["Agentes", "Herramientas", "Seguridad"],
    section: "Herramientas",
    title: "Alibaba abre su revisor de código: por qué mezcla agentes con lógica determinista",
    deck: "Tras dos años revisando el código de decenas de miles de desarrolladores y cazando millones de defectos, Alibaba libera su herramienta. La lección no es 'otro agente', sino cómo combina LLM con ingeniería determinista.",
    verdict: "El patrón vale más que la herramienta: lo determinista (selección de archivos, bundling, reglas) acota dónde mira el LLM, y el agente decide dentro de ese marco. Si montas revisión de código con IA, esta arquitectura híbrida es la que evita el caos. Corre en local con tu propia API; pruébala en tu repo antes de adoptarla.",
    sources: [
      ["Alibaba — open-code-review (GitHub, Apache-2.0)", "https://github.com/alibaba/open-code-review"],
      ["Señal en X — @GrzGik", "https://x.com/GrzGik/status/2062812785663185278"]
    ],
    body: [
      {
        heading: "Qué ha pasado",
        text: "Alibaba ha liberado bajo Apache-2.0 la herramienta de revisión de código que usaba internamente: un CLI que analiza diffs de Git y genera comentarios a nivel de línea. Llevaba dos años en producción sirviendo a decenas de miles de desarrolladores y, según la compañía, cazando millones de defectos."
      },
      {
        heading: "La idea clave: híbrido determinista + agente",
        text: "No deja todo en manos del LLM. Una capa determinista hace la selección precisa de archivos, agrupa los relacionados en unidades aisladas (divide y vencerás en cambios grandes), aplica reglas finas y módulos de posicionamiento y reflexión. Encima, un agente con prompts y herramientas afinadas para revisión toma las decisiones dinámicas."
      },
      {
        heading: "Por qué importa para builders",
        text: "Es justo el antídoto al 'agente que se pierde'. Acotar con lógica determinista dónde mira el modelo —y dejarle decidir solo dentro de ese marco— es lo que hace fiable a un revisor automático. Es un patrón reutilizable mucho más allá del code review."
      },
      {
        heading: "Lo práctico",
        text: "Funciona con las APIs de OpenAI y Anthropic (el ejemplo usa Claude Opus 4.6), corre en local como CLI (NPM o binario) sobre tu repositorio Git, y trae reglas para fallos comunes (NPE, thread-safety, XSS, inyección SQL). Controlas el modelo y los datos."
      },
      {
        heading: "El asterisco honesto",
        text: "'Millones de defectos' es una cifra de Alibaba, sin desglose; y un revisor con IA acelera, no sustituye, el criterio humano. Pruébalo en tu repo, mide los falsos positivos y ajusta las reglas a tu stack antes de confiarle la revisión."
      }
    ]
  },
  {
    slug: "mistral-rs-motor-inferencia-rust-agentic",
    image: "/articulos/mistral-rs-motor-inferencia-rust-agentic.png",
    imageAlt: "Ilustración editorial: un engranaje de óxido (Rust) impulsando un flujo de inferencia veloz",
    publishedAt: "2026-06-05",
    tags: ["Inferencia local", "Modelos locales", "llama.cpp"],
    section: "Análisis",
    title: "mistral.rs: un motor de inferencia en Rust que se declara 'nativamente agéntico'",
    deck: "La versión 0.8.2 de mistral.rs presume de ser hasta 2,79× más rápida que llama.cpp en sus propios benchmarks, con CUDA en GB10, B200 y H100. Otro runtime en Rust que pelea por el serving local.",
    verdict: "mistral.rs es un runtime local serio y polifacético, con orientación agéntica. El '2,79× sobre llama.cpp' es su propio benchmark en hardware concreto: trátalo como techo optimista, no como tu resultado. Mídelo en tu GPU y tu modelo antes de migrar.",
    sources: [
      ["mistral.rs — repositorio en GitHub", "https://github.com/EricLBuehler/mistral.rs"],
      ["Señal en X — @ProfBuehlerMIT", "https://x.com/ProfBuehlerMIT/status/2061770676025856280"]
    ],
    body: [
      {
        heading: "Qué ha pasado",
        text: "mistral.rs, un motor de inferencia escrito en Rust, lanzó la v0.8.2 con soporte CUDA benchmarkeado en GB10, B200 y H100 y mejoras específicas (por ejemplo en Gemma 4 E4B Q8). Se presenta como 'nativamente agéntico' y afirma ser hasta 2,79× más rápido que llama.cpp en sus pruebas."
      },
      {
        heading: "Por qué Rust y por qué importa",
        text: "Como mlxcel en Apple Silicon, mistral.rs apuesta por binarios en Rust para el serving local: menos fricción de entorno, control de bajo nivel y buen rendimiento. Es parte de una ola de runtimes que disputan el terreno a llama.cpp y a Ollama."
      },
      {
        heading: "Lo de 'nativamente agéntico'",
        text: "Orienta la API a flujos de agentes (tool calling y demás) en vez de solo chat. Para quien construye agentes locales, un runtime pensado para eso ahorra pegamento entre piezas."
      },
      {
        heading: "El asterisco del 2,79×",
        text: "Es un número del propio proyecto, en hardware y modelos concretos. Los 'Nx más rápido que llama.cpp' casi nunca se reproducen igual en tu caso: dependen del modelo, la cuantización, el contexto y la GPU. Es señal de que va rápido, no una garantía."
      },
      {
        heading: "Qué probar",
        text: "Si exploras runtimes locales, instálalo y mide TTFT y tok/s con tu modelo y cuantización reales frente a llama.cpp u Ollama en tu GPU. Y vigila la compatibilidad de los modelos que necesitas: la madurez del ecosistema importa tanto como el pico de velocidad."
      }
    ]
  },
  {
    slug: "kanbots-orquestar-agentes-cli-paralelo-kanban",
    image: "/articulos/kanbots-orquestar-agentes-cli-paralelo-kanban.png",
    imageAlt: "Ilustración editorial: un tablero kanban con varias columnas-carril ejecutando agentes en paralelo aislados",
    publishedAt: "2026-06-05",
    tags: ["Agentes", "Herramientas"],
    section: "Herramientas",
    title: "kanbots: un tablero kanban para lanzar 11 agentes de código a la vez",
    deck: "Una herramienta open-source despacha agentes CLI (Claude Code, Codex, Gemini, Cursor) en worktrees de git aislados, coordinados desde un kanban. Orquestar agentes en paralelo empieza a ser un patrón.",
    verdict: "La idea potente no es el tablero: es ejecutar varios agentes en paralelo con aislamiento real de git (un worktree por tarea) para que no se pisen. Orquestar varios multiplica el trabajo… y el caos si no hay aislamiento. Pruébalo en tareas pequeñas e independientes primero; el cuello de botella se moverá a tu capacidad de revisar.",
    sources: [
      ["kanbots — repositorio en GitHub", "https://github.com/leodavinci1/kanbots"],
      ["Señal en X — @CamilleRoux", "https://x.com/CamilleRoux/status/2062776492929544594"]
    ],
    body: [
      {
        heading: "Qué es",
        text: "Una herramienta open-source que convierte un tablero kanban en un orquestador: despacha hasta 11 agentes de CLI (Claude Code, Codex, Gemini, Cursor…) en paralelo, cada uno en su worktree de git aislado. Funciona en modo local (SQLite) o sobre GitHub Issues, con un servidor MCP."
      },
      {
        heading: "Por qué importa para builders",
        text: "El siguiente paso tras 'usar un agente' es 'coordinar varios'. El aislamiento por worktree es la clave: cada agente trabaja en su copia, sin pisar a los demás, y tú revisas y mezclas. Es paralelizar el trabajo sin convertir el repositorio en un campo de batalla."
      },
      {
        heading: "El patrón emergente",
        text: "Ya habíamos visto orquestación de agentes (y sus riesgos de seguridad). kanbots la lleva al flujo visual del kanban, que encaja con cómo los equipos ya gestionan tareas. La novedad es de experiencia de uso y de aislamiento, no de modelo."
      },
      {
        heading: "El asterisco",
        text: "Más agentes en paralelo es más coste, más diffs que revisar y más superficie de error. La autonomía sin revisión es deuda; aquí, multiplicada. El aislamiento ayuda, pero el cuello de botella se mueve a tu capacidad de revisar y mezclar."
      },
      {
        heading: "Qué probar",
        text: "Empieza con tareas pequeñas, independientes y verificables (un test, un refactor acotado), lanza dos o tres agentes y mide cuánto tardas en revisar y mezclar. Si el tiempo de revisión se dispara, has movido el problema, no lo has resuelto."
      }
    ]
  },
  {
    slug: "claude-code-seguridad-guia-anthropic-agentes",
    publishedAt: "2026-06-05",
    tags: ["Seguridad", "Agentes", "Herramientas"],
    section: "Seguridad",
    title: "Agentes con criterio: la guía de seguridad de Claude Code que deberías leer",
    deck: "Anthropic documenta cómo tratar un agente de código como lo que es: un runtime de desarrollador privilegiado. Permisos, deny rules, sandbox, MCP aprobados y OAuth para lo remoto.",
    verdict: "Si das a un agente acceso a tu repo, tu shell o tus secretos, su seguridad es tu responsabilidad, no la suya. La guía de Anthropic es la base mínima: modo plan por defecto, denegar secretos y bash peligroso, aislar en sandbox y aprobar los MCP uno a uno. Léela antes de soltar un agente en CI o en producción.",
    sources: [
      ["Claude Code — documentación de seguridad", "https://code.claude.com/docs/en/security"],
      ["Anthropic — How we contain Claude", "https://www.anthropic.com/engineering/how-we-contain-claude"],
      ["Señal en X — @nowlovepan", "https://x.com/nowlovepan/status/2062801466935673021"]
    ],
    body: [
      {
        heading: "Qué hay",
        text: "Anthropic mantiene documentación de seguridad para Claude Code y un artículo de ingeniería ('How we contain Claude') sobre cómo acotar lo que puede hacer un agente. La tesis es clara: un agente de código es un runtime de desarrollador con privilegios, y hay que tratarlo como tal."
      },
      {
        heading: "Las piezas que importan",
        text: "Modo por defecto o 'plan' antes de actuar; deny rules para secretos y comandos de bash peligrosos; ask rules para efectos privilegiados; bash en sandbox o dev containers; servidores MCP aprobados; hooks gestionados; y, para MCP remotos, OAuth 2.1 (formalizado en la especificación de noviembre de 2025)."
      },
      {
        heading: "Por qué importa para builders",
        text: "Lo vimos con el CVE de la GitHub Action de Claude Code y con la divulgación de Chema Alonso: un agente que consume entrada no confiable y tiene herramientas es superficie de ataque. La inyección de prompt no es teoría, y los secretos del entorno son el botín."
      },
      {
        heading: "El patrón, no el producto",
        text: "Esto aplica a cualquier agente de código (Codex, Cursor y demás), no solo a Claude Code: mínimo privilegio, validación, aislamiento y aprobar explícitamente cada integración MCP. La comodidad de 'que lo haga todo' es justo el riesgo."
      },
      {
        heading: "Qué hacer hoy",
        text: "Revisa qué comandos auto-aprueba tu agente, qué secretos hay en su entorno, qué MCP tiene conectados y si corre en sandbox. Antes de meterlo en CI o producción, haz una validación adversaria: intenta tú mismo que se salga del carril."
      }
    ]
  },
  {
    slug: "cve-mcp-server-claude-analista-seguridad",
    publishedAt: "2026-06-05",
    tags: ["Seguridad", "Agentes", "Herramientas"],
    section: "Herramientas",
    title: "cve-mcp-server: convertir Claude en un analista de vulnerabilidades vía MCP",
    deck: "Un servidor MCP open-source da al agente 27 herramientas de seguridad sobre 21 APIs (CVE, EPSS, CISA KEV, MITRE…), varias sin clave. En vez de 15 pestañas, una pregunta.",
    verdict: "Buen ejemplo de para qué sirve MCP de verdad: en lugar de un chat que 'sabe' de CVEs, un agente que consulta fuentes reales (NVD, EPSS, KEV) y las correlaciona. Que 8 herramientas funcionen sin API key baja la barrera a cero. Útil para triage; el criterio de a qué dar prioridad sigue siendo tuyo.",
    sources: [
      ["cve-mcp-server — repositorio (mukul975)", "https://github.com/mukul975/cve-mcp-server"],
      ["The Cyber Express / CybersecurityNews — análisis", "https://cybersecuritynews.com/cve-mcp-server-and-claude/"],
      ["Señal en X — @itsharmanjot", "https://x.com/itsharmanjot/status/2062803143575101818"]
    ],
    body: [
      {
        heading: "Qué es",
        text: "cve-mcp-server (open-source) es un servidor MCP que da a Claude —en Desktop o en Code— 27 herramientas de inteligencia de seguridad sobre 21 APIs: búsqueda de CVE, scoring EPSS, CISA KEV, MITRE ATT&CK, Shodan, VirusTotal y más, organizadas en cinco categorías."
      },
      {
        heading: "Por qué importa",
        text: "En vez de hacer malabares con 15 pestañas (NVD, EPSS, KEV, Shodan…), preguntas una vez y el agente correlaciona la inteligencia. Es el caso de uso real de MCP: dar al modelo acceso a fuentes en vivo, no que se las invente."
      },
      {
        heading: "El detalle bueno: scoring honesto",
        text: "En lugar de fiarlo todo al CVSS, usa una fórmula que pondera el EPSS al 35% (el mejor predictor de explotación real), más KEV y prueba de concepto. Es exactamente el tipo de criterio 'sin humo' que falta en muchos paneles de vulnerabilidades."
      },
      {
        heading: "Barrera de entrada baja",
        text: "Ocho herramientas funcionan sin ninguna API key (EPSS, CISA KEV, OSV.dev, MITRE, CWE, CVSS y NVD a tasa reducida). Se configura en Claude Desktop y Claude Code de fábrica. Como alternativa gratuita a suites enterprise, es una señal a seguir."
      },
      {
        heading: "El asterisco",
        text: "Un agente que correlaciona inteligencia acelera el triage, no decide por ti qué parchear primero ni sustituye a un analista. Y, como con todo MCP, dale solo las claves que necesita. Pruébalo en tu flujo de vulnerabilidades real antes de fiarte."
      }
    ]
  },
  {
    slug: "frameworks-agentes-separar-senal-de-hype",
    publishedAt: "2026-06-05",
    tags: ["Agentes", "Herramientas", "Benchmarks"],
    section: "Análisis",
    title: "La fiebre de los frameworks de agentes: cómo separar la señal del humo",
    deck: "Cada semana aparece otro framework de agentes 'definitivo', con miles de estrellas y un curso de pago. Una guía para evaluar estas herramientas sin tragarte el marketing — desde una revista que vive de filtrarlo.",
    verdict: "Antes de adoptar un framework de agentes, desconfía de tres cosas: cifras de estrellas implausibles, cuentas que lo promocionan en cadena y la ausencia de fuente primaria reproducible. Lo que vale se mide en tu repo, no en un hilo. La pregunta no es '¿cuántas estrellas?', sino '¿resuelve un problema caro y puedo verificarlo?'.",
    sources: [
      ["Claude Code — documentación de seguridad (ejemplo de fuente primaria)", "https://code.claude.com/docs/en/security"],
      ["cve-mcp-server — repositorio verificable", "https://github.com/mukul975/cve-mcp-server"]
    ],
    body: [
      {
        heading: "Qué está pasando",
        text: "El ecosistema de agentes y MCP crece de verdad —Claude Code, Codex, Cursor, OpenCode— y con él una marea de 'frameworks definitivos'. El problema no es la innovación: es el ruido. En una sola semana hemos visto proyectos anunciados con 140.000 o 200.000 estrellas en GitHub."
      },
      {
        heading: "Por qué esas cifras son una bandera roja",
        text: "Para situarnos: los repositorios más populares del mundo rondan unos pocos cientos de miles de estrellas tras años de uso masivo. Un framework de agentes desconocido que aparece de golpe con 200.000 no es un éxito: es una cifra que no se sostiene. Cuando además llega empaquetado con 'curso completo disponible' y lo promocionan en cadena las mismas cuentas, el patrón es marketing, no señal."
      },
      {
        heading: "Las tres preguntas sin humo",
        text: "¿Hay fuente primaria? (un repo real, un release, un changelog, no un hilo). ¿Es reproducible? (puedes clonarlo y medirlo, o solo te lo cuentan). ¿Resuelve un problema caro y concreto? (o es una capa más sobre lo que ya hace tu agente). Si las tres no se responden, es humo."
      },
      {
        heading: "Cómo lo hacemos aquí",
        text: "En esta revista solo convertimos en artículo lo que tiene fuente primaria verificable. Por eso publicamos la guía de seguridad de Claude Code (docs de Anthropic) o cve-mcp-server (repo real, con licencia), y dejamos en el radar —o fuera— lo que solo trae estrellas y promesas. No es escepticismo por deporte: es respeto por tu tiempo."
      },
      {
        heading: "Qué hacer tú",
        text: "Cuando veas el próximo framework 'que lo cambia todo', clónalo, míralo por dentro y pruébalo en una tarea real antes de integrarlo. Mide lo que te importa (coste, control, fiabilidad). Las estrellas no compilan; tu caso, sí."
      }
    ]
  },
  {
    slug: "ia-local-pymes-que-medir-antes-de-automatizar",
    publishedAt: "2026-06-05",
    tags: ["Empresa", "Inferencia local", "Benchmarks", "Compra"],
    section: "Empresa",
    title: "IA local para pymes: qué medir antes de automatizar",
    deck: "Antes de comprar hardware o elegir modelo, hay cuatro números que deciden si una automatización con IA local sale a cuenta. Ninguno es el que más se tuitea.",
    verdict: "Para una pyme, la pregunta no es '¿qué modelo es mejor?', sino '¿esta automatización sale a cuenta y es fiable?'. Mide coste por respuesta válida, latencia (TTFT), tasa de revisión humana y memoria. Si esos cuatro cuadran, un modelo open-source en local suele ganar a la API en tareas repetidas.",
    sources: [
      ["Kubesimplify — cómo medir runtimes locales (M1 Max)", "https://blog.kubesimplify.com/mlxcel-rust-native-inference-engine-tested-on-m1-max"],
      ["Ollama — ejecutar modelos en local", "https://ollama.com/"]
    ],
    body: [
      {
        heading: "El error de empezar por el modelo",
        text: "Muchas pymes eligen modelo o compran GPU antes de saber qué van a automatizar y cómo medirán si funciona. El orden correcto es el inverso: workflow primero, luego cómo lo mides, después el modelo y solo al final el hardware."
      },
      {
        heading: "Número 1: coste por respuesta válida",
        text: "No el coste por token ni por hora de GPU: cuánto cuesta cada salida que de verdad sirve, descartando las que hay que rehacer. Una API barata con un 30% de respuestas inservibles puede salir más cara que un modelo local 'lento' que acierta."
      },
      {
        heading: "Número 2: latencia que el flujo tolera (TTFT)",
        text: "Para un agente que responde a un cliente en vivo, el tiempo hasta el primer token manda; para un lote nocturno, casi no importa. Mide el TTFT en tu contexto real, no el tok/s de portada de un benchmark ajeno."
      },
      {
        heading: "Número 3: fiabilidad (tasa de revisión humana)",
        text: "¿Cuántas de cada 100 salidas necesita revisar una persona? Esa cifra, y no el benchmark, decide si la automatización ahorra trabajo o lo crea. Mídela con tus datos y tus prompts antes de prometer ahorros."
      },
      {
        heading: "Número 4: memoria, que fija qué cabe",
        text: "La RAM o VRAM decide qué modelo y qué contexto puedes correr en local. Es lo que separa 'cabe' de 'no cabe', y se decide antes de hablar de velocidad. Para una pyme, la memoria suele importar más que los TOPS de una NPU."
      },
      {
        heading: "Por qué la IA local gana en automatización repetida",
        text: "Una vez medido, el trabajo repetido y no urgente —clasificar, extraer, resumir, redactar borradores— es donde un modelo open-source en hardware propio amortiza: sin coste por llamada y con los datos en casa. Este es el marco; el número, lo pones tú con tu caso."
      }
    ]
  },
  {
    slug: "servidor-propio-alquilado-nube-ia-local-pyme",
    publishedAt: "2026-06-05",
    tags: ["Empresa", "Hardware", "Compra", "Inferencia local"],
    section: "Empresa",
    title: "¿Servidor propio, alquilado o nube? La cuenta de la IA local en una pyme",
    deck: "Comprar hardware, alquilar GPU por horas o pagar API: las tres salen a cuenta en casos distintos. La variable que decide es el patrón de uso, no el precio de catálogo.",
    verdict: "Uso esporádico o muy variable: nube/API. Carga sostenida y repetida con datos sensibles: hardware propio amortiza. Cargas grandes puntuales (fine-tuning, lotes): GPU alquilada por horas. Calcula el coste a 12-24 meses con tu volumen real antes de comprar nada.",
    sources: [
      ["Apple Mac Studio (opción de compra)", "https://www.apple.com/mac-studio/"],
      ["NVIDIA DGX Spark (opción de compra)", "https://www.nvidia.com/en-us/products/workstations/dgx-spark/"]
    ],
    body: [
      {
        heading: "Las tres opciones, en una frase",
        text: "Comprar (CapEx, control total, amortizas con uso), alquilar GPU por horas (OpEx flexible, ideal para picos y cargas grandes puntuales) o pagar API (cero infraestructura, coste por uso que escala con el volumen). No hay una ganadora absoluta: hay una ganadora para tu patrón."
      },
      {
        heading: "La variable que decide: patrón de uso",
        text: "No es el precio por hora ni por token aislado, sino cuántas horas reales de cómputo usas al mes y cómo se distribuyen. Uso constante favorece comprar; uso en picos, alquilar; uso esporádico, API."
      },
      {
        heading: "Hardware propio: cuándo amortiza",
        text: "Carga sostenida y repetida (automatizaciones diarias, RAG interno, asistentes), datos que no deben salir de la empresa y un horizonte de uno o dos años. Un equipo con memoria suficiente para tu modelo paga su precio si lo usas de verdad."
      },
      {
        heading: "GPU alquilada por horas: el punto medio",
        text: "Para fine-tuning, lotes pesados o probar modelos grandes sin comprar, alquilar GPU (RunPod, Vast, hyperscalers) evita el CapEx. Pagas solo cuando computas: ideal para cargas puntuales e intensas que no justifican un servidor propio parado el resto del tiempo."
      },
      {
        heading: "Nube/API: cuándo gana",
        text: "Volumen bajo o muy variable, sin equipo técnico para operar infraestructura, o cuando necesitas el último modelo cerrado el día de su lanzamiento. Si usas poco, el coste por respuesta válida de una API puede ser imbatible."
      },
      {
        heading: "Cómo hacer la cuenta",
        text: "Estima tus horas o tokens reales al mes, multiplícalos por 12-24 meses e incluye el coste oculto de operar (electricidad, mantenimiento, tu tiempo). Compara las tres opciones con tu número, no con el de un hilo. Casi siempre la respuesta es 'depende del uso', y por eso hay que medirlo."
      }
    ]
  },
  {
    slug: "gemma-4-12b-cuanto-rinde-en-cada-hardware",
    publishedAt: "2026-06-05",
    tags: ["Empresa", "Inferencia local", "Benchmarks", "Hardware"],
    section: "Benchmark",
    title: "Gemma 4 12B en local: cuánto rinde en cada hardware (con números)",
    deck: "El modelo open-source de la semana corre a velocidad de uso diario tanto en un Mac de gama alta como en una RTX 3060 de 12 GB. Reunimos las mediciones y lo que dicen para tu compra.",
    verdict: "Para una pyme, la conclusión es liberadora: un 12B útil cabe y rinde (~21-36 tok/s) en hardware que ya tienes o que cuesta poco —una RTX 3060 de 12 GB o un Mac con memoria suficiente—. La cuantización es la palanca: Q4/Q5 dan el mejor equilibrio VRAM/velocidad. Mide con tu prompt real, pero el techo de entrada es bajo.",
    sources: [
      ["seapy — Gemma 4 12B en Mac Studio (medición verificada)", "https://seapy.com/gemma4-12b-mac-studio-local-serving/"],
      ["Hugging Face — google/gemma-4-12B", "https://huggingface.co/google/gemma-4-12B"],
      ["Señal en X — @ItsmeAjayKV (RTX 3060, sin verificar)", "https://x.com/ItsmeAjayKV/status/2062542245719572577"],
      ["Señal en X — @analogalok (RTX 4060, sin verificar)", "https://x.com/analogalok/status/2062237722820128987"]
    ],
    body: [
      {
        heading: "Qué hemos reunido",
        text: "Tras el lanzamiento de Gemma 4 12B, varios builders publicaron mediciones del mismo modelo en hardware distinto. Las juntamos para ver el patrón, marcando qué está verificado (la del Mac, con guía y blog) y qué es un reporte suelto de X. La gráfica comparativa está en la sección Empresa."
      },
      {
        heading: "Apple Silicon: ~33-36 tok/s y poca RAM",
        text: "En un Mac Studio M4 Max (64 GB), servido con MLX, da ~33 tok/s ocupando solo 14 GB —medición verificada con pasos de instalación—. Con llama.cpp y Metal, otro reporte da ~36 tok/s y ~10 GB de RAM. Es velocidad de uso diario con memoria de sobra para multitarea."
      },
      {
        heading: "RTX 3060 12 GB: la sorpresa",
        text: "Una GPU de consumo barata sostiene el 12B. En Q5_K_XL, ~33,3 tok/s con 9,3 GB de VRAM; en Q6_K_XL, 26 tok/s; e incluso Q8 con offload parcial, 14,9 tok/s. El prefill ronda los 1.000-1.150 tok/s. La 3060 sigue viva en 2026 (estas cifras son reportes de X, sin método publicado)."
      },
      {
        heading: "La cuantización manda",
        text: "El mismo modelo pasa de 14,9 a ~36 tok/s según la cuantización y el hardware. Q4 y Q5 son el sweet spot: caben en 12 GB, van rápidos y mantienen calidad razonable. Subir a Q8 cuesta velocidad sin tanta mejora perceptible para la mayoría de tareas."
      },
      {
        heading: "Qué significa para tu empresa",
        text: "No necesitas una GPU de datacenter para automatizar con un 12B open-source en local. Una RTX 3060 de 12 GB o un Mac con memoria suficiente bastan para tareas reales (clasificar, extraer, redactar borradores). Mide TTFT y calidad con tu caso, pero la barrera de entrada es baja —y eso cambia la cuenta frente a la nube."
      }
    ]
  },
  {
    slug: "mac-mini-m4-agentes-breakeven-coste-empresa",
    publishedAt: "2026-06-05",
    tags: ["Empresa", "Compra", "Hardware", "Inferencia local"],
    section: "Empresa",
    title: "¿Compensa un Mac Mini para automatizar con agentes? La cuenta del breakeven",
    deck: "Un caso que circula afirma sustituir 170 $ de API en 10 días por un Mac Mini M4 de ~600 $, con breakeven en ~36 días. La idea es buena; los números, para mirarlos con lupa.",
    verdict: "El marco es correcto: para uso intensivo y sostenido de agentes, un equipo barato amortiza rápido frente a una API que cobra por uso. Pero ojo con las cifras del caso —un '700 tok/s' en Mac Mini M4 no cuadra para un LLM real—. Haz tu propia cuenta con tu volumen y tu modelo; la conclusión (comprar gana con uso alto) suele sostenerse aunque los números del hilo no.",
    sources: [
      ["Apple — Mac mini", "https://www.apple.com/mac-mini/"],
      ["Señal en X — @L1vsun (caso de coste, sin verificar)", "https://x.com/L1vsun/status/2062197031490171135"]
    ],
    body: [
      {
        heading: "El caso, en una frase",
        text: "Alguien afirma que su factura de API de un agente de código (170 $ en 10 días) la sustituyó por un Mac Mini M4 de ~600 $ una sola vez, con un breakeven de unos 36 días y sin límites de uso."
      },
      {
        heading: "Por qué el marco es sólido",
        text: "Es exactamente la lógica de 'servidor propio frente a nube': para carga sostenida y repetida, el CapEx de un equipo barato amortiza frente al coste por uso de una API. A 170 $ cada 10 días, el gasto anualizado supera con creces el precio del Mac Mini."
      },
      {
        heading: "Por qué las cifras piden lupa",
        text: "El caso menciona ~700 tok/s en un Mac Mini M4. Para un LLM real, esa velocidad no cuadra con ese hardware (sería propio de un modelo diminuto o de una métrica mal medida). Cuando un número no encaja con la física conocida, desconfía aunque la conclusión te guste."
      },
      {
        heading: "Cómo hacer TU cuenta",
        text: "Coge tu gasto real de API al mes, el precio del equipo y el coste de operarlo (electricidad, tu tiempo). Calcula el breakeven con tu volumen, no con el del hilo. Y comprueba que el modelo que necesitas corre a velocidad usable: los 33-36 tok/s de un 12B en Mac son realistas; los 700, no."
      },
      {
        heading: "El veredicto para una pyme",
        text: "Comprar hardware para automatizar gana cuando el uso es alto, constante y con datos que prefieres en casa. El caso del Mac Mini apunta en la dirección correcta; solo cámbiale los números por los tuyos antes de pasar por caja."
      }
    ]
  },
  {
    slug: "arquitectura-hibrida-local-nube-ia-empresa",
    publishedAt: "2026-06-05",
    tags: ["Empresa", "Inferencia local", "Modelos locales"],
    section: "Empresa",
    title: "Pequeño en local, grande en la nube: la arquitectura híbrida que abarata la IA en empresa",
    deck: "Los sistemas de IA en producción no eligen entre local y nube: combinan un modelo pequeño local para lo sensible y barato con uno grande en la nube para lo pesado. Así se controla coste y datos.",
    verdict: "La pregunta 'local o nube' es falsa: en producción la respuesta es 'las dos, por capas'. Un modelo pequeño local filtra, clasifica y maneja lo sensible (datos en casa, coste cero por llamada); el frontier en la nube se reserva para lo que de verdad lo necesita. Diseña el enrutado por tarea y mide cuántas llamadas a la API cara evitas.",
    sources: [
      ["Señal en X — @patilvishi (patrón de arquitectura)", "https://x.com/patilvishi/status/2062015569315147871"],
      ["Hugging Face — modelos abiertos para la capa local", "https://huggingface.co/models"]
    ],
    body: [
      {
        heading: "El patrón real",
        text: "Los sistemas de IA en producción no son 'un modelo': son capas (orquestador, RAG, herramientas, memoria, guardrails, validación). Y cada vez más reparten el trabajo entre un modelo pequeño local y uno grande en la nube según la tarea."
      },
      {
        heading: "Por qué híbrido y no uno solo",
        text: "El modelo local pequeño se encarga de lo frecuente, lo sensible y lo barato (clasificar, enrutar, extraer, manejar datos que no deben salir). El frontier en la nube se reserva para el razonamiento pesado que el pequeño no resuelve. Pagas la nube solo cuando hace falta."
      },
      {
        heading: "El beneficio para una pyme",
        text: "Baja la factura de tokens (muchas llamadas se quedan en local, gratis) y mejora la residencia del dato (lo sensible no viaja). Es control de coste y de cumplimiento sin renunciar a la potencia cuando se necesita."
      },
      {
        heading: "El coste oculto: la orquestación",
        text: "Un híbrido es más piezas que mantener (enrutado, fallback, validación). El ahorro es real, pero hay que diseñarlo: decidir qué tarea va a qué modelo y medir que el local acierta lo suficiente como para no acabar reenviándolo todo a la nube."
      },
      {
        heading: "Cómo empezar",
        text: "Identifica las tareas frecuentes y de bajo riesgo y prueba a resolverlas con un modelo pequeño local (un 12B como Gemma 4 cabe en hardware modesto, como hemos medido). Enruta a la nube solo lo que el local falle. Mide el porcentaje de llamadas que evitas: ese número es tu ahorro."
      }
    ]
  }
];

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}
