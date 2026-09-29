import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { sendContactEmail } from "@/lib/send-contact-email";
import { contactSubmissionSchema } from "@/lib/contact-submission";
import { trackEvent } from "@/lib/analytics";
import { siteConfig, siteName, absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: `Contactos — ${siteName()}` },
      {
        name: "description",
        content: `Contactos do escritório de ${siteName()} em ${siteConfig.advogado.locality}. Formulário, telefone e email.`,
      },
      { property: "og:title", content: `Contactos — ${siteName()}` },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/contactos") }],
  }),
  component: Contactos,
});

function Contactos() {
  const a = siteConfig.advogado;
  const mapsQuery = encodeURIComponent(`${a.street}, ${a.postalCode} ${a.locality}`);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  // Momento em que o formulário ficou visível — enviado ao servidor para
  // rejeitar submissões instantâneas típicas de bots. O rate limit real
  // (por IP) passou a viver no servidor; ver src/lib/contact-rate-limiter.ts.
  const formStartedAt = useRef(Date.now());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const website = (fd.get("website") as string) ?? "";
    if (website.trim()) {
      // Honeypot preenchido: resposta silenciosa, sem contactar o servidor.
      setSent(true);
      form.reset();
      return;
    }

    const data = {
      name: (fd.get("name") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      phone: (fd.get("phone") as string) ?? "",
      message: ((fd.get("message") as string) ?? "").trim(),
      consent: fd.get("consent") === "on",
      website,
      formStartedAt: formStartedAt.current,
    };

    const parsed = contactSubmissionSchema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setFormError("Reveja os campos assinalados e tente novamente.");
      return;
    }

    setErrors({});
    setFormError(null);
    setSending(true);
    try {
      // sendContactEmail() nunca rejeita quando o servidor devolve um erro
      // JSON (ex.: 429/502/503) — o TanStack Start resolve o payload JSON
      // como resultado independentemente do status HTTP nesse caso. Por
      // isso o sucesso tem de ser confirmado explicitamente pelo valor
      // devolvido, não apenas pela ausência de excepção.
      const result = await sendContactEmail({ data: parsed.data });
      if (result?.accepted !== true) {
        setFormError(
          "Não foi possível enviar o pedido. Tente novamente ou contacte-nos pelo telefone.",
        );
        return;
      }
      trackEvent("contacto_enviado", { form: "contactos" });
      setSent(true);
      form.reset();
    } catch {
      setFormError(
        "Não foi possível enviar o pedido. Tente novamente ou contacte-nos pelo telefone.",
      );
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all duration-200 focus:border-[color:var(--gold)] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--gold)_20%,transparent)]";
  const label = "mb-1.5 block text-[11px] uppercase tracking-[0.2em] text-muted-foreground";

  return (
    <SiteLayout>
      <section className="bg-[color:var(--navy-deep)] text-[color:var(--ivory)]">
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-16 lg:pt-40">
          <p className="animate-fade-rise mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-[color:var(--gold)]">
            <span className="h-px w-10 bg-[color:var(--gold)]" /> Contactos
          </p>
          <h1 className="animate-fade-rise delay-1 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl">
            Falar com o escritório
          </h1>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            {/* Coluna esquerda: contactos + mapa */}
            <div>
              <dl className="space-y-6 text-sm text-[color:var(--navy-deep)]">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)]"
                    aria-hidden
                  />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Morada
                    </dt>
                    <dd className="mt-1 leading-relaxed">
                      {a.street}
                      <br />
                      {a.postalCode} {a.locality}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)]" aria-hidden />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Telefone
                    </dt>
                    <dd className="mt-1">
                      <a href={`tel:${a.phoneE164}`} className="hover:text-[color:var(--gold)]">
                        {a.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold)]" aria-hidden />
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Email
                    </dt>
                    <dd className="mt-1">
                      <a href={`mailto:${a.email}`} className="hover:text-[color:var(--gold)]">
                        {a.email}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-8 min-h-[280px] w-full overflow-hidden rounded-2xl border border-border bg-muted">
                <iframe
                  title={`Localização do escritório em ${a.locality}`}
                  src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                  className="h-full w-full min-h-[280px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Coluna direita: formulário */}
            <div className="rounded-2xl border border-border bg-background p-6 shadow-xl shadow-[color:var(--navy-deep)]/5 sm:p-8">
              <h2 className="font-serif text-2xl text-[color:var(--navy-deep)]">
                Envie os seus contactos
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Responderemos em até 24 horas úteis pelo telefone ou email indicado.
              </p>

              {sent ? (
                <div className="mt-8 flex flex-col items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--gold)]/15">
                    <CheckCircle2 className="h-6 w-6 text-[color:var(--gold)]" aria-hidden />
                  </div>
                  <h3 className="font-serif text-xl text-[color:var(--navy-deep)]">
                    Pedido recebido
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Entraremos em contacto brevemente.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                    style={{ position: "absolute" }}
                  >
                    <label htmlFor="website">Não preencher</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label className={label} htmlFor="name">
                      Nome
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      maxLength={120}
                      autoComplete="name"
                      className={field}
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>

                  <div>
                    <label className={label} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      maxLength={255}
                      autoComplete="email"
                      className={field}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className={label} htmlFor="phone">
                      Telefone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      maxLength={40}
                      autoComplete="tel"
                      className={field}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className={label} htmlFor="message">
                      Mensagem <span className="normal-case tracking-normal">(opcional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      maxLength={2000}
                      rows={4}
                      className={field}
                    />
                  </div>

                  <label
                    htmlFor="consent"
                    className="flex items-start gap-3 text-xs text-muted-foreground"
                  >
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 shrink-0 accent-[color:var(--gold)]"
                    />
                    <span>
                      Aceito o{" "}
                      <Link to="/aviso-legal" className="underline hover:text-[color:var(--gold)]">
                        Aviso Legal e a Política de Privacidade
                      </Link>{" "}
                      e o tratamento dos meus dados para efeitos de contacto.
                    </span>
                  </label>
                  {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}

                  {formError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/5 p-3 text-xs text-destructive"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <span>{formError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary mt-2 w-full px-7 py-3.5 text-xs uppercase tracking-[0.25em] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sending ? (
                      <>
                        A enviar <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Enviar pedido <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
