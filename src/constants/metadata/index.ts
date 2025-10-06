import { Metadata, Viewport } from "next";

export const siteUrl = "https://added-today-frontend-production.up.railway.app";
export const siteName = "Added";
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
    "IA",
    "influenciadores",
    "automação",
    "dashboards",
    "gestão de usuários",
    "personalidades",
  ],
  other: { category: "technology" },
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
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
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${siteName} – ${siteDescription.slice(0, 70)}…`,
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteName,
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

export const newPasswordMetadata: Metadata = {
  title: "Alterar Senha",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Alterar Senha",
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
    title: "Política dos Termos de Uso",
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
    title: "Sobre",
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
    title: "Gerenciar Usuários",
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
    title: "Gerenciar Mentores",
    url: `${siteUrl}/mentals`,
    type: "website",
  },
};

export const oportunitiesMetadata: Metadata = {
  title: "Campanhas",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Campanhas",
    url: `${siteUrl}/oportunities`,
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
    title: "Precificação",
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
    title: "Insights",
    url: `${siteUrl}/insights`,
    type: "website",
  },
};

export const chatMetadata: Metadata = {
  title: "Mentores",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Mentores",
    url: `${siteUrl}/chat`,
    type: "website",
  },
};

export const termsOfUseMock: string = `TERMO DE USO E CONDIÇÕES GERAIS DA PLATAFORMA ADDED
  
  Última atualização: 28/08/2025
  ________________________________________________________________________________________________________________________________________________________________________________________________

    1. ACEITE DOS TERMOS

    1.1. O presente Termo regula o uso da plataforma digital added (“Plataforma”), disponibilizada pela ADDED TECNOLOGIA E EDUCAÇÃO LTDA, pessoa jurídica de direito privado, inscrita no CNPJ sob número: 25.155.506/0001-09.

    1.2. Ao acessar ou utilizar a Plataforma, o Usuário declara ter lido, compreendido e aceitado integralmente as condições aqui estabelecidas.

    1.3. Caso o Usuário não concorde com quaisquer disposições, deverá interromper imediatamente o uso da Plataforma.
  ________________________________________________________________________________________________________________________________________________________________________________________________
  
    2. DEFINIÇÕES

    ●	Usuário: pessoa física ou jurídica cadastrada na Plataforma.
    ●	Dados Pessoais: informações relacionadas à pessoa natural identificada ou identificável, nos termos da LGPD.
    ●	Controlador: a added, responsável pelas decisões referentes ao tratamento de Dados Pessoais.
    ●	Operador: terceiros contratados pela added para processar Dados Pessoais em seu nome.
    ●	MVP: versão mínima viável da Plataforma, em fase inicial de testes e validação de funcionalidades.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    3. OBJETO DA PLATAFORMA

    3.1. A Plataforma added consiste em um ecossistema digital destinado a criadores de conteúdo e marcas, oferecendo funcionalidades iniciais de gestão, capacitação, conexão e oportunidades de monetização.

    3.2. Nesta fase de MVP, os serviços podem ser alterados, suspensos ou descontinuados a qualquer momento, sem necessidade de aviso prévio, a exclusivo critério da added.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    4. CADASTRO DO USUÁRIO

    4.1. Para utilizar a Plataforma, o Usuário deverá fornecer dados pessoais verdadeiros, completos e atualizados.

    4.2. O Usuário é o único responsável pela veracidade das informações prestadas.

    4.3. É proibido o uso de identidade de terceiros sem autorização.

    4.4. O login e a senha são pessoais e intransferíveis, sendo vedado seu compartilhamento. O Usuário é responsável por qualquer uso indevido de sua conta.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    5. TRATAMENTO DE DADOS PESSOAIS

    5.1. O tratamento de Dados Pessoais realizado pela added observará estritamente a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).

    5.2. A coleta, finalidades, hipóteses legais, compartilhamento, direitos dos titulares e medidas de segurança encontram-se detalhados na Política de Privacidade (Anexo I), parte integrante deste Termo.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    6. OBRIGAÇÕES DO USUÁRIO

    6.1. O Usuário se compromete a:

    ●	Utilizar a Plataforma de forma ética e conforme a legislação vigente;
    ●	Não realizar engenharia reversa, cópia, distribuição ou modificação do software;
    ●	Não inserir conteúdos ilícitos, ofensivos, discriminatórios ou que violem direitos de terceiros;
    ●	Responsabilizar-se integralmente pelos conteúdos publicados.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    7. PROPRIEDADE INTELECTUAL

    7.1. Todos os direitos de propriedade intelectual relacionados à Plataforma, incluindo, mas não se limitando a software, marca, design, banco de dados, funcionalidades, textos e conteúdos, pertencem exclusivamente à added.

    7.2. É vedado ao Usuário utilizar, copiar, reproduzir, modificar, comercializar ou explorar, total ou parcialmente, qualquer elemento da Plataforma sem autorização expressa e por escrito da added.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    8. LIMITAÇÃO DE RESPONSABILIDADE

    8.1. A added não se responsabiliza por:

    ●	Danos decorrentes de indisponibilidade temporária da Plataforma;
    ●	Erros causados por falha de conexão do Usuário;
    ●	Conteúdos gerados ou publicados por Usuários ou terceiros;
    ●	Perdas indiretas, lucros cessantes ou danos morais.

  ________________________________________________________________________________________________________________________________________________________________________________________________

    9. CANCELAMENTO, SUSPENSÃO E EXCLUSÃO

    9.1. A added poderá suspender ou excluir o acesso do Usuário que violar os presentes Termos, sem prejuízo da adoção das medidas legais cabíveis.

    9.2. O Usuário poderá solicitar a exclusão de sua conta e dos seus Dados Pessoais, respeitados os prazos legais de retenção.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    10. ATUALIZAÇÕES DOS TERMOS

    10.1. A added poderá alterar este Termo a qualquer momento.
    
    10.2. Recomenda-se que o Usuário verifique periodicamente a versão atualizada.

    10.3. O uso contínuo da Plataforma após alterações constitui aceitação tácita das novas condições.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    11. DISPOSIÇÕES GERAIS

    11.1. O presente Termo é regido pelas leis da República Federativa do Brasil.

    11.2. Qualquer nulidade ou inexequibilidade de cláusula não afetará as demais disposições.

    11.3. Fica eleito o foro da Comarca de Florianópolis/SC, com renúncia de qualquer outro, por mais privilegiado que seja.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    ANEXO I - POLÍTICA DE PRIVACIDADE
  ________________________________________________________________________________________________________________________________________________________________________________________________

    1. CONTROLADOR DOS DADOS

    A ADDED TECNOLOGIA E EDUCAÇÃO LTDA é a Controladora dos Dados Pessoais tratados na Plataforma.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    2. DADOS PESSOAIS COLETADOS

    ●	Nome, e-mail, telefone, CPF/CNPJ, redes sociais cadastradas;
    ●	Dados de navegação e uso (cookies, logs, endereço IP, dispositivo);
    ●	Informações fornecidas em interações com marcas e parceiros.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    3. FINALIDADES DO TRATAMENTO

    ●	Permitir acesso e uso da Plataforma;
    ●	Oferecer oportunidades personalizadas de conexão entre criadores e marcas;
    ●	Cumprir obrigações legais e regulatórias;
    ●	Melhorar a experiência do Usuário;
    ●	Prevenção à fraude, segurança e auditoria.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    4. BASES LEGAIS (Art. 7º da LGPD)

    O tratamento de Dados Pessoais poderá ocorrer com base em:

    ●	Execução de contrato: prestação dos serviços da Plataforma;
    ●	Consentimento: envio de comunicações opcionais;
    ●	Cumprimento de obrigação legal/regulatória;
    ●	Legítimo interesse: melhoria de funcionalidades, prevenção a fraudes, segurança.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    5. COMPARTILHAMENTO DE DADOS

    Poderão ter acesso aos Dados Pessoais:

    ●	Fornecedores de tecnologia, nuvem e hospedagem;
    ●	Parceiros comerciais, para execução de campanhas;
    ●	Autoridades públicas, mediante obrigação legal.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    6. DIREITOS DO TITULAR (Art. 18 da LGPD)
    
    O Usuário poderá, a qualquer tempo, solicitar:

    ●	Confirmação da existência de tratamento;
    ●	Acesso aos seus dados;
    ●	Correção de dados incompletos, inexatos ou desatualizados;
    ●	Anonimização, bloqueio ou eliminação;
    ●	Portabilidade;
    ●	Informação sobre compartilhamento;
    ●	Revogação do consentimento.

    Contato do Encarregado (DPO): legal@added.today
  ________________________________________________________________________________________________________________________________________________________________________________________________

    7. SEGURANÇA DA INFORMAÇÃO

    A added adota medidas técnicas e organizacionais adequadas para proteger os Dados Pessoais contra acessos não autorizados, destruição acidental ou ilícita, perda, alteração, comunicação ou difusão indevida.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    8. ARMAZENAMENTO E PRAZO DE RETENÇÃO

    Os Dados Pessoais serão armazenados pelo tempo necessário para o cumprimento das finalidades do tratamento e das obrigações legais, respeitando os princípios da LGPD.
  ________________________________________________________________________________________________________________________________________________________________________________________________

    9. ALTERAÇÕES DA POLÍTICA

    A presente Política poderá ser alterada a qualquer momento, sendo a versão atual sempre disponibilizada no Anexo I destes Termos.`;
