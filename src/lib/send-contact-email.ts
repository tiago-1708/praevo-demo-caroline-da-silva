import { createServerFn, getGlobalStartContext } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { contactSubmissionSchema } from "./contact-submission";
import { enforceContactRateLimit } from "./contact-rate-limiter";
import type { RuntimeEnv, ServerRequestContext } from "./server-context";

/**
 * Envio do formulário de contactos. Notifica o escritório por email
 * (Resend). Sem confirmação automática ao cliente — o escritório contacta
 * directamente pelos dados recebidos.
 *
 * Secrets: lidos de `context.env` (bindings do Worker em produção — ver
 * `src/server.ts`). Em `vite dev` local esse contexto não existe (o Worker
 * não corre em dev), por isso cai-se para `process.env`, que é o Node real
 * do `vite dev` — por isso `npm run dev` continua a funcionar com
 * `RESEND_API_KEY=... npm run dev` como documentado no SCAFFOLD.
 *
 * `getGlobalStartContext()` devolve em runtime exactamente o que passámos
 * em `handler.fetch(request, { context: { env } })` — confirmado a ler o
 * código-fonte de `@tanstack/start-client-core`/`start-server-core`. O tipo
 * inferido dessa função não resolve correctamente nesta versão do pacote
 * (fica `never` apesar do `Register` estar aumentado — bug de inferência
 * genérica a montante, não um erro de tipagem nosso), por isso o cast
 * explícito abaixo é necessário e seguro.
 */
function currentEnv(): RuntimeEnv {
  return (getGlobalStartContext() as ServerRequestContext | undefined)?.env ?? {};
}

const HONEYPOT_MIN_ELAPSED_MS = 1200;

const runtimeConfigSchema = z.object({
  apiKey: z.string().min(1),
  to: z.string().email(),
  from: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[^\r\n]*$/, "from inválido"),
});

function readRuntimeConfig() {
  const env = currentEnv();
  const apiKey = env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  const to = env.LEAD_DESTINATION_EMAIL ?? process.env.LEAD_DESTINATION_EMAIL;
  const from =
    env.LEAD_FROM_ADDRESS ?? process.env.LEAD_FROM_ADDRESS ?? "Escritório <onboarding@resend.dev>";

  return runtimeConfigSchema.safeParse({ apiKey, to, from });
}

function escapeHtml(value: string) {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return value.replace(/[&<>"']/g, (c) => map[c]);
}

function jsonResponse(status: number, body: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator(contactSubmissionSchema)
  .handler(async ({ data }) => {
    const request = getRequest();

    // Honeypot preenchido ou submissão mais rápida do que um humano
    // consegue ler+preencher o formulário: aceitar em silêncio, sem enviar
    // nem gastar quota do Resend, sem dar ao bot sinal de que foi apanhado.
    const elapsed = Date.now() - data.formStartedAt;
    if (data.website || elapsed < HONEYPOT_MIN_ELAPSED_MS) {
      return { accepted: true as const };
    }

    await enforceContactRateLimit(currentEnv(), request);

    const config = readRuntimeConfig();
    if (!config.success) {
      throw jsonResponse(503, { error: "email_unavailable" });
    }
    const { apiKey, to, from } = config.data;

    const message = data.message
      ? `<p><strong>Mensagem:</strong><br>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>`
      : "<p><em>Sem mensagem.</em></p>";

    const html = `
      <h2>Novo pedido de contacto</h2>
      <p><strong>Nome:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Telefone:</strong> ${escapeHtml(data.phone)}</p>
      ${message}
      <hr>
      <p style="font-size:12px;color:#666">Recebido pelo formulário do site.</p>
    `.trim();

    const text = [
      "Novo pedido de contacto",
      `Nome: ${data.name}`,
      `Email: ${data.email}`,
      `Telefone: ${data.phone}`,
      data.message ? `Mensagem:\n${data.message}` : "Sem mensagem.",
      "",
      "Recebido pelo formulário do site.",
    ].join("\n");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    let res: Response;
    try {
      res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: data.email,
          subject: `[Site] Novo contacto — ${data.name}`,
          html,
          text,
        }),
        signal: controller.signal,
      });
    } catch (error) {
      console.error("Falha ao contactar o Resend:", error);
      throw jsonResponse(502, { error: "email_provider_error" });
    } finally {
      clearTimeout(timeout);
    }

    if (!res.ok) {
      // Nunca devolver o body/estado do Resend ao cliente — só log interno.
      console.error(`Resend respondeu ${res.status} ao enviar contacto.`);
      throw jsonResponse(502, { error: "email_provider_error" });
    }

    return { accepted: true as const };
  });
