import Link from "next/link";
import { Comparador } from "../../components/Comparador";
import { comparativas } from "../../lib/comparativas";

export const metadata = {
  title: "El Comparador | De preguntar a construir",
  description: "Comparativas prácticas de hardware, runtimes, herramientas y proveedores de IA, con veredicto editorial."
};

export default function CompararPage() {
  const categorias = [...new Set(comparativas.map((comparativa) => comparativa.categoria))];

  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">El Comparador</div>
            <h1>Decisiones de stack sin marketing</h1>
            <p className="section-lead">
              Compara hardware, runtimes, herramientas y proveedores por memoria, compatibilidad, control, límites y caso de uso real.
            </p>
          </div>
          <Link className="button primary" href="/productos/">Ver productos</Link>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="comparador-index">
          {categorias.map((categoria) => (
            <div key={categoria}>
              <strong>{categoria}</strong>
              {comparativas
                .filter((comparativa) => comparativa.categoria === categoria)
                .map((comparativa) => <a href={`#${comparativa.slug}`} key={comparativa.slug}>{comparativa.title}</a>)}
            </div>
          ))}
        </div>
      </section>

      {comparativas.map((comparativa) => (
        <section className="section shell compact-section" id={comparativa.slug} key={comparativa.slug}>
          <Comparador comparativa={comparativa} />
        </section>
      ))}
    </main>
  );
}
