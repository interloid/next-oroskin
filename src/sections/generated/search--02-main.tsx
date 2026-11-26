// Generated from the Shopify theme's rendered HTML (reference/sections/search--02-main.html). Make content dynamic, keep the markup.
export default function Search02Main() {
  return (
    <div id="shopify-section-template--27949759201382__main" className="shopify-section">
      {" "}
      <div
        className="search-section full-width section-width--widest color-scheme-2"
        style={{ "--section-padding-top": "64px", "--section-padding-bottom": "96px" } as React.CSSProperties}
      >
        {" "}
        <results-view className="search-section__inner" data-section-id="template--27949759201382__main">
          {" "}
          <header className="search-hero">
            {" "}
            <p className="search-hero__eyebrow">Search</p>{" "}
            <h1 className="search-hero__title">
              Results for <em>“serum”</em>
            </h1>{" "}
            <form className="search-hero__form" action="/search" method="get" role="search">
              {" "}
              <label className="visually-hidden" htmlFor="SearchPageInput-template--27949759201382__main">
                Search the store
              </label>
              <input type="hidden" name="options[prefix]" value="last" />
              <input
                className="search-hero__input"
                id="SearchPageInput-template--27949759201382__main"
                type="search"
                name="q"
                defaultValue="serum"
                placeholder="Search for products…"
                autoComplete="off"
              />{" "}
              <button type="submit" className="search-hero__submit">
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
                <span className="visually-hidden">Search</span>{" "}
              </button>{" "}
            </form>{" "}
          </header>
          <div className="collection-toolbar">
            {" "}
            <div className="collection-toolbar__start">
              {" "}
              <filter-drawer className="filter-drawer" data-section-id="template--27949759201382__main">
                {" "}
                <button
                  type="button"
                  className="filter-drawer__toggle"
                  aria-haspopup="dialog"
                  aria-controls="FilterDrawer-template--27949759201382__main"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M4 7h16M7 12h10M10 17h4"></path>
                  </svg>{" "}
                  Filters<span id="FilterCount-template--27949759201382__main" data-results-part=""></span>{" "}
                </button>{" "}
                <dialog
                  id="FilterDrawer-template--27949759201382__main"
                  className="filter-drawer__dialog"
                  aria-labelledby="FilterDrawerTitle-template--27949759201382__main"
                >
                  {" "}
                  <form
                    id="FilterForm-template--27949759201382__main"
                    className="filter-drawer__form"
                    action="/search"
                    method="get"
                    data-results-form=""
                    data-results-part=""
                  >
                    {" "}
                    <div className="filter-drawer__head">
                      {" "}
                      <h2 className="filter-drawer__title" id="FilterDrawerTitle-template--27949759201382__main">
                        Filters
                      </h2>{" "}
                      <a
                        className="filter-drawer__reset"
                        href="/search?q=serum&options%5Bprefix%5D=last&sort_by=relevance"
                        data-results-link=""
                      >
                        Reset
                      </a>
                      <button type="button" className="filter-drawer__close" data-drawer-close="">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 2L14 14M14 2L2 14"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                          ></path>
                        </svg>{" "}
                        <span className="visually-hidden">Close filters</span>{" "}
                      </button>{" "}
                    </div>{" "}
                    <div className="filter-drawer__body">
                      <input type="hidden" name="q" value="serum" />
                      <input type="hidden" name="options[prefix]" value="last" />{" "}
                      <details className="filter-group" open>
                        {" "}
                        <summary className="filter-group__summary">
                          Availability
                          <span className="filter-group__plus">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.17771 14.8807V-0.00025177H8.70297V14.8807H6.17771ZM-0.000137806 8.70285V6.1776H14.8808V8.70285H-0.000137806Z"
                                fill="currentColor"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span className="filter-group__minus">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="15"
                              height="3"
                              viewBox="0 0 15 3"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M14.431 0V2.48016H0.000944614V0H14.431Z" fill="currentColor"></path>
                            </svg>{" "}
                          </span>{" "}
                        </summary>{" "}
                        <fieldset className="filter-group__fieldset">
                          {" "}
                          <legend className="visually-hidden">Availability</legend>
                          <ul className="filter-group__options filter-group__options--list" role="list">
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949759201382__main-filter-v-availability-1"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949759201382__main-filter-v-availability-1"
                                  name="filter.v.availability"
                                  value="1"
                                />
                                <span className="filter-option__label">In stock</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949759201382__main-filter-v-availability-1-count"
                                  data-filter-count=""
                                >
                                  4
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949759201382__main-filter-v-availability-0"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949759201382__main-filter-v-availability-0"
                                  name="filter.v.availability"
                                  value="0"
                                  disabled
                                />
                                <span className="filter-option__label">Out of stock</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949759201382__main-filter-v-availability-0-count"
                                  data-filter-count=""
                                >
                                  0
                                </span>{" "}
                              </label>{" "}
                            </li>
                          </ul>
                        </fieldset>{" "}
                      </details>{" "}
                      <details className="filter-group" open>
                        {" "}
                        <summary className="filter-group__summary">
                          Product type
                          <span className="filter-group__plus">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.17771 14.8807V-0.00025177H8.70297V14.8807H6.17771ZM-0.000137806 8.70285V6.1776H14.8808V8.70285H-0.000137806Z"
                                fill="currentColor"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span className="filter-group__minus">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="15"
                              height="3"
                              viewBox="0 0 15 3"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M14.431 0V2.48016H0.000944614V0H14.431Z" fill="currentColor"></path>
                            </svg>{" "}
                          </span>{" "}
                        </summary>{" "}
                        <fieldset className="filter-group__fieldset">
                          {" "}
                          <legend className="visually-hidden">Product type</legend>
                          <ul className="filter-group__options filter-group__options--list" role="list">
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949759201382__main-filter-p-product_type-makeup"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949759201382__main-filter-p-product_type-makeup"
                                  name="filter.p.product_type"
                                  value="Makeup"
                                />
                                <span className="filter-option__label">Makeup</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949759201382__main-filter-p-product_type-makeup-count"
                                  data-filter-count=""
                                >
                                  1
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949759201382__main-filter-p-product_type-skincare"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949759201382__main-filter-p-product_type-skincare"
                                  name="filter.p.product_type"
                                  value="Skincare"
                                />
                                <span className="filter-option__label">Skincare</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949759201382__main-filter-p-product_type-skincare-count"
                                  data-filter-count=""
                                >
                                  3
                                </span>{" "}
                              </label>{" "}
                            </li>
                          </ul>
                        </fieldset>{" "}
                      </details>{" "}
                      <details className="filter-group" open>
                        {" "}
                        <summary className="filter-group__summary">
                          Brand
                          <span className="filter-group__plus">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.17771 14.8807V-0.00025177H8.70297V14.8807H6.17771ZM-0.000137806 8.70285V6.1776H14.8808V8.70285H-0.000137806Z"
                                fill="currentColor"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span className="filter-group__minus">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="15"
                              height="3"
                              viewBox="0 0 15 3"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M14.431 0V2.48016H0.000944614V0H14.431Z" fill="currentColor"></path>
                            </svg>{" "}
                          </span>{" "}
                        </summary>{" "}
                        <fieldset className="filter-group__fieldset">
                          {" "}
                          <legend className="visually-hidden">Brand</legend>
                          <label
                            className="filter-group__search"
                            htmlFor="Filter-template--27949759201382__main-filter-p-vendor-search"
                          >
                            {" "}
                            <span className="visually-hidden">Search brands</span>{" "}
                            <input
                              id="Filter-template--27949759201382__main-filter-p-vendor-search"
                              type="search"
                              placeholder="Search brands…"
                              autoComplete="off"
                              data-filter-search=""
                            />
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
                          </label>
                          <ul className="filter-group__options filter-group__options--list" role="list">
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949759201382__main-filter-p-vendor-oroskin"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949759201382__main-filter-p-vendor-oroskin"
                                  name="filter.p.vendor"
                                  value="Oroskin"
                                />
                                <span className="filter-option__label">Oroskin</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949759201382__main-filter-p-vendor-oroskin-count"
                                  data-filter-count=""
                                >
                                  4
                                </span>{" "}
                              </label>{" "}
                            </li>
                          </ul>
                        </fieldset>{" "}
                      </details>{" "}
                      <details className="filter-group" open>
                        {" "}
                        <summary className="filter-group__summary">
                          Size
                          <span className="filter-group__plus">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.17771 14.8807V-0.00025177H8.70297V14.8807H6.17771ZM-0.000137806 8.70285V6.1776H14.8808V8.70285H-0.000137806Z"
                                fill="currentColor"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span className="filter-group__minus">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="15"
                              height="3"
                              viewBox="0 0 15 3"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M14.431 0V2.48016H0.000944614V0H14.431Z" fill="currentColor"></path>
                            </svg>{" "}
                          </span>{" "}
                        </summary>{" "}
                        <fieldset className="filter-group__fieldset">
                          {" "}
                          <legend className="visually-hidden">Size</legend>
                          <ul className="filter-group__options filter-group__options--list" role="list">
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949759201382__main-filter-v-option-size-30-ml"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949759201382__main-filter-v-option-size-30-ml"
                                  name="filter.v.option.size"
                                  value="30 ml"
                                />
                                <span className="filter-option__label">30 ml</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949759201382__main-filter-v-option-size-30-ml-count"
                                  data-filter-count=""
                                >
                                  1
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949759201382__main-filter-v-option-size-50-ml"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949759201382__main-filter-v-option-size-50-ml"
                                  name="filter.v.option.size"
                                  value="50 ml"
                                />
                                <span className="filter-option__label">50 ml</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949759201382__main-filter-v-option-size-50-ml-count"
                                  data-filter-count=""
                                >
                                  1
                                </span>{" "}
                              </label>{" "}
                            </li>
                          </ul>
                        </fieldset>{" "}
                      </details>{" "}
                      <details className="filter-group" open>
                        {" "}
                        <summary className="filter-group__summary">
                          Shade
                          <span className="filter-group__plus">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.17771 14.8807V-0.00025177H8.70297V14.8807H6.17771ZM-0.000137806 8.70285V6.1776H14.8808V8.70285H-0.000137806Z"
                                fill="currentColor"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span className="filter-group__minus">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="15"
                              height="3"
                              viewBox="0 0 15 3"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M14.431 0V2.48016H0.000944614V0H14.431Z" fill="currentColor"></path>
                            </svg>{" "}
                          </span>{" "}
                        </summary>{" "}
                        <fieldset className="filter-group__fieldset">
                          {" "}
                          <legend className="visually-hidden">Shade</legend>
                          <ul className="filter-group__options filter-group__options--list" role="list">
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949759201382__main-filter-v-option-shade-deep"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949759201382__main-filter-v-option-shade-deep"
                                  name="filter.v.option.shade"
                                  value="Deep"
                                />
                                <span className="filter-option__label">Deep</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949759201382__main-filter-v-option-shade-deep-count"
                                  data-filter-count=""
                                >
                                  1
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949759201382__main-filter-v-option-shade-light"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949759201382__main-filter-v-option-shade-light"
                                  name="filter.v.option.shade"
                                  value="Light"
                                />
                                <span className="filter-option__label">Light</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949759201382__main-filter-v-option-shade-light-count"
                                  data-filter-count=""
                                >
                                  1
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949759201382__main-filter-v-option-shade-medium"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949759201382__main-filter-v-option-shade-medium"
                                  name="filter.v.option.shade"
                                  value="Medium"
                                />
                                <span className="filter-option__label">Medium</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949759201382__main-filter-v-option-shade-medium-count"
                                  data-filter-count=""
                                >
                                  1
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949759201382__main-filter-v-option-shade-tan"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949759201382__main-filter-v-option-shade-tan"
                                  name="filter.v.option.shade"
                                  value="Tan"
                                />
                                <span className="filter-option__label">Tan</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949759201382__main-filter-v-option-shade-tan-count"
                                  data-filter-count=""
                                >
                                  1
                                </span>{" "}
                              </label>{" "}
                            </li>
                          </ul>
                        </fieldset>{" "}
                      </details>{" "}
                    </div>{" "}
                    <div className="filter-drawer__foot">
                      {" "}
                      <button type="submit" className="button filter-drawer__apply">
                        {" "}
                        <span id="FilterResults-template--27949759201382__main" aria-live="polite">
                          View results (6)
                        </span>{" "}
                      </button>{" "}
                    </div>{" "}
                  </form>{" "}
                </dialog>{" "}
              </filter-drawer>{" "}
            </div>{" "}
            <div className="collection-toolbar__end">
              {" "}
              <p
                className="collection-toolbar__count"
                id="SearchCount-template--27949759201382__main"
                aria-live="polite"
                data-results-text=""
              >
                6 results
              </p>
              <div className="collection-sort">
                {" "}
                <form action="/search" method="get" data-results-form="" data-results-autoload="">
                  {" "}
                  <input type="hidden" name="q" value="serum" />{" "}
                  <input type="hidden" name="options[prefix]" value="last" />
                  <label className="collection-sort__label" htmlFor="SearchSortBy-template--27949759201382__main">
                    Sort
                  </label>{" "}
                  <span className="collection-sort__field">
                    {" "}
                    <select
                      className="collection-sort__select"
                      id="SearchSortBy-template--27949759201382__main"
                      name="sort_by"
                      data-default="relevance"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-ascending">Price, low to high</option>
                      <option value="price-descending">Price, high to low</option>
                    </select>{" "}
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>{" "}
                  </span>{" "}
                </form>{" "}
              </div>
            </div>{" "}
          </div>
          <div
            className="collection-results"
            id="SearchResults-template--27949759201382__main"
            tabIndex={-1}
            data-results-part=""
            data-results-main=""
          >
            <section className="search-group" aria-labelledby="SearchProducts-template--27949759201382__main">
              {" "}
              <h2 className="search-group__title" id="SearchProducts-template--27949759201382__main">
                Products
              </h2>{" "}
              <div className="collection-grid-wrap">
                {" "}
                <ul
                  className="collection-grid collection-grid--grid collection-grid--portrait collection-grid--full"
                  role="list"
                  style={{ "--grid-columns": "4" } as React.CSSProperties}
                >
                  <li className="collection-grid__item">
                    {" "}
                    <div
                      className="product-card product-card--full"
                      style={{ "--card-media-h": "1.25" } as React.CSSProperties}
                    >
                      {" "}
                      <div className="product-card__media product-card__media--portrait product-card__media--slider">
                        <card-gallery className="product-card__gallery">
                          {" "}
                          <div className="product-card__slides" data-card-slides="">
                            <a
                              className="product-card__slide"
                              href="/products/radiance-vitamin-c-serum?_pos=1&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235080097894"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/radiance-vitamin-c-serum-1.png?v=1793074059&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/radiance-vitamin-c-serum-1.png?v=1793074059&width=310 310w, /cdn/shop/files/radiance-vitamin-c-serum-1.png?v=1793074059&width=375 375w, /cdn/shop/files/radiance-vitamin-c-serum-1.png?v=1793074059&width=550 550w, /cdn/shop/files/radiance-vitamin-c-serum-1.png?v=1793074059&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="eager"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                            <a
                              className="product-card__slide"
                              href="/products/radiance-vitamin-c-serum?_pos=1&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235080917094"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/radiance-vitamin-c-serum-2.png?v=1793074059&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/radiance-vitamin-c-serum-2.png?v=1793074059&width=310 310w, /cdn/shop/files/radiance-vitamin-c-serum-2.png?v=1793074059&width=375 375w, /cdn/shop/files/radiance-vitamin-c-serum-2.png?v=1793074059&width=550 550w, /cdn/shop/files/radiance-vitamin-c-serum-2.png?v=1793074059&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="lazy"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                            <a
                              className="product-card__slide"
                              href="/products/radiance-vitamin-c-serum?_pos=1&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235079475302"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/radiance-vitamin-c-serum-3.png?v=1793074058&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/radiance-vitamin-c-serum-3.png?v=1793074058&width=310 310w, /cdn/shop/files/radiance-vitamin-c-serum-3.png?v=1793074058&width=375 375w, /cdn/shop/files/radiance-vitamin-c-serum-3.png?v=1793074058&width=550 550w, /cdn/shop/files/radiance-vitamin-c-serum-3.png?v=1793074058&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="lazy"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                          </div>{" "}
                          <span
                            className="product-card__arrow product-card__arrow--prev"
                            data-card-prev=""
                            aria-hidden="true"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span
                            className="product-card__arrow product-card__arrow--next"
                            data-card-next=""
                            aria-hidden="true"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span className="product-card__dots" aria-hidden="true">
                            <span className="product-card__dot is-active" data-card-dot="0"></span>
                            <span className="product-card__dot" data-card-dot="1"></span>
                            <span className="product-card__dot" data-card-dot="2"></span>
                          </span>{" "}
                        </card-gallery>
                        <div className="product-card__badges">
                          {" "}
                          <span
                            className="product-card__badge product-card__badge--discount color-scheme-3"
                            data-card-discount=""
                            data-template="-[percent]%"
                            hidden
                          >
                            -0%
                          </span>
                        </div>{" "}
                      </div>
                      <card-options className="product-card__body" data-cart-url="/cart">
                        {" "}
                        <div className="product-card__meta">
                          <p className="product-card__category">Skincare</p>
                          <p className="product-card__score">
                            {" "}
                            <span aria-hidden="true">
                              {" "}
                              <span className="product-card__star">★</span> 4.9 (213)
                            </span>{" "}
                            <span className="visually-hidden">Rated 4.9 out of 5, 213 reviews</span>{" "}
                          </p>
                        </div>{" "}
                        <h3 className="product-card__title">
                          {" "}
                          <a
                            className="product-card__link"
                            href="/products/radiance-vitamin-c-serum?_pos=1&_sid=aee79c6c8&_ss=r"
                          >
                            Radiance Vitamin C Serum
                          </a>{" "}
                        </h3>{" "}
                        <div className="product-card__pricing">
                          {" "}
                          <div data-card-price="">
                            {" "}
                            <div className="price">
                              {" "}
                              <span className="price__current">
                                {" "}
                                <span className="visually-hidden">Regular price </span>
                                <span data-price-amount="">Rs. 4,500.00</span>
                              </span>
                              <span className="price__unit">
                                {" "}
                                <span className="visually-hidden">Unit price</span>Rs. 15,000.00/100ml
                              </span>
                            </div>{" "}
                          </div>{" "}
                          <span className="product-card__save" data-card-save="" data-template="Save [percent]%" hidden>
                            Save 0%
                          </span>{" "}
                        </div>
                        <fieldset className="product-card__options">
                          {" "}
                          <legend className="visually-hidden">Size</legend>
                          <input
                            className="visually-hidden"
                            type="radio"
                            id="Card-15446394634342-template--27949759201382__main-1"
                            name="Card-15446394634342-template--27949759201382__main"
                            value="67834034323558"
                            data-available="true"
                            data-save="0"
                            data-add-name="Radiance Vitamin C Serum - 30 ml"
                            data-add-label="Add Radiance Vitamin C Serum - 30 ml to cart"
                            data-added-label="Radiance Vitamin C Serum - 30 ml added to your cart"
                            defaultChecked
                          />{" "}
                          <label
                            className="product-card__option product-card__option--text"
                            htmlFor="Card-15446394634342-template--27949759201382__main-1"
                          >
                            30 ml
                          </label>
                          <template
                            data-price-for="67834034323558"
                            dangerouslySetInnerHTML={{
                              __html:
                                '\n<div class="price">\n  <span class="price__current">\n    <span class="visually-hidden">Regular price\n</span><span data-price-amount>Rs. 4,500.00</span></span><span class="price__unit">\n      <span class="visually-hidden">Unit price</span>Rs. 15,000.00/100ml</span></div>\n\n\n',
                            }}
                          />
                          <input
                            className="visually-hidden"
                            type="radio"
                            id="Card-15446394634342-template--27949759201382__main-2"
                            name="Card-15446394634342-template--27949759201382__main"
                            value="67834034356326"
                            data-available="true"
                            data-save="0"
                            data-add-name="Radiance Vitamin C Serum - 50 ml"
                            data-add-label="Add Radiance Vitamin C Serum - 50 ml to cart"
                            data-added-label="Radiance Vitamin C Serum - 50 ml added to your cart"
                          />{" "}
                          <label
                            className="product-card__option product-card__option--text"
                            htmlFor="Card-15446394634342-template--27949759201382__main-2"
                          >
                            50 ml
                          </label>
                          <template
                            data-price-for="67834034356326"
                            dangerouslySetInnerHTML={{
                              __html:
                                '\n<div class="price">\n  <span class="price__current">\n    <span class="visually-hidden">Regular price\n</span><span data-price-amount>Rs. 6,400.00</span></span><span class="price__unit">\n      <span class="visually-hidden">Unit price</span>Rs. 12,800.00/100ml</span></div>\n\n\n',
                            }}
                          />
                        </fieldset>
                        <div className="product-card__buy">
                          <div className="product-card__buy-now" data-card-buy="">
                            {" "}
                            <quick-add
                              className="quick-add quick-add--pill product-card__quick-add product-card__quick-add--icon"
                              style={
                                { "--quick-add-size": "44px", "--quick-add-color": "#ffffff" } as React.CSSProperties
                              }
                              data-variant-id="67834034323558"
                              data-label-added="Radiance Vitamin C Serum - 30 ml added to your cart"
                              data-label-error="Couldn't add this to your cart. Please try again."
                            >
                              <form
                                method="post"
                                action="/cart/add"
                                id="QuickAdd-template--27949759201382__main-15446394634342-pill-product-card__quick-add-product-card__quick-add-icon-full"
                                acceptCharset="UTF-8"
                                className="quick-add__form"
                                encType="multipart/form-data"
                              >
                                <input type="hidden" name="form_type" value="product" />
                                <input type="hidden" name="utf8" value="✓" />
                                <input type="hidden" name="id" value="67834034323558" />{" "}
                                <input type="hidden" name="quantity" value="1" />
                                <button type="submit" className="quick-add__button">
                                  {" "}
                                  <span className="quick-add__line quick-add__line--1" aria-hidden="true"></span>{" "}
                                  <span className="quick-add__line quick-add__line--2" aria-hidden="true"></span>{" "}
                                  <span className="quick-add__cart" aria-hidden="true">
                                    {" "}
                                    <span className="quick-add__icon quick-add__icon--upright">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M7.79866 18.2501C8.73809 18.2501 9.49966 17.4886 9.49966 16.5491C9.49966 15.6097 8.73809 14.8481 7.79866 14.8481C6.85922 14.8481 6.09766 15.6097 6.09766 16.5491C6.09766 17.4886 6.85922 18.2501 7.79866 18.2501Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M15.2098 18.2501C16.1492 18.2501 16.9108 17.4886 16.9108 16.5491C16.9108 15.6097 16.1492 14.8481 15.2098 14.8481C14.2704 14.8481 13.5088 15.6097 13.5088 16.5491C13.5088 17.4886 14.2704 18.2501 15.2098 18.2501Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M3.856 3.055L5.866 9.419C6.175 10.397 6.329 10.886 6.626 11.248C6.886 11.568 7.225 11.815 7.608 11.968C8.043 12.141 8.555 12.141 9.581 12.141H13.436C14.462 12.141 14.974 12.141 15.408 11.968C15.792 11.815 16.13 11.568 16.391 11.248C16.687 10.886 16.841 10.397 17.151 9.419L17.56 8.123L17.8 7.357L18.131 6.307C18.2491 5.9325 18.2774 5.53544 18.2134 5.148C18.1495 4.76055 17.9952 4.39361 17.763 4.07691C17.5309 3.76021 17.2274 3.50266 16.8771 3.32511C16.5268 3.14757 16.1397 3.05503 15.747 3.055H3.856ZM3.856 3.055L3.845 3.018C3.80277 2.87656 3.75608 2.73649 3.705 2.598C3.50255 2.08554 3.15923 1.64082 2.71473 1.31523C2.27022 0.989631 1.74266 0.796448 1.193 0.758C1.09 0.75 0.977 0.75 0.75 0.75"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>{" "}
                                    </span>{" "}
                                    <span className="quick-add__icon quick-add__icon--tilt">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        width="21"
                                        height="21"
                                        viewBox="0 0 21 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M10.7069 17.9373C10.7069 18.8768 9.94537 19.6383 9.00593 19.6383C8.0665 19.6383 7.30493 18.8768 7.30493 17.9373C7.30493 16.9979 8.0665 16.2363 9.00593 16.2363C9.94537 16.2363 10.7069 16.9979 10.7069 17.9373Z"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          stroke="currentColor"
                                        ></path>
                                        <path
                                          d="M18.119 17.9373C18.119 18.8768 17.3575 19.6383 16.418 19.6383C15.4786 19.6383 14.717 18.8768 14.717 17.9373C14.717 16.9979 15.4786 16.2363 16.418 16.2363C17.3575 16.2363 18.119 16.9979 18.119 17.9373Z"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          stroke="currentColor"
                                        ></path>
                                        <path
                                          d="M4.36072 6.08072L8.00416 11.6723L8.00873 11.6793C8.5657 12.5339 8.84475 12.9621 9.22693 13.2304C9.56324 13.4689 9.95607 13.616 10.3661 13.6606C10.8315 13.7106 11.3248 13.5732 12.3132 13.298L12.3132 13.298L16.0269 12.2639L16.0269 12.2639C17.0153 11.9887 17.5085 11.8514 17.8802 11.5683C18.2091 11.3179 18.4685 10.9893 18.634 10.611C18.8211 10.1852 18.8391 9.67609 18.875 8.66196L18.8756 8.64517L18.9219 7.28695L18.9477 6.48465L18.9849 5.38434C18.9982 4.99188 18.9189 4.6018 18.7534 4.2457C18.5879 3.88961 18.3408 3.57751 18.0322 3.33469C17.7236 3.09187 17.3621 2.92517 16.9771 2.84809C16.592 2.77101 16.1942 2.78572 15.8159 2.89102L4.36072 6.08072ZM4.36072 6.08072L4.34019 6.04802C4.26157 5.92309 4.17902 5.80068 4.09266 5.68097C3.76017 5.2416 3.31014 4.90527 2.79458 4.71084C2.27903 4.51642 1.71898 4.47183 1.17915 4.58223C1.07778 4.60216 0.968925 4.63247 0.750244 4.69336"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          stroke="currentColor"
                                        ></path>
                                      </svg>{" "}
                                    </span>{" "}
                                    <span className="quick-add__tick">
                                      {" "}
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="m6 12.5 4 4 8-9"></path>
                                      </svg>{" "}
                                    </span>{" "}
                                  </span>{" "}
                                  <span className="quick-add__label">Add to cart</span>
                                  <span className="visually-hidden" data-quick-add-name="">
                                    : Radiance Vitamin C Serum - 30 ml
                                  </span>
                                </button>
                                <input type="hidden" name="product-id" value="15446394634342" />
                                <input type="hidden" name="section-id" value="template--27949759201382__main" />
                              </form>
                              <span className="visually-hidden" role="status" data-quick-add-status=""></span>
                              <span
                                className="quick-add__message"
                                popover="manual"
                                aria-hidden="true"
                                data-quick-add-message=""
                                hidden
                              ></span>{" "}
                            </quick-add>{" "}
                            <a
                              className="button product-card__buy-link"
                              href="/cart/67834034323558:1"
                              data-card-buy-link=""
                            >
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {" "}
                                <path
                                  d="M2.75 4.81253C2.56766 4.81253 2.3928 4.88496 2.26386 5.01389C2.13493 5.14282 2.0625 5.31769 2.0625 5.50003C2.0625 5.68237 2.13493 5.85723 2.26386 5.98616C2.3928 6.1151 2.56766 6.18753 2.75 6.18753H4.27625L6.08025 13.4063C6.23356 14.0182 6.7815 14.4375 7.41194 14.4375H15.9851C16.6059 14.4375 17.1332 14.025 17.2961 13.4269L19.0781 6.87503H17.6385L15.9844 13.0625H7.41125L5.60794 5.84378C5.53345 5.54762 5.36173 5.28503 5.12028 5.09806C4.87883 4.91108 4.58162 4.81054 4.27625 4.81253H2.75ZM15.125 14.4375C13.9941 14.4375 13.0625 15.3691 13.0625 16.5C13.0625 17.631 13.9941 18.5625 15.125 18.5625C16.2559 18.5625 17.1875 17.631 17.1875 16.5C17.1875 15.3691 16.2559 14.4375 15.125 14.4375ZM8.9375 14.4375C7.80656 14.4375 6.875 15.3691 6.875 16.5C6.875 17.631 7.80656 18.5625 8.9375 18.5625C10.0684 18.5625 11 17.631 11 16.5C11 15.3691 10.0684 14.4375 8.9375 14.4375ZM8.9375 15.8125C9.32525 15.8125 9.625 16.1123 9.625 16.5C9.625 16.8878 9.32525 17.1875 8.9375 17.1875C8.54975 17.1875 8.25 16.8878 8.25 16.5C8.25 16.1123 8.54975 15.8125 8.9375 15.8125ZM15.125 15.8125C15.5127 15.8125 15.8125 16.1123 15.8125 16.5C15.8125 16.8878 15.5127 17.1875 15.125 17.1875C14.7373 17.1875 14.4375 16.8878 14.4375 16.5C14.4375 16.1123 14.7373 15.8125 15.125 15.8125Z"
                                  fill="currentColor"
                                ></path>{" "}
                                <path
                                  d="M8.19922 7.85742L11.5388 10.8574L14.7992 7.85742H12.1592V4H10.8392V7.85742H8.19922Z"
                                  fill="currentColor"
                                ></path>{" "}
                              </svg>{" "}
                              <span className="product-card__buy-label">Buy</span>
                              <span className="visually-hidden">: Radiance Vitamin C Serum</span>{" "}
                            </a>{" "}
                          </div>
                          <a
                            className="button button--secondary product-card__notify"
                            href="/products/radiance-vitamin-c-serum?_pos=1&_sid=aee79c6c8&_ss=r"
                            data-card-notify=""
                            hidden
                          >
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
                              <path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.75 6.25 2.25 7H3.75c.5-.75 2.25-2.5 2.25-7Z"></path>
                              <path d="M10 19.5a2.1 2.1 0 0 0 4 0"></path>
                            </svg>{" "}
                            Notify me<span className="visually-hidden">: Radiance Vitamin C Serum</span>{" "}
                          </a>{" "}
                        </div>{" "}
                      </card-options>
                    </div>{" "}
                  </li>
                  <li className="collection-grid__item">
                    {" "}
                    <div
                      className="product-card product-card--full"
                      style={{ "--card-media-h": "1.25" } as React.CSSProperties}
                    >
                      {" "}
                      <div className="product-card__media product-card__media--portrait product-card__media--slider">
                        <card-gallery className="product-card__gallery">
                          {" "}
                          <div className="product-card__slides" data-card-slides="">
                            <a
                              className="product-card__slide"
                              href="/products/retinol-renewal-oil?_pos=2&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235079606374"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/retinol-renewal-oil-1.png?v=1793074058&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/retinol-renewal-oil-1.png?v=1793074058&width=310 310w, /cdn/shop/files/retinol-renewal-oil-1.png?v=1793074058&width=375 375w, /cdn/shop/files/retinol-renewal-oil-1.png?v=1793074058&width=550 550w, /cdn/shop/files/retinol-renewal-oil-1.png?v=1793074058&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="eager"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                            <a
                              className="product-card__slide"
                              href="/products/retinol-renewal-oil?_pos=2&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235080327270"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/retinol-renewal-oil-2.png?v=1793074059&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/retinol-renewal-oil-2.png?v=1793074059&width=310 310w, /cdn/shop/files/retinol-renewal-oil-2.png?v=1793074059&width=375 375w, /cdn/shop/files/retinol-renewal-oil-2.png?v=1793074059&width=550 550w, /cdn/shop/files/retinol-renewal-oil-2.png?v=1793074059&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="lazy"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                            <a
                              className="product-card__slide"
                              href="/products/retinol-renewal-oil?_pos=2&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235081539686"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/retinol-renewal-oil-3.png?v=1793074060&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/retinol-renewal-oil-3.png?v=1793074060&width=310 310w, /cdn/shop/files/retinol-renewal-oil-3.png?v=1793074060&width=375 375w, /cdn/shop/files/retinol-renewal-oil-3.png?v=1793074060&width=550 550w, /cdn/shop/files/retinol-renewal-oil-3.png?v=1793074060&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="lazy"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                          </div>{" "}
                          <span
                            className="product-card__arrow product-card__arrow--prev"
                            data-card-prev=""
                            aria-hidden="true"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span
                            className="product-card__arrow product-card__arrow--next"
                            data-card-next=""
                            aria-hidden="true"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span className="product-card__dots" aria-hidden="true">
                            <span className="product-card__dot is-active" data-card-dot="0"></span>
                            <span className="product-card__dot" data-card-dot="1"></span>
                            <span className="product-card__dot" data-card-dot="2"></span>
                          </span>{" "}
                        </card-gallery>
                        <div className="product-card__badges">
                          {" "}
                          <span
                            className="product-card__badge product-card__badge--discount color-scheme-3"
                            data-card-discount=""
                            data-template="-[percent]%"
                            hidden
                          >
                            -0%
                          </span>
                        </div>{" "}
                      </div>
                      <card-options className="product-card__body" data-cart-url="/cart">
                        {" "}
                        <div className="product-card__meta">
                          <p className="product-card__category">Skincare</p>
                        </div>{" "}
                        <h3 className="product-card__title">
                          {" "}
                          <a
                            className="product-card__link"
                            href="/products/retinol-renewal-oil?_pos=2&_sid=aee79c6c8&_ss=r"
                          >
                            Retinol Renewal Oil
                          </a>{" "}
                        </h3>{" "}
                        <div className="product-card__pricing">
                          {" "}
                          <div data-card-price="">
                            {" "}
                            <div className="price">
                              {" "}
                              <span className="price__current">
                                {" "}
                                <span className="visually-hidden">Regular price </span>
                                <span data-price-amount="">Rs. 6,800.00</span>
                              </span>
                            </div>{" "}
                          </div>{" "}
                          <span className="product-card__save" data-card-save="" data-template="Save [percent]%" hidden>
                            Save 0%
                          </span>{" "}
                        </div>
                        <div className="product-card__buy">
                          <div className="product-card__buy-now" data-card-buy="">
                            {" "}
                            <quick-add
                              className="quick-add quick-add--pill product-card__quick-add product-card__quick-add--icon"
                              style={
                                { "--quick-add-size": "44px", "--quick-add-color": "#ffffff" } as React.CSSProperties
                              }
                              data-variant-id="67834034749542"
                              data-label-added="Retinol Renewal Oil added to your cart"
                              data-label-error="Couldn't add this to your cart. Please try again."
                            >
                              <form
                                method="post"
                                action="/cart/add"
                                id="QuickAdd-template--27949759201382__main-15446395027558-pill-product-card__quick-add-product-card__quick-add-icon-full"
                                acceptCharset="UTF-8"
                                className="quick-add__form"
                                encType="multipart/form-data"
                              >
                                <input type="hidden" name="form_type" value="product" />
                                <input type="hidden" name="utf8" value="✓" />
                                <input type="hidden" name="id" value="67834034749542" />{" "}
                                <input type="hidden" name="quantity" value="1" />
                                <button type="submit" className="quick-add__button">
                                  {" "}
                                  <span className="quick-add__line quick-add__line--1" aria-hidden="true"></span>{" "}
                                  <span className="quick-add__line quick-add__line--2" aria-hidden="true"></span>{" "}
                                  <span className="quick-add__cart" aria-hidden="true">
                                    {" "}
                                    <span className="quick-add__icon quick-add__icon--upright">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M7.79866 18.2501C8.73809 18.2501 9.49966 17.4886 9.49966 16.5491C9.49966 15.6097 8.73809 14.8481 7.79866 14.8481C6.85922 14.8481 6.09766 15.6097 6.09766 16.5491C6.09766 17.4886 6.85922 18.2501 7.79866 18.2501Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M15.2098 18.2501C16.1492 18.2501 16.9108 17.4886 16.9108 16.5491C16.9108 15.6097 16.1492 14.8481 15.2098 14.8481C14.2704 14.8481 13.5088 15.6097 13.5088 16.5491C13.5088 17.4886 14.2704 18.2501 15.2098 18.2501Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M3.856 3.055L5.866 9.419C6.175 10.397 6.329 10.886 6.626 11.248C6.886 11.568 7.225 11.815 7.608 11.968C8.043 12.141 8.555 12.141 9.581 12.141H13.436C14.462 12.141 14.974 12.141 15.408 11.968C15.792 11.815 16.13 11.568 16.391 11.248C16.687 10.886 16.841 10.397 17.151 9.419L17.56 8.123L17.8 7.357L18.131 6.307C18.2491 5.9325 18.2774 5.53544 18.2134 5.148C18.1495 4.76055 17.9952 4.39361 17.763 4.07691C17.5309 3.76021 17.2274 3.50266 16.8771 3.32511C16.5268 3.14757 16.1397 3.05503 15.747 3.055H3.856ZM3.856 3.055L3.845 3.018C3.80277 2.87656 3.75608 2.73649 3.705 2.598C3.50255 2.08554 3.15923 1.64082 2.71473 1.31523C2.27022 0.989631 1.74266 0.796448 1.193 0.758C1.09 0.75 0.977 0.75 0.75 0.75"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>{" "}
                                    </span>{" "}
                                    <span className="quick-add__icon quick-add__icon--tilt">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        width="21"
                                        height="21"
                                        viewBox="0 0 21 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M10.7069 17.9373C10.7069 18.8768 9.94537 19.6383 9.00593 19.6383C8.0665 19.6383 7.30493 18.8768 7.30493 17.9373C7.30493 16.9979 8.0665 16.2363 9.00593 16.2363C9.94537 16.2363 10.7069 16.9979 10.7069 17.9373Z"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          stroke="currentColor"
                                        ></path>
                                        <path
                                          d="M18.119 17.9373C18.119 18.8768 17.3575 19.6383 16.418 19.6383C15.4786 19.6383 14.717 18.8768 14.717 17.9373C14.717 16.9979 15.4786 16.2363 16.418 16.2363C17.3575 16.2363 18.119 16.9979 18.119 17.9373Z"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          stroke="currentColor"
                                        ></path>
                                        <path
                                          d="M4.36072 6.08072L8.00416 11.6723L8.00873 11.6793C8.5657 12.5339 8.84475 12.9621 9.22693 13.2304C9.56324 13.4689 9.95607 13.616 10.3661 13.6606C10.8315 13.7106 11.3248 13.5732 12.3132 13.298L12.3132 13.298L16.0269 12.2639L16.0269 12.2639C17.0153 11.9887 17.5085 11.8514 17.8802 11.5683C18.2091 11.3179 18.4685 10.9893 18.634 10.611C18.8211 10.1852 18.8391 9.67609 18.875 8.66196L18.8756 8.64517L18.9219 7.28695L18.9477 6.48465L18.9849 5.38434C18.9982 4.99188 18.9189 4.6018 18.7534 4.2457C18.5879 3.88961 18.3408 3.57751 18.0322 3.33469C17.7236 3.09187 17.3621 2.92517 16.9771 2.84809C16.592 2.77101 16.1942 2.78572 15.8159 2.89102L4.36072 6.08072ZM4.36072 6.08072L4.34019 6.04802C4.26157 5.92309 4.17902 5.80068 4.09266 5.68097C3.76017 5.2416 3.31014 4.90527 2.79458 4.71084C2.27903 4.51642 1.71898 4.47183 1.17915 4.58223C1.07778 4.60216 0.968925 4.63247 0.750244 4.69336"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          stroke="currentColor"
                                        ></path>
                                      </svg>{" "}
                                    </span>{" "}
                                    <span className="quick-add__tick">
                                      {" "}
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="m6 12.5 4 4 8-9"></path>
                                      </svg>{" "}
                                    </span>{" "}
                                  </span>{" "}
                                  <span className="quick-add__label">Add to cart</span>
                                  <span className="visually-hidden" data-quick-add-name="">
                                    : Retinol Renewal Oil
                                  </span>
                                </button>
                                <input type="hidden" name="product-id" value="15446395027558" />
                                <input type="hidden" name="section-id" value="template--27949759201382__main" />
                              </form>
                              <span className="visually-hidden" role="status" data-quick-add-status=""></span>
                              <span
                                className="quick-add__message"
                                popover="manual"
                                aria-hidden="true"
                                data-quick-add-message=""
                                hidden
                              ></span>{" "}
                            </quick-add>{" "}
                            <a
                              className="button product-card__buy-link"
                              href="/cart/67834034749542:1"
                              data-card-buy-link=""
                            >
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {" "}
                                <path
                                  d="M2.75 4.81253C2.56766 4.81253 2.3928 4.88496 2.26386 5.01389C2.13493 5.14282 2.0625 5.31769 2.0625 5.50003C2.0625 5.68237 2.13493 5.85723 2.26386 5.98616C2.3928 6.1151 2.56766 6.18753 2.75 6.18753H4.27625L6.08025 13.4063C6.23356 14.0182 6.7815 14.4375 7.41194 14.4375H15.9851C16.6059 14.4375 17.1332 14.025 17.2961 13.4269L19.0781 6.87503H17.6385L15.9844 13.0625H7.41125L5.60794 5.84378C5.53345 5.54762 5.36173 5.28503 5.12028 5.09806C4.87883 4.91108 4.58162 4.81054 4.27625 4.81253H2.75ZM15.125 14.4375C13.9941 14.4375 13.0625 15.3691 13.0625 16.5C13.0625 17.631 13.9941 18.5625 15.125 18.5625C16.2559 18.5625 17.1875 17.631 17.1875 16.5C17.1875 15.3691 16.2559 14.4375 15.125 14.4375ZM8.9375 14.4375C7.80656 14.4375 6.875 15.3691 6.875 16.5C6.875 17.631 7.80656 18.5625 8.9375 18.5625C10.0684 18.5625 11 17.631 11 16.5C11 15.3691 10.0684 14.4375 8.9375 14.4375ZM8.9375 15.8125C9.32525 15.8125 9.625 16.1123 9.625 16.5C9.625 16.8878 9.32525 17.1875 8.9375 17.1875C8.54975 17.1875 8.25 16.8878 8.25 16.5C8.25 16.1123 8.54975 15.8125 8.9375 15.8125ZM15.125 15.8125C15.5127 15.8125 15.8125 16.1123 15.8125 16.5C15.8125 16.8878 15.5127 17.1875 15.125 17.1875C14.7373 17.1875 14.4375 16.8878 14.4375 16.5C14.4375 16.1123 14.7373 15.8125 15.125 15.8125Z"
                                  fill="currentColor"
                                ></path>{" "}
                                <path
                                  d="M8.19922 7.85742L11.5388 10.8574L14.7992 7.85742H12.1592V4H10.8392V7.85742H8.19922Z"
                                  fill="currentColor"
                                ></path>{" "}
                              </svg>{" "}
                              <span className="product-card__buy-label">Buy</span>
                              <span className="visually-hidden">: Retinol Renewal Oil</span>{" "}
                            </a>{" "}
                          </div>
                          <a
                            className="button button--secondary product-card__notify"
                            href="/products/retinol-renewal-oil?_pos=2&_sid=aee79c6c8&_ss=r"
                            data-card-notify=""
                            hidden
                          >
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
                              <path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.75 6.25 2.25 7H3.75c.5-.75 2.25-2.5 2.25-7Z"></path>
                              <path d="M10 19.5a2.1 2.1 0 0 0 4 0"></path>
                            </svg>{" "}
                            Notify me<span className="visually-hidden">: Retinol Renewal Oil</span>{" "}
                          </a>{" "}
                        </div>{" "}
                      </card-options>
                    </div>{" "}
                  </li>
                  <li className="collection-grid__item">
                    {" "}
                    <div
                      className="product-card product-card--full"
                      style={{ "--card-media-h": "1.25" } as React.CSSProperties}
                    >
                      {" "}
                      <div className="product-card__media product-card__media--portrait product-card__media--slider">
                        <card-gallery className="product-card__gallery">
                          {" "}
                          <div className="product-card__slides" data-card-slides="">
                            <a
                              className="product-card__slide"
                              href="/products/rose-petal-toner?_pos=3&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235081048166"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/rose-petal-toner-1.png?v=1793074059&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/rose-petal-toner-1.png?v=1793074059&width=310 310w, /cdn/shop/files/rose-petal-toner-1.png?v=1793074059&width=375 375w, /cdn/shop/files/rose-petal-toner-1.png?v=1793074059&width=550 550w, /cdn/shop/files/rose-petal-toner-1.png?v=1793074059&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="eager"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                            <a
                              className="product-card__slide"
                              href="/products/rose-petal-toner?_pos=3&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235079671910"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/rose-petal-toner-2.png?v=1793074058&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/rose-petal-toner-2.png?v=1793074058&width=310 310w, /cdn/shop/files/rose-petal-toner-2.png?v=1793074058&width=375 375w, /cdn/shop/files/rose-petal-toner-2.png?v=1793074058&width=550 550w, /cdn/shop/files/rose-petal-toner-2.png?v=1793074058&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="lazy"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                            <a
                              className="product-card__slide"
                              href="/products/rose-petal-toner?_pos=3&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235080261734"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/rose-petal-toner-3.png?v=1793074059&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/rose-petal-toner-3.png?v=1793074059&width=310 310w, /cdn/shop/files/rose-petal-toner-3.png?v=1793074059&width=375 375w, /cdn/shop/files/rose-petal-toner-3.png?v=1793074059&width=550 550w, /cdn/shop/files/rose-petal-toner-3.png?v=1793074059&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="lazy"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                          </div>{" "}
                          <span
                            className="product-card__arrow product-card__arrow--prev"
                            data-card-prev=""
                            aria-hidden="true"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span
                            className="product-card__arrow product-card__arrow--next"
                            data-card-next=""
                            aria-hidden="true"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span className="product-card__dots" aria-hidden="true">
                            <span className="product-card__dot is-active" data-card-dot="0"></span>
                            <span className="product-card__dot" data-card-dot="1"></span>
                            <span className="product-card__dot" data-card-dot="2"></span>
                          </span>{" "}
                        </card-gallery>
                        <div className="product-card__badges">
                          {" "}
                          <span
                            className="product-card__badge product-card__badge--discount color-scheme-3"
                            data-card-discount=""
                            data-template="-[percent]%"
                            hidden
                          >
                            -0%
                          </span>
                        </div>{" "}
                      </div>
                      <card-options className="product-card__body" data-cart-url="/cart">
                        {" "}
                        <div className="product-card__meta">
                          <p className="product-card__category">Skincare</p>
                          <p className="product-card__score">
                            {" "}
                            <span aria-hidden="true">
                              {" "}
                              <span className="product-card__star">★</span> 4.5 (1)
                            </span>{" "}
                            <span className="visually-hidden">Rated 4.5 out of 5, 1 review</span>{" "}
                          </p>
                        </div>{" "}
                        <h3 className="product-card__title">
                          {" "}
                          <a
                            className="product-card__link"
                            href="/products/rose-petal-toner?_pos=3&_sid=aee79c6c8&_ss=r"
                          >
                            Rose Petal Toner
                          </a>{" "}
                        </h3>{" "}
                        <div className="product-card__pricing">
                          {" "}
                          <div data-card-price="">
                            {" "}
                            <div className="price">
                              {" "}
                              <span className="price__current">
                                {" "}
                                <span className="visually-hidden">Regular price </span>
                                <span data-price-amount="">Rs. 3,200.00</span>
                              </span>
                            </div>{" "}
                          </div>{" "}
                          <span className="product-card__save" data-card-save="" data-template="Save [percent]%" hidden>
                            Save 0%
                          </span>{" "}
                        </div>
                        <div className="product-card__buy">
                          <div className="product-card__buy-now" data-card-buy="">
                            {" "}
                            <quick-add
                              className="quick-add quick-add--pill product-card__quick-add product-card__quick-add--icon"
                              style={
                                { "--quick-add-size": "44px", "--quick-add-color": "#ffffff" } as React.CSSProperties
                              }
                              data-variant-id="67834034585702"
                              data-label-added="Rose Petal Toner added to your cart"
                              data-label-error="Couldn't add this to your cart. Please try again."
                            >
                              <form
                                method="post"
                                action="/cart/add"
                                id="QuickAdd-template--27949759201382__main-15446394863718-pill-product-card__quick-add-product-card__quick-add-icon-full"
                                acceptCharset="UTF-8"
                                className="quick-add__form"
                                encType="multipart/form-data"
                              >
                                <input type="hidden" name="form_type" value="product" />
                                <input type="hidden" name="utf8" value="✓" />
                                <input type="hidden" name="id" value="67834034585702" />{" "}
                                <input type="hidden" name="quantity" value="1" />
                                <button type="submit" className="quick-add__button">
                                  {" "}
                                  <span className="quick-add__line quick-add__line--1" aria-hidden="true"></span>{" "}
                                  <span className="quick-add__line quick-add__line--2" aria-hidden="true"></span>{" "}
                                  <span className="quick-add__cart" aria-hidden="true">
                                    {" "}
                                    <span className="quick-add__icon quick-add__icon--upright">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M7.79866 18.2501C8.73809 18.2501 9.49966 17.4886 9.49966 16.5491C9.49966 15.6097 8.73809 14.8481 7.79866 14.8481C6.85922 14.8481 6.09766 15.6097 6.09766 16.5491C6.09766 17.4886 6.85922 18.2501 7.79866 18.2501Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M15.2098 18.2501C16.1492 18.2501 16.9108 17.4886 16.9108 16.5491C16.9108 15.6097 16.1492 14.8481 15.2098 14.8481C14.2704 14.8481 13.5088 15.6097 13.5088 16.5491C13.5088 17.4886 14.2704 18.2501 15.2098 18.2501Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M3.856 3.055L5.866 9.419C6.175 10.397 6.329 10.886 6.626 11.248C6.886 11.568 7.225 11.815 7.608 11.968C8.043 12.141 8.555 12.141 9.581 12.141H13.436C14.462 12.141 14.974 12.141 15.408 11.968C15.792 11.815 16.13 11.568 16.391 11.248C16.687 10.886 16.841 10.397 17.151 9.419L17.56 8.123L17.8 7.357L18.131 6.307C18.2491 5.9325 18.2774 5.53544 18.2134 5.148C18.1495 4.76055 17.9952 4.39361 17.763 4.07691C17.5309 3.76021 17.2274 3.50266 16.8771 3.32511C16.5268 3.14757 16.1397 3.05503 15.747 3.055H3.856ZM3.856 3.055L3.845 3.018C3.80277 2.87656 3.75608 2.73649 3.705 2.598C3.50255 2.08554 3.15923 1.64082 2.71473 1.31523C2.27022 0.989631 1.74266 0.796448 1.193 0.758C1.09 0.75 0.977 0.75 0.75 0.75"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>{" "}
                                    </span>{" "}
                                    <span className="quick-add__icon quick-add__icon--tilt">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        width="21"
                                        height="21"
                                        viewBox="0 0 21 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M10.7069 17.9373C10.7069 18.8768 9.94537 19.6383 9.00593 19.6383C8.0665 19.6383 7.30493 18.8768 7.30493 17.9373C7.30493 16.9979 8.0665 16.2363 9.00593 16.2363C9.94537 16.2363 10.7069 16.9979 10.7069 17.9373Z"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          stroke="currentColor"
                                        ></path>
                                        <path
                                          d="M18.119 17.9373C18.119 18.8768 17.3575 19.6383 16.418 19.6383C15.4786 19.6383 14.717 18.8768 14.717 17.9373C14.717 16.9979 15.4786 16.2363 16.418 16.2363C17.3575 16.2363 18.119 16.9979 18.119 17.9373Z"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          stroke="currentColor"
                                        ></path>
                                        <path
                                          d="M4.36072 6.08072L8.00416 11.6723L8.00873 11.6793C8.5657 12.5339 8.84475 12.9621 9.22693 13.2304C9.56324 13.4689 9.95607 13.616 10.3661 13.6606C10.8315 13.7106 11.3248 13.5732 12.3132 13.298L12.3132 13.298L16.0269 12.2639L16.0269 12.2639C17.0153 11.9887 17.5085 11.8514 17.8802 11.5683C18.2091 11.3179 18.4685 10.9893 18.634 10.611C18.8211 10.1852 18.8391 9.67609 18.875 8.66196L18.8756 8.64517L18.9219 7.28695L18.9477 6.48465L18.9849 5.38434C18.9982 4.99188 18.9189 4.6018 18.7534 4.2457C18.5879 3.88961 18.3408 3.57751 18.0322 3.33469C17.7236 3.09187 17.3621 2.92517 16.9771 2.84809C16.592 2.77101 16.1942 2.78572 15.8159 2.89102L4.36072 6.08072ZM4.36072 6.08072L4.34019 6.04802C4.26157 5.92309 4.17902 5.80068 4.09266 5.68097C3.76017 5.2416 3.31014 4.90527 2.79458 4.71084C2.27903 4.51642 1.71898 4.47183 1.17915 4.58223C1.07778 4.60216 0.968925 4.63247 0.750244 4.69336"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          stroke="currentColor"
                                        ></path>
                                      </svg>{" "}
                                    </span>{" "}
                                    <span className="quick-add__tick">
                                      {" "}
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="m6 12.5 4 4 8-9"></path>
                                      </svg>{" "}
                                    </span>{" "}
                                  </span>{" "}
                                  <span className="quick-add__label">Add to cart</span>
                                  <span className="visually-hidden" data-quick-add-name="">
                                    : Rose Petal Toner
                                  </span>
                                </button>
                                <input type="hidden" name="product-id" value="15446394863718" />
                                <input type="hidden" name="section-id" value="template--27949759201382__main" />
                              </form>
                              <span className="visually-hidden" role="status" data-quick-add-status=""></span>
                              <span
                                className="quick-add__message"
                                popover="manual"
                                aria-hidden="true"
                                data-quick-add-message=""
                                hidden
                              ></span>{" "}
                            </quick-add>{" "}
                            <a
                              className="button product-card__buy-link"
                              href="/cart/67834034585702:1"
                              data-card-buy-link=""
                            >
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {" "}
                                <path
                                  d="M2.75 4.81253C2.56766 4.81253 2.3928 4.88496 2.26386 5.01389C2.13493 5.14282 2.0625 5.31769 2.0625 5.50003C2.0625 5.68237 2.13493 5.85723 2.26386 5.98616C2.3928 6.1151 2.56766 6.18753 2.75 6.18753H4.27625L6.08025 13.4063C6.23356 14.0182 6.7815 14.4375 7.41194 14.4375H15.9851C16.6059 14.4375 17.1332 14.025 17.2961 13.4269L19.0781 6.87503H17.6385L15.9844 13.0625H7.41125L5.60794 5.84378C5.53345 5.54762 5.36173 5.28503 5.12028 5.09806C4.87883 4.91108 4.58162 4.81054 4.27625 4.81253H2.75ZM15.125 14.4375C13.9941 14.4375 13.0625 15.3691 13.0625 16.5C13.0625 17.631 13.9941 18.5625 15.125 18.5625C16.2559 18.5625 17.1875 17.631 17.1875 16.5C17.1875 15.3691 16.2559 14.4375 15.125 14.4375ZM8.9375 14.4375C7.80656 14.4375 6.875 15.3691 6.875 16.5C6.875 17.631 7.80656 18.5625 8.9375 18.5625C10.0684 18.5625 11 17.631 11 16.5C11 15.3691 10.0684 14.4375 8.9375 14.4375ZM8.9375 15.8125C9.32525 15.8125 9.625 16.1123 9.625 16.5C9.625 16.8878 9.32525 17.1875 8.9375 17.1875C8.54975 17.1875 8.25 16.8878 8.25 16.5C8.25 16.1123 8.54975 15.8125 8.9375 15.8125ZM15.125 15.8125C15.5127 15.8125 15.8125 16.1123 15.8125 16.5C15.8125 16.8878 15.5127 17.1875 15.125 17.1875C14.7373 17.1875 14.4375 16.8878 14.4375 16.5C14.4375 16.1123 14.7373 15.8125 15.125 15.8125Z"
                                  fill="currentColor"
                                ></path>{" "}
                                <path
                                  d="M8.19922 7.85742L11.5388 10.8574L14.7992 7.85742H12.1592V4H10.8392V7.85742H8.19922Z"
                                  fill="currentColor"
                                ></path>{" "}
                              </svg>{" "}
                              <span className="product-card__buy-label">Buy</span>
                              <span className="visually-hidden">: Rose Petal Toner</span>{" "}
                            </a>{" "}
                          </div>
                          <a
                            className="button button--secondary product-card__notify"
                            href="/products/rose-petal-toner?_pos=3&_sid=aee79c6c8&_ss=r"
                            data-card-notify=""
                            hidden
                          >
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
                              <path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.75 6.25 2.25 7H3.75c.5-.75 2.25-2.5 2.25-7Z"></path>
                              <path d="M10 19.5a2.1 2.1 0 0 0 4 0"></path>
                            </svg>{" "}
                            Notify me<span className="visually-hidden">: Rose Petal Toner</span>{" "}
                          </a>{" "}
                        </div>{" "}
                      </card-options>
                    </div>{" "}
                  </li>
                  <li className="collection-grid__item">
                    {" "}
                    <div
                      className="product-card product-card--full"
                      style={{ "--card-media-h": "1.25" } as React.CSSProperties}
                    >
                      {" "}
                      <div className="product-card__media product-card__media--portrait product-card__media--slider">
                        <card-gallery className="product-card__gallery">
                          {" "}
                          <div className="product-card__slides" data-card-slides="">
                            <a
                              className="product-card__slide"
                              href="/products/skin-tint?_pos=4&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235078951014"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/skin-tint-1.png?v=1793074057&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/skin-tint-1.png?v=1793074057&width=310 310w, /cdn/shop/files/skin-tint-1.png?v=1793074057&width=375 375w, /cdn/shop/files/skin-tint-1.png?v=1793074057&width=550 550w, /cdn/shop/files/skin-tint-1.png?v=1793074057&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="eager"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                            <a
                              className="product-card__slide"
                              href="/products/skin-tint?_pos=4&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235080949862"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/skin-tint-2.png?v=1793074059&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/skin-tint-2.png?v=1793074059&width=310 310w, /cdn/shop/files/skin-tint-2.png?v=1793074059&width=375 375w, /cdn/shop/files/skin-tint-2.png?v=1793074059&width=550 550w, /cdn/shop/files/skin-tint-2.png?v=1793074059&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="lazy"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                            <a
                              className="product-card__slide"
                              href="/products/skin-tint?_pos=4&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235080228966"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/skin-tint-3.png?v=1793074059&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/skin-tint-3.png?v=1793074059&width=310 310w, /cdn/shop/files/skin-tint-3.png?v=1793074059&width=375 375w, /cdn/shop/files/skin-tint-3.png?v=1793074059&width=550 550w, /cdn/shop/files/skin-tint-3.png?v=1793074059&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="lazy"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                            <a
                              className="product-card__slide"
                              href="/products/skin-tint?_pos=4&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235080491110"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/skin-tint-light.png?v=1793074059&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/skin-tint-light.png?v=1793074059&width=310 310w, /cdn/shop/files/skin-tint-light.png?v=1793074059&width=375 375w, /cdn/shop/files/skin-tint-light.png?v=1793074059&width=550 550w, /cdn/shop/files/skin-tint-light.png?v=1793074059&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="lazy"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                            <a
                              className="product-card__slide"
                              href="/products/skin-tint?_pos=4&_sid=aee79c6c8&_ss=r"
                              tabIndex={-1}
                              aria-hidden="true"
                              data-media-id="46235079966822"
                            >
                              {" "}
                              <div className="image image--cover">
                                <img
                                  src="/cdn/shop/files/skin-tint-medium.png?v=1793074058&width=1024"
                                  alt=""
                                  srcSet="/cdn/shop/files/skin-tint-medium.png?v=1793074058&width=310 310w, /cdn/shop/files/skin-tint-medium.png?v=1793074058&width=375 375w, /cdn/shop/files/skin-tint-medium.png?v=1793074058&width=550 550w, /cdn/shop/files/skin-tint-medium.png?v=1793074058&width=750 750w"
                                  width="1024"
                                  height="1024"
                                  loading="lazy"
                                  sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw"
                                  fetchPriority="auto"
                                />{" "}
                              </div>{" "}
                            </a>
                          </div>{" "}
                          <span
                            className="product-card__arrow product-card__arrow--prev"
                            data-card-prev=""
                            aria-hidden="true"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span
                            className="product-card__arrow product-card__arrow--next"
                            data-card-next=""
                            aria-hidden="true"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              width="12"
                              height="8"
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1.5L6 6.5L11 1.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>{" "}
                          </span>{" "}
                          <span className="product-card__dots" aria-hidden="true">
                            <span className="product-card__dot is-active" data-card-dot="0"></span>
                            <span className="product-card__dot" data-card-dot="1"></span>
                            <span className="product-card__dot" data-card-dot="2"></span>
                            <span className="product-card__dot" data-card-dot="3"></span>
                            <span className="product-card__dot" data-card-dot="4"></span>
                          </span>{" "}
                        </card-gallery>
                        <div className="product-card__badges">
                          {" "}
                          <span
                            className="product-card__badge product-card__badge--discount color-scheme-3"
                            data-card-discount=""
                            data-template="-[percent]%"
                            hidden
                          >
                            -0%
                          </span>
                        </div>{" "}
                      </div>
                      <card-options className="product-card__body" data-cart-url="/cart">
                        {" "}
                        <div className="product-card__meta">
                          <p className="product-card__category">Makeup</p>
                        </div>{" "}
                        <h3 className="product-card__title">
                          {" "}
                          <a className="product-card__link" href="/products/skin-tint?_pos=4&_sid=aee79c6c8&_ss=r">
                            Skin Tint
                          </a>{" "}
                        </h3>{" "}
                        <div className="product-card__pricing">
                          {" "}
                          <div data-card-price="">
                            {" "}
                            <div className="price">
                              {" "}
                              <span className="price__current">
                                {" "}
                                <span className="visually-hidden">Regular price </span>
                                <span data-price-amount="">Rs. 11,800.00</span>
                              </span>
                            </div>{" "}
                          </div>{" "}
                          <span className="product-card__save" data-card-save="" data-template="Save [percent]%" hidden>
                            Save 0%
                          </span>{" "}
                        </div>
                        <fieldset className="product-card__options">
                          {" "}
                          <legend className="visually-hidden">Shade</legend>
                          <input
                            className="visually-hidden"
                            type="radio"
                            id="Card-15446393978982-template--27949759201382__main-1"
                            name="Card-15446393978982-template--27949759201382__main"
                            value="67834033209446"
                            data-available="true"
                            data-save="0"
                            data-add-name="Skin Tint - Light"
                            data-add-label="Add Skin Tint - Light to cart"
                            data-added-label="Skin Tint - Light added to your cart"
                            data-media-id="46235080491110"
                            defaultChecked
                          />{" "}
                          <label
                            className="product-card__option product-card__option--text"
                            htmlFor="Card-15446393978982-template--27949759201382__main-1"
                          >
                            Light
                          </label>
                          <input
                            className="visually-hidden"
                            type="radio"
                            id="Card-15446393978982-template--27949759201382__main-2"
                            name="Card-15446393978982-template--27949759201382__main"
                            value="67834033242214"
                            data-available="true"
                            data-save="0"
                            data-add-name="Skin Tint - Medium"
                            data-add-label="Add Skin Tint - Medium to cart"
                            data-added-label="Skin Tint - Medium added to your cart"
                            data-media-id="46235079966822"
                          />{" "}
                          <label
                            className="product-card__option product-card__option--text"
                            htmlFor="Card-15446393978982-template--27949759201382__main-2"
                          >
                            Medium
                          </label>
                          <input
                            className="visually-hidden"
                            type="radio"
                            id="Card-15446393978982-template--27949759201382__main-3"
                            name="Card-15446393978982-template--27949759201382__main"
                            value="67834033274982"
                            data-available="true"
                            data-save="0"
                            data-add-name="Skin Tint - Tan"
                            data-add-label="Add Skin Tint - Tan to cart"
                            data-added-label="Skin Tint - Tan added to your cart"
                            data-media-id="46235080163430"
                          />{" "}
                          <label
                            className="product-card__option product-card__option--text"
                            htmlFor="Card-15446393978982-template--27949759201382__main-3"
                          >
                            Tan
                          </label>
                          <template
                            data-media-for="46235080163430"
                            dangerouslySetInnerHTML={{
                              __html:
                                '\n<div class="image image--cover"><img src="/cdn/shop/files/skin-tint-tan.png?v=1793074059&width=1024" alt srcset="/cdn/shop/files/skin-tint-tan.png?v=1793074059&width=310 310w, /cdn/shop/files/skin-tint-tan.png?v=1793074059&width=375 375w, /cdn/shop/files/skin-tint-tan.png?v=1793074059&width=550 550w, /cdn/shop/files/skin-tint-tan.png?v=1793074059&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw" fetchpriority="auto">\n</div>\n\n\n',
                            }}
                          />
                          <input
                            className="visually-hidden"
                            type="radio"
                            id="Card-15446393978982-template--27949759201382__main-4"
                            name="Card-15446393978982-template--27949759201382__main"
                            value="67834033307750"
                            data-available="true"
                            data-save="0"
                            data-add-name="Skin Tint - Deep"
                            data-add-label="Add Skin Tint - Deep to cart"
                            data-added-label="Skin Tint - Deep added to your cart"
                            data-media-id="46235079901286"
                          />{" "}
                          <label
                            className="product-card__option product-card__option--text"
                            htmlFor="Card-15446393978982-template--27949759201382__main-4"
                          >
                            Deep
                          </label>
                          <template
                            data-media-for="46235079901286"
                            dangerouslySetInnerHTML={{
                              __html:
                                '\n<div class="image image--cover"><img src="/cdn/shop/files/skin-tint-deep.png?v=1793074058&width=1024" alt srcset="/cdn/shop/files/skin-tint-deep.png?v=1793074058&width=310 310w, /cdn/shop/files/skin-tint-deep.png?v=1793074058&width=375 375w, /cdn/shop/files/skin-tint-deep.png?v=1793074058&width=550 550w, /cdn/shop/files/skin-tint-deep.png?v=1793074058&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 1200px) 26vw, (min-width: 750px) 34vw, 50vw" fetchpriority="auto">\n</div>\n\n\n',
                            }}
                          />
                        </fieldset>
                        <div className="product-card__buy">
                          <div className="product-card__buy-now" data-card-buy="">
                            {" "}
                            <quick-add
                              className="quick-add quick-add--pill product-card__quick-add product-card__quick-add--icon"
                              style={
                                { "--quick-add-size": "44px", "--quick-add-color": "#ffffff" } as React.CSSProperties
                              }
                              data-variant-id="67834033209446"
                              data-label-added="Skin Tint - Light added to your cart"
                              data-label-error="Couldn't add this to your cart. Please try again."
                            >
                              <form
                                method="post"
                                action="/cart/add"
                                id="QuickAdd-template--27949759201382__main-15446393978982-pill-product-card__quick-add-product-card__quick-add-icon-full"
                                acceptCharset="UTF-8"
                                className="quick-add__form"
                                encType="multipart/form-data"
                              >
                                <input type="hidden" name="form_type" value="product" />
                                <input type="hidden" name="utf8" value="✓" />
                                <input type="hidden" name="id" value="67834033209446" />{" "}
                                <input type="hidden" name="quantity" value="1" />
                                <button type="submit" className="quick-add__button">
                                  {" "}
                                  <span className="quick-add__line quick-add__line--1" aria-hidden="true"></span>{" "}
                                  <span className="quick-add__line quick-add__line--2" aria-hidden="true"></span>{" "}
                                  <span className="quick-add__cart" aria-hidden="true">
                                    {" "}
                                    <span className="quick-add__icon quick-add__icon--upright">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M7.79866 18.2501C8.73809 18.2501 9.49966 17.4886 9.49966 16.5491C9.49966 15.6097 8.73809 14.8481 7.79866 14.8481C6.85922 14.8481 6.09766 15.6097 6.09766 16.5491C6.09766 17.4886 6.85922 18.2501 7.79866 18.2501Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M15.2098 18.2501C16.1492 18.2501 16.9108 17.4886 16.9108 16.5491C16.9108 15.6097 16.1492 14.8481 15.2098 14.8481C14.2704 14.8481 13.5088 15.6097 13.5088 16.5491C13.5088 17.4886 14.2704 18.2501 15.2098 18.2501Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M3.856 3.055L5.866 9.419C6.175 10.397 6.329 10.886 6.626 11.248C6.886 11.568 7.225 11.815 7.608 11.968C8.043 12.141 8.555 12.141 9.581 12.141H13.436C14.462 12.141 14.974 12.141 15.408 11.968C15.792 11.815 16.13 11.568 16.391 11.248C16.687 10.886 16.841 10.397 17.151 9.419L17.56 8.123L17.8 7.357L18.131 6.307C18.2491 5.9325 18.2774 5.53544 18.2134 5.148C18.1495 4.76055 17.9952 4.39361 17.763 4.07691C17.5309 3.76021 17.2274 3.50266 16.8771 3.32511C16.5268 3.14757 16.1397 3.05503 15.747 3.055H3.856ZM3.856 3.055L3.845 3.018C3.80277 2.87656 3.75608 2.73649 3.705 2.598C3.50255 2.08554 3.15923 1.64082 2.71473 1.31523C2.27022 0.989631 1.74266 0.796448 1.193 0.758C1.09 0.75 0.977 0.75 0.75 0.75"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>{" "}
                                    </span>{" "}
                                    <span className="quick-add__icon quick-add__icon--tilt">
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        width="21"
                                        height="21"
                                        viewBox="0 0 21 21"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M10.7069 17.9373C10.7069 18.8768 9.94537 19.6383 9.00593 19.6383C8.0665 19.6383 7.30493 18.8768 7.30493 17.9373C7.30493 16.9979 8.0665 16.2363 9.00593 16.2363C9.94537 16.2363 10.7069 16.9979 10.7069 17.9373Z"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          stroke="currentColor"
                                        ></path>
                                        <path
                                          d="M18.119 17.9373C18.119 18.8768 17.3575 19.6383 16.418 19.6383C15.4786 19.6383 14.717 18.8768 14.717 17.9373C14.717 16.9979 15.4786 16.2363 16.418 16.2363C17.3575 16.2363 18.119 16.9979 18.119 17.9373Z"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          stroke="currentColor"
                                        ></path>
                                        <path
                                          d="M4.36072 6.08072L8.00416 11.6723L8.00873 11.6793C8.5657 12.5339 8.84475 12.9621 9.22693 13.2304C9.56324 13.4689 9.95607 13.616 10.3661 13.6606C10.8315 13.7106 11.3248 13.5732 12.3132 13.298L12.3132 13.298L16.0269 12.2639L16.0269 12.2639C17.0153 11.9887 17.5085 11.8514 17.8802 11.5683C18.2091 11.3179 18.4685 10.9893 18.634 10.611C18.8211 10.1852 18.8391 9.67609 18.875 8.66196L18.8756 8.64517L18.9219 7.28695L18.9477 6.48465L18.9849 5.38434C18.9982 4.99188 18.9189 4.6018 18.7534 4.2457C18.5879 3.88961 18.3408 3.57751 18.0322 3.33469C17.7236 3.09187 17.3621 2.92517 16.9771 2.84809C16.592 2.77101 16.1942 2.78572 15.8159 2.89102L4.36072 6.08072ZM4.36072 6.08072L4.34019 6.04802C4.26157 5.92309 4.17902 5.80068 4.09266 5.68097C3.76017 5.2416 3.31014 4.90527 2.79458 4.71084C2.27903 4.51642 1.71898 4.47183 1.17915 4.58223C1.07778 4.60216 0.968925 4.63247 0.750244 4.69336"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          stroke="currentColor"
                                        ></path>
                                      </svg>{" "}
                                    </span>{" "}
                                    <span className="quick-add__tick">
                                      {" "}
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="m6 12.5 4 4 8-9"></path>
                                      </svg>{" "}
                                    </span>{" "}
                                  </span>{" "}
                                  <span className="quick-add__label">Add to cart</span>
                                  <span className="visually-hidden" data-quick-add-name="">
                                    : Skin Tint - Light
                                  </span>
                                </button>
                                <input type="hidden" name="product-id" value="15446393978982" />
                                <input type="hidden" name="section-id" value="template--27949759201382__main" />
                              </form>
                              <span className="visually-hidden" role="status" data-quick-add-status=""></span>
                              <span
                                className="quick-add__message"
                                popover="manual"
                                aria-hidden="true"
                                data-quick-add-message=""
                                hidden
                              ></span>{" "}
                            </quick-add>{" "}
                            <a
                              className="button product-card__buy-link"
                              href="/cart/67834033209446:1"
                              data-card-buy-link=""
                            >
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {" "}
                                <path
                                  d="M2.75 4.81253C2.56766 4.81253 2.3928 4.88496 2.26386 5.01389C2.13493 5.14282 2.0625 5.31769 2.0625 5.50003C2.0625 5.68237 2.13493 5.85723 2.26386 5.98616C2.3928 6.1151 2.56766 6.18753 2.75 6.18753H4.27625L6.08025 13.4063C6.23356 14.0182 6.7815 14.4375 7.41194 14.4375H15.9851C16.6059 14.4375 17.1332 14.025 17.2961 13.4269L19.0781 6.87503H17.6385L15.9844 13.0625H7.41125L5.60794 5.84378C5.53345 5.54762 5.36173 5.28503 5.12028 5.09806C4.87883 4.91108 4.58162 4.81054 4.27625 4.81253H2.75ZM15.125 14.4375C13.9941 14.4375 13.0625 15.3691 13.0625 16.5C13.0625 17.631 13.9941 18.5625 15.125 18.5625C16.2559 18.5625 17.1875 17.631 17.1875 16.5C17.1875 15.3691 16.2559 14.4375 15.125 14.4375ZM8.9375 14.4375C7.80656 14.4375 6.875 15.3691 6.875 16.5C6.875 17.631 7.80656 18.5625 8.9375 18.5625C10.0684 18.5625 11 17.631 11 16.5C11 15.3691 10.0684 14.4375 8.9375 14.4375ZM8.9375 15.8125C9.32525 15.8125 9.625 16.1123 9.625 16.5C9.625 16.8878 9.32525 17.1875 8.9375 17.1875C8.54975 17.1875 8.25 16.8878 8.25 16.5C8.25 16.1123 8.54975 15.8125 8.9375 15.8125ZM15.125 15.8125C15.5127 15.8125 15.8125 16.1123 15.8125 16.5C15.8125 16.8878 15.5127 17.1875 15.125 17.1875C14.7373 17.1875 14.4375 16.8878 14.4375 16.5C14.4375 16.1123 14.7373 15.8125 15.125 15.8125Z"
                                  fill="currentColor"
                                ></path>{" "}
                                <path
                                  d="M8.19922 7.85742L11.5388 10.8574L14.7992 7.85742H12.1592V4H10.8392V7.85742H8.19922Z"
                                  fill="currentColor"
                                ></path>{" "}
                              </svg>{" "}
                              <span className="product-card__buy-label">Buy</span>
                              <span className="visually-hidden">: Skin Tint</span>{" "}
                            </a>{" "}
                          </div>
                          <a
                            className="button button--secondary product-card__notify"
                            href="/products/skin-tint?_pos=4&_sid=aee79c6c8&_ss=r"
                            data-card-notify=""
                            hidden
                          >
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
                              <path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.75 6.25 2.25 7H3.75c.5-.75 2.25-2.5 2.25-7Z"></path>
                              <path d="M10 19.5a2.1 2.1 0 0 0 4 0"></path>
                            </svg>{" "}
                            Notify me<span className="visually-hidden">: Skin Tint</span>{" "}
                          </a>{" "}
                        </div>{" "}
                      </card-options>
                    </div>{" "}
                  </li>
                </ul>{" "}
              </div>{" "}
            </section>
            <section className="search-group" aria-labelledby="SearchArticles-template--27949759201382__main">
              {" "}
              <h2 className="search-group__title" id="SearchArticles-template--27949759201382__main">
                Articles
              </h2>{" "}
              <ul className="result-cards" role="list">
                <li className="result-card">
                  {" "}
                  <a
                    className="result-card__link"
                    href="/blogs/featured/the-art-of-the-morning-ritual?_pos=5&_sid=aee79c6c8&_ss=r"
                  >
                    <div className="result-card__media">
                      {" "}
                      <img
                        src="/cdn/shop/articles/89f877192d8d64d9822cdc07fe0a213e0663a39c.png?v=1792576319&width=800"
                        alt=""
                        srcSet="/cdn/shop/articles/89f877192d8d64d9822cdc07fe0a213e0663a39c.png?v=1792576319&width=400 400w, /cdn/shop/articles/89f877192d8d64d9822cdc07fe0a213e0663a39c.png?v=1792576319&width=600 600w, /cdn/shop/articles/89f877192d8d64d9822cdc07fe0a213e0663a39c.png?v=1792576319&width=800 800w"
                        width="800"
                        height="533"
                        loading="lazy"
                        sizes="(min-width: 1600px) 20vw, (min-width: 1200px) 30vw, (min-width: 750px) 45vw, 92vw"
                      />{" "}
                    </div>
                    <div className="result-card__body">
                      {" "}
                      <p className="result-card__meta">
                        Article · <time dateTime="2026-10-21T09:52:37Z">October 21, 2026</time>
                      </p>{" "}
                      <h3 className="result-card__title">The Art of the Morning Ritual</h3>{" "}
                      <p className="result-card__excerpt">
                        From cleansing to SPF, how the world's most coveted routines unfold at dawn in six beautiful
                        cities.
                      </p>{" "}
                    </div>{" "}
                  </a>{" "}
                </li>
                <li className="result-card">
                  {" "}
                  <a
                    className="result-card__link"
                    href="/blogs/featured/the-art-of-the-golden-hour-morning-ritual?_pos=6&_sid=aee79c6c8&_ss=r"
                  >
                    <div className="result-card__media">
                      {" "}
                      <img
                        src="/cdn/shop/articles/blog-glow-routine.png?v=1793357310&width=800"
                        alt=""
                        srcSet="/cdn/shop/articles/blog-glow-routine.png?v=1793357310&width=400 400w, /cdn/shop/articles/blog-glow-routine.png?v=1793357310&width=600 600w, /cdn/shop/articles/blog-glow-routine.png?v=1793357310&width=800 800w"
                        width="800"
                        height="500"
                        loading="lazy"
                        sizes="(min-width: 1600px) 20vw, (min-width: 1200px) 30vw, (min-width: 750px) 45vw, 92vw"
                      />{" "}
                    </div>
                    <div className="result-card__body">
                      {" "}
                      <p className="result-card__meta">
                        Article · <time dateTime="2026-10-28T08:00:00Z">October 28, 2026</time>
                      </p>{" "}
                      <h3 className="result-card__title">The Art of the Golden Hour Morning Ritual</h3>{" "}
                      <p className="result-card__excerpt">
                        How the most luminous skin in the world begins not with products, but with intention, and the
                        five-step...
                      </p>{" "}
                    </div>{" "}
                  </a>{" "}
                </li>
              </ul>{" "}
            </section>
          </div>
        </results-view>{" "}
        <template
          data-card-scripts=""
          dangerouslySetInnerHTML={{
            __html:
              '\n<div class="product-card product-card--full" style="--card-media-h: 1.25;">\n    <div class="product-card__media product-card__media--portrait product-card__media--slider"><card-gallery class="product-card__gallery">\n          <div class="product-card__slides" data-card-slides><a class="product-card__slide" href="/products/signature-body-mist" tabindex="-1" aria-hidden="true" data-media-id="46235081113702">\n<div class="image image--cover"><img src="/cdn/shop/files/signature-body-mist-1.png?v=1793074059&width=1024" alt srcset="/cdn/shop/files/signature-body-mist-1.png?v=1793074059&width=310 310w, /cdn/shop/files/signature-body-mist-1.png?v=1793074059&width=375 375w, /cdn/shop/files/signature-body-mist-1.png?v=1793074059&width=550 550w, /cdn/shop/files/signature-body-mist-1.png?v=1793074059&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 990px) 25vw, 50vw" fetchpriority="auto">\n</div>\n\n\n\n</a><a class="product-card__slide" href="/products/signature-body-mist" tabindex="-1" aria-hidden="true" data-media-id="46235079442534">\n<div class="image image--cover"><img src="/cdn/shop/files/signature-body-mist-2.png?v=1793074058&width=1024" alt srcset="/cdn/shop/files/signature-body-mist-2.png?v=1793074058&width=310 310w, /cdn/shop/files/signature-body-mist-2.png?v=1793074058&width=375 375w, /cdn/shop/files/signature-body-mist-2.png?v=1793074058&width=550 550w, /cdn/shop/files/signature-body-mist-2.png?v=1793074058&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 990px) 25vw, 50vw" fetchpriority="auto">\n</div>\n\n\n\n</a><a class="product-card__slide" href="/products/signature-body-mist" tabindex="-1" aria-hidden="true" data-media-id="46235079573606">\n<div class="image image--cover"><img src="/cdn/shop/files/signature-body-mist-3.png?v=1793074058&width=1024" alt srcset="/cdn/shop/files/signature-body-mist-3.png?v=1793074058&width=310 310w, /cdn/shop/files/signature-body-mist-3.png?v=1793074058&width=375 375w, /cdn/shop/files/signature-body-mist-3.png?v=1793074058&width=550 550w, /cdn/shop/files/signature-body-mist-3.png?v=1793074058&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 990px) 25vw, 50vw" fetchpriority="auto">\n</div>\n\n\n\n</a><a class="product-card__slide" href="/products/signature-body-mist" tabindex="-1" aria-hidden="true" data-media-id="46235080589414">\n<div class="image image--cover"><img src="/cdn/shop/files/signature-body-mist-rose.png?v=1793074059&width=1024" alt srcset="/cdn/shop/files/signature-body-mist-rose.png?v=1793074059&width=310 310w, /cdn/shop/files/signature-body-mist-rose.png?v=1793074059&width=375 375w, /cdn/shop/files/signature-body-mist-rose.png?v=1793074059&width=550 550w, /cdn/shop/files/signature-body-mist-rose.png?v=1793074059&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 990px) 25vw, 50vw" fetchpriority="auto">\n</div>\n\n\n\n</a><a class="product-card__slide" href="/products/signature-body-mist" tabindex="-1" aria-hidden="true" data-media-id="46235081179238">\n<div class="image image--cover"><img src="/cdn/shop/files/signature-body-mist-amber.png?v=1793074059&width=1024" alt srcset="/cdn/shop/files/signature-body-mist-amber.png?v=1793074059&width=310 310w, /cdn/shop/files/signature-body-mist-amber.png?v=1793074059&width=375 375w, /cdn/shop/files/signature-body-mist-amber.png?v=1793074059&width=550 550w, /cdn/shop/files/signature-body-mist-amber.png?v=1793074059&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 990px) 25vw, 50vw" fetchpriority="auto">\n</div>\n\n\n\n</a></div>\n          <span class="product-card__arrow product-card__arrow--prev" data-card-prev aria-hidden="true"><svg aria-hidden="true" focusable="false" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>\n</span>\n          <span class="product-card__arrow product-card__arrow--next" data-card-next aria-hidden="true"><svg aria-hidden="true" focusable="false" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>\n</span>\n          <span class="product-card__dots" aria-hidden="true"><span class="product-card__dot is-active" data-card-dot="0"></span><span class="product-card__dot" data-card-dot="1"></span><span class="product-card__dot" data-card-dot="2"></span><span class="product-card__dot" data-card-dot="3"></span><span class="product-card__dot" data-card-dot="4"></span></span>\n        </card-gallery><div class="product-card__badges">\n\n<span class="product-card__badge product-card__badge--discount color-scheme-3" data-card-discount data-template="-[percent]%" hidden>-0%</span></div>\n    </div><card-options class="product-card__body" data-cart-url="/cart">\n        <div class="product-card__meta"><p class="product-card__category">Fragrance</p></div>\n\n        <h3 class="product-card__title">\n          <a class="product-card__link" href="/products/signature-body-mist">Signature Body Mist</a>\n        </h3>\n\n        <div class="product-card__pricing">\n          <div data-card-price>\n<div class="price">\n  <span class="price__current">\n    <span class="visually-hidden">Regular price\n</span><span data-price-amount>Rs. 2,700.00</span></span></div>\n\n\n</div>\n          <span class="product-card__save" data-card-save data-template="Save [percent]%" hidden>Save 0%</span>\n        </div><fieldset class="product-card__options">\n            <legend class="visually-hidden">Size</legend><input class="visually-hidden" type="radio" id="Card-15446395322470-template--27949759201382__main-1" name="Card-15446395322470-template--27949759201382__main" value="67834035077222" data-available="true" data-save="0" data-add-name="Signature Body Mist - 50 ml / Rose" data-add-label="Add Signature Body Mist - 50 ml / Rose to cart" data-added-label="Signature Body Mist - 50 ml / Rose added to your cart" data-media-id="46235080589414" checked>\n              <label class="product-card__option product-card__option--text" for="Card-15446395322470-template--27949759201382__main-1">50 ml</label><template data-price-for="67834035077222">\n<div class="price">\n  <span class="price__current">\n    <span class="visually-hidden">Regular price\n</span><span data-price-amount>Rs. 2,700.00</span></span></div>\n\n\n</template><input class="visually-hidden" type="radio" id="Card-15446395322470-template--27949759201382__main-2" name="Card-15446395322470-template--27949759201382__main" value="67834035208294" data-available="true" data-save="0" data-add-name="Signature Body Mist - 100 ml / Rose" data-add-label="Add Signature Body Mist - 100 ml / Rose to cart" data-added-label="Signature Body Mist - 100 ml / Rose added to your cart" data-media-id="46235080589414">\n              <label class="product-card__option product-card__option--text" for="Card-15446395322470-template--27949759201382__main-2">100 ml</label><template data-price-for="67834035208294">\n<div class="price">\n  <span class="price__current">\n    <span class="visually-hidden">Regular price\n</span><span data-price-amount>Rs. 4,000.00</span></span></div>\n\n\n</template><input class="visually-hidden" type="radio" id="Card-15446395322470-template--27949759201382__main-3" name="Card-15446395322470-template--27949759201382__main" value="67834035339366" data-available="true" data-save="0" data-add-name="Signature Body Mist - 200 ml / Rose" data-add-label="Add Signature Body Mist - 200 ml / Rose to cart" data-added-label="Signature Body Mist - 200 ml / Rose added to your cart" data-media-id="46235080589414">\n              <label class="product-card__option product-card__option--text" for="Card-15446395322470-template--27949759201382__main-3">200 ml</label><template data-price-for="67834035339366">\n<div class="price">\n  <span class="price__current">\n    <span class="visually-hidden">Regular price\n</span><span data-price-amount>Rs. 5,500.00</span></span></div>\n\n\n</template></fieldset><div class="product-card__buy"><div class="product-card__buy-now" data-card-buy>\n<quick-add class="quick-add quick-add--pill product-card__quick-add product-card__quick-add--icon" style="--quick-add-size: 44px; --quick-add-color: #ffffff;" data-variant-id="67834035077222" data-label-added="Signature Body Mist - 50 ml / Rose added to your cart" data-label-error="Couldn\'t add this to your cart. Please try again."><form method="post" action="/cart/add" id="QuickAdd-template--27949759201382__main-15446395322470-pill-product-card__quick-add-product-card__quick-add-icon-full" accept-charset="UTF-8" class="quick-add__form" enctype="multipart/form-data"><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><input type="hidden" name="id" value="67834035077222">\n      <input type="hidden" name="quantity" value="1"><button type="submit" class="quick-add__button">\n          <span class="quick-add__line quick-add__line--1" aria-hidden="true"></span>\n    <span class="quick-add__line quick-add__line--2" aria-hidden="true"></span>\n    <span class="quick-add__cart" aria-hidden="true">\n      <span class="quick-add__icon quick-add__icon--upright"><svg aria-hidden="true" focusable="false" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.79866 18.2501C8.73809 18.2501 9.49966 17.4886 9.49966 16.5491C9.49966 15.6097 8.73809 14.8481 7.79866 14.8481C6.85922 14.8481 6.09766 15.6097 6.09766 16.5491C6.09766 17.4886 6.85922 18.2501 7.79866 18.2501Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.2098 18.2501C16.1492 18.2501 16.9108 17.4886 16.9108 16.5491C16.9108 15.6097 16.1492 14.8481 15.2098 14.8481C14.2704 14.8481 13.5088 15.6097 13.5088 16.5491C13.5088 17.4886 14.2704 18.2501 15.2098 18.2501Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.856 3.055L5.866 9.419C6.175 10.397 6.329 10.886 6.626 11.248C6.886 11.568 7.225 11.815 7.608 11.968C8.043 12.141 8.555 12.141 9.581 12.141H13.436C14.462 12.141 14.974 12.141 15.408 11.968C15.792 11.815 16.13 11.568 16.391 11.248C16.687 10.886 16.841 10.397 17.151 9.419L17.56 8.123L17.8 7.357L18.131 6.307C18.2491 5.9325 18.2774 5.53544 18.2134 5.148C18.1495 4.76055 17.9952 4.39361 17.763 4.07691C17.5309 3.76021 17.2274 3.50266 16.8771 3.32511C16.5268 3.14757 16.1397 3.05503 15.747 3.055H3.856ZM3.856 3.055L3.845 3.018C3.80277 2.87656 3.75608 2.73649 3.705 2.598C3.50255 2.08554 3.15923 1.64082 2.71473 1.31523C2.27022 0.989631 1.74266 0.796448 1.193 0.758C1.09 0.75 0.977 0.75 0.75 0.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>\n</span>\n      <span class="quick-add__icon quick-add__icon--tilt"><svg aria-hidden="true" focusable="false" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.7069 17.9373C10.7069 18.8768 9.94537 19.6383 9.00593 19.6383C8.0665 19.6383 7.30493 18.8768 7.30493 17.9373C7.30493 16.9979 8.0665 16.2363 9.00593 16.2363C9.94537 16.2363 10.7069 16.9979 10.7069 17.9373Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path d="M18.119 17.9373C18.119 18.8768 17.3575 19.6383 16.418 19.6383C15.4786 19.6383 14.717 18.8768 14.717 17.9373C14.717 16.9979 15.4786 16.2363 16.418 16.2363C17.3575 16.2363 18.119 16.9979 18.119 17.9373Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path d="M4.36072 6.08072L8.00416 11.6723L8.00873 11.6793C8.5657 12.5339 8.84475 12.9621 9.22693 13.2304C9.56324 13.4689 9.95607 13.616 10.3661 13.6606C10.8315 13.7106 11.3248 13.5732 12.3132 13.298L12.3132 13.298L16.0269 12.2639L16.0269 12.2639C17.0153 11.9887 17.5085 11.8514 17.8802 11.5683C18.2091 11.3179 18.4685 10.9893 18.634 10.611C18.8211 10.1852 18.8391 9.67609 18.875 8.66196L18.8756 8.64517L18.9219 7.28695L18.9477 6.48465L18.9849 5.38434C18.9982 4.99188 18.9189 4.6018 18.7534 4.2457C18.5879 3.88961 18.3408 3.57751 18.0322 3.33469C17.7236 3.09187 17.3621 2.92517 16.9771 2.84809C16.592 2.77101 16.1942 2.78572 15.8159 2.89102L4.36072 6.08072ZM4.36072 6.08072L4.34019 6.04802C4.26157 5.92309 4.17902 5.80068 4.09266 5.68097C3.76017 5.2416 3.31014 4.90527 2.79458 4.71084C2.27903 4.51642 1.71898 4.47183 1.17915 4.58223C1.07778 4.60216 0.968925 4.63247 0.750244 4.69336" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/></svg>\n</span>\n      <span class="quick-add__tick">\n    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 12.5 4 4 8-9"/></svg>\n  </span>\n    </span>\n<span class="quick-add__label">Add to cart</span><span class="visually-hidden" data-quick-add-name>: Signature Body Mist - 50 ml / Rose</span></button><input type="hidden" name="product-id" value="15446395322470"><input type="hidden" name="section-id" value="template--27949759201382__main"></form><span class="visually-hidden" role="status" data-quick-add-status></span><span class="quick-add__message" popover="manual" aria-hidden="true" data-quick-add-message hidden></span>\n  </quick-add>\n\n\n\n              <a class="button product-card__buy-link" href="/cart/67834035077222:1" data-card-buy-link><svg aria-hidden="true" focusable="false" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M2.75 4.81253C2.56766 4.81253 2.3928 4.88496 2.26386 5.01389C2.13493 5.14282 2.0625 5.31769 2.0625 5.50003C2.0625 5.68237 2.13493 5.85723 2.26386 5.98616C2.3928 6.1151 2.56766 6.18753 2.75 6.18753H4.27625L6.08025 13.4063C6.23356 14.0182 6.7815 14.4375 7.41194 14.4375H15.9851C16.6059 14.4375 17.1332 14.025 17.2961 13.4269L19.0781 6.87503H17.6385L15.9844 13.0625H7.41125L5.60794 5.84378C5.53345 5.54762 5.36173 5.28503 5.12028 5.09806C4.87883 4.91108 4.58162 4.81054 4.27625 4.81253H2.75ZM15.125 14.4375C13.9941 14.4375 13.0625 15.3691 13.0625 16.5C13.0625 17.631 13.9941 18.5625 15.125 18.5625C16.2559 18.5625 17.1875 17.631 17.1875 16.5C17.1875 15.3691 16.2559 14.4375 15.125 14.4375ZM8.9375 14.4375C7.80656 14.4375 6.875 15.3691 6.875 16.5C6.875 17.631 7.80656 18.5625 8.9375 18.5625C10.0684 18.5625 11 17.631 11 16.5C11 15.3691 10.0684 14.4375 8.9375 14.4375ZM8.9375 15.8125C9.32525 15.8125 9.625 16.1123 9.625 16.5C9.625 16.8878 9.32525 17.1875 8.9375 17.1875C8.54975 17.1875 8.25 16.8878 8.25 16.5C8.25 16.1123 8.54975 15.8125 8.9375 15.8125ZM15.125 15.8125C15.5127 15.8125 15.8125 16.1123 15.8125 16.5C15.8125 16.8878 15.5127 17.1875 15.125 17.1875C14.7373 17.1875 14.4375 16.8878 14.4375 16.5C14.4375 16.1123 14.7373 15.8125 15.125 15.8125Z" fill="currentColor"/>\n<path d="M8.19922 7.85742L11.5388 10.8574L14.7992 7.85742H12.1592V4H10.8392V7.85742H8.19922Z" fill="currentColor"/>\n</svg>\n<span class="product-card__buy-label">Buy</span><span class="visually-hidden">: Signature Body Mist</span>\n              </a>\n            </div><a class="button button--secondary product-card__notify" href="/products/signature-body-mist" data-card-notify hidden><svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.75 6.25 2.25 7H3.75c.5-.75 2.25-2.5 2.25-7Z"/><path d="M10 19.5a2.1 2.1 0 0 0 4 0"/></svg>\nNotify me<span class="visually-hidden">: Signature Body Mist</span>\n          </a>\n        </div>\n      </card-options></div>\n\n\n\n<quick-add class="quick-add quick-add--round " style="--quick-add-size: 50px; --quick-add-color: #ffffff;" data-variant-id="67834035077222" data-label-added="Signature Body Mist - 50 ml / Rose added to your cart" data-label-error="Couldn\'t add this to your cart. Please try again."><form method="post" action="/cart/add" id="QuickAdd-template--27949759201382__main-15446395322470-round-card-scripts" accept-charset="UTF-8" class="quick-add__form" enctype="multipart/form-data"><input type="hidden" name="form_type" value="product"><input type="hidden" name="utf8" value="✓"><input type="hidden" name="id" value="67834035077222">\n      <input type="hidden" name="quantity" value="1"><button type="submit" class="quick-add__button" aria-label="Add Signature Body Mist - 50 ml / Rose to cart">\n          <span class="quick-add__line quick-add__line--1" aria-hidden="true"></span>\n    <span class="quick-add__line quick-add__line--2" aria-hidden="true"></span>\n    <span class="quick-add__cart" aria-hidden="true">\n      <span class="quick-add__icon quick-add__icon--upright"><svg aria-hidden="true" focusable="false" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.79866 18.2501C8.73809 18.2501 9.49966 17.4886 9.49966 16.5491C9.49966 15.6097 8.73809 14.8481 7.79866 14.8481C6.85922 14.8481 6.09766 15.6097 6.09766 16.5491C6.09766 17.4886 6.85922 18.2501 7.79866 18.2501Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.2098 18.2501C16.1492 18.2501 16.9108 17.4886 16.9108 16.5491C16.9108 15.6097 16.1492 14.8481 15.2098 14.8481C14.2704 14.8481 13.5088 15.6097 13.5088 16.5491C13.5088 17.4886 14.2704 18.2501 15.2098 18.2501Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.856 3.055L5.866 9.419C6.175 10.397 6.329 10.886 6.626 11.248C6.886 11.568 7.225 11.815 7.608 11.968C8.043 12.141 8.555 12.141 9.581 12.141H13.436C14.462 12.141 14.974 12.141 15.408 11.968C15.792 11.815 16.13 11.568 16.391 11.248C16.687 10.886 16.841 10.397 17.151 9.419L17.56 8.123L17.8 7.357L18.131 6.307C18.2491 5.9325 18.2774 5.53544 18.2134 5.148C18.1495 4.76055 17.9952 4.39361 17.763 4.07691C17.5309 3.76021 17.2274 3.50266 16.8771 3.32511C16.5268 3.14757 16.1397 3.05503 15.747 3.055H3.856ZM3.856 3.055L3.845 3.018C3.80277 2.87656 3.75608 2.73649 3.705 2.598C3.50255 2.08554 3.15923 1.64082 2.71473 1.31523C2.27022 0.989631 1.74266 0.796448 1.193 0.758C1.09 0.75 0.977 0.75 0.75 0.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>\n</span>\n      <span class="quick-add__icon quick-add__icon--tilt"><svg aria-hidden="true" focusable="false" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.7069 17.9373C10.7069 18.8768 9.94537 19.6383 9.00593 19.6383C8.0665 19.6383 7.30493 18.8768 7.30493 17.9373C7.30493 16.9979 8.0665 16.2363 9.00593 16.2363C9.94537 16.2363 10.7069 16.9979 10.7069 17.9373Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path d="M18.119 17.9373C18.119 18.8768 17.3575 19.6383 16.418 19.6383C15.4786 19.6383 14.717 18.8768 14.717 17.9373C14.717 16.9979 15.4786 16.2363 16.418 16.2363C17.3575 16.2363 18.119 16.9979 18.119 17.9373Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path d="M4.36072 6.08072L8.00416 11.6723L8.00873 11.6793C8.5657 12.5339 8.84475 12.9621 9.22693 13.2304C9.56324 13.4689 9.95607 13.616 10.3661 13.6606C10.8315 13.7106 11.3248 13.5732 12.3132 13.298L12.3132 13.298L16.0269 12.2639L16.0269 12.2639C17.0153 11.9887 17.5085 11.8514 17.8802 11.5683C18.2091 11.3179 18.4685 10.9893 18.634 10.611C18.8211 10.1852 18.8391 9.67609 18.875 8.66196L18.8756 8.64517L18.9219 7.28695L18.9477 6.48465L18.9849 5.38434C18.9982 4.99188 18.9189 4.6018 18.7534 4.2457C18.5879 3.88961 18.3408 3.57751 18.0322 3.33469C17.7236 3.09187 17.3621 2.92517 16.9771 2.84809C16.592 2.77101 16.1942 2.78572 15.8159 2.89102L4.36072 6.08072ZM4.36072 6.08072L4.34019 6.04802C4.26157 5.92309 4.17902 5.80068 4.09266 5.68097C3.76017 5.2416 3.31014 4.90527 2.79458 4.71084C2.27903 4.51642 1.71898 4.47183 1.17915 4.58223C1.07778 4.60216 0.968925 4.63247 0.750244 4.69336" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/></svg>\n</span>\n      <span class="quick-add__tick">\n    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 12.5 4 4 8-9"/></svg>\n  </span>\n    </span>\n        </button><input type="hidden" name="product-id" value="15446395322470"><input type="hidden" name="section-id" value="template--27949759201382__main"></form><span class="visually-hidden" role="status" data-quick-add-status></span><span class="quick-add__message" popover="manual" aria-hidden="true" data-quick-add-message hidden></span>\n  </quick-add>\n\n\n',
          }}
        />{" "}
      </div>{" "}
    </div>
  );
}
