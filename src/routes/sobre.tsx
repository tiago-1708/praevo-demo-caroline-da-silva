import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Check, Clock, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { ContourPattern, Eyebrow, PageHero, Pending, Wordmark } from "@/components/site/Brand";
import { siteConfig, siteName, absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: `Sobre — ${siteName()}` },
      {
        name: "description",
        content: `${siteConfig.advogado.name}, advogado inscrito na Ordem dos Advogados. ${siteName()}, ${siteConfig.perfil.tagline.toLowerCase()} em ${siteConfig.advogado.locality}.`,
      },
      { property: "og:title", content: `Sobre — ${siteName()}` },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/sobre") }],
  }),
  component: Sobre,
});

function Sobre() {
  const a = siteConfig.advogado;
  const p = siteConfig.perfil;

  return (
    <SiteLayout>
      <PageHero eyebrow="Sobre" title={a.name}>
        Advogado · {a.firm} · {a.locality}
      </PageHero>

      {/* Perfil */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal variant="scale">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md bg-[color:var(--navy-deep)] text-[color:var(--ivory)]">
              <ContourPattern opacity={0.28} />
              <span
                className="absolute inset-3 rounded-sm border border-[color:var(--gold)]/25"
                aria-hidden
              />
              <div className="relative flex flex-col items-center">
                <Wordmark size="lg" />
                <span className="mt-8 h-px w-16 bg-[color:var(--gold)]/60" aria-hidden />
                <span className="mt-6 text-[10px] uppercase tracking-[0.45em] text-[color:var(--ivory)]/60">
                  Advogados
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Eyebrow>Quem é o João Romão Rodrigues?</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight text-[color:var(--navy-deep)] sm:text-4xl">
              Uma boutique de advocacia, full service.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>{a.bio}</p>
              <p>
                <Pending>
                  [Percurso académico e profissional de {a.name} — texto a confirmar com o cliente.]
                </Pending>
              </p>
            </div>

            <ul className="mt-10 space-y-4 border-t border-border pt-8 text-sm text-[color:var(--navy-deep)] sm:text-base">
              <li className="flex items-start gap-3">
                <BadgeCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold-ink)]"
                  aria-hidden
                />
                Inscrito na Ordem dos Advogados — Cédula Profissional n.º {a.cedula}
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold-ink)]"
                  aria-hidden
                />
                Atendimento presencial em {a.street}, {a.postalCode} {a.locality}
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold-ink)]"
                  aria-hidden
                />
                {a.hours}
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Tipos de atos */}
      <section className="bg-[color:var(--muted)] py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>Tipos de atos que os advogados fazem</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight text-[color:var(--navy-deep)] sm:text-4xl">
              A advocacia é a profissão jurídica mais abrangente.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Muitas vezes pensa-se no advogado apenas quando há um processo em tribunal. Mas a lei
              reserva aos advogados um conjunto muito mais amplo de atos — e é nos que acontecem
              antes do litígio que a prevenção se faz.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="divide-y divide-border border-y border-border">
              {p.acts.map((act) => (
                <li key={act} className="flex items-start gap-4 py-4 text-[color:var(--navy-deep)]">
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-[color:var(--gold-ink)]"
                    aria-hidden
                  />
                  {act}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Missão & valores */}
      <section className="relative overflow-hidden bg-[color:var(--navy-deep)] py-20 text-[color:var(--ivory)] lg:py-28">
        <ContourPattern opacity={0.12} />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow tone="dark">Missão & valores</Eyebrow>
            <h2 className="max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">“{p.motto}”</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--ivory)]/70">
              <Pending>[Texto da missão do escritório — a confirmar com o cliente.]</Pending>
            </p>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {p.values.map((v, i) => (
              <Reveal key={v.title} delay={100 + i * 120}>
                <div className="border-t border-[color:var(--gold)]/40 pt-6">
                  <h3 className="font-serif text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--ivory)]/70">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-20 lg:py-24">
        <Reveal variant="scale" className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl text-[color:var(--navy-deep)] sm:text-4xl">
            Conversemos sobre o seu assunto
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            Atendimento presencial em {a.locality}. Telemóvel {a.phoneDisplay} · {a.email}
          </p>
          <Link to="/contactos" className="btn-primary btn-lg mt-9">
            Marcar reunião <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
