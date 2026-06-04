import { FichaProducto } from "../../components/FichaProducto";
import { fichas } from "../../lib/fichas";

export const metadata = {
  title: "Fichas de producto | De preguntar a construir",
  description: "Fichas editoriales de hardware y dispositivos para IA práctica: uso real, runtimes, límites y veredicto."
};

export default function FichasPage() {
  return (
    <main>
      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Fichas de producto</div>
            <h1>Hardware evaluado por uso real</h1>
            <p className="section-lead">
              Qué es cada producto, para qué sirve, qué runtimes admite, dónde está el límite y qué decisión editorial merece.
            </p>
          </div>
        </div>
      </section>
      <section className="section shell compact-section">
        <div className="ficha-grid">
          {fichas.map((ficha) => <FichaProducto ficha={ficha} key={ficha.slug} />)}
        </div>
      </section>
    </main>
  );
}
