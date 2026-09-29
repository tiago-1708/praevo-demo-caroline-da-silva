# SCAFFOLD — Standard

Personalização e deploy de um site novo a partir deste template.

## 1. Fork / clone

```sh
gh repo create tiago-1708/<slug>-site --private --template tiago-1708/praevo-template-standard
git clone https://github.com/tiago-1708/<slug>-site
cd <slug>-site
```

## 2. Editar `src/lib/site-config.ts`

**Único ficheiro a tocar para personalização standard.** Preencher:

- `slug` — kebab-case (ex.: `maria-silva-adv`)
- `domain` — `null` sem domínio próprio; `"advogado.pt"` quando pronto
- `themeColor` — cor mais escura da paleta (address bar mobile)
- `advogado.*` — nome, cédula, NIF, morada, telefone, email, horário, bio
- `areas` — cada área precisa de `slug`, `title`, `short` (1 frase para listas)
  e `long` (2-4 frases para a página própria)

## 3. Personalização visual (cores + logo)

Toda a paleta e logo vivem no bloco `brand` de `site-config.ts` — mais
nenhum ficheiro precisa de ser tocado. As cores são injectadas no
`<head>` como CSS custom properties (ver `__root.tsx`, função `RootShell`).

### Cores — 5 tokens hex

- `dark` — cor mais escura (hero, footer, botões primários)
- `darkAlt` — variação (hover, sidebar)
- `accent` — cor de destaque (ícones, links, CTAs)
- `accentSoft` — versão clara do accent (badges, bordas subtis)
- `background` — near-white do body

**3 paletas pré-testadas** — copiar e colar:

```ts
// Navy + azul claro (default)
{ dark: "#1E2A4E", darkAlt: "#2A3A6A", accent: "#6B94C4",
  accentSoft: "#B8CFE5", background: "#F8FAFD" }

// Preto + dourado clássico
{ dark: "#1A1A1A", darkAlt: "#2E2E2E", accent: "#B8935C",
  accentSoft: "#E4D3B3", background: "#FBFAF6" }

// Bordeaux + cinza quente
{ dark: "#4A1F27", darkAlt: "#6A2F38", accent: "#C99A88",
  accentSoft: "#E7D0C6", background: "#FBF8F6" }
```

Também actualizar `themeColor` (barra do browser em mobile) para bater
certo com `dark`.

### Logo

1. Colocar o ficheiro em `public/logo.png` ou `public/logo.svg` (SVG dá
   melhor renderização, PNG com fundo transparente também funciona).
2. Referenciar em `brand.logo`:

```ts
logo: {
  src: "/logo.png",     // Vite serve /public/ a partir da raiz
  alt: "Nome do escritório",
  height: 44,           // opcional, px, altura no header
},
```

Sem logo? Deixar `logo: null` — o header e footer caem para brand-mark
de texto (nome do escritório + label "Advogado(a)").

**Nota:** no footer, o logo é renderizado com filtro `brightness-0 invert`
para inverter em fundo escuro. Se o logo já for branco/light, remover
estas classes do `SiteFooter.tsx`.

## 4. Dev local

```sh
npm ci
RESEND_API_KEY=re_xxx LEAD_DESTINATION_EMAIL=teste@exemplo.pt npm run dev
```

Abre em `http://localhost:8080`. Sem as env vars o form dá erro no submit
(esperado); a navegação e leitura funcionam normalmente.

## 5. Secrets no GitHub

`Settings → Secrets and variables → Actions`:

**Secrets:**

| Nome | Como obter |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | [dash.cloudflare.com](https://dash.cloudflare.com/profile/api-tokens). Permissões: `Workers Scripts:Edit`, `Zone:Read`, `Workers Routes:Edit`. |
| `CLOUDFLARE_ACCOUNT_ID` | Sidebar do painel Cloudflare. |
| `RESEND_API_KEY` | [resend.com/api-keys](https://resend.com/api-keys), permissão `Sending`. |
| `LEAD_DESTINATION_EMAIL` | Email para onde vão as leads. |
| `LEAD_FROM_ADDRESS` | Formato `Escritório <geral@advogado.pt>`. Deixar vazio enquanto o domínio não está verificado no Resend — sandbox `onboarding@resend.dev` só entrega ao email da conta Resend. |

**Variables:**

| Nome | Descrição |
| --- | --- |
| `VITE_GA_MEASUREMENT_ID` | `G-XXXXXXX` do GA4. Opcional. Vazio = GA desactivado. |

## 6. Deploy

Push para `main` dispara o workflow. Sem `domain` no config, publica em
`<slug>.workers.dev`. Com `domain`, publica no domínio próprio
(Cloudflare cria o Custom Domain — o domínio tem de estar na Zone).

## 7. Domínio próprio

1. Registar o domínio (hostinger.pt, namecheap, etc.).
2. Adicionar no Cloudflare (Add a Site → Free plan).
3. Apontar nameservers no registrar para os que Cloudflare der.
4. Verificar o domínio no Resend (Domain → Add) e configurar registos
   SPF/DKIM/DMARC que ele indica no painel do teu DNS.
5. Editar `siteConfig.domain` no repo + preencher `LEAD_FROM_ADDRESS`
   com um endereço desse domínio (ex.: `geral@advogado.pt`). Commit + push.

## 8. Manutenção

- **Mudanças de texto:** edita `site-config.ts`, commit, push.
- **Nova área:** adiciona objecto ao array `areas`, commit, push. Rota
  `/areas-de-atuacao/<slug>` e sitemap actualizam-se sozinhos.
- **GA4 dashboards:** verificar em analytics.google.com que os eventos
  `contacto_enviado` estão a chegar após o consentimento ser aceite.

## Notas

- Formulário faz rate limit local (60s entre envios). Honeypot anti-bot.
- Analytics carrega só quando o utilizador aceita cookies — Consent Mode v2
  garante que nenhum hit é enviado antes disso, incluindo os que a Google
  usa para "consent modeling".
- Structured data `Attorney + LegalService` é gerado do `site-config.ts`.
