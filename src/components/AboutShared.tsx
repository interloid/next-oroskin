/**
 * Small pieces shared by the About us sections (about-hero, about-chapters, about-pillars, about-timeline,
 * about-team, about-values, about-numbers, marquee): breadcrumb, pause / play icons, the screen options
 * and the @font-face tags some sections print for an extra weight.
 */

export interface AboutImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

/** The theme's `fill_screen`, `scale_screen` and `text_scale` settings. */
export interface AboutScreenOptions {
  fillScreen?: boolean;
  scaleScreen?: boolean;
  textScale?: number; // %, default 110
}

export function aboutScreenClasses(o: AboutScreenOptions, fillDefault = false): string {
  const fill = o.fillScreen ?? fillDefault;
  const scale = o.scaleScreen ?? true;
  return `${fill ? ' section--fill-screen' : ''}${scale ? ' section--screen-scale' : ''}`;
}

export function aboutScreenVars(o: AboutScreenOptions): Record<string, string> {
  return (o.scaleScreen ?? true) ? { '--text-boost': String((o.textScale ?? 110) / 100) } : {};
}

/** snippets/breadcrumb.liquid */
export function Breadcrumb({ current, className }: { current: string; className?: string }) {
  return (
    <nav className={`breadcrumb${className ? ` ${className}` : ''}`} aria-label="Breadcrumb">
      <ol>
        <li>
          <a href="/">Home</a>
        </li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

/** The pause / play icon pair of the theme's pause buttons (class prefix e.g. "marquee__pause-icon"). */
export function PauseIcons({ prefix }: { prefix: string }) {
  return (
    <>
      <svg
        className={`${prefix} ${prefix}--pause`}
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
        <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
      </svg>
      <svg
        className={`${prefix} ${prefix}--play`}
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path
          d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z"
          fill="currentColor"
        ></path>
      </svg>
    </>
  );
}

const FONT_FILES = {
  newsreader_n2: {
    family: "Newsreader",
    weight: 200,
    woff2: "/cdn/fonts/newsreader/newsreader_n2.5960e0b0697503210b916625dc75038e9a2edf1e.woff2",
    woff: "/cdn/fonts/newsreader/newsreader_n2.cd4250115263c9c39d6eddb8b526847dc36a8619.woff",
  },
  newsreader_n6: {
    family: 'Newsreader',
    weight: 600,
    woff2: '/cdn/fonts/newsreader/newsreader_n6.e6648a2ece97a1b03d7262a0f4551ab429abd3d9.woff2',
    woff: '/cdn/fonts/newsreader/newsreader_n6.af48f2b7a82e36d45d4758c9ec643079979ae827.woff',
  },
  plus_jakarta_sans_n8: {
    family: '"Plus Jakarta Sans"',
    weight: 800,
    woff2: '/cdn/fonts/plus_jakarta_sans/plusjakartasans_n8.7380fa00d61d4edf80b695b88539a3d4ae995bf7.woff2',
    woff: '/cdn/fonts/plus_jakarta_sans/plusjakartasans_n8.a37e2d3a4c2cd94ec2f5659fc346c8c75b5b730f.woff',
  },
} satisfies Record<string, { family: string; weight: number; woff2: string; woff: string }>;

/** The `font_face` output a section prints for extra weights of the theme fonts (one <style> tag). */
export function FontFace({ fonts }: { fonts: (keyof typeof FONT_FILES)[] }) {
  const css = fonts
    .map((name) => {
      const f = FONT_FILES[name];
      return `@font-face {
  font-family: ${f.family};
  font-weight: ${f.weight};
  font-style: normal;
  font-display: swap;
  src: url("${f.woff2}") format("woff2"),
       url("${f.woff}") format("woff");
}
`;
    })
    .join("");
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
