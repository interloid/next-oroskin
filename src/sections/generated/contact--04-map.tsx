// Generated from the Shopify theme's rendered HTML (reference/sections/contact--04-map.html). Make content dynamic, keep the markup.
export default function Contact04Map() {
  return (
    <section id="shopify-section-template--27949758873702__map" className="shopify-section">
      {" "}
      <div
        className="locations-map full-width section-width--widest color-scheme-2 section--fill-screen section--screen-scale"
        style={
          {
            "--section-padding-top": "64px",
            "--section-padding-bottom": "96px",
            "--text-boost": "1.1",
          } as React.CSSProperties
        }
      >
        {" "}
        <animate-on-scroll className="locations-map__inner">
          {" "}
          <location-map>
            {" "}
            <div className="locations-map__header">
              <div className="locations-map__titles" data-animate="slide-left">
                <p className="eyebrow">Global presence</p>
                <h2 className="h1 locations-map__heading">
                  Find us <em>worldwide</em>
                </h2>
              </div>
              <div
                className="locations-map__filters"
                role="group"
                aria-label="Filter locations"
                data-map-filters=""
                hidden
                data-animate="fade-up"
              >
                <button type="button" className="locations-map__filter" data-filter="all" aria-pressed="true">
                  All locations
                </button>
                <button
                  type="button"
                  className="locations-map__filter"
                  data-filter="flagship-stores"
                  aria-pressed="false"
                  hidden
                >
                  Flagship stores
                </button>
                <button
                  type="button"
                  className="locations-map__filter"
                  data-filter="offices"
                  aria-pressed="false"
                  hidden
                >
                  Offices
                </button>
                <button
                  type="button"
                  className="locations-map__filter"
                  data-filter="pop-ups"
                  aria-pressed="false"
                  hidden
                >
                  Pop-ups
                </button>
              </div>{" "}
              <p
                className="visually-hidden"
                role="status"
                data-map-status=""
                data-one="[count] location shows"
                data-other="[count] locations show"
              ></p>
            </div>{" "}
            <div
              className="locations-map__map"
              style={
                {
                  "--map-ratio": "2.695",
                  "--map-ratio-mobile": "1.1",
                  "--image-ratio": "1.5",
                  "--focus-x": "0.5",
                  "--focus-y": "0.32",
                } as React.CSSProperties
              }
              data-animate="fade-up"
            >
              {" "}
              <div className="locations-map__stage">
                <img
                  className="locations-map__image"
                  src="/cdn/shop/t/8/assets/world-map-night.webp?v=109324739304745645341794925155"
                  width="1536"
                  height="1024"
                  alt=""
                  loading="eager"
                />
                <div className="locations-map__pins">
                  {" "}
                  <div
                    className="map-pin"
                    data-pin-type="flagship-stores "
                    style={{ "--pin-x": "29%", "--pin-y": "36%" } as React.CSSProperties}
                  >
                    <div className="map-pin__inner" data-animate="zoom-in">
                      {" "}
                      <span className="map-pin__dot" aria-hidden="true"></span>{" "}
                      <p className="map-pin__label">
                        {" "}
                        <span className="map-pin__name">New York</span>
                        <span className="map-pin__type">Flagship</span>
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div
                    className="map-pin"
                    data-pin-type="offices "
                    style={{ "--pin-x": "50%", "--pin-y": "35%" } as React.CSSProperties}
                  >
                    <div className="map-pin__inner" data-animate="zoom-in">
                      {" "}
                      <span className="map-pin__dot" aria-hidden="true"></span>{" "}
                      <p className="map-pin__label">
                        {" "}
                        <span className="map-pin__name">London</span>
                        <span className="map-pin__type">Studio</span>
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div
                    className="map-pin"
                    data-pin-type="pop-ups "
                    style={{ "--pin-x": "61%", "--pin-y": "45%" } as React.CSSProperties}
                  >
                    <div className="map-pin__inner" data-animate="zoom-in">
                      {" "}
                      <span className="map-pin__dot" aria-hidden="true"></span>{" "}
                      <p className="map-pin__label">
                        {" "}
                        <span className="map-pin__name">Dubai</span>
                        <span className="map-pin__type">Pop-up</span>
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div
                    className="map-pin"
                    data-pin-type="offices "
                    style={{ "--pin-x": "81%", "--pin-y": "41%" } as React.CSSProperties}
                  >
                    <div className="map-pin__inner" data-animate="zoom-in">
                      {" "}
                      <span className="map-pin__dot" aria-hidden="true"></span>{" "}
                      <p className="map-pin__label">
                        {" "}
                        <span className="map-pin__name">Tokyo</span>
                        <span className="map-pin__type">Office</span>
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </location-map>{" "}
        </animate-on-scroll>{" "}
      </div>{" "}
    </section>
  );
}
