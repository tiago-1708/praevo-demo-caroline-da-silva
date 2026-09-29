/**
 * Wrapper do Google Analytics 4 + Google Ads com Consent Mode v2.
 *
 * Fluxo:
 *   1. `initConsentMode()` corre o mais cedo possivel no cliente e escreve o
 *      "default" do consentimento como denied — nenhum hit sai antes de o
 *      utilizador aceitar (o Google trata isto como "modelagem" para o EEE).
 *   2. Quando o utilizador decide no banner, `updateConsent(...)` liberta ou
 *      mantem denied conforme escolha.
 *   3. `loadGoogleAnalytics()` e `loadGoogleAds()` injetam os scripts. So
 *      correm depois da decisao (o codigo do banner encarrega-se disso).
 *   4. `trackEvent()` e `trackAdsConversion()` sao usados nas paginas para
 *      registar acontecimentos (ex.: lead enviado no formulario). So tem
 *      efeito depois de `updateConsent("accepted")` — antes disso e um
 *      no-op silencioso, nao so porque o script do GA ainda nao carregou,
 *      mas porque `analyticsConsentGranted` bloqueia explicitamente.
 *
 * Este template nao envia email/telefone do formulario de contacto para a
 * Google (sem Enhanced Conversions, sem `set user_data`) — dados de contacto
 * de um potencial cliente de um advogado nao saem do Resend.
 */

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Stub `gtag` sempre disponivel. E necessario para o Consent Mode v2, cujas
 * chamadas `gtag('consent', 'default', ...)` tem de acontecer antes do gtag.js
 * do Google carregar — caso contrario o Google trata o utilizador como se
 * tivesse recusado tudo por omissao.
 *
 * Usa `arguments` (nao `[...args]`): o gtag.js do Google inspeciona o formato
 * de cada entrada do dataLayer e ignora silenciosamente arrays literais, o
 * que faz com que nenhum hit chegue ao servidor.
 */
function ensureGtagStub() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function gtag(..._args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as IArguments);
    }
    window.gtag = gtag as (...args: unknown[]) => void;
  }
}

/**
 * Enviar o "default" do Consent Mode v2 o mais cedo possivel — antes de
 * qualquer outra chamada de gtag e antes de o gtag.js ser injetado. Marca
 * tudo como denied e wait_for_update para o EEE: nenhum hit e enviado ate o
 * utilizador aceitar (ou recusar) explicitamente no banner.
 */
export function initConsentMode() {
  if (typeof window === "undefined") return;
  ensureGtagStub();
  window.gtag!("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
    region: [
      "PT",
      "ES",
      "FR",
      "IT",
      "DE",
      "AT",
      "BE",
      "BG",
      "CY",
      "CZ",
      "DK",
      "EE",
      "FI",
      "GR",
      "HR",
      "HU",
      "IE",
      "LT",
      "LU",
      "LV",
      "MT",
      "NL",
      "PL",
      "RO",
      "SE",
      "SI",
      "SK",
      "IS",
      "LI",
      "NO",
      "GB",
      "CH",
    ],
  });
}

/**
 * Actualizar o estado do consentimento quando o utilizador decide no banner.
 * `accepted` liberta todos os storages; `rejected` mantem tudo denied mas
 * dispara a actualizacao (para o Google saber que o utilizador respondeu).
 */
let analyticsConsentGranted = false;

export function updateConsent(decision: "accepted" | "rejected") {
  if (typeof window === "undefined") return;
  ensureGtagStub();
  analyticsConsentGranted = decision === "accepted";
  const granted = decision === "accepted" ? "granted" : "denied";
  window.gtag!("consent", "update", {
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
    analytics_storage: granted,
  });
}

let gaLoaded = false;

/** Carrega o script do Google Analytics 4. Idempotente. */
export function loadGoogleAnalytics() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  if (!measurementId || gaLoaded || typeof document === "undefined") return;
  gaLoaded = true;

  ensureGtagStub();

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.gtag!("js", new Date());
  window.gtag!("config", measurementId, { anonymize_ip: true });
}

let adsLoaded = false;

/**
 * Carrega o Google Ads (mesmo gtag.js do GA quando ja carregado; caso
 * contrario injeta pelo ID do Ads). Precisa de `VITE_GOOGLE_ADS_ID` no
 * formato `AW-XXXXXXXXXX`. Idempotente.
 */
export function loadGoogleAds() {
  const adsId = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined;
  if (!adsId || adsLoaded || typeof document === "undefined") return;
  adsLoaded = true;

  ensureGtagStub();

  // Se o GA ja injetou o gtag.js, basta configurar o Ads. Senao, injetamos
  // um novo script apontando ao ID do Ads.
  if (!gaLoaded) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${adsId}`;
    document.head.appendChild(script);
    window.gtag!("js", new Date());
  }
  window.gtag!("config", adsId, { allow_enhanced_conversions: true });
}

/**
 * Evento de funil. So dispara se o utilizador tiver consentido — o gtag
 * apenas existe depois de loadGoogleAnalytics()/loadGoogleAds(), pelo que a
 * ausencia de consentimento resulta num no-op silencioso.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag || !analyticsConsentGranted) return;
  window.gtag("event", name, params ?? {});
}

/**
 * Dispara uma conversao do Google Ads. Precisa de
 * `VITE_GOOGLE_ADS_CONVERSION_LABEL` (a parte que vem depois da barra no
 * "send_to" da acao de conversao) para alem do `VITE_GOOGLE_ADS_ID`.
 */
export function trackAdsConversion(params?: { value?: number; currency?: string }) {
  if (typeof window === "undefined" || !window.gtag || !analyticsConsentGranted) return;
  const adsId = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined;
  const label = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL as string | undefined;
  if (!adsId || !label) return;
  window.gtag("event", "conversion", {
    send_to: `${adsId}/${label}`,
    value: params?.value ?? 0,
    currency: params?.currency ?? "EUR",
  });
}
