import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";

import { UserRole } from "@/constants/users";

import { IMeta } from "@/types";

export interface IFormUser {
  [key: string]: string;

  "Carimbo de data/hora": string;
  "🫵 Qual o seu @ no Instagram?": string;
  "🤳 Você cria conteúdo sobre o quê?": string;
  '"🤕 Hoje, qual a sua principal dor como criador?"': string;
  "🤑 Você pagaria por um serviço que RESOLVESSE seus problemas como criador?": string;
  '"💸 Caso tenha respondido sim, qual valor mensal parece justo para acesso completo?"': string;
  "🤔 O que você gostaria que este serviço oferecesse?": string;
  "📧 Seu e-mail (para liberarmos seu acesso)": string;
  "📱 Seu número de celular (para acessar nosso canal no WhatsApp - com ofertas para recebidos)": string;
  "🫰Qual o seu @ no TikTok?": string;
  '"Caso queira receber produtos para teste, insira abaixo seu CEP (se for selecionado (a), entramos em contato e solicitamos o endereço completo 🤗)"': string;
  "👋 Qual o seu nome?": string;
}

export interface IUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  createdAt: string;
  deletedAt: string | null;
  isRegistered: boolean;
  contentTopic: IFormUser;
  isFounder: boolean;
  termsAcceptedAt: string | null;
  instagramHandle: string;
  tiktokHandle: string | null;
  youtubeHandle: string | null;
}

export interface IUpdateUser {
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  password: string;
  confirmPassword?: string;
}

export interface IUserInfo {
  key: string;
  value: string | Date;
  alias: string;
}

export interface IUserToManage {
  id: string;
  slug: string;
  isActive: boolean;
  isRegistered: boolean;
  info: IUserInfo[];
}

export interface ICreateUser {
  name: string;
  phone: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  role: UserRole;
  description?: Record<string, string>;
}

export interface IProps {
  children: ReactNode;
}
export interface IUsersContext {
  formUsers: IFormUser[] | null;
  usersFile: File | null;
  handleRemoveFile: () => void;
  handleFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  formUsersModal: boolean;
  setFormUsersModal: Dispatch<SetStateAction<boolean>>;
  formUserToCreate: IFormUser | null;
  setFormUserToCreate: Dispatch<SetStateAction<IFormUser | null>>;
  handleCreateUser: (
    data: ICreateUser | ICreateUser[],
    formUser?: boolean,
  ) => Promise<void>;
  handleFindAllUsers: (page?: number) => Promise<void>;
  selectedUsersToCreate: IFormUser[] | null;
  setSelectedUsersToCreate: Dispatch<SetStateAction<IFormUser[] | null>>;
  handleRemoveUserFromList: (message?: boolean, formUser?: IFormUser) => void;
  users: IUser[] | null;
  usersToManage: IUserToManage[] | null;
  handleUpdateUser: (
    data: Partial<IUpdateUser>,
    userId: string,
  ) => Promise<void>;
  handleDeactivateUser: (userId: string) => Promise<void>;
  handleRestoreUser: (userId: string) => Promise<void>;
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  handleFindOneUser: (userId: string) => Promise<IUser | undefined>;
  usersMeta: IMeta | null;
}
