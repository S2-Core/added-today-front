"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface IProps {
  children?: ReactNode;
  link: string;
  title: string;
  image: string;
  properties: string[];
  active?: boolean;
}

const Card = ({
  children,
  link,
  title,
  image,
  properties,
  active = true,
}: IProps) => {
  return (
    <Link
      href={link}
      title={`Editar ${title}`}
      className="flex flex-col items-center gap-10 justify-between w-full bg-gray-2 rounded-md p-3 cursor-pointer shadow-xl/30"
    >
      <div className="flex flex-col gap-2 w-full">
        <figure className="relative w-full overflow-hidden rounded-md aspect-square">
          <Image
            src={image}
            alt={`${title} Image`}
            fill
            className="object-cover object-center"
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

      <button className="w-full md:w-fit py-2 px-5 border-4 border-light text-light rounded-md hover:border-secondary hover:text-secondary cursor-pointer transition-all duration-300">
        Editar {title}
      </button>

      {children}
    </Link>
  );
};

export default Card;
