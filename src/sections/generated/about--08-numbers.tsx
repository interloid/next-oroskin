// Generated from the Shopify theme's rendered HTML (reference/sections/about--08-numbers.html). Make content dynamic, keep the markup.
export default function About08Numbers() {
  return (
    <section id="shopify-section-template--27949758644326__numbers" className="shopify-section">
      {" "}
      <style
        dangerouslySetInnerHTML={{
          __html:
            '\n    @font-face {\n  font-family: Newsreader;\n  font-weight: 600;\n  font-style: normal;\n  font-display: swap;\n  src: url("/cdn/fonts/newsreader/newsreader_n6.e6648a2ece97a1b03d7262a0f4551ab429abd3d9.woff2") format("woff2"),\n       url("/cdn/fonts/newsreader/newsreader_n6.af48f2b7a82e36d45d4758c9ec643079979ae827.woff") format("woff");\n}\n\n  ',
        }}
      />{" "}
      <about-numbers
        className="about-numbers full-width section-width--widest color-scheme-2 section--screen-scale"
        style={
          {
            "--section-padding-top": "120px",
            "--section-padding-bottom": "80px",
            "--columns": "4",
            "--text-boost": "1.1",
          } as React.CSSProperties
        }
      >
        {" "}
        <div className="about-numbers__inner">
          <header className="about-numbers__header">
            <p className="eyebrow eyebrow--center">By the numbers</p>
            <h2 className="about-numbers__heading">
              <em>Proof,</em> not promises.
            </h2>
          </header>
          <animate-on-scroll className="about-numbers__list about-numbers__list--stagger">
            {" "}
            <article className="stat-figure" data-stat-card="" data-animate="fade-up">
              <p className="stat-figure__value">
                {" "}
                <span className="stat-figure__count" data-count="98" aria-hidden="true">
                  <span className="stat-figure__number">98</span>%
                </span>{" "}
                <span className="visually-hidden">98%</span>{" "}
              </p>{" "}
              <span className="stat-figure__rule" aria-hidden="true"></span>
              <h3 className="stat-figure__title">Would buy again</h3>
              <p className="stat-figure__text">Of 31,400 verified clients</p>
            </article>{" "}
            <article className="stat-figure" data-stat-card="" data-animate="fade-up">
              <p className="stat-figure__value">
                {" "}
                <span className="stat-figure__count" data-count="4.9" aria-hidden="true">
                  <span className="stat-figure__number">4.9</span>
                </span>{" "}
                <span className="visually-hidden">4.9</span>{" "}
              </p>{" "}
              <span className="stat-figure__rule" aria-hidden="true"></span>
              <h3 className="stat-figure__title">Average rating</h3>
              <p className="stat-figure__text">Across every piece we make</p>
            </article>{" "}
            <article className="stat-figure" data-stat-card="" data-animate="fade-up">
              <p className="stat-figure__value">
                {" "}
                <span className="stat-figure__count" data-count="25" data-group="" aria-hidden="true">
                  <span className="stat-figure__number">25</span>+
                </span>{" "}
                <span className="visually-hidden">25+</span>{" "}
              </p>{" "}
              <span className="stat-figure__rule" aria-hidden="true"></span>
              <h3 className="stat-figure__title">Global products</h3>
              <p className="stat-figure__text">Luxury products curated globally</p>
            </article>{" "}
            <article className="stat-figure" data-stat-card="" data-animate="fade-up">
              <p className="stat-figure__value">
                {" "}
                <span className="stat-figure__count" data-count="15" aria-hidden="true">
                  <span className="stat-figure__number">15</span>
                </span>{" "}
                <span className="visually-hidden">15</span>{" "}
              </p>{" "}
              <span className="stat-figure__rule" aria-hidden="true"></span>
              <h3 className="stat-figure__title">Total awards</h3>
              <p className="stat-figure__text">Industry awards since 2018</p>
            </article>{" "}
          </animate-on-scroll>
        </div>{" "}
      </about-numbers>{" "}
    </section>
  );
}
