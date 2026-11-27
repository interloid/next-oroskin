/** Shared bits of the policy / returns / shipping / cookies sections (theme: snippets/breadcrumb.liquid, faq-contact.liquid, screen-scale.liquid). */
import type { CSSProperties } from 'react';
import Icon from '@/components/Icon';
import type { SectionCommon } from '@/sections/shared';

export interface PageScreenOptions {
  scaleScreen?: boolean;
  textScale?: number; // %
}

export function Breadcrumb({ current, className }: { current: string; className?: string }) {
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

/** Section root classes + the shared padding / text-boost variables (theme: the root div of each section). */
export function rootProps(
  cls: string,
  o: SectionCommon & PageScreenOptions,
  defaults: { top: number; bottom: number },
  vars: Record<string, string> = {},
): { className: string; style: CSSProperties } {
  const scale = o.scaleScreen ?? true;
  return {
    className: `${cls} full-width section-width--${o.width ?? 'widest'} color-${o.colorScheme ?? 'scheme-2'}${scale ? ' section--screen-scale' : ''}`,
    style: {
      '--section-padding-top': `${o.paddingTop ?? defaults.top}px`,
      '--section-padding-bottom': `${o.paddingBottom ?? defaults.bottom}px`,
      ...(scale ? { '--text-boost': String((o.textScale ?? 100) / 100) } : {}),
      ...vars,
    } as CSSProperties,
  };
}

export interface CtaCardProps {
  heading?: string;
  text?: string;
  buttonLabel?: string;
  buttonLink?: string;
  secondLabel?: string;
  secondLink?: string;
  style?: 'glass' | 'tinted';
}

/** The "Still unanswered?" / "Ready to send something back?" card (theme: snippets/faq-contact.liquid). */
export function FaqContact({
  heading,
  text,
  buttonLabel,
  buttonLink = '/pages/contact',
  secondLabel,
  secondLink = '/account',
  style = 'glass',
  className = '',
}: CtaCardProps & { className?: string }) {
  return (
    <div className={`faq-contact faq-contact--${style} ${className}`}>
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
