// Generated from the Shopify theme's rendered HTML (reference/sections/collection--03-main.html). Make content dynamic, keep the markup.
export default function Collection03Main() {
  return (
    <div id="shopify-section-template--27949758578790__main" className="shopify-section">
      <div
        className="collection-section full-width section-width--widest color-scheme-2"
        style={
          {
            "--section-padding-top": "32px",
            "--section-padding-bottom": "96px",
            "--grid-columns": "4",
          } as React.CSSProperties
        }
        data-grid-view=""
        data-sizes-fewer="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, (min-width: 750px) 50vw, 100vw"
        data-sizes-more="(min-width: 1600px) 17vw, (min-width: 1200px) 25vw, (min-width: 750px) 34vw, 50vw"
      >
        {" "}
        <results-view className="collection-section__inner" data-section-id="template--27949758578790__main">
          <div className="collection-toolbar">
            {" "}
            <div className="collection-toolbar__start">
              {" "}
              <filter-drawer className="filter-drawer" data-section-id="template--27949758578790__main">
                {" "}
                <button
                  type="button"
                  className="filter-drawer__toggle"
                  aria-haspopup="dialog"
                  aria-controls="FilterDrawer-template--27949758578790__main"
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
                  Filters<span id="FilterCount-template--27949758578790__main" data-results-part=""></span>{" "}
                </button>{" "}
                <dialog
                  id="FilterDrawer-template--27949758578790__main"
                  className="filter-drawer__dialog"
                  aria-labelledby="FilterDrawerTitle-template--27949758578790__main"
                >
                  {" "}
                  <form
                    id="FilterForm-template--27949758578790__main"
                    className="filter-drawer__form"
                    action="/collections/all"
                    method="get"
                    data-results-form=""
                    data-results-part=""
                  >
                    {" "}
                    <div className="filter-drawer__head">
                      {" "}
                      <h2 className="filter-drawer__title" id="FilterDrawerTitle-template--27949758578790__main">
                        Filters
                      </h2>{" "}
                      <a className="filter-drawer__reset" href="/collections/all" data-results-link="">
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
                      {" "}
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-availability-1"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-availability-1"
                                  name="filter.v.availability"
                                  value="1"
                                />
                                <span className="filter-option__label">In stock</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-availability-1-count"
                                  data-filter-count=""
                                >
                                  23
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949758578790__main-filter-v-availability-0"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-availability-0"
                                  name="filter.v.availability"
                                  value="0"
                                />
                                <span className="filter-option__label">Out of stock</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-availability-0-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-p-product_type-accessories"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-p-product_type-accessories"
                                  name="filter.p.product_type"
                                  value="accessories"
                                />
                                <span className="filter-option__label">accessories</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-p-product_type-accessories-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-p-product_type-fragrance"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-p-product_type-fragrance"
                                  name="filter.p.product_type"
                                  value="Fragrance"
                                />
                                <span className="filter-option__label">Fragrance</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-p-product_type-fragrance-count"
                                  data-filter-count=""
                                >
                                  6
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949758578790__main-filter-p-product_type-gift-wrap"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-p-product_type-gift-wrap"
                                  name="filter.p.product_type"
                                  value="Gift wrap"
                                />
                                <span className="filter-option__label">Gift wrap</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-p-product_type-gift-wrap-count"
                                  data-filter-count=""
                                >
                                  2
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949758578790__main-filter-p-product_type-giftcard"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-p-product_type-giftcard"
                                  name="filter.p.product_type"
                                  value="giftcard"
                                />
                                <span className="filter-option__label">giftcard</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-p-product_type-giftcard-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-p-product_type-makeup"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-p-product_type-makeup"
                                  name="filter.p.product_type"
                                  value="Makeup"
                                />
                                <span className="filter-option__label">Makeup</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-p-product_type-makeup-count"
                                  data-filter-count=""
                                >
                                  6
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949758578790__main-filter-p-product_type-skincare"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-p-product_type-skincare"
                                  name="filter.p.product_type"
                                  value="Skincare"
                                />
                                <span className="filter-option__label">Skincare</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-p-product_type-skincare-count"
                                  data-filter-count=""
                                >
                                  8
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
                            htmlFor="Filter-template--27949758578790__main-filter-p-vendor-search"
                          >
                            {" "}
                            <span className="visually-hidden">Search brands</span>{" "}
                            <input
                              id="Filter-template--27949758578790__main-filter-p-vendor-search"
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
                                htmlFor="Filter-template--27949758578790__main-filter-p-vendor-oroskin"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-p-vendor-oroskin"
                                  name="filter.p.vendor"
                                  value="Oroskin"
                                />
                                <span className="filter-option__label">Oroskin</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-p-vendor-oroskin-count"
                                  data-filter-count=""
                                >
                                  22
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949758578790__main-filter-p-vendor-oroskin-dev"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-p-vendor-oroskin-dev"
                                  name="filter.p.vendor"
                                  value="oroskin-dev"
                                />
                                <span className="filter-option__label">oroskin-dev</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-p-vendor-oroskin-dev-count"
                                  data-filter-count=""
                                >
                                  2
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949758578790__main-filter-p-vendor-snowboard-vendor"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-p-vendor-snowboard-vendor"
                                  name="filter.p.vendor"
                                  value="Snowboard Vendor"
                                />
                                <span className="filter-option__label">Snowboard Vendor</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-p-vendor-snowboard-vendor-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-size-30-ml"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-size-30-ml"
                                  name="filter.v.option.size"
                                  value="30 ml"
                                />
                                <span className="filter-option__label">30 ml</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-size-30-ml-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-size-50-ml"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-size-50-ml"
                                  name="filter.v.option.size"
                                  value="50 ml"
                                />
                                <span className="filter-option__label">50 ml</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-size-50-ml-count"
                                  data-filter-count=""
                                >
                                  3
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-size-100-ml"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-size-100-ml"
                                  name="filter.v.option.size"
                                  value="100 ml"
                                />
                                <span className="filter-option__label">100 ml</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-size-100-ml-count"
                                  data-filter-count=""
                                >
                                  2
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-size-200-ml"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-size-200-ml"
                                  name="filter.v.option.size"
                                  value="200 ml"
                                />
                                <span className="filter-option__label">200 ml</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-size-200-ml-count"
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
                          Badges
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
                          <legend className="visually-hidden">Badges</legend>
                          <ul className="filter-group__options filter-group__options--swatch" role="list">
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--swatch"
                                htmlFor="Filter-template--27949758578790__main-filter-p-m-custom-badges-gid-shopify-metaobject-623778070630"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-p-m-custom-badges-gid-shopify-metaobject-623778070630"
                                  name="filter.p.m.custom.badges"
                                  value="gid://shopify/Metaobject/623778070630"
                                />
                                <span
                                  className="filter-option__swatch"
                                  style={{ "--swatch": "#7D0000" } as React.CSSProperties}
                                  aria-hidden="true"
                                ></span>
                                <span className="filter-option__label">Bestseller</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-p-m-custom-badges-gid-shopify-metaobject-623778070630-count"
                                  data-filter-count=""
                                >
                                  1
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--swatch"
                                htmlFor="Filter-template--27949758578790__main-filter-p-m-custom-badges-gid-shopify-metaobject-623781249126"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-p-m-custom-badges-gid-shopify-metaobject-623781249126"
                                  name="filter.p.m.custom.badges"
                                  value="gid://shopify/Metaobject/623781249126"
                                />
                                <span
                                  className="filter-option__swatch"
                                  style={{ "--swatch": "#1F1F1F" } as React.CSSProperties}
                                  aria-hidden="true"
                                ></span>
                                <span className="filter-option__label">Hot</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-p-m-custom-badges-gid-shopify-metaobject-623781249126-count"
                                  data-filter-count=""
                                >
                                  1
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--swatch"
                                htmlFor="Filter-template--27949758578790__main-filter-p-m-custom-badges-gid-shopify-metaobject-623783542886"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-p-m-custom-badges-gid-shopify-metaobject-623783542886"
                                  name="filter.p.m.custom.badges"
                                  value="gid://shopify/Metaobject/623783542886"
                                />
                                <span
                                  className="filter-option__swatch"
                                  style={{ "--swatch": "#6B0505" } as React.CSSProperties}
                                  aria-hidden="true"
                                ></span>
                                <span className="filter-option__label">Limited edition</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-p-m-custom-badges-gid-shopify-metaobject-623783542886-count"
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
                          Scent
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
                          <legend className="visually-hidden">Scent</legend>
                          <ul className="filter-group__options filter-group__options--list" role="list">
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-scent-amber"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-scent-amber"
                                  name="filter.v.option.scent"
                                  value="Amber"
                                />
                                <span className="filter-option__label">Amber</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-scent-amber-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-scent-neroli"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-scent-neroli"
                                  name="filter.v.option.scent"
                                  value="Neroli"
                                />
                                <span className="filter-option__label">Neroli</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-scent-neroli-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-scent-oud"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-scent-oud"
                                  name="filter.v.option.scent"
                                  value="Oud"
                                />
                                <span className="filter-option__label">Oud</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-scent-oud-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-scent-rose"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-scent-rose"
                                  name="filter.v.option.scent"
                                  value="Rose"
                                />
                                <span className="filter-option__label">Rose</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-scent-rose-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-berry"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-berry"
                                  name="filter.v.option.shade"
                                  value="Berry"
                                />
                                <span className="filter-option__label">Berry</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-berry-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-caramel"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-caramel"
                                  name="filter.v.option.shade"
                                  value="Caramel"
                                />
                                <span className="filter-option__label">Caramel</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-caramel-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-classic-red"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-classic-red"
                                  name="filter.v.option.shade"
                                  value="Classic Red"
                                />
                                <span className="filter-option__label">Classic Red</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-classic-red-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-cocoa"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-cocoa"
                                  name="filter.v.option.shade"
                                  value="Cocoa"
                                />
                                <span className="filter-option__label">Cocoa</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-cocoa-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-coral"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-coral"
                                  name="filter.v.option.shade"
                                  value="Coral"
                                />
                                <span className="filter-option__label">Coral</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-coral-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-deep"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-deep"
                                  name="filter.v.option.shade"
                                  value="Deep"
                                />
                                <span className="filter-option__label">Deep</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-deep-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-honey"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-honey"
                                  name="filter.v.option.shade"
                                  value="Honey"
                                />
                                <span className="filter-option__label">Honey</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-honey-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-light"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-light"
                                  name="filter.v.option.shade"
                                  value="Light"
                                />
                                <span className="filter-option__label">Light</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-light-count"
                                  data-filter-count=""
                                >
                                  2
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-mauve"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-mauve"
                                  name="filter.v.option.shade"
                                  value="Mauve"
                                />
                                <span className="filter-option__label">Mauve</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-mauve-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-medium"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-medium"
                                  name="filter.v.option.shade"
                                  value="Medium"
                                />
                                <span className="filter-option__label">Medium</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-medium-count"
                                  data-filter-count=""
                                >
                                  2
                                </span>{" "}
                              </label>{" "}
                            </li>
                            <li className="filter-group__item">
                              {" "}
                              <label
                                className="filter-option filter-option--list"
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-nude-silk"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-nude-silk"
                                  name="filter.v.option.shade"
                                  value="Nude Silk"
                                />
                                <span className="filter-option__label">Nude Silk</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-nude-silk-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-porcelain"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-porcelain"
                                  name="filter.v.option.shade"
                                  value="Porcelain"
                                />
                                <span className="filter-option__label">Porcelain</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-porcelain-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-rosewood"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-rosewood"
                                  name="filter.v.option.shade"
                                  value="Rosewood"
                                />
                                <span className="filter-option__label">Rosewood</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-rosewood-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-sand"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-sand"
                                  name="filter.v.option.shade"
                                  value="Sand"
                                />
                                <span className="filter-option__label">Sand</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-sand-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-tan"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-tan"
                                  name="filter.v.option.shade"
                                  value="Tan"
                                />
                                <span className="filter-option__label">Tan</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-tan-count"
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
                                htmlFor="Filter-template--27949758578790__main-filter-v-option-shade-translucent"
                              >
                                {" "}
                                <input
                                  type="checkbox"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-translucent"
                                  name="filter.v.option.shade"
                                  value="Translucent"
                                />
                                <span className="filter-option__label">Translucent</span>
                                <span
                                  className="filter-option__count"
                                  id="Filter-template--27949758578790__main-filter-v-option-shade-translucent-count"
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
                        <span id="FilterResults-template--27949758578790__main" aria-live="polite">
                          View results (25)
                        </span>{" "}
                      </button>{" "}
                    </div>{" "}
                  </form>{" "}
                </dialog>{" "}
              </filter-drawer>{" "}
              <nav
                className="collection-pills collection-pills--image-scale"
                style={{ "--pill-image-size": "200px" } as React.CSSProperties}
                aria-label="Categories"
              >
                {" "}
                <ul className="collection-pills__list" role="list">
                  <li>
                    {" "}
                    <a className="collection-pill collection-pill--active" href="/collections/all" aria-current="page">
                      <span className="collection-pill__media collection-pill__media--cutout" aria-hidden="true">
                        <img
                          src="/cdn/shop/files/Group_1000003356.png?v=1793257266&width=300"
                          alt=""
                          srcSet="/cdn/shop/files/Group_1000003356.png?v=1793257266&width=160 160w, /cdn/shop/files/Group_1000003356.png?v=1793257266&width=300 300w"
                          width="300"
                          height="310"
                          loading="lazy"
                          sizes="160px"
                        />
                      </span>
                      All
                      <span className="collection-pill__count" aria-hidden="true">
                        25
                      </span>{" "}
                      <span className="visually-hidden">25 products</span>
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a className="collection-pill" href="/collections/fragrance">
                      <span className="collection-pill__media collection-pill__media--cutout" aria-hidden="true">
                        <img
                          src="/cdn/shop/files/image_516.png?v=1793257266&width=300"
                          alt=""
                          srcSet="/cdn/shop/files/image_516.png?v=1793257266&width=160 160w, /cdn/shop/files/image_516.png?v=1793257266&width=300 300w"
                          width="300"
                          height="324"
                          loading="lazy"
                          sizes="160px"
                        />
                      </span>
                      Fragrance
                      <span className="collection-pill__count" aria-hidden="true">
                        6
                      </span>{" "}
                      <span className="visually-hidden">6 products</span>
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a className="collection-pill" href="/collections/makeup">
                      <span className="collection-pill__media collection-pill__media--cutout" aria-hidden="true">
                        <img
                          src="/cdn/shop/files/image_517.png?v=1793257350&width=300"
                          alt=""
                          srcSet="/cdn/shop/files/image_517.png?v=1793257350&width=160 160w, /cdn/shop/files/image_517.png?v=1793257350&width=300 300w"
                          width="300"
                          height="300"
                          loading="lazy"
                          sizes="160px"
                        />
                      </span>
                      Makeup
                      <span className="collection-pill__count" aria-hidden="true">
                        6
                      </span>{" "}
                      <span className="visually-hidden">6 products</span>
                    </a>{" "}
                  </li>
                  <li>
                    {" "}
                    <a className="collection-pill" href="/collections/skincare">
                      <span className="collection-pill__media collection-pill__media--cutout" aria-hidden="true">
                        <img
                          src="/cdn/shop/files/image_518.png?v=1793257265&width=300"
                          alt=""
                          srcSet="/cdn/shop/files/image_518.png?v=1793257265&width=160 160w, /cdn/shop/files/image_518.png?v=1793257265&width=300 300w"
                          width="300"
                          height="300"
                          loading="lazy"
                          sizes="160px"
                        />
                      </span>
                      Skincare
                      <span className="collection-pill__count" aria-hidden="true">
                        8
                      </span>{" "}
                      <span className="visually-hidden">8 products</span>
                    </a>{" "}
                  </li>
                </ul>{" "}
              </nav>{" "}
            </div>
            <div className="collection-toolbar__end">
              <p
                className="collection-toolbar__count"
                id="CollectionCount-template--27949758578790__main"
                aria-live="polite"
                data-results-text=""
              >
                25 products
              </p>
              <grid-view-switch className="grid-view">
                {" "}
                <fieldset className="grid-view__group">
                  {" "}
                  <legend className="visually-hidden">Products per row</legend>{" "}
                  <input
                    className="visually-hidden"
                    type="radio"
                    id="GridViewFewer-template--27949758578790__main"
                    name="GridView-template--27949758578790__main"
                    value="fewer"
                  />{" "}
                  <label
                    className="grid-view__option"
                    htmlFor="GridViewFewer-template--27949758578790__main"
                    title="Fewer, larger products"
                  >
                    {" "}
                    <svg
                      className="grid-view__icon grid-view__icon--phone"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 4 10"
                    >
                      <rect x="0" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="0" y="6" width="4" height="4" rx="0.6"></rect>
                    </svg>{" "}
                    <svg
                      className="grid-view__icon grid-view__icon--tablet"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 10 10"
                    >
                      <rect x="0" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="0" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="6" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="6" y="6" width="4" height="4" rx="0.6"></rect>
                    </svg>{" "}
                    <svg
                      className="grid-view__icon grid-view__icon--laptop"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 16 10"
                    >
                      <rect x="0" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="0" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="6" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="6" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="12" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="12" y="6" width="4" height="4" rx="0.6"></rect>
                    </svg>{" "}
                    <svg
                      className="grid-view__icon grid-view__icon--desktop"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 22 10"
                    >
                      <rect x="0" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="0" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="6" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="6" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="12" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="12" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="18" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="18" y="6" width="4" height="4" rx="0.6"></rect>
                    </svg>{" "}
                    <span className="visually-hidden">Fewer, larger products</span>{" "}
                  </label>{" "}
                  <input
                    className="visually-hidden"
                    type="radio"
                    id="GridViewMore-template--27949758578790__main"
                    name="GridView-template--27949758578790__main"
                    value="more"
                  />{" "}
                  <label
                    className="grid-view__option"
                    htmlFor="GridViewMore-template--27949758578790__main"
                    title="More, smaller products"
                  >
                    {" "}
                    <svg
                      className="grid-view__icon grid-view__icon--phone"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 10 10"
                    >
                      <rect x="0" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="0" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="6" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="6" y="6" width="4" height="4" rx="0.6"></rect>
                    </svg>{" "}
                    <svg
                      className="grid-view__icon grid-view__icon--tablet"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 16 10"
                    >
                      <rect x="0" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="0" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="6" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="6" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="12" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="12" y="6" width="4" height="4" rx="0.6"></rect>
                    </svg>{" "}
                    <svg
                      className="grid-view__icon grid-view__icon--laptop"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 22 10"
                    >
                      <rect x="0" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="0" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="6" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="6" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="12" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="12" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="18" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="18" y="6" width="4" height="4" rx="0.6"></rect>
                    </svg>{" "}
                    <svg
                      className="grid-view__icon grid-view__icon--desktop"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 34 10"
                    >
                      <rect x="0" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="0" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="6" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="6" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="12" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="12" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="18" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="18" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="24" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="24" y="6" width="4" height="4" rx="0.6"></rect>
                      <rect x="30" y="0" width="4" height="4" rx="0.6"></rect>{" "}
                      <rect x="30" y="6" width="4" height="4" rx="0.6"></rect>
                    </svg>{" "}
                    <span className="visually-hidden">More, smaller products</span>{" "}
                  </label>{" "}
                </fieldset>{" "}
              </grid-view-switch>
              <div className="collection-sort">
                {" "}
                <form action="/collections/all" method="get" data-results-form="" data-results-autoload="">
                  {" "}
                  <label className="collection-sort__label" htmlFor="SortBy-template--27949758578790__main">
                    Sort
                  </label>{" "}
                  <span className="collection-sort__field">
                    {" "}
                    <select
                      className="collection-sort__select"
                      id="SortBy-template--27949758578790__main"
                      name="sort_by"
                      data-default="manual"
                    >
                      <option value="manual">Featured</option>
                      <option value="most-relevant">Most relevant</option>
                      <option value="best-selling">Best selling</option>
                      <option value="title-ascending">Alphabetically, A-Z</option>
                      <option value="title-descending">Alphabetically, Z-A</option>
                      <option value="price-ascending">Price, low to high</option>
                      <option value="price-descending">Price, high to low</option>
                      <option value="created-ascending">Date, old to new</option>
                      <option value="created-descending">Date, new to old</option>
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
            </div>
          </div>
          <div
            className="collection-results"
            id="CollectionResults-template--27949758578790__main"
            tabIndex={-1}
            data-results-part=""
            data-results-main=""
          >
            <div className="collection-grid-wrap">
              {" "}
              <ul
                className="collection-grid collection-grid--grid collection-grid--portrait collection-grid--full"
                role="list"
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
                            href="/products/discovery-set"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235080294502"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/discovery-set-1.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/discovery-set-1.png?v=1793074059&width=310 310w, /cdn/shop/files/discovery-set-1.png?v=1793074059&width=375 375w, /cdn/shop/files/discovery-set-1.png?v=1793074059&width=550 550w, /cdn/shop/files/discovery-set-1.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="eager"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, (min-width: 750px) 50vw, 100vw"
                                fetchPriority="high"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/discovery-set"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081408614"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/discovery-set-2.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/discovery-set-2.png?v=1793074059&width=310 310w, /cdn/shop/files/discovery-set-2.png?v=1793074059&width=375 375w, /cdn/shop/files/discovery-set-2.png?v=1793074059&width=550 550w, /cdn/shop/files/discovery-set-2.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, (min-width: 750px) 50vw, 100vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/discovery-set"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081375846"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/discovery-set-3.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/discovery-set-3.png?v=1793074059&width=310 310w, /cdn/shop/files/discovery-set-3.png?v=1793074059&width=375 375w, /cdn/shop/files/discovery-set-3.png?v=1793074059&width=550 550w, /cdn/shop/files/discovery-set-3.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, (min-width: 750px) 50vw, 100vw"
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
                          className="product-card__badge product-card__badge--own-colors"
                          style={{ "--badge-bg": "#6B0505", "--badge-fg": "#FFFAF0" } as React.CSSProperties}
                        >
                          Limited edition
                        </span>{" "}
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
                        <p className="product-card__category">Fragrance</p>
                      </div>{" "}
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/discovery-set">
                          Discovery Set
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 4,300.00</span>
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
                            data-variant-id="67834035798118"
                            data-label-added="Discovery Set added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446395650150-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834035798118" />{" "}
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
                                  : Discovery Set
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446395650150" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834035798118:1"
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
                            <span className="visually-hidden">: Discovery Set</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/discovery-set"
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
                          Notify me<span className="visually-hidden">: Discovery Set</span>{" "}
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
                            href="/products/magnolia-bloom-body-oil"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081834598"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/magnolia-bloom-body-oil-1.png?v=1793074060&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/magnolia-bloom-body-oil-1.png?v=1793074060&width=310 310w, /cdn/shop/files/magnolia-bloom-body-oil-1.png?v=1793074060&width=375 375w, /cdn/shop/files/magnolia-bloom-body-oil-1.png?v=1793074060&width=550 550w, /cdn/shop/files/magnolia-bloom-body-oil-1.png?v=1793074060&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="eager"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, (min-width: 750px) 50vw, 100vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/magnolia-bloom-body-oil"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081080934"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/magnolia-bloom-body-oil-2.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/magnolia-bloom-body-oil-2.png?v=1793074059&width=310 310w, /cdn/shop/files/magnolia-bloom-body-oil-2.png?v=1793074059&width=375 375w, /cdn/shop/files/magnolia-bloom-body-oil-2.png?v=1793074059&width=550 550w, /cdn/shop/files/magnolia-bloom-body-oil-2.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, (min-width: 750px) 50vw, 100vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/magnolia-bloom-body-oil"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081506918"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/magnolia-bloom-body-oil-3.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/magnolia-bloom-body-oil-3.png?v=1793074059&width=310 310w, /cdn/shop/files/magnolia-bloom-body-oil-3.png?v=1793074059&width=375 375w, /cdn/shop/files/magnolia-bloom-body-oil-3.png?v=1793074059&width=550 550w, /cdn/shop/files/magnolia-bloom-body-oil-3.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, (min-width: 750px) 50vw, 100vw"
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
                        <p className="product-card__category">Fragrance</p>
                      </div>{" "}
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/magnolia-bloom-body-oil">
                          Magnolia Bloom Body Oil
                        </a>{" "}
                      </h2>{" "}
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
                            data-variant-id="67834035732582"
                            data-label-added="Magnolia Bloom Body Oil added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446395584614-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834035732582" />{" "}
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
                                  : Magnolia Bloom Body Oil
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446395584614" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834035732582:1"
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
                            <span className="visually-hidden">: Magnolia Bloom Body Oil</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/magnolia-bloom-body-oil"
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
                          Notify me<span className="visually-hidden">: Magnolia Bloom Body Oil</span>{" "}
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
                            href="/products/oud-noir-eau-de-parfum"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079082086"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/oud-noir-eau-de-parfum-1.png?v=1793074057&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/oud-noir-eau-de-parfum-1.png?v=1793074057&width=310 310w, /cdn/shop/files/oud-noir-eau-de-parfum-1.png?v=1793074057&width=375 375w, /cdn/shop/files/oud-noir-eau-de-parfum-1.png?v=1793074057&width=550 550w, /cdn/shop/files/oud-noir-eau-de-parfum-1.png?v=1793074057&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/oud-noir-eau-de-parfum"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079114854"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/oud-noir-eau-de-parfum-2.png?v=1793074057&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/oud-noir-eau-de-parfum-2.png?v=1793074057&width=310 310w, /cdn/shop/files/oud-noir-eau-de-parfum-2.png?v=1793074057&width=375 375w, /cdn/shop/files/oud-noir-eau-de-parfum-2.png?v=1793074057&width=550 550w, /cdn/shop/files/oud-noir-eau-de-parfum-2.png?v=1793074057&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/oud-noir-eau-de-parfum"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079737446"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/oud-noir-eau-de-parfum-3.png?v=1793074058&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/oud-noir-eau-de-parfum-3.png?v=1793074058&width=310 310w, /cdn/shop/files/oud-noir-eau-de-parfum-3.png?v=1793074058&width=375 375w, /cdn/shop/files/oud-noir-eau-de-parfum-3.png?v=1793074058&width=550 550w, /cdn/shop/files/oud-noir-eau-de-parfum-3.png?v=1793074058&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                        <p className="product-card__category">Fragrance</p>
                      </div>{" "}
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/oud-noir-eau-de-parfum">
                          Oud Noir Eau de Parfum
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 12,700.00</span>
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
                            data-variant-id="67834035601510"
                            data-label-added="Oud Noir Eau de Parfum added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446395453542-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834035601510" />{" "}
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
                                  : Oud Noir Eau de Parfum
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446395453542" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834035601510:1"
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
                            <span className="visually-hidden">: Oud Noir Eau de Parfum</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/oud-noir-eau-de-parfum"
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
                          Notify me<span className="visually-hidden">: Oud Noir Eau de Parfum</span>{" "}
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
                            href="/products/velvet-amber-parfum"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079868518"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/velvet-amber-parfum-1.png?v=1793074058&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/velvet-amber-parfum-1.png?v=1793074058&width=310 310w, /cdn/shop/files/velvet-amber-parfum-1.png?v=1793074058&width=375 375w, /cdn/shop/files/velvet-amber-parfum-1.png?v=1793074058&width=550 550w, /cdn/shop/files/velvet-amber-parfum-1.png?v=1793074058&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/velvet-amber-parfum"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081670758"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/velvet-amber-parfum-2.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/velvet-amber-parfum-2.png?v=1793074059&width=310 310w, /cdn/shop/files/velvet-amber-parfum-2.png?v=1793074059&width=375 375w, /cdn/shop/files/velvet-amber-parfum-2.png?v=1793074059&width=550 550w, /cdn/shop/files/velvet-amber-parfum-2.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/velvet-amber-parfum"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081441382"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/velvet-amber-parfum-3.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/velvet-amber-parfum-3.png?v=1793074059&width=310 310w, /cdn/shop/files/velvet-amber-parfum-3.png?v=1793074059&width=375 375w, /cdn/shop/files/velvet-amber-parfum-3.png?v=1793074059&width=550 550w, /cdn/shop/files/velvet-amber-parfum-3.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                          className="product-card__badge product-card__badge--own-colors"
                          style={{ "--badge-bg": "#1F1F1F", "--badge-fg": "#FFFAF0" } as React.CSSProperties}
                        >
                          Hot
                        </span>{" "}
                        <span
                          className="product-card__badge product-card__badge--discount color-scheme-3"
                          data-card-discount=""
                          data-template="-[percent]%"
                        >
                          -21%
                        </span>
                      </div>{" "}
                    </div>
                    <card-options className="product-card__body" data-cart-url="/cart">
                      {" "}
                      <div className="product-card__meta">
                        <p className="product-card__category">Fragrance</p>
                      </div>{" "}
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/velvet-amber-parfum">
                          Velvet Amber Parfum
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price price--on-sale">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Sale price </span>
                              <span data-price-amount="">Rs. 10,400.00</span>
                            </span>
                            <span className="price__compare">
                              {" "}
                              <span className="visually-hidden">Regular price</span> <s>Rs. 13,200.00</s>{" "}
                            </span>
                          </div>{" "}
                        </div>{" "}
                        <span className="product-card__save" data-card-save="" data-template="Save [percent]%">
                          Save 21%
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
                            data-variant-id="67834035503206"
                            data-label-added="Velvet Amber Parfum added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446395388006-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834035503206" />{" "}
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
                                  : Velvet Amber Parfum
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446395388006" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834035503206:1"
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
                            <span className="visually-hidden">: Velvet Amber Parfum</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/velvet-amber-parfum"
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
                          Notify me<span className="visually-hidden">: Velvet Amber Parfum</span>{" "}
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
                            href="/products/signature-body-mist"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081113702"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/signature-body-mist-1.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/signature-body-mist-1.png?v=1793074059&width=310 310w, /cdn/shop/files/signature-body-mist-1.png?v=1793074059&width=375 375w, /cdn/shop/files/signature-body-mist-1.png?v=1793074059&width=550 550w, /cdn/shop/files/signature-body-mist-1.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/signature-body-mist"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079442534"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/signature-body-mist-2.png?v=1793074058&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/signature-body-mist-2.png?v=1793074058&width=310 310w, /cdn/shop/files/signature-body-mist-2.png?v=1793074058&width=375 375w, /cdn/shop/files/signature-body-mist-2.png?v=1793074058&width=550 550w, /cdn/shop/files/signature-body-mist-2.png?v=1793074058&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/signature-body-mist"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079573606"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/signature-body-mist-3.png?v=1793074058&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/signature-body-mist-3.png?v=1793074058&width=310 310w, /cdn/shop/files/signature-body-mist-3.png?v=1793074058&width=375 375w, /cdn/shop/files/signature-body-mist-3.png?v=1793074058&width=550 550w, /cdn/shop/files/signature-body-mist-3.png?v=1793074058&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/signature-body-mist"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235080589414"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/signature-body-mist-rose.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/signature-body-mist-rose.png?v=1793074059&width=310 310w, /cdn/shop/files/signature-body-mist-rose.png?v=1793074059&width=375 375w, /cdn/shop/files/signature-body-mist-rose.png?v=1793074059&width=550 550w, /cdn/shop/files/signature-body-mist-rose.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/signature-body-mist"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081179238"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/signature-body-mist-amber.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/signature-body-mist-amber.png?v=1793074059&width=310 310w, /cdn/shop/files/signature-body-mist-amber.png?v=1793074059&width=375 375w, /cdn/shop/files/signature-body-mist-amber.png?v=1793074059&width=550 550w, /cdn/shop/files/signature-body-mist-amber.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                        <p className="product-card__category">Fragrance</p>
                      </div>{" "}
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/signature-body-mist">
                          Signature Body Mist
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 2,700.00</span>
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
                          id="Card-15446395322470-template--27949758578790__main-1"
                          name="Card-15446395322470-template--27949758578790__main"
                          value="67834035077222"
                          data-available="true"
                          data-save="0"
                          data-add-name="Signature Body Mist - 50 ml / Rose"
                          data-add-label="Add Signature Body Mist - 50 ml / Rose to cart"
                          data-added-label="Signature Body Mist - 50 ml / Rose added to your cart"
                          data-media-id="46235080589414"
                          defaultChecked
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446395322470-template--27949758578790__main-1"
                        >
                          50 ml
                        </label>
                        <template
                          data-price-for="67834035077222"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="price">\n  <span class="price__current">\n    <span class="visually-hidden">Regular price\n</span><span data-price-amount>Rs. 2,700.00</span></span></div>\n\n\n',
                          }}
                        />
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446395322470-template--27949758578790__main-2"
                          name="Card-15446395322470-template--27949758578790__main"
                          value="67834035208294"
                          data-available="true"
                          data-save="0"
                          data-add-name="Signature Body Mist - 100 ml / Rose"
                          data-add-label="Add Signature Body Mist - 100 ml / Rose to cart"
                          data-added-label="Signature Body Mist - 100 ml / Rose added to your cart"
                          data-media-id="46235080589414"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446395322470-template--27949758578790__main-2"
                        >
                          100 ml
                        </label>
                        <template
                          data-price-for="67834035208294"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="price">\n  <span class="price__current">\n    <span class="visually-hidden">Regular price\n</span><span data-price-amount>Rs. 4,000.00</span></span></div>\n\n\n',
                          }}
                        />
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446395322470-template--27949758578790__main-3"
                          name="Card-15446395322470-template--27949758578790__main"
                          value="67834035339366"
                          data-available="true"
                          data-save="0"
                          data-add-name="Signature Body Mist - 200 ml / Rose"
                          data-add-label="Add Signature Body Mist - 200 ml / Rose to cart"
                          data-added-label="Signature Body Mist - 200 ml / Rose added to your cart"
                          data-media-id="46235080589414"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446395322470-template--27949758578790__main-3"
                        >
                          200 ml
                        </label>
                        <template
                          data-price-for="67834035339366"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="price">\n  <span class="price__current">\n    <span class="visually-hidden">Regular price\n</span><span data-price-amount>Rs. 5,500.00</span></span></div>\n\n\n',
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
                            data-variant-id="67834035077222"
                            data-label-added="Signature Body Mist - 50 ml / Rose added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446395322470-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834035077222" />{" "}
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
                                  : Signature Body Mist - 50 ml / Rose
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446395322470" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834035077222:1"
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
                            <span className="visually-hidden">: Signature Body Mist</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/signature-body-mist"
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
                          Notify me<span className="visually-hidden">: Signature Body Mist</span>{" "}
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
                            href="/products/rose-eau-de-parfum"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079540838"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/rose-eau-de-parfum-1.png?v=1793074058&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/rose-eau-de-parfum-1.png?v=1793074058&width=310 310w, /cdn/shop/files/rose-eau-de-parfum-1.png?v=1793074058&width=375 375w, /cdn/shop/files/rose-eau-de-parfum-1.png?v=1793074058&width=550 550w, /cdn/shop/files/rose-eau-de-parfum-1.png?v=1793074058&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/rose-eau-de-parfum"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235080392806"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/rose-eau-de-parfum-2.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/rose-eau-de-parfum-2.png?v=1793074059&width=310 310w, /cdn/shop/files/rose-eau-de-parfum-2.png?v=1793074059&width=375 375w, /cdn/shop/files/rose-eau-de-parfum-2.png?v=1793074059&width=550 550w, /cdn/shop/files/rose-eau-de-parfum-2.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/rose-eau-de-parfum"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235080982630"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/rose-eau-de-parfum-3.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/rose-eau-de-parfum-3.png?v=1793074059&width=310 310w, /cdn/shop/files/rose-eau-de-parfum-3.png?v=1793074059&width=375 375w, /cdn/shop/files/rose-eau-de-parfum-3.png?v=1793074059&width=550 550w, /cdn/shop/files/rose-eau-de-parfum-3.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                        <p className="product-card__category">Fragrance</p>
                      </div>{" "}
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/rose-eau-de-parfum">
                          Rose Eau de Parfum
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 9,000.00</span>
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
                          id="Card-15446395224166-template--27949758578790__main-1"
                          name="Card-15446395224166-template--27949758578790__main"
                          value="67834034946150"
                          data-available="true"
                          data-save="0"
                          data-add-name="Rose Eau de Parfum - 50 ml"
                          data-add-label="Add Rose Eau de Parfum - 50 ml to cart"
                          data-added-label="Rose Eau de Parfum - 50 ml added to your cart"
                          defaultChecked
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446395224166-template--27949758578790__main-1"
                        >
                          50 ml
                        </label>
                        <template
                          data-price-for="67834034946150"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="price">\n  <span class="price__current">\n    <span class="visually-hidden">Regular price\n</span><span data-price-amount>Rs. 9,000.00</span></span></div>\n\n\n',
                          }}
                        />
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446395224166-template--27949758578790__main-2"
                          name="Card-15446395224166-template--27949758578790__main"
                          value="67834034978918"
                          data-available="true"
                          data-save="0"
                          data-add-name="Rose Eau de Parfum - 100 ml"
                          data-add-label="Add Rose Eau de Parfum - 100 ml to cart"
                          data-added-label="Rose Eau de Parfum - 100 ml added to your cart"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446395224166-template--27949758578790__main-2"
                        >
                          100 ml
                        </label>
                        <template
                          data-price-for="67834034978918"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="price">\n  <span class="price__current">\n    <span class="visually-hidden">Regular price\n</span><span data-price-amount>Rs. 11,800.00</span></span></div>\n\n\n',
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
                            data-variant-id="67834034946150"
                            data-label-added="Rose Eau de Parfum - 50 ml added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446395224166-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834034946150" />{" "}
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
                                  : Rose Eau de Parfum - 50 ml
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446395224166" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834034946150:1"
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
                            <span className="visually-hidden">: Rose Eau de Parfum</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/rose-eau-de-parfum"
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
                          Notify me<span className="visually-hidden">: Rose Eau de Parfum</span>{" "}
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
                            href="/products/glow-face-mist"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235080032358"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/glow-face-mist-1.png?v=1793074058&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/glow-face-mist-1.png?v=1793074058&width=310 310w, /cdn/shop/files/glow-face-mist-1.png?v=1793074058&width=375 375w, /cdn/shop/files/glow-face-mist-1.png?v=1793074058&width=550 550w, /cdn/shop/files/glow-face-mist-1.png?v=1793074058&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/glow-face-mist"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079180390"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/glow-face-mist-2.png?v=1793074057&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/glow-face-mist-2.png?v=1793074057&width=310 310w, /cdn/shop/files/glow-face-mist-2.png?v=1793074057&width=375 375w, /cdn/shop/files/glow-face-mist-2.png?v=1793074057&width=550 550w, /cdn/shop/files/glow-face-mist-2.png?v=1793074057&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/glow-face-mist"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235078983782"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/glow-face-mist-3.png?v=1793074057&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/glow-face-mist-3.png?v=1793074057&width=310 310w, /cdn/shop/files/glow-face-mist-3.png?v=1793074057&width=375 375w, /cdn/shop/files/glow-face-mist-3.png?v=1793074057&width=550 550w, /cdn/shop/files/glow-face-mist-3.png?v=1793074057&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/glow-face-mist">
                          Glow Face Mist
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 2,700.00</span>
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
                            data-variant-id="67834034880614"
                            data-label-added="Glow Face Mist added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446395158630-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834034880614" />{" "}
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
                                  : Glow Face Mist
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446395158630" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834034880614:1"
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
                            <span className="visually-hidden">: Glow Face Mist</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/glow-face-mist"
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
                          Notify me<span className="visually-hidden">: Glow Face Mist</span>{" "}
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
                    <div className="product-card__media product-card__media--portrait">
                      {" "}
                      <div className="image image--cover">
                        <svg
                          className="image__placeholder"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 525.5 525.5"
                        >
                          <path d="M324.5 212.7H203c-1.6 0-2.8 1.3-2.8 2.8V308c0 1.6 1.3 2.8 2.8 2.8h121.6c1.6 0 2.8-1.3 2.8-2.8v-92.5c0-1.6-1.3-2.8-2.9-2.8zm1.1 95.3c0 .6-.5 1.1-1.1 1.1H203c-.6 0-1.1-.5-1.1-1.1v-92.5c0-.6.5-1.1 1.1-1.1h121.6c.6 0 1.1.5 1.1 1.1V308z"></path>
                          <path d="M210.4 299.5H240v.1s.1 0 .2-.1h75.2v-76.2h-105v76.2zm1.8-7.2l20-20c1.6-1.6 3.8-2.5 6.1-2.5s4.5.9 6.1 2.5l1.5 1.5 16.8 16.8c-12.9 3.3-20.7 6.3-22.8 7.2h-27.7v-5.5zm101.5-10.1c-20.1 1.7-36.7 4.8-49.1 7.9l-16.9-16.9 26.3-26.3c1.6-1.6 3.8-2.5 6.1-2.5s4.5.9 6.1 2.5l27.5 27.5v7.8zm-68.9 15.5c9.7-3.5 33.9-10.9 68.9-13.8v13.8h-68.9zm68.9-72.7v46.8l-26.2-26.2c-1.9-1.9-4.5-3-7.3-3s-5.4 1.1-7.3 3l-26.3 26.3-.9-.9c-1.9-1.9-4.5-3-7.3-3s-5.4 1.1-7.3 3l-18.8 18.8V225h101.4z"></path>
                          <path d="M232.8 254c4.6 0 8.3-3.7 8.3-8.3s-3.7-8.3-8.3-8.3-8.3 3.7-8.3 8.3 3.7 8.3 8.3 8.3zm0-14.9c3.6 0 6.6 2.9 6.6 6.6s-2.9 6.6-6.6 6.6-6.6-2.9-6.6-6.6 3-6.6 6.6-6.6z"></path>
                        </svg>{" "}
                      </div>{" "}
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
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/hyaluronic-eye-gel">
                          Hyaluronic Eye Gel
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 3,400.00</span>
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
                            data-variant-id="67834034815078"
                            data-label-added="Hyaluronic Eye Gel added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446395093094-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834034815078" />{" "}
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
                                  : Hyaluronic Eye Gel
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446395093094" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834034815078:1"
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
                            <span className="visually-hidden">: Hyaluronic Eye Gel</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/hyaluronic-eye-gel"
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
                          Notify me<span className="visually-hidden">: Hyaluronic Eye Gel</span>{" "}
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
                            href="/products/retinol-renewal-oil"
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
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/retinol-renewal-oil"
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
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/retinol-renewal-oil"
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
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/retinol-renewal-oil">
                          Retinol Renewal Oil
                        </a>{" "}
                      </h2>{" "}
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
                              id="QuickAdd-template--27949758578790__main-15446395027558-pill-product-card__quick-add-product-card__quick-add-icon-full"
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
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                          href="/products/retinol-renewal-oil"
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
                    className="product-card product-card--full product-card--sold-out"
                    style={{ "--card-media-h": "1.25" } as React.CSSProperties}
                  >
                    {" "}
                    <div className="product-card__media product-card__media--portrait product-card__media--slider">
                      <card-gallery className="product-card__gallery">
                        {" "}
                        <div className="product-card__slides" data-card-slides="">
                          <a
                            className="product-card__slide"
                            href="/products/gentle-cleansing-balm"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079016550"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/gentle-cleansing-balm-1.png?v=1793074057&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/gentle-cleansing-balm-1.png?v=1793074057&width=310 310w, /cdn/shop/files/gentle-cleansing-balm-1.png?v=1793074057&width=375 375w, /cdn/shop/files/gentle-cleansing-balm-1.png?v=1793074057&width=550 550w, /cdn/shop/files/gentle-cleansing-balm-1.png?v=1793074057&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/gentle-cleansing-balm"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235080523878"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/gentle-cleansing-balm-2.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/gentle-cleansing-balm-2.png?v=1793074059&width=310 310w, /cdn/shop/files/gentle-cleansing-balm-2.png?v=1793074059&width=375 375w, /cdn/shop/files/gentle-cleansing-balm-2.png?v=1793074059&width=550 550w, /cdn/shop/files/gentle-cleansing-balm-2.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/gentle-cleansing-balm"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235080818790"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/gentle-cleansing-balm-3.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/gentle-cleansing-balm-3.png?v=1793074059&width=310 310w, /cdn/shop/files/gentle-cleansing-balm-3.png?v=1793074059&width=375 375w, /cdn/shop/files/gentle-cleansing-balm-3.png?v=1793074059&width=550 550w, /cdn/shop/files/gentle-cleansing-balm-3.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                        <span className="product-card__badge color-scheme-5">Sold out</span>
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
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/gentle-cleansing-balm">
                          Gentle Cleansing Balm
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price price--sold-out">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 3,600.00</span>
                            </span>
                          </div>{" "}
                        </div>{" "}
                        <span className="product-card__save" data-card-save="" data-template="Save [percent]%" hidden>
                          Save 0%
                        </span>{" "}
                      </div>
                      <div className="product-card__buy">
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/gentle-cleansing-balm"
                          data-card-notify=""
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
                          Notify me<span className="visually-hidden">: Gentle Cleansing Balm</span>{" "}
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
                            href="/products/rose-petal-toner"
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
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/rose-petal-toner"
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
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/rose-petal-toner"
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
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/rose-petal-toner">
                          Rose Petal Toner
                        </a>{" "}
                      </h2>{" "}
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
                              id="QuickAdd-template--27949758578790__main-15446394863718-pill-product-card__quick-add-product-card__quick-add-icon-full"
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
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                          href="/products/rose-petal-toner"
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
                            href="/products/hydra-glow-night-cream"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079508070"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/hydra-glow-night-cream-1.png?v=1793074058&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/hydra-glow-night-cream-1.png?v=1793074058&width=310 310w, /cdn/shop/files/hydra-glow-night-cream-1.png?v=1793074058&width=375 375w, /cdn/shop/files/hydra-glow-night-cream-1.png?v=1793074058&width=550 550w, /cdn/shop/files/hydra-glow-night-cream-1.png?v=1793074058&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/hydra-glow-night-cream"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081474150"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/hydra-glow-night-cream-2.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/hydra-glow-night-cream-2.png?v=1793074059&width=310 310w, /cdn/shop/files/hydra-glow-night-cream-2.png?v=1793074059&width=375 375w, /cdn/shop/files/hydra-glow-night-cream-2.png?v=1793074059&width=550 550w, /cdn/shop/files/hydra-glow-night-cream-2.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/hydra-glow-night-cream"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081310310"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/hydra-glow-night-cream-3.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/hydra-glow-night-cream-3.png?v=1793074059&width=310 310w, /cdn/shop/files/hydra-glow-night-cream-3.png?v=1793074059&width=375 375w, /cdn/shop/files/hydra-glow-night-cream-3.png?v=1793074059&width=550 550w, /cdn/shop/files/hydra-glow-night-cream-3.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/hydra-glow-night-cream">
                          Hydra Glow Night Cream
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 6,400.00</span>
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
                            data-variant-id="67834034487398"
                            data-label-added="Hydra Glow Night Cream added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446394765414-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834034487398" />{" "}
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
                                  : Hydra Glow Night Cream
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446394765414" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834034487398:1"
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
                            <span className="visually-hidden">: Hydra Glow Night Cream</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/hydra-glow-night-cream"
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
                          Notify me<span className="visually-hidden">: Hydra Glow Night Cream</span>{" "}
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
                            href="/products/the-skin-moisturizer"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235080786022"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/the-skin-moisturizer-1.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/the-skin-moisturizer-1.png?v=1793074059&width=310 310w, /cdn/shop/files/the-skin-moisturizer-1.png?v=1793074059&width=375 375w, /cdn/shop/files/the-skin-moisturizer-1.png?v=1793074059&width=550 550w, /cdn/shop/files/the-skin-moisturizer-1.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/the-skin-moisturizer"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079704678"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/the-skin-moisturizer-2.png?v=1793074058&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/the-skin-moisturizer-2.png?v=1793074058&width=310 310w, /cdn/shop/files/the-skin-moisturizer-2.png?v=1793074058&width=375 375w, /cdn/shop/files/the-skin-moisturizer-2.png?v=1793074058&width=550 550w, /cdn/shop/files/the-skin-moisturizer-2.png?v=1793074058&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/the-skin-moisturizer"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081343078"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/the-skin-moisturizer-3.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/the-skin-moisturizer-3.png?v=1793074059&width=310 310w, /cdn/shop/files/the-skin-moisturizer-3.png?v=1793074059&width=375 375w, /cdn/shop/files/the-skin-moisturizer-3.png?v=1793074059&width=550 550w, /cdn/shop/files/the-skin-moisturizer-3.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                        >
                          -25%
                        </span>
                      </div>{" "}
                    </div>
                    <card-options className="product-card__body" data-cart-url="/cart">
                      {" "}
                      <div className="product-card__meta">
                        <p className="product-card__category">Skincare</p>
                      </div>{" "}
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/the-skin-moisturizer">
                          The Skin Moisturizer
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price price--on-sale">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Sale price </span>
                              <span data-price-amount="">Rs. 5,100.00</span>
                            </span>
                            <span className="price__compare">
                              {" "}
                              <span className="visually-hidden">Regular price</span> <s>Rs. 6,800.00</s>{" "}
                            </span>
                          </div>{" "}
                        </div>{" "}
                        <span className="product-card__save" data-card-save="" data-template="Save [percent]%">
                          Save 25%
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
                            data-variant-id="67834034421862"
                            data-label-added="The Skin Moisturizer added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446394699878-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834034421862" />{" "}
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
                                  : The Skin Moisturizer
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446394699878" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834034421862:1"
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
                            <span className="visually-hidden">: The Skin Moisturizer</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/the-skin-moisturizer"
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
                          Notify me<span className="visually-hidden">: The Skin Moisturizer</span>{" "}
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
                            href="/products/radiance-vitamin-c-serum"
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
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/radiance-vitamin-c-serum"
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
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/radiance-vitamin-c-serum"
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
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/radiance-vitamin-c-serum">
                          Radiance Vitamin C Serum
                        </a>{" "}
                      </h2>{" "}
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
                          id="Card-15446394634342-template--27949758578790__main-1"
                          name="Card-15446394634342-template--27949758578790__main"
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
                          htmlFor="Card-15446394634342-template--27949758578790__main-1"
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
                          id="Card-15446394634342-template--27949758578790__main-2"
                          name="Card-15446394634342-template--27949758578790__main"
                          value="67834034356326"
                          data-available="true"
                          data-save="0"
                          data-add-name="Radiance Vitamin C Serum - 50 ml"
                          data-add-label="Add Radiance Vitamin C Serum - 50 ml to cart"
                          data-added-label="Radiance Vitamin C Serum - 50 ml added to your cart"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394634342-template--27949758578790__main-2"
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
                              id="QuickAdd-template--27949758578790__main-15446394634342-pill-product-card__quick-add-product-card__quick-add-icon-full"
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
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                          href="/products/radiance-vitamin-c-serum"
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
                            href="/products/pressed-powder-compact"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081769062"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/pressed-powder-compact-1.png?v=1793074060&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/pressed-powder-compact-1.png?v=1793074060&width=310 310w, /cdn/shop/files/pressed-powder-compact-1.png?v=1793074060&width=375 375w, /cdn/shop/files/pressed-powder-compact-1.png?v=1793074060&width=550 550w, /cdn/shop/files/pressed-powder-compact-1.png?v=1793074060&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/pressed-powder-compact"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081572454"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/pressed-powder-compact-2.png?v=1793074060&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/pressed-powder-compact-2.png?v=1793074060&width=310 310w, /cdn/shop/files/pressed-powder-compact-2.png?v=1793074060&width=375 375w, /cdn/shop/files/pressed-powder-compact-2.png?v=1793074060&width=550 550w, /cdn/shop/files/pressed-powder-compact-2.png?v=1793074060&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/pressed-powder-compact"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081605222"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/pressed-powder-compact-3.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/pressed-powder-compact-3.png?v=1793074059&width=310 310w, /cdn/shop/files/pressed-powder-compact-3.png?v=1793074059&width=375 375w, /cdn/shop/files/pressed-powder-compact-3.png?v=1793074059&width=550 550w, /cdn/shop/files/pressed-powder-compact-3.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/pressed-powder-compact"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081244774"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/pressed-powder-compact-translucent.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/pressed-powder-compact-translucent.png?v=1793074059&width=310 310w, /cdn/shop/files/pressed-powder-compact-translucent.png?v=1793074059&width=375 375w, /cdn/shop/files/pressed-powder-compact-translucent.png?v=1793074059&width=550 550w, /cdn/shop/files/pressed-powder-compact-translucent.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/pressed-powder-compact"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081277542"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/pressed-powder-compact-light.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/pressed-powder-compact-light.png?v=1793074059&width=310 310w, /cdn/shop/files/pressed-powder-compact-light.png?v=1793074059&width=375 375w, /cdn/shop/files/pressed-powder-compact-light.png?v=1793074059&width=550 550w, /cdn/shop/files/pressed-powder-compact-light.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/pressed-powder-compact">
                          Pressed Powder Compact
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 4,000.00</span>
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
                          id="Card-15446394404966-template--27949758578790__main-1"
                          name="Card-15446394404966-template--27949758578790__main"
                          value="67834034061414"
                          data-available="true"
                          data-save="0"
                          data-add-name="Pressed Powder Compact - Translucent"
                          data-add-label="Add Pressed Powder Compact - Translucent to cart"
                          data-added-label="Pressed Powder Compact - Translucent added to your cart"
                          data-media-id="46235081244774"
                          defaultChecked
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394404966-template--27949758578790__main-1"
                        >
                          Translucent
                        </label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446394404966-template--27949758578790__main-2"
                          name="Card-15446394404966-template--27949758578790__main"
                          value="67834034094182"
                          data-available="true"
                          data-save="0"
                          data-add-name="Pressed Powder Compact - Light"
                          data-add-label="Add Pressed Powder Compact - Light to cart"
                          data-added-label="Pressed Powder Compact - Light added to your cart"
                          data-media-id="46235081277542"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394404966-template--27949758578790__main-2"
                        >
                          Light
                        </label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446394404966-template--27949758578790__main-3"
                          name="Card-15446394404966-template--27949758578790__main"
                          value="67834034126950"
                          data-available="false"
                          data-save="0"
                          data-add-name="Pressed Powder Compact - Medium"
                          data-add-label="Add Pressed Powder Compact - Medium to cart"
                          data-added-label="Pressed Powder Compact - Medium added to your cart"
                          data-media-id="46235081965670"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text product-card__option--sold-out"
                          htmlFor="Card-15446394404966-template--27949758578790__main-3"
                        >
                          Medium
                        </label>
                        <template
                          data-media-for="46235081965670"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="image image--cover"><img src="/cdn/shop/files/pressed-powder-compact-medium.png?v=1793074060&width=1024" alt srcset="/cdn/shop/files/pressed-powder-compact-medium.png?v=1793074060&width=310 310w, /cdn/shop/files/pressed-powder-compact-medium.png?v=1793074060&width=375 375w, /cdn/shop/files/pressed-powder-compact-medium.png?v=1793074060&width=550 550w, /cdn/shop/files/pressed-powder-compact-medium.png?v=1793074060&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw" fetchpriority="auto">\n</div>\n\n\n',
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
                            data-variant-id="67834034061414"
                            data-label-added="Pressed Powder Compact - Translucent added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446394404966-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834034061414" />{" "}
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
                                  : Pressed Powder Compact - Translucent
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446394404966" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834034061414:1"
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
                            <span className="visually-hidden">: Pressed Powder Compact</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/pressed-powder-compact"
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
                          Notify me<span className="visually-hidden">: Pressed Powder Compact</span>{" "}
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
                            href="/products/kabuki-makeup-brush"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235080556646"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/kabuki-makeup-brush-1.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/kabuki-makeup-brush-1.png?v=1793074059&width=310 310w, /cdn/shop/files/kabuki-makeup-brush-1.png?v=1793074059&width=375 375w, /cdn/shop/files/kabuki-makeup-brush-1.png?v=1793074059&width=550 550w, /cdn/shop/files/kabuki-makeup-brush-1.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/kabuki-makeup-brush"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079147622"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/kabuki-makeup-brush-2.png?v=1793074058&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/kabuki-makeup-brush-2.png?v=1793074058&width=310 310w, /cdn/shop/files/kabuki-makeup-brush-2.png?v=1793074058&width=375 375w, /cdn/shop/files/kabuki-makeup-brush-2.png?v=1793074058&width=550 550w, /cdn/shop/files/kabuki-makeup-brush-2.png?v=1793074058&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/kabuki-makeup-brush"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235082129510"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/kabuki-makeup-brush-3.png?v=1793074060&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/kabuki-makeup-brush-3.png?v=1793074060&width=310 310w, /cdn/shop/files/kabuki-makeup-brush-3.png?v=1793074060&width=375 375w, /cdn/shop/files/kabuki-makeup-brush-3.png?v=1793074060&width=550 550w, /cdn/shop/files/kabuki-makeup-brush-3.png?v=1793074060&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                        <p className="product-card__category">Makeup</p>
                      </div>{" "}
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/kabuki-makeup-brush">
                          Kabuki Makeup Brush
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 1,700.00</span>
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
                            data-variant-id="67834033995878"
                            data-label-added="Kabuki Makeup Brush added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446394339430-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834033995878" />{" "}
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
                                  : Kabuki Makeup Brush
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446394339430" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834033995878:1"
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
                            <span className="visually-hidden">: Kabuki Makeup Brush</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/kabuki-makeup-brush"
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
                          Notify me<span className="visually-hidden">: Kabuki Makeup Brush</span>{" "}
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
                            href="/products/golden-hour-eyeshadow-palette"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081932902"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/golden-hour-eyeshadow-palette-1.png?v=1793074060&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/golden-hour-eyeshadow-palette-1.png?v=1793074060&width=310 310w, /cdn/shop/files/golden-hour-eyeshadow-palette-1.png?v=1793074060&width=375 375w, /cdn/shop/files/golden-hour-eyeshadow-palette-1.png?v=1793074060&width=550 550w, /cdn/shop/files/golden-hour-eyeshadow-palette-1.png?v=1793074060&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/golden-hour-eyeshadow-palette"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081212006"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/golden-hour-eyeshadow-palette-2.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/golden-hour-eyeshadow-palette-2.png?v=1793074059&width=310 310w, /cdn/shop/files/golden-hour-eyeshadow-palette-2.png?v=1793074059&width=375 375w, /cdn/shop/files/golden-hour-eyeshadow-palette-2.png?v=1793074059&width=550 550w, /cdn/shop/files/golden-hour-eyeshadow-palette-2.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/golden-hour-eyeshadow-palette"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081900134"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/golden-hour-eyeshadow-palette-3.png?v=1793074060&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/golden-hour-eyeshadow-palette-3.png?v=1793074060&width=310 310w, /cdn/shop/files/golden-hour-eyeshadow-palette-3.png?v=1793074060&width=375 375w, /cdn/shop/files/golden-hour-eyeshadow-palette-3.png?v=1793074060&width=550 550w, /cdn/shop/files/golden-hour-eyeshadow-palette-3.png?v=1793074060&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                        <p className="product-card__category">Makeup</p>
                      </div>{" "}
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/golden-hour-eyeshadow-palette">
                          Golden Hour Eyeshadow Palette
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 6,000.00</span>
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
                            data-variant-id="67834033864806"
                            data-label-added="Golden Hour Eyeshadow Palette added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446394241126-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834033864806" />{" "}
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
                                  : Golden Hour Eyeshadow Palette
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446394241126" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834033864806:1"
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
                            <span className="visually-hidden">: Golden Hour Eyeshadow Palette</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/golden-hour-eyeshadow-palette"
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
                          Notify me<span className="visually-hidden">: Golden Hour Eyeshadow Palette</span>{" "}
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
                            href="/products/pure-matte-lipstick"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081801830"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/pure-matte-lipstick-1.png?v=1793074060&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/pure-matte-lipstick-1.png?v=1793074060&width=310 310w, /cdn/shop/files/pure-matte-lipstick-1.png?v=1793074060&width=375 375w, /cdn/shop/files/pure-matte-lipstick-1.png?v=1793074060&width=550 550w, /cdn/shop/files/pure-matte-lipstick-1.png?v=1793074060&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/pure-matte-lipstick"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081015398"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/pure-matte-lipstick-2.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/pure-matte-lipstick-2.png?v=1793074059&width=310 310w, /cdn/shop/files/pure-matte-lipstick-2.png?v=1793074059&width=375 375w, /cdn/shop/files/pure-matte-lipstick-2.png?v=1793074059&width=550 550w, /cdn/shop/files/pure-matte-lipstick-2.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/pure-matte-lipstick"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081146470"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/pure-matte-lipstick-3.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/pure-matte-lipstick-3.png?v=1793074059&width=310 310w, /cdn/shop/files/pure-matte-lipstick-3.png?v=1793074059&width=375 375w, /cdn/shop/files/pure-matte-lipstick-3.png?v=1793074059&width=550 550w, /cdn/shop/files/pure-matte-lipstick-3.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/pure-matte-lipstick"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079770214"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/pure-matte-lipstick-rosewood.png?v=1793074058&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/pure-matte-lipstick-rosewood.png?v=1793074058&width=310 310w, /cdn/shop/files/pure-matte-lipstick-rosewood.png?v=1793074058&width=375 375w, /cdn/shop/files/pure-matte-lipstick-rosewood.png?v=1793074058&width=550 550w, /cdn/shop/files/pure-matte-lipstick-rosewood.png?v=1793074058&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/pure-matte-lipstick"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235080130662"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/pure-matte-lipstick-classic-red.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/pure-matte-lipstick-classic-red.png?v=1793074059&width=310 310w, /cdn/shop/files/pure-matte-lipstick-classic-red.png?v=1793074059&width=375 375w, /cdn/shop/files/pure-matte-lipstick-classic-red.png?v=1793074059&width=550 550w, /cdn/shop/files/pure-matte-lipstick-classic-red.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/pure-matte-lipstick">
                          Pure Matte Lipstick
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 3,000.00</span>
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
                          id="Card-15446394175590-template--27949758578790__main-1"
                          name="Card-15446394175590-template--27949758578790__main"
                          value="67834033635430"
                          data-available="true"
                          data-save="0"
                          data-add-name="Pure Matte Lipstick - Rosewood"
                          data-add-label="Add Pure Matte Lipstick - Rosewood to cart"
                          data-added-label="Pure Matte Lipstick - Rosewood added to your cart"
                          data-media-id="46235079770214"
                          defaultChecked
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394175590-template--27949758578790__main-1"
                        >
                          Rosewood
                        </label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446394175590-template--27949758578790__main-2"
                          name="Card-15446394175590-template--27949758578790__main"
                          value="67834033668198"
                          data-available="true"
                          data-save="0"
                          data-add-name="Pure Matte Lipstick - Classic Red"
                          data-add-label="Add Pure Matte Lipstick - Classic Red to cart"
                          data-added-label="Pure Matte Lipstick - Classic Red added to your cart"
                          data-media-id="46235080130662"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394175590-template--27949758578790__main-2"
                        >
                          Classic Red
                        </label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446394175590-template--27949758578790__main-3"
                          name="Card-15446394175590-template--27949758578790__main"
                          value="67834033700966"
                          data-available="true"
                          data-save="0"
                          data-add-name="Pure Matte Lipstick - Nude Silk"
                          data-add-label="Add Pure Matte Lipstick - Nude Silk to cart"
                          data-added-label="Pure Matte Lipstick - Nude Silk added to your cart"
                          data-media-id="46235079049318"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394175590-template--27949758578790__main-3"
                        >
                          Nude Silk
                        </label>
                        <template
                          data-media-for="46235079049318"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="image image--cover"><img src="/cdn/shop/files/pure-matte-lipstick-nude-silk.png?v=1793074057&width=1024" alt srcset="/cdn/shop/files/pure-matte-lipstick-nude-silk.png?v=1793074057&width=310 310w, /cdn/shop/files/pure-matte-lipstick-nude-silk.png?v=1793074057&width=375 375w, /cdn/shop/files/pure-matte-lipstick-nude-silk.png?v=1793074057&width=550 550w, /cdn/shop/files/pure-matte-lipstick-nude-silk.png?v=1793074057&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw" fetchpriority="auto">\n</div>\n\n\n',
                          }}
                        />
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446394175590-template--27949758578790__main-4"
                          name="Card-15446394175590-template--27949758578790__main"
                          value="67834033733734"
                          data-available="true"
                          data-save="0"
                          data-add-name="Pure Matte Lipstick - Berry"
                          data-add-label="Add Pure Matte Lipstick - Berry to cart"
                          data-added-label="Pure Matte Lipstick - Berry added to your cart"
                          data-media-id="46235080458342"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394175590-template--27949758578790__main-4"
                        >
                          Berry
                        </label>
                        <template
                          data-media-for="46235080458342"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="image image--cover"><img src="/cdn/shop/files/pure-matte-lipstick-berry.png?v=1793074059&width=1024" alt srcset="/cdn/shop/files/pure-matte-lipstick-berry.png?v=1793074059&width=310 310w, /cdn/shop/files/pure-matte-lipstick-berry.png?v=1793074059&width=375 375w, /cdn/shop/files/pure-matte-lipstick-berry.png?v=1793074059&width=550 550w, /cdn/shop/files/pure-matte-lipstick-berry.png?v=1793074059&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw" fetchpriority="auto">\n</div>\n\n\n',
                          }}
                        />
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446394175590-template--27949758578790__main-5"
                          name="Card-15446394175590-template--27949758578790__main"
                          value="67834033766502"
                          data-available="true"
                          data-save="0"
                          data-add-name="Pure Matte Lipstick - Coral"
                          data-add-label="Add Pure Matte Lipstick - Coral to cart"
                          data-added-label="Pure Matte Lipstick - Coral added to your cart"
                          data-media-id="46235079835750"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394175590-template--27949758578790__main-5"
                        >
                          Coral
                        </label>
                        <template
                          data-media-for="46235079835750"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="image image--cover"><img src="/cdn/shop/files/pure-matte-lipstick-coral.png?v=1793074058&width=1024" alt srcset="/cdn/shop/files/pure-matte-lipstick-coral.png?v=1793074058&width=310 310w, /cdn/shop/files/pure-matte-lipstick-coral.png?v=1793074058&width=375 375w, /cdn/shop/files/pure-matte-lipstick-coral.png?v=1793074058&width=550 550w, /cdn/shop/files/pure-matte-lipstick-coral.png?v=1793074058&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw" fetchpriority="auto">\n</div>\n\n\n',
                          }}
                        />
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446394175590-template--27949758578790__main-6"
                          name="Card-15446394175590-template--27949758578790__main"
                          value="67834033799270"
                          data-available="true"
                          data-save="0"
                          data-add-name="Pure Matte Lipstick - Mauve"
                          data-add-label="Add Pure Matte Lipstick - Mauve to cart"
                          data-added-label="Pure Matte Lipstick - Mauve added to your cart"
                          data-media-id="46235078885478"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394175590-template--27949758578790__main-6"
                        >
                          Mauve
                        </label>
                        <template
                          data-media-for="46235078885478"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="image image--cover"><img src="/cdn/shop/files/pure-matte-lipstick-mauve.png?v=1793074057&width=1024" alt srcset="/cdn/shop/files/pure-matte-lipstick-mauve.png?v=1793074057&width=310 310w, /cdn/shop/files/pure-matte-lipstick-mauve.png?v=1793074057&width=375 375w, /cdn/shop/files/pure-matte-lipstick-mauve.png?v=1793074057&width=550 550w, /cdn/shop/files/pure-matte-lipstick-mauve.png?v=1793074057&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw" fetchpriority="auto">\n</div>\n\n\n',
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
                            data-variant-id="67834033635430"
                            data-label-added="Pure Matte Lipstick - Rosewood added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446394175590-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834033635430" />{" "}
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
                                  : Pure Matte Lipstick - Rosewood
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446394175590" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834033635430:1"
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
                            <span className="visually-hidden">: Pure Matte Lipstick</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/pure-matte-lipstick"
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
                          Notify me<span className="visually-hidden">: Pure Matte Lipstick</span>{" "}
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
                            href="/products/silk-foundation"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235078918246"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/silk-foundation-1.png?v=1793074057&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/silk-foundation-1.png?v=1793074057&width=310 310w, /cdn/shop/files/silk-foundation-1.png?v=1793074057&width=375 375w, /cdn/shop/files/silk-foundation-1.png?v=1793074057&width=550 550w, /cdn/shop/files/silk-foundation-1.png?v=1793074057&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/silk-foundation"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235080360038"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/silk-foundation-2.png?v=1793074059&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/silk-foundation-2.png?v=1793074059&width=310 310w, /cdn/shop/files/silk-foundation-2.png?v=1793074059&width=375 375w, /cdn/shop/files/silk-foundation-2.png?v=1793074059&width=550 550w, /cdn/shop/files/silk-foundation-2.png?v=1793074059&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/silk-foundation"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235081637990"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/silk-foundation-3.png?v=1793074060&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/silk-foundation-3.png?v=1793074060&width=310 310w, /cdn/shop/files/silk-foundation-3.png?v=1793074060&width=375 375w, /cdn/shop/files/silk-foundation-3.png?v=1793074060&width=550 550w, /cdn/shop/files/silk-foundation-3.png?v=1793074060&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/silk-foundation"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235078787174"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/silk-foundation-porcelain.png?v=1793074056&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/silk-foundation-porcelain.png?v=1793074056&width=310 310w, /cdn/shop/files/silk-foundation-porcelain.png?v=1793074056&width=375 375w, /cdn/shop/files/silk-foundation-porcelain.png?v=1793074056&width=550 550w, /cdn/shop/files/silk-foundation-porcelain.png?v=1793074056&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/silk-foundation"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235079999590"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/silk-foundation-sand.png?v=1793074058&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/silk-foundation-sand.png?v=1793074058&width=310 310w, /cdn/shop/files/silk-foundation-sand.png?v=1793074058&width=375 375w, /cdn/shop/files/silk-foundation-sand.png?v=1793074058&width=550 550w, /cdn/shop/files/silk-foundation-sand.png?v=1793074058&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/silk-foundation">
                          Silk Foundation
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 5,500.00</span>
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
                          id="Card-15446394077286-template--27949758578790__main-1"
                          name="Card-15446394077286-template--27949758578790__main"
                          value="67834033406054"
                          data-available="true"
                          data-save="0"
                          data-add-name="Silk Foundation - Porcelain"
                          data-add-label="Add Silk Foundation - Porcelain to cart"
                          data-added-label="Silk Foundation - Porcelain added to your cart"
                          data-media-id="46235078787174"
                          defaultChecked
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394077286-template--27949758578790__main-1"
                        >
                          Porcelain
                        </label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446394077286-template--27949758578790__main-2"
                          name="Card-15446394077286-template--27949758578790__main"
                          value="67834033438822"
                          data-available="true"
                          data-save="0"
                          data-add-name="Silk Foundation - Sand"
                          data-add-label="Add Silk Foundation - Sand to cart"
                          data-added-label="Silk Foundation - Sand added to your cart"
                          data-media-id="46235079999590"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394077286-template--27949758578790__main-2"
                        >
                          Sand
                        </label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446394077286-template--27949758578790__main-3"
                          name="Card-15446394077286-template--27949758578790__main"
                          value="67834033471590"
                          data-available="true"
                          data-save="0"
                          data-add-name="Silk Foundation - Honey"
                          data-add-label="Add Silk Foundation - Honey to cart"
                          data-added-label="Silk Foundation - Honey added to your cart"
                          data-media-id="46235079639142"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394077286-template--27949758578790__main-3"
                        >
                          Honey
                        </label>
                        <template
                          data-media-for="46235079639142"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="image image--cover"><img src="/cdn/shop/files/silk-foundation-honey.png?v=1793074058&width=1024" alt srcset="/cdn/shop/files/silk-foundation-honey.png?v=1793074058&width=310 310w, /cdn/shop/files/silk-foundation-honey.png?v=1793074058&width=375 375w, /cdn/shop/files/silk-foundation-honey.png?v=1793074058&width=550 550w, /cdn/shop/files/silk-foundation-honey.png?v=1793074058&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw" fetchpriority="auto">\n</div>\n\n\n',
                          }}
                        />
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446394077286-template--27949758578790__main-4"
                          name="Card-15446394077286-template--27949758578790__main"
                          value="67834033504358"
                          data-available="true"
                          data-save="0"
                          data-add-name="Silk Foundation - Caramel"
                          data-add-label="Add Silk Foundation - Caramel to cart"
                          data-added-label="Silk Foundation - Caramel added to your cart"
                          data-media-id="46235081703526"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394077286-template--27949758578790__main-4"
                        >
                          Caramel
                        </label>
                        <template
                          data-media-for="46235081703526"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="image image--cover"><img src="/cdn/shop/files/silk-foundation-caramel.png?v=1793074059&width=1024" alt srcset="/cdn/shop/files/silk-foundation-caramel.png?v=1793074059&width=310 310w, /cdn/shop/files/silk-foundation-caramel.png?v=1793074059&width=375 375w, /cdn/shop/files/silk-foundation-caramel.png?v=1793074059&width=550 550w, /cdn/shop/files/silk-foundation-caramel.png?v=1793074059&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw" fetchpriority="auto">\n</div>\n\n\n',
                          }}
                        />
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446394077286-template--27949758578790__main-5"
                          name="Card-15446394077286-template--27949758578790__main"
                          value="67834033537126"
                          data-available="true"
                          data-save="0"
                          data-add-name="Silk Foundation - Cocoa"
                          data-add-label="Add Silk Foundation - Cocoa to cart"
                          data-added-label="Silk Foundation - Cocoa added to your cart"
                          data-media-id="46235080884326"
                        />{" "}
                        <label
                          className="product-card__option product-card__option--text"
                          htmlFor="Card-15446394077286-template--27949758578790__main-5"
                        >
                          Cocoa
                        </label>
                        <template
                          data-media-for="46235080884326"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="image image--cover"><img src="/cdn/shop/files/silk-foundation-cocoa.png?v=1793074059&width=1024" alt srcset="/cdn/shop/files/silk-foundation-cocoa.png?v=1793074059&width=310 310w, /cdn/shop/files/silk-foundation-cocoa.png?v=1793074059&width=375 375w, /cdn/shop/files/silk-foundation-cocoa.png?v=1793074059&width=550 550w, /cdn/shop/files/silk-foundation-cocoa.png?v=1793074059&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw" fetchpriority="auto">\n</div>\n\n\n',
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
                            data-variant-id="67834033406054"
                            data-label-added="Silk Foundation - Porcelain added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446394077286-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834033406054" />{" "}
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
                                  : Silk Foundation - Porcelain
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446394077286" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834033406054:1"
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
                            <span className="visually-hidden">: Silk Foundation</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/silk-foundation"
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
                          Notify me<span className="visually-hidden">: Silk Foundation</span>{" "}
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
                            href="/products/skin-tint"
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
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/skin-tint"
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
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/skin-tint"
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
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/skin-tint"
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
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/skin-tint"
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
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/skin-tint">
                          Skin Tint
                        </a>{" "}
                      </h2>{" "}
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
                          id="Card-15446393978982-template--27949758578790__main-1"
                          name="Card-15446393978982-template--27949758578790__main"
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
                          htmlFor="Card-15446393978982-template--27949758578790__main-1"
                        >
                          Light
                        </label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446393978982-template--27949758578790__main-2"
                          name="Card-15446393978982-template--27949758578790__main"
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
                          htmlFor="Card-15446393978982-template--27949758578790__main-2"
                        >
                          Medium
                        </label>
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446393978982-template--27949758578790__main-3"
                          name="Card-15446393978982-template--27949758578790__main"
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
                          htmlFor="Card-15446393978982-template--27949758578790__main-3"
                        >
                          Tan
                        </label>
                        <template
                          data-media-for="46235080163430"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="image image--cover"><img src="/cdn/shop/files/skin-tint-tan.png?v=1793074059&width=1024" alt srcset="/cdn/shop/files/skin-tint-tan.png?v=1793074059&width=310 310w, /cdn/shop/files/skin-tint-tan.png?v=1793074059&width=375 375w, /cdn/shop/files/skin-tint-tan.png?v=1793074059&width=550 550w, /cdn/shop/files/skin-tint-tan.png?v=1793074059&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw" fetchpriority="auto">\n</div>\n\n\n',
                          }}
                        />
                        <input
                          className="visually-hidden"
                          type="radio"
                          id="Card-15446393978982-template--27949758578790__main-4"
                          name="Card-15446393978982-template--27949758578790__main"
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
                          htmlFor="Card-15446393978982-template--27949758578790__main-4"
                        >
                          Deep
                        </label>
                        <template
                          data-media-for="46235079901286"
                          dangerouslySetInnerHTML={{
                            __html:
                              '\n<div class="image image--cover"><img src="/cdn/shop/files/skin-tint-deep.png?v=1793074058&width=1024" alt srcset="/cdn/shop/files/skin-tint-deep.png?v=1793074058&width=310 310w, /cdn/shop/files/skin-tint-deep.png?v=1793074058&width=375 375w, /cdn/shop/files/skin-tint-deep.png?v=1793074058&width=550 550w, /cdn/shop/files/skin-tint-deep.png?v=1793074058&width=750 750w" width="1024" height="1024" loading="lazy" sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw" fetchpriority="auto">\n</div>\n\n\n',
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
                              id="QuickAdd-template--27949758578790__main-15446393978982-pill-product-card__quick-add-product-card__quick-add-icon-full"
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
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                          href="/products/skin-tint"
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
                            href="/products/signature-blush-box"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235838382182"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/signature-blush-box-1.png?v=1793079773&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/signature-blush-box-1.png?v=1793079773&width=310 310w, /cdn/shop/files/signature-blush-box-1.png?v=1793079773&width=375 375w, /cdn/shop/files/signature-blush-box-1.png?v=1793079773&width=550 550w, /cdn/shop/files/signature-blush-box-1.png?v=1793079773&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/signature-blush-box"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235838349414"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/signature-blush-box-2.png?v=1793079773&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/signature-blush-box-2.png?v=1793079773&width=310 310w, /cdn/shop/files/signature-blush-box-2.png?v=1793079773&width=375 375w, /cdn/shop/files/signature-blush-box-2.png?v=1793079773&width=550 550w, /cdn/shop/files/signature-blush-box-2.png?v=1793079773&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/signature-blush-box"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235838447718"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/signature-blush-box-3.png?v=1793079773&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/signature-blush-box-3.png?v=1793079773&width=310 310w, /cdn/shop/files/signature-blush-box-3.png?v=1793079773&width=375 375w, /cdn/shop/files/signature-blush-box-3.png?v=1793079773&width=550 550w, /cdn/shop/files/signature-blush-box-3.png?v=1793079773&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                          className="product-card__badge product-card__badge--own-colors"
                          style={{ "--badge-bg": "#7D0000", "--badge-fg": "#FFFFFF" } as React.CSSProperties}
                        >
                          Bestseller
                        </span>{" "}
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
                        <p className="product-card__category">Gift wrap</p>
                      </div>{" "}
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/signature-blush-box">
                          Signature Blush Box
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 500.00</span>
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
                            data-variant-id="67834035863654"
                            data-label-added="Signature Blush Box added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446395715686-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834035863654" />{" "}
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
                                  : Signature Blush Box
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446395715686" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834035863654:1"
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
                            <span className="visually-hidden">: Signature Blush Box</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/signature-blush-box"
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
                          Notify me<span className="visually-hidden">: Signature Blush Box</span>{" "}
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
                            href="/products/eco-friendly-linen-pouch"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235838480486"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/eco-friendly-linen-pouch-1.png?v=1793079774&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/eco-friendly-linen-pouch-1.png?v=1793079774&width=310 310w, /cdn/shop/files/eco-friendly-linen-pouch-1.png?v=1793079774&width=375 375w, /cdn/shop/files/eco-friendly-linen-pouch-1.png?v=1793079774&width=550 550w, /cdn/shop/files/eco-friendly-linen-pouch-1.png?v=1793079774&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/eco-friendly-linen-pouch"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235838546022"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/eco-friendly-linen-pouch-2.png?v=1793079774&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/eco-friendly-linen-pouch-2.png?v=1793079774&width=310 310w, /cdn/shop/files/eco-friendly-linen-pouch-2.png?v=1793079774&width=375 375w, /cdn/shop/files/eco-friendly-linen-pouch-2.png?v=1793079774&width=550 550w, /cdn/shop/files/eco-friendly-linen-pouch-2.png?v=1793079774&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
                                fetchPriority="auto"
                              />{" "}
                            </div>{" "}
                          </a>
                          <a
                            className="product-card__slide"
                            href="/products/eco-friendly-linen-pouch"
                            tabIndex={-1}
                            aria-hidden="true"
                            data-media-id="46235838414950"
                          >
                            {" "}
                            <div className="image image--cover">
                              <img
                                src="/cdn/shop/files/eco-friendly-linen-pouch-3.png?v=1793079773&width=1024"
                                alt=""
                                srcSet="/cdn/shop/files/eco-friendly-linen-pouch-3.png?v=1793079773&width=310 310w, /cdn/shop/files/eco-friendly-linen-pouch-3.png?v=1793079773&width=375 375w, /cdn/shop/files/eco-friendly-linen-pouch-3.png?v=1793079773&width=550 550w, /cdn/shop/files/eco-friendly-linen-pouch-3.png?v=1793079773&width=750 750w"
                                width="1024"
                                height="1024"
                                loading="lazy"
                                sizes="(min-width: 1600px) 26vw, (min-width: 1200px) 34vw, 50vw"
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
                        <p className="product-card__category">Gift wrap</p>
                      </div>{" "}
                      <h2 className="product-card__title">
                        {" "}
                        <a className="product-card__link" href="/products/eco-friendly-linen-pouch">
                          Eco-Friendly Linen Pouch
                        </a>{" "}
                      </h2>{" "}
                      <div className="product-card__pricing">
                        {" "}
                        <div data-card-price="">
                          {" "}
                          <div className="price">
                            {" "}
                            <span className="price__current">
                              {" "}
                              <span className="visually-hidden">Regular price </span>
                              <span data-price-amount="">Rs. 300.00</span>
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
                            data-variant-id="67834035929190"
                            data-label-added="Eco-Friendly Linen Pouch added to your cart"
                            data-label-error="Couldn't add this to your cart. Please try again."
                          >
                            <form
                              method="post"
                              action="/cart/add"
                              id="QuickAdd-template--27949758578790__main-15446395781222-pill-product-card__quick-add-product-card__quick-add-icon-full"
                              acceptCharset="UTF-8"
                              className="quick-add__form"
                              encType="multipart/form-data"
                            >
                              <input type="hidden" name="form_type" value="product" />
                              <input type="hidden" name="utf8" value="✓" />
                              <input type="hidden" name="id" value="67834035929190" />{" "}
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
                                  : Eco-Friendly Linen Pouch
                                </span>
                              </button>
                              <input type="hidden" name="product-id" value="15446395781222" />
                              <input type="hidden" name="section-id" value="template--27949758578790__main" />
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
                            href="/cart/67834035929190:1"
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
                            <span className="visually-hidden">: Eco-Friendly Linen Pouch</span>{" "}
                          </a>{" "}
                        </div>
                        <a
                          className="button button--secondary product-card__notify"
                          href="/products/eco-friendly-linen-pouch"
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
                          Notify me<span className="visually-hidden">: Eco-Friendly Linen Pouch</span>{" "}
                        </a>{" "}
                      </div>{" "}
                    </card-options>
                  </div>{" "}
                </li>
              </ul>{" "}
            </div>{" "}
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
                    href="/collections/all?page=2"
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
                    href="/collections/all?page=2"
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
          </div>{" "}
        </results-view>
      </div>{" "}
    </div>
  );
}
