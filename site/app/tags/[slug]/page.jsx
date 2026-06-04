import Link from "next/link";
import { formatDate } from "../../../lib/format";
import { getAllTags, getArticlesByTag } from "../../../lib/tags";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tag = getAllTags().find((item) => item.slug === slug);
  return {
    title: tag ? `${tag.name} | Temas` : "Temas"
  };
}

export default async function TagPage({ params }) {
  const { slug } = await params;
  const tag = getAllTags().find((item) => item.slug === slug);
  const taggedArticles = getArticlesByTag(slug);

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Tema</div>
            <h1>{tag?.name || "Tema"}</h1>
            <p className="section-lead">{taggedArticles.length} artículos en este tema.</p>
          </div>
          <Link className="text-link" href="/tags/">Todos los temas</Link>
        </div>
      </section>
      <section className="section shell compact-section">
        {taggedArticles.length ? (
          <div className="article-grid">
            {taggedArticles.map((article) => (
              <Link className="editorial-card" href={`/articulos/${article.slug}/`} key={article.slug}>
                <span>{article.section}</span>
                <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                <h2>{article.title}</h2>
                <p>{article.deck}</p>
                <strong>{article.verdict}</strong>
              </Link>
            ))}
          </div>
        ) : (
          <p className="empty-note">No hay artículos todavía. <Link className="text-link" href="/tags/">Volver a temas</Link></p>
        )}
      </section>
    </main>
  );
}
