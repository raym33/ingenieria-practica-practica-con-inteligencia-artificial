import Link from "next/link";
import { articles } from "../../lib/articles";
import { getRadarItems } from "../../lib/content";
import { formatDate } from "../../lib/format";

export const metadata = {
  title: "Actualidad | De preguntar a construir",
  description: "Noticias, artículos y señales recientes de IA explicadas con criterio editorial."
};

export default function ActualidadPage() {
  const sortedArticles = [...articles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  const radarItems = getRadarItems().slice(0, 6);

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Actualidad</div>
            <h1>Qué ha pasado y por qué importa</h1>
            <p className="section-lead">Noticias, señales y análisis de IA filtrados por impacto real: qué cambia, qué conviene vigilar y qué no merece tu tiempo.</p>
          </div>
        </div>
      </section>

      <section className="issue-bar shell">
        <div>
          <strong>Número actual</strong>
          <span>Edición 004 · Europa, inferencia local y seguridad</span>
        </div>
        <p>Cada edición deja una foto editorial: portada, dossier, señales y fuentes.</p>
        <Link href="/ediciones/">Ver ediciones</Link>
      </section>

      <section className="section shell compact-section">
        <div className="front-grid">
          <div>
            <div className="section-header">
              <div>
                <div className="eyebrow">Artículos</div>
                <h2>Análisis publicados</h2>
              </div>
              <Link className="text-link" href="/articulos/">Archivo completo</Link>
            </div>
            <div className="article-grid">
              {sortedArticles.map((article) => (
                <Link className="editorial-card" href={`/articulos/${article.slug}/`} key={article.slug}>
                  <span>{article.section}</span>
                  <h3>{article.title}</h3>
                  <p>{article.deck}</p>
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                </Link>
              ))}
            </div>
          </div>

          <aside className="side-rail">
            <div className="panel-heading">
              <span>Radar</span>
              <Link href="/radar/">Todas</Link>
            </div>
            {radarItems.map((item) => (
              <a className="headline-item" href={item.url || "/radar/"} key={item.id || item.title}>
                <strong>{item.title}</strong>
                <span>{(item.tags || []).slice(0, 3).join(" · ") || item.sourceName || "Radar"}</span>
              </a>
            ))}
            <Link className="topic-row" href="/radar/">
              <strong>Radar editorial</strong>
              <span>Señales revisadas y clasificadas.</span>
            </Link>
            <Link className="topic-row" href="/x-ia/">
              <strong>Señales de X</strong>
              <span>Posts agrupados con contexto.</span>
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
