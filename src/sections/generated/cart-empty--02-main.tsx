// Generated from the Shopify theme's rendered HTML (reference/sections/cart-empty--02-main.html). Make content dynamic, keep the markup.
export default function CartEmpty02Main() {
  return (
    <div id="shopify-section-template--27949758611558__main" className="shopify-section">
      <cart-page
        className="cart-page full-width section-width--widest color-scheme-1"
        style={
          {
            "--color-accent": "#c8a24b",
            "--section-padding-top": "40px",
            "--section-padding-bottom": "96px",
          } as React.CSSProperties
        }
        data-section-id="template--27949758611558__main"
        data-cart-url="/cart"
        data-label-updated="Cart updated"
        data-label-error="Couldn't update your cart. Please try again."
        data-label-selected="[count] selected"
        data-label-coupon-applied="[code] applied"
        data-label-coupon-invalid="[code] can't be used right now. It may have expired or reached its limit, or your cart may not qualify yet."
        data-label-coupon-exists="[code] is already applied"
        data-label-coupon-remove="Remove code [code]"
      >
        <p className="visually-hidden" role="status" data-cart-status=""></p>{" "}
        <div className="cart-page__inner">
          <nav className="cart-page__breadcrumb" aria-label="Breadcrumb">
            {" "}
            <ol>
              {" "}
              <li>
                <a href="/">Home</a>
              </li>{" "}
              <li aria-current="page">Cart</li>{" "}
            </ol>{" "}
          </nav>
          <header className="cart-page__header">
            <p className="eyebrow cart-page__eyebrow">Your selection</p>
            <h1 className="cart-page__title" tabIndex={-1} data-cart-heading="">
              Shopping bag
            </h1>{" "}
          </header>
          <div className="cart-empty">
            {" "}
            <div className="cart-empty__strip">
              {" "}
              <span className="cart-empty__icon" aria-hidden="true">
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
              <div className="cart-empty__message">
                {" "}
                <h2 className="cart-empty__title">Your bag is empty</h2>
                <div className="cart-empty__text rte">
                  <p>Browse our skincare, fragrance and makeup to find something you love.</p>
                </div>
              </div>{" "}
              <div className="cart-empty__actions cart-empty__actions--row">
                <a className="button button--text cart-empty__link" href="/collections/new-arrivals">
                  Shop new arrivals
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    width="18"
                    height="15"
                    viewBox="0 0 18 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.2637 7.24164L16.7974 7.76826C17.0858 7.47599 17.0858 7.00631 16.7974 6.71437L16.2637 7.24164ZM0.751213 6.48744C0.337 6.48733 0.000923157 6.82302 0.000564575 7.23724C0.000205994 7.65145 0.335702 7.98733 0.749915 7.98744L0.750564 7.23744L0.751213 6.48744ZM9.31669 13.2142C9.02566 13.5092 9.02869 13.984 9.32344 14.2749C9.61819 14.5657 10.0931 14.5624 10.3841 14.2675L9.85038 13.7409L9.31669 13.2142ZM10.3841 0.222766C10.0931 -0.0718116 9.61819 -0.0745506 9.32344 0.216648C9.02869 0.507847 9.02566 0.982713 9.31669 1.27729L9.85038 0.750029L10.3841 0.222766ZM16.2637 7.24164L16.2643 6.49164L0.751213 6.48744L0.750564 7.23744L0.749915 7.98744L16.263 7.99164L16.2637 7.24164ZM16.2637 7.24164L15.73 6.71501L9.31669 13.2142L9.85038 13.7409L10.3841 14.2675L16.7974 7.76826L16.2637 7.24164ZM16.2637 7.24164L16.7974 6.71437L10.3841 0.222766L9.85038 0.750029L9.31669 1.27729L15.73 7.7689L16.2637 7.24164Z"
                      fill="currentColor"
                    ></path>
                  </svg>{" "}
                </a>
                <a className="button" href="/collections/all">
                  Continue shopping
                </a>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        </div>{" "}
      </cart-page>{" "}
    </div>
  );
}
