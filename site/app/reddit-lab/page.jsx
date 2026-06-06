export const metadata = {
  title: "Reddit Lab | De preguntar a construir"
};

const communities = [
  ["LocalLLaMA", "Modelos locales, GGUF, cuantización, Mac Studio, GPUs consumer."],
  ["ollama", "Instalaciones reales, errores, modelos que cargan o fallan."],
  ["selfhosted", "RAG privado, automatizaciones, servidores caseros y costes."],
  ["MachineLearning", "Papers, técnicas, benchmarks y discusión técnica."],
  ["ClaudeAI / OpenAI", "Uso real de agentes de código, límites, workflows y coste."],
  ["SaaS", "Ideas de negocio, validación, pricing y automatizaciones con IA."]
];

const labIdeas = [
  {
    title: "Cuánta VRAM necesitas para 7B, 14B, 32B y 70B",
    text: "Recolectar posts con modelo, cuantización, contexto, tokens/s, RAM/VRAM, runtime y temperatura. Convertirlo en tabla reproducible."
  },
  {
    title: "Setups caseros para IA local",
    text: "Comparar Mac mini, Mac Studio, RTX 3060/3090/4090, RX 7900 XTX, mini PCs y servidores usados."
  },
  {
    title: "RAG self-hosted que funciona",
    text: "Buscar stacks reales con Qdrant, pgvector, Ollama, Open WebUI, n8n y permisos."
  },
  {
    title: "MicroSaaS con IA que no son humo",
    text: "Detectar ideas con usuarios reales, costes controlables y workflows repetibles."
  }
];

const redditSignals = [
  {
    title: "RAG local pequeño: SQLite, embeddings locales y Ollama",
    source: "r/selfhosted",
    text: "Una señal recurrente: para bases documentales pequeñas, no hace falta empezar con arquitectura pesada. SQLite o memoria, embeddings locales y Ollama pueden bastar para un primer buscador privado.",
    lesson: "Antes de montar Kubernetes o vector DB compleja, mide tamaño de corpus, permisos y latencia esperada."
  },
  {
    title: "eGPU AMD + Ollama/Open WebUI como estación casera",
    source: "r/selfhosted",
    text: "Usuarios reportan mini PCs con OCuLink/eGPU, RX 7900 XTX, ROCm y Open WebUI ejecutando modelos tipo Mistral Small/Devstral con experiencia cómoda.",
    lesson: "AMD puede tener buena relación coste/rendimiento, pero exige validar drivers, backend y estabilidad."
  },
  {
    title: "RAG empresarial con Ollama no es solo conectar documentos",
    source: "r/ollama",
    text: "Las preguntas reales giran alrededor de chunking, número de resultados, búsqueda híbrida, Open WebUI, LangChain y control del pipeline.",
    lesson: "El valor del RAG está en retrieval, permisos, evaluación y UX, no en decir 'conecté documentos'."
  },
  {
    title: "Mac Studio para IA local: memoria sí, velocidad depende del modelo",
    source: "r/LocalLLaMA",
    text: "Las discusiones sobre Mac Studio muestran entusiasmo por memoria unificada, pero también dudas sobre MLX vs GGUF, cuantización y tokens/s frente a GPUs NVIDIA.",
    lesson: "Publicar Mac como laboratorio de memoria; no venderlo como sustituto universal de CUDA."
  }
];

const redditSources = [
  ["Local RAG sin cloud embeddings", "https://www.reddit.com/r/selfhosted/comments/1pkttll/made_my_rag_setup_actually_local_no_openai_no/"],
  ["Self-hosted AI setups", "https://www.reddit.com/r/selfhosted/comments/1lvn497/selfhosted_ai_setups_curious_how_people_here/"],
  ["RAG con Ollama y OpenWebUI", "https://www.reddit.com/r/ollama/comments/1kfknqf/local_llm_with_ollama_openwebui_and_database_with/"],
  ["Mac Studio para local AI", "https://www.reddit.com/r/LocalLLaMA/comments/1siwv8o/a_mac_studio_for_local_ai_6_months_later/"],
  ["MacBook M4 Max throughput MLX", "https://www.reddit.com/r/LocalLLaMA/comments/1i7b3r1/i_did_a_quick_test_of_macbook_m4_max_128_gb/"]
];

export default function RedditLabPage() {
  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Reddit Lab</div>
            <h1>Implementaciones reales, métricas y problemas de campo</h1>
            <p className="section-lead">
              Reddit no será fuente final única, pero sí laboratorio de señales: tokens/s, errores, hardware usado, consumo de memoria, coste y trucos que no aparecen en notas de prensa.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="magazine-shelf">
          {communities.map(([name, text]) => (
            <article className="shelf-card accent-teal" key={name}>
              <span>Comunidad</span>
              <strong>r/{name}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Labs editoriales</div>
            <h2>Qué vamos a extraer de Reddit</h2>
          </div>
        </div>
        <div className="article-grid">
          {labIdeas.map((item) => (
            <article className="editorial-card" key={item.title}>
              <span>Investigación</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <strong>Salida esperada: artículo, tabla y checklist reproducible.</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Señales redactadas</div>
            <h2>Lo que Reddit ya está enseñando sobre IA local</h2>
          </div>
        </div>
        <div className="article-grid">
          {redditSignals.map((signal) => (
            <article className="editorial-card" key={signal.title}>
              <span>{signal.source}</span>
              <h2>{signal.title}</h2>
              <p>{signal.text}</p>
              <strong>{signal.lesson}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="source-box">
          <h2>Fuentes Reddit para revisar</h2>
          {redditSources.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </div>
      </section>
    </main>
  );
}
