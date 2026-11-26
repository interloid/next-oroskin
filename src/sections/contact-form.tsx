/**
 * Contact (theme: sections/contact-form.liquid): breadcrumb, intro (eyebrow, H1, text, round photo with the
 * stat circle and the live support box) and the "Send a message" form.
 * <contact-form> (theme JS) validates the fields (novalidate + the red error lines from data-missing /
 * data-format) and keeps typed values in sessionStorage. The form posts natively (no fetch) to /api/contact.
 * After the post, the backend should redirect to `?contact_posted=true#ContactForm-<id>` (Shopify's way)
 * or `?contact_error=<message>#ContactForm-<id>`: the message then shows and gets the focus.
 */
import Icon from '@/components/Icon';
import { screenClasses, screenVars, StatusDot, type ScreenOptions } from '@/components/ContactShared';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ContactFormProps extends SectionCommon, ScreenOptions {
  showBreadcrumb?: boolean;
  breadcrumbTitle?: string;
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent words
  text?: string; // HTML
  image?: { src: string; width?: number; height?: number; alt?: string };
  statValue?: string;
  statLabel?: string;
  supportTitle?: string;
  supportHours?: string;
  formHeading?: string;
  topics?: string[];
  showOrderNumber?: boolean;
  animation?: 'fade-up' | 'slide-left' | 'none';
  action?: string; // form endpoint
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default function ContactForm({
  id,
  context,
  showBreadcrumb = true,
  breadcrumbTitle = 'Contact',
  eyebrow,
  heading = 'Contact',
  text,
  image,
  statValue,
  statLabel,
  supportTitle,
  supportHours,
  formHeading = 'Send a message',
  topics = [],
  showOrderNumber = true,
  animation = 'fade-up',
  action = '/api/contact',
  fillScreen,
  scaleScreen,
  textBoost,
  ...common
}: ContactFormProps & { id: string; context?: PageContext }) {
  const first = (context?.index ?? 0) === 0;
  const anim = first ? 'none' : animation;
  const formId = `ContactForm-${id}`;
  const posted = one(context?.searchParams?.contact_posted) === 'true';
  const error = one(context?.searchParams?.contact_error);
  const hasStat = Boolean(statValue || statLabel);
  const hasSupport = Boolean(supportTitle || supportHours);
  const topicList = topics.map((t) => t.trim()).filter(Boolean);

  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`contact full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${screenClasses({ fillScreen, scaleScreen })}`}
        style={sectionStyle(
          { paddingTop: common.paddingTop ?? 40, paddingBottom: common.paddingBottom ?? 96 },
          screenVars({ scaleScreen, textBoost }),
        )}
      >
        <animate-on-scroll className="contact__inner">
          {showBreadcrumb ? (
            <nav className="breadcrumb contact__breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li>
                  <a href="/">Home</a>
                </li>
                <li aria-current="page">{breadcrumbTitle}</li>
              </ol>
            </nav>
          ) : null}
          <div className="contact__grid">
            <div className="contact__intro" {...(anim !== 'none' ? { 'data-animate': anim } : {})}>
              {eyebrow ? <p className="eyebrow contact__eyebrow">{eyebrow}</p> : null}
              <h1 className="contact__heading" dangerouslySetInnerHTML={{ __html: heading }} />
              {text ? <div className="contact__text rte" dangerouslySetInnerHTML={{ __html: text }} /> : null}
              {image || hasStat || hasSupport ? (
                <div className={`contact__media${image ? '' : ' contact__media--no-photo'}`}>
                  {image ? (
                    <div className="image contact__photo image--cover">
                      {/* Decorative (the heading says what the page is); not the LCP, so no high priority */}
                      <img
                        src={image.src}
                        alt=""
                        width={image.width ?? 960}
                        height={image.height ?? 960}
                        loading={first ? 'eager' : 'lazy'}
                        sizes="(min-width: 1200px) min(20vw, 36rem), (min-width: 750px) 12rem, (min-width: 375px) 6rem, 9rem"
                        fetchPriority="auto"
                      />
                    </div>
                  ) : null}
                  {hasStat ? (
                    <p className="contact__stat">
                      {statValue ? <span className="contact__stat-value">{statValue}</span> : null}
                      {statLabel ? <span className="contact__stat-label">{statLabel}</span> : null}
                    </p>
                  ) : null}
                  {hasSupport ? (
                    <div className="contact__support">
                      <StatusDot />
                      <p className="contact__support-text">
                        {supportTitle ? <span className="contact__support-title">{supportTitle}</span> : null}
                        {supportHours ? <span className="contact__support-hours">{supportHours}</span> : null}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <contact-form
              className="contact-form"
              {...(anim !== 'none' ? { 'data-animate': anim, style: { '--animate-delay': '150ms' } as React.CSSProperties } : {})}
            >
              {formHeading ? <h2 className="h3 contact-form__title">{formHeading}</h2> : null}
              <form method="post" action={`${action}#${formId}`} id={formId} acceptCharset="UTF-8" className="contact-form__form">
                <input type="hidden" name="form_type" value="contact" />
                <input type="hidden" name="utf8" value="✓" />
                {posted ? (
                  <p
                    className="form-message form-message--success contact-form__message"
                    id={`${formId}-success`}
                    tabIndex={-1}
                    data-focus-after-submit=""
                  >
                    Thanks for reaching out. We&apos;ll get back to you as soon as possible.
                  </p>
                ) : error ? (
                  <div
                    className="form-message form-message--error contact-form__message"
                    id={`${formId}-error`}
                    tabIndex={-1}
                    data-focus-after-submit=""
                  >
                    {error}
                  </div>
                ) : null}
                {topicList.length ? (
                  <fieldset className="contact-form__topics">
                    <legend className="contact-form__label">Topic</legend>
                    <div className="contact-form__pills">
                      {topicList.map((topic, i) => (
                        <TopicPill key={i} id={`${formId}-topic-${i + 1}`} label={topic} />
                      ))}
                    </div>
                  </fieldset>
                ) : null}
                <div className="contact-form__fields">
                  <TextField formId={formId} part="first-name" label="First name" name="contact[First name]" autoComplete="given-name" missing="Enter your first name." />
                  <TextField formId={formId} part="last-name" label="Last name" name="contact[Last name]" autoComplete="family-name" missing="Enter your last name." />
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor={`${formId}-email`}>
                      Email address
                    </label>
                    <input
                      className="contact-form__input"
                      type="email"
                      id={`${formId}-email`}
                      name="contact[email]"
                      defaultValue=""
                      placeholder="you@example.com"
                      autoComplete="email"
                      autoCapitalize="off"
                      spellCheck={false}
                      required
                      data-validate=""
                    />
                    <p
                      className="contact-form__error"
                      id={`${formId}-email-error`}
                      data-missing="Enter your email address."
                      data-format="Enter an email address like name@example.com."
                      hidden
                    ></p>
                  </div>
                  {showOrderNumber ? (
                    <div className="contact-form__field">
                      <label className="contact-form__label" htmlFor={`${formId}-order`}>
                        Order number (optional)
                      </label>
                      <input
                        className="contact-form__input"
                        type="text"
                        id={`${formId}-order`}
                        name="contact[Order number]"
                        placeholder="e.g. #1001"
                        autoComplete="off"
                      />
                    </div>
                  ) : null}
                  <div className="contact-form__field contact-form__field--full">
                    <label className="contact-form__label" htmlFor={`${formId}-subject`}>
                      Subject
                    </label>
                    <input
                      className="contact-form__input"
                      type="text"
                      id={`${formId}-subject`}
                      name="contact[Message subject]"
                      placeholder="e.g. My order hasn't arrived yet…"
                      required
                      data-validate=""
                    />
                    <p className="contact-form__error" id={`${formId}-subject-error`} data-missing="Enter a subject." hidden></p>
                  </div>
                  <div className="contact-form__field contact-form__field--full">
                    <label className="contact-form__label" htmlFor={`${formId}-message`}>
                      Your message
                    </label>
                    <textarea
                      className="contact-form__input contact-form__textarea"
                      id={`${formId}-message`}
                      name="contact[body]"
                      rows={4}
                      placeholder="How can we help?"
                      required
                      data-validate=""
                      defaultValue=""
                    ></textarea>
                    <p className="contact-form__error" id={`${formId}-message-error`} data-missing="Enter your message." hidden></p>
                  </div>
                </div>
                <button className="button explore-button contact-form__submit" type="submit">
                  Send message
                  <span className="explore-button__icon" aria-hidden="true">
                    <Icon name="send" />
                    <Icon name="send" />
                  </span>
                </button>
              </form>
            </contact-form>
          </div>
        </animate-on-scroll>
      </div>
    </div>
  );
}

function TopicPill({ id, label }: { id: string; label: string }) {
  return (
    <>
      <input className="visually-hidden contact-form__pill-input" type="radio" id={id} name="contact[Topic]" value={label} />
      <label className="contact-form__pill" htmlFor={id}>
        {label}
      </label>
    </>
  );
}

function TextField({
  formId,
  part,
  label,
  name,
  autoComplete,
  missing,
}: {
  formId: string;
  part: string;
  label: string;
  name: string;
  autoComplete: string;
  missing: string;
}) {
  return (
    <div className="contact-form__field">
      <label className="contact-form__label" htmlFor={`${formId}-${part}`}>
        {label}
      </label>
      <input
        className="contact-form__input"
        type="text"
        id={`${formId}-${part}`}
        name={name}
        defaultValue=""
        placeholder={label}
        autoComplete={autoComplete}
        required
        data-validate=""
      />
      <p className="contact-form__error" id={`${formId}-${part}-error`} data-missing={missing} hidden></p>
    </div>
  );
}
