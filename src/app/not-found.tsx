"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
        className="absolute top-10 left-10 text-4xl text-light hover:text-secondary active:text-primary cursor-pointer"
      >
        <TbArrowBackUp />
      </button>

      <h1 className="text-9xl/snug font-bold">404</h1>

      <h2 className="text-2xl/snug font-bold">Página não encontrada</h2>

      <p className="text-sm mt-1">
        A página que você tentou acessar não existe.
      </p>

      <span className="text-xs mt-5 font-bold">
        ( Estamos te redirecionando em
        <span className="text-secondary">{` ${timer}`}</span>... )
      </span>
    </Container>
  );
};

export default NotFound;
