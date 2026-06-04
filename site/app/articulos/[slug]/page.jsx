import Link from "next/link";
import { articles, getArticle } from "../../../lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  return { title: article ? `${article.title} | De preguntar a construir` : "Artículo" };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return null;

  return (
    <main>
      <article className="article-page shell">
        <div className="article-kicker">{article.section}</div>
        <h1>{article.title}</h1>
        <p className="article-deck">{article.deck}</p>
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
        <Link className="text-link" href="/articulos/">Volver a artículos</Link>
      </article>
    </main>
  );
}
