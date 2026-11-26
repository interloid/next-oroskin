// Generated from the Shopify theme's rendered HTML (reference/sections/home--00-announcement_bar.html). Make content dynamic, keep the markup.
export default function Home00AnnouncementBar() {
  return (
    <div
      id="shopify-section-sections--27949758447718__announcement_bar"
      className="shopify-section shopify-section-group-header-group"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: "\n    :root {\n      --announcement-size: 36px;\n      --announcement-text: 14px;\n    }\n  ",
        }}
      />{" "}
      <announcement-bar
        className="announcement-bar full-width color-scheme-3 announcement-bar--top announcement-bar--slideshow announcement-bar--uppercase announcement-bar--marquee-left announcement-bar--align-center announcement-bar--font-body announcement-bar--spacing-auto"
        role="region"
        aria-label="Announcements"
        data-mode="slideshow"
        data-autoplay="true"
        data-tuck="false"
        data-interval="5000"
        data-close-key="announcement-closed-fe620bd7"
        data-speed="40"
      >
        {" "}
        <div className="announcement-bar__inner">
          <button type="button" className="announcement-bar__button announcement-bar__prev" data-step="-1">
            {" "}
            <span className="visually-hidden">Previous announcement</span>{" "}
            <svg
              className="announcement-bar__arrow"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                d="M13 8H3m4-4L3 8l4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>{" "}
          </button>
          <div className="announcement-bar__messages" aria-live="off">
            <p className="announcement-bar__message announcement-bar__scroller is-active" tabIndex={0}>
              {" "}
              <span className="announcement-bar__text"> OroSkin • Signature collection • Estd. 2026</span>{" "}
            </p>
            <p className="announcement-bar__message announcement-bar__scroller" tabIndex={0}>
              {" "}
              <span className="announcement-bar__text">
                {" "}
                Free shipping on orders over $200{" "}
                <a href="/policies/shipping-policy" className="announcement-bar__link announcement-bar__link-label">
                  Shipping details
                </a>
              </span>{" "}
            </p>
            <p className="announcement-bar__message announcement-bar__scroller" tabIndex={0}>
              {" "}
              <span className="announcement-bar__text">
                {" "}
                The Glow-Up Event: up to 40% off{" "}
                <a href="/collections/all" className="announcement-bar__link announcement-bar__link-label">
                  Shop the sale
                </a>
              </span>{" "}
            </p>
            <p className="announcement-bar__message announcement-bar__scroller" tabIndex={0}>
              {" "}
              <span className="announcement-bar__text">
                {" "}
                New arrivals are here{" "}
                <a href="/collections/new-arrivals" className="announcement-bar__link announcement-bar__link-label">
                  See new arrivals
                </a>
              </span>{" "}
            </p>
            <p className="announcement-bar__message announcement-bar__scroller" tabIndex={0}>
              {" "}
              <span className="announcement-bar__text">
                {" "}
                Easy 30-day returns
                <a href="/policies/refund-policy" className="announcement-bar__link announcement-bar__link-label">
                  Returns policy
                </a>
              </span>{" "}
            </p>
          </div>
          <button type="button" className="announcement-bar__button announcement-bar__next" data-step="1">
            {" "}
            <span className="visually-hidden">Next announcement</span>{" "}
            <svg
              className="announcement-bar__arrow"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 16 16"
              width="16"
              height="16"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>{" "}
          </button>
          <button
            type="button"
            className="announcement-bar__button announcement-bar__pause"
            data-label-pause="Pause announcements"
            data-label-play="Play announcements"
            hidden
          >
            {" "}
            <span className="visually-hidden">Pause announcements</span>{" "}
            <svg
              className="announcement-bar__icon--pause"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 16 16"
              width="12"
              height="12"
            >
              <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
              <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
            </svg>{" "}
            <svg
              className="announcement-bar__icon--play"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 16 16"
              width="12"
              height="12"
            >
              <path
                d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z"
                fill="currentColor"
              ></path>
            </svg>{" "}
          </button>
          <button type="button" className="announcement-bar__button announcement-bar__close">
            {" "}
            <span className="visually-hidden">Close announcements</span>{" "}
            <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="12" height="12">
              <path
                d="m4 4 8 8M12 4l-8 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              ></path>
            </svg>{" "}
          </button>
        </div>{" "}
      </announcement-bar>{" "}
    </div>
  );
}
