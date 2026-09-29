import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig, siteName } from "@/lib/site-config";

const nav = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/areas-de-atuacao", label: "Áreas de Prática" },
  { to: "/contactos", label: "Contactos" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const a = siteConfig.advogado;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[color:var(--navy-deep)]/95 backdrop-blur border-b border-[color:var(--gold)]/20"
          : "bg-[color:var(--navy-deep)]/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:py-5">
        <Link to="/" className="flex min-w-0 items-center gap-3 text-[color:var(--ivory)]">
          {siteConfig.brand.logo ? (
            <img
              src={siteConfig.brand.logo.src}
              alt={siteConfig.brand.logo.alt}
              style={{ height: siteConfig.brand.logo.height ?? 44 }}
              className="w-auto object-contain"
            />
          ) : (
            <span className="min-w-0">
              <span className="block truncate font-serif text-base leading-tight sm:text-lg">
                {siteName()}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[color:var(--gold-soft)]/80">
                Advogado(a)
              </span>
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="link-underline text-sm tracking-wide text-[color:var(--ivory)]/85 transition-colors hover:text-[color:var(--gold)]"
              activeProps={{ className: "text-[color:var(--gold)]" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${a.phoneE164}`}
            className="flex items-center gap-2 text-sm tracking-wide text-[color:var(--ivory)]/85 transition-colors hover:text-[color:var(--gold)]"
          >
            <Phone className="h-4 w-4 text-[color:var(--gold)]" aria-hidden />
            {a.phoneDisplay}
          </a>
          <Link
            to="/contactos"
            className="btn-primary px-5 py-2.5 text-xs uppercase tracking-[0.2em]"
          >
            Agendar consulta
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${a.phoneE164}`}
            className="btn-primary gap-2 px-3.5 py-2 text-xs uppercase tracking-[0.15em]"
            aria-label="Ligar para o escritório"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Ligar
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-full p-1.5 text-[color:var(--ivory)] transition-colors hover:bg-white/10"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[color:var(--gold)]/20 bg-[color:var(--navy-deep)] lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                className="border-b border-[color:var(--gold)]/10 py-3 text-sm text-[color:var(--ivory)]/85"
                activeProps={{ className: "text-[color:var(--gold)]" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contactos"
              onClick={() => setOpen(false)}
              className="btn-primary mt-4 px-5 py-3 text-xs uppercase tracking-[0.2em]"
            >
              Agendar consulta
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
