import Link from "next/link";

export const metadata = {
  title: "Privacidad y licencia | De preguntar a construir",
  description: "Esta web no recopila nada: ni cookies, ni analítica, ni emails. Proyecto open source bajo Creative Commons BY 4.0."
};

export default function PrivacidadPage() {
  return (
    <main className="section shell">
      <div className="article-page" style={{ maxWidth: 760 }}>
        <div className="eyebrow">Privacidad y licencia</div>
        <h1>No recopilamos nada</h1>
        <p className="article-deck">
          Esta revista es un proyecto abierto pensado para leerse, no para rastrearte.
        </p>

        <div className="article-body">
          <section>
            <h2>Cero datos, cero cookies</h2>
            <p>
              Esta web no usa cookies, ni analítica, ni píxeles de seguimiento, ni recopila tu email
              ni ningún dato personal. No hay perfiles, ni publicidad, ni terceros mirando lo que lees.
              Cuando las suscripciones estén activas serán por elección explícita y a través de un
              proveedor externo; hasta entonces, no se almacena nada.
            </p>
          </section>

          <section>
            <h2>Open source y Creative Commons</h2>
            <p>
              El proyecto es de código abierto y el contenido está publicado bajo licencia
              Creative Commons Reconocimiento 4.0 (CC BY 4.0). Eso significa que puedes copiar,
              compartir, adaptar y reutilizar las noticias, guías y capítulos —incluso con fines
              comerciales— siempre que cites la fuente. Si te sirve, es tuyo.
            </p>
          </section>

          <section>
            <h2>Contacto</h2>
            <p>
              Solo hay una dirección de contacto, para sugerencias e ideas:{" "}
              <a className="text-link" href="mailto:learntouseai@gmail.com">learntouseai@gmail.com</a>.
              No la usamos para nada más.
            </p>
          </section>
        </div>

        <Link className="text-link" href="/hoy/">Volver al parte de hoy</Link>
      </div>
    </main>
  );
}
