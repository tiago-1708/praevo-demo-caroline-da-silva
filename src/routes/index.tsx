import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Mail, Phone, Scale } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SiteLayout } from "@/components/site/SiteLayout";
import { siteConfig, siteName, absoluteUrl } from "@/lib/site-config";
import { handleSpot } from "@/lib/spotlight";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteName()} — Advogado em ${siteConfig.advogado.locality}` },
      {
        name: "description",
        content: `Escritório de advocacia de ${siteName()} em ${siteConfig.advogado.locality}. Áreas de prática, contactos e agendamento. Atendimento mediante marcação prévia.`,
      },
      { property: "og:title", content: siteName() },
      { property: "og:url", content: absoluteUrl("/") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
  component: HomePage,
});

function HomePage() {
  const a = siteConfig.advogado;

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative -mt-20 flex min-h-[85svh] items-center overflow-hidden bg-[color:var(--navy-deep)] text-[color:var(--ivory)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy-deep)] via-[color:var(--navy-deep)]/85 to-[color:var(--navy-deep)]" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pt-32 pb-20 lg:pt-40">
          <p className="animate-fade-rise mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-[color:var(--gold)]">
            <span className="h-px w-10 bg-[color:var(--gold)]" />
            Escritório de Advocacia
          </p>
          <h1 className="animate-fade-rise delay-1 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            {siteName()}
          </h1>
          <p className="animate-fade-rise delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--ivory)]/85 sm:text-xl">
            Escritório de advocacia em {a.locality}. Cédula profissional n.º {a.cedula}. Atendimento
            mediante marcação prévia.
          </p>

          <div className="animate-fade-rise delay-3 mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              to="/contactos"
              className="btn-primary gap-3 px-7 py-4 text-xs uppercase tracking-[0.25em]"
            >
              Agendar consulta
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={`tel:${a.phoneE164}`}
              className="btn-outline gap-3 px-7 py-4 text-xs uppercase tracking-[0.2em] text-[color:var(--ivory)]/85 hover:text-[color:var(--gold)]"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {a.phoneDisplay}
            </a>
          </div>

          <div className="animate-fade-rise delay-4 mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[color:var(--ivory)]/15 pt-8 text-xs uppercase tracking-[0.2em] text-[color:var(--ivory)]/70">
            <span className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-[color:var(--gold)]" aria-hidden />
              Inscrito na Ordem dos Advogados
            </span>
            <span className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-[color:var(--gold)]" aria-hidden />
              {siteConfig.areas.length} áreas de prática
            </span>
          </div>
        </div>
      </section>

      {/* SOBRE — snippet + CTA */}
      <section className="bg-background py-20 lg:py-24">
        <Reveal className="mx-auto max-w-4xl px-6">
          <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--navy)]/60">
            <span className="h-px w-8 bg-[color:var(--gold)]" />
            Sobre
          </p>
          <h2 className="font-serif text-3xl leading-tight text-[color:var(--navy-deep)] sm:text-4xl">
            {siteName()}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">{a.bio}</p>
          <Link
            to="/sobre"
            className="btn-outline mt-8 gap-2 px-6 py-3 text-xs uppercase tracking-[0.25em] text-[color:var(--navy-deep)] hover:text-[color:var(--gold)]"
          >
            Conhecer o percurso <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* ÁREAS */}
      <section className="bg-[color:var(--muted)] py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[color:var(--navy)]/60">
                <span className="h-px w-8 bg-[color:var(--gold)]" />
                Áreas de Prática
              </p>
              <h2 className="font-serif text-3xl leading-tight text-[color:var(--navy-deep)] sm:text-4xl">
                Onde acompanhamos os nossos clientes
              </h2>
            </div>
            <Link
              to="/areas-de-atuacao"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[color:var(--navy-deep)] hover:text-[color:var(--gold)]"
            >
              Ver todas <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* CTA final */}
      <section className="bg-background py-20 lg:py-24">
        <Reveal variant="scale" className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-3xl text-[color:var(--navy-deep)] sm:text-4xl">
            Agendar consulta
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Atendimento mediante marcação prévia. Envie os seus contactos pelo formulário e
            responderemos em até 24 horas úteis.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contactos"
              className="btn-primary gap-3 px-8 py-4 text-xs uppercase tracking-[0.25em]"
            >
              Ir para o formulário <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${a.email}`}
              className="btn-outline gap-3 px-8 py-4 text-xs uppercase tracking-[0.2em] text-[color:var(--navy-deep)] hover:text-[color:var(--gold)]"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {a.email}
            </a>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
