/**
 * The theme's shared content blocks (blocks/heading.liquid, text.liquid, button.liquid) as data-driven
 * components, for sections that hold "any theme blocks" (Image banner content, ...). Server components.
 */
import Icon from '@/components/Icon';

/** Liquid prints a float result with ".0" (43.0); integers from integer maths print bare. */
export function liquidFloat(v: number) {
  return Number.isInteger(v) ? v.toFixed(1) : String(v);
}

/** snippets/fluid-font-size.liquid: the size at 1920px, shrinking to half + 7px at 390px. */
export function fluidFontSize(size: number): Record<string, string> {
  const min = Math.min(size * 0.5 + 7, size);
  return { '--fs-max': `${size}px`, '--fs-min': `${liquidFloat(min)}px`, '--fs-diff': liquidFloat(size - min) };
}

export interface HeadingBlockData {
  type: 'heading';
  html: string; // inline HTML: <em> words show in the accent colour with italic: 'accent'
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  font?: 'heading-font' | 'body-font';
  color?: 'default' | 'accent';
  align?: 'left' | 'center' | 'right';
  italic?: 'accent' | 'default';
  indent?: number;
  customSize?: number; // px at 1920px wide
}

export interface TextBlockData {
  type: 'text';
  html: string; // rich text (<p>...)
  style?: 'body' | 'body-lg' | 'body-sm' | 'eyebrow';
  font?: 'body-font' | 'heading-font';
  color?: 'default' | 'accent';
  align?: 'left' | 'center' | 'right';
  maxWidth?: string; // CSS length or "none"
  customSize?: number;
  hideOnPhones?: boolean;
}

export interface ButtonBlockData {
  type: 'button';
  label: string;
  link?: string;
  style?: 'primary' | 'secondary' | 'text' | 'glass' | 'explore';
  align?: 'left' | 'center' | 'right';
  arrow?: boolean;
  newTab?: boolean;
}

export type ContentBlockData = HeadingBlockData | TextBlockData | ButtonBlockData;

export function HeadingBlock({ b }: { b: HeadingBlockData }) {
  if (!b.html) return null;
  const Tag = (b.tag ?? 'h2') as 'h2';
  const cls = [
    'heading',
    `heading--${b.size ?? 'h2'}`,
    `heading--${b.font ?? 'heading-font'}`,
    `heading--${b.color ?? 'default'}`,
    `heading--align-${b.align ?? 'left'}`,
    `heading--italic-${b.italic ?? 'accent'}`,
    b.customSize ? 'heading--custom-size' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const style = { '--heading-indent': String(b.indent ?? 0), ...(b.customSize ? fluidFontSize(b.customSize) : {}) };
  return <Tag className={cls} style={style as React.CSSProperties} dangerouslySetInnerHTML={{ __html: b.html }} />;
}

export function TextBlock({ b }: { b: TextBlockData }) {
  const cls = [
    'text rte',
    `text--${b.style ?? 'body'}`,
    `text--${b.font ?? 'body-font'}`,
    `text--${b.color ?? 'default'}`,
    `text--align-${b.align ?? 'left'}`,
    b.customSize ? 'text--custom-size' : '',
    b.hideOnPhones ? 'text--hide-phones' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const style = { '--text-max-width': b.maxWidth ?? 'none', ...(b.customSize ? fluidFontSize(b.customSize) : {}) };
  return <div className={cls} style={style as React.CSSProperties} dangerouslySetInnerHTML={{ __html: b.html }} />;
}

export function ButtonBlock({ b }: { b: ButtonBlockData }) {
  if (!b.label) return null;
  const align = `button-block button-block--${b.align ?? 'left'}`;
  const linkProps = b.link
    ? { href: b.link, ...(b.newTab ? { target: '_blank', rel: 'noopener' } : {}) }
    : { role: 'link', 'aria-disabled': true as const };
  const newTab = b.newTab && b.link ? <span className="visually-hidden"> (opens in a new window)</span> : null;
  if (b.style === 'explore') {
    return (
      <a className={`button explore-button ${align}`} {...linkProps}>
        {b.label}
        {newTab}
        <span className="explore-button__icon" aria-hidden="true">
          <Icon name="send" />
          <Icon name="send" />
        </span>
      </a>
    );
  }
  const styleClass = b.style && b.style !== 'primary' ? ` button--${b.style}` : '';
  return (
    <a className={`button${styleClass} ${align}`} {...linkProps}>
      {b.label}
      {newTab}
      {b.arrow ? (
        <span className="button-block__icon">
          <Icon name="arrow" />
        </span>
      ) : null}
    </a>
  );
}

/** Renders a list of content blocks in order. */
export default function ContentBlocks({ blocks }: { blocks: ContentBlockData[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        b.type === 'heading' ? (
          <HeadingBlock b={b} key={i} />
        ) : b.type === 'text' ? (
          <TextBlock b={b} key={i} />
        ) : (
          <ButtonBlock b={b} key={i} />
        ),
      )}
    </>
  );
}
