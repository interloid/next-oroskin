// Generated from the Shopify theme's rendered HTML (reference/sections/contact--02-main.html). Make content dynamic, keep the markup.
export default function Contact02Main() {
  return (
    <section id="shopify-section-template--27949758873702__main" className="shopify-section">
      {" "}
      <div
        className="contact full-width section-width--widest color-scheme-2 section--fill-screen section--screen-scale"
        style={
          {
            "--section-padding-top": "40px",
            "--section-padding-bottom": "96px",
            "--text-boost": "1.1",
          } as React.CSSProperties
        }
      >
        {" "}
        <animate-on-scroll className="contact__inner">
          {" "}
          <nav className="breadcrumb contact__breadcrumb" aria-label="Breadcrumb">
            {" "}
            <ol>
              {" "}
              <li>
                <a href="/">Home</a>
              </li>
              <li aria-current="page">Contact</li>{" "}
            </ol>{" "}
          </nav>{" "}
          <div className="contact__grid">
            {" "}
            <div className="contact__intro">
              <p className="eyebrow contact__eyebrow">Get in touch</p>
              <h1 className="contact__heading">
                We're here, <em>always.</em>
              </h1>
              <div className="contact__text rte">
                <p>
                  Every luminary deserves a personal touch. Whether it's a question about a ritual, a concern with your
                  order, or simply a desire to connect — we are here, human and present, for you.
                </p>
              </div>
              <div className="contact__media">
                {" "}
                <div className="image contact__photo image--cover">
                  <img
                    src="/cdn/shop/files/image_715.png?crop=center&height=960&v=1793284751&width=960"
                    alt=""
                    srcSet="/cdn/shop/files/image_715.png?crop=center&height=120&v=1793284751&width=120 120w, /cdn/shop/files/image_715.png?crop=center&height=200&v=1793284751&width=200 200w, /cdn/shop/files/image_715.png?crop=center&height=320&v=1793284751&width=320 320w, /cdn/shop/files/image_715.png?crop=center&height=480&v=1793284751&width=480 480w, /cdn/shop/files/image_715.png?crop=center&height=640&v=1793284751&width=640 640w, /cdn/shop/files/image_715.png?crop=center&height=960&v=1793284751&width=960 960w"
                    width="960"
                    height="960"
                    loading="eager"
                    sizes="(min-width: 1200px) min(20vw, 36rem), (min-width: 750px) 12rem, (min-width: 375px) 6rem, 9rem"
                    fetchPriority="auto"
                  />{" "}
                </div>{" "}
                <p className="contact__stat">
                  <span className="contact__stat-value">97%</span>
                  <span className="contact__stat-label">Satisfaction rate</span>
                </p>
                <div className="contact__support">
                  {" "}
                  <span className="status-dot " aria-hidden="true"></span>{" "}
                  <p className="contact__support-text">
                    <span className="contact__support-title">Live support available now</span>
                    <span className="contact__support-hours">Mon–Fri 9am–9pm · Sat–Sun 10am–6pm CET</span>
                  </p>{" "}
                </div>
              </div>
            </div>{" "}
            <contact-form className="contact-form">
              <h2 className="h3 contact-form__title">Send a message</h2>
              <form
                method="post"
                action="/contact#ContactForm-template--27949758873702__main"
                id="ContactForm-template--27949758873702__main"
                acceptCharset="UTF-8"
                className="contact-form__form"
              >
                <input type="hidden" name="form_type" value="contact" />
                <input type="hidden" name="utf8" value="✓" />
                <fieldset className="contact-form__topics">
                  {" "}
                  <legend className="contact-form__label">Topic</legend>{" "}
                  <div className="contact-form__pills">
                    <input
                      className="visually-hidden contact-form__pill-input"
                      type="radio"
                      id="ContactForm-template--27949758873702__main-topic-1"
                      name="contact[Topic]"
                      value="Order & shipping"
                    />{" "}
                    <label className="contact-form__pill" htmlFor="ContactForm-template--27949758873702__main-topic-1">
                      Order &amp; shipping
                    </label>
                    <input
                      className="visually-hidden contact-form__pill-input"
                      type="radio"
                      id="ContactForm-template--27949758873702__main-topic-2"
                      name="contact[Topic]"
                      value="Returns"
                    />{" "}
                    <label className="contact-form__pill" htmlFor="ContactForm-template--27949758873702__main-topic-2">
                      Returns
                    </label>
                    <input
                      className="visually-hidden contact-form__pill-input"
                      type="radio"
                      id="ContactForm-template--27949758873702__main-topic-3"
                      name="contact[Topic]"
                      value="Product query"
                    />{" "}
                    <label className="contact-form__pill" htmlFor="ContactForm-template--27949758873702__main-topic-3">
                      Product query
                    </label>
                    <input
                      className="visually-hidden contact-form__pill-input"
                      type="radio"
                      id="ContactForm-template--27949758873702__main-topic-4"
                      name="contact[Topic]"
                      value="Press & partnerships"
                    />{" "}
                    <label className="contact-form__pill" htmlFor="ContactForm-template--27949758873702__main-topic-4">
                      Press &amp; partnerships
                    </label>
                    <input
                      className="visually-hidden contact-form__pill-input"
                      type="radio"
                      id="ContactForm-template--27949758873702__main-topic-5"
                      name="contact[Topic]"
                      value="Others"
                    />{" "}
                    <label className="contact-form__pill" htmlFor="ContactForm-template--27949758873702__main-topic-5">
                      Others
                    </label>
                  </div>{" "}
                </fieldset>
                <div className="contact-form__fields">
                  {" "}
                  <div className="contact-form__field">
                    {" "}
                    <label
                      className="contact-form__label"
                      htmlFor="ContactForm-template--27949758873702__main-first-name"
                    >
                      First name
                    </label>{" "}
                    <input
                      className="contact-form__input"
                      type="text"
                      id="ContactForm-template--27949758873702__main-first-name"
                      name="contact[First name]"
                      defaultValue=""
                      placeholder="First name"
                      autoComplete="given-name"
                      required
                      data-validate=""
                    />{" "}
                    <p
                      className="contact-form__error"
                      id="ContactForm-template--27949758873702__main-first-name-error"
                      data-missing="Enter your first name."
                      hidden
                    ></p>{" "}
                  </div>{" "}
                  <div className="contact-form__field">
                    {" "}
                    <label
                      className="contact-form__label"
                      htmlFor="ContactForm-template--27949758873702__main-last-name"
                    >
                      Last name
                    </label>{" "}
                    <input
                      className="contact-form__input"
                      type="text"
                      id="ContactForm-template--27949758873702__main-last-name"
                      name="contact[Last name]"
                      defaultValue=""
                      placeholder="Last name"
                      autoComplete="family-name"
                      required
                      data-validate=""
                    />{" "}
                    <p
                      className="contact-form__error"
                      id="ContactForm-template--27949758873702__main-last-name-error"
                      data-missing="Enter your last name."
                      hidden
                    ></p>{" "}
                  </div>{" "}
                  <div className="contact-form__field">
                    {" "}
                    <label className="contact-form__label" htmlFor="ContactForm-template--27949758873702__main-email">
                      Email address
                    </label>{" "}
                    <input
                      className="contact-form__input"
                      type="email"
                      id="ContactForm-template--27949758873702__main-email"
                      name="contact[email]"
                      defaultValue=""
                      placeholder="you@example.com"
                      autoComplete="email"
                      autoCapitalize="off"
                      spellCheck={false}
                      required
                      data-validate=""
                    />{" "}
                    <p
                      className="contact-form__error"
                      id="ContactForm-template--27949758873702__main-email-error"
                      data-missing="Enter your email address."
                      data-format="Enter an email address like name@example.com."
                      hidden
                    ></p>{" "}
                  </div>
                  <div className="contact-form__field">
                    {" "}
                    <label className="contact-form__label" htmlFor="ContactForm-template--27949758873702__main-order">
                      Order number (optional)
                    </label>{" "}
                    <input
                      className="contact-form__input"
                      type="text"
                      id="ContactForm-template--27949758873702__main-order"
                      name="contact[Order number]"
                      placeholder="e.g. #1001"
                      autoComplete="off"
                    />{" "}
                  </div>
                  <div className="contact-form__field contact-form__field--full">
                    {" "}
                    <label className="contact-form__label" htmlFor="ContactForm-template--27949758873702__main-subject">
                      Subject
                    </label>{" "}
                    <input
                      className="contact-form__input"
                      type="text"
                      id="ContactForm-template--27949758873702__main-subject"
                      name="contact[Message subject]"
                      placeholder="e.g. My order hasn't arrived yet…"
                      required
                      data-validate=""
                    />{" "}
                    <p
                      className="contact-form__error"
                      id="ContactForm-template--27949758873702__main-subject-error"
                      data-missing="Enter a subject."
                      hidden
                    ></p>{" "}
                  </div>{" "}
                  <div className="contact-form__field contact-form__field--full">
                    {" "}
                    <label className="contact-form__label" htmlFor="ContactForm-template--27949758873702__main-message">
                      Your message
                    </label>{" "}
                    <textarea
                      className="contact-form__input contact-form__textarea"
                      id="ContactForm-template--27949758873702__main-message"
                      name="contact[body]"
                      rows="4"
                      placeholder="How can we help?"
                      required
                      data-validate=""
                      defaultValue=""
                    />{" "}
                    <p
                      className="contact-form__error"
                      id="ContactForm-template--27949758873702__main-message-error"
                      data-missing="Enter your message."
                      hidden
                    ></p>{" "}
                  </div>{" "}
                </div>{" "}
                <button className="button explore-button contact-form__submit" type="submit">
                  Send message
                  <span className="explore-button__icon" aria-hidden="true">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      width="19"
                      height="17"
                      viewBox="0 0 19 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.74637 10.17L1.21877 5.92233C0.209102 4.70677 0.924924 2.85391 2.4902 2.63396L15.6994 0.772328C17.3857 0.534293 18.5904 2.36346 17.7058 3.8187L10.7794 15.2198C9.95865 16.5702 7.97427 16.4969 7.25625 15.0893L4.74637 10.17ZM4.74637 10.17L10.6469 6.28386"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>{" "}
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      width="19"
                      height="17"
                      viewBox="0 0 19 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.74637 10.17L1.21877 5.92233C0.209102 4.70677 0.924924 2.85391 2.4902 2.63396L15.6994 0.772328C17.3857 0.534293 18.5904 2.36346 17.7058 3.8187L10.7794 15.2198C9.95865 16.5702 7.97427 16.4969 7.25625 15.0893L4.74637 10.17ZM4.74637 10.17L10.6469 6.28386"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>{" "}
                  </span>{" "}
                </button>{" "}
              </form>
            </contact-form>{" "}
          </div>{" "}
        </animate-on-scroll>{" "}
      </div>{" "}
    </section>
  );
}
