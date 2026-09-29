/**
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  ESTE É O ÚNICO FICHEIRO QUE PRECISA DE SER EDITADO POR CLIENTE.   │
 * │  Todos os outros ficheiros consomem daqui. Alterar nome, cédula,   │
 * │  áreas, morada, etc. faz-se aqui — nada mais.                      │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * Depois de editar, ler o SCAFFOLD.md para os passos de deploy.
 *
 * SITE DEMO — Dra. Caroline da Silva, preparado para a reunião de
 * apresentação. Só o nome foi confirmado. Tudo o que está entre [parênteses
 * rectos] ou com "XXX" é placeholder; as áreas, os públicos e os textos são
 * uma proposta de conteúdo a validar com a cliente. O site inteiro está em
 * noindex/nofollow (ver `demo` abaixo).
 */

import {
  Users,
  User,
  Store,
  HeartHandshake,
  ScrollText,
  Briefcase,
  KeyRound,
  FileSignature,
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
    dark: string; // Cor mais escura — hero, footer, blocos escuros
    darkAlt: string; // Blocos escuros alternados (--navy)
    accent: string; // Cor de destaque — botões, filetes e ícones em fundo escuro
    accentSoft: string; // Versão clara — hover dos botões, itálicos no hero
    accentInk: string; // Acento para texto/ícones em fundo claro (AA)
    background: string; // Near-white do body
  };
  /**
   * Logo do escritório. Ficheiro em /public/ (ex.: /logo.png ou /logo.svg).
   * Se null, o header/footer usam o componente `Logo` (SVG inline).
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
  slug: "praevo-demo-caroline-da-silva",
  domain: null as string | null,
  themeColor: "#141012",

  /**
   * Site de demonstração: força `noindex, nofollow` em todas as páginas
   * (meta + header X-Robots-Tag) e mostra a nota discreta no rodapé.
   * Passar a `false` quando o site for entregue à cliente.
   */
  demo: true,

  /**
   * Paleta preto + bordeaux + dourado champanhe. Contrastes (WCAG):
   * dourado sobre preto 8,0:1 · dourado sobre bordeaux 5,8:1 · marfim sobre
   * bordeaux 12,3:1 · bordeaux (accentInk) sobre o fundo 8,4:1 · preto sobre
   * dourado 8,0:1. O dourado só aparece em fundo escuro ou como fundo de
   * botão; em fundo claro o acento é o bordeaux.
   */
  brand: {
    colors: {
      dark: "#141012",
      darkAlt: "#5A1420",
      accent: "#C9A45C",
      accentSoft: "#E8D6A8",
      accentInk: "#8A1C2B",
      background: "#F8F4EF",
    },
    // O logótipo é o componente `Logo` (SVG inline, currentColor).
    logo: null,
  } satisfies Brand,

  advogado: {
    name: "Dra. Caroline da Silva",
    firm: null,
    cedula: "[a confirmar]",
    nif: "[NIF a confirmar]",
    street: "[Morada a confirmar]",
    postalCode: "[Código postal]",
    locality: "[Localidade]",
    district: "[Distrito]",
    phoneE164: "+3519XXXXXXXX",
    phoneDisplay: "9XX XXX XXX",
    phoneAltE164: null,
    phoneAltDisplay: null,
    email: "[email a confirmar]",
    hours: "[Horário a confirmar]",
    bio:
      "Caroline da Silva é advogada, inscrita na Ordem dos Advogados. Presta serviços jurídicos " +
      "a particulares, a famílias e a pequenos negócios, com atendimento por marcação. " +
      "Cada assunto começa por uma conversa: perceber a situação, explicar as opções com " +
      "clareza e acompanhar o cliente em cada passo.",
  } satisfies Advogado,

  /** Conteúdo próprio da advogada — proposta a validar com a cliente. */
  perfil: {
    tagline: "Advocacia com rigor, clareza e discrição",
    motto: "Primeiro ouvir, depois aconselhar.",
    audiences: [
      {
        title: "Particulares",
        text: "Questões do dia a dia que pedem uma leitura jurídica: um contrato, um arrendamento, uma relação de trabalho.",
        icon: User,
      },
      {
        title: "Famílias",
        text: "Momentos de mudança — divórcio, responsabilidades parentais, uma herança — tratados com serenidade e reserva.",
        icon: Users,
      },
      {
        title: "Pequenos negócios",
        text: "Empresários em nome individual e pequenas empresas, nos contratos, no pessoal e na cobrança de créditos.",
        icon: Store,
      },
    ] satisfies { title: string; text: string; icon: LucideIcon }[],
    values: [
      {
        title: "Escuta",
        text: "Cada caso começa por uma conversa atenta. Só depois de compreender a situação por inteiro se apresenta um caminho.",
      },
      {
        title: "Clareza",
        text: "O cliente sabe o que está em causa, que opções tem, quanto tempo pode demorar e o que cada decisão implica.",
      },
      {
        title: "Discrição",
        text: "O que é partilhado com a advogada fica protegido pelo segredo profissional. Reserva em cada contacto.",
      },
    ],
    /** Atos próprios dos advogados (Lei n.º 49/2004, de 24 de agosto). */
    acts: [
      "Consulta jurídica",
      "Exercício do mandato forense — representação em tribunal",
      "Elaboração de contratos e de atos preparatórios da sua constituição, alteração ou extinção",
      "Negociação tendente à cobrança de créditos",
      "Reclamação ou impugnação de atos administrativos ou tributários",
    ],
    faqs: [
      {
        id: "divorcio-mutuo-consentimento",
        question: "Como funciona o divórcio por mútuo consentimento?",
        intro:
          "Quando ambos os cônjuges estão de acordo em divorciar-se, o processo pode correr na Conservatória do Registo Civil. Em termos gerais:",
        steps: [
          "O pedido é apresentado pelos dois cônjuges numa Conservatória do Registo Civil.",
          "Juntam-se os acordos exigidos por lei: relação dos bens comuns (ou acordo sobre a partilha), destino da casa de morada de família e, se for o caso, alimentos ao cônjuge que deles careça.",
          "Havendo filhos menores, junta-se também o acordo sobre o exercício das responsabilidades parentais, se não tiverem sido já reguladas; o acordo é enviado ao Ministério Público, que se pronuncia sobre ele.",
          "Estando tudo conforme, o conservador decreta o divórcio e procede ao respetivo registo.",
          "Se os cônjuges não chegarem a acordo sobre algum destes pontos, o processo segue para tribunal.",
        ],
        note: "Os acordos definem a vida de todos depois do divórcio. Vale a pena prepará-los com tempo e com apoio jurídico.",
      },
      {
        id: "despedimento",
        question: "Recebi uma comunicação de despedimento. E agora?",
        intro:
          "Receber uma comunicação de despedimento é um momento de incerteza. Alguns cuidados imediatos:",
        steps: [
          "Guardar a comunicação escrita, o contrato de trabalho, os recibos de vencimento e toda a correspondência com a entidade empregadora.",
          "Confirmar o motivo invocado e se foi seguido o procedimento que a lei exige para esse tipo de despedimento.",
          "Atenção aos prazos: no despedimento individual comunicado por escrito, a oposição judicial deve, em regra, ser apresentada no prazo de 60 dias.",
          "Verificar os créditos devidos com a cessação do contrato (retribuição, férias, subsídios, formação) — prescrevem, em regra, um ano após o fim do contrato.",
        ],
        note: "Cada tipo de despedimento tem regras e prazos próprios. Uma análise atempada permite conhecer todas as opções.",
      },
      {
        id: "rendas-em-atraso",
        question: "O inquilino deixou de pagar a renda. O que posso fazer?",
        intro:
          "O senhorio tem meios próprios para reagir à falta de pagamento, mas convém seguir a ordem certa:",
        steps: [
          "Confirmar o contrato de arrendamento, o valor da renda, os meses em dívida e a eventual existência de caução ou fiador.",
          "Interpelar o inquilino por escrito, fixando um prazo para o pagamento.",
          "Em regra, a falta de pagamento por três meses ou mais permite ao senhorio resolver o contrato, desde que a resolução seja comunicada pelas formas previstas na lei.",
          "O inquilino pode, em certos casos, pôr fim à mora pagando as rendas em atraso e a indemnização legal dentro do prazo previsto.",
          "Sem pagamento nem entrega do imóvel: procedimento especial de despejo ou ação de despejo, conforme o caso, e cobrança das rendas em dívida.",
        ],
        note: "Um passo em falso na comunicação ao inquilino pode atrasar todo o processo. A forma conta tanto quanto o fundamento.",
      },
    ] satisfies Faq[],
  },

  areas: [
    {
      slug: "familia-e-menores",
      title: "Família e Menores",
      short: "Divórcio, regulação das responsabilidades parentais, alimentos e união de facto.",
      long:
        "As questões de família raramente são apenas jurídicas. Acompanhamos cada pessoa com " +
        "reserva e serenidade, procurando primeiro as soluções por acordo e, quando não é " +
        "possível, representando o cliente em tribunal.",
      topics: [
        "Divórcio por mútuo consentimento e sem consentimento de um dos cônjuges",
        "Regulação e alteração das responsabilidades parentais",
        "Pensão de alimentos a filhos e a ex-cônjuges",
        "União de facto e partilha de bens do casal",
        "Destino da casa de morada de família",
      ],
      audiences: ["Famílias", "Particulares"],
      faq: "divorcio-mutuo-consentimento",
      icon: HeartHandshake,
    },
    {
      slug: "herancas-e-partilhas",
      title: "Heranças e Partilhas",
      short: "Habilitação de herdeiros, partilhas, inventário e testamentos.",
      long:
        "Depois do falecimento de um familiar há decisões a tomar e prazos a cumprir. Explicamos " +
        "cada passo, apoiamos o entendimento entre herdeiros e, quando não há acordo, " +
        "acompanhamos o processo de inventário.",
      topics: [
        "Habilitação de herdeiros",
        "Relação de bens e obrigações perante as Finanças",
        "Partilha por acordo e processo de inventário",
        "Testamentos e planeamento da sucessão",
        "Direitos e deveres do cabeça-de-casal",
      ],
      audiences: ["Famílias", "Particulares"],
      icon: ScrollText,
    },
    {
      slug: "direito-do-trabalho",
      title: "Direito do Trabalho",
      short:
        "Contratos de trabalho, despedimentos e créditos laborais, para trabalhadores e empregadores.",
      long:
        "Prestamos serviços a trabalhadores e a pequenos empregadores em todas as fases da " +
        "relação de trabalho: da redação do contrato à sua cessação, com atenção especial aos " +
        "prazos, que no Direito do Trabalho são muitas vezes curtos.",
      topics: [
        "Contratos de trabalho e acordos de cessação",
        "Despedimentos e respetiva impugnação",
        "Créditos laborais: retribuições, férias e subsídios",
        "Procedimentos disciplinares",
        "Acidentes de trabalho",
      ],
      audiences: ["Particulares", "Pequenos negócios"],
      faq: "despedimento",
      icon: Briefcase,
    },
    {
      slug: "arrendamento-e-imobiliario",
      title: "Arrendamento e Imobiliário",
      short: "Contratos de arrendamento, rendas em atraso, despejos e compra e venda de imóveis.",
      long:
        "Um contrato de arrendamento bem feito evita muitos conflitos. Acompanhamos senhorios e " +
        "inquilinos na celebração, na execução e na cessação do contrato, e compradores e " +
        "vendedores na análise documental de um imóvel.",
      topics: [
        "Redação e revisão de contratos de arrendamento",
        "Rendas em atraso e resolução do contrato",
        "Procedimento especial de despejo e ações de despejo",
        "Obras, denúncia e oposição à renovação",
        "Verificação documental na compra e venda de imóveis",
      ],
      audiences: ["Particulares", "Pequenos negócios"],
      faq: "rendas-em-atraso",
      icon: KeyRound,
    },
    {
      slug: "contratos-e-cobrancas",
      title: "Contratos e Cobranças",
      short: "Redação e revisão de contratos, incumprimento e recuperação de créditos.",
      long:
        "Rever um contrato antes de o assinar é a forma mais simples de prevenção. Quando já " +
        "houve incumprimento, acompanhamos a recuperação do crédito, começando pela via " +
        "extrajudicial e recorrendo aos meios judiciais adequados quando necessário.",
      topics: [
        "Redação e revisão de contratos",
        "Interpelação e negociação extrajudicial",
        "Procedimento de injunção",
        "Ações judiciais e processos de execução",
        "Responsabilidade contratual",
      ],
      audiences: ["Particulares", "Pequenos negócios"],
      icon: FileSignature,
    },
  ] as PracticeArea[],
} as const;

// --------------------------------------------------------------------------
// Utilitários — não editar
// --------------------------------------------------------------------------

export const siteName = () => siteConfig.advogado.firm ?? siteConfig.advogado.name;

/** Nome sem o tratamento ("Dra."), para frases como "a advogada Caroline da Silva". */
export const plainName = () => siteConfig.advogado.name.replace(/^Dra?\.\s*/, "");

export const baseUrl = () =>
  siteConfig.domain ? `https://${siteConfig.domain}` : `https://${siteConfig.slug}.workers.dev`;

export const absoluteUrl = (path: string) =>
  `${baseUrl()}${path.startsWith("/") ? path : `/${path}`}`;

export const getArea = (slug: string) => siteConfig.areas.find((a) => a.slug === slug);

export const getFaq = (id: string) => siteConfig.perfil.faqs.find((f) => f.id === id);

/**
 * Placeholder por confirmar com a cliente: texto entre parênteses rectos
 * ("[Morada a confirmar]") ou algarismos por preencher ("9XX XXX XXX").
 */
export const isPlaceholder = (value: string) => value.startsWith("[") || value.includes("XXX");

/** " em <localidade>" para títulos e metas; vazio enquanto for placeholder. */
export const emLocalidade = () =>
  isPlaceholder(siteConfig.advogado.locality) ? "" : ` em ${siteConfig.advogado.locality}`;
