export const articles = [
  {
    slug: "copilot-pc-no-es-workstation-llm",
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
  }
];

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}
