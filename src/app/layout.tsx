import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import AuthProvider from "@/contexts/auth";
import WebSocketsProvider from "@/contexts/webSockets";
import UsersProvider from "@/contexts/users";
import MentalsProvider from "@/contexts/mentals";
import ChatProvider from "@/contexts/chat";
import OpportunitiesProvider from "@/contexts/opportunities";

import Header from "@/components/header";

import { layoutMetadata, layoutViewport } from "@/constants/metadata";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="vsc-initialized vsc-domain-localhost">
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
            },
          }}
        />

        <AuthProvider>
          <WebSocketsProvider>
            <UsersProvider>
              <MentalsProvider>
                <ChatProvider>
                  <OpportunitiesProvider>
                    <Header />

                    {children}
                  </OpportunitiesProvider>
                </ChatProvider>
              </MentalsProvider>
            </UsersProvider>
          </WebSocketsProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
