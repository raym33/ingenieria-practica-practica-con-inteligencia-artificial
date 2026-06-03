import Link from "next/link";
import { getChapters, getRadarItems } from "../lib/content";

export default function HomePage() {
  const chapters = getChapters();
  const radarItems = getRadarItems();
  const latest = chapters.slice(0, 6);

  return (
    <main>
      <section className="hero">
        <div className="shell hero-inner">
          <div className="eyebrow">Libro vivo de Ramon Guillamon</div>
          <h1>De preguntar a construir</h1>
          <p>
            Una guía práctica para estudiar, diseñar y construir sistemas reales con inteligencia artificial:
            modelos, prompts, agentes, RAG, hardware local y producción.
          </p>
          <div className="actions">
            <Link className="button primary" href="/leer/00-prefacio-de-preguntar-a-construir/">Empezar a leer</Link>
            <Link className="button secondary" href="/biblioteca/">Ver capítulos</Link>
          </div>
        </div>
      </section>

      <section className="section shell">
        <h2>Estudia el libro en la web</h2>
        <p className="section-lead">
          La edición web está pensada para navegar por capítulos, buscar conceptos y seguir las actualizaciones del radar editorial sin depender solo del PDF.
        </p>
        <div className="stats">
          <div className="stat"><strong>{chapters.length}</strong><span>capítulos</span></div>
          <div className="stat"><strong>{radarItems.length}</strong><span>señales recientes</span></div>
          <div className="stat"><strong>PDF</strong><span>edición descargable</span></div>
          <div className="stat"><strong>CC</strong><span>Creative Commons</span></div>
        </div>
      </section>

      <section className="section shell">
        <h2>Ruta de lectura</h2>
        <div className="chapter-grid">
          {latest.map((chapter) => (
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
    </main>
  );
}

