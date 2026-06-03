import Link from "next/link";
import { getChapters } from "../../lib/content";
import { ChapterSearch } from "../../components/ChapterSearch";

export const metadata = {
  title: "Biblioteca | De preguntar a construir"
};

export default function BibliotecaPage() {
  const chapters = getChapters();

  return (
    <main className="section shell">
      <h1>Biblioteca</h1>
      <p className="section-lead">
        Capítulos del libro en formato web. Usa el buscador para saltar a temas como RAG, modelos locales, agentes, prompts o hardware.
      </p>
      <ChapterSearch chapters={chapters} />
      <div className="chapter-grid">
        {chapters.map((chapter) => (
          <Link className="chapter-card" href={`/leer/${chapter.slug}/`} key={chapter.slug}>
            <div>
              <h3>{chapter.title}</h3>
              <p>{chapter.excerpt}</p>
            </div>
            <div className="meta-row"><span>{chapter.readingTime} min</span><span>{chapter.sectionCount} secciones</span></div>
          </Link>
        ))}
      </div>
    </main>
  );
}

