export const DEFAULT_AUTHOR = "ramon-guillamon";

export const authors = [
  {
    slug: "ramon-guillamon",
    name: "Ramón Guillamón",
    role: "Editor",
    bio: "Escribe sobre IA práctica, hardware de inferencia y herramientas para builders. Sin hype: comprar, probar y construir.",
    email: "learntouseai@gmail.com"
  }
];

export function getAuthor(slug) {
  return authors.find((author) => author.slug === slug);
}
