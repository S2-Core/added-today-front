"use client";

import { useContext } from "react";

import { UsersContext } from "@/contexts/users";

import UserBubble from "../userBubble";

import { formatPhoneNumber } from "@/utils/number.utils";

import { IFormUser } from "@/contexts/users/interfaces";

interface IProps {
  user: IFormUser;
}

const UserLine = ({ user }: IProps) => {
  const {
    "👋 Qual o seu nome?": name,
    "📧 Seu e-mail (para avisarmos quando for ao ar!)": email,
    "📱 Seu número de celular (para acessar nossa plataforma de testes no WhatsApp)":
      phone,
    "🫵 Qual o seu @ no Instagram?": instagram,
    "🫰Qual o seu @ no TikTok?": tiktok,
  } = user;

  const { setFormUsersModal, setFormUserToCreate } = useContext(UsersContext);

  return (
    <li
      onClick={() => {
        setFormUsersModal(true);
        setFormUserToCreate(user);
      }}
      className="items-center gap-4 grid grid-cols-[auto_1fr] bg-gray-2 p-3 px-4 border-2 border-gray-3 rounded-md cursor-pointer"
    >
      <figure className="w-10 h-10">
        <UserBubble username={name} />
        <figcaption className="hidden">Imagem do usuário {name}</figcaption>
      </figure>

      <div className="justify-end items-start xs:gap-5 grid xs:grid-cols-2 sm:grid-cols-[150px_1fr] w-full">
        <p className="self-center font-bold text-sm">
          {name.split(" ").slice(0, 2).join(" ")}
        </p>

        <div className="items-center gap-1 grid grid-cols-1 sm:grid-cols-2">
          <p className="hidden xs:block text-[10px] sm:text-xs">
            <span className="font-bold">Email:</span> {email}
          </p>

          <p className="hidden xs:block text-[10px] sm:text-xs">
            <span className="font-bold">Telefone:</span>{" "}
            {formatPhoneNumber(phone)}
          </p>

          <p className="hidden sm:block text-xs">
            <span className="font-bold">Instagram:</span> {instagram}
          </p>

          <p className="hidden sm:block text-xs">
            <span className="font-bold">Tiktok:</span> {tiktok}
          </p>
        </div>
      </div>
    </li>
  );
};

export default UserLine;
