import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import AuthProvider from "@/contexts/auth";
import UsersProvider from "@/contexts/users";
import MentalsProvider from "@/contexts/mentals";

import Header from "@/components/header";

import "@/styles/global.css";

interface IProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Added Today",
  description:
    "Gerencie e personalize chatbots com personalidades únicas por meio de uma plataforma inteligente e intuitiva. Nossa aplicação oferece um dashboard completo para administração de mentals, onde você pode criar, atualizar e deletar chatbots personalizados, além de gerenciar influenciadores e usuários com facilidade. Ideal para marcas, criadores de conteúdo e empresas que desejam automatizar interações com personalidade, mantendo controle total sobre cada mental e seus relacionamentos. Automatização, personalização e gestão de influenciadores em um só lugar.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

const RootLayout = ({ children }: Readonly<IProps>) => {
  return (
    <html lang="en">
      <body className="vsc-initialized vsc-domain-localhost">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 8000,
            style: {
              background: "var(--gray-1)",
              color: "var(--light)",
            },
          }}
        />

        <AuthProvider>
          <UsersProvider>
            <MentalsProvider>
              <Header />

              {children}
            </MentalsProvider>
          </UsersProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
