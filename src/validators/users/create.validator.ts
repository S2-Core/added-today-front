import { ICreateUser } from "@/contexts/users/interfaces";
import * as yup from "yup";

const createUserSchema = yup.object({
  name: yup.string().required('O "Nome do Usuário" é um campo obrigatório'),
  phone: yup
    .string()
    .required('O "Telefone do Usuário" é um campo obrigatório'),
  email: yup
    .string()
    .email("Digite um email válido")
    .required('O "Email do Usuário" é um campo obrigatório'),
  password: yup
    .string()
    .required('A "Senha" é um campo obrigatório')
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/\d/, "A senha deve conter pelo menos um número")
    .matches(
      /[@$!%*?&]/,
      "A senha deve conter pelo menos um caractere especial (@$!%*?&)"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("Confirmação de senha obrigatória"),
  role: yup.string().required('O "Cargo do Usuário" é um campo obrigatório'),
}) as yup.ObjectSchema<ICreateUser>;

export default createUserSchema;
