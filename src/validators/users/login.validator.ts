import * as yup from "yup";

import { ILogin } from "@/contexts/auth/interfaces";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Digite um email válido")
    .required('O "Email" é um campo obrigatório'),
  password: yup.string().required('A "Senha" é um campo obrigatório'),
}) as yup.ObjectSchema<ILogin>;

export default loginSchema;
