import Link from "next/link";
import { articles } from "../../lib/articles";
import { getChapters, getModelItems, getRadarItems } from "../../lib/content";

export const metadata = {
  title: "Revista | De preguntar a construir"
};

export default function RevistaPage() {
  const chapters = getChapters();
  const radar = getRadarItems();
  const models = getModelItems();
  const issueDate = new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date());
  const cover = chapters.find((chapter) => chapter.file === "45-capitulo-44-roadmap-de-aprendizaje.md") || chapters[0];
  const features = [
    chapters.find((chapter) => chapter.file === "09-capitulo-8-hardware-real-para-ia-local.md"),
    chapters.find((chapter) => chapter.file === "32-capitulo-31-evaluacion-de-sistemas-ia.md"),
    chapters.find((chapter) => chapter.file === "35-capitulo-34-costes-latencia-y-rendimiento.md"),
    chapters.find((chapter) => chapter.file === "37-capitulo-36-despliegue-y-operacion.md")
  ].filter(Boolean);
  const lab = chapters.find((chapter) => chapter.file === "31-capitulo-30-laboratorio-de-implementacion.md");
  const sortedArticles = [...articles].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  const leadArticle = sortedArticles[0];
  const magazineArticles = sortedArticles.slice(1, 7);

  return (
    <main>
      <section className="magazine-cover shell">
        <div className="cover-kicker">Número actual · {issueDate}</div>
        <div className="cover-grid">
          <article
            className="cover-main"
            style={leadArticle?.image ? {
              backgroundImage: `linear-gradient(180deg, rgba(14,17,22,0.30), rgba(14,17,22,0.92)), url(${leadArticle.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            } : undefined}
          >
            <span className="story-label">Tema de portada</span>
            <h1>{leadArticle ? leadArticle.title : "Construir IA útil cuando todo cambia cada semana"}</h1>
            <p>{leadArticle ? leadArticle.deck : "Modelos nuevos, repos que se mueven, hardware local, agentes de código, RAG y costes reales."}</p>
            <div className="actions">
              <Link className="button primary" href={leadArticle ? `/articulos/${leadArticle.slug}/` : `/leer/${cover.slug}/`}>Leer portada</Link>
              <Link className="button secondary dark" href="/radar/">Ver radar</Link>
            </div>
          </article>
          <aside className="cover-lines">
            <h2>En este número</h2>
            {features.map((chapter) => (
              <Link href={`/leer/${chapter.slug}/`} key={chapter.slug}>
                <strong>{chapter.title}</strong>
                <span>{chapter.readingTime} min · guía práctica</span>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Sumario editorial</div>
            <h2>Qué merece tu atención ahora</h2>
          </div>
          <Link className="text-link" href="/ediciones/">Archivo de ediciones</Link>
        </div>
        <div className="magazine-columns">
          <MagazineBlock title="Radar" items={radar.slice(0, 5)} href="/radar/" />
          <MagazineBlock title="Modelos" items={models.slice(0, 5)} href="/modelos/" />
          <MagazineBlock title="Taller" items={lab ? [lab, ...features.slice(0, 4)] : features} chapterMode href="/labs/" />
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Dossier</div>
            <h2>Inferencia, hardware y software que merece portada</h2>
          </div>
          <Link className="text-link" href="/articulos/">Leer artículos</Link>
        </div>
        <div className="article-grid">
          {magazineArticles.map((article) => (
            <Link className="editorial-card" href={`/articulos/${article.slug}/`} key={article.slug}>
              <span>{article.section}</span>
              <h2>{article.title}</h2>
              <p>{article.deck}</p>
              <strong>{article.verdict}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="print-strip">
          <div>
            <span>Edición viva</span>
            <h2>Una revista que se actualiza como software</h2>
          </div>
          <p>
            La web funciona como kiosko diario. El PDF funciona como número coleccionable. El repositorio conserva versiones,
            fuentes, propuestas editoriales y labs para que cada edición pueda auditarse.
          </p>
          <Link className="button primary" href="/ediciones/">Ver ediciones</Link>
        </div>
      </section>
    </main>
  );
}

function MagazineBlock({ title, items, href, chapterMode = false }) {
  return (
    <section className="magazine-block">
      <div className="panel-heading">
        <span>{title}</span>
        <Link href={href}>Abrir</Link>
      </div>
      {items.map((item) => {
        const target = chapterMode ? `/leer/${item.slug}/` : item.url || href;
        const meta = chapterMode ? `${item.readingTime} min` : (item.tags || []).slice(0, 3).join(" · ");
        return (
          <a className="headline-item" href={target} key={item.id || item.slug || item.title}>
            <strong>{item.title}</strong>
            <span>{meta || "señal editorial"}</span>
          </a>
        );
      })}
    </section>
  );
}
