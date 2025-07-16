"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";

import UserBubble from "../userBubble";

import { formatDate } from "@/utils/date.utils";
import { captalize } from "@/utils/string.utls";
import { formatPhoneNumberFlexible } from "@/utils/number.utils";

interface IProps {
  children?: ReactNode;
  link: string;
  title?: string;
  image?: string;
  properties?: string[];
  info?: { key: string; value: string | Date; alias: string }[];
  isActive: boolean;
}

const Card = ({
  children,
  link,
  title,
  image,
  properties,
  isActive,
  info,
}: IProps) => {
  const username = info?.find(({ key }) => key === "name")?.value as
    | string
    | undefined;

  return (
    <Link
      href={!isActive ? "" : link}
      title={
        isActive
          ? `Editar ${username ?? title}`
          : `${username ?? title} ( Inativo )`
      }
      onClick={(e) => {
        if (!isActive) e.preventDefault();
      }}
      tabIndex={-1}
      className={`flex flex-col items-center gap-5 justify-between w-full bg-gray-3 rounded-md p-3 shadow-xl/30 select-none overflow-hidden ${isActive ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className={`flex flex-col w-full ${username ? "" : "gap-5"}`}>
        <figure className="relative p-8 rounded-md w-full aspect-square overflow-hidden">
          {username && <UserBubble isActive={isActive} username={username} />}

          {image && (
            <Image
              src={image}
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
          <ul className="gap-2 grid grid-cols-2">
            {properties?.map((property, i) => (
              <li
                key={`${property}-${i}`}
                className={`${property.includes('"') ? "italic" : ""} py-1 px-4 overflow-hidden bg-gray-2 rounded-xl flex items-center text-center`}
              >
                <span className="text-sm">{property}</span>
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
                <p className="overflow-hidden text-xs text-ellipsis whitespace-nowrap">
                  <span className="font-bold">{alias}:</span>

                  {` ${value instanceof Date ? formatDate(value as Date) : key === "name" ? value.split(" ").slice(0, 2).join(" ") : key === "role" ? captalize(value.toLowerCase()) : key === "phone" ? formatPhoneNumberFlexible(value) : value}`}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-center items-center gap-2 w-full">
        <button
          type="button"
          tabIndex={-1}
          title={
            isActive
              ? `Editar ${username ?? title}`
              : `Reativar ${username ?? title}`
          }
          className="px-4 border-1 hover:border-secondary active:border-primary border-light rounded-md w-full h-full text-light hover:text-secondary active:text-primary text-xs transition-all duration-300 cursor-pointer"
        >
          {isActive
            ? `Editar ${username ? "" : title}`
            : `Reativar ${username ? "" : title}`}
        </button>

        <button
          type="button"
          title={
            isActive
              ? `Desativar ${username ?? title}`
              : `Excluir ${username ?? title}`
          }
          onClick={(e) => {
            e.preventDefault();
          }}
          tabIndex={-1}
          className="hover:bg-gray-4 p-1 rounded-md transition-all duration-300 cursor-pointer"
        >
          <IoTrashOutline
            className={`text-xl ${!isActive ? "text-red-500" : ""}`}
          />
        </button>
      </div>

      {children}
    </Link>
  );
};

export default Card;
