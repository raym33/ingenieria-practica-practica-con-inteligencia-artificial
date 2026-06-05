// Mediciones para la sección Empresa. Regla: cada dataset lleva fuente y nivel
// de confianza. No inventamos cifras; si una medición viene de X sin verificar,
// se marca como tal. La gráfica muestra siempre el contexto, no solo barras.

export const mediciones = [
  {
    id: "decode-m1max-llama32-3b",
    title: "Decode en M1 Max — Llama 3.2 3B (4-bit)",
    note: "Tokens por segundo de generación, mismo modelo y cuantización, tres runtimes.",
    unit: "tok/s",
    confidence: "verificado",
    confidenceLabel: "Medido y publicado por el autor",
    source: ["Kubesimplify — mlxcel probado en M1 Max", "https://blog.kubesimplify.com/mlxcel-rust-native-inference-engine-tested-on-m1-max"],
    items: [
      { label: "mlx-lm", value: 67.63 },
      { label: "mlxcel", value: 63.33, highlight: true },
      { label: "Ollama", value: 48.73 }
    ]
  },
  {
    id: "decode-m1max-qwen25-7b",
    title: "Decode en M1 Max — Qwen 2.5 7B (4-bit)",
    note: "Mismo banco, modelo mayor: la ventaja entre runtimes se estrecha.",
    unit: "tok/s",
    confidence: "verificado",
    confidenceLabel: "Medido y publicado por el autor",
    source: ["Kubesimplify — mlxcel probado en M1 Max", "https://blog.kubesimplify.com/mlxcel-rust-native-inference-engine-tested-on-m1-max"],
    items: [
      { label: "mlx-lm", value: 31.80 },
      { label: "mlxcel", value: 31.33, highlight: true },
      { label: "Ollama", value: 24.23 }
    ]
  },
  {
    id: "decode-multi-3090-qwen27b",
    title: "Generación en multi-RTX 3090 — Qwen 27B Q5",
    note: "Reportado en X, sin fuente reproducible: úsalo como punto de partida, no como dato.",
    unit: "tok/s",
    confidence: "no-verificado",
    confidenceLabel: "Señal de X · sin verificar",
    source: ["Señal en X — @MatulaWojtek", "https://x.com/MatulaWojtek/status/2062479026455736715"],
    items: [
      { label: "3× RTX 3090 (TP+MTP)", value: 76.46, highlight: true }
    ]
  }
];

export function getMedicion(id) {
  return mediciones.find((m) => m.id === id);
}
