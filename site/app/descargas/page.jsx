import Link from "next/link";

export const metadata = {
  title: "Descargas | De preguntar a construir",
  description: "Descarga la edición actual en PDF: portada, radar de señales, guías y capítulos del libro vivo."
};

export default function DescargasPage() {
  return (
    <main className="section shell">
      <div className="download-band">
        <h1>Descarga la edición en PDF</h1>
        <p>
          La versión coleccionable del número actual: portada editorial, radar de señales,
          guías prácticas, artículos seleccionados y capítulos del libro vivo, en un solo archivo.
        </p>
        <div className="actions">
          <a className="button primary" href="/downloads/de-preguntar-a-construir.pdf">Descargar PDF</a>
          <Link className="button secondary" href="/biblioteca/">Leer online</Link>
        </div>
      </div>
    </main>
  );
}

