import Link from "next/link";
import { CommandPalette } from "./CommandPalette";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="shell top-strip-inner">
          <span>Revista viva de IA aplicada, software y hardware para builders</span>
          <div className="top-strip-actions">
            <Link href="/descargas/">PDF actualizado</Link>
            <ThemeToggle />
          </div>
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
          <div className="masthead-meta-links">
            <Link href="/empieza-aqui/">Empieza aquí</Link>
            <Link href="/ediciones/">Ediciones</Link>
            <Link href="/newsletter/">Newsletter</Link>
            <Link href="/sobre/">Sobre</Link>
          </div>
        </div>
      </div>
      <nav className="section-nav" aria-label="Principal">
        <div className="shell nav-links">
          <Link href="/hoy/">Hoy</Link>
          <Link href="/actualidad/">Actualidad</Link>
          <Link href="/decidir/">Decidir</Link>
          <Link href="/construir/">Construir</Link>
          <Link href="/empresa/">Empresa</Link>
          <Link href="/aprender/">Aprender</Link>
          <Link href="/radar/">Radar</Link>
          <Link href="/buscar/">Buscar</Link>
        </div>
      </nav>
      <CommandPalette />
    </header>
  );
}
