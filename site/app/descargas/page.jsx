import Link from "next/link";

export const metadata = {
  title: "Leer online | De preguntar a construir",
  description: "Consulta online la guía de conceptos y terminología de IA y la actualidad editorial."
};

export default function DescargasPage() {
  return (
    <main className="section shell">
      <div className="download-band">
        <h1>Todo el contenido se lee online</h1>
        <p>
          Consulta la guía de conceptos y terminología de IA o revisa las novedades y
          decisiones editoriales del día directamente en la web.
        </p>
        <div className="actions">
          <Link className="button primary" href="/aprender/">Ir a Aprender</Link>
          <Link className="button secondary" href="/hoy/">Ver Hoy</Link>
        </div>
      </div>
    </main>
  );
}
