import Link from "next/link";
import { articles } from "../../../lib/articles";
import { authors, DEFAULT_AUTHOR, getAuthor } from "../../../lib/authors";
import { formatDate } from "../../../lib/format";

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  return {
    title: author ? `${author.name} | De preguntar a construir` : "Autor"
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return null;

  const authorArticles = articles.filter((article) => (article.author || DEFAULT_AUTHOR) === slug);

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Autor</div>
            <h1>{author.name}</h1>
            <p className="section-lead">{author.role}</p>
            <p className="author-bio">{author.bio}</p>
          </div>
        </div>
      </section>
      <section className="section shell compact-section">
        <div className="article-grid">
          {authorArticles.map((article) => (
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
