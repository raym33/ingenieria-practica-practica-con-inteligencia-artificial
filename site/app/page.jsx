import Link from "next/link";
import { ArticleCover } from "../components/ArticleCover";
import { NewsletterForm } from "../components/NewsletterForm";
import { articles } from "../lib/articles";
import { getRadarItems } from "../lib/content";
import { formatDate } from "../lib/format";

export default function HomePage() {
  const radarItems = getRadarItems();
  const latestRadar = radarItems.slice(0, 5);
  const coverArticles = articles.slice(-6).reverse();
  const leadArticle = coverArticles[0];
  const dossierArticles = coverArticles.slice(1, 5);
  const issueDate = new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date());
  const quickDecisions = [
    ["Comprar portátil IA", "Mira RAM/VRAM, runtime y batería; la NPU no basta para LLMs grandes.", "/guias-compra/"],
    ["Probar modelo local", "Empieza con tarea real, contexto real y mide TTFT antes de mirar tokens/s.", "/modelos/"],
    ["Montar RAG", "Primero retrieval, permisos y evaluación; después modelos más grandes.", "/leer/17-capitulo-16-que-problema-resuelve-rag/"],
    ["Crear SaaS IA", "Busca workflow repetido, output revisable y coste por respuesta válida.", "/saas-ia/"]
  ];
  const editorialStance = [
    {
      label: "Recomendamos",
      title: "Medir antes de comprar",
      text: "Mac con memoria suficiente, RTX con VRAM real, labs reproducibles y stacks que puedas operar."
    },
    {
      label: "Vigilamos",
      title: "RTX Spark, Strix Halo, Foundry Local y Snapdragon X2",
      text: "Prometen mucho para IA local, pero necesitan disponibilidad, benchmarks y compatibilidad de runtimes."
    },
    {
      label: "Evitamos",
      title: "Comprar por etiqueta AI PC",
      text: "TOPS de NPU, marketing de agentes o tokens/s aislados no bastan para recomendar hardware."
    }
  ];
  const pillars = [
    {
      label: "Actualidad",
      title: "Qué ha pasado y por qué importa",
      href: "/actualidad/",
      links: [["Artículos", "/articulos/"], ["Radar", "/radar/"], ["Señales de X", "/x-ia/"]]
    },
    {
      label: "Decidir",
      title: "Comparar y comprar sin humo",
      href: "/decidir/",
      links: [["Comparador", "/comparar/"], ["Fichas", "/fichas/"], ["Guías", "/guias-compra/"]]
    },
    {
      label: "Construir",
      title: "De la idea al producto",
      href: "/construir/",
      links: [["Ideas", "/ideas/"], ["Herramientas", "/herramientas-ia/"], ["Labs", "/labs/"]]
    },
    {
      label: "Aprender",
      title: "El libro vivo y las rutas",
      href: "/aprender/",
      links: [["Capítulos", "/biblioteca/"], ["Rutas", "/rutas/"], ["Biblioteca", "/biblioteca/"]]
    }
  ];

  return (
    <main>
      <section className="issue-bar shell">
        <div>
          <strong>Número actual</strong>
          <span>{issueDate}</span>
        </div>
        <p>Radar, pruebas y guías para decidir qué merece entrar en tu stack de IA.</p>
        <Link href="/ediciones/">Ver ediciones</Link>
      </section>

      <section className="news-hero shell">
        <article
          className="lead-story"
          style={leadArticle?.image ? {
            backgroundImage: `linear-gradient(180deg, rgba(14,17,22,0.30), rgba(14,17,22,0.92)), url(${leadArticle.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          } : undefined}
        >
          <div className="story-label">Tema de portada</div>
          <h1>{leadArticle ? leadArticle.title : "La revista para builders que quieren estar al día sin tragarse el hype"}</h1>
          <p>
            {leadArticle ? leadArticle.deck : "Modelos, agentes, RAG, hardware local, repos, pruebas y costes reales. Una portada viva para programadores que necesitan criterio técnico, no titulares vacíos."}
          </p>
          <div className="actions">
            <Link className="button primary" href={leadArticle ? `/articulos/${leadArticle.slug}/` : "/revista/"}>Leer portada</Link>
            <Link className="button secondary dark" href="/radar/">Ver radar diario</Link>
          </div>
        </article>
        <aside className="latest-panel" aria-label="Últimas señales">
          <div className="panel-heading">
            <span>Últimas señales</span>
            <Link href="/radar/">Todas</Link>
          </div>
          <div className="headline-list">
            {latestRadar.map((item) => (
              <a className="headline-item" href={item.url || "/radar/"} key={item.id || item.title}>
                <strong>{item.title}</strong>
                <span>{(item.tags || []).slice(0, 3).join(" · ") || item.sourceName || "Radar"}</span>
              </a>
            ))}
          </div>
        </aside>
      </section>

      <section className="section shell compact-section">
        <div className="front-grid">
          <div>
            <div className="section-header">
              <div>
                <div className="eyebrow">Dossier de portada</div>
                <h2>Lo que conviene leer antes de comprar, migrar o construir</h2>
              </div>
              <Link className="text-link" href="/articulos/">Todos los artículos</Link>
            </div>
            <div className="story-grid">
              {dossierArticles.map((article) => (
                <Link className="story-card" href={`/articulos/${article.slug}/`} key={article.slug}>
                  <ArticleCover slug={article.slug} section={article.section} tags={article.tags} image={article.image} imageAlt={article.imageAlt} variant="card" />
                  <span>{article.section}</span>
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                  <h3>{article.title}</h3>
                  <p>{article.verdict}</p>
                </Link>
              ))}
            </div>
          </div>
          <aside className="side-rail">
            <div className="panel-heading">
              <span>Decisión rápida</span>
            </div>
            {quickDecisions.map(([title, text, href]) => (
              <Link className="topic-row" href={href} key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      <section className="ticker-band">
        <div className="shell ticker-inner">
          <strong>Hoy en el radar</strong>
          <span>modelos locales</span>
          <span>RAG en producción</span>
          <span>costes y latencia</span>
          <span>agentes de código</span>
          <span>hardware Apple Silicon y GPU</span>
          <span>vLLM, llama.cpp y MLX</span>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Criterio editorial</div>
            <h2>Recomendamos, vigilamos y evitamos</h2>
          </div>
          <Link className="text-link" href="/sobre/">Cómo verificamos</Link>
        </div>
        <div className="cover-teasers">
          {editorialStance.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Por dónde entrar</div>
            <h2>Elige por lo que quieres hacer</h2>
          </div>
        </div>
        <div className="pillars">
          {pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.href}>
              <Link className="pillar-main-link" href={pillar.href} aria-label={`${pillar.label}: ${pillar.title}`} />
              <span>{pillar.label}</span>
              <h3>{pillar.title}</h3>
              <div className="pillar-sublinks">
                {pillar.links.map(([label, href], index) => (
                  <span key={label}>
                    {index > 0 ? <em aria-hidden="true">·</em> : null}
                    <Link className="text-link" href={href}>{label}</Link>
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="newsletter-strip">
          <div>
            <span>Newsletter</span>
            <h2>5 señales, 3 decisiones, 1 benchmark y 1 idea construible</h2>
            <p>Un resumen semanal para builders que quieren estar al día de IA, software y hardware sin vivir dentro del feed.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
