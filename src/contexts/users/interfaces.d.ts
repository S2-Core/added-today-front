import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";

import { UserRole } from "@/constants/users";
import { MessageDirection } from "@/constants/chat";

export interface IFormUser {
  [key: string]: string;

  "👋 Qual o seu nome?": string;
  "📱 Seu número de celular (para acessar nossa plataforma de testes no WhatsApp)": string;
  "📧 Seu e-mail (para avisarmos quando for ao ar!)": string;
  "🫵 Qual o seu @ no Instagram?": string;
  "🫰Qual o seu @ no TikTok?": string;
  "Carimbo de data/hora": string;
  "🤳 Você cria conteúdo sobre o quê?": string;
  '"🤕 Hoje, qual a sua principal dor como criador?"': string;
  "🤑 Você pagaria por um serviço que RESOLVESSE seus problemas como criador?": string;
  '"💸 Caso tenha respondido sim, qual valor mensal parece justo para acesso completo?"': string;
  "🤔 O que você gostaria que este serviço oferecesse?": string;
  '"Caso queira receber produtos para teste, insira abaixo seu CEP (se for selecionado (a), entramos em contato e solicitamos o endereço completo 🤗)"': string;
  "Código de rastreio": string;
}

export interface IUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  deletedAt?: Date;
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

export interface IUsersProps {
  children: ReactNode;
}

export interface IUserMessage {
  id: string;
  message: string;
  direction: MessageDirection;
  date: Date;
}

export interface IUsersContext {
  formUsers: IFormUser[] | null;
  usersFile: File | null;
  handleRemoveFile: () => void;
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
  formUsersModal: boolean;
  setFormUsersModal: Dispatch<SetStateAction<boolean>>;
  formUserToCreate: IFormUser | null;
  setFormUserToCreate: Dispatch<SetStateAction<IFormUser | null>>;
  handleCreateUser: (
    data: ICreateUser | ICreateUser[],
    formUser?: boolean
  ) => Promise<void>;
  handleFindAllUsers: () => Promise<void>;
  users: IUser[];
  selectedUsersToCreate: IFormUser[] | null;
  setSelectedUsersToCreate: Dispatch<SetStateAction<IFormUser[] | null>>;
  handleRemoveUserFromList: (message?: boolean, formUser?: IFormUser) => void;
  usersToManage: IUserToManage[] | null;
  handleUpdateUser: (
    data: Partial<IUpdateUser>,
    userId: string
  ) => Promise<void>;
  handleDeactivateUser: (userId: string) => Promise<void>;
  handleRestoreUser: (userId: string) => Promise<void>;
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
}
