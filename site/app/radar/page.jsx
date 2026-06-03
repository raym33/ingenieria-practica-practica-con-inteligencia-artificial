import { getRadarItems } from "../../lib/content";

export const metadata = {
  title: "Radar | De preguntar a construir"
};

export default function RadarPage() {
  const items = getRadarItems();

  return (
    <main className="section shell">
      <h1>Radar editorial</h1>
      <p className="section-lead">
        Señales recientes que pueden afectar al libro: modelos, repos, papers, herramientas, hardware y prácticas que merecen seguimiento.
      </p>
      <div className="radar-list">
        {items.map((item) => (
          <article className="radar-item" key={item.id || item.url || item.title}>
            <h3>{item.title}</h3>
            <p>{item.summary || item.rawSummary}</p>
            <div>{(item.tags || []).slice(0, 8).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            {item.url && <p><a href={item.url}>Fuente</a></p>}
          </article>
        ))}
      </div>
    </main>
  );
}

