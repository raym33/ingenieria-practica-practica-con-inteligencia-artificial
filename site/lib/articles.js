export const articles = [
  {
    slug: "copilot-pc-no-es-workstation-llm",
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
    publishedAt: "2026-04-29",
    tags: ["RAG","Ollama","Modelos locales","Inferencia local"],
    section: "Reddit Lab",
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
    publishedAt: "2026-05-02",
    tags: ["NVIDIA RTX","Hardware","Inferencia local","Compra"],
    section: "Productos IA",
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
    publishedAt: "2026-05-05",
    tags: ["Benchmarks","Inferencia local","Modelos locales"],
    section: "Benchmarks",
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
    publishedAt: "2026-05-09",
    tags: ["SaaS","Agentes","Compra"],
    section: "SaaS IA",
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
    publishedAt: "2026-05-12",
    tags: ["Agentes","SaaS","Modelos locales"],
    section: "Herramientas IA",
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
    publishedAt: "2026-05-15",
    tags: ["Ollama","MLX","Apple Silicon","Inferencia local"],
    section: "Inferencia local",
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
    publishedAt: "2026-05-18",
    tags: ["vLLM","Apple Silicon","Inferencia local","Modelos locales"],
    section: "Software IA",
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
    publishedAt: "2026-05-21",
    tags: ["AMD","llama.cpp","Inferencia local","Hardware"],
    section: "Hardware IA",
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
    publishedAt: "2026-05-24",
    tags: ["NVIDIA RTX","Agentes","Hardware","Compra"],
    section: "Productos IA",
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
    publishedAt: "2026-05-28",
    tags: ["Modelos locales","Inferencia local","Compra"],
    section: "Software IA",
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
    publishedAt: "2026-05-31",
    tags: ["AMD","Hardware","Compra","Inferencia local"],
    section: "Hardware IA",
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
  }
];

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}
