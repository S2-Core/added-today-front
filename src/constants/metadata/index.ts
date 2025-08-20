import { Metadata, Viewport } from "next";

const siteUrl = "https://added-today-frontend-production.up.railway.app";
const siteName = "Added Today";
const siteDescription =
  "Gerencie e personalize chatbots com personalidades únicas em uma plataforma inteligente e intuitiva. Tenha um dashboard completo para criar, atualizar e deletar mentals, além de gerenciar influenciadores e usuários. Automatize interações com personalidade e mantenha controle total.";

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
  title: { default: siteName, template: `%s | ${siteName}` },
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
  title: "Login",
  description: `Acesse sua conta no ${siteName} para gerenciar e personalizar chatbots com personalidade. Utilize o dashboard inteligente para controlar mentals, influenciadores e usuários de forma prática e segura.`,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Login",
    description:
      "Entre na plataforma para gerenciar seus chatbots personalizados.",
    url: `${siteUrl}/`,
    type: "website",
  },
};

export const newPasswordMetadata: Metadata = {
  title: "Alterar Senha",
  description: `Atualize sua senha com segurança no ${siteName}. Proteja sua conta e mantenha o acesso ao painel de gerenciamento de chatbots, mentals e usuários de forma simples e rápida.`,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Alterar Senha",
    description: `Atualize sua senha com segurança no ${siteName}. Proteja sua conta e mantenha o acesso ao painel de gerenciamento de chatbots, mentals e usuários de forma simples e rápida.`,
    url: `${siteUrl}/new-password`,
    type: "website",
  },
};

export const homeMetadata: Metadata = {
  title: "Seja Bem-vindo(a)",
  description: `Descubra o ${siteName}, a plataforma inteligente para gerenciar e personalizar chatbots com personalidades únicas. Crie mentals, gerencie influenciadores e usuários e automatize interações com total controle.`,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Seja Bem-vindo(a)",
    description: `Descubra o ${siteName}, a plataforma inteligente para gerenciar e personalizar chatbots com personalidades únicas. Crie mentals, gerencie influenciadores e usuários e automatize interações com total controle.`,
    url: `${siteUrl}/home`,
    type: "website",
  },
};

export const usersMetadata: Metadata = {
  title: "Usuários",
  description: `Gerencie todos os usuários do ${siteName} de forma simples e eficiente. Acompanhe cadastros, edite informações, organize permissões e mantenha controle total sobre acessos e interações dentro da plataforma.`,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Usuários",
    description: `Gerencie todos os usuários do ${siteName} de forma simples e eficiente. Acompanhe cadastros, edite informações, organize permissões e mantenha controle total sobre acessos e interações dentro da plataforma.`,
    url: `${siteUrl}/users`,
    type: "website",
  },
};

export const mentalsMetadata: Metadata = {
  title: "Mentals",
  description: `Gerencie e personalize seus mentals no ${siteName}. Crie, atualize e exclua chatbots com personalidades únicas, organize seus relacionamentos e mantenha controle total sobre cada interação de forma prática e inteligente.`,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Mentals",
    description: `Gerencie e personalize seus mentals no ${siteName}. Crie, atualize e exclua chatbots com personalidades únicas, organize seus relacionamentos e mantenha controle total sobre cada interação de forma prática e inteligente.`,
    url: `${siteUrl}/mentals`,
    type: "website",
  },
};

export const oportunitiesMetadata: Metadata = {
  title: "Oportunidades",
  description:
    "Mantenha-se atualizado com as oportunidades de trabalho no seu campo de interesse. Receba notificação de novos trabalhos e oportunidades de carreira.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Oportunidades",
    description:
      "Mantenha-se atualizado com as oportunidades de trabalho no seu campo de interesse. Receba notificação de novos trabalhos e oportunidades de carreira.",
    url: `${siteUrl}/oportunities`,
    type: "website",
  },
};

export const chatMetadata: Metadata = {
  title: "Chat",
  description: `Interaja com seus mentals no ${siteName} e obtenha respostas inteligentes. Utilize o chat inteligente para conversar com seus mentais e obter respostas personalizadas.`,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Chat",
    description: `Interaja com seus mentals no ${siteName} e obtenha respostas inteligentes. Utilize o chat inteligente para conversar com seus mentais e obter respostas personalizadas.`,
    url: `${siteUrl}/chat`,
    type: "website",
  },
};
