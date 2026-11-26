/**
 * Announcement bar: messages above the header, as a slideshow with arrows, autoplay + pause, and a close button
 * (theme: sections/announcement-bar.liquid + snippets/announcement-message.liquid). Content: site.announcement.
 * The theme's <announcement-bar> script does the slides, the marquee and the close.
 */
import type { Site } from "@/lib/types";

export interface AnnouncementBarProps {
  site: Site;
  colorScheme?: string; // default scheme-3 (red)
}

export default function AnnouncementBar({
  site,
  colorScheme = "scheme-3",
}: AnnouncementBarProps) {
  const a = site.announcement;
  const messages = a?.messages ?? [];
  if (!messages.length) return null;
  const mode = a.mode ?? "slideshow";
  const autoplay = a.autoplay ?? true;
  const shown = mode === "single" ? messages.slice(0, 1) : messages;
  const classes = [
    "announcement-bar",
    "full-width",
    `color-${colorScheme}`,
    "announcement-bar--top",
    `announcement-bar--${mode}`,
    a.uppercase === false ? "" : "announcement-bar--uppercase",
    "announcement-bar--marquee-left",
    "announcement-bar--align-center",
    "announcement-bar--font-body",
    "announcement-bar--spacing-auto",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      id="shopify-section-announcement-bar"
      className="shopify-section shopify-section-group-header-group"
    >
      <style
        dangerouslySetInnerHTML={{
          __html:
            ":root { --announcement-size: 36px; --announcement-text: 14px; }",
        }}
      />
      <announcement-bar
        className={classes}
        role="region"
        aria-label="Announcements"
        data-mode={mode}
        data-autoplay={String(autoplay)}
        data-tuck="false"
        data-interval={String((a.intervalSeconds ?? 5) * 1000)}
        data-close-key="announcement-closed-oroskin"
        data-speed="40"
      >
        <div className="announcement-bar__inner">
          {mode === "slideshow" && shown.length > 1 ? (
            <button
              type="button"
              className="announcement-bar__button announcement-bar__prev"
              data-step="-1"
            >
              <span className="visually-hidden">Previous announcement</span>
              <svg
                className="announcement-bar__arrow"
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 16 16"
                width="16"
                height="16"
              >
                <path
                  d="M13 8H3m4-4L3 8l4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : null}
          <div className="announcement-bar__messages" aria-live="off">
            {shown.map((m, i) => (
              <p
                className={`announcement-bar__message announcement-bar__scroller${i === 0 ? " is-active" : ""}`}
                tabIndex={0}
                key={i}
              >
                <span className="announcement-bar__text">
                  {m.text}
                  {m.link && m.linkLabel ? (
                    <>
                      {" "}
                      <a
                        href={m.link}
                        className="announcement-bar__link announcement-bar__link-label"
                      >
                        {m.linkLabel}
                      </a>
                    </>
                  ) : null}
                </span>
              </p>
            ))}
          </div>
          {mode === "slideshow" && shown.length > 1 ? (
            <>
              <button
                type="button"
                className="announcement-bar__button announcement-bar__next"
                data-step="1"
              >
                <span className="visually-hidden">Next announcement</span>
                <svg
                  className="announcement-bar__arrow"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="announcement-bar__button announcement-bar__pause"
                data-label-pause="Pause announcements"
                data-label-play="Play announcements"
                hidden
              >
                <span className="visually-hidden">Pause announcements</span>
                <svg
                  className="announcement-bar__icon--pause"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 16 16"
                  width="12"
                  height="12"
                >
                  <rect
                    x="3.5"
                    y="2.5"
                    width="3"
                    height="11"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="9.5"
                    y="2.5"
                    width="3"
                    height="11"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
                <svg
                  className="announcement-bar__icon--play"
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 16 16"
                  width="12"
                  height="12"
                >
                  <path
                    d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </>
          ) : null}
          <button
            type="button"
            className="announcement-bar__button announcement-bar__close"
          >
            <span className="visually-hidden">Close announcements</span>
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 16 16"
              width="12"
              height="12"
            >
              <path
                d="m4 4 8 8M12 4l-8 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </announcement-bar>
    </div>
  );
}
