import Link from "next/link";
import { articles } from "../../lib/articles";
import { formatDate } from "../../lib/format";

export const metadata = {
  title: "Artículos | De preguntar a construir"
};

export default function ArticulosPage() {
  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Artículos</div>
            <h1>Análisis redactados, con criterio y fuentes</h1>
            <p className="section-lead">
              Piezas editoriales para convertir señales de fabricantes, X, Reddit y benchmarks en decisiones prácticas.
            </p>
          </div>
        </div>
      </section>
      <section className="section shell compact-section">
        <div className="article-grid">
          {articles.map((article) => (
            <Link className="editorial-card" href={`/articulos/${article.slug}/`} key={article.slug}>
              <span>{article.section}</span>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              <h2>{article.title}</h2>
              <p>{article.deck}</p>
              <strong>{article.verdict}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
