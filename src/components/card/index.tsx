"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";

interface IProps {
  children?: ReactNode;
  link: string;
  title: string;
  image: string;
  properties: string[];
  isActive: boolean;
}

const Card = ({
  children,
  link,
  title,
  image,
  properties,
  isActive,
}: IProps) => {
  return (
    <Link
      href={!isActive ? "" : link}
      title={isActive ? `Editar ${title}` : title}
      onClick={(e) => {
        if (!isActive) e.preventDefault();
      }}
      tabIndex={-1}
      className={`relative flex flex-col items-center gap-10 justify-between w-full bg-gray-2 rounded-md p-3 pt-10 ${isActive ? "cursor-pointer" : "cursor-default"} shadow-xl/30 select-none overflow-hidden`}
    >
      <button
        title={isActive ? `Desativar ${title}` : `Excluir ${title}`}
        onClick={(e) => {
          e.preventDefault();
        }}
        tabIndex={-1}
        className="absolute top-[3px] right-[3px] p-[5px] hover:bg-gray-3 cursor-pointer transition-all duration-300 rounded-md"
      >
        <IoTrashOutline className="text-xl" />
      </button>

      <div className="flex flex-col gap-2 w-full">
        <figure className="relative w-full overflow-hidden rounded-md aspect-square">
          <Image
            src={image}
            alt={`${title} Image`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover object-center${!isActive ? " grayscale" : ""}`}
          />

          <figcaption className="hidden">{`${title} Image`}</figcaption>
        </figure>

        <ol className="grid grid-cols-2 gap-2">
          {properties.map((property, i) => (
            <li
              key={`${property}-${i}`}
              className={`${property.includes('"') ? "italic" : ""} py-1 px-4 overflow-hidden bg-gray-1 rounded-xl flex items-center text-center`}
            >
              <span className="text-sm">{property}</span>
            </li>
          ))}
        </ol>
      </div>

      <button
        tabIndex={-1}
        className="w-full md:w-fit py-2 px-5 border-4  hover:text-secondary hover:border-secondary border-light text-light rounded-md cursor-pointer transition-all duration-300"
      >
        {isActive ? `Editar ${title}` : `Reativar ${title}`}
      </button>

      {children}
    </Link>
  );
};

export default Card;
