import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/Brand";
import { siteConfig, siteName, absoluteUrl } from "@/lib/site-config";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: `Aviso Legal e Privacidade — ${siteName()}` },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/aviso-legal") }],
  }),
  component: AvisoLegal,
});

function AvisoLegal() {
  const a = siteConfig.advogado;

  return (
    <SiteLayout>
      <PageHero eyebrow="Legal" title="Aviso Legal e Política de Privacidade" />
      <article className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
        <p className="text-xs text-muted-foreground">
          Última actualização: {new Date().toLocaleDateString("pt-PT")}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">1. Identificação</h2>
            <p className="mt-3">
              O presente sítio é da responsabilidade de <strong>{siteName()}</strong>, escritório do
              advogado {a.name}, inscrito na Ordem dos Advogados portuguesa com a cédula
              profissional n.º {a.cedula}, com domicílio profissional em {a.street}, {a.postalCode}{" "}
              {a.locality}, NIF {a.nif}. Contactos: {a.email} · {a.phoneDisplay}.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">2. Natureza da informação</h2>
            <p className="mt-3">
              O conteúdo deste sítio tem carácter meramente informativo. Não constitui
              aconselhamento jurídico nem estabelece qualquer relação profissional entre o
              utilizador e o advogado. O aconselhamento jurídico requer análise individualizada do
              caso concreto.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">3. Conformidade OA</h2>
            <p className="mt-3">
              Este sítio observa as regras de publicidade dos advogados previstas no Estatuto da
              Ordem dos Advogados e no respetivo regulamento, nomeadamente: informação objetiva e
              verdadeira, ausência de títulos não atribuídos pela Ordem, de promessas de resultado,
              de testemunhos de clientes e de referências a casos concretos, e proibição de
              angariação de clientela.
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">4. Segredo profissional</h2>
            <p className="mt-3">
              As informações partilhadas com o advogado estão protegidas pelo dever de segredo
              profissional nos termos do Estatuto da Ordem dos Advogados (Lei n.º 145/2015).
            </p>
          </section>

          <section>
            <h2 className="text-lg text-[color:var(--navy-deep)]">5. Dados pessoais</h2>
            <p className="mt-3">
              Os dados pessoais enviados através do formulário de contacto (nome, email, telefone e
              mensagem), ou transmitidos por telefone ou email, são tratados exclusivamente para
              responder ao pedido, com base no consentimento do titular, e conservados apenas pelo
              tempo estritamente necessário.
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
              Aplica-se a lei portuguesa. Foro competente: tribunais do domicílio profissional do
              advogado.
            </p>
          </section>
        </div>
      </article>
    </SiteLayout>
  );
}
