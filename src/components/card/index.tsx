"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";

import { formatDate } from "@/utils/date.utils";
import { shortUsername } from "@/utils/string.utls";
import { strToColor } from "@/utils/color.utils";

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
      title={isActive ? `Editar ${username ?? title}` : (username ?? title)}
      onClick={(e) => {
        if (!isActive) e.preventDefault();
      }}
      tabIndex={-1}
      className={`flex flex-col items-center gap-5 justify-between w-full bg-gray-2 rounded-md p-3 shadow-xl/30 select-none overflow-hidden ${isActive ? "cursor-pointer" : "cursor-default"}`}
    >
      <div className={`flex flex-col w-full ${username ? "" : "gap-5"}`}>
        <figure className="relative w-full overflow-hidden rounded-md aspect-square p-8">
          {username && (
            <div
              className="w-full h-full rounded-full flex items-center justify-center bg-gray-3 font-bold text-5xl sm:text-2xl lg:text-5xl text-light"
              style={{ backgroundColor: strToColor(username) }}
            >
              {shortUsername(username)}
            </div>
          )}

          {image && (
            <Image
              src={image}
              alt={`${title} Image`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover object-center${!isActive ? " grayscale" : ""}`}
            />
          )}

          <figcaption className="hidden">{`${username ?? title} Image`}</figcaption>
        </figure>

        {properties && properties.length && (
          <ul className="grid grid-cols-2 gap-2">
            {properties?.map((property, i) => (
              <li
                key={`${property}-${i}`}
                className={`${property.includes('"') ? "italic" : ""} py-1 px-4 overflow-hidden bg-gray-1 rounded-xl flex items-center text-center`}
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
                className=" rounded-xl flex items-center"
              >
                <p className="text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                  <span className="font-bold">{alias}:</span>

                  {` ${value instanceof Date ? formatDate(value as Date) : key === "name" ? value.split(" ").slice(0, 2).join(" ") : value}`}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-2 w-full justify-center">
        <button
          type="button"
          tabIndex={-1}
          title={
            isActive
              ? `Editar ${username ?? title}`
              : `Reativar ${username ?? title}`
          }
          className="w-full h-full px-4 border-1 text-xs hover:text-secondary hover:border-secondary active:text-primary active:border-primary border-light text-light rounded-md cursor-pointer transition-all duration-300"
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
          className="p-1 hover:bg-gray-3 cursor-pointer transition-all duration-300 rounded-md"
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
