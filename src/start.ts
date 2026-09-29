import { createStart, createMiddleware, createCsrfMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

/**
 * As server functions são endpoints RPC de mesma origem. Sem esta proteção, um
 * site de terceiros podia disparar `sendContactEmail` a partir do browser de
 * qualquer visitante — a encher a caixa do escritório e a queimar a quota do
 * Resend. O rate limit não cobre isto: vive no localStorage do cliente e
 * contorna-se trivialmente.
 */
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    // Respostas HTTP deliberadas (ex.: os 429/502/503 lançados por
    // `sendContactEmail`) já são o resultado pretendido — deixar passar
    // intactas. Só erros verdadeiramente inesperados viram a página
    // genérica.
    if (error instanceof Response) {
      throw error;
    }
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// O CSRF vem primeiro: um pedido cross-site deve ser rejeitado antes de
// chegar a qualquer lógica de negócio.
export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, errorMiddleware],
}));
