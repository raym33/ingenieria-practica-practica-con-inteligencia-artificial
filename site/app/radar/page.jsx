import { getRadarItems } from "../../lib/content";

export const metadata = {
  title: "Radar | De preguntar a construir"
};

export default function RadarPage() {
  const items = getRadarItems();
  const high = items.filter((item) => item.relevance === "alta").slice(0, 6);
  const medium = items.filter((item) => item.relevance !== "alta").slice(0, 12);
  const topTags = [...new Set(items.flatMap((item) => item.tags || []))].slice(0, 14);
  const lead = items[0];

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Radar editorial</div>
            <h1>Señales que pueden cambiar el libro</h1>
            <p className="section-lead">
              Modelos, repos, papers, herramientas, hardware y prácticas que merecen seguimiento antes de convertirlas en capítulo, lab o checklist.
            </p>
          </div>
        </div>
        <div className="topic-cloud">
          {topTags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </section>

      {lead && (
        <section className="shell radar-lead">
          <article>
            <span className="story-label">Señal principal</span>
            <h2>{lead.title}</h2>
            <p>{formatSummary(lead, 420)}</p>
            <div>{(lead.tags || []).slice(0, 8).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            {lead.url && <a className="text-link" href={lead.url}>Abrir fuente</a>}
          </article>
        </section>
      )}

      <section className="section shell">
        <div className="front-grid">
          <div>
            <div className="panel-heading"><span>Alta prioridad</span></div>
            <div className="radar-list">
              {(high.length ? high : items.slice(0, 6)).map((item) => <RadarCard item={item} key={item.id || item.url || item.title} />)}
            </div>
          </div>
          <aside className="side-rail">
            <div className="panel-heading"><span>Seguimiento</span></div>
            {medium.map((item) => (
              <a className="headline-item" href={item.url || "#"} key={item.id || item.url || item.title}>
                <strong>{item.title}</strong>
                <span>{(item.tags || []).slice(0, 3).join(" · ") || item.sourceName || "Radar"}</span>
              </a>
            ))}
          </aside>
        </div>
      </section>
    </main>
  );
}

function RadarCard({ item }) {
  return (
    <article className="radar-item">
      <div className="radar-meta">
        <span>{item.sourceName || item.sourceType || "Fuente"}</span>
        <span>{item.relevance || "pendiente"}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{formatSummary(item, 320)}</p>
      <div>{(item.tags || []).slice(0, 8).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      <div className="meta-row">
        {item.url ? <a href={item.url}>Fuente</a> : <span>Sin fuente</span>}
        <span>{item.editorialAction || item.status || "revisar"}</span>
      </div>
    </article>
  );
}

function formatSummary(item, limit = 320) {
  const text = String(item.summary || item.rawSummary || "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[#*_`>~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= limit) return text;
  return `${text.slice(0, limit).replace(/\s+\S*$/, "")}...`;
}
