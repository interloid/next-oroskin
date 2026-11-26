// Generated from the Shopify theme's rendered HTML (reference/sections/about--09-marquee.html). Make content dynamic, keep the markup.
export default function About09Marquee() {
  return (
    <section id="shopify-section-template--27949758644326__marquee" className="shopify-section">
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n  @font-face {\n  font-family: "Plus Jakarta Sans";\n  font-weight: 800;\n  font-style: normal;\n  font-display: swap;\n  src: url("/cdn/fonts/plus_jakarta_sans/plusjakartasans_n8.7380fa00d61d4edf80b695b88539a3d4ae995bf7.woff2") format("woff2"),\n       url("/cdn/fonts/plus_jakarta_sans/plusjakartasans_n8.a37e2d3a4c2cd94ec2f5659fc346c8c75b5b730f.woff") format("woff");\n}\n\n',
        }}
      />{" "}
      <marquee-text
        className="marquee full-width color-scheme-2 marquee--left"
        style={
          {
            "--section-padding-top": "24px",
            "--section-padding-bottom": "80px",
            "--marquee-size": "110",
            "--marquee-duration": "40s",
          } as React.CSSProperties
        }
      >
        {" "}
        <p className="visually-hidden">Beauty heals nature, nature feeds beauty.</p>{" "}
        <div className="marquee__viewport" aria-hidden="true">
          {" "}
          <div className="marquee__track">
            <div className="marquee__half">
              <span className="marquee__item" dir="auto">
                Beauty heals nature, nature feeds beauty.
              </span>
              <span className="marquee__item marquee__item--outline" dir="auto">
                Beauty heals nature, nature feeds beauty.
              </span>
            </div>
            <div className="marquee__half">
              <span className="marquee__item" dir="auto">
                Beauty heals nature, nature feeds beauty.
              </span>
              <span className="marquee__item marquee__item--outline" dir="auto">
                Beauty heals nature, nature feeds beauty.
              </span>
            </div>
          </div>{" "}
        </div>{" "}
        <button type="button" className="marquee__pause" aria-pressed="false" hidden>
          {" "}
          <span className="visually-hidden">Pause the scrolling text</span>{" "}
          <svg
            className="marquee__pause-icon marquee__pause-icon--pause"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 16 16"
            width="16"
            height="16"
          >
            <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
            <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
          </svg>{" "}
          <svg
            className="marquee__pause-icon marquee__pause-icon--play"
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
          </svg>{" "}
        </button>{" "}
      </marquee-text>{" "}
    </section>
  );
}
