import "./globals.css";
import { SiteHeader } from "../components/SiteHeader";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../lib/site-config";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_AUTHOR }],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "es_ES"
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml"
    }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "(function(){try{var t=localStorage.getItem('revista-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){}})();" }} />
        <SiteHeader />
        {children}
        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <strong>De preguntar a construir</strong>
              <p>Revista, libro vivo y radar práctico sobre ingeniería con inteligencia artificial.</p>
            </div>
            <div>
              <span>Autor</span>
              <p>Ramon Guillamon · Creative Commons</p>
            </div>
            <div>
              <span>Contacto</span>
              <p>learntouseai@gmail.com · <a href="/feed.xml">RSS</a></p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
