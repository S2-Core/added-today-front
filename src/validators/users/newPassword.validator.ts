import * as yup from "yup";

import { INewPassowrd } from "@/contexts/auth/interfaces";

const newPasswordSchema = yup.object({
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
}) as yup.ObjectSchema<INewPassowrd>;

export default newPasswordSchema;
