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
  }
];

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}
