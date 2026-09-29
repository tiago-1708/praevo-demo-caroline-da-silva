/**
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  ESTE É O ÚNICO FICHEIRO QUE PRECISA DE SER EDITADO POR CLIENTE.   │
 * │  Todos os outros ficheiros consomem daqui. Alterar nome, cédula,   │
 * │  áreas, morada, etc. faz-se aqui — nada mais.                      │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * Depois de editar, ler o SCAFFOLD.md para os passos de deploy.
 *
 * SITE DEMO — JRR Advogados. Dados recolhidos do Instagram @jrradvogados.pt.
 * Tudo o que está entre [parênteses rectos] é placeholder a confirmar com o
 * cliente. O site inteiro está em noindex/nofollow (ver `demo` abaixo).
 */

import {
  Home,
  ScrollText,
  Coins,
  Briefcase,
  Landmark,
  Building2,
  User,
  type LucideIcon,
} from "lucide-react";

// --------------------------------------------------------------------------
// Tipos
// --------------------------------------------------------------------------

export type PracticeArea = {
  slug: string; // URL slug (kebab-case, sem acentos)
  title: string; // Ex.: "Direito Civil"
  short: string; // 1 frase para listas na homepage e áreas index
  long: string; // 2-4 frases para a página própria da área
  topics: string[]; // Matérias acompanhadas (lista na página da área)
  audiences: string[]; // A quem se dirige (títulos de `perfil.audiences`)
  faq?: string; // `id` de uma pergunta em `perfil.faqs`
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
  phoneAltE164: string | null; // Linha fixa (opcional)
  phoneAltDisplay: string | null;
  email: string;
  hours: string;
  bio: string;
};

export type Faq = {
  id: string;
  question: string;
  intro: string;
  steps: string[];
  note: string;
};

export type Brand = {
  /**
   * Paleta em tokens hex. O resto do CSS deriva destes valores; para
   * mudar a identidade visual, editar apenas este bloco.
   */
  colors: {
    dark: string; // Cor mais escura — hero, footer, botões primários
    darkAlt: string; // Variação — hover, sidebar dark
    accent: string; // Cor de destaque — ícones, links, CTAs (em fundo escuro)
    accentSoft: string; // Versão clara — badges, bordas subtis
    accentInk: string; // Accent escurecido para texto/ícones em fundo claro (AA)
    background: string; // Near-white do body
  };
  /**
   * Logo do escritório. Ficheiro em /public/ (ex.: /logo.png ou /logo.svg).
   * Se null, o header/footer mostram o wordmark em texto (`Wordmark`).
   */
  logo: {
    src: string;
    alt: string;
    height?: number; // Altura em px no header (default 44). Footer usa +25%.
  } | null;
};

// --------------------------------------------------------------------------
// Configuração do site — EDITAR
// --------------------------------------------------------------------------

export const siteConfig = {
  slug: "praevo-demo-jrr",
  domain: null as string | null,
  themeColor: "#121110",

  /**
   * Site de demonstração: força `noindex, nofollow` em todas as páginas
   * (meta + header X-Robots-Tag) e mostra a nota discreta no rodapé.
   * Passar a `false` quando o site for entregue ao cliente.
   */
  demo: true,

  /**
   * Paleta e logo. Contrastes (WCAG): accent sobre dark 5,9:1 · accentInk
   * sobre background 5,7:1 · dark sobre accent 5,9:1.
   */
  brand: {
    colors: {
      dark: "#121110",
      darkAlt: "#1E1B18",
      accent: "#B08A57",
      accentSoft: "#D8BF94",
      accentInk: "#7A5A30",
      background: "#F7F4EE",
    },
    logo: null,
  } satisfies Brand,

  advogado: {
    name: "João Romão Rodrigues",
    firm: "JRR Advogados",
    cedula: "[a confirmar]",
    nif: "[NIF a confirmar]",
    street: "[Morada a confirmar]",
    postalCode: "[Código postal]",
    locality: "Alcobaça",
    district: "Leiria",
    phoneE164: "+351913981455",
    phoneDisplay: "913 981 455",
    phoneAltE164: "+351262062764",
    phoneAltDisplay: "262 062 764",
    email: "geral@jrradvogados.pt",
    hours: "[Horário a confirmar]",
    bio:
      "O JRR Advogados é uma boutique de advocacia full service, sediada em Alcobaça e " +
      "conduzida pelo advogado João Romão Rodrigues. Prestamos serviços jurídicos a empresas " +
      "privadas, a particulares e a entidades públicas, com uma ideia simples: o melhor momento " +
      "para falar com um advogado é antes de o problema existir.",
  } satisfies Advogado,

  /** Conteúdo próprio do escritório (Instagram @jrradvogados.pt). */
  perfil: {
    tagline: "Boutique de Advocacia — Full service",
    motto: "Não nos procure quando tiver um problema: antecipe-o.",
    audiences: [
      {
        title: "Empresas privadas",
        text: "Pequenas, médias e grandes empresas — nos contratos, na atividade corrente e nos litígios.",
        icon: Building2,
      },
      {
        title: "Particulares",
        text: "Qualquer caso pessoal em que é necessário o advogado: da compra de casa a uma herança.",
        icon: User,
      },
      {
        title: "Entidades públicas",
        text: "Municípios, entidades hospitalares e empresas públicas.",
        icon: Landmark,
      },
    ] satisfies { title: string; text: string; icon: LucideIcon }[],
    values: [
      {
        title: "Rigor & Exigência",
        text: "Cada assunto é estudado a fundo: os documentos, os prazos e a lei aplicável. Sem atalhos.",
      },
      {
        title: "Visibilidade & Clareza",
        text: "O cliente sabe em que ponto está o seu processo, que opções tem e o que cada uma implica — em linguagem clara.",
      },
      {
        title: "Antecipação",
        text: "Rever antes de assinar, verificar antes de comprar, planear antes de decidir. Prevenir custa menos do que litigar.",
      },
    ],
    /** "Tipos de atos que os advogados fazem" — atos próprios (Lei n.º 49/2004). */
    acts: [
      "Consulta jurídica e pareceres escritos",
      "Elaboração e revisão de contratos",
      "Representação em tribunal (mandato forense)",
      "Representação perante entidades públicas e privadas",
      "Negociação e cobrança de créditos",
      "Reconhecimento de assinaturas, autenticação e certificação de documentos",
    ],
    faqs: [
      {
        id: "comprar-imovel",
        question: "O que deve ser verificado antes de comprar um imóvel?",
        intro:
          "A compra de um imóvel é, para muitas pessoas, o maior investimento de uma vida. Antes de assinar o contrato-promessa, convém confirmar pelo menos:",
        steps: [
          "Quem é o proprietário e se existem hipotecas, penhoras, usufrutos ou outros encargos — através da certidão permanente do registo predial.",
          "Se o registo predial, a caderneta predial das Finanças e a realidade física do imóvel coincidem (áreas, divisões, anexos).",
          "A situação urbanística do imóvel e documentos como a ficha técnica da habitação, quando exigível, e o certificado energético.",
          "Se há dívidas ao condomínio, mediante declaração emitida pela administração.",
          "Os custos da operação — IMT, Imposto do Selo, registos — e o calendário entre o contrato-promessa e a escritura.",
        ],
        note: "Cada imóvel tem a sua história. A análise dos documentos antes da primeira assinatura evita surpresas depois.",
      },
      {
        id: "falecimento-familiar",
        question: "Quando falece um familiar, o que é que tenho mesmo que fazer?",
        intro: "Num momento difícil, há passos que não podem ficar esquecidos. Em termos gerais:",
        steps: [
          "Registo do óbito — normalmente tratado pela agência funerária junto da conservatória.",
          "Habilitação de herdeiros — identifica quem são os herdeiros; pode ser feita em notário ou no Balcão das Heranças.",
          "Participação às Finanças — cabe ao cabeça-de-casal, em regra até ao final do terceiro mês seguinte ao do falecimento, com a relação de bens.",
          "Comunicações a bancos, seguradoras e Segurança Social (por exemplo, subsídio por morte e pensões de sobrevivência, quando aplicáveis).",
          "Partilha dos bens — por acordo entre os herdeiros ou, na falta de acordo, através de processo de inventário.",
        ],
        note: "Prazos e obrigações variam consoante o património deixado e a existência de testamento.",
      },
      {
        id: "cobrar-divida",
        question: "Devem-me dinheiro… o que é que faço?",
        intro: "Antes de avançar para tribunal, há um caminho a percorrer com método:",
        steps: [
          "Reunir a prova: contratos, faturas, orçamentos aceites, mensagens e comprovativos de entrega ou de serviço.",
          "Interpelar o devedor por escrito — de preferência por carta registada com aviso de receção — fixando um prazo para pagamento.",
          "Confirmar os prazos de prescrição, que variam consoante o tipo de dívida e podem ser curtos.",
          "Sem pagamento: procedimento de injunção (dívidas contratuais até 15 000 € ou transações comerciais), ação judicial e, obtido o título, execução.",
        ],
        note: "O meio adequado depende do valor em causa, da prova disponível e da situação patrimonial do devedor.",
      },
    ] satisfies Faq[],
  },

  areas: [
    {
      slug: "direito-imobiliario",
      title: "Direito Imobiliário",
      short: "Compra e venda de imóveis, com verificação documental e registal antes de assinar.",
      long:
        "Acompanhamos compradores e vendedores em todas as fases de um negócio imobiliário: " +
        "da análise prévia dos documentos ao contrato-promessa, da escritura ao registo. " +
        "O objetivo é que cada assinatura seja feita com conhecimento completo do que se está a " +
        "comprar ou a vender.",
      topics: [
        "Análise da certidão permanente do registo predial e da caderneta predial",
        "Verificação de ónus e encargos: hipotecas, penhoras, usufrutos",
        "Contrato-promessa de compra e venda e escritura",
        "Situação urbanística, ficha técnica e declaração de dívidas ao condomínio",
        "Arrendamento urbano",
      ],
      audiences: ["Particulares", "Empresas privadas"],
      faq: "comprar-imovel",
      icon: Home,
    },
    {
      slug: "herancas-e-sucessoes",
      title: "Heranças e Sucessões",
      short: "Habilitação de herdeiros, participação às Finanças, partilhas e testamentos.",
      long:
        "O falecimento de um familiar traz consigo obrigações com prazos próprios. Acompanhamos " +
        "as famílias em cada passo — da habilitação de herdeiros à partilha — e ajudamos quem " +
        "quer planear a sua sucessão com antecedência.",
      topics: [
        "Habilitação de herdeiros",
        "Relação de bens e participação às Finanças (Imposto do Selo)",
        "Partilha por acordo e processo de inventário",
        "Testamentos e planeamento sucessório",
        "Funções e deveres do cabeça-de-casal",
      ],
      audiences: ["Particulares"],
      faq: "falecimento-familiar",
      icon: ScrollText,
    },
    {
      slug: "cobranca-de-dividas-e-contratos",
      title: "Cobrança de Dívidas e Contratos",
      short: "Direito civil e contratos: redação, incumprimento e recuperação de créditos.",
      long:
        "Um contrato bem redigido é a primeira forma de prevenção. Quando o incumprimento já " +
        "aconteceu, acompanhamos a recuperação do crédito com método: primeiro a via " +
        "extrajudicial, depois os meios judiciais adequados ao valor e à prova disponível.",
      topics: [
        "Redação e revisão de contratos",
        "Interpelação e negociação extrajudicial",
        "Procedimento de injunção",
        "Ações declarativas e processos de execução",
        "Responsabilidade contratual e extracontratual",
      ],
      audiences: ["Particulares", "Empresas privadas"],
      faq: "cobrar-divida",
      icon: Coins,
    },
    {
      slug: "direito-empresarial",
      title: "Direito Empresarial",
      short: "Assessoria jurídica a pequenas, médias e grandes empresas na atividade do dia a dia.",
      long:
        "Prestamos serviços a empresas de diferentes dimensões, desde a constituição da sociedade " +
        "à gestão jurídica corrente. Revemos contratos com clientes e fornecedores, preparamos " +
        "deliberações e acompanhamos a empresa quando surge um diferendo.",
      topics: [
        "Constituição de sociedades e alterações ao contrato de sociedade",
        "Contratos comerciais com clientes, fornecedores e parceiros",
        "Deliberações sociais, atas e assembleias gerais",
        "Assessoria jurídica corrente",
        "Prevenção e gestão de litígios comerciais",
      ],
      audiences: ["Empresas privadas"],
      icon: Briefcase,
    },
    {
      slug: "direito-administrativo-e-contratacao-publica",
      title: "Direito Administrativo e Contratação Pública",
      short: "Assessoria a municípios, entidades hospitalares e empresas públicas.",
      long:
        "Acompanhamos entidades públicas na preparação e condução de procedimentos de " +
        "contratação pública e na atividade administrativa corrente. Prestamos também serviços a " +
        "particulares e empresas na sua relação com a Administração.",
      topics: [
        "Procedimentos de contratação pública (Código dos Contratos Públicos)",
        "Peças do procedimento, relatórios e execução de contratos",
        "Procedimento administrativo e pareceres jurídicos",
        "Contencioso administrativo",
      ],
      audiences: ["Entidades públicas", "Empresas privadas", "Particulares"],
      icon: Landmark,
    },
  ] as PracticeArea[],
} as const;

// --------------------------------------------------------------------------
// Utilitários — não editar
// --------------------------------------------------------------------------

export const siteName = () => siteConfig.advogado.firm ?? siteConfig.advogado.name;

export const baseUrl = () =>
  siteConfig.domain ? `https://${siteConfig.domain}` : `https://${siteConfig.slug}.workers.dev`;

export const absoluteUrl = (path: string) =>
  `${baseUrl()}${path.startsWith("/") ? path : `/${path}`}`;

export const getArea = (slug: string) => siteConfig.areas.find((a) => a.slug === slug);

export const getFaq = (id: string) => siteConfig.perfil.faqs.find((f) => f.id === id);

/** Placeholder por confirmar com o cliente (texto entre parênteses rectos). */
export const isPlaceholder = (value: string) => value.startsWith("[");
