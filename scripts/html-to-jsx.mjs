// Converts the rendered Shopify section HTML (reference/sections/*.html) into React server components
// (src/sections/generated/*.tsx). Output = exact markup of the theme; content is made dynamic afterwards.
import fs from 'node:fs';
import { parseDocument, DomUtils } from 'htmlparser2';
import render from 'dom-serializer';

const ATTR = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', readonly: 'readOnly', maxlength: 'maxLength',
  minlength: 'minLength', colspan: 'colSpan', rowspan: 'rowSpan', crossorigin: 'crossOrigin', srcset: 'srcSet',
  fetchpriority: 'fetchPriority', autocomplete: 'autoComplete', enctype: 'encType', 'accept-charset': 'acceptCharset',
  'http-equiv': 'httpEquiv', novalidate: 'noValidate', playsinline: 'playsInline', autoplay: 'autoPlay',
  autofocus: 'autoFocus', contenteditable: 'contentEditable', spellcheck: 'spellCheck', inputmode: 'inputMode',
  enterkeyhint: 'enterKeyHint', autocapitalize: 'autoCapitalize', autocorrect: 'autoCorrect', datetime: 'dateTime', allowfullscreen: 'allowFullScreen', frameborder: 'frameBorder',
  referrerpolicy: 'referrerPolicy', 'xlink:href': 'xlinkHref', 'xml:space': 'xmlSpace', 'xmlns:xlink': 'xmlnsXlink',
  popovertarget: 'popoverTarget', popovertargetaction: 'popoverTargetAction', formnovalidate: 'formNoValidate',
  usemap: 'useMap', accesskey: 'accessKey', cellpadding: 'cellPadding', cellspacing: 'cellSpacing',
  srclang: 'srcLang', hreflang: 'hrefLang', itemscope: 'itemScope', itemprop: 'itemProp', itemtype: 'itemType',
  disablepictureinpicture: 'disablePictureInPicture', controlslist: 'controlsList', 'stop-color': 'stopColor',
};
const BOOL = new Set(['hidden', 'disabled', 'checked', 'selected', 'multiple', 'required', 'open', 'inert', 'autoplay',
  'muted', 'loop', 'playsinline', 'controls', 'novalidate', 'readonly', 'autofocus', 'allowfullscreen', 'itemscope',
  'formnovalidate', 'default', 'reversed', 'async', 'defer', 'disablepictureinpicture']);
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const q = (v) => JSON.stringify(v);
const av = (v) => (/["\\\n{}]/.test(v) ? `{${q(v)}}` : q(v));

function styleObj(css) {
  const out = {};
  let depth = 0, cur = '';
  const parts = [];
  for (const ch of css) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ';' && depth === 0) { parts.push(cur); cur = ''; } else cur += ch;
  }
  parts.push(cur);
  for (const p of parts) {
    const i = p.indexOf(':');
    if (i < 0) continue;
    const k = p.slice(0, i).trim(); const v = p.slice(i + 1).trim();
    if (!k) continue;
    out[k.startsWith('--') ? k : camel(k.replace(/^-ms-/, 'ms-'))] = v;
  }
  return `{${Object.entries(out).map(([k, v]) => `${q(k)}: ${q(v)}`).join(', ')}}`;
}

function attrs(node) {
  const isCustom = node.name.includes('-');
  const out = [];
  for (let [rawK, v] of Object.entries(node.attribs)) {
    const k = /^[a-z-]+$/.test(rawK.toLowerCase()) && ATTR[rawK.toLowerCase()] ? rawK.toLowerCase() : rawK;
    if (/^on[a-z]+$/.test(k)) continue;
    if (k === 'style') { out.push(`style={${styleObj(v)} as React.CSSProperties}`); continue; }
    if (node.name === 'input' && k === 'checked') { out.push('defaultChecked'); continue; }
    if (node.name === 'input' && k === 'value' && !['radio', 'checkbox', 'hidden', 'submit', 'button'].includes(node.attribs.type)) { out.push(`defaultValue=${av(v)}`); continue; }
    if (node.name === 'textarea' && k === 'value') { out.push(`defaultValue=${av(v)}`); continue; }
    if (node.name === 'option' && k === 'selected') continue;
    if (node.name === 'details' && k === 'open') { out.push('open'); continue; }
    let name = ATTR[k] || k;
    if (!ATTR[k] && !k.startsWith('data-') && !k.startsWith('aria-') && !isCustom && k.includes('-')) name = camel(k);
    if (!ATTR[k] && k.includes(':')) name = camel(k.replace(':', '-'));
    if (BOOL.has(k) && (v === '' || v === k)) { out.push(name); continue; }
    if (['tabIndex', 'colSpan', 'rowSpan', 'maxLength', 'minLength'].includes(name) && /^-?\d+$/.test(v)) { out.push(`${name}={${v}}`); continue; }
    if (['spellCheck', 'draggable', 'contentEditable'].includes(name) && /^(true|false)$/.test(v)) { out.push(`${name}={${v}}`); continue; }
    out.push(`${name}=${av(v)}`);
  }
  return out.length ? ' ' + out.join(' ') : '';
}

function text(t, pre) {
  if (!pre) t = t.replace(/\s+/g, ' ');
  if (!t) return '';
  if (/[{}<>`]/.test(t) || (!pre && t.trim() === '' && t.length)) return `{${q(t)}}`;
  return t.replace(/&/g, '&amp;');
}

function jsx(node, pre = false) {
  if (node.type === 'text') return text(node.data, pre);
  if (node.type === 'comment' || node.type === 'directive') return '';
  if (node.type === 'script') {
    if (node.attribs.type === 'application/ld+json' || node.attribs.type === 'application/json') {
      return `<script type=${q(node.attribs.type)}${node.attribs.id ? ` id=${q(node.attribs.id)}` : ''} dangerouslySetInnerHTML={{ __html: ${q(DomUtils.textContent(node))} }} />`;
    }
    return '';
  }
  if (node.type === 'style') return `<style dangerouslySetInnerHTML={{ __html: ${q(DomUtils.textContent(node))} }} />`;
  if (node.type !== 'tag') return '';
  const tag = node.name;
  if (tag === 'noscript') return '';
  if (tag === 'template' || tag === 'textarea') {
    const inner = node.children.map((c) => render(c, { decodeEntities: false })).join('');
    if (tag === 'textarea') return `<textarea${attrs(node)} defaultValue=${q(DomUtils.textContent(node))} />`;
    return `<template${attrs(node)} dangerouslySetInnerHTML={{ __html: ${q(inner)} }} />`;
  }
  const a = attrs(node);
  if (VOID.has(tag)) return `<${tag}${a} />`;
  const kids = node.children.map((c) => jsx(c, pre || tag === 'pre')).join('');
  return kids.trim() === '' && !/\S/.test(kids) ? `<${tag}${a}>${kids.includes('{" "}') ? '' : ''}</${tag}>` : `<${tag}${a}>${kids}</${tag}>`;
}

export function convert(html) {
  const doc = parseDocument(html, { decodeEntities: true, recognizeSelfClosing: true, lowerCaseAttributeNames: false, lowerCaseTags: false });
  const first = doc.children.find((n) => n.type === 'tag');
  return jsx(first);
}

const pascal = (s) => s.replace(/(^|[-_ ])([a-z0-9])/g, (_, __, c) => c.toUpperCase());
if (process.argv[1].endsWith('html-to-jsx.mjs')) {
  fs.mkdirSync('src/sections/generated', { recursive: true });
  for (const f of fs.readdirSync('reference/sections')) {
    const base = f.replace('.html', '');
    const name = pascal(base.replace('--', '-'));
    const body = convert(fs.readFileSync('reference/sections/' + f, 'utf8'));
    fs.writeFileSync(`src/sections/generated/${base}.tsx`,
      `// Generated from the Shopify theme's rendered HTML (reference/sections/${f}). Make content dynamic, keep the markup.\n` +
      `export default function ${name}() {\n  return (\n    ${body}\n  );\n}\n`);
  }
  console.log('converted', fs.readdirSync('reference/sections').length);
}
