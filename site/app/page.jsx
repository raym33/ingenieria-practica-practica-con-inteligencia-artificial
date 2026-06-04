import Link from "next/link";
import { getChapters, getModelItems, getRadarItems } from "../lib/content";

export default function HomePage() {
  const chapters = getChapters();
  const radarItems = getRadarItems();
  const modelItems = getModelItems();
  const leadChapter = chapters.find((chapter) => chapter.file === "45-capitulo-44-roadmap-de-aprendizaje.md") || chapters[0];
  const productionChapter = chapters.find((chapter) => chapter.file === "37-capitulo-36-despliegue-y-operacion.md");
  const hardwareChapter = chapters.find((chapter) => chapter.file === "09-capitulo-8-hardware-real-para-ia-local.md");
  const evalChapter = chapters.find((chapter) => chapter.file === "32-capitulo-31-evaluacion-de-sistemas-ia.md");
  const costChapter = chapters.find((chapter) => chapter.file === "35-capitulo-34-costes-latencia-y-rendimiento.md");
  const labChapter = chapters.find((chapter) => chapter.file === "31-capitulo-30-laboratorio-de-implementacion.md");
  const featured = [productionChapter, hardwareChapter, evalChapter, costChapter, labChapter].filter(Boolean);
  const latestRadar = radarItems.slice(0, 5);
  const issueDate = new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(new Date());
  const topicRows = [
    { label: "Inferencia local", href: "/inferencia/", kicker: "hardware, runtimes, tokens/s" },
    { label: "Modelos locales", href: "/leer/08-capitulo-7-modelos-locales/", kicker: "Ollama, LM Studio, MLX, GGUF" },
    { label: "RAG real", href: "/leer/20-capitulo-19-rag-avanzado/", kicker: "retrieval, reranking, permisos" },
    { label: "Agentes", href: "/leer/28-capitulo-27-arquitecturas-agenticas/", kicker: "tools, memoria, límites" },
    { label: "Producción", href: "/leer/37-capitulo-36-despliegue-y-operacion/", kicker: "evals, trazas, rollback" }
  ];

  return (
    <main>
      <section className="issue-bar shell">
        <div>
          <strong>Número actual</strong>
          <span>{issueDate}</span>
        </div>
        <p>Radar, pruebas y guías para decidir qué merece entrar en tu stack de IA.</p>
        <Link href="/revista/">Abrir edición</Link>
      </section>

      <section className="news-hero shell">
        <article className="lead-story">
          <div className="story-label">Tema de portada</div>
          <h1>La revista para builders que quieren estar al día sin tragarse el hype</h1>
          <p>
            Modelos, agentes, RAG, hardware local, repos, pruebas y costes reales. Una portada viva para programadores
            que necesitan criterio técnico, no titulares vacíos.
          </p>
          <div className="actions">
            <Link className="button primary" href="/revista/">Leer el número</Link>
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
        <div className="magazine-shelf">
          <Link className="shelf-card accent-red" href="/modelos/">
            <span>Radar de modelos</span>
            <strong>{modelItems.length} señales para vigilar</strong>
            <p>Hugging Face, GGUF, embeddings, MLX y modelos locales.</p>
          </Link>
          <Link className="shelf-card accent-teal" href="/labs/">
            <span>Banco de pruebas</span>
            <strong>Labs ejecutables</strong>
            <p>Costes, retrieval, jueces LLM y benchmarks locales.</p>
          </Link>
          <Link className="shelf-card accent-gold" href="/inferencia/">
            <span>Inferencia</span>
            <strong>Hardware y software real</strong>
            <p>Mac, GPU, GGUF, MLX, vLLM, latencia y límites prácticos.</p>
          </Link>
          <Link className="shelf-card accent-red" href="/productos/">
            <span>Productos IA</span>
            <strong>Comprar con criterio</strong>
            <p>Microsoft, NVIDIA, Apple, Dell, Lenovo, Samsung y workstations.</p>
          </Link>
          <Link className="shelf-card accent-teal" href="/x-ia/">
            <span>Posts de X</span>
            <strong>Señales agrupadas</strong>
            <p>Benchmarks, bugs, modelos, agentes y hardware con contexto.</p>
          </Link>
          <Link className="shelf-card accent-gold" href="/ideas/">
            <span>Ideas</span>
            <strong>Construir con IDEs IA</strong>
            <p>MVPs para Codex, Claude Code, Lovable, OpenRouter y Cursor.</p>
          </Link>
          <Link className="shelf-card accent-red" href="/benchmarks/">
            <span>Benchmarks</span>
            <strong>Métricas que importan</strong>
            <p>TTFT, tokens/s, RAM/VRAM, KV cache, coste y reproducibilidad.</p>
          </Link>
          <Link className="shelf-card accent-teal" href="/stack-ia-local/">
            <span>Stack local</span>
            <strong>De portátil a laboratorio</strong>
            <p>Ollama, MLX, llama.cpp, Open WebUI, RAG, seguridad y redes.</p>
          </Link>
          <Link className="shelf-card accent-gold" href="/saas-ia/">
            <span>SaaS IA</span>
            <strong>Ideas que se pueden vender</strong>
            <p>Problemas, MVPs, pricing, agentes e IDEs IA para construir.</p>
          </Link>
          <Link className="shelf-card accent-red" href="/guias-compra/">
            <span>Guías compra</span>
            <strong>Qué comprar y por qué</strong>
            <p>Portátiles, Mac, RTX, workstations, mini PCs y dispositivos IA.</p>
          </Link>
          <Link className="shelf-card accent-teal" href="/herramientas-ia/">
            <span>Herramientas IA</span>
            <strong>Qué usar para construir</strong>
            <p>Codex, Claude Code, OpenRouter, Lovable, Cursor y runtimes.</p>
          </Link>
          <Link className="shelf-card accent-gold" href="/articulos/">
            <span>Artículos</span>
            <strong>Análisis redactados</strong>
            <p>Compra, seguridad, RAG local e inferencia con fuentes al final.</p>
          </Link>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Centro de estudio</div>
            <h2>Libro, radar y banco de pruebas en un solo sitio</h2>
          </div>
          <Link className="text-link" href="/biblioteca/">Explorar biblioteca</Link>
        </div>
        <div className="stats">
          <div className="stat"><strong>{chapters.length}</strong><span>capítulos</span></div>
          <div className="stat"><strong>{radarItems.length}</strong><span>señales recientes</span></div>
          <div className="stat"><strong>Labs</strong><span>código ejecutable</span></div>
          <div className="stat"><strong>PDF</strong><span>versión descargable</span></div>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Selección editorial</div>
            <h2>Portada, pruebas y criterio</h2>
          </div>
          <Link className="text-link" href="/revista/">Ver sumario</Link>
        </div>
        <div className="cover-teasers">
          <article>
            <span>Prueba</span>
            <h3>Qué modelo local merece tu RAM</h3>
            <p>El criterio no es el benchmark aislado: es latencia, memoria, calidad suficiente y caso de uso.</p>
          </article>
          <article>
            <span>Stack</span>
            <h3>Ollama, MLX, llama.cpp o vLLM</h3>
            <p>La herramienta correcta depende de si estás explorando, midiendo o sirviendo usuarios concurrentes.</p>
          </article>
          <article>
            <span>Comparativa</span>
            <h3>RAG, agentes o workflow</h3>
            <p>La mayoría de productos necesita menos autonomía y más arquitectura explícita.</p>
          </article>
        </div>
      </section>

      <section className="section shell">
        <div className="front-grid">
          <div>
            <div className="section-header">
              <div>
                <div className="eyebrow">Guías destacadas</div>
                <h2>Lo que un builder necesita esta semana</h2>
              </div>
            </div>
            <div className="story-grid">
              {featured.map((chapter) => (
                <Link className="story-card" href={`/leer/${chapter.slug}/`} key={chapter.slug}>
                  <span>{chapter.readingTime} min</span>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
          <aside className="side-rail">
            <div className="panel-heading">
              <span>Secciones rápidas</span>
            </div>
            {topicRows.map((topic) => (
              <Link className="topic-row" href={topic.href} key={topic.href}>
                <strong>{topic.label}</strong>
                <span>{topic.kicker}</span>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      <section className="section shell">
        <div className="section-header">
          <div>
            <div className="eyebrow">Rutas prácticas</div>
            <h2>Aprende por objetivo, no por orden de índice</h2>
          </div>
          <Link className="text-link" href="/rutas/">Ver rutas</Link>
        </div>
        <div className="chapter-grid">
          {chapters.slice(0, 6).map((chapter) => (
            <Link className="chapter-card dense" href={`/leer/${chapter.slug}/`} key={chapter.slug}>
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
