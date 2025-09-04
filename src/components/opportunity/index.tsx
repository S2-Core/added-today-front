"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaCheckCircle,
  FaBriefcase,
  FaTrophy,
  FaDollarSign,
  FaExchangeAlt,
} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

import { useAuth, useOpportunities } from "@/contexts";

import FixedModal from "../fixedModal";

import { captalize } from "@/utils/string.utils";
import { formatCurrency } from "@/utils/number.utils";
import { formatDate } from "@/utils/date.utils";

import {
  opportunitiesTypeItems,
  OpportunityStatus,
  OpportunityType,
} from "@/constants/opportunities";
import { UserRole } from "@/constants/users";

import { IOpportunity } from "@/contexts/opportunities/interfaces";

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

  const now = new Date().getTime();
  const total = new Date(deadline).getTime() - new Date(createdAt).getTime();
  const done = now - new Date(createdAt).getTime();
  const progress = Number(
    Math.min(100, Math.max(0, (done / total) * 100)).toFixed(2)
  );
  const progressColor =
    progress <= 33.33
      ? "bg-success"
      : progress <= 66.66
        ? "bg-warning"
        : "bg-error";
  const progressBackColor =
    progress <= 33.33
      ? "bg-success/30"
      : progress <= 66.66
        ? "bg-warning/30"
        : "bg-error/30";
  const progressLegend = 100.0 - progress;
  const opportunityType = opportunitiesTypeItems.find(
    (item) => item.value === type
  )!;

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
          className={`relative flex flex-col gap-4 px-5 py-4 rounded-2xl shadow-xl w-full transition-all duration-500 hover:shadow-2xl bg-light text-foreground ${sourceUrl ? "hover:scale-[1.02] cursor-pointer" : "cursor-default"} ${highlight ? "ring-2 ring-primary" : "ring-2 ring-foreground"} ${isActive ? "" : "opacity-60 grayscale"} ${isAdmin ? "pt-10" : ""}`}
        >
          <div
            className={`absolute z-9 top-4 left-4 w-3 h-3 rounded-full shadow-md/30 ${status === OpportunityStatus.DRAFT ? "bg-warning" : status === OpportunityStatus.PUBLISHED ? "bg-success" : "bg-error"}`}
            title={
              status === OpportunityStatus.DRAFT
                ? "Rascunho"
                : status === OpportunityStatus.PUBLISHED
                  ? "Publicada"
                  : "Arquivada"
            }
          />

          {isActive && isAdmin && (
            <div className="top-2 right-2 z-9 absolute flex gap-2">
              <button
                type="button"
                title="Editar Oportunidade"
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault();

                  navigate.push(`/opportunities/${id}`);
                }}
                className="hover:bg-secondary/20 p-2 rounded-full hover:text-secondary transition-all duration-300 cursor-pointer"
              >
                <AiOutlineEdit size={18} />
              </button>

              <button
                type="button"
                title="Desativar Oportunidade"
                tabIndex={-1}
                onClick={(e) => {
                  e.preventDefault();

                  setOpen(true);
                }}
                className="hover:bg-error/20 p-2 rounded-full hover:text-error transition-all duration-300 cursor-pointer"
              >
                <IoTrashOutline size={18} />
              </button>
            </div>
          )}

          <p className="flex flex-col drop-shadow-md font-extrabold text-xl text-center tracking-wide">
            <span>{`${brand.toUpperCase()} | ${title.toUpperCase()}`}</span>

            <span className="font-normal">
              {type === OpportunityType.PAID ? (
                compensationMin || compensationMax ? (
                  <>
                    {compensationMin
                      ? formatCurrency(compensationMin, currency ?? "BRL")
                      : "?"}

                    {" - "}

                    {compensationMax
                      ? formatCurrency(compensationMax, currency ?? "BRL")
                      : "?"}
                  </>
                ) : (
                  "?"
                )
              ) : (
                opportunityType.label
              )}
            </span>
          </p>

          {(requirements ||
            audienceRange ||
            location ||
            brand ||
            platform ||
            type ||
            (nicheTags && !!nicheTags.length)) && (
            <div className="flex flex-col gap-5 md:gap-2 text-sm">
              {type && (
                <p
                  title={`Tipo da oportunidade: ${captalize(opportunityType.label)}`}
                  className="flex md:flex-row flex-col md:items-center md:gap-2"
                >
                  <div className="flex items-center gap-2">
                    {opportunityType.value === OpportunityType.PAID ? (
                      <FaDollarSign className="text-secondary" />
                    ) : opportunityType.value ===
                      OpportunityType.PERFORMANCE ? (
                      <FaTrophy className="text-warning" />
                    ) : (
                      <FaExchangeAlt className="text-tertiary" />
                    )}

                    <b>Tipo da oportunidade:</b>
                  </div>

                  {captalize(opportunityType.label)}
                </p>
              )}

              {requirements && (
                <p
                  title={`Requisitos: ${captalize(requirements)}`}
                  className="flex md:flex-row flex-col md:items-center md:gap-2"
                >
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-success" />

                    <b>Requisitos:</b>
                  </div>

                  {captalize(requirements)}
                </p>
              )}

              {nicheTags && !!nicheTags.length && (
                <div>
                  <p
                    title={`Nichos: ${nicheTags.join(", ")}`}
                    className="flex items-center gap-2 text-sm"
                  >
                    <FaBriefcase className="text-primary" />

                    <b>Nichos:</b>
                  </p>

                  <div className="flex flex-wrap gap-2 my-2">
                    {nicheTags.map((tag, i) => (
                      <span
                        key={`${i}-${tag}-tag`}
                        title={tag}
                        className="bg-foreground/60 shadow-md px-3 py-1 rounded-full text-light text-xs italic transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {location && (
                <p
                  title={`Local: ${captalize(location)}`}
                  className="flex md:flex-row flex-col md:items-center md:gap-2"
                >
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-error" />

                    <b>Local:</b>
                  </div>

                  {captalize(location)}
                </p>
              )}

              {audienceRange && (
                <p
                  title={`Público-alvo: ${captalize(audienceRange)}`}
                  className="flex md:flex-row flex-col md:items-center md:gap-2"
                >
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-secondary" />

                    <b>Público-alvo:</b>
                  </div>

                  {captalize(audienceRange)}
                </p>
              )}

              {platform && (
                <p
                  title={`Plataforma: ${platform}`}
                  className="flex md:flex-row flex-col md:items-center md:gap-2"
                >
                  <div className="flex items-center gap-2">
                    <CgWebsite className="text-tertiary" />

                    <b>Plataforma:</b>
                  </div>

                  {platform}
                </p>
              )}
            </div>
          )}

          <div
            title={`Falta ${progressLegend}% até o fim da publicação da Oportunidade`}
            className="relative"
          >
            <div
              className={`rounded-full w-full h-2 overflow-hidden ${progressBackColor}`}
            >
              <div
                className={` h-2 transition-all duration-500 ${progressColor}`}
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="top-1/2 left-1/2 absolute font-semibold text-foreground/50 text-xs -translate-x-1/2 -translate-y-1/2">
              {progress}%
            </span>
          </div>

          <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 font-bold text-xs">
            <div
              title={`Criado em: ${formatDate(new Date(createdAt), { getHours: true, getMinutes: true })}`}
              className="flex flex-col gap-1 sm:text-left text-center"
            >
              <p className="flex justify-center sm:justify-start items-center gap-1">
                <FaCalendarAlt className="text-primary" />

                {deletedAt ? "Excluído em:" : "Criado em:"}
              </p>

              <span className="font-normal">
                {formatDate(new Date(deletedAt ?? createdAt), {
                  getHours: true,
                  getMinutes: true,
                })}
              </span>
            </div>

            <div
              title={`${new Date(deadline) < new Date() ? "Vencido em" : "Válido até"}: ${formatDate(new Date(deadline), { getHours: true, getMinutes: true })}`}
              className="flex flex-col gap-1 text-center sm:text-end"
            >
              <p className="flex justify-center sm:justify-end items-center gap-1">
                <FaCalendarAlt className="text-error" />

                {new Date(deadline) < new Date()
                  ? "Vencido em:"
                  : "Válido até:"}
              </p>

              <span className="font-normal">
                {formatDate(new Date(deadline), {
                  getHours: true,
                  getMinutes: true,
                })}
              </span>
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
            onClick={() => {
              handleDeactivateOpportunity(id).finally(() => setOpen(false));
            }}
            className="hover:bg-gray-3/50 active:bg-gray-3/20 px-4 py-2 border-1 rounded font-bold text-xs transition-all duration-300 cursor-pointer"
          >
            {`Desativar ${title}`}
          </button>

          <button
            type="button"
            title="Cancelar"
            onClick={() => setOpen(false)}
            className="bg-[var(--tertiary)] hover:bg-[var(--primary)] active:bg-[var(--primary)]/70 px-4 py-2 rounded font-bold text-light text-xs transition-all duration-300 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </FixedModal>
    </>
  );
};

export default Opportunity;
