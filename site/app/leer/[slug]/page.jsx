import Link from "next/link";
import { notFound } from "next/navigation";
import { getChapter, getChapters, getNextPrev } from "../../../lib/content";

export function generateStaticParams() {
  return getChapters().map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  return {
    title: chapter ? `${chapter.title} | De preguntar a construir` : "Capítulo"
  };
}

export default async function ChapterPage({ params }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();
  const chapters = getChapters();
  const { previous, next } = getNextPrev(slug);

  return (
    <main className="shell reader-layout">
      <aside className="reader-sidebar" aria-label="Capítulos">
        {chapters.map((item) => (
          <Link className={item.slug === chapter.slug ? "active" : ""} href={`/leer/${item.slug}/`} key={item.slug}>
            {item.shortTitle}
          </Link>
        ))}
      </aside>
      <article className="reader">
        <header className="reader-title">
          <p>{chapter.readingTime} min · {chapter.sectionCount} secciones</p>
          <h1>{chapter.title}</h1>
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: chapter.html }} />
        <nav className="actions" aria-label="Capítulos anterior y siguiente">
          {previous && <Link className="button secondary" style={{ color: "var(--blue)", borderColor: "var(--line)" }} href={`/leer/${previous.slug}/`}>Anterior</Link>}
          {next && <Link className="button primary" href={`/leer/${next.slug}/`}>Siguiente</Link>}
        </nav>
      </article>
    </main>
  );
}
