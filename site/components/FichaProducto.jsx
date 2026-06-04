const badgeClass = {
  "Vigilar": "ficha-badge-gold",
  "Comprar con criterio": "ficha-badge-teal"
};

export function FichaProducto({ ficha }) {
  const badge = badgeClass[ficha.etiqueta] || "ficha-badge-coral";

  return (
    <article className="ficha-card">
      <div className="ficha-top">
        <div>
          <span className="ficha-brand">{ficha.marca}</span>
          <h2>{ficha.nombre}</h2>
        </div>
        <span className={`ficha-badge ${badge}`}>{ficha.etiqueta}</span>
      </div>
      <p className="ficha-type">{ficha.tipo}</p>
      <dl className="ficha-fields">
        <div><dt>Memoria</dt><dd>{ficha.memoria}</dd></div>
        <div><dt>Aceleración</dt><dd>{ficha.aceleracion}</dd></div>
        <div><dt>Uso recomendado</dt><dd>{ficha.usoRecomendado}</dd></div>
        <div>
          <dt>Runtimes</dt>
          <dd className="ficha-tags">{ficha.runtimes.map((runtime) => <span className="tag" key={runtime}>{runtime}</span>)}</dd>
        </div>
        <div><dt>Modelos</dt><dd>{ficha.modelos}</dd></div>
        <div><dt>Limitaciones</dt><dd>{ficha.limitaciones}</dd></div>
      </dl>
      <div className="ficha-verdict">{ficha.veredicto}</div>
      <div className="ficha-sources">
        {ficha.fuentes.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </div>
    </article>
  );
}
