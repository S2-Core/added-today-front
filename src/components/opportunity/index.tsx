"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineEdit, AiOutlineExport } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";

import { useAuth, useOpportunities } from "@/contexts";

import FixedModal from "../fixedModal";

import { captalize } from "@/utils/string.utils";
import { formatCurrency } from "@/utils/number.utils";
import { formatDate } from "@/utils/date.utils";

import { OpportunityStatus, OpportunityType } from "@/constants/opportunities";
import { UserRole } from "@/constants/users";

import { IOpportunity } from "@/contexts/opportunities/interfaces";
import { useRouter } from "next/navigation";

interface IProps {
  opportunity: IOpportunity;
}

const Opportunity = ({ opportunity }: IProps) => {
  const {
    id,
    title,
    deadline,
    brand,
    platform,
    sourceUrl,
    compensationMin,
    compensationMax,
    nicheTags,
    audienceRange,
    requirements,
    location,
    type,
    status,
    currency,
    highlight,
    createdAt,
    deletedAt,
  } = opportunity;

  const isActive = !deletedAt;

  const navigate = useRouter();

  const { loggedUser } = useAuth();
  const { handleDeactivateOpportunity } = useOpportunities();

  const isAdmin = loggedUser && loggedUser.role === UserRole.ADMIN;

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <li className="mx-auto w-full max-w-2xl select-none">
        <Link
          href={sourceUrl && isActive ? sourceUrl : ""}
          target={sourceUrl && isActive ? "_blank" : "_top"}
          rel="noopener noreferrer"
          title={`${sourceUrl && isActive ? "Acessar Link da Oportunidade" : "Oportunidade"} "${captalize(title)}"`}
          tabIndex={-1}
          onClick={(e) => {
            if (!sourceUrl || !isActive) e.preventDefault();
          }}
          className={`relative flex bg-background px-4 py-3 border-1 border-foreground rounded shadow-xl/30 w-full transition-all duration-300 ${isActive ? `${sourceUrl ? "cursor-pointer hover:bg-gray-3/20 active:bg-gray-3/50" : "cursor-default"}` : "bg-gray-3 border-gray-3 cursor-default"}`}
        >
          <div
            title={
              status === OpportunityStatus.DRAFT
                ? "Rascunho"
                : status === OpportunityStatus.PUBLISHED
                  ? "Publicada"
                  : "Arquivada"
            }
            className={`w-2 h-2 rounded-full z-9 shadow-md absolute top-2 left-2 ${status === OpportunityStatus.DRAFT ? "bg-warning" : status === OpportunityStatus.PUBLISHED ? "bg-success" : "bg-error"} ${isActive ? "" : "grayscale"}`}
          />

          {sourceUrl && (
            <button
              type="button"
              tabIndex={-1}
              className={`absolute p-2 text-gray-8 top-0 ${isActive ? "cursor-pointer" : "cursor-default grayscale"} ${isAdmin ? "left-0" : "right-0"}`}
            >
              <AiOutlineExport size={20} />
            </button>
          )}

          {isActive && (
            <>
              {isAdmin && (
                <div className="top-0 right-0 z-9 absolute flex">
                  <button
                    type="button"
                    title="Editar Oportunidade"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.preventDefault();

                      navigate.push(`/opportunities/${id}`);
                    }}
                    className="hover:bg-primary/30 p-1 rounded hover:text-primary cursor-pointer"
                  >
                    <AiOutlineEdit size={20} />
                  </button>

                  <button
                    type="button"
                    title="Excluir Oportunidade"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.preventDefault();

                      setOpen(true);
                    }}
                    className="hover:bg-error/30 p-1 rounded hover:text-error cursor-pointer"
                  >
                    <IoTrashOutline size={20} />
                  </button>
                </div>
              )}

              {highlight && (
                <div className="top-0 right-0 z-2 absolute border-2 border-primary rounded w-full h-full">
                  <div className="top-0 right-0 z-10 absolute border-1 border-tertiary rounded w-full h-full" />
                </div>
              )}
            </>
          )}

          <div className="flex flex-col gap-2 w-full text-sm">
            <p
              className={`font-bold text-center text-lg ${!isActive ? "line-through" : ""}`}
            >
              {captalize(title)}
            </p>

            <div className="flex flex-col gap-3 sm:gap-10">
              {(requirements ||
                audienceRange ||
                platform ||
                brand ||
                (nicheTags && !!nicheTags.length)) && (
                <ul
                  className={`flex sm:flex-row flex-col justify-between items-start gap-3 sm:gap-10 text-xs ${!isActive ? "line-through" : ""}`}
                >
                  {(requirements || audienceRange || platform || brand) && (
                    <li className="flex flex-col w-full xs:w-fit whitespace-nowrap">
                      {requirements && (
                        <p title={requirements} className="font-bold">
                          {"Requisitos"}

                          <span className="font-normal">: {requirements}</span>
                        </p>
                      )}

                      {audienceRange && (
                        <p title={audienceRange} className="font-bold">
                          {"Público-alvo"}

                          <span className="font-normal">: {audienceRange}</span>
                        </p>
                      )}

                      {location && (
                        <p title={location} className="font-bold">
                          {"Local"}

                          <span className="font-normal">: {location}</span>
                        </p>
                      )}

                      {brand && (
                        <p title={brand} className="font-bold">
                          {"Marca"}

                          <span className="font-normal">: {brand}</span>
                        </p>
                      )}

                      {platform && (
                        <p title={platform} className="font-bold">
                          {"Plataforma"}

                          <span className="font-normal">: {platform}</span>
                        </p>
                      )}
                    </li>
                  )}

                  {nicheTags && !!nicheTags.length && (
                    <li className="w-full xs:w-fit">
                      <ul className="flex xs:flex-row flex-col xs:flex-wrap gap-1 sm:p-0 pr-2 h-full max-h-20 overflow-y-auto">
                        {nicheTags.map((tag, i) => (
                          <li
                            key={`${i}-${tag}-nicheTags`}
                            className="z-9 w-full xs:w-fit h-full xs:h-fit"
                          >
                            <p
                              title={tag}
                              className={`flex items-center px-2 py-1 rounded-full w-full max-w-full sm:max-w-15 h-full overflow-hidden text-xs italic ${isActive ? "bg-foreground text-light" : "bg-gray-6 text-foreground"}`}
                            >
                              <span className="w-full h-full overflow-hidden text-ellipsis whitespace-nowrap">
                                {tag}
                              </span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              )}

              <ul
                className={`flex sm:grid sm:grid-cols-3 flex-col justify-center sm:justify-between items-start sm:items-center gap-2 sm:gap-0 w-full ${!isActive ? "line-through" : ""}`}
              >
                <li
                  title={formatDate(new Date(deletedAt ?? createdAt), {
                    getHours: true,
                    getMinutes: true,
                  })}
                  className="z-9 flex flex-col font-bold text-gray-8 text-xs"
                >
                  <p>
                    {`Data de ${deletedAt ? "exclusão" : "criação"}`}

                    <span className="font-normal">:</span>
                  </p>

                  <span className="font-normal">
                    {formatDate(new Date(deletedAt ?? createdAt), {
                      getHours: true,
                      getMinutes: true,
                    })}
                  </span>
                </li>

                <li
                  title={formatDate(new Date(deadline), {
                    getHours: true,
                    getMinutes: true,
                  })}
                  className="z-9 flex flex-col sm:items-center font-bold text-gray-8 text-xs"
                >
                  <p>
                    {`${new Date(deadline) < new Date() ? "Encerrou" : "Encerra"} em`}

                    <span className="font-normal">:</span>
                  </p>

                  <span className="font-normal">
                    {formatDate(new Date(deadline), {
                      getHours: true,
                      getMinutes: true,
                    })}
                  </span>
                </li>

                {(compensationMax || compensationMin) &&
                  type === OpportunityType.PAID && (
                    <li
                      title={`${compensationMin ? formatCurrency(compensationMin, currency ?? "BRL") : "?"} - ${compensationMax ? formatCurrency(compensationMax, currency ?? "BRL") : "?"}`}
                      className="z-9 flex flex-col sm:items-end font-bold text-gray-8 text-xs"
                    >
                      <p>
                        {"Compensação"}

                        <span className="font-normal">:</span>
                      </p>

                      <span className="font-normal">
                        {compensationMin
                          ? formatCurrency(compensationMin, currency ?? "BRL")
                          : "?"}

                        {" - "}

                        {compensationMax
                          ? formatCurrency(compensationMax, currency ?? "BRL")
                          : "?"}
                      </span>
                    </li>
                  )}
              </ul>
            </div>
          </div>
        </Link>
      </li>

      <FixedModal isOpen={isOpen} close={() => setOpen(false)}>
        <p className="text-sm text-justify">
          {"Deseja realmente "}
          <span className="font-bold text-error">{"DESATIVAR "}</span>
          <span className="font-bold text-primary">{`"${title}"`}</span>
          {"? Caso sim, não poderá alterar os dados desse item, e também"}
          <span className="font-bold text-error">{" NÃO "}</span>
          {"será possivel "}
          <span className="font-bold text-tertiary">{"REATIVÁ-LO"}</span>.
        </p>

        <div className="flex sm:flex-row flex-col justify-center gap-5">
          <button
            type="button"
            title={`Desativar ${title}`}
            tabIndex={-1}
            onClick={() => {
              handleDeactivateOpportunity(id).finally(() => setOpen(false));
            }}
            className="hover:bg-gray-3/50 active:bg-gray-3/20 px-4 py-2 border-1 rounded sm:max-w-60 overflow-hidden font-bold text-xs text-ellipsis whitespace-nowrap transition-all duration-300 cursor-pointer"
          >
            {`Desativar ${title}`}
          </button>

          <button
            type="button"
            title="Cancelar"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="bg-tertiary hover:bg-primary active:bg-primary/70 px-4 py-2 rounded font-bold text-light text-xs transition-all duration-300 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </FixedModal>
    </>
  );
};

export default Opportunity;
