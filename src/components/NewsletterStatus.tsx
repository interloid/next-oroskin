'use client';
import { useEffect, useState } from 'react';

/**
 * The newsletter form's message after a send (theme: snippets/newsletter-form.liquid, form.posted_successfully?).
 * /api/newsletter answers a form post with a 303 back to the page plus ?customer_posted=true or ?customer_error=…;
 * the footer is in the layout (no searchParams there), so the message reads the URL in the browser.
 */
export default function NewsletterStatus({ formId }: { formId: string }) {
  const [state, setState] = useState<'ok' | 'error' | null>(null);
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const next = p.get('customer_posted') === 'true' ? 'ok' : p.get('customer_error') ? 'error' : null;
    if (!next) return;
    setState(next);
    // Clean the URL so a reload doesn't show it again, then bring the message into view for screen readers.
    p.delete('customer_posted');
    p.delete('customer_error');
    history.replaceState(null, '', location.pathname + (p.size ? `?${p}` : '') + location.hash);
    const t = setTimeout(() => document.getElementById(`${formId}-message`)?.focus(), 50);
    return () => clearTimeout(t);
  }, [formId]);
  if (!state) return null;
  return state === 'ok' ? (
    <p className="form-message form-message--success newsletter-form__message" id={`${formId}-message`} tabIndex={-1}>
      Thanks for subscribing. Look out for our next email.
    </p>
  ) : (
    <p className="form-message form-message--error newsletter-form__message" id={`${formId}-message`} tabIndex={-1}>
      Email is invalid. Enter an email address like name@example.com.
    </p>
  );
}
