import "./globals.css";
import { SiteHeader } from "../components/SiteHeader";

export const metadata = {
  title: "De preguntar a construir",
  description: "Libro vivo sobre ingeniería práctica con inteligencia artificial.",
  authors: [{ name: "Ramon Guillamon" }]
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
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
              <p>learntouseai@gmail.com</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
