import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SiteLayout } from "@/components/site/SiteLayout";
import { siteConfig, siteName, absoluteUrl } from "@/lib/site-config";
import { handleSpot } from "@/lib/spotlight";

export const Route = createFileRoute("/areas-de-atuacao/")({
  head: () => ({
    meta: [
      { title: `Áreas de Prática — ${siteName()}` },
      {
        name: "description",
        content: `Áreas de prática do escritório de ${siteName()} em ${siteConfig.advogado.locality}.`,
      },
      { property: "og:title", content: `Áreas de Prática — ${siteName()}` },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/areas-de-atuacao") }],
  }),
  component: AreasIndex,
});

function AreasIndex() {
  return (
    <SiteLayout>
      <section className="bg-[color:var(--navy-deep)] text-[color:var(--ivory)]">
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-16 lg:pt-40">
          <p className="animate-fade-rise mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-[color:var(--gold)]">
            <span className="h-px w-10 bg-[color:var(--gold)]" /> Áreas de Prática
          </p>
          <h1 className="animate-fade-rise delay-1 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl">
            Onde acompanhamos os nossos clientes
          </h1>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <Reveal key={area.slug} delay={100 + i * 100}>
                  <Link
                    to="/areas-de-atuacao/$slug"
                    params={{ slug: area.slug }}
                    onMouseMove={handleSpot}
                    className="group card-lift block h-full rounded-2xl border border-border bg-background p-8 transition-colors hover:bg-[color:var(--navy-deep)] hover:text-[color:var(--ivory)]"
                  >
                    <p className="font-serif text-xs text-[color:var(--gold)]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <Icon className="mt-3 h-6 w-6 text-[color:var(--gold)]" aria-hidden />
                    <h3 className="mt-4 font-serif text-xl text-[color:var(--navy-deep)] group-hover:text-[color:var(--ivory)]">
                      {area.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-[color:var(--ivory)]/75">
                      {area.short}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[color:var(--navy-deep)] group-hover:text-[color:var(--gold)]">
                      Saber mais{" "}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
