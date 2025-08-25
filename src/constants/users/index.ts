import { ICreateInput, ICreateSelects } from "@/components/register/interfaces";
import { IItems } from "@/components/select/interfaces";
import { ICreateUser } from "@/contexts/users/interfaces";

export enum UserRole {
  ADMIN = "ADMIN",
  INFLUENCER = "INFLUENCER",
  MEMBER = "MEMBER",
}

export const userRoleItems: IItems<UserRole>[] = [
  { value: UserRole.ADMIN, label: "Administrador" },
  { value: UserRole.INFLUENCER, label: "Influencer" },
  { value: UserRole.MEMBER, label: "Membro" },
];

export const createInputs: ICreateInput<ICreateUser>[] = [
  {
    name: "name",
    label: "Nome do Usuário",
    placeholder: "Digite o nome do Usuário",
    required: true,
  },
  {
    name: "email",
    label: "Email do Usuário",
    placeholder: "Digite o email do Usuário",
    required: true,
  },
  {
    name: "phone",
    label: "Telefone do Usuário",
    placeholder: "Digite o telefone do Usuário",
    type: "number",
    required: true,
  },
  {
    name: "password",
    label: "Senha",
    placeholder: "Digite a senha",
    type: "password",
    required: true,
  },
  {
    name: "confirmPassword",
    label: "Confirmar senha",
    placeholder: "Digite a confirmação de senha",
    type: "password",
    hide: false,
    required: true,
  },
];

export const createSelects: ICreateSelects<ICreateUser>[] = [
  {
    name: "role",
    label: "Cargo do Usuário",
    items: userRoleItems,
    required: true,
  },
];
