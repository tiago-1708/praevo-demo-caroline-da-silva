import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getArea, siteConfig, siteName, absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/areas-de-atuacao/$slug")({
  loader: ({ params }) => {
    const area = getArea(params.slug);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { area } = loaderData;
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
  const { area } = Route.useLoaderData();
  const Icon = area.icon;

  return (
    <SiteLayout>
      <section className="bg-[color:var(--navy-deep)] text-[color:var(--ivory)]">
        <div className="mx-auto max-w-4xl px-6 pt-32 pb-16 lg:pt-40">
          <Link
            to="/areas-de-atuacao"
            className="animate-fade-rise mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[color:var(--gold)] hover:text-[color:var(--gold-soft)]"
          >
            ← Todas as áreas
          </Link>
          <Icon
            className="animate-fade-rise delay-1 h-8 w-8 text-[color:var(--gold)]"
            aria-hidden
          />
          <h1 className="animate-fade-rise delay-2 mt-6 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl">
            {area.title}
          </h1>
          <p className="animate-fade-rise delay-3 mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--ivory)]/85">
            {area.short}
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{area.long}</p>

          <div className="mt-12">
            <Link
              to="/contactos"
              className="btn-primary gap-3 px-7 py-3.5 text-xs uppercase tracking-[0.25em]"
            >
              Agendar consulta <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--muted)] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--navy)]/60">
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
                    className="inline-block rounded-full border border-border bg-background px-4 py-2 text-sm text-[color:var(--navy-deep)] transition-colors hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
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
