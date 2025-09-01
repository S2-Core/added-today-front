"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbArrowBackUp } from "react-icons/tb";

import { useUsers } from "@/contexts";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";
import Select from "@/components/select";

import updateUserSchema from "@/validators/users/update.validator";

import { userRoleItems } from "@/constants/users";

import { safeCast } from "@/types";

import { IUpdateUser, IUser } from "@/contexts/users/interfaces";
import toast from "react-hot-toast";
import { formatPhoneNumber } from "@/utils/number.utils";

const EditUser = () => {
  const { id } = useParams();

  const { users, handleUpdateUser } = useUsers();

  const [user, setUser] = useState<IUser | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Partial<IUpdateUser>>({
    mode: "onChange",
    resolver: yupResolver(updateUserSchema),
  });

  useEffect(() => {
    if (users) {
      const foundedUser = users.find((user) => user.id === id);

      if (foundedUser) setUser(foundedUser);
    }
  }, [users]);

  useEffect(() => {
    handleInitialValues();
  }, [user]);

  const handleInitialValues = () => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", formatPhoneNumber(user.phone));
      setValue("role", user.role);
      setValue("password", "");
      setValue("confirmPassword", "");
    }
  };

  const handleUpdate = async ({
    confirmPassword,
    ...data
  }: Partial<IUpdateUser>) => {
    if (data.password !== confirmPassword) {
      toast.error("As senhas devem ser iguais!", { id: "update-user" });

      return;
    }

    data.phone = data.phone!.replace(/\D/g, "");

    if (user) {
      const filteredData = { ...data };

      Object.entries(filteredData).forEach(([key, value]) => {
        const typedKey = key as keyof IUpdateUser;

        if (value === safeCast<IUpdateUser>(user)[typedKey]) {
          delete safeCast<IUpdateUser>(filteredData)[typedKey];
        }

        if (typedKey === "password" && value === "") {
          delete filteredData[typedKey];
        }
      });

      await handleUpdateUser(filteredData, user.id);
    }
  };

  if (!user) return null;

  return (
    <Container Tag="main" className="gap-10 grid grid-cols-1 mt-15">
      <Link
        href="/users"
        title="Voltar para o gerenciamento de Usuários"
        tabIndex={-1}
        className="top-5 left-5 z-9 fixed p-2 rounded-full text-foreground hover:text-tertiary active:text-primary text-4xl transition-all duration-300 cursor-pointer"
      >
        <TbArrowBackUp />
      </Link>

      <Form
        onSubmit={handleSubmit(handleUpdate)}
        className="flex flex-col md:gap-10"
      >
        <div className="items-center gap-5 grid md:grid-cols-3">
          <Input
            name="name"
            label="Nome do Usuário"
            placeholder="Digite o nome do Usuário"
            register={register}
            errors={errors}
          />

          <Input
            name="email"
            label="Email"
            placeholder="Digite o email do Usuário"
            register={register}
            errors={errors}
          />

          <Input
            name="phone"
            label="Telefone"
            placeholder="Digite o telefone do Usuário"
            type="tel"
            register={register}
            errors={errors}
          />

          <Input
            name="password"
            label="Senha"
            placeholder="Digite a senha do Usuário"
            type="password"
            register={register}
            errors={errors}
          />

          <Input
            name="confirmPassword"
            label="Confirmar senha"
            placeholder="Digite a senha do Usuário"
            type="password"
            hide={false}
            register={register}
            errors={errors}
          />

          <Select
            name="role"
            items={userRoleItems}
            label="Digite o cargo do Usuário"
            register={register}
            control={control}
            errors={errors}
          />
        </div>

        <div className="flex md:flex-row flex-col md:justify-end gap-5 w-full">
          <button
            type="submit"
            title="Salvar edição"
            tabIndex={-1}
            disabled={!!Object.keys(errors).length}
            className="bg-tertiary hover:bg-primary active:bg-primary/70 disabled:bg-error disabled:opacity-50 mt-5 px-7 py-2 rounded w-full md:w-fit text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
          >
            Salvar edição
          </button>

          <button
            type="button"
            title="Cancelar alterações"
            tabIndex={-1}
            onClick={handleInitialValues}
            className="hover:bg-gray-3 active:bg-gray-3/50 mt-5 px-7 py-2 border-1 rounded w-full md:w-fit text-foreground transition-all duration-300 cursor-pointer"
          >
            Cancelar alterações
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default EditUser;
