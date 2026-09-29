/**
 * Prepara wrangler.json gerado pelo build para o deploy do Worker.
 *
 * Lê o slug e domínio do src/lib/site-config.ts para não haver duas fontes
 * de verdade. Como o site-config.ts é TypeScript, extraímos os valores com
 * uma regex simples (o config tem um formato fixo e previsível — não é
 * necessário compilar TS aqui).
 */

import { readFileSync, writeFileSync } from "node:fs";

const CONFIG_TS = "src/lib/site-config.ts";
const WRANGLER = ".output/server/wrangler.json";

const source = readFileSync(CONFIG_TS, "utf8");

const slugMatch = source.match(/slug:\s*"([^"]+)"/);
const domainMatch = source.match(/domain:\s*(null|"[^"]+")/);

if (!slugMatch) {
  throw new Error(`Não encontrei "slug" em ${CONFIG_TS}. Verificar formato.`);
}
const slug = slugMatch[1];
const domain = domainMatch && domainMatch[1] !== "null" ? domainMatch[1].slice(1, -1) : null;

const config = JSON.parse(readFileSync(WRANGLER, "utf8"));
config.name = slug;

// Binding nativo de Rate Limiting da Cloudflare (GA desde set/2025, sem
// exigir Durable Objects nem o plano Workers Paid) para o formulário de
// contacto — ver src/lib/contact-rate-limiter.ts. namespace_id só precisa
// de ser único dentro deste Worker; 1001 é arbitrário.
const hasContactRateLimiter = (config.ratelimits ?? []).some(
  (binding) => binding.name === "CONTACT_RATE_LIMITER",
);
if (!hasContactRateLimiter) {
  config.ratelimits = [
    ...(config.ratelimits ?? []),
    {
      name: "CONTACT_RATE_LIMITER",
      namespace_id: "1001",
      simple: { limit: 5, period: 60 },
    },
  ];
}

if (domain) {
  config.routes = [{ pattern: domain, custom_domain: true }];
  delete config.workers_dev;
  console.log(`✓ Worker "${slug}" preparado para ${domain}`);
} else {
  config.workers_dev = true;
  delete config.routes;
  console.log(`✓ Worker "${slug}" preparado para ${slug}.workers.dev`);
}

writeFileSync(WRANGLER, `${JSON.stringify(config, null, 2)}\n`);
