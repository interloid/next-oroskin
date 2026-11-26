/**
 * FAQ page (theme: sections/faq.liquid + blocks/_faq-topic.liquid, blocks/_faq-question.liquid,
 * snippets/faq-contact.liquid, snippets/breadcrumb.liquid).
 * One section, three views, switched by the theme script <faq-page> (public/theme.js):
 * - overview: breadcrumb, eyebrow, H1, intro, search, the topic cards;
 * - topic (#handle in the URL): pills (built by the script), the topic's questions and the answer card;
 * - results (typing in the search): every matching question across the topics.
 * The script reads the markup only: [data-faq-topic] (data-handle / data-title), .faq-topic__panel,
 * [data-faq-card], [data-faq-question] (.faq-question__text, [itemprop="text"]), [data-faq-pills], ...
 * Without JS: the cards, then every topic with its questions as <details> rows.
 * Microdata: FAQPage on the section (only with a question), each question a Question + Answer.
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface FaqQuestion {
  question: string;
  answer: string; // HTML
}

export interface FaqTopic {
  /** Stable id for the heading / answer card ids (default: the handle). */
  id?: string;
  title: string;
  /** URL hash of the topic view (default: the title, handleized). */
  handle?: string;
  text?: string;
  /** icon name from public/assets/icon-<name>.svg: box, account, returns, card, bottle, ... ('none' = no icon) */
  icon?: string;
  /** Custom icon image (keeps its own colours), instead of `icon`. */
  iconImage?: string;
  questions: FaqQuestion[];
}

export interface FaqContact {
  heading?: string;
  text?: string;
  buttonLabel?: string;
  buttonLink?: string;
  secondLabel?: string;
  secondLink?: string;
}

export interface FaqProps extends SectionCommon {
  showBreadcrumb?: boolean;
  /** Current item of the breadcrumb (the page title). */
  pageTitle?: string;
  eyebrow?: string;
  heading?: string; // HTML (inline: <em> = accent word)
  text?: string; // HTML
  /** "Ask human" link in the answer card ('' = no button). */
  askLink?: string;
  questionRadius?: number; // px
  scaleScreen?: boolean;
  textScale?: number; // %
  fillScreen?: boolean;
  topics: FaqTopic[];
  /** "Still unanswered?" card; null = no card. */
  contact?: FaqContact | null;
}

const handleize = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

function Breadcrumb({ current, className }: { current: string; className?: string }) {
  return (
    <nav className={`breadcrumb${className ? ` ${className}` : ''}`} aria-label="Breadcrumb">
      <ol>
        <li>
          <a href="/">Home</a>
        </li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

function FaqContactCard({
  heading,
  text,
  buttonLabel,
  buttonLink = '/pages/contact',
  secondLabel,
  secondLink = '/account',
}: FaqContact) {
  return (
    <div className="faq-contact faq-contact--glass ">
      <div className="faq-contact__card">
        <div className="faq-contact__copy">
          {heading ? <h2 className="faq-contact__heading">{heading}</h2> : null}
          {text ? <p className="faq-contact__text">{text}</p> : null}
        </div>
        <div className="faq-contact__actions">
          {buttonLabel ? (
            <a className="button faq-contact__button" href={buttonLink}>
              {buttonLabel}
              <span className="faq-contact__icon" aria-hidden="true">
                <Icon name="send" />
              </span>
            </a>
          ) : null}
          {secondLabel ? (
            <a className="button button--secondary faq-contact__second" href={secondLink}>
              {secondLabel}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function TopicIcon({ topic }: { topic: FaqTopic }) {
  if (topic.iconImage) {
    return (
      <span className="faq-topic__icon faq-topic__icon--image" aria-hidden="true">
        <img src={topic.iconImage} alt="" width={80} height={80} sizes="20px" loading="lazy" />
      </span>
    );
  }
  const icon = topic.icon ?? 'box';
  if (icon === 'none') return null;
  return (
    <span className="faq-topic__icon" aria-hidden="true">
      <Icon name={icon} />
    </span>
  );
}

export default function Faq({
  id,
  showBreadcrumb = true,
  pageTitle = 'FAQ',
  eyebrow,
  heading,
  text,
  askLink = '/pages/contact',
  questionRadius = 19,
  scaleScreen = true,
  textScale = 110,
  fillScreen = true,
  topics = [],
  contact,
  ...common
}: FaqProps & { id: string; context?: PageContext }) {
  // A question shows only with a question AND an answer; a topic with none shows nothing.
  const shown = topics
    .map((t) => ({ ...t, questions: (t.questions ?? []).filter((q) => q.question && q.answer) }))
    .filter((t) => t.questions.length > 0);
  const hasQuestions = shown.length > 0;

  return (
    <section id={`shopify-section-${id}`} className="shopify-section">
      <faq-page
        className={`faq full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${scaleScreen ? ' section--screen-scale' : ''}${fillScreen ? ' section--fill-screen' : ''}`}
        style={sectionStyle(
          { paddingTop: 24, ...common },
          {
            ...(scaleScreen ? { '--text-boost': String(textScale / 100) } : {}),
            '--faq-row-radius': `${questionRadius}px`,
          },
        )}
        data-view="overview"
        data-label-count-one="[count] answer"
        data-label-count-other="[count] answers"
        data-label-results="Results for “[query]”"
        data-label-all="All subjects"
        data-label-thanks="Thank you, we’re glad it helped."
        data-label-no-results="No answers found. Try another word, or write to us below."
        {...(hasQuestions ? { itemScope: true, itemType: 'https://schema.org/FAQPage' } : {})}
      >
        <div className="faq__inner">
          {showBreadcrumb ? <Breadcrumb current={pageTitle} className="faq__breadcrumb" /> : null}

          {/* Topic pills: built by the script from the topics (shown in the topic view) */}
          <nav className="faq__pills" aria-label="FAQ topics" hidden>
            <span className="faq__pill-arrow" hidden>
              <Icon name="arrow" />
            </span>
            <ul className="faq__pills-list" role="list" data-faq-pills=""></ul>
          </nav>

          <div className="faq__intro">
            {eyebrow ? <p className="eyebrow eyebrow--center faq__eyebrow">{eyebrow}</p> : null}
            {heading ? (
              <h1 className="faq__heading" dangerouslySetInnerHTML={{ __html: heading }} />
            ) : (
              <h1 className="faq__heading">{pageTitle}</h1>
            )}
            {text ? <div className="faq__text" dangerouslySetInnerHTML={{ __html: text }} /> : null}

            <form className="faq__search" role="search" data-faq-search="">
              <label className="visually-hidden" htmlFor={`FaqSearch-${id}`}>
                Search the questions
              </label>
              <input
                className="faq__search-input"
                id={`FaqSearch-${id}`}
                type="search"
                name="q"
                autoComplete="off"
                placeholder="What are you looking for?"
              />
              <span className="faq__search-icon" aria-hidden="true">
                <Icon name="search" />
              </span>
              <button type="button" className="faq__search-clear" data-faq-search-clear="" hidden>
                <span className="visually-hidden">Clear the search</span>
                <Icon name="close" />
              </button>
            </form>
          </div>

          {/* Search results: filled by the script */}
          <div className="faq__results" data-faq-results="" hidden>
            <div className="faq__results-head">
              <h2 className="faq__results-title" data-faq-results-title="" tabIndex={-1}></h2>
              <p className="faq__results-count" data-faq-results-count=""></p>
            </div>
            <ul className="faq__results-list" role="list" data-faq-results-list=""></ul>
            <p className="faq__results-empty" data-faq-results-empty="" hidden>
              No answers found. Try another word, or write to us below.
            </p>
          </div>
          <p className="visually-hidden" role="status" data-faq-status=""></p>

          {hasQuestions ? (
            <div className="faq__topics">
              {shown.map((topic) => {
                const handle = topic.handle || handleize(topic.title);
                const key = topic.id || handle;
                const headingId = `FaqTopic-${id}__${key}`;
                const count = topic.questions.length;
                return (
                  <div
                    className="faq-topic"
                    data-faq-topic=""
                    data-handle={handle}
                    data-title={topic.title}
                    key={key}
                  >
                    <a className="faq-topic__card" href={`#${handle}`}>
                      <span className="faq-topic__number" aria-hidden="true"></span>
                      <TopicIcon topic={topic} />
                      <span className="faq-topic__title">{topic.title}</span>
                      {topic.text ? <span className="faq-topic__text">{topic.text}</span> : null}
                      <span className="faq-topic__footer">
                        <span className="faq-topic__count">
                          {count} {count === 1 ? 'answer' : 'answers'}
                        </span>
                        <span className="faq-topic__arrow" aria-hidden="true">
                          <Icon name="arrow-solid" />
                        </span>
                      </span>
                    </a>

                    <section className="faq-topic__panel" id={handle} aria-labelledby={headingId}>
                      <header className="faq-topic__head">
                        <TopicIcon topic={topic} />
                        <div>
                          <h2 className="faq-topic__heading" id={headingId}>
                            {topic.title}
                          </h2>
                          {topic.text ? <p className="faq-topic__line">{topic.text}</p> : null}
                        </div>
                      </header>

                      <div className="faq-topic__list">
                        {topic.questions.map((q, i) => (
                          <div
                            className="faq-question"
                            data-faq-question=""
                            itemScope
                            itemProp="mainEntity"
                            itemType="https://schema.org/Question"
                            key={i}
                          >
                            <details className="faq-question__details">
                              <summary className="faq-question__row">
                                <span className="faq-question__number" aria-hidden="true"></span>
                                <span className="faq-question__text" itemProp="name">
                                  {q.question}
                                </span>
                              </summary>
                              <div
                                className="faq-question__answer"
                                data-faq-answer=""
                                itemScope
                                itemProp="acceptedAnswer"
                                itemType="https://schema.org/Answer"
                              >
                                <div itemProp="text" dangerouslySetInnerHTML={{ __html: q.answer }} />
                              </div>
                            </details>
                          </div>
                        ))}
                      </div>

                      {/* Filled by the script with the chosen question; hidden without JS */}
                      <div className="faq-answer" id={`FaqAnswer-${id}__${key}`} data-faq-card="">
                        <span className="faq-answer__number" data-faq-card-number="" aria-hidden="true"></span>
                        <p className="faq-answer__label">{topic.title}</p>
                        <h3 className="faq-answer__question" data-faq-card-question="" tabIndex={-1}></h3>
                        <span className="faq-answer__rule" aria-hidden="true"></span>
                        <div className="faq-answer__text" data-faq-card-answer=""></div>
                        <div className="faq-answer__footer" data-faq-feedback="">
                          <p className="faq-answer__ask">Did this answer help?</p>
                          <button type="button" className="button button--secondary faq-answer__yes" data-faq-yes="">
                            Yes
                          </button>
                          {askLink ? (
                            <a className="button faq-answer__human" href={askLink}>
                              Ask human
                            </a>
                          ) : null}
                        </div>
                        <p className="faq-answer__thanks" data-faq-thanks="" role="status"></p>
                      </div>
                    </section>
                  </div>
                );
              })}
            </div>
          ) : null}

          {contact ? <FaqContactCard {...contact} /> : null}
        </div>
      </faq-page>
    </section>
  );
}
