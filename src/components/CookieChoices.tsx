'use client';
import { useEffect, useState } from 'react';

export interface CookieCategory {
  key: string;
  title: string;
  text?: string;
  /** Always on, the switch is locked (Essential). */
  required?: boolean;
}

const STORAGE_KEY = 'oroskin-cookie-choices';

/** The cookie categories with a switch each; the choice is stored in localStorage on this device only. */
export default function CookieChoices({
  categories,
  acceptLabel = 'Accept all',
  essentialLabel = 'Essential only',
  saveLabel = 'Save my choices',
  savedText = 'Your choices are saved on this device.',
}: {
  categories: CookieCategory[];
  acceptLabel?: string;
  essentialLabel?: string;
  saveLabel?: string;
  savedText?: string;
}) {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOn(JSON.parse(raw));
    } catch {
      /* storage blocked: the switches simply start off */
    }
  }, []);

  const value = (c: CookieCategory) => (c.required ? true : !!on[c.key]);

  function store(next: Record<string, boolean>) {
    setOn(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setSaved(true);
  }
  const all = (v: boolean) => store(Object.fromEntries(categories.map((c) => [c.key, c.required ? true : v])));

  return (
    <div className="cookie-choices">
      <ul className="cookie-choices__list" role="list">
        {categories.map((c) => {
          const checked = value(c);
          return (
            <li className="cookie-choices__item" key={c.key}>
              <div className="cookie-choices__copy">
                <h2 className="cookie-choices__title">{c.title}</h2>
                {c.text ? <p className="cookie-choices__text">{c.text}</p> : null}
              </div>
              <label className={`cookie-switch${c.required ? ' is-locked' : ''}`}>
                <input
                  type="checkbox"
                  role="switch"
                  className="cookie-switch__input"
                  checked={checked}
                  disabled={c.required}
                  onChange={(e) => {
                    setSaved(false);
                    setOn({ ...on, [c.key]: e.target.checked });
                  }}
                />
                <span className="cookie-switch__track" aria-hidden="true" />
                <span className="visually-hidden">{c.title}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="cookie-choices__actions">
        <button type="button" className="button" onClick={() => all(true)}>
          {acceptLabel}
        </button>
        <button type="button" className="button button--secondary" onClick={() => all(false)}>
          {essentialLabel}
        </button>
        <button type="button" className="button button--secondary" onClick={() => store(Object.fromEntries(categories.map((c) => [c.key, value(c)])))}>
          {saveLabel}
        </button>
      </div>
      <p className="cookie-choices__status" role="status">
        {saved ? savedText : ''}
      </p>
    </div>
  );
}
