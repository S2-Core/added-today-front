"use client";

import Link from "next/link";
import Container from "../container";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center mt-auto pt-8 border-foreground border-t h-20 text-foreground select-none">
      <Container Tag={"div"} className="text-center">
        <Link
          href="terms-of-use"
          className="hover:text-primary hover:underline transition-all duration-300"
        >
          Política Dos Termos de Uso
        </Link>
      </Container>

      <p className="bg-tertiary p-2 w-full text-light text-center">
        Copyright © {new Date().getFullYear()} Added Today - Todos os direitos
        reservados
      </p>
    </footer>
  );
};

export default Footer;
