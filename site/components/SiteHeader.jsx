import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="shell top-strip-inner">
          <span>Revista viva de IA aplicada, software y hardware para builders</span>
          <Link href="/descargas/">PDF actualizado</Link>
        </div>
      </div>
      <div className="shell masthead">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">IA</span>
          <span>
            <strong>De preguntar a construir</strong>
            <small>Radar práctico para builders</small>
          </span>
        </Link>
        <div className="masthead-meta" aria-label="Estado editorial">
          <span>Radar diario</span>
          <strong>Inferencia · RAG · Agentes · Hardware</strong>
        </div>
      </div>
      <nav className="section-nav" aria-label="Principal">
        <div className="shell nav-links">
          <Link href="/revista/">Revista</Link>
          <Link href="/radar/">Últimas señales</Link>
          <Link href="/modelos/">Modelos</Link>
          <Link href="/inferencia/">Inferencia</Link>
          <Link href="/productos/">Productos IA</Link>
          <Link href="/x-ia/">Posts de X</Link>
          <Link href="/reddit-lab/">Reddit Lab</Link>
          <Link href="/ideas/">Ideas</Link>
          <Link href="/benchmarks/">Benchmarks</Link>
          <Link href="/stack-ia-local/">Stack IA local</Link>
          <Link href="/saas-ia/">SaaS IA</Link>
          <Link href="/biblioteca/">IA aplicada</Link>
          <Link href="/rutas/">Guías</Link>
          <Link href="/leer/09-capitulo-8-hardware-real-para-ia-local/">Hardware</Link>
          <Link href="/labs/">Labs</Link>
          <Link href="/descargas/">Descargas</Link>
        </div>
      </nav>
    </header>
  );
}
