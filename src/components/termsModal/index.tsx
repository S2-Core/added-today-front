"use client";

import { useAuth } from "@/contexts";

import FixedModal from "../fixedModal";

import { termsOfUseMock } from "@/constants/metadata";

const TermsModal = () => {
  const { termsModal, handleAcceptTerms } = useAuth();

  return (
    <FixedModal isOpen={termsModal} size="42rem" className="select-none">
      <h1 className="font-bold text-xl text-center">
        Termo de uso e condições gerais da plataforma Added
      </h1>

      <article className="p-4 border-1 rounded max-h-70 overflow-x-hidden overflow-y-auto text-justify whitespace-pre-line">
        {termsOfUseMock}
      </article>

      <button
        type="button"
        title="Aceitar termos"
        tabIndex={-1}
        onClick={handleAcceptTerms}
        className="self-end bg-primary/70 hover:bg-primary active:bg-primary/70 px-3 py-2 border-1 rounded w-full sm:w-fit text-light transition-all duration-300 cursor-pointer"
      >
        Aceitar termos
      </button>
    </FixedModal>
  );
};

export default TermsModal;
