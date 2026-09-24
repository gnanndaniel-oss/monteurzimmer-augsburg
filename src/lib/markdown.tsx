import fs from 'node:fs';
import path from 'node:path';
import type { ReactNode } from 'react';

/**
 * Minimaler Markdown-Renderer für redaktionelle Inhalte (Seiten-Texte, Ratgeber).
 * Unterstützt: ## / ### Überschriften, Absätze, - / 1. Listen, | Tabellen |,
 * > Kurzantwort-Box, **fett**, [Link](/pfad/). Ein Abschnitt "## Häufige Fragen"
 * wird als FAQ (### Frage + Antwortabsätze) erkannt und separat zurückgegeben.
 */

export type FaqItem = { q: string; a: string };

type Block =
  | { type: 'h2' | 'h3' | 'p' | 'quote'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] };

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

export function readContent(relPath: string): string {
  return fs.readFileSync(path.join(CONTENT_DIR, relPath), 'utf8');
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim());
}

function parseBlocks(md: string): Block[] {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('<!--')) {
      i++;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      blocks.push({ type: 'h3', text: trimmed.slice(4) });
      i++;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.slice(3) });
      i++;
      continue;
    }
    if (trimmed.startsWith('> ')) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        buf.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push({ type: 'quote', text: buf.join(' ') });
      continue;
    }
    if (trimmed.startsWith('|')) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const r = splitRow(lines[i]);
        if (!r.every((c) => /^:?-{2,}:?$/.test(c))) rows.push(r);
        i++;
      }
      blocks.push({ type: 'table', head: rows[0] ?? [], rows: rows.slice(1) });
      continue;
    }
    if (/^- /.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^- /.test(lines[i].trim())) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }
    if (/^\d+\. /.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }
    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{2,3} |> |\||- |\d+\. |<!--)/.test(lines[i].trim())
    ) {
      buf.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: 'p', text: buf.join(' ') });
  }
  return blocks;
}

/** Entfernt Inline-Markdown (für Schema-Texte). */
export function plainText(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[(.+?)\]\((.+?)\)/g, '$1');
}

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(<strong key={`${keyBase}-${n++}`}>{m[1]}</strong>);
    } else {
      const href = m[3];
      const external = /^https?:\/\//.test(href);
      out.push(
        <a
          key={`${keyBase}-${n++}`}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {m[2]}
        </a>
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function renderBlock(b: Block, k: string): ReactNode {
  switch (b.type) {
    case 'h2':
      return <h2 key={k}>{inline(b.text, k)}</h2>;
    case 'h3':
      return <h3 key={k}>{inline(b.text, k)}</h3>;
    case 'p':
      return <p key={k}>{inline(b.text, k)}</p>;
    case 'quote':
      return (
        <div key={k} className="mz-answer">
          <p>{inline(b.text, k)}</p>
        </div>
      );
    case 'ul':
      return (
        <ul key={k}>
          {b.items.map((it, j) => (
            <li key={j}>{inline(it, `${k}-${j}`)}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={k}>
          {b.items.map((it, j) => (
            <li key={j}>{inline(it, `${k}-${j}`)}</li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <div key={k} className="mz-table">
          <table>
            <thead>
              <tr>
                {b.head.map((h, j) => (
                  <th key={j}>{inline(h, `${k}-h${j}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => (
                    <td key={ci}>{inline(c, `${k}-${ri}-${ci}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/** FAQ-Überschrift in allen Sprachen (Abschnitt beginnt mit dieser Phrase). */
const FAQ_HEADING =
  /^(Häufige Fragen|Frequently asked questions|Najczęściej zadawane pytania|Často kladené otázky|Întrebări frecvente)/i;

export type ParsedContent = {
  intro: ReactNode[];
  body: ReactNode[];
  faq: FaqItem[];
  faqTitle: string | null;
};

/**
 * Zerlegt Markdown in Intro (bis <!-- more -->), Hauptteil und FAQ.
 */
export function parseContent(md: string): ParsedContent {
  const [introMd, bodyMd] = md.includes('<!-- more -->')
    ? md.split('<!-- more -->')
    : ['', md];

  const intro = parseBlocks(introMd).map((b, i) => renderBlock(b, `i${i}`));

  const blocks = parseBlocks(bodyMd);
  const body: ReactNode[] = [];
  const faq: FaqItem[] = [];
  let faqTitle: string | null = null;
  let inFaq = false;
  let current: FaqItem | null = null;

  blocks.forEach((b, i) => {
    if (b.type === 'h2') {
      inFaq = FAQ_HEADING.test(b.text);
      if (inFaq) {
        faqTitle = b.text;
        return;
      }
    }
    if (inFaq) {
      if (b.type === 'h3') {
        current = { q: b.text, a: '' };
        faq.push(current);
      } else if (current && b.type === 'p') {
        current.a = current.a ? `${current.a} ${b.text}` : b.text;
      }
      return;
    }
    body.push(renderBlock(b, `b${i}`));
  });

  return { intro, body, faq, faqTitle };
}

/** Grobe Wortzählung für Lesezeit. */
export function countWords(md: string): number {
  return plainText(md.replace(/<!--.*?-->/g, '')).split(/\s+/).filter(Boolean).length;
}

/**
 * Setzt bei internen Links das Sprachpräfix (Inhalte verlinken immer auf die
 * deutschen Pfade). Ratgeber-Links bleiben für Sprachen ohne übersetzten
 * Ratgeber (cs, ro) auf der deutschen URL.
 */
export function localizeLinks(md: string, locale: string): string {
  if (locale === 'de') return md;
  const blogTranslated = ['en', 'pl'].includes(locale);
  return md.replace(/\]\((\/[^)]*)\)/g, (all, href: string) => {
    if (/^\/(en|pl|cs|ro)\//.test(href)) return all;
    if (href.startsWith('/blog/') && !blogTranslated) return all;
    return `](/${locale}${href})`;
  });
}

/**
 * Redaktioneller Inhalt einer Seite in der jeweiligen Sprache:
 * de → seiten/<file>.md, sonst seiten/<locale>/<file>.md (null, wenn nicht vorhanden).
 */
export function getPageContent(locale: string, file: string): ParsedContent | null {
  const rel = locale === 'de' ? `seiten/${file}.md` : `seiten/${locale}/${file}.md`;
  if (!fs.existsSync(path.join(CONTENT_DIR, rel))) return null;
  return parseContent(localizeLinks(readContent(rel), locale));
}
