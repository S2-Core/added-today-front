"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TbArrowBackUp } from "react-icons/tb";

import Container from "@/components/container";

const NotFound = () => {
  const navigate = useRouter();

  const [timer, setTimer] = useState(5);

  useEffect(() => {
    if (timer === 0) {
      navigate.back();

      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Container
      Tag={"main"}
      className="flex flex-col justify-center items-center h-screen select-none"
    >
      <button
        type="button"
        onClick={() => navigate.back()}
        title="Voltar para tela inicial"
        tabIndex={-1}
        className="top-5 left-5 absolute p-2 rounded-full text-light hover:text-primary active:text-primary/50 text-4xl transition-all duration-300 cursor-pointer"
      >
        <TbArrowBackUp />
      </button>

      <h1 className="font-bold text-9xl/snug">404</h1>

      <h2 className="font-bold text-2xl/snug">Página não encontrada</h2>

      <p className="mt-1 text-sm">
        A página que você tentou acessar não existe.
      </p>

      <span className="mt-5 font-bold text-xs">
        ( Estamos te redirecionando em
        <span className="text-secondary">{` ${timer}`}</span>... )
      </span>
    </Container>
  );
};

export default NotFound;
