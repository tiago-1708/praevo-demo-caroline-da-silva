/* ------------------------------------------------------------------------ */
/* Textura guilloché                                                          */
/* ------------------------------------------------------------------------ */

/**
 * Textura guilloché em dourado para fundos escuros: rosetas de linhas finas
 * entrelaçadas, como em papel-moeda ou títulos gravados. O desenho vive em
 * public/textures/guilloche.svg, gerado de forma determinística por
 * scripts/generate-guilloche.mjs (sem Math.random: SSR e cliente iguais), e é
 * aplicado como máscara — a cor vem do token --gold. Decorativa: posicionar
 * dentro de um contentor `relative overflow-hidden`.
 */
export function Guilloche({
  className,
  opacity = 0.2,
  flip = false,
}: {
  className?: string;
  opacity?: number;
  /** Espelha na horizontal, para variar a posição das rosetas entre blocos. */
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`guilloche ${flip ? "-scale-x-100" : ""} ${className ?? ""}`}
      style={{ opacity }}
    />
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
      <span className={`h-px w-10 shrink-0 ${rule}`} />
      {children}
    </p>
  );
}

/** Hero escuro das páginas interiores, com textura guilloché. */
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
    <section className="surface-dark relative -mt-20 overflow-hidden bg-[color:var(--navy-deep)] text-[color:var(--ivory)]">
      <Guilloche opacity={0.16} />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/50 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div className="animate-fade-rise">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        </div>
        <h1 className="animate-fade-rise delay-1 max-w-3xl font-serif text-4xl leading-[1.08] font-medium sm:text-5xl lg:text-6xl">
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

/** Marca visual para dados ainda por confirmar com a cliente. */
export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm border border-dashed border-current/40 px-1.5 py-0.5 text-[0.92em] opacity-80">
      {children}
    </span>
  );
}
