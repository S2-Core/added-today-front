"use client";

import { useContext } from "react";

import { UsersContext } from "@/contexts/users";

import UserBubble from "../userBubble";

import { formatPhoneNumber } from "@/utils/number.utils";
import { deepEqual } from "@/utils/objects.utils";

import { IFormUser } from "@/contexts/users/interfaces";
import { captalize } from "@/utils/string.utils";

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

  const {
    setFormUsersModal,
    setFormUserToCreate,
    users,
    handleRemoveUserFromList,
    selectedUsersToCreate,
    setSelectedUsersToCreate,
  } = useContext(UsersContext);

  const isSelected = selectedUsersToCreate?.find((selectedUser) =>
    deepEqual(selectedUser, user)
  );

  const createdUser = users.find(
    (user) => user.name === name && user.email === email && user.phone === phone
  );

  const handleCreateUser = () => {
    if (isSelected) {
      setSelectedUsersToCreate(
        selectedUsersToCreate!.filter(
          (selectedUser) => !deepEqual(selectedUser, user)
        )
      );

      return;
    }

    if (createdUser) {
      handleRemoveUserFromList(true, user);

      return;
    }

    setFormUserToCreate(user);
    setFormUsersModal(true);
  };

  return (
    <li
      title={
        createdUser
          ? `Remover usuário CRIADO "${name}"${createdUser.deletedAt ? " ( Desativado )" : ""} da lista`
          : isSelected
            ? `Remover seleção do usuário "${name}"`
            : `Criar usuário "${name}"`
      }
      onClick={handleCreateUser}
      className="flex cursor-pointer"
    >
      {createdUser && (
        <div
          style={{
            backgroundColor: createdUser.deletedAt
              ? "var(--error)"
              : "var(--success)",
          }}
          className="z-9 rounded-l-md w-2 h-17"
        />
      )}

      <div
        className={`items-center gap-4 grid grid-cols-[auto_1fr] bg-gray-2 p-3 px-4 border-2 rounded-md w-full ${createdUser ? "text-gray-5 border-l-0 rounded-l-none" : "text-light"} ${isSelected ? "border-tertiary" : "border-gray-3"}`}
      >
        <figure className="w-10 h-10">
          <UserBubble username={name} isActive={!createdUser} />
          <figcaption className="hidden">Imagem do usuário {name}</figcaption>
        </figure>

        <div className="justify-end items-start grid xs:grid-cols-2 sm:grid-cols-[150px_1fr] w-full">
          <p className="self-center xs:pr-5 overflow-hidden font-bold text-sm text-ellipsis whitespace-nowrap">
            <span title={name}>{captalize(name, true)}</span>
          </p>

          <div className="items-center gap-1 grid grid-cols-1 sm:grid-cols-2">
            <p className="hidden xs:block xs:pr-2 overflow-hidden text-[10px] sm:text-xs text-ellipsis whitespace-nowrap">
              <span className="font-bold">Email:</span>

              <span title={email}> {email}</span>
            </p>

            <p className="hidden xs:block overflow-hidden text-[10px] sm:text-xs text-ellipsis whitespace-nowrap">
              <span className="font-bold">Telefone:</span>

              <span title={phone}> {formatPhoneNumber(phone)}</span>
            </p>

            <p className="hidden sm:block xs:pr-2 overflow-hidden text-xs text-ellipsis whitespace-nowrap">
              <span className="font-bold">Instagram:</span>

              <span title={instagram}> {instagram}</span>
            </p>

            <p className="hidden sm:block overflow-hidden text-xs text-ellipsis whitespace-nowrap">
              <span className="font-bold">Tiktok:</span>

              <span title={tiktok}> {tiktok}</span>
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default UserLine;
