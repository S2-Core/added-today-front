import { Metadata, Viewport } from "next";

const siteUrl = "https://added-today-frontend-production.up.railway.app";
const siteName = "Added Today";
const siteDescription =
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

export const homeMetadata: Metadata = {
  title: "Seja Bem-vindo(a)",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Seja Bem-vindo(a)",
    url: `${siteUrl}/home`,
    type: "website",
  },
};

export const usersMetadata: Metadata = {
  title: "Usuários",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Usuários",
    url: `${siteUrl}/users`,
    type: "website",
  },
};

export const mentalsMetadata: Metadata = {
  title: "Mentals",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Mentals",
    url: `${siteUrl}/mentals`,
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

export const quotationsMetadata: Metadata = {
  title: "Precificações",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Precificações",
    url: `${siteUrl}/quotations`,
    type: "website",
  },
};

export const oportunitiesMetadata: Metadata = {
  title: "Oportunidades",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Oportunidades",
    url: `${siteUrl}/oportunities`,
    type: "website",
  },
};

export const chatMetadata: Metadata = {
  title: "Chat",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Chat",
    url: `${siteUrl}/chat`,
    type: "website",
  },
};
