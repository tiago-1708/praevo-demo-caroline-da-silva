import { useId } from "react";
import { siteConfig } from "@/lib/site-config";

/*
 * Proposta de logótipo — monograma "CS" (Caroline da Silva).
 *
 * Construção: o C e o S são os desenhos da Bodoni Moda (opsz 28, peso 600),
 * convertidos em caminhos. O S, a 68% da altura do C, assenta no interior do
 * C e cruza a haste à frente: a haste do C é interrompida por uma folga à
 * volta do S (máscara), como num entrelaçado gravado. O remate superior do S
 * fica paralelo ao bico do C.
 *
 * Tudo em `currentColor`: a cor vem do contexto (dourado em fundo escuro,
 * bordeaux ou preto em fundo claro). Versões estáticas em public/logo*.svg.
 */

const C_PATH =
  "M352 770Q244.5 770 165.5 720.3Q86.5 670.5 43.3 583.5Q0 496.5 0 385Q0 273.5 43.3 186.5Q86.5 99.5 165.5 49.8Q244.5 0 352 0Q400 0 441.8 16.8Q483.5 33.5 515.5 63.5L591 10L598 10L598 224L590 224Q579 161.5 546.3 113.5Q513.5 65.5 465.8 38.3Q418 11 362 11Q302.5 11 261.8 43.3Q221 75.5 196.8 129.8Q172.5 184 161.8 250.3Q151 316.5 151 385Q151 453 161.8 519.5Q172.5 586 196.8 640.3Q221 694.5 261.8 726.8Q302.5 759 362 759Q413 759 453.8 742.3Q494.5 725.5 524.8 696Q555 666.5 574 628Q593 589.5 600 546L608 546L608 760L601 760L531.5 702Q499 733.5 453.5 751.8Q408 770 352 770";
const S_PATH =
  "M415.1 648.2Q373.9 648.2 344.3 635.1Q314.8 622 294.4 599.6L243.7 644.8L238.9 644.8L238.9 493.2L244.4 493.2Q252.2 522.7 265.6 549.6Q279.1 576.5 298.9 597.4Q318.8 618.3 346.4 630.4Q373.9 642.4 410.6 642.4Q444.6 642.4 469.5 629.7Q494.3 616.9 507.9 593.5Q521.5 570 521.5 538Q521.5 509.5 506.5 489.9Q491.6 470.4 467.3 456.1Q442.9 441.8 413.5 429.4Q384.1 417 354.9 402.7Q325.6 388.4 301.2 369.1Q276.7 349.7 261.9 321.6Q247.1 293.6 247.1 253.1Q247.1 212.7 267.5 182.9Q287.9 153.2 321.4 137.2Q354.9 121.2 394 121.2Q426.3 121.2 452.8 131.4Q479.3 141.6 499.4 162.3L549 121.2L553.4 121.2L553.4 268.8L548.3 268.8Q537.5 222.9 516.7 191.2Q496 159.6 466.2 143.5Q436.5 127.3 399.1 127.3Q354.9 127.3 332.1 150.6Q309.3 173.9 309.3 210.3Q309.3 236.1 323.9 254Q338.6 271.8 362.5 285.6Q386.5 299.4 415.4 312.1Q444.3 324.9 473.2 339.8Q502.1 354.8 526.1 375.3Q550 395.9 564.8 425.2Q579.6 454.4 579.6 495.9Q579.6 542.1 558.5 576.3Q537.5 610.5 500.2 629.3Q463 648.2 415.1 648.2";
const W = 608;
const H = 770;
const GAP = 14;

/** Monograma isolado. Legível a partir de 32px de altura. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  // Id único por instância (a máscara é referenciada por url(#id)).
  const maskId = `cs-mask-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <mask id={maskId} maskUnits="userSpaceOnUse" x={-50} y={-50} width={W + 100} height={H + 100}>
        <rect x={-50} y={-50} width={W + 100} height={H + 100} fill="#fff" />
        <path d={S_PATH} fill="#000" stroke="#000" strokeWidth={GAP * 2} />
      </mask>
      <path d={C_PATH} fill="currentColor" mask={`url(#${maskId})`} />
      <path d={S_PATH} fill="currentColor" />
    </svg>
  );
}

type LogoProps = {
  variant?: "mark" | "lockup";
  /** `row`: monograma à esquerda (header, rodapé). `stack`: por cima (hero, Sobre). */
  layout?: "row" | "stack";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const markSizes = {
  sm: "h-8 w-auto sm:h-9",
  md: "h-12 w-auto",
  lg: "h-36 w-auto sm:h-44",
} as const;

const nameSizes = {
  sm: "text-[11px] tracking-[0.14em] sm:text-[12px] sm:tracking-[0.2em]",
  md: "text-[13px] tracking-[0.24em]",
  lg: "text-[15px] tracking-[0.26em] sm:text-base",
} as const;

/**
 * Logótipo: `mark` (monograma) ou `lockup` (monograma + "CAROLINE DA SILVA" +
 * "ADVOGADA" em versaletes). O monograma usa `--gold` e o nome herda a cor do
 * contexto — pensado para fundo escuro (nome em marfim).
 */
export function Logo({ variant = "lockup", layout = "row", size = "sm", className }: LogoProps) {
  const a = siteConfig.advogado;
  const name = a.name.replace(/^Dra?\.\s*/, "");

  if (variant === "mark") {
    return (
      <span className={`inline-flex text-[color:var(--gold)] ${className ?? ""}`}>
        <LogoMark className={markSizes[size]} title={a.name} />
      </span>
    );
  }

  const stack = layout === "stack";
  return (
    <span
      className={`inline-flex items-center leading-none ${stack ? "flex-col text-center" : "gap-3"} ${className ?? ""}`}
    >
      <LogoMark className={`${markSizes[size]} shrink-0 text-[color:var(--gold)]`} />
      <span className={`flex flex-col ${stack ? "mt-7 items-center" : ""}`} aria-hidden>
        <span className={`whitespace-nowrap font-serif uppercase ${nameSizes[size]}`}>{name}</span>
        {stack && <span className="mt-4 h-px w-12 bg-[color:var(--gold)]/60" />}
        <span
          className={`font-serif uppercase text-[color:var(--gold)] ${
            size === "lg"
              ? "mt-4 text-[11px] tracking-[0.5em]"
              : "mt-1.5 text-[9px] tracking-[0.42em]"
          }`}
        >
          Advogada
        </span>
      </span>
      <span className="sr-only">{a.name}, Advogada</span>
    </span>
  );
}
