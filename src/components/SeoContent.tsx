import type { ReactNode } from 'react';
import { plainText, type FaqItem } from '@/lib/markdown';

/** Faktenbox am Seitenanfang ("Antwort zuerst"). */
export function ContentIntro({ nodes }: { nodes: ReactNode[] }) {
  if (!nodes.length) return null;
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mz-prose">{nodes}</div>
    </section>
  );
}

/** Redaktioneller Hauptteil inkl. FAQ-Block und FAQPage-Schema. */
export function ContentBody({
  nodes,
  faq,
  faqTitle,
}: {
  nodes: ReactNode[];
  faq: FaqItem[];
  faqTitle: string | null;
}) {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mz-prose">{nodes}</div>
        {faq.length > 0 && <FaqList faq={faq} title={faqTitle ?? 'Häufige Fragen'} />}
      </div>
    </section>
  );
}

function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={n++}>{m[1]}</strong>);
    else
      out.push(
        <a key={n++} href={m[3]} className="text-brand-700 underline">
          {m[2]}
        </a>
      );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function FaqList({ faq, title }: { faq: FaqItem[]; title: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: plainText(f.q),
      acceptedAnswer: { '@type': 'Answer', text: plainText(f.a) },
    })),
  };
  return (
    <div className="mt-12" id="faq">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">{title}</h2>
      <div className="space-y-3">
        {faq.map((f, i) => (
          <details key={i} className="group bg-slate-50 rounded-xl border border-slate-200">
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-slate-900 select-none">
              <h3 className="text-base font-semibold">{f.q}</h3>
              <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed">{renderInline(f.a)}</div>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
