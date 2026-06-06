import Link from "next/link";
import { articles } from "../../lib/articles";
import { getChapters, getModelItems, getRadarItems } from "../../lib/content";

export const metadata = {
  title: "Ediciones | De preguntar a construir"
};

const issueBlueprints = [
  {
    number: "004",
    date: "Semana del 4 jun 2026",
    title: "Europa quiere su IA — y los benchmarks bajan al ring",
    deck: "Mistral, JUPITER y las gigafactorías marcan la apuesta soberana europea. Mientras, los builders exprimen multi-3090, llega Gemma 4 con GGUF el día 1 y un CVE recuerda que un agente en CI es superficie de ataque.",
    theme: "Europa, inferencia local y seguridad",
    articleSlugs: [
      "mistral-ia-soberana-europa-builders",
      "jupiter-gigafactorias-ia-europa",
      "tinybird-datos-tiempo-real-ia-espana",
      "claude-code-github-action-inyeccion-prompt-vuln",
      "multi-rtx-3090-tensor-parallel-benchmarks-x",
      "gemma-4-12b-modelo-local-gguf-dia-1"
    ],
    sections: ["Europa", "Seguridad", "Benchmarks", "Modelos"]
  },
  {
    number: "003",
    date: "4 junio 2026",
    title: "El PC de IA local entra en fase seria",
    deck: "Foundry Local, Ryzen AI Halo, Snapdragon X2, RTX Spark y MLX hacen que comprar hardware para IA exija más criterio que nunca.",
    theme: "Hardware, software local y compra",
    articleSlugs: [
      "foundry-local-windows-ia-pc-builder",
      "ryzen-ai-halo-strix-halo-compra-llm-local",
      "snapdragon-x2-ai-pc-npu-no-es-llm-server",
      "rtx-spark-pc-agentico-que-significa"
    ],
    sections: ["Guías compra", "Inferencia", "Modelos", "Benchmarks"]
  },
  {
    number: "002",
    date: "4 junio 2026",
    title: "Inferencia práctica para builders",
    deck: "Ollama con MLX, Docker/vLLM en macOS, AMD con ROCm/Vulkan y benchmarks que separan demos de decisiones reales.",
    theme: "Runtimes, benchmarks y laboratorios",
    articleSlugs: [
      "ollama-mlx-apple-silicon-cambio-real",
      "docker-vllm-macos-laboratorio-serving",
      "amd-rocm-vulkan-llamacpp-inferencia",
      "benchmarks-llm-que-medir"
    ],
    sections: ["Inferencia", "Benchmarks", "Stack IA local", "Labs"]
  },
  {
    number: "001",
    date: "3 junio 2026",
    title: "De guía de conceptos a revista técnica",
    deck: "La primera edición fija la tesis: construir con IA requiere una referencia básica, radar, fuentes, labs, versiones y criterio editorial.",
    theme: "Conceptos de IA, RAG, agentes y producto",
    articleSlugs: [
      "copilot-pc-no-es-workstation-llm",
      "apple-silicon-vs-nvidia-inferencia-local",
      "ollama-seguridad-servidor-local",
      "de-idea-a-saas-ia-con-agentes"
    ],
    sections: ["Revista", "Artículos", "SaaS IA", "Biblioteca"]
  }
];

export default function EdicionesPage() {
  const chapters = getChapters();
  const radar = getRadarItems();
  const models = getModelItems();
  const featuredChapters = [
    chapters.find((chapter) => chapter.file === "09-capitulo-8-hardware-real-para-ia-local.md"),
    chapters.find((chapter) => chapter.file === "31-capitulo-30-laboratorio-de-implementacion.md"),
    chapters.find((chapter) => chapter.file === "35-capitulo-34-costes-latencia-y-rendimiento.md")
  ].filter(Boolean);

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Ediciones</div>
            <h1>Números conservables de una revista viva</h1>
            <p className="section-lead">
              La web cambia a diario, pero cada edición deja una foto editorial: tema de portada, dossier,
              guías, señales y próximos bancos de prueba. Esto permite publicar sin perder lo antiguo.
            </p>
          </div>
          <Link className="button primary" href="/revista/">Número actual</Link>
        </div>
        <div className="stats">
          <div className="stat"><strong>{issueBlueprints.length}</strong><span>ediciones</span></div>
          <div className="stat"><strong>{articles.length}</strong><span>artículos editoriales</span></div>
          <div className="stat"><strong>{radar.length}</strong><span>señales radar</span></div>
          <div className="stat"><strong>{models.length}</strong><span>modelos vigilados</span></div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="issue-stack">
          {issueBlueprints.map((issue) => (
            <article className="issue-card" key={issue.number}>
              <div className="issue-card-main">
                <div className="issue-number">Número {issue.number}</div>
                <span>{issue.date} · {issue.theme}</span>
                <h2>{issue.title}</h2>
                <p>{issue.deck}</p>
                <div className="topic-cloud">
                  {issue.sections.map((section) => <span key={section}>{section}</span>)}
                </div>
              </div>
              <div className="issue-card-side">
                <div className="panel-heading"><span>Dossier</span></div>
                {issue.articleSlugs.map((slug) => {
                  const article = articles.find((item) => item.slug === slug);
                  if (!article) return null;
                  return (
                    <Link className="headline-item" href={`/articulos/${article.slug}/`} key={article.slug}>
                      <strong>{article.title}</strong>
                      <span>{article.section}</span>
                    </Link>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="front-grid">
          <div>
            <div className="section-header">
              <div>
                <div className="eyebrow">Taller permanente</div>
                <h2>Capítulos que sostienen todos los números</h2>
              </div>
              <Link className="text-link" href="/biblioteca/">Biblioteca</Link>
            </div>
            <div className="story-grid">
              {featuredChapters.map((chapter) => (
                <Link className="story-card" href={`/leer/${chapter.slug}/`} key={chapter.slug}>
                  <span>{chapter.readingTime} min</span>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
          <aside className="side-rail">
            <div className="panel-heading"><span>Regla editorial</span></div>
            {[
              "Toda edición debe tener portada, dossier y fuentes.",
              "Las señales de X o Reddit pasan por contexto antes de publicarse.",
              "Las guías de compra exigen prueba mínima y límites claros.",
              "Los números antiguos deben seguir siendo enlazables."
            ].map((rule) => <p className="check-row" key={rule}>{rule}</p>)}
          </aside>
        </div>
      </section>
    </main>
  );
}
