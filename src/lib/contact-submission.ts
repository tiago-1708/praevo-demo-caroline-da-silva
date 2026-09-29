import { z } from "zod";

/** Bloqueia caracteres de controlo (inclui CR/LF, usados em header/log injection). */
// eslint-disable-next-line no-control-regex -- intencional: é para isto que serve.
const NO_CONTROL_CHARS = /^[^\x00-\x1f\x7f]*$/;

/**
 * Schema único, partilhado entre `contactos.tsx` (validação no cliente,
 * feedback imediato) e `send-contact-email.ts` (validação no servidor,
 * autoritativa). Uma só fonte de verdade — nunca deixar as duas cópias
 * divergirem.
 */
export const contactSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indique o nome e apelido.")
    .max(120, "Nome demasiado longo.")
    .regex(NO_CONTROL_CHARS, "Nome inválido."),
  email: z.string().trim().email("Email inválido.").max(255),
  phone: z
    .string()
    .trim()
    .min(6, "Indique o número de telefone.")
    .max(40, "Número de telefone demasiado longo.")
    .regex(NO_CONTROL_CHARS, "Telefone inválido."),
  message: z.string().trim().max(2000, "Mensagem demasiado longa.").optional().default(""),
  consent: z.literal(true, {
    message: "É necessário aceitar o Aviso Legal e a Política de Privacidade.",
  }),
  // Honeypot: campo escondido do olho humano por CSS. Só um bot que lê o DOM
  // cru o preenche. Tem de chegar vazio.
  website: z.string().max(0, "Pedido inválido.").optional().default(""),
  // Timestamp (ms epoch) de quando o formulário ficou visível. Usado para
  // rejeitar submissões instantâneas (bots que não esperam pelo render).
  formStartedAt: z.number().int().positive(),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
