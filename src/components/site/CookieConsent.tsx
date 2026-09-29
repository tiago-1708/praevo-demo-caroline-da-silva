import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { initConsentMode, loadGoogleAnalytics, updateConsent } from "@/lib/analytics";

const CONSENT_KEY = "praevo_cookie_consent";
const REOPEN_EVENT = "praevo:cookie-consent:reopen";

export function reopenCookieConsent() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Iniciar Consent Mode v2 em `denied` — necessário para "consent modeling"
    // do Google e para que chamadas gtag antes da decisão sejam tratadas com
    // o consentimento correcto.
    initConsentMode();

    let stored: string | null = null;
    try {
      stored = localStorage.getItem(CONSENT_KEY);
    } catch {
      /* private mode */
    }
    if (stored === "accepted") {
      updateConsent("accepted");
      loadGoogleAnalytics();
    } else if (stored === "rejected") {
      updateConsent("rejected");
    } else {
      setVisible(true);
    }

    const onReopen = () => setVisible(true);
    window.addEventListener(REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(REOPEN_EVENT, onReopen);
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* noop */
    }
    updateConsent(value);
    if (value === "accepted") {
      loadGoogleAnalytics();
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-0 bottom-0 z-50 mx-auto mb-4 max-w-5xl px-4 sm:px-6"
    >
      <div className="rounded-3xl border border-white/10 bg-[color:var(--navy-deep)] px-6 py-5 text-[color:var(--ivory)] shadow-2xl shadow-black/20">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-[color:var(--ivory)]/85">
            Este site utiliza cookies de análise para melhorar a experiência de navegação. Pode
            aceitar ou recusar — consulte a{" "}
            <Link to="/cookies" className="underline hover:text-[color:var(--gold)]">
              Política de Cookies
            </Link>{" "}
            para mais informação.
          </p>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => decide("rejected")}
              className="btn-outline btn-sm text-[color:var(--ivory)]/85"
            >
              Recusar
            </button>
            <button type="button" onClick={() => decide("accepted")} className="btn-primary btn-sm">
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
