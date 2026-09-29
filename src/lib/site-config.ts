/**
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  ESTE É O ÚNICO FICHEIRO QUE PRECISA DE SER EDITADO POR CLIENTE.   │
 * │  Todos os outros ficheiros consomem daqui. Alterar nome, cédula,   │
 * │  áreas, morada, etc. faz-se aqui — nada mais.                      │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * Depois de editar, ler o SCAFFOLD.md para os passos de deploy.
 */

import {
  Scale,
  Users,
  Briefcase,
  Home,
  Gavel,
  FileText,
  Building2,
  Landmark,
  ShieldCheck,
  Coins,
  type LucideIcon,
} from "lucide-react";

// --------------------------------------------------------------------------
// Tipos
// --------------------------------------------------------------------------

export type PracticeArea = {
  slug: string;      // URL slug (kebab-case, sem acentos)
  title: string;     // Ex.: "Direito Civil"
  short: string;     // 1 frase para listas na homepage e áreas index
  long: string;      // 2-4 parágrafos para a página própria da área
  icon: LucideIcon;
};

export type Advogado = {
  name: string;
  firm: string | null;
  cedula: string;
  nif: string;
  street: string;
  postalCode: string;
  locality: string;
  district: string;
  phoneE164: string;
  phoneDisplay: string;
  email: string;
  hours: string;
  bio: string;
};

export type Brand = {
  /**
   * Paleta em 5 tokens hex. O resto do CSS deriva destes valores; para
   * mudar a identidade visual, editar apenas este bloco.
   */
  colors: {
    dark: string;         // Cor mais escura — hero, footer, botões primários
    darkAlt: string;      // Variação — hover, sidebar dark
    accent: string;       // Cor de destaque — ícones, links, CTAs
    accentSoft: string;   // Versão clara — badges, bordas subtis
    background: string;   // Near-white do body
  };
  /**
   * Logo do escritório. Ficheiro em /public/ (ex.: /logo.png ou /logo.svg).
   * Se null, o header/footer mostra apenas o nome em texto (siteName).
   */
  logo: {
    src: string;
    alt: string;
    height?: number;      // Altura em px no header (default 44). Footer usa +25%.
  } | null;
};

// --------------------------------------------------------------------------
// Configuração do site — EDITAR
// --------------------------------------------------------------------------

export const siteConfig = {
  slug: "template-slug",
  domain: null as string | null,
  themeColor: "#1E2A4E",

  /**
   * Paleta e logo. Ver `Brand` para os tokens; editar aqui aplica ao site
   * inteiro (via injecção em __root.tsx). 3 paletas pré-testadas:
   *   • Navy + azul claro:    dark #1E2A4E · accent #6B94C4
   *   • Preto + dourado:      dark #1A1A1A · accent #B8935C
   *   • Bordeaux + cinza:     dark #4A1F27 · accent #C99A88
   */
  brand: {
    colors: {
      dark: "#1E2A4E",
      darkAlt: "#2A3A6A",
      accent: "#6B94C4",
      accentSoft: "#B8CFE5",
      background: "#F8FAFD",
    },
    logo: null,
  } satisfies Brand,


  advogado: {
    name: "Dr(a). Nome Apelido",
    firm: null,
    cedula: "00000L",
    nif: "999999999",
    street: "Rua Placeholder, n.º 0",
    postalCode: "0000-000",
    locality: "Localidade",
    district: "Distrito",
    phoneE164: "+351900000000",
    phoneDisplay: "900 000 000",
    email: "contacto@dominio.pt",
    hours: "Seg-Sex 09h-13h · 14h30-18h30",
    bio:
      "Advogado(a) inscrito(a) na Ordem dos Advogados portuguesa. " +
      "Substituir por bio real de 3-4 linhas: formação académica, " +
      "cargos exercidos, anos de prática. Manter factual, sem uso do " +
      "termo “especialista” fora dos casos previstos no " +
      "Estatuto da Ordem.",
  } satisfies Advogado,

  areas: [
    {
      slug: "direito-civil",
      title: "Direito Civil",
      short: "Contratos, responsabilidade civil e relações entre particulares.",
      long:
        "Acompanhamento em matérias do quotidiano civil, desde a redacção e revisão " +
        "de contratos até à resolução de litígios em tribunal. Análise documental " +
        "rigorosa e prevenção dos riscos típicos das transacções entre particulares.",
      icon: Scale,
    },
    {
      slug: "direito-familia",
      title: "Direito da Família",
      short: "Divórcio, regulação de responsabilidades parentais, sucessões.",
      long:
        "Acompanhamento em processos de família e sucessões, por via negociada " +
        "quando possível, contenciosa quando necessária. Divórcios, regulação de " +
        "responsabilidades parentais, alimentos, partilhas e testamentos.",
      icon: Users,
    },
    {
      slug: "direito-trabalho",
      title: "Direito do Trabalho",
      short: "Contratos de trabalho, despedimentos, acidentes de trabalho.",
      long:
        "Assessoria a trabalhadores e empregadores em todas as fases da relação " +
        "laboral. Contratos, regulamentos internos, despedimentos, impugnações, " +
        "acidentes e doenças profissionais.",
      icon: Briefcase,
    },
  ] as PracticeArea[],
} as const;

// --------------------------------------------------------------------------
// Utilitários — não editar
// --------------------------------------------------------------------------

export const siteName = () => siteConfig.advogado.firm ?? siteConfig.advogado.name;

export const baseUrl = () =>
  siteConfig.domain
    ? `https://${siteConfig.domain}`
    : `https://${siteConfig.slug}.workers.dev`;

export const absoluteUrl = (path: string) =>
  `${baseUrl()}${path.startsWith("/") ? path : `/${path}`}`;

export const getArea = (slug: string) =>
  siteConfig.areas.find((a) => a.slug === slug);
