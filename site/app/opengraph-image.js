import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "De preguntar a construir — revista de IA para builders";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0b0d10",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ height: 14, width: "100%", display: "flex", background: "#f24b3d" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px 50px" }}>
          {/* Cabecera: marca */}
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div
              style={{
                width: 92,
                height: 92,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f24b3d",
                color: "#0b0d10",
                fontSize: 40,
                fontWeight: 900,
                borderRadius: 6
              }}
            >
              IA
            </div>
            <div style={{ display: "flex", color: "#9aa3af", fontSize: 24, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase" }}>
              Revista de IA para builders
            </div>
          </div>

          {/* Centro: wordmark + lema */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", color: "#ffffff", fontSize: 92, fontWeight: 900, lineHeight: 0.98, letterSpacing: -1 }}>
              De preguntar
            </div>
            <div style={{ display: "flex", color: "#ffffff", fontSize: 92, fontWeight: 900, lineHeight: 0.98, letterSpacing: -1 }}>
              a construir
            </div>
            <div style={{ display: "flex", maxWidth: 920, color: "#cdd6e3", fontSize: 34, fontWeight: 600, marginTop: 8 }}>
              Comprar, probar y construir IA sin humo.
            </div>
          </div>

          {/* Pie: temas + dominio */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", color: "#f24b3d", fontSize: 22, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>
              Inferencia · RAG · Agentes · Hardware
            </div>
            <div style={{ display: "flex", color: "#6b7480", fontSize: 22, fontWeight: 700 }}>
              ingenieria-practica-practica-con-in.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
