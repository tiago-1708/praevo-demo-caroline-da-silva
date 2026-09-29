import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { siteConfig, siteName, absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: `Sobre — ${siteName()}` },
      {
        name: "description",
        content: `${siteName()}, advogado(a) inscrito(a) na Ordem dos Advogados. Cédula n.º ${siteConfig.advogado.cedula}. Escritório em ${siteConfig.advogado.locality}.`,
      },
      { property: "og:title", content: `Sobre — ${siteName()}` },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/sobre") }],
  }),
  component: Sobre,
});

function Sobre() {
  const a = siteConfig.advogado;
  return (
    <SiteLayout>
      <section className="bg-[color:var(--navy-deep)] text-[color:var(--ivory)]">
        <div className="mx-auto max-w-4xl px-6 pt-32 pb-16 lg:pt-40">
          <p className="animate-fade-rise mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-[color:var(--gold)]">
            <span className="h-px w-10 bg-[color:var(--gold)]" /> Sobre
          </p>
          <h1 className="animate-fade-rise delay-1 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl">
            {siteName()}
          </h1>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-3xl px-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>{a.bio}</p>

          <ul className="mt-12 space-y-4">
            <li className="flex items-start gap-3">
              <BadgeCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)]"
                aria-hidden
              />
              <span className="text-[color:var(--navy-deep)]">
                Inscrito na Ordem dos Advogados — Cédula Profissional n.º {a.cedula}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)]" aria-hidden />
              <span className="text-[color:var(--navy-deep)]">
                Escritório em {a.street}, {a.postalCode} {a.locality}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)]" aria-hidden />
              <span className="text-[color:var(--navy-deep)]">
                {siteConfig.areas.length} áreas de prática
              </span>
            </li>
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
