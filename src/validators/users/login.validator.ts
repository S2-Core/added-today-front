import * as yup from "yup";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("O e-mail é um campo obrigatório"),

  password: yup.string().required("A senha é um campo obrigatória"),
});

export default loginSchema;
