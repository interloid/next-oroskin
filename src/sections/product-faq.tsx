/**
 * Product FAQ: questions and answers as chat bubbles (FAQPage microdata) beside a "Didn't find your answer?"
 * contact form card (theme: sections/product-faq.liquid). A Product tabs panel.
 * The form posts to /api/contact (theme: Shopify's /contact form, field names kept: contact[...]).
 * After a send, the backend redirects back with ?contact_posted=true (shows the success message).
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ProductFaqProps extends SectionCommon {
  anchor?: string;
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  /** Answer = HTML */
  questions?: { question: string; answer: string }[];
  showForm?: boolean;
  formLabel?: string;
  formHeading?: string;
  /** Pale tint behind the section */
  tint?: boolean;
  /** The doodles (chat outline, question marks) */
  decorations?: boolean;
}

export default function ProductFaq({
  id,
  context,
  anchor = 'faq',
  eyebrow,
  heading,
  questions = [],
  showForm = true,
  formLabel = 'Ask us anything',
  formHeading = "Didn't find your answer?",
  tint = true,
  decorations = true,
  ...common
}: ProductFaqProps & { id: string; context?: PageContext }) {
  const list = questions.filter((q) => q.question && q.answer);
  if (!list.length && !showForm) return null;
  const formId = `ProductFaqForm-${id}`;
  const groupName = `product-faq-${id}`;
  const layoutClass = !list.length ? ' product-faq__layout--form-only' : !showForm ? ' product-faq__layout--chat-only' : '';
  const posted = context?.searchParams?.contact_posted === 'true';
  const product = context?.product;

  return (
    <section id={`section-${id}`} className="shopify-section">
      <product-faq
        id={anchor}
        className={`product-faq full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${tint ? ' product-faq--tint' : ''}`}
        style={sectionStyle({ paddingTop: 64, paddingBottom: 64, ...common })}
      >
        <div className="product-faq__inner">
          {decorations ? (
            <div
              className="product-faq__decor"
              aria-hidden="true"
              style={
                {
                  '--doodle-chat': 'url(/assets/faq-doodle-chat.png)',
                  '--doodle-bubble': 'url(/assets/faq-doodle-bubble.png)',
                  '--doodle-questions': 'url(/assets/faq-doodle-questions.png)',
                  '--doodle-question': 'url(/assets/faq-doodle-question.png)',
                } as React.CSSProperties
              }
            >
              <span className="product-faq__doodle product-faq__doodle--chat"></span>
              <span className="product-faq__doodle product-faq__doodle--bubble"></span>
              <span className="product-faq__doodle product-faq__doodle--questions"></span>
              <span className="product-faq__doodle product-faq__doodle--pale"></span>
              <span className="product-faq__doodle product-faq__doodle--pale-small"></span>
              <span className="product-faq__doodle product-faq__doodle--white"></span>
            </div>
          ) : null}

          <div className="product-faq__intro" data-tab-item="">
            {eyebrow ? (
              heading ? (
                <p className="eyebrow eyebrow--center">{eyebrow}</p>
              ) : (
                <h2 className="eyebrow eyebrow--center product-faq__eyebrow-heading">{eyebrow}</h2>
              )
            ) : null}
            {heading ? (
              <h2 className="product-faq__heading" dangerouslySetInnerHTML={{ __html: heading }} />
            ) : !eyebrow ? (
              <h2 className="visually-hidden">Questions and answers</h2>
            ) : null}
          </div>

          <div className={`product-faq__layout${layoutClass}`}>
            {list.length ? (
              <div className="product-faq__chat" itemScope itemType="https://schema.org/FAQPage" data-tab-item="">
                {list.map((q, i) => (
                  <details
                    className="product-faq__item"
                    {...{ name: groupName }}
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                    open={i === 0}
                    key={i}
                  >
                    <summary className="product-faq__question">
                      <span itemProp="name">{q.question}</span>
                    </summary>
                    <div
                      className="product-faq__answer"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <div className="product-faq__answer-text" itemProp="text" dangerouslySetInnerHTML={{ __html: q.answer }} />
                    </div>
                  </details>
                ))}
              </div>
            ) : null}

            {showForm ? (
              <div className="product-faq__card" data-tab-item="">
                {formLabel ? <p className="product-faq__label">{formLabel}</p> : null}
                {formHeading ? <h3 className="product-faq__card-heading">{formHeading}</h3> : null}
                <form method="post" action="/api/contact" id={formId} acceptCharset="UTF-8" className="product-faq__form">
                  <input type="hidden" name="form_type" value="contact" />
                  <input type="hidden" name="utf8" value="✓" />
                  {posted ? (
                    <p
                      className="form-message form-message--success"
                      id={`${formId}-success`}
                      tabIndex={-1}
                      data-focus-after-submit=""
                    >
                      Thanks for reaching out. We&apos;ll get back to you as soon as possible.
                    </p>
                  ) : null}
                  {product ? <input type="hidden" name="contact[Product]" value={product.title} /> : null}
                  <div className="product-faq__pair">
                    <div className="product-faq__field">
                      <label className="product-faq__field-label" htmlFor={`${formId}-name`}>
                        Name
                      </label>
                      <input
                        className="product-faq__input"
                        type="text"
                        id={`${formId}-name`}
                        name="contact[Name]"
                        defaultValue=""
                        placeholder=" "
                        autoComplete="name"
                      />
                    </div>
                    <div className="product-faq__field">
                      <label className="product-faq__field-label" htmlFor={`${formId}-email`}>
                        Email
                      </label>
                      <input
                        className="product-faq__input"
                        type="email"
                        id={`${formId}-email`}
                        name="contact[email]"
                        defaultValue=""
                        placeholder=" "
                        autoComplete="email"
                        autoCapitalize="off"
                        spellCheck={false}
                        required
                      />
                    </div>
                  </div>
                  <div className="product-faq__field product-faq__field--message">
                    <label className="product-faq__field-label" htmlFor={`${formId}-message`}>
                      Message
                    </label>
                    <textarea
                      className="product-faq__input product-faq__textarea"
                      id={`${formId}-message`}
                      name="contact[body]"
                      rows={3}
                      placeholder=" "
                      required
                      defaultValue=""
                    />
                  </div>
                  <button className="button explore-button product-faq__submit" type="submit">
                    Send message
                    <span className="explore-button__icon" aria-hidden="true">
                      <Icon name="send" />
                      <Icon name="send" />
                    </span>
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </product-faq>
    </section>
  );
}
