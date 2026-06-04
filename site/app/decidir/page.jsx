import Link from "next/link";
import { FichaProducto } from "../../components/FichaProducto";
import { comparativas } from "../../lib/comparativas";
import { fichas } from "../../lib/fichas";

export const metadata = {
  title: "Decidir | De preguntar a construir",
  description: "Comparativas, fichas, guías y benchmarks para comprar y elegir stack de IA sin humo."
};

const decisionLinks = [
  ["Comparador", "El Comparador", "Matrices editoriales para decidir entre hardware, runtimes, modelos y herramientas.", "/comparar/"],
  ["Productos", "Fichas de producto", "Producto por producto: qué promete, para quién encaja y qué falta medir.", "/fichas/"],
  ["Compra", "Guías de compra", "Portátiles, Mac, RTX, workstations y dispositivos IA con criterio práctico.", "/guias-compra/"],
  ["Catálogo", "Productos IA", "Hardware y software ordenados por uso real, no por etiqueta comercial.", "/productos/"],
  ["Medición", "Benchmarks", "Qué medir antes de creer una captura de tokens por segundo.", "/benchmarks/"],
  ["Modelos", "Modelos", "Señales y criterios para elegir modelos locales o vía API.", "/modelos/"]
];

export default function DecidirPage() {
  const featuredComparativa = comparativas.find((item) => item.slug === "codex-claude-code-vs-cursor-vs-lovable") || comparativas[3] || comparativas[0];
  const preview = comparativas.slice(0, 3);

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Decidir</div>
            <h1>Comparar y comprar sin humo</h1>
            <p className="section-lead">Una entrada para elegir herramientas, equipos y modelos con veredictos claros, límites visibles y pruebas que importan.</p>
          </div>
        </div>
      </section>

      {featuredComparativa ? (
        <section className="section shell compact-section">
          <article className="hub-feature">
            <div>
              <div className="eyebrow">Comparativa destacada</div>
              <span>{featuredComparativa.categoria}</span>
              <h2>{featuredComparativa.title}</h2>
              <p>{featuredComparativa.deck}</p>
              {featuredComparativa.veredicto ? <p><strong>{featuredComparativa.veredicto}</strong></p> : null}
              <Link className="button primary" href={`/comparar/#${featuredComparativa.slug}`}>Abrir comparador</Link>
            </div>
          </article>
        </section>
      ) : null}

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Fichas</div>
            <h2>Equipos con veredicto</h2>
          </div>
          <Link className="text-link" href="/fichas/">Ver fichas</Link>
        </div>
        <div className="ficha-grid">
          {fichas.slice(0, 3).map((ficha) => (
            <FichaProducto ficha={ficha} key={ficha.slug} />
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="cover-teasers">
          {decisionLinks.map(([kicker, title, text, href]) => (
            <Link className="shelf-card" href={href} key={href}>
              <span>{kicker}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Vista previa</div>
            <h2>Comparativas destacadas</h2>
          </div>
          <Link className="text-link" href="/comparar/">Abrir comparador</Link>
        </div>
        <div className="article-grid">
          {preview.map((item) => (
            <Link className="editorial-card" href={`/comparar/#${item.slug}`} key={item.slug}>
              <span>{item.categoria}</span>
              <h3>{item.title}</h3>
              <p>{item.deck}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
