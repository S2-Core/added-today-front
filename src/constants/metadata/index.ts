import { Metadata, Viewport } from "next";

export const siteUrl = "https://added-today-frontend-production.up.railway.app";
export const siteName = "Added Today";
export const siteDescription =
  "Nossa IA orienta a sua jornada como um copiloto adaptativo e centrado na sua realidade";

export const layoutViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "var(--light)" },
    { media: "(prefers-color-scheme: dark)", color: "var(--gray-2)" },
  ],
};

export const layoutMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  generator: "Next.js",
  title: { default: siteName, template: `%s - ${siteName}` },
  description: siteDescription,
  keywords: [
    "chatbot",
    "inteligência artificial",
    "IA",
    "influenciadores",
    "automação",
    "dashboards",
    "gestão de usuários",
    "personalidades digitais",
    "machine learning",
    "marketing de influência",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  alternates: {
    canonical: siteUrl,
    languages: { "pt-BR": siteUrl },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
  robots:
    process.env.NODE_ENV === "production"
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/images/openGraph.png",
        width: 1200,
        height: 630,
        alt: `${siteName} – ${siteDescription}`,
      },
      {
        url: "favicon.png",
        width: 236,
        height: 235,
        alt: `${siteName} – ${siteDescription}`,
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteName,
    startupImage: "/images/logo.png",
  },
  assets: "/images/logo.png",
};

export const loginMetadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    url: `${siteUrl}/`,
    type: "website",
  },
};

export const homeMetadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Home - ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/home`,
    type: "website",
  },
};

export const registerMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Registrar - ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/register`,
    type: "website",
  },
};

export const newPasswordMetadata: Metadata = {
  title: "Alterar Senha",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Alterar Senha - ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/new-password`,
    type: "website",
  },
};

export const termsOfUseMetadata: Metadata = {
  title: "Política dos Termos de Uso",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Política dos Termos de Uso - ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/terms-of-use`,
    type: "website",
  },
};

export const aboutMetadata: Metadata = {
  title: "Sobre",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Sobre - ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/about`,
    type: "website",
  },
};

export const usersMetadata: Metadata = {
  title: "Gerenciar Usuários",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Gerenciar Usuários - ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/users`,
    type: "website",
  },
};

export const mentalsMetadata: Metadata = {
  title: "Gerenciar Mentores",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Gerenciar Mentores - ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/mentals`,
    type: "website",
  },
};

export const campaignsMetadata: Metadata = {
  title: "Campanhas",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Campanhas - ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/campaigns`,
    type: "website",
  },
};

export const quotationsMetadata: Metadata = {
  title: "Precificação",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Precificação - ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/quotations`,
    type: "website",
  },
};

export const insightsMetadata: Metadata = {
  title: "Insights",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Insights - ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/insights`,
    type: "website",
  },
};

export const chatMetadata: Metadata = {
  title: "Agente",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Agente",
    url: `${siteUrl}/chat`,
    type: "website",
  },
};

export const plansMetadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Planos - ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/plans`,
    type: "website",
  },
};

export const profileMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Perfil - ${siteName}`,
    description: siteDescription,
    url: `${siteUrl}/profile`,
    type: "website",
  },
};

export const termsOfUseMock: string = `TERMOS DE USO DA PLATAFORMA ADDED

    Última atualização: 08/03/26

    Os presentes Termos de Uso regulam o acesso e utilização da plataforma digital added (“Plataforma”), operada pela ADDED TECNOLOGIA E EDUCAÇÃO LTDA, pessoa jurídica de direito privado inscrita no CNPJ nº 25.155.506/0001-09, com sede no Brasil.

    Ao acessar ou utilizar a Plataforma, o Usuário declara que leu, compreendeu e concorda integralmente com estes Termos.

    Caso não concorde com qualquer disposição, o Usuário deverá interromper imediatamente a utilização da Plataforma.
  ________________________________________________________________________________________________________________________________________________________________________________________________
  
    1. DEFINIÇÕES

    Para os fins deste documento:

    Plataforma

    Sistema digital disponibilizado pela added que oferece ferramentas para criadores de conteúdo gerirem, analisarem e monetizarem suas atividades digitais.

    Usuário

    Pessoa física ou jurídica que cria uma conta na Plataforma.

    Criador (Creator)

    Usuário que produz conteúdo digital e utiliza a Plataforma para gestão, análise e captura de oportunidades comerciais.

    Marca ou Anunciante

    Empresa ou entidade que promove campanhas ou oportunidades comerciais com criadores.

    Campanha

    Oportunidade de colaboração comercial entre criadores e marcas.

    Conteúdo do Usuário

    Informações, textos, imagens, métricas ou qualquer material inserido pelo Usuário na Plataforma.

    Plano de Assinatura

    Modalidade de acesso à Plataforma mediante pagamento recorrente.

    Plano Gratuito

    Modalidade limitada de acesso à Plataforma sem cobrança.

    Ferramentas de Inteligência Artificial

    Recursos da Plataforma que utilizam algoritmos ou modelos de machine learning para gerar análises, sugestões ou insights.
  ________________________________________________________________________________________________________________________________________________________________________________________________
  
    2. OBJETO DA PLATAFORMA

    A added consiste em uma plataforma tecnológica destinada a criadores de conteúdo digital, oferecendo ferramentas para:

      ● análise de desempenho digital
      ● geração de insights estratégicos
      ● simulação de precificação de campanhas
      ● identificação de oportunidades comerciais
      ● organização da atividade profissional do criador
      ● conexão indireta com campanhas e oportunidades do mercado

    A Plataforma funciona como ferramenta de apoio e inteligência para o criador, não substituindo decisões estratégicas ou profissionais do Usuário.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    3. EVOLUÇÃO DA PLATAFORMA

    A Plataforma encontra-se em evolução contínua.

    A added poderá:

      ● modificar funcionalidades
      ● introduzir novos recursos
      ● alterar limites de uso
      ● encerrar ferramentas específicas

    Tais alterações poderão ocorrer para:

      ● melhoria do serviço
      ● adaptação tecnológica
      ● evolução do modelo de negócio
  ________________________________________________________________________________________________________________________________________________________________________________________________

    4. CADASTRO DO USUÁRIO

    Para utilizar a Plataforma, o Usuário deverá criar uma conta fornecendo informações verdadeiras, completas e atualizadas.

    O Usuário declara que:

      ● possui capacidade legal para contratar
      ● é maior de 18 anos ou está devidamente assistido por responsável legal
      ● é responsável pelas informações fornecidas

    O acesso à conta é pessoal e intransferível.

    O Usuário é responsável por manter a confidencialidade de sua senha e por qualquer atividade realizada em sua conta.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    5. PLANOS E ASSINATURA

    A added poderá disponibilizar diferentes modalidades de acesso à Plataforma, incluindo:

    Plano gratuito

    com funcionalidades limitadas.

    Planos pagos

    com acesso ampliado a recursos, ferramentas ou oportunidades.

    Os detalhes de cada plano poderão incluir:

      ● limite de funcionalidades
      ● quantidade de análises
      ● acesso a oportunidades
      ● exportação de dados
      ● ferramentas avançadas

    Essas condições serão sempre apresentadas na página de planos da Plataforma.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    6. COBRANÇA E PAGAMENTO

    Planos pagos funcionam mediante assinatura recorrente.

    O pagamento poderá ocorrer por:

      ● cartão de crédito
      ● outros meios de pagamento disponibilizados na Plataforma

    Ao contratar um plano pago, o Usuário autoriza a cobrança recorrente correspondente ao período contratado.

    A renovação da assinatura ocorrerá automaticamente ao final de cada ciclo de cobrança, salvo cancelamento prévio pelo Usuário.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    7. CANCELAMENTO DA ASSINATURA

    O Usuário poderá cancelar sua assinatura a qualquer momento.

    O cancelamento:

      ● interrompe a renovação automática
      ● mantém o acesso ao plano contratado até o final do ciclo já pago

    Salvo disposição contrária prevista na legislação aplicável, não haverá reembolso proporcional de períodos já iniciados.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    8. USO ADEQUADO DA PLATAFORMA

    O Usuário compromete-se a utilizar a Plataforma de forma ética e conforme a legislação vigente.

    É proibido:

      ● realizar engenharia reversa da Plataforma
      ● copiar ou distribuir o software
      ● manipular dados de forma fraudulenta
      ● utilizar a Plataforma para atividades ilícitas
      ● inserir conteúdos ofensivos ou discriminatórios
      ● tentar acessar sistemas ou dados sem autorização

    A violação dessas regras poderá resultar em suspensão ou exclusão da conta.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    9. MÉTRICAS E DADOS DO USUÁRIO

    O Usuário é responsável pela veracidade das informações inseridas na Plataforma.

    Caso a Plataforma utilize métricas provenientes de redes sociais ou outras fontes externas, a added não garante:

      ● exatidão absoluta
      ● disponibilidade contínua dessas integrações
      ● atualização em tempo real
  ________________________________________________________________________________________________________________________________________________________________________________________________

    10. OPORTUNIDADES E CAMPANHAS

    A Plataforma poderá apresentar oportunidades de campanhas entre criadores e marcas.

    A added atua exclusivamente como intermediadora tecnológica, não sendo parte contratante nas negociações entre criadores e marcas.

    Assim, a added não se responsabiliza por:

      ● execução das campanhas
      ● pagamentos entre criadores e marcas
      ● cumprimento de obrigações contratuais entre as partes
  ________________________________________________________________________________________________________________________________________________________________________________________________

    11. FERRAMENTAS DE INTELIGÊNCIA ARTIFICIAL

    A Plataforma poderá utilizar ferramentas de inteligência artificial para:

      ● gerar análises
      ● produzir insights
      ● sugerir estratégias
      ● organizar informações

    Essas ferramentas têm caráter informativo e auxiliar, não constituindo aconselhamento profissional.

    O Usuário permanece responsável pelas decisões tomadas com base nas informações fornecidas.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    12. PROPRIEDADE INTELECTUAL

    Todos os direitos de propriedade intelectual da Plataforma pertencem exclusivamente à added, incluindo:

      ● software
      ● algoritmos
      ● marca
      ● design
      ● banco de dados
      ● interface

    A added concede ao Usuário uma licença limitada, não exclusiva e intransferível para utilização da Plataforma.

    Essa licença não autoriza:

      ● cópia do software
      ● revenda da tecnologia
      ● exploração comercial da Plataforma.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    13. CONTEÚDO DO USUÁRIO

    O Usuário permanece titular de todo conteúdo que inserir na Plataforma.

    Ao utilizar a Plataforma, o Usuário concede à added uma licença limitada para:

      ● armazenar os dados
      ● processar informações
      ● gerar análises e relatórios
      ● melhorar os serviços da Plataforma.

    A added poderá utilizar dados agregados e anonimizados para:

      ● desenvolvimento de algoritmos
      ● melhoria do produto
      ● análise de mercado.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    14. LIMITAÇÃO DE RESPONSABILIDADE

    A Plataforma é fornecida “como está”.

    A added não garante que a Plataforma estará livre de erros ou interrupções.

    Na máxima extensão permitida pela legislação aplicável, a added não será responsável por:

      ● perdas indiretas
      ● lucros cessantes
      ● danos decorrentes do uso da Plataforma

    A responsabilidade total da added, em qualquer hipótese, fica limitada ao valor pago pelo Usuário à Plataforma nos 12 meses anteriores ao evento que originou a reclamação.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    15. SUSPENSÃO OU ENCERRAMENTO DE CONTA

    A added poderá suspender ou encerrar contas que:

      ● violem estes Termos
      ● utilizem a Plataforma de forma fraudulenta
      ● apresentem comportamento abusivo ou ilícito.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    16. ALTERAÇÃO DOS TERMOS

    Estes Termos poderão ser atualizados periodicamente.

    Alterações relevantes poderão ser comunicadas por:

      ● e-mail
      ● notificação dentro da Plataforma
      O uso continuado da Plataforma após as alterações constitui aceitação dos novos Termos.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    17. LEGISLAÇÃO APLICÁVEL

    Estes Termos são regidos pelas leis da República Federativa do Brasil.

    Fica eleito o foro da comarca de Florianópolis/SC para dirimir quaisquer controvérsias.
  ________________________________________________________________________________________________________________________________________________________________________________________________
  
    POLÍTICA DE PRIVACIDADE (RESUMO ESTRUTURAL)

    A added atua como controladora de dados pessoais, nos termos da LGPD.

    Dados coletados podem incluir:

      ● nome
      ● e-mail
      ● telefone
      ● CPF ou CNPJ
      ● dados de redes sociais
      ● dados de navegação
      ● endereço IP
      ● informações de uso da Plataforma

    Finalidades do tratamento incluem:

      ● operação da Plataforma
      ● personalização da experiência
      ● prevenção a fraudes
      ● melhoria de funcionalidades
      ● cumprimento de obrigações legais.

    Os dados poderão ser compartilhados com:

      ● provedores de infraestrutura tecnológica
      ● parceiros necessários à operação da Plataforma
      ● autoridades legais quando exigido.

    O Usuário poderá exercer seus direitos previstos na LGPD, incluindo:

      ● acesso aos dados
      ● correção
      ● exclusão
      ● portabilidade
      ● revogação de consentimento.

    Solicitações podem ser encaminhadas para:

    legal@added.today`;
