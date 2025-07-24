import {
  ICreateInputs,
  ICreateSelects,
} from "@/components/register/interfaces";
import { IItems } from "@/components/select/interfaces";
import { ICreateUser } from "@/contexts/users/interfaces";

export enum UserRole {
  ADMIN = "ADMIN",
  INFLUENCER = "INFLUENCER",
  MEMBER = "MEMBER",
}

export const createInputs: ICreateInputs<ICreateUser>[] = [
  {
    name: "name",
    label: "Nome do Usuário",
    placeholder: "Digite o nome do Usuário",
  },
  {
    name: "email",
    label: "Email do Usuário",
    placeholder: "Digite o email do Usuário",
  },
  {
    name: "phone",
    label: "Telefone do Usuário",
    placeholder: "Digite o telefone do Usuário",
    type: "number",
  },
  {
    name: "password",
    label: "Senha",
    placeholder: "Digite a senha",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirmar senha",
    placeholder: "Digite a confirmação de senha",
    type: "password",
    hide: false,
  },
];

export const userRoleItems: IItems<UserRole>[] = [
  { value: UserRole.ADMIN, label: "Administrador" },
  { value: UserRole.INFLUENCER, label: "Influencer" },
  { value: UserRole.MEMBER, label: "Membro" },
];

export const createSelects: ICreateSelects<ICreateUser>[] = [
  {
    name: "role",
    label: "Cargo do Usuário",
    items: userRoleItems,
  },
];
