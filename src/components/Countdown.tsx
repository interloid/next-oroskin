/**
 * Countdown (theme: blocks/countdown.liquid): days / hours / minutes / seconds to an end time. The first
 * numbers come from the server; <countdown-timer> (theme JS) ticks each second and shows the pause button.
 */
export interface CountdownProps {
  end: string; // ISO date with offset, e.g. "2026-12-31T23:59:00+05:30"
  timeZone?: string; // for the screen reader sentence; default the store's (Asia/Kolkata)
  showSeconds?: boolean;
  onEnd?: 'hide' | 'zeros' | 'message';
  message?: string; // shown when onEnd = 'message'
  alignment?: 'start' | 'center' | 'end';
  mobileAlignment?: 'start' | 'center' | 'end';
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function Countdown({
  end,
  timeZone = 'Asia/Kolkata',
  showSeconds = true,
  onEnd = 'hide',
  message,
  alignment = 'end',
  mobileAlignment = 'start',
}: CountdownProps) {
  const endMs = Date.parse(end);
  if (Number.isNaN(endMs)) return null;
  const endEpoch = Math.floor(endMs / 1000);
  const remaining = Math.max(0, endEpoch - Math.floor(Date.now() / 1000));
  const ended = remaining === 0;
  if (ended && onEnd === 'hide') return null;
  const showMessage = ended && onEnd === 'message';

  const values: [string, string, number][] = [
    ['days', 'Days', Math.floor(remaining / 86400)],
    ['hours', 'Hours', Math.floor((remaining % 86400) / 3600)],
    ['minutes', 'Minutes', Math.floor((remaining % 3600) / 60)],
  ];
  if (showSeconds) values.push(['seconds', 'Seconds', remaining % 60]);

  const d = new Date(endMs);
  const date = d.toLocaleDateString('en-US', { timeZone, month: 'long', day: 'numeric', year: 'numeric' });
  const time = d
    .toLocaleTimeString('en-US', { timeZone, hour: 'numeric', minute: '2-digit', hour12: true })
    .toLowerCase();

  return (
    <countdown-timer
      className={`countdown countdown--${alignment} countdown--mobile-${mobileAlignment}`}
      data-end={String(endEpoch)}
      data-on-end={onEnd}
    >
      <p className="visually-hidden">{`Offer ends ${date} at ${time}`}</p>
      <div className="countdown__row" hidden={showMessage}>
        <div className="countdown__units" aria-hidden="true">
          {values.map(([unit, label, value], i) => (
            <Unit key={unit} first={i === 0} unit={unit} label={label} value={pad(value)} />
          ))}
        </div>
        {!ended ? (
          <button type="button" className="countdown__pause" aria-pressed="false" hidden>
            <span className="visually-hidden">Pause countdown</span>
            <svg
              className="countdown__pause-icon countdown__pause-icon--pause"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 16 16"
            >
              <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
              <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
            </svg>
            <svg
              className="countdown__pause-icon countdown__pause-icon--play"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        ) : null}
      </div>
      {onEnd === 'message' && message ? (
        <p className="countdown__message" hidden={!showMessage}>
          {message}
        </p>
      ) : null}
    </countdown-timer>
  );
}

function Unit({ first, unit, label, value }: { first: boolean; unit: string; label: string; value: string }) {
  return (
    <>
      {first ? null : <span className="countdown__colon">:</span>}
      <div className="countdown__unit">
        <span className="countdown__value" data-unit={unit}>
          {value}
        </span>
        <span className="countdown__label">{label}</span>
      </div>
    </>
  );
}
