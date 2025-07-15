"use client";

import Form from "@/components/form";
import Input from "@/components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import loginSchema from "@/validators/users/login.validator";

import { ILogin } from "@/contexts/Auth/interfaces";
import Container from "@/components/container";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = (data: ILogin) => console.log(data);

  return (
    <Container
      Tag={"main"}
      className="flex items-center justify-center h-screen"
    >
      <Form onSubmit={handleSubmit(handleLogin)}>
        <Input
          name="email"
          label="Email"
          placeholder="Digite seu email"
          register={register}
          errors={errors}
        />

        <Input
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          register={register}
          errors={errors}
        />
      </Form>
    </Container>
  );
};

export default Login;
