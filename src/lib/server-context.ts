/**
 * Tipagem do contexto de pedido passado ao Worker em `src/server.ts`.
 *
 * `Register["server"]["requestContext"]` tem de ser aumentado em
 * `@tanstack/router-core` (não em `@tanstack/react-router` — esse pacote só
 * reexporta `Register` como tipo, não declara o interface original, pelo
 * que uma augmentation lá não faz merge).
 */

export type ContactRateLimiterBinding = {
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
};

export type RuntimeEnv = {
  RESEND_API_KEY?: string;
  LEAD_DESTINATION_EMAIL?: string;
  LEAD_FROM_ADDRESS?: string;
  CONTACT_RATE_LIMITER?: ContactRateLimiterBinding;
};

export type ServerRequestContext = {
  env: RuntimeEnv;
};

declare module "@tanstack/router-core" {
  interface Register {
    server: {
      requestContext: ServerRequestContext;
    };
  }
}

declare module "@tanstack/react-router" {
  interface Register {
    server: {
      requestContext: ServerRequestContext;
    };
  }
}
