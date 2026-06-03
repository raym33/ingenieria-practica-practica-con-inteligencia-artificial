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
      </body>
    </html>
  );
}

