import Link from "next/link";

export const metadata = {
  title: "Descargas | De preguntar a construir"
};

export default function DescargasPage() {
  return (
    <main className="section shell">
      <div className="download-band">
        <h1>Descargas</h1>
        <p>
          La edición PDF se genera desde el sistema editorial local. Cuando publiques en Vercel, puedes copiar el PDF más reciente a `site/public/downloads/`.
        </p>
        <div className="actions">
          <Link className="button primary" href="/biblioteca/">Leer online</Link>
          <a className="button secondary" href="/downloads/de-preguntar-a-construir.pdf">Descargar PDF</a>
        </div>
      </div>
    </main>
  );
}

