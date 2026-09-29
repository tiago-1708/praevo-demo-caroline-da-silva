import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/Brand";
import { siteName, absoluteUrl } from "@/lib/site-config";
import { reopenCookieConsent } from "@/components/site/CookieConsent";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: `Política de Cookies — ${siteName()}` },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/cookies") }],
  }),
  component: Cookies,
});

function Cookies() {
  return (
    <SiteLayout>
      <PageHero eyebrow="Legal" title="Política de Cookies" />
      <article className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
        <p className="text-xs text-muted-foreground">
          Última actualização: {new Date().toLocaleDateString("pt-PT")}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">1. O que são cookies</h2>
            <p className="mt-3">
              Cookies são pequenos ficheiros de texto colocados no dispositivo do utilizador para
              memorizar preferências ou informação essencial ao funcionamento do site.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">2. Cookies utilizados</h2>
            <p className="mt-3">
              Este site utiliza apenas cookies essenciais — não recolhe dados de análise, não usa
              cookies de marketing nem partilha dados com terceiros.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <code>praevo_cookie_consent</code> — regista a decisão do utilizador sobre este
                banner. Duração: 12 meses. Armazenamento: <em>localStorage</em>. Não recolhe dados
                identificáveis.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">3. Gerir o consentimento</h2>
            <p className="mt-3">
              Pode alterar a sua decisão em qualquer momento — clique em{" "}
              <button
                type="button"
                onClick={reopenCookieConsent}
                className="underline underline-offset-2 hover:text-[color:var(--navy-deep)]"
              >
                Gerir cookies
              </button>
              . O banner reabre e a nova decisão substitui a anterior.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">4. Recusar</h2>
            <p className="mt-3">
              Se recusar, nenhum cookie é colocado além do estritamente essencial ao funcionamento
              do site. Nenhuma funcionalidade é perdida.
            </p>
          </section>
        </div>
      </article>
    </SiteLayout>
  );
}
