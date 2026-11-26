/**
 * Small pieces shared by the Contact page sections (contact-form, contact-channels, locations-map,
 * contact-locations): the "Fill the screen height" / "Scale with the screen" options and the status dot.
 */

/** Options of the theme's `fill_screen`, `scale_screen` and `text_scale` settings. */
export interface ScreenOptions {
  fillScreen?: boolean; // section--fill-screen (default on)
  scaleScreen?: boolean; // section--screen-scale (default on)
  textBoost?: number; // --text-boost, only with scaleScreen (default 1.1)
}

/** Root class suffix: " section--fill-screen section--screen-scale". */
export function screenClasses({ fillScreen = true, scaleScreen = true }: ScreenOptions): string {
  return `${fillScreen ? ' section--fill-screen' : ''}${scaleScreen ? ' section--screen-scale' : ''}`;
}

/** The --text-boost variable (written only with Scale with the screen on, like the theme). */
export function screenVars({ scaleScreen = true, textBoost = 1.1 }: ScreenOptions): Record<string, string> {
  return scaleScreen ? { '--text-boost': String(textBoost) } : {};
}

/** Theme snippets/status-dot.liquid: the pulsing green dot. */
export function StatusDot() {
  return <span className="status-dot " aria-hidden="true"></span>;
}
