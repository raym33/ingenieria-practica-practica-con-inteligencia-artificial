import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="shell top-strip-inner">
          <span>IA aplicada, software, hardware local y sistemas en producción</span>
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
      </div>
      <nav className="section-nav" aria-label="Principal">
        <div className="shell nav-links">
          <Link href="/radar/">Últimas señales</Link>
          <Link href="/biblioteca/">IA aplicada</Link>
          <Link href="/rutas/">Guías</Link>
          <Link href="/leer/09-capitulo-8-hardware-real-para-ia-local/">Hardware</Link>
          <Link href="/leer/31-capitulo-30-laboratorio-de-implementacion/">Labs</Link>
          <Link href="/descargas/">Descargas</Link>
        </div>
      </nav>
    </header>
  );
}
