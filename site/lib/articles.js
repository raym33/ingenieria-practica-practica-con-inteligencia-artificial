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
  }
];

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug);
}
