"use client";

import { useEffect, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";

import Container from "@/components/container";
import { useRouter } from "next/navigation";

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
        className="top-10 left-10 absolute hover:bg-gray-3 p-2 rounded-full text-light hover:text-secondary active:text-primary text-4xl transition-all duration-300 cursor-pointer"
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
