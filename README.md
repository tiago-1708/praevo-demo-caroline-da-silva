# Praevo Technologies Template — Standard

Template para site de advogado(a) português — plano **Standard**
(multi-página + formulário de contactos + GA4). Stack: TanStack Start +
React 19 + Vite + Tailwind 4 + shadcn/ui, deploy em Cloudflare Workers
via GitHub Actions.

Fork por cliente. Editar `src/lib/site-config.ts` (o único ficheiro que
precisa de ser tocado) e ver `SCAFFOLD.md` para deploy.

## Estrutura entregue

- **Homepage** (`/`) — hero + snippet do sobre + grelha de áreas + CTA
- **Sobre** (`/sobre`) — página própria com bio expandida
- **Áreas de Prática** (`/areas-de-atuacao`) — índice
- **Página por área** (`/areas-de-atuacao/[slug]`) — SEO por área
- **Contactos** (`/contactos`) — morada + Google Maps + formulário
- **Aviso Legal + Privacidade** (`/aviso-legal`), **Cookies** (`/cookies`)
- Banner de consentimento com Consent Mode v2 (GA4 só carrega se aceitar)
- Formulário Resend (nome, email, telefone, mensagem opcional, RGPD)
- Meta tags, Open Graph, structured data JSON-LD `Attorney + LegalService`
- Sitemap dinâmico com todas as páginas indexáveis (legais ficam de fora)
- Deploy pipeline pronto com sincronização de secrets do Worker

## O que **não** está no Standard

Para adicionar, migrar para `praevo-template-pro`:

- Formulário de agendamento estruturado (dias/período/modalidade)
- Landing pages Google Ads dedicadas (com `noindex`)
- Google Ads tracking + Enhanced Conversions
- Confirmação automática ao cliente por email
- Uptime monitoring
