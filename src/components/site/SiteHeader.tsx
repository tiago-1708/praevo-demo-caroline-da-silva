import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Wordmark } from "./Brand";

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
        scrolled || open
          ? "border-b border-[color:var(--gold)]/20 bg-[color:var(--navy-deep)]/95 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5 lg:py-4">
        <Link
          to="/"
          className="flex min-w-0 items-center text-[color:var(--ivory)]"
          aria-label={`${siteConfig.advogado.firm} — início`}
        >
          <Wordmark size="sm" />
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
          <Link to="/contactos" className="btn-primary btn-sm">
            Marcar reunião
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${a.phoneE164}`}
            className="btn-primary btn-sm"
            aria-label="Ligar para o escritório"
          >
            <Phone className="h-4 w-4" aria-hidden />
            Ligar
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-sm p-1.5 text-[color:var(--ivory)] transition-colors hover:bg-white/10"
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
            <Link to="/contactos" onClick={() => setOpen(false)} className="btn-primary mt-4">
              Marcar reunião
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
