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
    </main>
  );
}
