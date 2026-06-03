import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="shell nav" aria-label="Principal">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>De preguntar a construir</span>
        </Link>
        <div className="nav-links">
          <Link href="/biblioteca/">Biblioteca</Link>
          <Link href="/leer/00-prefacio-de-preguntar-a-construir/">Leer</Link>
          <Link href="/radar/">Radar</Link>
          <Link href="/descargas/">Descargas</Link>
        </div>
      </nav>
    </header>
  );
}

