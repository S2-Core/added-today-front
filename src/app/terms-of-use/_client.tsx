"use client";

import { useRouter } from "next/navigation";
import { TbArrowBackUp } from "react-icons/tb";

import Container from "@/components/container";

import { termsOfUseMock } from "@/constants/metadata";

const Client = () => {
  const navigate = useRouter();

  return (
    <Container Tag={"main"} className="mb-20">
      <button
        type="button"
        onClick={() => navigate.back()}
        title="Voltar para tela inicial"
        tabIndex={-1}
        className="top-5 left-5 absolute p-2 rounded-full text-foreground hover:text-tertiary active:text-primary text-4xl transition-all duration-300 cursor-pointer"
      >
        <TbArrowBackUp />
      </button>

      <article className="mt-20 overflow-hidden text-justify whitespace-pre-line">
        {termsOfUseMock}
      </article>
    </Container>
  );
};

export default Client;
