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
import { siteConfig, siteName, baseUrl } from "../lib/site-config";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary px-5 py-2.5 text-sm font-medium">
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
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo correu mal. Tente actualizar ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary px-5 py-2.5 text-sm font-medium"
          >
            Tentar novamente
          </button>
          <a href="/" className="btn-outline px-5 py-2.5 text-sm font-medium text-foreground">
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

const structuredData = () => {
  const a = siteConfig.advogado;
  return {
    "@context": "https://schema.org",
    "@type": ["Attorney", "LegalService"],
    "@id": `${baseUrl()}/#escritorio`,
    url: baseUrl(),
    name: siteName(),
    description: a.bio.replace(/<[^>]+>/g, "").slice(0, 300),
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      postalCode: a.postalCode,
      addressLocality: a.locality,
      addressRegion: a.district,
      addressCountry: "PT",
    },
    telephone: a.phoneE164,
    email: a.email,
    areaServed: [a.locality, a.district, "Portugal"],
    priceRange: "€€",
    knowsAbout: siteConfig.areas.map((x) => x.title),
  };
};

const dynamicFaviconHref = () => {
  const initial = siteName().charAt(0).toUpperCase();
  const c = siteConfig.brand.colors;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="12" fill="${c.dark}"/><text x="50" y="72" font-family="Georgia,serif" font-weight="600" font-size="64" text-anchor="middle" fill="${c.background}">${initial}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${siteName()} — Advogado em ${siteConfig.advogado.locality}` },
      {
        name: "description",
        content: `Escritório de advocacia de ${siteName()} em ${siteConfig.advogado.locality}. Cédula profissional n.º ${siteConfig.advogado.cedula}.`,
      },
      { name: "author", content: siteName() },
      { name: "theme-color", content: siteConfig.themeColor },
      { property: "og:site_name", content: siteName() },
      { property: "og:title", content: siteName() },
      {
        property: "og:description",
        content: `Escritório de advocacia em ${siteConfig.advogado.locality}.`,
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
      // Favicon dinâmico: gerado a partir da primeira letra do siteName +
      // brand.colors.dark. Muda automaticamente para qualquer cliente.
      // Para usar logo próprio, colocar em public/favicon.svg e trocar aqui.
      { rel: "icon", href: dynamicFaviconHref(), type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap",
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
  const brandCss = `:root{--navy-deep:${b.dark};--navy:${b.darkAlt};--gold:${b.accent};--gold-soft:${b.accentSoft};--ivory:${b.background};--background:${b.background};--primary:${b.dark};--primary-foreground:${b.background};--accent:${b.accent};--accent-foreground:${b.dark};--ring:${b.accent};--foreground:${b.dark};--card:#ffffff;--card-foreground:${b.dark};--popover:#ffffff;--popover-foreground:${b.dark};--sidebar:${b.background};--sidebar-foreground:${b.dark};--sidebar-primary:${b.dark};--sidebar-primary-foreground:${b.background};--sidebar-accent:${b.accent};--sidebar-accent-foreground:${b.dark};--sidebar-ring:${b.accent};}`;
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
