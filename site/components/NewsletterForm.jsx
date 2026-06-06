"use client";

import { NEWSLETTER_ACTION } from "../lib/site-config";

export function NewsletterForm() {
  const isPlaceholder = NEWSLETTER_ACTION.includes("CAMBIA-ESTO");

  if (isPlaceholder) {
    return (
      <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
        <input type="email" name="email" placeholder="Tu correo" aria-label="Email" />
        <button type="submit">Avísame</button>
        <small className="newsletter-note">Las suscripciones abren muy pronto. Mientras, tienes el radar y las ediciones aquí en la web.</small>
      </form>
    );
  }

  return (
    <form className="newsletter-form" method="post" action={NEWSLETTER_ACTION} target="_blank">
      <input type="email" name="email" placeholder="Tu correo" aria-label="Email" required />
      <button type="submit">Apuntarme</button>
    </form>
  );
}
