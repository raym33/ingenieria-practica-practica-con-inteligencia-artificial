import Link from "next/link";
import { getChapters } from "../../lib/content";

export const metadata = {
  title: "Aprender | De preguntar a construir",
  description: "Capítulos, rutas y biblioteca de la guía de conceptos y terminología de IA."
};

const learningLinks = [
  ["Biblioteca", "Biblioteca", "Todos los capítulos y referencias básicas de conceptos de IA.", "/biblioteca/"],
  ["Rutas", "Rutas", "Itinerarios por objetivo para aprender sin seguir el índice lineal.", "/rutas/"],
  ["Online", "Lectura online", "Una entrada directa a la guía y a la edición diaria.", "/descargas/"]
];

export default function AprenderPage() {
  const allChapters = getChapters();
  const recommendedChapter = allChapters.find((chapter) => chapter.file === "45-capitulo-44-roadmap-de-aprendizaje.md") || allChapters[0];
  const chapters = allChapters.slice(0, 6);

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Aprender</div>
            <h1>Guía de conceptos y rutas</h1>
            <p className="section-lead">Capítulos, rutas y materiales para construir criterio técnico sobre IA aplicada desde fundamentos hasta producción.</p>
          </div>
        </div>
      </section>

      {recommendedChapter ? (
        <section className="section shell compact-section">
          <article className="hub-feature">
            <div>
              <div className="eyebrow">Empieza por aquí</div>
              <h2>
                <Link href={`/leer/${recommendedChapter.slug}/`}>{recommendedChapter.title}</Link>
              </h2>
              <p>{recommendedChapter.excerpt}</p>
              <div className="meta-row"><span>{recommendedChapter.readingTime} min</span><span>Capítulo recomendado</span></div>
              <Link className="button primary" href={`/leer/${recommendedChapter.slug}/`}>Leer capítulo</Link>
            </div>
          </article>
        </section>
      ) : null}

      <section className="section shell compact-section">
        <div className="chapter-grid">
          {chapters.map((chapter) => (
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
        <div className="cover-teasers">
          {learningLinks.map(([kicker, title, text, href]) => (
            <Link className="shelf-card" href={href} key={href}>
              <span>{kicker}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
