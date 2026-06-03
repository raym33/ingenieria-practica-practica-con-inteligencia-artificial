import Link from "next/link";
import { getModelItems } from "../../lib/content";

export const metadata = {
  title: "Modelos | De preguntar a construir"
};

export default function ModelosPage() {
  const models = getModelItems();
  const local = models.filter((item) => hasAny(item, ["gguf", "mlx", "modelos-locales", "cuantizacion"])).slice(0, 12);
  const rag = models.filter((item) => hasAny(item, ["embeddings", "reranking", "rag"])).slice(0, 8);
  const general = models.filter((item) => !local.includes(item) && !rag.includes(item)).slice(0, 16);

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Radar de modelos</div>
            <h1>Modelos recientes para builders</h1>
            <p className="section-lead">
              Señales de Hugging Face y del radar editorial para seguir modelos de texto, GGUF, MLX, embeddings, rerankers y opciones locales.
              No es un leaderboard: es una bandeja de vigilancia para decidir qué probar.
            </p>
          </div>
          <Link className="button primary" href="/leer/06-capitulo-5-como-elegir-un-modelo/">Cómo elegir modelo</Link>
        </div>
        <div className="stats">
          <div className="stat"><strong>{models.length}</strong><span>señales de modelos</span></div>
          <div className="stat"><strong>{local.length}</strong><span>local / GGUF / MLX</span></div>
          <div className="stat"><strong>{rag.length}</strong><span>RAG / embeddings</span></div>
          <div className="stat"><strong>HF</strong><span>actualización automática</span></div>
        </div>
      </section>

      <ModelSection title="Local, GGUF, MLX y cuantización" items={local} />
      <ModelSection title="Embeddings, reranking y RAG" items={rag} />
      <ModelSection title="Más modelos recientes" items={general} />
    </main>
  );
}

function ModelSection({ title, items }) {
  if (!items.length) return null;
  return (
    <section className="section shell compact-section">
      <div className="panel-heading"><span>{title}</span></div>
      <div className="model-grid">
        {items.map((item) => <ModelCard item={item} key={item.id || item.url || item.title} />)}
      </div>
    </section>
  );
}

function ModelCard({ item }) {
  return (
    <article className="model-card">
      <div className="radar-meta">
        <span>{item.sourceType === "huggingface-model" ? "Hugging Face" : item.sourceName || "Radar"}</span>
        <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("es-ES") : "reciente"}</span>
      </div>
      <h2>{item.title}</h2>
      <p>{formatSummary(item)}</p>
      <div>{(item.tags || []).slice(0, 7).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <div className="meta-row">
        {item.url ? <a href={item.url}>Abrir modelo</a> : <span>Sin URL</span>}
        <span>{item.relevance || "pendiente"}</span>
      </div>
    </article>
  );
}

function hasAny(item, tags) {
  return tags.some((tag) => (item.tags || []).includes(tag));
}

function formatSummary(item) {
  const text = String(item.summary || item.rawSummary || "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[#*_`>~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 260) return text;
  return `${text.slice(0, 260).replace(/\s+\S*$/, "")}...`;
}
