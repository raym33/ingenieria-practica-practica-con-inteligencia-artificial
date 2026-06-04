export const DEFAULT_AUTHOR = "redaccion";

export const authors = [
  {
    slug: "redaccion",
    name: "Redacción",
    role: "Equipo editorial",
    bio: "La redacción de De preguntar a construir cubre IA práctica, hardware de inferencia y herramientas para builders. Sin hype: comprar, probar y construir.",
    email: "learntouseai@gmail.com"
  }
];

export function getAuthor(slug) {
  return authors.find((author) => author.slug === slug);
}
