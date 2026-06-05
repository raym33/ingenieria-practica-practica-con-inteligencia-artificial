export function BenchmarkChart({ medicion }) {
  const maxValue = Math.max(...medicion.items.map((item) => item.value), 0);
  const confidenceClass =
    medicion.confidence === "verificado" ? "bench-badge bench-badge-verified" : "bench-badge bench-badge-warning";
  const ariaLabel = `${medicion.title}. ${medicion.note}. Valores en ${medicion.unit}.`;

  return (
    <article className="bench-chart" role="img" aria-label={ariaLabel}>
      <div className="bench-head">
        <div>
          <h3>{medicion.title}</h3>
          <p>{medicion.note}</p>
        </div>
        <span className={confidenceClass}>{medicion.confidenceLabel}</span>
      </div>

      <div className="bench-bars">
        {medicion.items.map((item) => {
          const width = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
          return (
            <div className={item.highlight ? "bench-row bench-row-highlight" : "bench-row"} key={item.label}>
              <span className="bench-label">{item.label}</span>
              <div className="bench-track">
                <div
                  aria-label={`${item.label}: ${item.value} ${medicion.unit}`}
                  className={item.highlight ? "bench-fill bench-fill-highlight" : "bench-fill"}
                  style={{ width: `${width}%` }}
                />
              </div>
              <span className="bench-value">
                {item.value} {medicion.unit}
              </span>
            </div>
          );
        })}
      </div>

      <footer className="bench-source">
        <a className="text-link" href={medicion.source[1]}>
          {medicion.source[0]}
        </a>
      </footer>
    </article>
  );
}
