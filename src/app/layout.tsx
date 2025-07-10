import type { Metadata } from "next";
import { ReactNode } from "react";

import AuthProvider from "@/contexts/Auth";

import Header from "@/components/header";

import "@/styles/global.css";

interface IProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Added Today",
  description:
    "Gerencie e personalize chatbots com personalidades únicas por meio de uma plataforma inteligente e intuitiva. Nossa aplicação oferece um dashboard completo para administração de mentals, onde você pode criar, atualizar e deletar chatbots personalizados, além de gerenciar influenciadores e usuários com facilidade. Ideal para marcas, criadores de conteúdo e empresas que desejam automatizar interações com personalidade, mantendo controle total sobre cada mental e seus relacionamentos. Automatização, personalização e gestão de influenciadores em um só lugar.",
};

const RootLayout = ({ children }: Readonly<IProps>) => {
  return (
    <html lang="en">
      <body className="vsc-initialized">
        <AuthProvider>
          <Header />

          {children}
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
