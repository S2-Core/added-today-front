"use client";

import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "@/contexts/Auth";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";

import loginSchema from "@/validators/users/login.validator";

import { ILogin } from "@/contexts/Auth/interfaces";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  return (
    <Container
      Tag={"main"}
      className="flex items-center justify-center h-screen"
    >
      <Form onSubmit={handleSubmit(handleLogin)}>
        <div className="flex flex-col gap-2 w-full sm:w-100">
          <Input
            name="email"
            label="Email"
            placeholder="Digite seu email"
            type="email"
            autoComplete="email"
            register={register}
            errors={errors}
          />

          <Input
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            type="password"
            autoComplete="current-password"
            register={register}
            errors={errors}
          />
        </div>

        <button
          type="submit"
          title="Fazer login"
          tabIndex={-1}
          disabled={Object.keys(errors).length > 0}
          className="w-full sm:w-fit py-2 px-10 bg-primary hover:bg-primary/50 transition-all duration-300 disabled:bg-secondary text-light rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Fazer login
        </button>
      </Form>
    </Container>
  );
};

export default Login;
