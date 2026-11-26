// Generated from the Shopify theme's rendered HTML (reference/sections/blog--04-main.html). Make content dynamic, keep the markup.
export default function Blog04Main() {
  return (
    <section id="shopify-section-template--27949758480486__main" className="shopify-section">
      {" "}
      <div
        className="blog-list full-width section-width--widest color-scheme-2"
        style={{ "--section-padding-top": "24px", "--section-padding-bottom": "80px" } as React.CSSProperties}
      >
        {" "}
        <results-view className="blog-list__inner" data-section-id="template--27949758480486__main">
          <blog-toolbar className="blog-list__toolbar blog-list__toolbar--sticky">
            <form className="blog-list__search" action="/search" method="get" role="search">
              {" "}
              <input type="hidden" name="type" value="article" />{" "}
              <input type="hidden" name="options[prefix]" value="last" />{" "}
              <label className="visually-hidden" htmlFor="BlogSearch-template--27949758480486__main">
                Search the blog
              </label>{" "}
              <input
                className="blog-list__search-input"
                id="BlogSearch-template--27949758480486__main"
                type="search"
                name="q"
                placeholder="Search blogs…"
                autoComplete="off"
                required
              />{" "}
              <button className="blog-list__search-button" type="submit">
                {" "}
                <span className="visually-hidden">Search</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.49928 1.91687e-08C7.14387 0.000115492 5.80814 0.324364 4.60353 0.945694C3.39893 1.56702 2.36037 2.46742 1.57451 3.57175C0.788656 4.67609 0.278287 5.95235 0.0859852 7.29404C-0.106316 8.63574 0.0250263 10.004 0.469055 11.2846C0.913084 12.5652 1.65692 13.7211 2.63851 14.6557C3.6201 15.5904 4.81098 16.2768 6.11179 16.6576C7.4126 17.0384 8.78562 17.1026 10.1163 16.8449C11.447 16.5872 12.6967 16.015 13.7613 15.176L17.4133 18.828C17.6019 19.0102 17.8545 19.111 18.1167 19.1087C18.3789 19.1064 18.6297 19.0012 18.8151 18.8158C19.0005 18.6304 19.1057 18.3796 19.108 18.1174C19.1102 17.8552 19.0094 17.6026 18.8273 17.414L15.1753 13.762C16.1633 12.5086 16.7784 11.0024 16.9504 9.41573C17.1223 7.82905 16.8441 6.22602 16.1475 4.79009C15.4509 3.35417 14.3642 2.14336 13.0116 1.29623C11.659 0.449106 10.0952 -0.000107143 8.49928 1.91687e-08ZM1.99928 8.5C1.99928 6.77609 2.6841 5.12279 3.90308 3.90381C5.12207 2.68482 6.77537 2 8.49928 2C10.2232 2 11.8765 2.68482 13.0955 3.90381C14.3145 5.12279 14.9993 6.77609 14.9993 8.5C14.9993 10.2239 14.3145 11.8772 13.0955 13.0962C11.8765 14.3152 10.2232 15 8.49928 15C6.77537 15 5.12207 14.3152 3.90308 13.0962C2.6841 11.8772 1.99928 10.2239 1.99928 8.5Z"
                    fill="currentColor"
                  ></path>
                </svg>{" "}
              </button>{" "}
            </form>
            <nav
              className="blog-list__topics"
              id="BlogTopics-template--27949758480486__main"
              aria-label="Blog topics"
              data-results-part=""
            >
              {" "}
              <ul className="blog-list__topic-list" role="list">
                {" "}
                <li>
                  {" "}
                  <a className="blog-list__topic" href="/blogs/featured" data-results-link="" aria-current="page">
                    All
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="blog-list__topic" href="/blogs/featured/tagged/beauty-rituals" data-results-link="">
                    Beauty rituals
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="blog-list__topic" href="/blogs/featured/tagged/guide" data-results-link="">
                    Guide
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="blog-list__topic" href="/blogs/featured/tagged/ingredients" data-results-link="">
                    Ingredients
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="blog-list__topic" href="/blogs/featured/tagged/makeup" data-results-link="">
                    Makeup
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="blog-list__topic" href="/blogs/featured/tagged/science" data-results-link="">
                    Science
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="blog-list__topic" href="/blogs/featured/tagged/skin-care" data-results-link="">
                    Skin care
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="blog-list__topic" href="/blogs/featured/tagged/sustainability" data-results-link="">
                    Sustainability
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="blog-list__topic" href="/blogs/featured/tagged/trends" data-results-link="">
                    Trends
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a className="blog-list__topic" href="/blogs/featured/tagged/wellness" data-results-link="">
                    Wellness
                  </a>{" "}
                </li>
              </ul>{" "}
            </nav>
          </blog-toolbar>
          <div
            className="blog-list__results"
            id="BlogResults-template--27949758480486__main"
            tabIndex={-1}
            data-results-part=""
            data-results-main=""
          >
            <animate-on-scroll className="blog-list__reveal">
              <div className="blog-list__featured">
                {" "}
                <article className="article-card article-card--featured" data-animate="fade-up">
                  <div className="article-card__media">
                    <img
                      src="/cdn/shop/articles/blog-glow-routine.png?v=1793357310&width=1600"
                      alt=""
                      srcSet="/cdn/shop/articles/blog-glow-routine.png?v=1793357310&width=400 400w, /cdn/shop/articles/blog-glow-routine.png?v=1793357310&width=600 600w, /cdn/shop/articles/blog-glow-routine.png?v=1793357310&width=800 800w, /cdn/shop/articles/blog-glow-routine.png?v=1793357310&width=1000 1000w, /cdn/shop/articles/blog-glow-routine.png?v=1793357310&width=1200 1200w, /cdn/shop/articles/blog-glow-routine.png?v=1793357310&width=1600 1600w"
                      width="1600"
                      height="1000"
                      loading="eager"
                      sizes="(min-width: 1200px) 48vw, 92vw"
                    />{" "}
                    <span className="article-card__topic color-scheme-2">Science</span>
                  </div>
                  <div className="article-card__body">
                    <span className="article-card__pill">Featured story</span>
                    <h2 className="article-card__title">
                      {" "}
                      <a
                        className="article-card__link"
                        href="/blogs/featured/the-art-of-the-golden-hour-morning-ritual"
                      >
                        The Art of the Golden Hour Morning Ritual
                      </a>{" "}
                    </h2>
                    <p className="article-card__excerpt">
                      How the most luminous skin in the world begins not with products, but with intention, and the
                      five-step morning ritual that changes the way you relate to your own skin.
                    </p>
                    <div className="article-card__meta">
                      <span className="article-card__author">
                        {" "}
                        <span className="article-card__avatar" aria-hidden="true">
                          DA{" "}
                        </span>{" "}
                        Dr. Céleste Arnaud{" "}
                      </span>
                      <span className="article-card__facts">
                        <span className="article-card__fact">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect x="3.5" y="5" width="17" height="15.5" rx="2.5"></rect>
                            <path d="M3.5 10h17M8 3v4M16 3v4"></path>
                          </svg>{" "}
                          <time dateTime="2026-10-28T08:00:00Z">October 28, 2026</time>{" "}
                        </span>
                        <span className="article-card__fact">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M12 7v5l3 2"></path>
                          </svg>{" "}
                          4 min read{" "}
                        </span>{" "}
                      </span>
                      <span className="article-card__arrow color-scheme-2" aria-hidden="true">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M8.95039 0.394074L15.6198 7.05525C15.7413 7.18195 15.8365 7.33135 15.8999 7.49489C16.0334 7.81923 16.0334 8.18304 15.8999 8.50739C15.8365 8.67092 15.7413 8.82032 15.6198 8.94702L8.95039 15.6082C8.82602 15.7324 8.67837 15.8309 8.51587 15.8982C8.35337 15.9654 8.17921 16 8.00332 16C7.64811 16 7.30744 15.8591 7.05626 15.6082C6.80509 15.3573 6.66398 15.0171 6.66398 14.6623C6.66398 14.3075 6.80509 13.9673 7.05626 13.7164L11.4581 9.33337L1.33389 9.33337C0.980118 9.33337 0.640838 9.19301 0.390685 8.94317C0.140532 8.69333 0 8.35447 0 8.00114C0 7.64781 0.140532 7.30895 0.390685 7.0591C0.640838 6.80926 0.980118 6.6689 1.33389 6.6689L11.4581 6.6689L7.05626 2.28585C6.93124 2.162 6.83201 2.01465 6.76429 1.85231C6.69657 1.68996 6.6617 1.51583 6.6617 1.33996C6.6617 1.16409 6.69657 0.989959 6.76429 0.827614C6.83201 0.665269 6.93124 0.517923 7.05626 0.394074C7.18027 0.269207 7.3278 0.170094 7.49034 0.102458C7.65289 0.0348225 7.82724 9.53674e-07 8.00332 9.53674e-07C8.17941 9.53674e-07 8.35376 0.0348225 8.51631 0.102458C8.67885 0.170094 8.82638 0.269207 8.95039 0.394074Z"
                            fill="currentColor"
                          ></path>{" "}
                        </svg>{" "}
                      </span>
                    </div>{" "}
                  </div>{" "}
                </article>{" "}
              </div>
              <h2 className="visually-hidden">Articles</h2>
              <ul className="blog-list__grid blog-list__grid--mixed" role="list">
                <li className="blog-list__item">
                  {" "}
                  <article className="article-card" data-animate="fade-up">
                    <div className="article-card__media">
                      <img
                        src="/cdn/shop/articles/signature-body-mist-2.png?v=1793357315&width=1600"
                        alt=""
                        srcSet="/cdn/shop/articles/signature-body-mist-2.png?v=1793357315&width=400 400w, /cdn/shop/articles/signature-body-mist-2.png?v=1793357315&width=600 600w, /cdn/shop/articles/signature-body-mist-2.png?v=1793357315&width=800 800w, /cdn/shop/articles/signature-body-mist-2.png?v=1793357315&width=1000 1000w, /cdn/shop/articles/signature-body-mist-2.png?v=1793357315&width=1200 1200w, /cdn/shop/articles/signature-body-mist-2.png?v=1793357315&width=1600 1600w"
                        width="1600"
                        height="1600"
                        loading="lazy"
                        sizes="(min-width: 1200px) 21vw, (min-width: 375px) 92vw, 92vw"
                      />{" "}
                      <span className="article-card__topic color-scheme-2">Wellness</span>
                      <span
                        className="article-card__arrow article-card__arrow--badge color-scheme-2"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M8.95039 0.394074L15.6198 7.05525C15.7413 7.18195 15.8365 7.33135 15.8999 7.49489C16.0334 7.81923 16.0334 8.18304 15.8999 8.50739C15.8365 8.67092 15.7413 8.82032 15.6198 8.94702L8.95039 15.6082C8.82602 15.7324 8.67837 15.8309 8.51587 15.8982C8.35337 15.9654 8.17921 16 8.00332 16C7.64811 16 7.30744 15.8591 7.05626 15.6082C6.80509 15.3573 6.66398 15.0171 6.66398 14.6623C6.66398 14.3075 6.80509 13.9673 7.05626 13.7164L11.4581 9.33337L1.33389 9.33337C0.980118 9.33337 0.640838 9.19301 0.390685 8.94317C0.140532 8.69333 0 8.35447 0 8.00114C0 7.64781 0.140532 7.30895 0.390685 7.0591C0.640838 6.80926 0.980118 6.6689 1.33389 6.6689L11.4581 6.6689L7.05626 2.28585C6.93124 2.162 6.83201 2.01465 6.76429 1.85231C6.69657 1.68996 6.6617 1.51583 6.6617 1.33996C6.6617 1.16409 6.69657 0.989959 6.76429 0.827614C6.83201 0.665269 6.93124 0.517923 7.05626 0.394074C7.18027 0.269207 7.3278 0.170094 7.49034 0.102458C7.65289 0.0348225 7.82724 9.53674e-07 8.00332 9.53674e-07C8.17941 9.53674e-07 8.35376 0.0348225 8.51631 0.102458C8.67885 0.170094 8.82638 0.269207 8.95039 0.394074Z"
                            fill="currentColor"
                          ></path>{" "}
                        </svg>{" "}
                      </span>
                    </div>
                    <div className="article-card__body">
                      <h3 className="article-card__title">
                        {" "}
                        <a
                          className="article-card__link"
                          href="/blogs/featured/how-to-layer-scent-so-it-lasts-past-lunch"
                        >
                          How to layer scent so it lasts past lunch
                        </a>{" "}
                      </h3>
                      <div className="article-card__meta">
                        <span className="article-card__author">
                          {" "}
                          <span className="article-card__avatar" aria-hidden="true">
                            SJ{" "}
                          </span>{" "}
                          Sarah Jenkins{" "}
                        </span>
                        <span className="article-card__facts">
                          <span className="article-card__fact">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="9"></circle>
                              <path d="M12 7v5l3 2"></path>
                            </svg>{" "}
                            1 min read{" "}
                          </span>{" "}
                        </span>
                      </div>{" "}
                    </div>{" "}
                  </article>{" "}
                </li>
                <li className="blog-list__item">
                  {" "}
                  <article className="article-card" data-animate="fade-up">
                    <div className="article-card__media">
                      <img
                        src="/cdn/shop/articles/272777ed85f9d5953dc6f914a9442655c2a44af6.png?v=1792576377&width=1600"
                        alt=""
                        srcSet="/cdn/shop/articles/272777ed85f9d5953dc6f914a9442655c2a44af6.png?v=1792576377&width=400 400w, /cdn/shop/articles/272777ed85f9d5953dc6f914a9442655c2a44af6.png?v=1792576377&width=600 600w, /cdn/shop/articles/272777ed85f9d5953dc6f914a9442655c2a44af6.png?v=1792576377&width=800 800w, /cdn/shop/articles/272777ed85f9d5953dc6f914a9442655c2a44af6.png?v=1792576377&width=1000 1000w, /cdn/shop/articles/272777ed85f9d5953dc6f914a9442655c2a44af6.png?v=1792576377&width=1200 1200w, /cdn/shop/articles/272777ed85f9d5953dc6f914a9442655c2a44af6.png?v=1792576377&width=1600 1600w"
                        width="1600"
                        height="1067"
                        loading="lazy"
                        sizes="(min-width: 1200px) 49vw, (min-width: 375px) 46vw, 92vw"
                      />{" "}
                      <span className="article-card__topic color-scheme-2">Skin care</span>
                      <span
                        className="article-card__arrow article-card__arrow--badge color-scheme-2"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M8.95039 0.394074L15.6198 7.05525C15.7413 7.18195 15.8365 7.33135 15.8999 7.49489C16.0334 7.81923 16.0334 8.18304 15.8999 8.50739C15.8365 8.67092 15.7413 8.82032 15.6198 8.94702L8.95039 15.6082C8.82602 15.7324 8.67837 15.8309 8.51587 15.8982C8.35337 15.9654 8.17921 16 8.00332 16C7.64811 16 7.30744 15.8591 7.05626 15.6082C6.80509 15.3573 6.66398 15.0171 6.66398 14.6623C6.66398 14.3075 6.80509 13.9673 7.05626 13.7164L11.4581 9.33337L1.33389 9.33337C0.980118 9.33337 0.640838 9.19301 0.390685 8.94317C0.140532 8.69333 0 8.35447 0 8.00114C0 7.64781 0.140532 7.30895 0.390685 7.0591C0.640838 6.80926 0.980118 6.6689 1.33389 6.6689L11.4581 6.6689L7.05626 2.28585C6.93124 2.162 6.83201 2.01465 6.76429 1.85231C6.69657 1.68996 6.6617 1.51583 6.6617 1.33996C6.6617 1.16409 6.69657 0.989959 6.76429 0.827614C6.83201 0.665269 6.93124 0.517923 7.05626 0.394074C7.18027 0.269207 7.3278 0.170094 7.49034 0.102458C7.65289 0.0348225 7.82724 9.53674e-07 8.00332 9.53674e-07C8.17941 9.53674e-07 8.35376 0.0348225 8.51631 0.102458C8.67885 0.170094 8.82638 0.269207 8.95039 0.394074Z"
                            fill="currentColor"
                          ></path>{" "}
                        </svg>{" "}
                      </span>
                    </div>
                    <div className="article-card__body">
                      <h3 className="article-card__title">
                        {" "}
                        <a className="article-card__link" href="/blogs/featured/the-skin-moisturizer">
                          The Skin Moisturizer
                        </a>{" "}
                      </h3>
                      <div className="article-card__meta">
                        <span className="article-card__author">
                          {" "}
                          <span className="article-card__avatar" aria-hidden="true">
                            HI{" "}
                          </span>{" "}
                          Hariprathap interloid{" "}
                        </span>
                        <span className="article-card__facts">
                          <span className="article-card__fact">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="9"></circle>
                              <path d="M12 7v5l3 2"></path>
                            </svg>{" "}
                            1 min read{" "}
                          </span>{" "}
                        </span>
                      </div>{" "}
                    </div>{" "}
                  </article>{" "}
                </li>
                <li className="blog-list__item">
                  {" "}
                  <article className="article-card" data-animate="fade-up">
                    <div className="article-card__media">
                      <img
                        src="/cdn/shop/articles/89f877192d8d64d9822cdc07fe0a213e0663a39c.png?v=1792576319&width=1600"
                        alt=""
                        srcSet="/cdn/shop/articles/89f877192d8d64d9822cdc07fe0a213e0663a39c.png?v=1792576319&width=400 400w, /cdn/shop/articles/89f877192d8d64d9822cdc07fe0a213e0663a39c.png?v=1792576319&width=600 600w, /cdn/shop/articles/89f877192d8d64d9822cdc07fe0a213e0663a39c.png?v=1792576319&width=800 800w, /cdn/shop/articles/89f877192d8d64d9822cdc07fe0a213e0663a39c.png?v=1792576319&width=1000 1000w, /cdn/shop/articles/89f877192d8d64d9822cdc07fe0a213e0663a39c.png?v=1792576319&width=1200 1200w, /cdn/shop/articles/89f877192d8d64d9822cdc07fe0a213e0663a39c.png?v=1792576319&width=1600 1600w"
                        width="1600"
                        height="1067"
                        loading="lazy"
                        sizes="(min-width: 1200px) 21vw, (min-width: 375px) 46vw, 92vw"
                      />{" "}
                      <span className="article-card__topic color-scheme-2">Beauty rituals</span>
                      <span
                        className="article-card__arrow article-card__arrow--badge color-scheme-2"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M8.95039 0.394074L15.6198 7.05525C15.7413 7.18195 15.8365 7.33135 15.8999 7.49489C16.0334 7.81923 16.0334 8.18304 15.8999 8.50739C15.8365 8.67092 15.7413 8.82032 15.6198 8.94702L8.95039 15.6082C8.82602 15.7324 8.67837 15.8309 8.51587 15.8982C8.35337 15.9654 8.17921 16 8.00332 16C7.64811 16 7.30744 15.8591 7.05626 15.6082C6.80509 15.3573 6.66398 15.0171 6.66398 14.6623C6.66398 14.3075 6.80509 13.9673 7.05626 13.7164L11.4581 9.33337L1.33389 9.33337C0.980118 9.33337 0.640838 9.19301 0.390685 8.94317C0.140532 8.69333 0 8.35447 0 8.00114C0 7.64781 0.140532 7.30895 0.390685 7.0591C0.640838 6.80926 0.980118 6.6689 1.33389 6.6689L11.4581 6.6689L7.05626 2.28585C6.93124 2.162 6.83201 2.01465 6.76429 1.85231C6.69657 1.68996 6.6617 1.51583 6.6617 1.33996C6.6617 1.16409 6.69657 0.989959 6.76429 0.827614C6.83201 0.665269 6.93124 0.517923 7.05626 0.394074C7.18027 0.269207 7.3278 0.170094 7.49034 0.102458C7.65289 0.0348225 7.82724 9.53674e-07 8.00332 9.53674e-07C8.17941 9.53674e-07 8.35376 0.0348225 8.51631 0.102458C8.67885 0.170094 8.82638 0.269207 8.95039 0.394074Z"
                            fill="currentColor"
                          ></path>{" "}
                        </svg>{" "}
                      </span>
                    </div>
                    <div className="article-card__body">
                      <h3 className="article-card__title">
                        {" "}
                        <a className="article-card__link" href="/blogs/featured/the-art-of-the-morning-ritual">
                          The Art of the Morning Ritual
                        </a>{" "}
                      </h3>
                      <div className="article-card__meta">
                        <span className="article-card__author">
                          {" "}
                          <span className="article-card__avatar" aria-hidden="true">
                            HI{" "}
                          </span>{" "}
                          Hariprathap interloid{" "}
                        </span>
                        <span className="article-card__facts">
                          <span className="article-card__fact">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="9"></circle>
                              <path d="M12 7v5l3 2"></path>
                            </svg>{" "}
                            1 min read{" "}
                          </span>{" "}
                        </span>
                      </div>{" "}
                    </div>{" "}
                  </article>{" "}
                </li>
                <li className="blog-list__item">
                  {" "}
                  <article className="article-card" data-animate="fade-up">
                    <div className="article-card__media">
                      <img
                        src="/cdn/shop/articles/99d9a274419f48c6de01528a0f436a6aeee26c10.png?v=1792576265&width=1600"
                        alt=""
                        srcSet="/cdn/shop/articles/99d9a274419f48c6de01528a0f436a6aeee26c10.png?v=1792576265&width=400 400w, /cdn/shop/articles/99d9a274419f48c6de01528a0f436a6aeee26c10.png?v=1792576265&width=600 600w, /cdn/shop/articles/99d9a274419f48c6de01528a0f436a6aeee26c10.png?v=1792576265&width=800 800w, /cdn/shop/articles/99d9a274419f48c6de01528a0f436a6aeee26c10.png?v=1792576265&width=1000 1000w, /cdn/shop/articles/99d9a274419f48c6de01528a0f436a6aeee26c10.png?v=1792576265&width=1200 1200w, /cdn/shop/articles/99d9a274419f48c6de01528a0f436a6aeee26c10.png?v=1792576265&width=1600 1600w"
                        width="1600"
                        height="1067"
                        loading="lazy"
                        sizes="(min-width: 1200px) 42vw, (min-width: 375px) 92vw, 92vw"
                      />{" "}
                      <span className="article-card__topic color-scheme-2">Beauty rituals</span>
                      <span
                        className="article-card__arrow article-card__arrow--badge color-scheme-2"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M8.95039 0.394074L15.6198 7.05525C15.7413 7.18195 15.8365 7.33135 15.8999 7.49489C16.0334 7.81923 16.0334 8.18304 15.8999 8.50739C15.8365 8.67092 15.7413 8.82032 15.6198 8.94702L8.95039 15.6082C8.82602 15.7324 8.67837 15.8309 8.51587 15.8982C8.35337 15.9654 8.17921 16 8.00332 16C7.64811 16 7.30744 15.8591 7.05626 15.6082C6.80509 15.3573 6.66398 15.0171 6.66398 14.6623C6.66398 14.3075 6.80509 13.9673 7.05626 13.7164L11.4581 9.33337L1.33389 9.33337C0.980118 9.33337 0.640838 9.19301 0.390685 8.94317C0.140532 8.69333 0 8.35447 0 8.00114C0 7.64781 0.140532 7.30895 0.390685 7.0591C0.640838 6.80926 0.980118 6.6689 1.33389 6.6689L11.4581 6.6689L7.05626 2.28585C6.93124 2.162 6.83201 2.01465 6.76429 1.85231C6.69657 1.68996 6.6617 1.51583 6.6617 1.33996C6.6617 1.16409 6.69657 0.989959 6.76429 0.827614C6.83201 0.665269 6.93124 0.517923 7.05626 0.394074C7.18027 0.269207 7.3278 0.170094 7.49034 0.102458C7.65289 0.0348225 7.82724 9.53674e-07 8.00332 9.53674e-07C8.17941 9.53674e-07 8.35376 0.0348225 8.51631 0.102458C8.67885 0.170094 8.82638 0.269207 8.95039 0.394074Z"
                            fill="currentColor"
                          ></path>{" "}
                        </svg>{" "}
                      </span>
                    </div>
                    <div className="article-card__body">
                      <h3 className="article-card__title">
                        {" "}
                        <a className="article-card__link" href="/blogs/featured/scent-as-memory">
                          Scent as Memory
                        </a>{" "}
                      </h3>
                      <div className="article-card__meta">
                        <span className="article-card__author">
                          {" "}
                          <span className="article-card__avatar" aria-hidden="true">
                            HI{" "}
                          </span>{" "}
                          Hariprathap interloid{" "}
                        </span>
                        <span className="article-card__facts">
                          <span className="article-card__fact">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="9"></circle>
                              <path d="M12 7v5l3 2"></path>
                            </svg>{" "}
                            1 min read{" "}
                          </span>{" "}
                        </span>
                      </div>{" "}
                    </div>{" "}
                  </article>{" "}
                </li>
                <li className="blog-list__item">
                  {" "}
                  <article className="article-card" data-animate="fade-up">
                    <div className="article-card__media">
                      <img
                        src="/cdn/shop/articles/69391cc48224534f34186fd96c815f94d7b7884d.png?v=1792576118&width=1600"
                        alt=""
                        srcSet="/cdn/shop/articles/69391cc48224534f34186fd96c815f94d7b7884d.png?v=1792576118&width=400 400w, /cdn/shop/articles/69391cc48224534f34186fd96c815f94d7b7884d.png?v=1792576118&width=600 600w, /cdn/shop/articles/69391cc48224534f34186fd96c815f94d7b7884d.png?v=1792576118&width=800 800w, /cdn/shop/articles/69391cc48224534f34186fd96c815f94d7b7884d.png?v=1792576118&width=1000 1000w, /cdn/shop/articles/69391cc48224534f34186fd96c815f94d7b7884d.png?v=1792576118&width=1200 1200w, /cdn/shop/articles/69391cc48224534f34186fd96c815f94d7b7884d.png?v=1792576118&width=1600 1600w"
                        width="1600"
                        height="2400"
                        loading="lazy"
                        sizes="(min-width: 1200px) 24vw, (min-width: 375px) 46vw, 92vw"
                      />{" "}
                      <span className="article-card__topic color-scheme-2">Makeup</span>
                      <span
                        className="article-card__arrow article-card__arrow--badge color-scheme-2"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M8.95039 0.394074L15.6198 7.05525C15.7413 7.18195 15.8365 7.33135 15.8999 7.49489C16.0334 7.81923 16.0334 8.18304 15.8999 8.50739C15.8365 8.67092 15.7413 8.82032 15.6198 8.94702L8.95039 15.6082C8.82602 15.7324 8.67837 15.8309 8.51587 15.8982C8.35337 15.9654 8.17921 16 8.00332 16C7.64811 16 7.30744 15.8591 7.05626 15.6082C6.80509 15.3573 6.66398 15.0171 6.66398 14.6623C6.66398 14.3075 6.80509 13.9673 7.05626 13.7164L11.4581 9.33337L1.33389 9.33337C0.980118 9.33337 0.640838 9.19301 0.390685 8.94317C0.140532 8.69333 0 8.35447 0 8.00114C0 7.64781 0.140532 7.30895 0.390685 7.0591C0.640838 6.80926 0.980118 6.6689 1.33389 6.6689L11.4581 6.6689L7.05626 2.28585C6.93124 2.162 6.83201 2.01465 6.76429 1.85231C6.69657 1.68996 6.6617 1.51583 6.6617 1.33996C6.6617 1.16409 6.69657 0.989959 6.76429 0.827614C6.83201 0.665269 6.93124 0.517923 7.05626 0.394074C7.18027 0.269207 7.3278 0.170094 7.49034 0.102458C7.65289 0.0348225 7.82724 9.53674e-07 8.00332 9.53674e-07C8.17941 9.53674e-07 8.35376 0.0348225 8.51631 0.102458C8.67885 0.170094 8.82638 0.269207 8.95039 0.394074Z"
                            fill="currentColor"
                          ></path>{" "}
                        </svg>{" "}
                      </span>
                    </div>
                    <div className="article-card__body">
                      <h3 className="article-card__title">
                        {" "}
                        <a className="article-card__link" href="/blogs/featured/pure-matte-lipstick">
                          Pure Matte Lipstick
                        </a>{" "}
                      </h3>
                      <div className="article-card__meta">
                        <span className="article-card__author">
                          {" "}
                          <span className="article-card__avatar" aria-hidden="true">
                            HI{" "}
                          </span>{" "}
                          Hariprathap interloid{" "}
                        </span>
                        <span className="article-card__facts">
                          <span className="article-card__fact">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="9"></circle>
                              <path d="M12 7v5l3 2"></path>
                            </svg>{" "}
                            1 min read{" "}
                          </span>{" "}
                        </span>
                      </div>{" "}
                    </div>{" "}
                  </article>{" "}
                </li>
                <li className="blog-list__item">
                  {" "}
                  <article className="article-card" data-animate="fade-up">
                    <div className="article-card__media">
                      <img
                        src="/cdn/shop/articles/radiance-vitamin-c-serum-2.png?v=1793357319&width=1600"
                        alt=""
                        srcSet="/cdn/shop/articles/radiance-vitamin-c-serum-2.png?v=1793357319&width=400 400w, /cdn/shop/articles/radiance-vitamin-c-serum-2.png?v=1793357319&width=600 600w, /cdn/shop/articles/radiance-vitamin-c-serum-2.png?v=1793357319&width=800 800w, /cdn/shop/articles/radiance-vitamin-c-serum-2.png?v=1793357319&width=1000 1000w, /cdn/shop/articles/radiance-vitamin-c-serum-2.png?v=1793357319&width=1200 1200w, /cdn/shop/articles/radiance-vitamin-c-serum-2.png?v=1793357319&width=1600 1600w"
                        width="1600"
                        height="1600"
                        loading="lazy"
                        sizes="(min-width: 1200px) 24vw, (min-width: 375px) 46vw, 92vw"
                      />{" "}
                      <span className="article-card__topic color-scheme-2">Science</span>
                      <span
                        className="article-card__arrow article-card__arrow--badge color-scheme-2"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M8.95039 0.394074L15.6198 7.05525C15.7413 7.18195 15.8365 7.33135 15.8999 7.49489C16.0334 7.81923 16.0334 8.18304 15.8999 8.50739C15.8365 8.67092 15.7413 8.82032 15.6198 8.94702L8.95039 15.6082C8.82602 15.7324 8.67837 15.8309 8.51587 15.8982C8.35337 15.9654 8.17921 16 8.00332 16C7.64811 16 7.30744 15.8591 7.05626 15.6082C6.80509 15.3573 6.66398 15.0171 6.66398 14.6623C6.66398 14.3075 6.80509 13.9673 7.05626 13.7164L11.4581 9.33337L1.33389 9.33337C0.980118 9.33337 0.640838 9.19301 0.390685 8.94317C0.140532 8.69333 0 8.35447 0 8.00114C0 7.64781 0.140532 7.30895 0.390685 7.0591C0.640838 6.80926 0.980118 6.6689 1.33389 6.6689L11.4581 6.6689L7.05626 2.28585C6.93124 2.162 6.83201 2.01465 6.76429 1.85231C6.69657 1.68996 6.6617 1.51583 6.6617 1.33996C6.6617 1.16409 6.69657 0.989959 6.76429 0.827614C6.83201 0.665269 6.93124 0.517923 7.05626 0.394074C7.18027 0.269207 7.3278 0.170094 7.49034 0.102458C7.65289 0.0348225 7.82724 9.53674e-07 8.00332 9.53674e-07C8.17941 9.53674e-07 8.35376 0.0348225 8.51631 0.102458C8.67885 0.170094 8.82638 0.269207 8.95039 0.394074Z"
                            fill="currentColor"
                          ></path>{" "}
                        </svg>{" "}
                      </span>
                    </div>
                    <div className="article-card__body">
                      <h3 className="article-card__title">
                        {" "}
                        <a
                          className="article-card__link"
                          href="/blogs/featured/the-science-behind-glass-skin-a-dermatologists-complete-guide"
                        >
                          The Science Behind Glass Skin: A Dermatologist's Complete Guide
                        </a>{" "}
                      </h3>
                      <div className="article-card__meta">
                        <span className="article-card__author">
                          {" "}
                          <span className="article-card__avatar" aria-hidden="true">
                            DA{" "}
                          </span>{" "}
                          Dr. Céleste Arnaud{" "}
                        </span>
                        <span className="article-card__facts">
                          <span className="article-card__fact">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="9"></circle>
                              <path d="M12 7v5l3 2"></path>
                            </svg>{" "}
                            2 min read{" "}
                          </span>{" "}
                        </span>
                      </div>{" "}
                    </div>{" "}
                  </article>{" "}
                </li>
                <li className="blog-list__item">
                  {" "}
                  <article className="article-card" data-animate="fade-up">
                    <div className="article-card__media">
                      <img
                        src="/cdn/shop/articles/rose-eau-de-parfum-2.png?v=1793357325&width=1600"
                        alt=""
                        srcSet="/cdn/shop/articles/rose-eau-de-parfum-2.png?v=1793357325&width=400 400w, /cdn/shop/articles/rose-eau-de-parfum-2.png?v=1793357325&width=600 600w, /cdn/shop/articles/rose-eau-de-parfum-2.png?v=1793357325&width=800 800w, /cdn/shop/articles/rose-eau-de-parfum-2.png?v=1793357325&width=1000 1000w, /cdn/shop/articles/rose-eau-de-parfum-2.png?v=1793357325&width=1200 1200w, /cdn/shop/articles/rose-eau-de-parfum-2.png?v=1793357325&width=1600 1600w"
                        width="1600"
                        height="1600"
                        loading="lazy"
                        sizes="(min-width: 1200px) 21vw, (min-width: 375px) 92vw, 92vw"
                      />{" "}
                      <span className="article-card__topic color-scheme-2">Trends</span>
                      <span
                        className="article-card__arrow article-card__arrow--badge color-scheme-2"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M8.95039 0.394074L15.6198 7.05525C15.7413 7.18195 15.8365 7.33135 15.8999 7.49489C16.0334 7.81923 16.0334 8.18304 15.8999 8.50739C15.8365 8.67092 15.7413 8.82032 15.6198 8.94702L8.95039 15.6082C8.82602 15.7324 8.67837 15.8309 8.51587 15.8982C8.35337 15.9654 8.17921 16 8.00332 16C7.64811 16 7.30744 15.8591 7.05626 15.6082C6.80509 15.3573 6.66398 15.0171 6.66398 14.6623C6.66398 14.3075 6.80509 13.9673 7.05626 13.7164L11.4581 9.33337L1.33389 9.33337C0.980118 9.33337 0.640838 9.19301 0.390685 8.94317C0.140532 8.69333 0 8.35447 0 8.00114C0 7.64781 0.140532 7.30895 0.390685 7.0591C0.640838 6.80926 0.980118 6.6689 1.33389 6.6689L11.4581 6.6689L7.05626 2.28585C6.93124 2.162 6.83201 2.01465 6.76429 1.85231C6.69657 1.68996 6.6617 1.51583 6.6617 1.33996C6.6617 1.16409 6.69657 0.989959 6.76429 0.827614C6.83201 0.665269 6.93124 0.517923 7.05626 0.394074C7.18027 0.269207 7.3278 0.170094 7.49034 0.102458C7.65289 0.0348225 7.82724 9.53674e-07 8.00332 9.53674e-07C8.17941 9.53674e-07 8.35376 0.0348225 8.51631 0.102458C8.67885 0.170094 8.82638 0.269207 8.95039 0.394074Z"
                            fill="currentColor"
                          ></path>{" "}
                        </svg>{" "}
                      </span>
                    </div>
                    <div className="article-card__body">
                      <h3 className="article-card__title">
                        {" "}
                        <a
                          className="article-card__link"
                          href="/blogs/featured/a-morning-in-grasse-with-our-nose-lea-fontaine"
                        >
                          A morning in Grasse with our nose, Léa Fontaine
                        </a>{" "}
                      </h3>
                      <div className="article-card__meta">
                        <span className="article-card__author">
                          {" "}
                          <span className="article-card__avatar" aria-hidden="true">
                            SJ{" "}
                          </span>{" "}
                          Sarah Jenkins{" "}
                        </span>
                        <span className="article-card__facts">
                          <span className="article-card__fact">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="9"></circle>
                              <path d="M12 7v5l3 2"></path>
                            </svg>{" "}
                            1 min read{" "}
                          </span>{" "}
                        </span>
                      </div>{" "}
                    </div>{" "}
                  </article>{" "}
                </li>
                <li className="blog-list__item">
                  {" "}
                  <article className="article-card" data-animate="fade-up">
                    <div className="article-card__media">
                      <img
                        src="/cdn/shop/articles/hydra-glow-night-cream-2.png?v=1793357332&width=1600"
                        alt=""
                        srcSet="/cdn/shop/articles/hydra-glow-night-cream-2.png?v=1793357332&width=400 400w, /cdn/shop/articles/hydra-glow-night-cream-2.png?v=1793357332&width=600 600w, /cdn/shop/articles/hydra-glow-night-cream-2.png?v=1793357332&width=800 800w, /cdn/shop/articles/hydra-glow-night-cream-2.png?v=1793357332&width=1000 1000w, /cdn/shop/articles/hydra-glow-night-cream-2.png?v=1793357332&width=1200 1200w, /cdn/shop/articles/hydra-glow-night-cream-2.png?v=1793357332&width=1600 1600w"
                        width="1600"
                        height="1600"
                        loading="lazy"
                        sizes="(min-width: 1200px) 21vw, (min-width: 375px) 46vw, 92vw"
                      />{" "}
                      <span className="article-card__topic color-scheme-2">Ingredients</span>
                      <span
                        className="article-card__arrow article-card__arrow--badge color-scheme-2"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M8.95039 0.394074L15.6198 7.05525C15.7413 7.18195 15.8365 7.33135 15.8999 7.49489C16.0334 7.81923 16.0334 8.18304 15.8999 8.50739C15.8365 8.67092 15.7413 8.82032 15.6198 8.94702L8.95039 15.6082C8.82602 15.7324 8.67837 15.8309 8.51587 15.8982C8.35337 15.9654 8.17921 16 8.00332 16C7.64811 16 7.30744 15.8591 7.05626 15.6082C6.80509 15.3573 6.66398 15.0171 6.66398 14.6623C6.66398 14.3075 6.80509 13.9673 7.05626 13.7164L11.4581 9.33337L1.33389 9.33337C0.980118 9.33337 0.640838 9.19301 0.390685 8.94317C0.140532 8.69333 0 8.35447 0 8.00114C0 7.64781 0.140532 7.30895 0.390685 7.0591C0.640838 6.80926 0.980118 6.6689 1.33389 6.6689L11.4581 6.6689L7.05626 2.28585C6.93124 2.162 6.83201 2.01465 6.76429 1.85231C6.69657 1.68996 6.6617 1.51583 6.6617 1.33996C6.6617 1.16409 6.69657 0.989959 6.76429 0.827614C6.83201 0.665269 6.93124 0.517923 7.05626 0.394074C7.18027 0.269207 7.3278 0.170094 7.49034 0.102458C7.65289 0.0348225 7.82724 9.53674e-07 8.00332 9.53674e-07C8.17941 9.53674e-07 8.35376 0.0348225 8.51631 0.102458C8.67885 0.170094 8.82638 0.269207 8.95039 0.394074Z"
                            fill="currentColor"
                          ></path>{" "}
                        </svg>{" "}
                      </span>
                    </div>
                    <div className="article-card__body">
                      <h3 className="article-card__title">
                        {" "}
                        <a
                          className="article-card__link"
                          href="/blogs/featured/hidden-dangers-in-your-moisturizer-5-ingredients-to-avoid"
                        >
                          Hidden Dangers in Your Moisturizer: 5 Ingredients to Avoid
                        </a>{" "}
                      </h3>
                      <div className="article-card__meta">
                        <span className="article-card__author">
                          {" "}
                          <span className="article-card__avatar" aria-hidden="true">
                            SJ{" "}
                          </span>{" "}
                          Sarah Jenkins{" "}
                        </span>
                        <span className="article-card__facts">
                          <span className="article-card__fact">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="9"></circle>
                              <path d="M12 7v5l3 2"></path>
                            </svg>{" "}
                            1 min read{" "}
                          </span>{" "}
                        </span>
                      </div>{" "}
                    </div>{" "}
                  </article>{" "}
                </li>
                <li className="blog-list__item">
                  {" "}
                  <article className="article-card" data-animate="fade-up">
                    <div className="article-card__media">
                      <img
                        src="/cdn/shop/articles/rose-petal-toner-2.png?v=1793357338&width=1600"
                        alt=""
                        srcSet="/cdn/shop/articles/rose-petal-toner-2.png?v=1793357338&width=400 400w, /cdn/shop/articles/rose-petal-toner-2.png?v=1793357338&width=600 600w, /cdn/shop/articles/rose-petal-toner-2.png?v=1793357338&width=800 800w, /cdn/shop/articles/rose-petal-toner-2.png?v=1793357338&width=1000 1000w, /cdn/shop/articles/rose-petal-toner-2.png?v=1793357338&width=1200 1200w, /cdn/shop/articles/rose-petal-toner-2.png?v=1793357338&width=1600 1600w"
                        width="1600"
                        height="1600"
                        loading="lazy"
                        sizes="(min-width: 1200px) 49vw, (min-width: 375px) 46vw, 92vw"
                      />{" "}
                      <span className="article-card__topic color-scheme-2">Science</span>
                      <span
                        className="article-card__arrow article-card__arrow--badge color-scheme-2"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M8.95039 0.394074L15.6198 7.05525C15.7413 7.18195 15.8365 7.33135 15.8999 7.49489C16.0334 7.81923 16.0334 8.18304 15.8999 8.50739C15.8365 8.67092 15.7413 8.82032 15.6198 8.94702L8.95039 15.6082C8.82602 15.7324 8.67837 15.8309 8.51587 15.8982C8.35337 15.9654 8.17921 16 8.00332 16C7.64811 16 7.30744 15.8591 7.05626 15.6082C6.80509 15.3573 6.66398 15.0171 6.66398 14.6623C6.66398 14.3075 6.80509 13.9673 7.05626 13.7164L11.4581 9.33337L1.33389 9.33337C0.980118 9.33337 0.640838 9.19301 0.390685 8.94317C0.140532 8.69333 0 8.35447 0 8.00114C0 7.64781 0.140532 7.30895 0.390685 7.0591C0.640838 6.80926 0.980118 6.6689 1.33389 6.6689L11.4581 6.6689L7.05626 2.28585C6.93124 2.162 6.83201 2.01465 6.76429 1.85231C6.69657 1.68996 6.6617 1.51583 6.6617 1.33996C6.6617 1.16409 6.69657 0.989959 6.76429 0.827614C6.83201 0.665269 6.93124 0.517923 7.05626 0.394074C7.18027 0.269207 7.3278 0.170094 7.49034 0.102458C7.65289 0.0348225 7.82724 9.53674e-07 8.00332 9.53674e-07C8.17941 9.53674e-07 8.35376 0.0348225 8.51631 0.102458C8.67885 0.170094 8.82638 0.269207 8.95039 0.394074Z"
                            fill="currentColor"
                          ></path>{" "}
                        </svg>{" "}
                      </span>
                    </div>
                    <div className="article-card__body">
                      <h3 className="article-card__title">
                        {" "}
                        <a
                          className="article-card__link"
                          href="/blogs/featured/pearl-extract-explained-without-the-marketing"
                        >
                          Pearl extract, explained without the marketing
                        </a>{" "}
                      </h3>
                      <div className="article-card__meta">
                        <span className="article-card__author">
                          {" "}
                          <span className="article-card__avatar" aria-hidden="true">
                            DA{" "}
                          </span>{" "}
                          Dr. Céleste Arnaud{" "}
                        </span>
                        <span className="article-card__facts">
                          <span className="article-card__fact">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="9"></circle>
                              <path d="M12 7v5l3 2"></path>
                            </svg>{" "}
                            1 min read{" "}
                          </span>{" "}
                        </span>
                      </div>{" "}
                    </div>{" "}
                  </article>{" "}
                </li>
                <li className="blog-list__item">
                  {" "}
                  <article className="article-card" data-animate="fade-up">
                    <div className="article-card__media">
                      <img
                        src="/cdn/shop/articles/magnolia-bloom-body-oil-2.png?v=1793357344&width=1600"
                        alt=""
                        srcSet="/cdn/shop/articles/magnolia-bloom-body-oil-2.png?v=1793357344&width=400 400w, /cdn/shop/articles/magnolia-bloom-body-oil-2.png?v=1793357344&width=600 600w, /cdn/shop/articles/magnolia-bloom-body-oil-2.png?v=1793357344&width=800 800w, /cdn/shop/articles/magnolia-bloom-body-oil-2.png?v=1793357344&width=1000 1000w, /cdn/shop/articles/magnolia-bloom-body-oil-2.png?v=1793357344&width=1200 1200w, /cdn/shop/articles/magnolia-bloom-body-oil-2.png?v=1793357344&width=1600 1600w"
                        width="1600"
                        height="1600"
                        loading="lazy"
                        sizes="(min-width: 1200px) 24vw, (min-width: 375px) 92vw, 92vw"
                      />{" "}
                      <span className="article-card__topic color-scheme-2">Ingredients</span>
                      <span
                        className="article-card__arrow article-card__arrow--badge color-scheme-2"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M8.95039 0.394074L15.6198 7.05525C15.7413 7.18195 15.8365 7.33135 15.8999 7.49489C16.0334 7.81923 16.0334 8.18304 15.8999 8.50739C15.8365 8.67092 15.7413 8.82032 15.6198 8.94702L8.95039 15.6082C8.82602 15.7324 8.67837 15.8309 8.51587 15.8982C8.35337 15.9654 8.17921 16 8.00332 16C7.64811 16 7.30744 15.8591 7.05626 15.6082C6.80509 15.3573 6.66398 15.0171 6.66398 14.6623C6.66398 14.3075 6.80509 13.9673 7.05626 13.7164L11.4581 9.33337L1.33389 9.33337C0.980118 9.33337 0.640838 9.19301 0.390685 8.94317C0.140532 8.69333 0 8.35447 0 8.00114C0 7.64781 0.140532 7.30895 0.390685 7.0591C0.640838 6.80926 0.980118 6.6689 1.33389 6.6689L11.4581 6.6689L7.05626 2.28585C6.93124 2.162 6.83201 2.01465 6.76429 1.85231C6.69657 1.68996 6.6617 1.51583 6.6617 1.33996C6.6617 1.16409 6.69657 0.989959 6.76429 0.827614C6.83201 0.665269 6.93124 0.517923 7.05626 0.394074C7.18027 0.269207 7.3278 0.170094 7.49034 0.102458C7.65289 0.0348225 7.82724 9.53674e-07 8.00332 9.53674e-07C8.17941 9.53674e-07 8.35376 0.0348225 8.51631 0.102458C8.67885 0.170094 8.82638 0.269207 8.95039 0.394074Z"
                            fill="currentColor"
                          ></path>{" "}
                        </svg>{" "}
                      </span>
                    </div>
                    <div className="article-card__body">
                      <h3 className="article-card__title">
                        {" "}
                        <a
                          className="article-card__link"
                          href="/blogs/featured/ninety-days-of-gold-inside-the-ferment-room"
                        >
                          Ninety days of gold: inside the ferment room
                        </a>{" "}
                      </h3>
                      <div className="article-card__meta">
                        <span className="article-card__author">
                          {" "}
                          <span className="article-card__avatar" aria-hidden="true">
                            MD{" "}
                          </span>{" "}
                          Margaux D.{" "}
                        </span>
                        <span className="article-card__facts">
                          <span className="article-card__fact">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="9"></circle>
                              <path d="M12 7v5l3 2"></path>
                            </svg>{" "}
                            1 min read{" "}
                          </span>{" "}
                        </span>
                      </div>{" "}
                    </div>{" "}
                  </article>{" "}
                </li>
                <li className="blog-list__item">
                  {" "}
                  <article className="article-card" data-animate="fade-up">
                    <div className="article-card__media">
                      <img
                        src="/cdn/shop/articles/retinol-renewal-oil-2.png?v=1793357349&width=1600"
                        alt=""
                        srcSet="/cdn/shop/articles/retinol-renewal-oil-2.png?v=1793357349&width=400 400w, /cdn/shop/articles/retinol-renewal-oil-2.png?v=1793357349&width=600 600w, /cdn/shop/articles/retinol-renewal-oil-2.png?v=1793357349&width=800 800w, /cdn/shop/articles/retinol-renewal-oil-2.png?v=1793357349&width=1000 1000w, /cdn/shop/articles/retinol-renewal-oil-2.png?v=1793357349&width=1200 1200w, /cdn/shop/articles/retinol-renewal-oil-2.png?v=1793357349&width=1600 1600w"
                        width="1600"
                        height="1600"
                        loading="lazy"
                        sizes="(min-width: 1200px) 42vw, (min-width: 375px) 46vw, 92vw"
                      />{" "}
                      <span className="article-card__topic color-scheme-2">Trends</span>
                      <span
                        className="article-card__arrow article-card__arrow--badge color-scheme-2"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M8.95039 0.394074L15.6198 7.05525C15.7413 7.18195 15.8365 7.33135 15.8999 7.49489C16.0334 7.81923 16.0334 8.18304 15.8999 8.50739C15.8365 8.67092 15.7413 8.82032 15.6198 8.94702L8.95039 15.6082C8.82602 15.7324 8.67837 15.8309 8.51587 15.8982C8.35337 15.9654 8.17921 16 8.00332 16C7.64811 16 7.30744 15.8591 7.05626 15.6082C6.80509 15.3573 6.66398 15.0171 6.66398 14.6623C6.66398 14.3075 6.80509 13.9673 7.05626 13.7164L11.4581 9.33337L1.33389 9.33337C0.980118 9.33337 0.640838 9.19301 0.390685 8.94317C0.140532 8.69333 0 8.35447 0 8.00114C0 7.64781 0.140532 7.30895 0.390685 7.0591C0.640838 6.80926 0.980118 6.6689 1.33389 6.6689L11.4581 6.6689L7.05626 2.28585C6.93124 2.162 6.83201 2.01465 6.76429 1.85231C6.69657 1.68996 6.6617 1.51583 6.6617 1.33996C6.6617 1.16409 6.69657 0.989959 6.76429 0.827614C6.83201 0.665269 6.93124 0.517923 7.05626 0.394074C7.18027 0.269207 7.3278 0.170094 7.49034 0.102458C7.65289 0.0348225 7.82724 9.53674e-07 8.00332 9.53674e-07C8.17941 9.53674e-07 8.35376 0.0348225 8.51631 0.102458C8.67885 0.170094 8.82638 0.269207 8.95039 0.394074Z"
                            fill="currentColor"
                          ></path>{" "}
                        </svg>{" "}
                      </span>
                    </div>
                    <div className="article-card__body">
                      <h3 className="article-card__title">
                        {" "}
                        <a
                          className="article-card__link"
                          href="/blogs/featured/retinol-vs-bakuchiol-choosing-the-right-retinoid-alternative"
                        >
                          Retinol vs. Bakuchiol: Choosing the Right Retinoid Alternative
                        </a>{" "}
                      </h3>
                      <div className="article-card__meta">
                        <span className="article-card__author">
                          {" "}
                          <span className="article-card__avatar" aria-hidden="true">
                            DA{" "}
                          </span>{" "}
                          Dr. Céleste Arnaud{" "}
                        </span>
                        <span className="article-card__facts">
                          <span className="article-card__fact">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="9"></circle>
                              <path d="M12 7v5l3 2"></path>
                            </svg>{" "}
                            1 min read{" "}
                          </span>{" "}
                        </span>
                      </div>{" "}
                    </div>{" "}
                  </article>{" "}
                </li>
              </ul>{" "}
              <nav className="pagination" aria-label="Pages">
                {" "}
                <p className="pagination__status">Page 1 of 2</p>{" "}
                <ul className="pagination__pill" role="list">
                  {" "}
                  <li className="pagination__end pagination__end--previous">
                    <span className="pagination__arrow pagination__arrow--disabled" aria-hidden="true">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z" fill="currentColor"></path>
                      </svg>{" "}
                    </span>
                  </li>
                  <li className="pagination__part">
                    <span className="pagination__page pagination__page--current" aria-current="page">
                      {" "}
                      <span className="visually-hidden">Page</span> 1{" "}
                    </span>
                  </li>
                  <li className="pagination__part">
                    <a
                      className="pagination__page"
                      href="/blogs/featured?page=2"
                      data-results-link=""
                      data-results-scroll=""
                    >
                      {" "}
                      <span className="visually-hidden">Page</span> 2{" "}
                    </a>
                  </li>
                  <li className="pagination__end pagination__end--next">
                    <a
                      className="pagination__arrow"
                      href="/blogs/featured?page=2"
                      data-results-link=""
                      data-results-scroll=""
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        width="8"
                        height="12"
                        viewBox="0 0 8 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 10.59L4.58 6L0 1.41L1.41 0L7.41 6L1.41 12L0 10.59Z" fill="currentColor"></path>
                      </svg>{" "}
                      <span className="visually-hidden">Next</span>{" "}
                    </a>
                  </li>{" "}
                </ul>{" "}
              </nav>{" "}
            </animate-on-scroll>{" "}
          </div>
        </results-view>{" "}
      </div>{" "}
    </section>
  );
}
