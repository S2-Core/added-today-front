import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";

import { UserRole } from "@/constants/users";

export interface IFormUser {
  nome: string;
  instagram: string;
  tiktok: string;
  conteúdo: string;
  CEP: string;
  "qual a sua principal dor como criador?": string;
  "você pagaria por um serviço que RESOLVESSE seus problemas como criador?": string;
  "o que você gostaria que essse serviço oferecesse?": string;
  email: string;
  telefone: string;
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
}

export interface IUsersProps {
  children: ReactNode;
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
  handleCreateUser: (data: ICreateUser) => Promise<void>;
  handleFindAllUsers: () => Promise<void>;
  users: IUser[];
  handleRemoveUserFromList: () => void;
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
