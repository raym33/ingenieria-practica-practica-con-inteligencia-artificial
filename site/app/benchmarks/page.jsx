import { getRadarItems } from "../../lib/content";
import Link from "next/link";
import { articles } from "../../lib/articles";

export const metadata = {
  title: "Benchmarks IA | De preguntar a construir"
};

const metrics = [
  ["TTFT", "Tiempo hasta el primer token. Si es alto, la app se siente lenta aunque luego genere rápido."],
  ["Prefill", "Velocidad procesando prompt/contexto. Es el cuello de botella en RAG y contextos largos."],
  ["Decode", "Tokens por segundo generados. Útil, pero insuficiente como métrica única."],
  ["RAM/VRAM", "Memoria real usada por pesos, KV cache, runtime y resto del sistema."],
  ["Contexto real", "Ventana que puedes usar con calidad y latencia aceptables, no solo máximo anunciado."],
  ["Coste útil", "Coste por respuesta válida, incluyendo retries, tools, logs y revisión humana."]
];

const benchmarkRules = [
  "Publica modelo exacto, formato, cuantización y fuente.",
  "Publica runtime, versión, backend y flags.",
  "Separa prompt corto, prompt largo y RAG.",
  "Mide TTFT, prefill y decode por separado.",
  "Anota RAM/VRAM antes, durante y después.",
  "Incluye temperatura, consumo o throttling si es laptop.",
  "No compares Apple/NVIDIA/AMD sin mismo modelo, contexto y tarea.",
  "Distingue laboratorio, daily driver y serving multiusuario."
];

export default function BenchmarksPage() {
  const benchmarkArticles = articles.filter((article) => article.section === "Benchmarks");
  const items = getRadarItems()
    .filter((item) => (item.tags || []).some((tag) => ["benchmark-local", "benchmark", "ttft", "hardware", "kv-cache", "inferencia"].includes(tag)))
    .slice(0, 12);

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Benchmarks</div>
            <h1>Métricas prácticas para decidir hardware, runtime y modelo</h1>
            <p className="section-lead">
              Un benchmark útil no es una captura de tokens/s. Es una ficha reproducible que permite saber si un stack sirve para tu producto, tu portátil o tu cliente.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="metric-strip">
          {metrics.map(([name, text]) => (
            <article key={name}>
              <strong>{name}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {benchmarkArticles.length ? (
        <section className="section shell compact-section">
          <div className="section-header">
            <div>
              <div className="eyebrow">Análisis</div>
              <h2>Cómo leer benchmarks sin autoengañarte</h2>
            </div>
          </div>
          <div className="article-grid">
            {benchmarkArticles.map((article) => (
              <Link className="editorial-card" href={`/articulos/${article.slug}/`} key={article.slug}>
                <span>{article.section}</span>
                <h2>{article.title}</h2>
                <p>{article.deck}</p>
                <strong>{article.verdict}</strong>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section shell compact-section">
        <div className="front-grid">
          <div>
            <div className="panel-heading"><span>Señales recientes con métricas</span></div>
            <div className="radar-list">
              {items.map((item) => (
                <article className="radar-item" key={item.id || item.url || item.title}>
                  <div className="radar-meta"><span>{item.sourceName || "Radar"}</span><span>{item.relevance || "vigilar"}</span></div>
                  <h3>{item.title}</h3>
                  <p>{formatSummary(item)}</p>
                  <div>{(item.tags || []).slice(0, 8).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                  {item.url ? <div className="meta-row"><a href={item.url}>Fuente</a><span>{item.editorialAction || "revisar"}</span></div> : null}
                </article>
              ))}
            </div>
          </div>
          <aside className="side-rail">
            <div className="panel-heading"><span>Checklist</span></div>
            {benchmarkRules.map((rule) => <p className="check-row" key={rule}>{rule}</p>)}
          </aside>
        </div>
      </section>
    </main>
  );
}

function formatSummary(item) {
  const text = String(item.summary || item.rawSummary || "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 300) return text;
  return `${text.slice(0, 300).replace(/\s+\S*$/, "")}...`;
}
