"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbArrowBackUp } from "react-icons/tb";

import { UsersContext } from "@/contexts/users";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";
import Select from "@/components/select";

import updateUserSchema from "@/validators/users/update.validator";

import { IUpdateUser, IUser } from "@/contexts/users/interfaces";

import { userRoleItems } from "@/constants/users";

const EditUser = () => {
  const { id } = useParams();

  const { users, handleUpdateUser } = useContext(UsersContext);

  const [user, setUser] = useState<IUser | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
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
      setValue("phone", user.phone);
    }
  };

  if (!user) return <></>;

  return (
    <Container Tag="main" className="gap-10 grid grid-cols-1 mt-15">
      <Link
        href="/users"
        title="Voltar para o gerenciamento de Usuários"
        tabIndex={-1}
        className="top-5 left-5 z-9 fixed hover:bg-gray-3 p-2 rounded-full text-light hover:text-secondary active:text-primary text-4xl transition-all duration-300 cursor-pointer"
      >
        <TbArrowBackUp />
      </Link>

      <Form
        onSubmit={handleSubmit((data) => handleUpdateUser(data, user.id))}
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
            register={register}
            errors={errors}
          />

          <Select
            name="role"
            items={userRoleItems}
            label="Digite o cargo do Usuário"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex md:flex-row flex-col md:justify-end gap-5 w-full">
          <button
            type="submit"
            tabIndex={-1}
            className="bg-secondary hover:bg-primary active:bg-primary/50 mt-5 px-7 py-2 rounded w-full md:w-fit text-light transition-all duration-300 cursor-pointer"
          >
            Salvar Edição
          </button>

          <button
            type="button"
            tabIndex={-1}
            onClick={handleInitialValues}
            className="hover:bg-gray-3 active:bg-gray-3/50 mt-5 px-7 py-2 border-1 rounded w-full md:w-fit text-light transition-all duration-300 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default EditUser;
