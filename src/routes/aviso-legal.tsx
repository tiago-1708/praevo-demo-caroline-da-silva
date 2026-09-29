import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { siteConfig, siteName, absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: `Aviso Legal e Privacidade — ${siteName()}` },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/aviso-legal") }],
  }),
  component: AvisoLegal,
});

function AvisoLegal() {
  const a = siteConfig.advogado;

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-6 py-24 lg:py-32">
        <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">Legal</p>
        <h1 className="mt-4 font-serif text-3xl tracking-tight text-[color:var(--navy-deep)] sm:text-4xl">
          Aviso Legal e Política de Privacidade
        </h1>
        <p className="mt-4 text-xs text-muted-foreground">
          Última actualização: {new Date().toLocaleDateString("pt-PT")}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">1. Identificação</h2>
            <p className="mt-3">
              O presente sítio é da responsabilidade de <strong>{siteName()}</strong>, advogado(a)
              inscrito(a) na Ordem dos Advogados portuguesa com a cédula profissional n.º {a.cedula}
              , com domicílio profissional em {a.street}, {a.postalCode} {a.locality}, NIF {a.nif}.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">2. Natureza da informação</h2>
            <p className="mt-3">
              O conteúdo deste sítio tem carácter meramente informativo. Não constitui
              aconselhamento jurídico nem estabelece qualquer relação profissional entre o
              utilizador e o(a) advogado(a). O aconselhamento jurídico requer análise
              individualizada do caso concreto, em reunião presencial ou por videoconferência.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">3. Conformidade OA</h2>
            <p className="mt-3">
              Este sítio observa o Regulamento da Publicidade da Ordem dos Advogados, nomeadamente
              na abstenção do uso do termo &ldquo;especialista&rdquo; fora dos casos previstos no
              Estatuto, na ausência de promessas de resultado, testemunhos de clientes ou
              referências a casos concretos identificáveis, e na proibição de angariação directa de
              clientela.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">4. Segredo profissional</h2>
            <p className="mt-3">
              As informações partilhadas com o(a) advogado(a) estão protegidas pelo dever de segredo
              profissional nos termos do Estatuto da Ordem dos Advogados (Lei n.º 145/2015).
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">5. Dados pessoais</h2>
            <p className="mt-3">
              Este sítio não recolhe dados pessoais através de formulários. Se o utilizador
              contactar o escritório por telefone ou email, os dados transmitidos serão tratados
              exclusivamente para responder ao pedido e conservados apenas pelo tempo estritamente
              necessário.
            </p>
            <p className="mt-3">
              Responsável pelo tratamento: {siteName()}, com os contactos indicados no ponto 1.
              Direitos do titular: acesso, rectificação, apagamento, limitação, oposição e
              portabilidade dos dados, exercidos por email para {a.email}. Reclamação sempre
              disponível junto da Comissão Nacional de Protecção de Dados (CNPD — cnpd.pt).
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">6. Propriedade intelectual</h2>
            <p className="mt-3">
              O conteúdo deste sítio (texto, imagens, marca) é propriedade do escritório ou dos seus
              licenciantes. É proibida a reprodução parcial ou total sem autorização escrita, salvo
              para uso pessoal não comercial.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">7. Lei aplicável</h2>
            <p className="mt-3">
              Aplica-se a lei portuguesa. Foro competente: tribunais do domicílio profissional do(a)
              advogado(a).
            </p>
          </section>
        </div>
      </article>
    </SiteLayout>
  );
}
