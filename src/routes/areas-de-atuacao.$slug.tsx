import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Eyebrow, PageHero } from "@/components/site/Brand";
import { FaqBody } from "@/components/site/FaqItem";
import { getArea, getFaq, siteConfig, siteName, absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/areas-de-atuacao/$slug")({
  // O loader devolve só o slug: os dados do loader são serializados para a
  // hidratação e `area.icon` (componente React) não é serializável.
  loader: ({ params }) => {
    if (!getArea(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const area = loaderData ? getArea(loaderData.slug) : undefined;
    if (!area) return {};
    return {
      meta: [
        { title: `${area.title} — ${siteName()}` },
        { name: "description", content: area.short },
        { property: "og:title", content: `${area.title} — ${siteName()}` },
      ],
      links: [{ rel: "canonical", href: absoluteUrl(`/areas-de-atuacao/${area.slug}`) }],
    };
  },
  component: AreaPage,
});

function AreaPage() {
  const { slug } = Route.useLoaderData();
  const area = getArea(slug);
  const a = siteConfig.advogado;
  if (!area) return null;
  const faq = area.faq ? getFaq(area.faq) : undefined;

  return (
    <SiteLayout>
      <PageHero
        eyebrow={
          <Link
            to="/areas-de-atuacao"
            className="inline-flex items-center gap-2 hover:text-[color:var(--gold-soft)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> Áreas de prática
          </Link>
        }
        title={area.title}
      >
        {area.short}
      </PageHero>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-20">
          <div>
            <Reveal>
              <p className="font-serif text-2xl leading-snug text-[color:var(--navy-deep)] sm:text-[1.7rem]">
                {area.long}
              </p>
            </Reveal>

            <Reveal delay={100} className="mt-14">
              <Eyebrow>O que acompanhamos</Eyebrow>
              <ul className="divide-y divide-border border-y border-border">
                {area.topics.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-4 py-4 text-sm text-[color:var(--navy-deep)] sm:text-base"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[color:var(--gold-ink)]"
                      aria-hidden
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            {faq && (
              <Reveal
                delay={100}
                className="mt-16 rounded-md border border-border bg-card p-7 sm:p-10"
              >
                <Eyebrow>Pergunta frequente</Eyebrow>
                <h2 className="font-serif text-2xl leading-snug text-[color:var(--navy-deep)] sm:text-3xl">
                  {faq.question}
                </h2>
                <div className="mt-6">
                  <FaqBody faq={faq} />
                </div>
                <p className="mt-6 text-xs text-muted-foreground">
                  Informação de carácter geral, que não dispensa a análise do caso concreto.
                </p>
              </Reveal>
            )}
          </div>

          <aside>
            <Reveal delay={150} className="lg:sticky lg:top-28">
              <div className="rounded-md bg-[color:var(--navy-deep)] p-8 text-[color:var(--ivory)]">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[color:var(--gold)]">
                  A quem se dirige
                </p>
                <ul className="mt-4 space-y-2 font-serif text-xl">
                  {area.audiences.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-[color:var(--gold)]/25 pt-8">
                  <p className="text-sm leading-relaxed text-[color:var(--ivory)]/75">
                    Quanto mais cedo, melhor. Fale connosco antes de decidir.
                  </p>
                  <Link to="/contactos" className="btn-primary mt-6 w-full">
                    Marcar reunião <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={`tel:${a.phoneE164}`}
                    className="mt-4 flex items-center justify-center gap-2 text-sm text-[color:var(--ivory)]/80 hover:text-[color:var(--gold)]"
                  >
                    <Phone className="h-4 w-4 text-[color:var(--gold)]" aria-hidden />
                    {a.phoneDisplay}
                  </a>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-[color:var(--muted)] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--gold-ink)]">
            Outras áreas
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {siteConfig.areas
              .filter((x) => x.slug !== area.slug)
              .map((x) => (
                <li key={x.slug}>
                  <Link
                    to="/areas-de-atuacao/$slug"
                    params={{ slug: x.slug }}
                    className="inline-block rounded-sm border border-border bg-background px-4 py-2 text-sm text-[color:var(--navy-deep)] transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold-ink)]"
                  >
                    {x.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
