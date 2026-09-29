import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, siteName } from "@/lib/site-config";
import { reopenCookieConsent } from "./CookieConsent";
import { ContourPattern, Wordmark } from "./Brand";

export function SiteFooter() {
  const a = siteConfig.advogado;

  return (
    <footer className="relative overflow-hidden bg-[color:var(--navy-deep)] text-[color:var(--ivory)]/80">
      <ContourPattern opacity={0.08} />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="inline-block text-[color:var(--ivory)]" aria-label="Início">
            <Wordmark size="md" />
          </Link>
          <p className="mt-6 text-sm leading-relaxed">
            {siteConfig.perfil.tagline}.
            <br />
            Atendimento presencial em {a.locality}.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-serif text-sm uppercase tracking-[0.25em] text-[color:var(--gold)]">
            Navegação
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[color:var(--gold)]">
                Início
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="hover:text-[color:var(--gold)]">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/areas-de-atuacao" className="hover:text-[color:var(--gold)]">
                Áreas de Prática
              </Link>
            </li>
            <li>
              <Link to="/contactos" className="hover:text-[color:var(--gold)]">
                Contactos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-serif text-sm uppercase tracking-[0.25em] text-[color:var(--gold)]">
            Legal
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/aviso-legal" className="hover:text-[color:var(--gold)]">
                Aviso Legal e Privacidade
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:text-[color:var(--gold)]">
                Política de Cookies
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={reopenCookieConsent}
                className="text-left hover:text-[color:var(--gold)]"
              >
                Gerir cookies
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-serif text-sm uppercase tracking-[0.25em] text-[color:var(--gold)]">
            Contacto
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" aria-hidden />
              <span>
                {a.street}
                <br />
                {a.postalCode} {a.locality}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" aria-hidden />
              <span>
                <a href={`tel:${a.phoneE164}`} className="hover:text-[color:var(--gold)]">
                  {a.phoneDisplay}
                </a>
                {a.phoneAltE164 && (
                  <>
                    <br />
                    <a href={`tel:${a.phoneAltE164}`} className="hover:text-[color:var(--gold)]">
                      {a.phoneAltDisplay}
                    </a>
                  </>
                )}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-[color:var(--gold)]" aria-hidden />
              <a href={`mailto:${a.email}`} className="hover:text-[color:var(--gold)]">
                {a.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-[color:var(--gold)]/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-[color:var(--ivory)]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName()}. Todos os direitos reservados.
          </p>
          <p>
            {a.name}, advogado inscrito na Ordem dos Advogados — Cédula Profissional n.º {a.cedula}.
          </p>
        </div>
        {siteConfig.demo && (
          <p className="mx-auto max-w-6xl px-6 pb-6 text-[11px] text-[color:var(--ivory)]/45">
            Proposta de website em demonstração, preparada por Praevo Technologies. Não indexado.
          </p>
        )}
      </div>
    </footer>
  );
}
