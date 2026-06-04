import Link from "next/link";
import { NewsletterForm } from "../../components/NewsletterForm";

export const metadata = {
  title: "Newsletter | De preguntar a construir"
};

const promise = [
  ["5 señales", "Modelos, repos, productos, papers o debates que merecen atención."],
  ["3 decisiones", "Qué probar, qué vigilar y qué evitar esta semana."],
  ["1 benchmark", "Una métrica explicada con límites: TTFT, tokens/s, RAM, VRAM, coste o calidad."],
  ["1 idea construible", "Un MVP que un builder pueda atacar con Codex, Claude Code, Lovable o Cursor."]
];

export default function NewsletterPage() {
  return (
    <main>
      <section className="section shell compact-section">
        <div className="newsletter-hero">
          <div>
            <div className="eyebrow">Newsletter</div>
            <h1>La semana IA para builders que no quieren perderse lo importante</h1>
            <p>
              Un resumen editorial para comprar mejor hardware, probar modelos con criterio, seguir herramientas útiles
              y encontrar ideas construibles antes de que se conviertan en ruido.
            </p>
            <NewsletterForm />
          </div>
          <aside>
            <strong>Recibe cada semana</strong>
            {promise.map(([title, text]) => (
              <p key={title}><span>{title}</span>{text}</p>
            ))}
          </aside>
        </div>
      </section>

      <section className="section shell compact-section">
        <div className="section-header">
          <div>
            <div className="eyebrow">Archivo</div>
            <h2>Las ediciones son el archivo natural de la newsletter</h2>
          </div>
          <Link className="text-link" href="/ediciones/">Ver ediciones</Link>
        </div>
      </section>
    </main>
  );
}
