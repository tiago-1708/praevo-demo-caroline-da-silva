import type { RuntimeEnv } from "./server-context";

/**
 * Rate limit do formulário de contacto via o binding nativo de Rate
 * Limiting da Cloudflare (GA desde set/2025) — não um Durable Object.
 *
 * Porquê não Durable Object: exigiria o plano Workers Paid (a conta CF
 * aloja dezenas de sites de clientes Praevo Technologies, cada um o seu Worker) e uma
 * classe + migration novas para gerir em cada repo-cliente clonado deste
 * template. O binding nativo dá a mesma proteção prática sem essa
 * dependência nem esse código.
 *
 * Trade-off aceite: o binding só aceita janelas de 10 ou 60 segundos (não
 * minutos). Configurado para 5 pedidos / 60s em `wrangler.json` — mais
 * apertado que os "5 por 10 min" pedidos originalmente, mas equivalente na
 * prática para travar rajadas de bot num formulário de contacto de baixo
 * tráfego.
 */

function isLocalRequest(request: Request): boolean {
  const { hostname } = new URL(request.url);
  return hostname === "localhost" || hostname === "127.0.0.1";
}

async function hashIp(ip: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function jsonResponse(status: number, body: Record<string, string>, headers?: HeadersInit) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

/**
 * Lança uma `Response` (429/503) se o pedido exceder o limite. Não lança
 * nada em caso de sucesso.
 */
export async function enforceContactRateLimit(env: RuntimeEnv, request: Request): Promise<void> {
  const limiter = env.CONTACT_RATE_LIMITER;
  const ip = request.headers.get("cf-connecting-ip");

  if (!limiter || !ip) {
    // `vite dev` local não corre dentro do Worker — não há binding real nem
    // header cf-connecting-ip. Deixar passar só em localhost; em produção
    // isto significa que o binding não está configurado, o que é um erro
    // de configuração, não algo a ignorar silenciosamente.
    if (isLocalRequest(request)) return;
    throw jsonResponse(503, { error: "rate_limit_unavailable" });
  }

  const { success } = await limiter.limit({ key: await hashIp(ip) });
  if (!success) {
    throw jsonResponse(429, { error: "rate_limited" }, { "Retry-After": "60" });
  }
}
