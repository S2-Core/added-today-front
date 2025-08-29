"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";

import UserBubble from "../userBubble";

import { formatDate } from "@/utils/date.utils";
import { captalize } from "@/utils/string.utils";
import { formatPhoneNumber } from "@/utils/number.utils";
import FixedModal from "../fixedModal";

import { MentalStatus, mentalStatusItems } from "@/constants/mentals";
import { UserRole } from "@/constants/users";
import { useAuth } from "@/contexts";

interface IProps {
  id: string;
  link: string;
  title?: string;
  image?: string | null;
  properties?: string[];
  defaultImage?: string;
  status?: MentalStatus;
  isRegistered?: boolean;
  info?: { key: string; value: string | Date; alias: string }[];
  isActive: boolean;
  deactivate: (id: string) => Promise<void>;
  restore: (id: string) => Promise<void>;
}

const Card = ({
  id,
  link,
  title,
  image,
  properties,
  defaultImage,
  status,
  isRegistered,
  isActive,
  info,
  deactivate,
  restore,
}: IProps) => {
  const username = info?.find(({ key }) => key === "name")?.value as
    | string
    | undefined;

  const { loggedUser } = useAuth();

  const isAdmin = loggedUser && loggedUser.role === UserRole.ADMIN;

  const [deactivateModal, setDeactivateModal] = useState(false);
  const [restoreModal, setRestoreModal] = useState(false);

  return (
    <>
      <Link
        href={!isActive || !isAdmin ? "" : link}
        title={
          isActive && isAdmin
            ? `Editar ${username ?? title}`
            : `${username ?? title}${isActive ? "" : " ( Inativo )"}`
        }
        onClick={(e) => {
          if (!isActive || !isAdmin) e.preventDefault();
        }}
        tabIndex={-1}
        className={`relative flex flex-col items-center gap-5 justify-between w-full rounded p-3 shadow-xl/30 select-none overflow-hidden border-1 ${status ? "pt-6" : ""} ${isActive ? `${isAdmin ? "cursor-pointer" : "cursor-default"} ${isRegistered ? "bg-success/30 border-success/30" : "bg-background border-gray-5"} ` : "cursor-default bg-gray-3 border-gray-3 "} `}
      >
        {status && isActive && (
          <div
            title={`Status ( ${mentalStatusItems.find(({ value }) => value === status)?.label ?? "Indefinido"} )`}
            style={{
              backgroundColor:
                status === MentalStatus.DRAFT
                  ? "var(--warning)"
                  : status === MentalStatus.PUBLISHED
                    ? "var(--success)"
                    : "var(--error)",
            }}
            className={`top-2 right-2 absolute shadow-md rounded-full w-2 h-2 ${status === MentalStatus.DRAFT ? "animate-pulse" : ""}`}
          />
        )}

        <div className={`flex flex-col w-full ${username ? "" : "gap-5"}`}>
          <figure className="relative p-8 rounded w-full aspect-square overflow-hidden">
            {username && (
              <UserBubble
                isActive={isActive}
                username={username}
                className="xs:text-3xl sm:text-4xl text-5xl lg:text-5xl"
              />
            )}

            {image !== undefined && (
              <Image
                src={!image || image.trim() === "" ? defaultImage! : image}
                alt={`${title} Image`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-cover object-center ${!isActive ? "grayscale" : ""}`}
              />
            )}

            <figcaption className="hidden">{`${username ?? title} Image`}</figcaption>
          </figure>

          {properties && properties.length && (
            <ul className="gap-2 grid grid-cols-1 md:grid-cols-2">
              {properties?.map((property, i) => (
                <li
                  key={`${property}-${i}-${id}`}
                  title={property}
                  className={`py-3 flex md:p-2 overflow-hidden rounded text-center justify-center h-fit ${property.includes('"') ? "italic" : ""} ${isActive ? "bg-gray-2" : "bg-transparent border-1 border-gray-5"}`}
                >
                  <span className="w-full md:text-[10px] text-sm">
                    {property}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {info && info.length && (
            <ul className="flex flex-col gap-2">
              {info.map(({ alias, key, value }, i) => (
                <li
                  key={`${key}-${alias}-${value}-${i}`}
                  className="flex items-center rounded-xl"
                >
                  <p
                    title={
                      value instanceof Date
                        ? formatDate(value as Date)
                        : key === "name"
                          ? value.split(" ").slice(0, 2).join(" ")
                          : key === "role"
                            ? captalize(value.toLowerCase())
                            : key === "phone"
                              ? formatPhoneNumber(value)
                              : value
                    }
                    className="overflow-hidden text-xs text-ellipsis whitespace-nowrap"
                  >
                    <span className="font-bold">{alias}:</span>

                    {` ${value instanceof Date ? formatDate(value as Date) : key === "name" ? value.split(" ").slice(0, 2).join(" ") : key === "role" ? captalize(value.toLowerCase()) : key === "phone" ? formatPhoneNumber(value) : value}`}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {loggedUser && loggedUser.role === UserRole.ADMIN && (
          <div className="flex justify-center items-center gap-2 w-full">
            <button
              type="button"
              tabIndex={-1}
              title={
                isActive
                  ? `Editar ${username ?? title}`
                  : `Reativar ${username ?? title}`
              }
              onClick={(e) => {
                if (!isActive) {
                  e.preventDefault();

                  setRestoreModal(true);
                }
              }}
              className={`px-4 py-1.5 border-1 rounded w-full h-full overflow-hidden md:text-[10px] text-xs text-ellipsis whitespace-nowrap transition-all duration-300 cursor-pointer ${isActive ? "hover:border-primary hover:bg-primary/5 active:border-primary/50 hover:text-primary active:text-primary/50 text-foreground" : "hover:border-foreground hover:bg-gray-4 border-gray-5 text-gray-7 hover:text-foreground active:text-foreground/50 active:border-foreground/50"}`}
            >
              {isActive
                ? `Editar ${username ? "" : title}`
                : `Reativar ${username ? "" : title}`}
            </button>

            {isActive && (
              <button
                type="button"
                title={`Desativar ${username ?? title}`}
                onClick={(e) => {
                  e.preventDefault();

                  setDeactivateModal(true);
                }}
                tabIndex={-1}
                className="hover:bg-primary/5 p-1 rounded text-foreground hover:text-primary active:text-primary/50 transition-all duration-300 cursor-pointer"
              >
                <IoTrashOutline
                  className={`text-xl ${!isActive ? "text-error" : ""}`}
                />
              </button>
            )}
          </div>
        )}
      </Link>

      <FixedModal
        isOpen={deactivateModal}
        size="35rem"
        close={() => setDeactivateModal(false)}
        className="flex flex-col gap-10"
      >
        <p className="text-sm text-justify">
          {"Deseja realmente "}
          <span className="font-bold text-error">{"DESATIVAR "}</span>
          <span className="font-bold text-primary">
            {`"${username ?? title}"`}
          </span>
          {
            "? Caso sim, não poderá alterar os dados desse item, porém ainda será possível "
          }
          <span className="font-bold text-tertiary">{"REATIVÁ-LO"}</span>.
        </p>

        <div className="flex md:flex-row flex-col justify-center gap-5">
          <button
            type="button"
            title={`Desativar ${username ?? title}`}
            tabIndex={-1}
            onClick={async () => {
              if (isActive) {
                await deactivate(id);

                setDeactivateModal(false);
              }
            }}
            className="hover:bg-gray-3/50 active:bg-gray-3/20 px-4 py-2 border-1 rounded md:max-w-60 overflow-hidden font-bold text-xs text-ellipsis whitespace-nowrap transition-all duration-300 cursor-pointer"
          >
            {`Desativar ${username ?? title}`}
          </button>

          <button
            type="button"
            title="Cancelar"
            tabIndex={-1}
            onClick={() => setDeactivateModal(false)}
            className="bg-tertiary hover:bg-primary active:bg-primary/70 px-4 py-2 rounded font-bold text-light text-xs transition-all duration-300 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </FixedModal>

      <FixedModal
        isOpen={restoreModal}
        size="20rem"
        close={() => setRestoreModal(false)}
        className="gap-10"
      >
        <p className="text-sm text-justify">
          {"Deseja realmente "}
          <span className="font-bold text-tertiary">{"REATIVAR "}</span>
          <span className="font-bold text-primary">{`"${username ?? title}"`}</span>
          ?
        </p>

        <div className="flex md:flex-row flex-col justify-center gap-5">
          <button
            type="button"
            title={`Reativar ${username ?? title}`}
            tabIndex={-1}
            onClick={async () => {
              if (!isActive) {
                await restore(id);

                setRestoreModal(false);
              }
            }}
            className="hover:bg-gray-3/50 active:bg-gray-3/20 px-4 py-2 border-1 rounded md:max-w-60 overflow-hidden font-bold text-xs text-ellipsis whitespace-nowrap transition-all duration-300 cursor-pointer"
          >
            {`Reativar ${username ?? title}`}
          </button>

          <button
            type="button"
            title="Cancelar"
            tabIndex={-1}
            onClick={() => setRestoreModal(false)}
            className="bg-tertiary hover:bg-primary active:bg-primary/70 px-4 py-2 rounded font-bold text-light text-xs transition-all duration-300 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </FixedModal>
    </>
  );
};

export default Card;
