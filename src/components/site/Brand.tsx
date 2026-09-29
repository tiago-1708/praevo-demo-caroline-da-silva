import { siteConfig } from "@/lib/site-config";

type WordmarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { mono: "text-[1.7rem]", name: "text-[7.5px] tracking-[0.32em]", gap: "mt-1" },
  md: { mono: "text-4xl", name: "text-[9px] tracking-[0.34em]", gap: "mt-1.5" },
  lg: { mono: "text-[6.5rem] sm:text-[8rem]", name: "text-xs tracking-[0.42em]", gap: "mt-3" },
} as const;

/**
 * Wordmark em texto que evoca o monograma do escritório: "JRR" em serifa
 * com o nome do advogado em versaletes por baixo. Herda a cor do contexto.
 */
export function Wordmark({ size = "sm", className }: WordmarkProps) {
  const s = sizes[size];
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className ?? ""}`}>
      <span className={`font-serif font-medium tracking-[0.06em] ${s.mono}`} aria-hidden>
        JRR
      </span>
      <span
        className={`${s.gap} whitespace-nowrap font-serif uppercase text-[color:var(--gold)] ${s.name}`}
        aria-hidden
      >
        {siteConfig.advogado.name}
      </span>
      <span className="sr-only">{siteConfig.advogado.firm}</span>
    </span>
  );
}

/* ------------------------------------------------------------------------ */
/* Padrão de curvas de nível (contornos topográficos)                        */
/* ------------------------------------------------------------------------ */

type Peak = { cx: number; cy: number; rings: number; step: number; seed: number };

// Três "cumes" com anéis concêntricos deformados por harmónicas. Tudo
// determinístico: o SVG gerado no servidor é igual ao do cliente.
const PEAKS: Peak[] = [
  { cx: 980, cy: 170, rings: 16, step: 26, seed: 0.7 },
  { cx: 180, cy: 640, rings: 13, step: 28, seed: 2.1 },
  { cx: 1320, cy: 760, rings: 9, step: 30, seed: 4.3 },
];

function ringPath(p: Peak, i: number) {
  const r0 = 18 + i * p.step;
  const n = 72;
  const pts: [number, number][] = [];
  for (let k = 0; k < n; k++) {
    const t = (k / n) * Math.PI * 2;
    const r =
      r0 *
      (1 +
        0.13 * Math.sin(3 * t + p.seed + i * 0.22) +
        0.07 * Math.sin(5 * t + p.seed * 1.7 - i * 0.15) +
        0.035 * Math.sin(8 * t + i * 0.4));
    pts.push([p.cx + r * Math.cos(t) * 1.25, p.cy + r * Math.sin(t)]);
  }
  // Curva suave: quadráticas entre pontos médios.
  const mid = (a: [number, number], b: [number, number]) =>
    [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] as const;
  const f = (v: number) => v.toFixed(1);
  const start = mid(pts[n - 1], pts[0]);
  let d = `M${f(start[0])} ${f(start[1])}`;
  for (let k = 0; k < n; k++) {
    const m = mid(pts[k], pts[(k + 1) % n]);
    d += `Q${f(pts[k][0])} ${f(pts[k][1])} ${f(m[0])} ${f(m[1])}`;
  }
  return `${d}Z`;
}

const CONTOUR_PATHS = PEAKS.flatMap((p) =>
  Array.from({ length: p.rings }, (_, i) => ({ d: ringPath(p, i), major: i % 4 === 3 })),
);

/**
 * Textura de contornos em bronze para fundos escuros. Decorativa: posicionar
 * dentro de um contentor `relative overflow-hidden`.
 */
export function ContourPattern({
  className,
  opacity = 0.22,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
      style={{ opacity }}
    >
      <g fill="none" stroke="var(--gold)">
        {CONTOUR_PATHS.map((p, i) => (
          <path
            key={i}
            d={p.d}
            strokeWidth={p.major ? 1.3 : 0.7}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}

/** Rótulo de secção: filete + texto em maiúsculas espaçadas. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-[color:var(--gold)]" : "text-[color:var(--gold-ink)]";
  const rule = tone === "dark" ? "bg-[color:var(--gold)]" : "bg-[color:var(--gold-ink)]";
  return (
    <p
      className={`mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] ${color} ${className ?? ""}`}
    >
      <span className={`h-px w-10 ${rule}`} />
      {children}
    </p>
  );
}

/** Hero escuro das páginas interiores, com textura de contornos. */
export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative -mt-20 overflow-hidden bg-[color:var(--navy-deep)] text-[color:var(--ivory)]">
      <ContourPattern opacity={0.16} />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/50 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div className="animate-fade-rise">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        </div>
        <h1 className="animate-fade-rise delay-1 max-w-3xl font-serif text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children && (
          <div className="animate-fade-rise delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--ivory)]/80">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

/** Marca visual para dados ainda por confirmar com o cliente. */
export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm border border-dashed border-current/40 px-1.5 py-0.5 text-[0.92em] opacity-80">
      {children}
    </span>
  );
}
