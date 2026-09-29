import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CalendarCheck, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Eyebrow, Guilloche } from "@/components/site/Brand";
import { Logo } from "@/components/site/Logo";
import { FaqItem } from "@/components/site/FaqItem";
import { siteConfig, siteName, absoluteUrl, emLocalidade } from "@/lib/site-config";
import { handleSpot } from "@/lib/spotlight";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteName()} — Advogada${emLocalidade()}` },
      {
        name: "description",
        content: `${siteName()}, advogada${emLocalidade()}. Presta serviços jurídicos a particulares, famílias e pequenos negócios: ${siteConfig.areas.map((a) => a.title).join(", ")}.`,
      },
      { property: "og:title", content: `${siteName()} — Advogada${emLocalidade()}` },
      { property: "og:url", content: absoluteUrl("/") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
  component: HomePage,
});

const ROMAN = ["I", "II", "III", "IV"];

function HomePage() {
  const a = siteConfig.advogado;
  const p = siteConfig.perfil;

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="surface-dark relative -mt-20 flex min-h-[92svh] items-center overflow-hidden bg-[color:var(--navy-deep)] text-[color:var(--ivory)]">
        <Guilloche opacity={0.26} />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--navy-deep)] via-[color:var(--navy-deep)]/80 to-transparent" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 pt-32 pb-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:pt-40">
          <div>
            <div className="animate-fade-rise">
              <Eyebrow tone="dark">Advogada · {a.locality}</Eyebrow>
            </div>
            <h1 className="animate-fade-rise delay-1 max-w-3xl font-serif text-[2.5rem] leading-[1.06] font-medium sm:text-6xl lg:text-[4.25rem]">
              Ouvir com atenção. Explicar com clareza.{" "}
              <em className="text-[color:var(--gold-soft)]">Acompanhar em cada passo.</em>
            </h1>
            <p className="animate-fade-rise delay-2 mt-7 max-w-xl text-base leading-relaxed text-[color:var(--ivory)]/80 sm:text-lg">
              {a.name} presta serviços jurídicos a particulares, a famílias e a pequenos negócios —
              em questões de família, heranças, trabalho, arrendamento e contratos.
            </p>

            <div className="animate-fade-rise delay-3 mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link to="/contactos" className="btn-primary btn-lg">
                Marcar reunião
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={`tel:${a.phoneE164}`}
                className="btn-outline btn-lg text-[color:var(--ivory)]"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {a.phoneDisplay}
              </a>
            </div>

            <div className="animate-fade-rise delay-4 mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[color:var(--ivory)]/15 pt-8 text-[11px] uppercase tracking-[0.2em] text-[color:var(--ivory)]/70">
              <span className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 shrink-0 text-[color:var(--gold)]" aria-hidden />
                Inscrita na Ordem dos Advogados · Cédula n.º {a.cedula}
              </span>
              <span className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 shrink-0 text-[color:var(--gold)]" aria-hidden />
                Atendimento presencial, por marcação
              </span>
            </div>
          </div>

          {/* Logótipo em moldura dupla (só em desktop) */}
          <div className="animate-fade-rise delay-3 hidden justify-center lg:flex">
            <div className="relative flex aspect-[4/5] w-full max-w-xs flex-col items-center justify-center border border-[color:var(--gold)]/40 p-10 text-[color:var(--ivory)]">
              <span className="absolute inset-2 border border-[color:var(--gold)]/15" aria-hidden />
              <Logo layout="stack" size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* O ESCRITÓRIO */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <Eyebrow>O escritório</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight text-[color:var(--navy-deep)] sm:text-[2.6rem]">
              {p.motto}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{a.bio}</p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Da consulta jurídica ao contrato, da negociação ao tribunal: cada assunto é
              acompanhado do primeiro contacto até ao fim, com informação clara em cada fase.
            </p>
            <Link
              to="/sobre"
              className="link-underline mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--navy-deep)] hover:text-[color:var(--gold-ink)]"
            >
              Conhecer a advogada <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* A QUEM PRESTAMOS SERVIÇOS */}
      <section className="border-t border-border bg-background pb-20 lg:pb-28">
        <div className="mx-auto max-w-6xl px-6 pt-20 lg:pt-24">
          <Reveal>
            <Eyebrow>A quem prestamos serviços</Eyebrow>
            <h2 className="max-w-2xl font-serif text-3xl leading-tight text-[color:var(--navy-deep)] sm:text-4xl">
              Pessoas, famílias e pequenos negócios.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {p.audiences.map((aud, i) => {
              const Icon = aud.icon;
              return (
                <Reveal key={aud.title} delay={100 + i * 100} className="bg-background">
                  <div onMouseMove={handleSpot} className="card-lift h-full p-8 lg:p-10">
                    <Icon className="h-6 w-6 text-[color:var(--gold-ink)]" aria-hidden />
                    <h3 className="mt-6 font-serif text-2xl text-[color:var(--navy-deep)]">
                      {aud.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{aud.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ÁREAS */}
      <section className="bg-[color:var(--muted)] py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Áreas de prática</Eyebrow>
              <h2 className="font-serif text-3xl leading-tight text-[color:var(--navy-deep)] sm:text-4xl">
                Em que assuntos acompanhamos os clientes
              </h2>
            </div>
            <Link
              to="/areas-de-atuacao"
              className="link-underline inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--navy-deep)] hover:text-[color:var(--gold-ink)]"
            >
              Ver todas <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <Reveal key={area.slug} delay={80 + i * 80}>
                  <Link
                    to="/areas-de-atuacao/$slug"
                    params={{ slug: area.slug }}
                    onMouseMove={handleSpot}
                    className="group card-lift card-dark-hover flex h-full flex-col rounded-md border border-border bg-background p-8 transition-colors hover:bg-[color:var(--navy-deep)]"
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        className="h-6 w-6 text-[color:var(--gold-ink)] group-hover:text-[color:var(--gold)]"
                        aria-hidden
                      />
                      <span className="font-serif text-sm text-[color:var(--gold-ink)] group-hover:text-[color:var(--gold)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 font-serif text-2xl leading-snug text-[color:var(--navy-deep)] group-hover:text-[color:var(--ivory)]">
                      {area.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground group-hover:text-[color:var(--ivory)]/75">
                      {area.short}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-[color:var(--navy-deep)] group-hover:text-[color:var(--gold)]">
                      Saber mais
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="surface-dark relative overflow-hidden bg-[color:var(--navy-deep)] py-20 text-[color:var(--ivory)] lg:py-28">
        <Guilloche opacity={0.12} flip />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow tone="dark">Valores</Eyebrow>
            <h2 className="max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
              Como cada assunto é tratado
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {p.values.map((v, i) => (
              <Reveal key={v.title} delay={100 + i * 120}>
                <div className="border-t border-[color:var(--gold)]/40 pt-6">
                  <span className="font-serif text-lg text-[color:var(--gold)]">{ROMAN[i]}</span>
                  <h3 className="mt-3 font-serif text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--ivory)]/70">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PERGUNTAS FREQUENTES */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <Reveal>
            <Eyebrow>Perguntas frequentes</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight text-[color:var(--navy-deep)] sm:text-4xl">
              Algumas perguntas comuns
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Informação de carácter geral, que não dispensa a análise do caso concreto nem
              constitui aconselhamento jurídico.
            </p>
          </Reveal>
          <Reveal delay={120} className="border-t border-border">
            {p.faqs.map((faq, i) => (
              <FaqItem key={faq.id} faq={faq} defaultOpen={i === 0} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* CONTACTO — bloco bordeaux */}
      <section className="surface-dark relative overflow-hidden bg-[color:var(--navy)] py-20 text-[color:var(--ivory)] lg:py-24">
        <Guilloche opacity={0.1} />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Eyebrow tone="dark">Contacto</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight sm:text-[2.6rem]">
              Uma primeira conversa ajuda a perceber o caminho.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[color:var(--ivory)]/80">
              Atendimento presencial, por marcação. Deixe os seus contactos e a advogada entrará em
              contacto consigo.
            </p>
            <Link to="/contactos" className="btn-primary btn-lg mt-8">
              Marcar reunião <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <ul className="divide-y divide-[color:var(--gold)]/25 border-y border-[color:var(--gold)]/25">
              <ContactRow icon={Phone} label="Telemóvel" href={`tel:${a.phoneE164}`}>
                {a.phoneDisplay}
              </ContactRow>
              {a.phoneAltE164 && (
                <ContactRow icon={Phone} label="Telefone" href={`tel:${a.phoneAltE164}`}>
                  {a.phoneAltDisplay}
                </ContactRow>
              )}
              <ContactRow icon={Mail} label="Email" href={`mailto:${a.email}`}>
                {a.email}
              </ContactRow>
              <ContactRow icon={MapPin} label="Morada">
                {a.street}, {a.locality}
              </ContactRow>
            </ul>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: typeof Phone;
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const body = (
    <>
      <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[color:var(--ivory)]/70">
        <Icon className="h-4 w-4 text-[color:var(--gold)]" aria-hidden />
        {label}
      </span>
      <span className="font-serif text-xl sm:text-2xl">{children}</span>
    </>
  );
  const cls = "flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between";
  return (
    <li>
      {href ? (
        <a href={href} className={`${cls} transition-colors hover:text-[color:var(--gold-soft)]`}>
          {body}
        </a>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </li>
  );
}
