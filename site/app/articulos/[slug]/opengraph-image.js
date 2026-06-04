import { ImageResponse } from "next/og";
import { articles, getArticle } from "../../../lib/articles";
import { SITE_NAME } from "../../../lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  const title = article?.title || "Artículo de IA práctica para builders";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#12161d", color: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <div style={{ height: 12, width: "100%", display: "flex", background: "#d9a441" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "46px 58px 42px" }}>
          <div style={{ display: "flex", color: "#d9a441", fontSize: 22, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>{SITE_NAME}</div>
          <div style={{ display: "flex", marginTop: 34 }}>
            <div style={{ display: "flex", padding: "10px 16px", background: "#c9362c", color: "#ffffff", fontSize: 22, fontWeight: 800, textTransform: "uppercase" }}>
              {article?.section || "Artículo"}
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", maxWidth: 1040, color: "#ffffff", fontSize: 58, fontWeight: 800, lineHeight: 1.04 }}>
              {title}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#b9c1cd", fontSize: 26, fontWeight: 700 }}>
            <div style={{ display: "flex" }}>Redacción</div>
            <div style={{ display: "flex" }}>ingenieria-practica-practica-con-in.vercel.app</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
