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

  // Styles: Tailwind (tokens in src/app/globals.css). --px is set on the section root (PAGE_PX in _page-shared.tsx).
  return (
    <div className="mx-auto mb-0 mt-[max(var(--space-xl),calc(60*var(--px)))] max-w-[60rem]">
      <ul className="m-0 list-none rounded-card bg-raised p-0 shadow-raised" role="list">
        {categories.map((c) => {
          const checked = value(c);
          return (
            <li
              className="flex items-center justify-between gap-xl p-xl not-first:border-t not-first:border-line-card max-tablet:gap-md max-tablet:p-lg"
              key={c.key}
            >
              <div>
                <h2 className="m-0 font-display text-[length:max(1.25rem,calc(26*var(--px)))] font-normal">{c.title}</h2>
                {c.text ? <p className="m-0 mt-xs max-w-[40rem] text-body-sm leading-[1.6]">{c.text}</p> : null}
              </div>
              {/*
                The switch: a full-size invisible checkbox (peer) over the track; the knob is the track's ::after.
                The knob moves with inset-inline-start (3px → 27px), so it also slides the right way in RTL.
              */}
              <label className={`relative inline-block flex-none ${c.required ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                <input
                  type="checkbox"
                  role="switch"
                  className="peer absolute inset-0 m-0 size-full cursor-[inherit] opacity-0"
                  checked={checked}
                  disabled={c.required}
                  onChange={(e) => {
                    setSaved(false);
                    setOn({ ...on, [c.key]: e.target.checked });
                  }}
                />
                <span
                  className="relative block h-7 w-[3.25rem] rounded-pill bg-[color-mix(in_srgb,var(--color-foreground,#1f1f1f)_30%,transparent)] transition-[background-color] duration-200 ease-[ease] peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-brand motion-reduce:transition-none after:absolute after:start-[0.1875rem] after:top-[0.1875rem] after:size-[1.375rem] after:rounded-full after:bg-white after:shadow-[0_1px_3px_#00000033] after:transition-[inset-inline-start] after:duration-200 after:ease-[ease] after:content-[''] peer-checked:after:start-[1.6875rem] motion-reduce:after:transition-none"
                  aria-hidden="true"
                />
                <span className="visually-hidden">{c.title}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="mt-xl flex flex-wrap justify-center gap-md">
        <button type="button" className="button max-tablet:w-full" onClick={() => all(true)}>
          {acceptLabel}
        </button>
        <button type="button" className="button button--secondary max-tablet:w-full" onClick={() => all(false)}>
          {essentialLabel}
        </button>
        <button
          type="button"
          className="button button--secondary max-tablet:w-full"
          onClick={() => store(Object.fromEntries(categories.map((c) => [c.key, value(c)])))}
        >
          {saveLabel}
        </button>
      </div>
      <p className="m-0 mt-md min-h-[1.5em] text-center text-body-sm" role="status">
        {saved ? savedText : ''}
      </p>
    </div>
  );
}
