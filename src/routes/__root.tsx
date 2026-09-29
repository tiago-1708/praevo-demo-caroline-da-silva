import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { siteConfig, siteName, baseUrl, isPlaceholder, emLocalidade } from "../lib/site-config";
import { LogoMark } from "../components/site/Logo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <LogoMark className="mx-auto h-14 w-auto text-[color:var(--gold-ink)]" />
        <h1 className="mt-8 font-serif text-7xl text-foreground">404</h1>
        <h2 className="mt-4 font-serif text-2xl text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary btn-sm">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <LogoMark className="mx-auto h-14 w-auto text-[color:var(--gold-ink)]" />
        <h1 className="mt-8 font-serif text-3xl text-foreground">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo correu mal. Tente actualizar ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary btn-sm"
          >
            Tentar novamente
          </button>
          <a href="/" className="btn-outline btn-sm text-foreground">
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

const structuredData = () => {
  const a = siteConfig.advogado;
  // Placeholders ("[...]", "9XX XXX XXX") ficam de fora dos dados estruturados.
  const known = (v: string) => !isPlaceholder(v);
  const address = {
    ...(known(a.street) ? { streetAddress: a.street } : {}),
    ...(known(a.postalCode) ? { postalCode: a.postalCode } : {}),
    ...(known(a.locality) ? { addressLocality: a.locality } : {}),
    ...(known(a.district) ? { addressRegion: a.district } : {}),
  };
  return {
    "@context": "https://schema.org",
    "@type": ["Attorney", "LegalService"],
    "@id": `${baseUrl()}/#escritorio`,
    url: baseUrl(),
    name: siteName(),
    description: a.bio.replace(/<[^>]+>/g, "").slice(0, 300),
    address: { "@type": "PostalAddress", ...address, addressCountry: "PT" },
    ...(known(a.phoneE164) ? { telephone: a.phoneE164 } : {}),
    ...(known(a.email) ? { email: a.email } : {}),
    areaServed: [a.locality, a.district, "Portugal"].filter(known),
    priceRange: "€€",
    knowsAbout: siteConfig.areas.map((x) => x.title),
  };
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${siteName()} — Advogada${emLocalidade()}` },
      {
        name: "description",
        content: `${siteName()}, advogada${emLocalidade()}. ${siteConfig.perfil.tagline}.`,
      },
      // Site demo: nunca indexar (usa o nome real da advogada).
      ...(siteConfig.demo ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { name: "author", content: siteName() },
      { name: "theme-color", content: siteConfig.themeColor },
      { property: "og:site_name", content: siteName() },
      { property: "og:title", content: siteName() },
      {
        property: "og:description",
        content: `Advogada${emLocalidade()}. ${siteConfig.perfil.tagline}.`,
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_PT" },
      { name: "twitter:card", content: "summary" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData()),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Favicon: monograma "CS" em dourado sobre preto (proposta de logótipo,
      // ver src/components/site/Logo.tsx).
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        // Bodoni Moda (títulos, eixo óptico 6–96) + Manrope (texto).
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..600&family=Manrope:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const b = siteConfig.brand.colors;
  // Injecta a paleta do cliente como CSS custom properties. Sobrepõe os
  // defaults do styles.css (que ficam como fallback). Alterar a paleta =
  // editar siteConfig.brand.colors em site-config.ts.
  const brandCss = `:root{--navy-deep:${b.dark};--navy:${b.darkAlt};--gold:${b.accent};--gold-soft:${b.accentSoft};--gold-ink:${b.accentInk};--ivory:${b.background};--background:${b.background};--primary:${b.dark};--primary-foreground:${b.background};--accent:${b.accent};--accent-foreground:${b.dark};--ring:${b.accentInk};--foreground:${b.dark};--card:#ffffff;--card-foreground:${b.dark};--popover:#ffffff;--popover-foreground:${b.dark};--sidebar:${b.background};--sidebar-foreground:${b.dark};--sidebar-primary:${b.dark};--sidebar-primary-foreground:${b.background};--sidebar-accent:${b.accent};--sidebar-accent-foreground:${b.dark};--sidebar-ring:${b.accentInk};}`;
  return (
    <html lang="pt-PT">
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: brandCss }} />
        {/* Sem JS o useReveal não corre: o conteúdo não pode ficar invisível. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: "<style>.reveal{opacity:1!important;transform:none!important}</style>",
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
