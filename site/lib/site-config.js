// Dominio de despliegue en Vercel. Si algún día hay dominio propio, sobreescribir con NEXT_PUBLIC_SITE_URL.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ingenieria-practica-practica-con-in.vercel.app";
export const SITE_NAME = "De preguntar a construir";
export const SITE_DESCRIPTION = "Revista viva, libro y radar práctico sobre ingeniería con inteligencia artificial para builders.";
export const SITE_AUTHOR = "Redacción";
// Placeholder: sustituir por el endpoint real del proveedor de newsletter (Buttondown, Beehiiv, etc.).
export const NEWSLETTER_ACTION = process.env.NEXT_PUBLIC_NEWSLETTER_ACTION || "https://buttondown.com/api/emails/embed-subscribe/CAMBIA-ESTO";
