"use client";

import Image from "next/image";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "@/contexts/auth";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";

import loginSchema from "@/validators/users/login.validator";

import { ILogin } from "@/contexts/auth/interfaces";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  return (
    <Container
      Tag={"main"}
      className="flex flex-col justify-center items-center gap-20 h-screen"
    >
      <figure className="relative mx-auto w-full max-w-100 h-30 overflow-hidden">
        <Image
          src="/images/logo.png"
          alt="Logo"
          fill
          className="mx-auto object-cover"
        />
        <figcaption className="hidden w-full">Logo</figcaption>
      </figure>

      <Form
        onSubmit={handleSubmit((data) => handleLogin(data, reset))}
        className="flex flex-col justify-center items-center gap-10"
      >
        <div className="flex flex-col gap-1 w-full sm:w-100">
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
          className="bg-primary hover:bg-primary/50 disabled:bg-secondary disabled:opacity-50 px-10 py-2 rounded-md w-full sm:w-fit text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
        >
          Fazer login
        </button>
      </Form>
    </Container>
  );
};

export default Login;
