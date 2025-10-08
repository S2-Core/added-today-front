import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import AuthProvider from "@/contexts/auth";
import WebSocketsProvider from "@/contexts/webSockets";
import UsersProvider from "@/contexts/users";
import OpportunitiesProvider from "@/contexts/opportunities";
import MentalsProvider from "@/contexts/mentals";
import ChatProvider from "@/contexts/chat";
import InsightsProvider from "@/contexts/insights";
import QuotationsProvider from "@/contexts/quotations";
import TermsModal from "@/components/termsModal";

import Header from "@/components/header";

import {
  layoutMetadata,
  layoutViewport,
  siteDescription,
  siteName,
} from "@/constants/metadata";

import "@/styles/global.css";

interface IProps {
  children: ReactNode;
}

export const metadata: Metadata = layoutMetadata;
export const viewport: Viewport = layoutViewport;

const RootLayout = ({ children }: Readonly<IProps>) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content="/images/openGraph.png" />
        <meta property="og:url" content="https://app.added.today/" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="https://added-today.vercel.app/"
        />
        <meta
          property="twitter:url"
          content="https://added-today.vercel.app/"
        />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content="/images/openGraph.png" />
      </head>

      <body className="flex flex-col min-h-screen vsc-initialized vsc-domain-localhost">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 8000,
            style: {
              background: "transparent",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--foreground)",
              color: "var(--foreground)",
              userSelect: "none",
              cursor: "pointer",
              zIndex: 9999999,
            },
          }}
        />

        <AuthProvider>
          <WebSocketsProvider>
            <UsersProvider>
              <OpportunitiesProvider>
                <MentalsProvider>
                  <ChatProvider>
                    <InsightsProvider>
                      <QuotationsProvider>
                        <Header />

                        {children}

                        <TermsModal />
                      </QuotationsProvider>
                    </InsightsProvider>
                  </ChatProvider>
                </MentalsProvider>
              </OpportunitiesProvider>
            </UsersProvider>
          </WebSocketsProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
