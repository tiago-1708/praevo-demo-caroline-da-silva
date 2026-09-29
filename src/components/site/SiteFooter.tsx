import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, siteName } from "@/lib/site-config";
import { reopenCookieConsent } from "./CookieConsent";

export function SiteFooter() {
  const a = siteConfig.advogado;

  return (
    <footer className="bg-[color:var(--navy-deep)] text-[color:var(--ivory)]/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          {siteConfig.brand.logo ? (
            <img
              src={siteConfig.brand.logo.src}
              alt={siteConfig.brand.logo.alt}
              style={{ height: (siteConfig.brand.logo.height ?? 44) * 1.25 }}
              className="w-auto object-contain brightness-0 invert"
            />
          ) : (
            <>
              <p className="font-serif text-lg text-[color:var(--ivory)]">{siteName()}</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--gold-soft)]/80">
                Advogado(a)
              </p>
            </>
          )}
          <p className="mt-5 text-sm leading-relaxed">
            Escritório de advocacia em {a.locality}. Atendimento mediante marcação prévia.
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
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" />
              <span>
                {a.street}
                <br />
                {a.postalCode} {a.locality}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
              <a href={`tel:${a.phoneE164}`} className="hover:text-[color:var(--gold)]">
                {a.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-[color:var(--gold)]" />
              <a href={`mailto:${a.email}`} className="hover:text-[color:var(--gold)]">
                {a.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--gold)]/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-[color:var(--ivory)]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteName()}. Todos os direitos reservados.
          </p>
          <p>Inscrito na Ordem dos Advogados — Cédula Profissional n.º {a.cedula}.</p>
        </div>
      </div>
    </footer>
  );
}
