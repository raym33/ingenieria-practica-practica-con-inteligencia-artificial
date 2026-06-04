"use client";

import { NEWSLETTER_ACTION } from "../lib/site-config";

export function NewsletterForm() {
  const isPlaceholder = NEWSLETTER_ACTION.includes("CAMBIA-ESTO");

  return (
    <form className="newsletter-form" method="post" action={NEWSLETTER_ACTION} target="_blank">
      <input type="email" name="email" placeholder="tu@email.com" aria-label="Email" required />
      <button type="submit">Apuntarme</button>
      {isPlaceholder ? <small className="newsletter-note">Endpoint de newsletter pendiente de configurar.</small> : null}
    </form>
  );
}
