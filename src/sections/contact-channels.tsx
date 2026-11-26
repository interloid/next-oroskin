/**
 * Contact channels (theme: sections/contact-channels.liquid + blocks/_contact-channel.liquid): "Choose your
 * channel" cards (live chat, email, phone, WhatsApp). Each card: round icon badge, accent label, title,
 * the address / number as a link, a short text, an optional "Online now" line and a link at the bottom.
 * Links are built from the contact type like the theme: mailto:, tel:<digits>, https://wa.me/<digits>?text=.
 */
import Icon from '@/components/Icon';
import { screenClasses, screenVars, StatusDot, type ScreenOptions } from '@/components/ContactShared';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ContactChannel {
  icon?: string; // public/assets/icon-<name>.svg: chat, mail, phone, mobile, whatsapp ... ('none' = no badge)
  label?: string;
  title?: string;
  type?: 'none' | 'email' | 'phone' | 'whatsapp';
  value?: string; // the email address / phone number / WhatsApp number
  whatsappMessage?: string; // pre-filled WhatsApp text
  text?: string; // HTML
  status?: string; // e.g. "Online now" (with the pulsing dot)
  linkLabel?: string;
  link?: string; // only for type 'none'
}

export interface ContactChannelsProps extends SectionCommon, ScreenOptions {
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent word
  animation?: 'fade-up' | 'slide-left' | 'none';
  channels: ContactChannel[];
}

function channelLinks(c: ContactChannel) {
  const type = c.type ?? 'none';
  const value = type === 'none' ? '' : (c.value ?? '').trim();
  const digits = value.replace(/[\s().-]/g, '');
  let valueUrl = '';
  if (value) {
    if (type === 'email') valueUrl = `mailto:${value}`;
    else if (type === 'phone') valueUrl = `tel:${digits}`;
    else if (type === 'whatsapp') {
      valueUrl = `https://wa.me/${digits.replace(/\+/g, '')}`;
      if (c.whatsappMessage) valueUrl += `?${new URLSearchParams({ text: c.whatsappMessage })}`;
    }
  }
  const linkUrl = type === 'none' ? (c.link ?? '') : valueUrl;
  return { type, value, valueUrl, linkUrl, newTab: type === 'whatsapp' };
}

export default function ContactChannels({
  id,
  context,
  eyebrow,
  heading,
  animation = 'fade-up',
  channels,
  fillScreen,
  scaleScreen,
  textBoost,
  ...common
}: ContactChannelsProps & { id: string; context?: PageContext }) {
  const anim = (context?.index ?? 0) === 0 ? 'none' : animation;
  const cards = (channels ?? []).filter((c) => {
    const { value, linkUrl } = channelLinks(c);
    return Boolean(c.label || c.title || c.text || c.status || value || (linkUrl && c.linkLabel));
  });
  if (!cards.length) return null;

  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`contact-channels full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${screenClasses({ fillScreen, scaleScreen })}`}
        style={sectionStyle(
          { paddingTop: common.paddingTop ?? 96, paddingBottom: common.paddingBottom ?? 96 },
          screenVars({ scaleScreen, textBoost }),
        )}
      >
        <animate-on-scroll className="contact-channels__inner">
          {eyebrow || heading ? (
            <div className="contact-channels__header" {...(anim !== 'none' ? { 'data-animate': 'slide-left' } : {})}>
              {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
              {heading ? <h2 className="h1 contact-channels__heading" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
            </div>
          ) : null}
          {!heading ? <h2 className="visually-hidden">{eyebrow || 'Ways to reach us'}</h2> : null}
          <div className="contact-channels__grid">
            {cards.map((c, i) => {
              const { type, value, valueUrl, linkUrl, newTab } = channelLinks(c);
              const tab = newTab ? { target: '_blank', rel: 'noopener' } : {};
              const icon = c.icon ?? 'chat';
              return (
                <div className="contact-channel" {...(anim !== 'none' ? { 'data-animate': anim } : {})} key={i}>
                  {icon !== 'none' ? (
                    <span className="contact-channel__badge">
                      <Icon name={icon} />
                    </span>
                  ) : null}
                  {c.label ? <p className="contact-channel__label">{c.label}</p> : null}
                  {c.title ? <h3 className="contact-channel__title">{c.title}</h3> : null}
                  {value ? (
                    <p className={`contact-channel__value contact-channel__value--${type}`}>
                      <a href={valueUrl} {...tab}>
                        {value}
                      </a>
                    </p>
                  ) : null}
                  {c.text ? <div className="contact-channel__text rte" dangerouslySetInnerHTML={{ __html: c.text }} /> : null}
                  {c.status ? (
                    <p className="contact-channel__status">
                      <StatusDot />
                      {c.status}
                    </p>
                  ) : null}
                  {linkUrl && c.linkLabel ? (
                    <p className="contact-channel__footer">
                      <a className="contact-channel__link" href={linkUrl} {...tab}>
                        {c.linkLabel}
                        {newTab ? <span className="visually-hidden"> (opens in a new window)</span> : null}
                        <Icon name="arrow" />
                      </a>
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </animate-on-scroll>
      </div>
    </div>
  );
}
