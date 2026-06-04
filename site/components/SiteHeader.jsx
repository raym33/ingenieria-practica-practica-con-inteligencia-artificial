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
          <Link href="/ediciones/">Ediciones</Link>
          <Link href="/radar/">Radar</Link>
          <Link href="/productos/">Productos IA</Link>
          <Link href="/benchmarks/">Benchmarks</Link>
          <Link href="/ideas/">Construir</Link>
          <Link href="/guias-compra/">Guías</Link>
          <Link href="/labs/">Labs</Link>
          <Link href="/newsletter/">Newsletter</Link>
          <Link href="/sobre/">Sobre</Link>
        </div>
      </nav>
    </header>
  );
}
