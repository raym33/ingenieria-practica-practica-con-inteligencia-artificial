import { ImageResponse } from "next/og";
import { SITE_NAME } from "../lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#12161d", color: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <div style={{ height: 12, width: "100%", display: "flex", background: "#d9a441" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "54px 64px 48px" }}>
          <div style={{ display: "flex", color: "#d9a441", fontSize: 24, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>{SITE_NAME}</div>
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", maxWidth: 940, color: "#ffffff", fontSize: 64, fontWeight: 800, lineHeight: 1.02 }}>
              Comprar, probar y construir IA sin humo
            </div>
          </div>
          <div style={{ display: "flex", color: "#b9c1cd", fontSize: 28, fontWeight: 700 }}>ingenieria-practica-practica-con-in.vercel.app</div>
        </div>
      </div>
    ),
    size
  );
}
