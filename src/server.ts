import "./lib/error-capture";
import "./lib/server-context";

import handler from "@tanstack/react-start/server-entry";
import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import type { RuntimeEnv } from "./lib/server-context";
import { siteConfig } from "./lib/site-config";

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
// Scoped narrowly to that exact signature: it must never touch the 429/502/503
// JSON responses `sendContactEmail` throws deliberately (those have a
// different, unrelated body shape and are handled by the client's RPC call,
// not by a document-level error page).
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

const SECURITY_HEADERS: Record<string, string> = {
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Content-Security-Policy": [
    "default-src 'self'",
    // 'unsafe-inline' no script/style: TanStack Start injeta CSS crítico e o
    // payload de hidratação inline no HTML. Um CSP com nonce seria mais
    // apertado, mas exige fio dedicado da geração do nonce até ao SSR —
    // fora do âmbito deste endurecimento. As origens continuam restritas.
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
    "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://stats.g.doubleclick.net",
    "frame-src https://www.google.com",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};

function isPublicHtmlDocument(request: Request, response: Response): boolean {
  if (request.method !== "GET") return false;
  if (response.status !== 200) return false;
  if (response.headers.has("set-cookie")) return false;
  return (response.headers.get("content-type") ?? "").includes("text/html");
}

function hardenResponse(request: Request, response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  // Site demo: bloqueia indexação em todas as respostas (HTML, sitemap, assets).
  if (siteConfig.demo) {
    headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  if (new URL(request.url).protocol === "https:") {
    headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
  }
  if (isPublicHtmlDocument(request, response)) {
    headers.set("Cache-Control", "public, max-age=0, s-maxage=600, stale-while-revalidate=60");
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: RuntimeEnv) {
    try {
      const response = await handler.fetch(request, { context: { env } });
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return hardenResponse(request, normalized);
    } catch (error) {
      // Erro inesperado fora do alcance do h3 (ex.: falha antes do handler
      // arrancar). Log estruturado só no servidor — nunca payload do
      // utilizador, nunca ao cliente.
      console.error(error);
      return hardenResponse(
        request,
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
