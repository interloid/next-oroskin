'use client';
import { useEffect } from 'react';

/**
 * On pages that are generated ahead of time the header is the same for everybody: cart count 0.
 * Once the theme's <cart-count> element is ready, this asks it to read the visitor's real cart
 * ("cart:changed" makes it fetch /cart.js and update the bubble, exactly as after a quick add).
 * The sign-in state needs no request: see the start-up script in src/app/layout.tsx.
 */
export default function VisitorSync() {
  useEffect(() => {
    let live = true;
    customElements.whenDefined('cart-count').then(() => {
      if (live) document.dispatchEvent(new CustomEvent('cart:changed'));
    });
    return () => {
      live = false;
    };
  }, []);
  return null;
}
