import Link from "next/link";
import { Byline } from "../../../components/Byline";
import { articles, getArticle } from "../../../lib/articles";
import { formatDate } from "../../../lib/format";
import { SITE_NAME } from "../../../lib/site-config";
import { tagSlug } from "../../../lib/tags";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  return {
    title: article ? `${article.title} | De preguntar a construir` : "Artículo",
    description: article?.deck,
    openGraph: article ? {
      type: "article",
      title: article.title,
      description: article.deck,
      publishedTime: article.publishedAt
    } : undefined,
    twitter: article ? {
      card: "summary_large_image",
      title: article.title,
      description: article.deck
    } : undefined
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return null;

  return (
    <main>
      <article className="article-page shell">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.deck, datePublished: article.publishedAt, dateModified: article.publishedAt, author: { "@type": "Organization", name: SITE_NAME }, publisher: { "@type": "Organization", name: SITE_NAME } }) }} />
        <div className="article-kicker">{article.section}</div>
        <h1>{article.title}</h1>
        <p className="article-deck">{article.deck}</p>
        <time className="article-date" dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        <Byline date={article.publishedAt} />
        <div className="article-verdict">{article.verdict}</div>
        <div className="article-body">
          {article.body.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.text}</p>
            </section>
          ))}
        </div>
        <section className="article-sources">
          <h2>Fuentes consultadas</h2>
          {article.sources.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </section>
        <div className="article-tags" aria-label="Temas del artículo">
          {(article.tags || []).map((tag) => (
            <Link className="tag" href={`/tags/${tagSlug(tag)}/`} key={tag}>{tag}</Link>
          ))}
        </div>
        <Link className="text-link" href="/articulos/">Volver a artículos</Link>
      </article>
    </main>
  );
}
