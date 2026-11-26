'use client';
import { useEffect } from 'react';

/**
 * Loads the theme's web components (public/theme.js = every {% javascript %} of the Shopify theme)
 * after React has hydrated, so the components can change the DOM without hydration errors.
 */
export default function ThemeScripts() {
  useEffect(() => {
    if (document.getElementById('oroskin-theme-js')) return;
    for (const [id, src] of [['oroskin-aos-js', '/assets/animate-on-scroll.js'], ['oroskin-theme-js', '/theme.js']]) {
      const s = document.createElement('script');
      s.id = id;
      s.src = src;
      s.async = false;
      document.body.appendChild(s);
    }
  }, []);
  return null;
}
