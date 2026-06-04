import { getRadarItems } from "../../lib/content";

export const metadata = {
  title: "Posts de X sobre IA | De preguntar a construir"
};

const groups = [
  ["Benchmarks", ["benchmark-local", "benchmark", "ttft", "kv-cache"]],
  ["Hardware", ["hardware", "nvidia", "amd", "apple-silicon"]],
  ["Modelos locales", ["modelos-locales", "gguf", "mlx", "llama-cpp"]],
  ["Serving", ["vllm", "sglang", "inferencia"]],
  ["Verificaciones", ["verificacion"]],
  ["Agentes y coding", ["codex", "claude", "agentes"]]
];

export default function XIaPage() {
  const xItems = getRadarItems().filter((item) => (item.tags || []).includes("x") || (item.tags || []).includes("grok"));

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Radar · X</div>
            <h1>Lo que se mueve en X</h1>
            <p className="section-lead">
              Un corte del <a className="text-link" href="/radar/">radar</a>: solo señales de X, agrupadas por tema (benchmarks, hardware, modelos, serving, agentes). Cada post se resume con contexto para decidir si merece prueba, guía o seguimiento.
            </p>
          </div>
          <a className="button primary" href="/radar/">Ver radar completo</a>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="x-topic-grid">
          {groups.map(([title, tags]) => {
            const items = xItems.filter((item) => tags.some((tag) => (item.tags || []).includes(tag))).slice(0, 6);
            return (
              <section className="x-topic" key={title}>
                <div className="panel-heading"><span>{title}</span></div>
                {items.length ? items.map((item) => (
                  <a className="headline-item" href={item.url || "#"} key={item.id || item.url || item.title}>
                    <strong>{item.title}</strong>
                    <span>{(item.tags || []).slice(0, 4).join(" · ")}</span>
                    <p>{formatSummary(item)}</p>
                  </a>
                )) : <p className="empty-note">Pendiente de señales curadas.</p>}
              </section>
            );
          })}
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
  if (text.length <= 190) return text;
  return `${text.slice(0, 190).replace(/\s+\S*$/, "")}...`;
}
