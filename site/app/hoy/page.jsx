import Link from "next/link";
import { BenchmarkChart } from "../../components/BenchmarkChart";
import { articles } from "../../lib/articles";
import { mediciones } from "../../lib/mediciones";
import { getRadarItems, getChapters } from "../../lib/content";
import { formatDate } from "../../lib/format";

export const metadata = {
  title: "El parte de hoy | De preguntar a construir",
  description: "Lo nuevo en IA que te afecta, en 3 minutos: qué cambió, qué funciona, qué medir y qué hacer. Para ingenieros y consultores sin tiempo."
};

const cleanSummary = (item) => String(item.summary || item.rawSummary || "")
  .replace(/https?:\/\/\S+/g, "")
  .replace(/[#*_`>~]/g, "")
  .replace(/\s+/g, " ")
  .trim()
  .slice(0, 130);

export default function HoyPage() {
  const sorted = [...articles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  const fecha = sorted[0]?.publishedAt;
  const lead = sorted.slice(0, 6);
  const radar = getRadarItems().slice(0, 8);
  const charts = mediciones.slice(-2).reverse();
  const chapters = getChapters();
  const deepen = [
    "09-capitulo-8-hardware-real-para-ia-local",
    "17-capitulo-16-que-problema-resuelve-rag",
    "28-capitulo-27-arquitecturas-agenticas",
    "32-capitulo-31-evaluacion-de-sistemas-ia"
  ].map((slug) => chapters.find((c) => c.slug === slug)).filter(Boolean);

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">El parte · {formatDate(fecha)}</div>
            <h1>Lo nuevo en IA, en 3 minutos</h1>
            <p className="section-lead">
              Para ingenieros y consultores de IA sin tiempo. Qué ha cambiado, qué funciona, qué medir y qué hacer.
              Una pestaña al día y vas al corriente, sin humo.
            </p>
          </div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="front-grid">
          <div>
            <div className="section-header">
              <div>
                <div className="eyebrow">Lo que importa hoy</div>
                <h2>Con su veredicto en una línea</h2>
              </div>
              <Link className="text-link" href="/articulos/">Todos</Link>
            </div>
            <div className="brief-list">
              {lead.map((article) => (
                <Link className="brief-item" href={`/articulos/${article.slug}/`} key={article.slug}>
                  <span className="brief-kicker">{article.section}</span>
                  <h3>{article.title}</h3>
                  <p className="brief-verdict">{article.verdict}</p>
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                </Link>
              ))}
            </div>
          </div>

          <aside className="side-rail">
            <div className="panel-heading">
              <span>En el radar</span>
              <Link href="/radar/">Todas</Link>
            </div>
            {radar.map((item) => {
              const verificada = String(item.confidence || "").toLowerCase() === "alta";
              return (
                <a className="brief-radar" href={item.url || "/radar/"} key={item.id || item.title}>
                  <span className={`source-dot ${verificada ? "dot-green" : "dot-amber"}`} aria-hidden="true" />
                  <span className="brief-radar-body">
                    <strong>{item.title}</strong>
                    <span>{(item.tags || []).filter((t) => t !== "x" && t !== "grok").slice(0, 3).join(" · ") || cleanSummary(item)}</span>
                  </span>
                </a>
              );
            })}
            <p className="brief-legend">
              <span className="source-dot dot-green" aria-hidden="true" /> verificable
              <span className="source-dot dot-amber" aria-hidden="true" /> sin verificar
            </p>
          </aside>
        </div>
      </section>

      {charts.length > 0 && (
        <section className="section shell compact-section">
          <div className="section-header">
            <div>
              <div className="eyebrow">Los números</div>
              <h2>Mediciones recientes, con fuente</h2>
            </div>
            <Link className="text-link" href="/empresa/">Más mediciones</Link>
          </div>
          <div className="bench-grid">
            {charts.map((medicion) => <BenchmarkChart medicion={medicion} key={medicion.id} />)}
          </div>
        </section>
      )}

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Para profundizar</div>
            <h2>Los conceptos clave, en el libro</h2>
          </div>
          <Link className="text-link" href="/aprender/">Biblioteca</Link>
        </div>
        <div className="chapter-grid">
          {deepen.map((chapter) => (
            <Link className="chapter-card" href={`/leer/${chapter.slug}/`} key={chapter.slug}>
              <div>
                <h3>{chapter.title}</h3>
                <p>{chapter.excerpt}</p>
              </div>
              <div className="meta-row"><span>{chapter.readingTime} min</span><span>Leer</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="newsletter-strip">
          <div>
            <span>El parte, en tu correo</span>
            <h2>Recibe el radar semanal</h2>
            <p>Si no quieres abrir nada, te lo mandamos: lo nuevo que importa, una vez por semana.</p>
          </div>
          <Link className="button primary" href="/newsletter/">Apuntarme</Link>
        </div>
      </section>
    </main>
  );
}
