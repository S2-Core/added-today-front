import * as yup from "yup";

import { IRecovery } from "@/contexts/auth/interfaces";

const recoverySchema = yup.object({
  recoveryEmail: yup
    .string()
    .email("Digite um email válido")
    .required('O "Email" é um campo obrigatório'),
}) as yup.ObjectSchema<IRecovery>;

export default recoverySchema;
