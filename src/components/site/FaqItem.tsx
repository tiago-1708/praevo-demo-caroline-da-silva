import { Plus } from "lucide-react";
import type { Faq } from "@/lib/site-config";

/** Corpo de uma pergunta frequente: introdução, passos numerados e nota. */
export function FaqBody({ faq }: { faq: Faq }) {
  return (
    <div className="text-sm leading-relaxed text-muted-foreground sm:text-base">
      <p>{faq.intro}</p>
      <ol className="mt-5 space-y-3">
        {faq.steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span className="mt-0.5 font-serif text-lg leading-none text-[color:var(--gold-ink)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="mt-5 border-l border-[color:var(--gold)] pl-4 text-[color:var(--navy-deep)]">
        {faq.note}
      </p>
    </div>
  );
}

/** Pergunta em acordeão nativo (<details>): funciona sem JS e no SSR. */
export function FaqItem({ faq, defaultOpen = false }: { faq: Faq; defaultOpen?: boolean }) {
  return (
    <details
      className="group border-b border-border py-6 [&_summary::-webkit-details-marker]:hidden"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
        <h3 className="font-serif text-xl leading-snug text-[color:var(--navy-deep)] sm:text-2xl">
          {faq.question}
        </h3>
        <Plus
          className="mt-1 h-5 w-5 shrink-0 text-[color:var(--gold-ink)] transition-transform duration-300 group-open:rotate-45"
          aria-hidden
        />
      </summary>
      <div className="mt-5 max-w-3xl">
        <FaqBody faq={faq} />
      </div>
    </details>
  );
}
