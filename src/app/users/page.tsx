"use client";

import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { UsersContext } from "@/contexts/users";

import Container from "@/components/container";
import Card from "@/components/card";
import Tabs, { Tab } from "@/components/tabs";
import InputDocs from "@/components/inputDocs";
import UserLine from "@/components/userLine";
import FixedModal from "@/components/fixedModal";
import Loading from "@/components/loading";
import EmptyList from "@/components/emptyList";
import Register from "@/components/register";

import { createInputs, createSelects, UserRole } from "@/constants/users";

import { captalize } from "@/utils/string.utils";

import createUserSchema from "@/validators/users/create.validator";

import { ICreateUser } from "@/contexts/users/interfaces";

const Users = () => {
  const {
    usersFile,
    handleRemoveFile,
    formUsers,
    formUsersModal,
    setFormUsersModal,
    setFormUserToCreate,
    formUserToCreate,
    handleCreateUser,
    handleRemoveUserFromList,
    usersToManage,
    handleDeactivateUser,
    handleRestoreUser,
    setTab,
    tab,
  } = useContext(UsersContext);

  const createForm = useForm<ICreateUser>({
    mode: "onChange",
    resolver: yupResolver(createUserSchema),
  });

  const handleAddUser = () => {
    if (formUserToCreate) {
      const { nome, email, telefone } = formUserToCreate;

      const formatedUser: ICreateUser = {
        email,
        name: nome,
        phone: telefone,
        role: UserRole.INFLUENCER,
      };

      handleCreateUser(formatedUser).finally(() => {
        handleRemoveUserFromList();
        setFormUsersModal(false);
        setFormUserToCreate(null);
      });
    }
  };

  const handleCreate = async ({ confirmPassword, ...data }: ICreateUser) => {
    if (confirmPassword !== data.password) {
      toast.error("As senhas devem ser iguais!", { id: "register-user" });

      return;
    }

    await handleCreateUser(data).finally(() => createForm.reset());
  };

  return (
    <>
      <Container Tag={"main"}>
        <Tabs setTab={setTab} tab={tab} id="users">
          <Tab label="Gerenciar Usuários" name="manageUsers">
            {usersToManage ? (
              !!usersToManage.length ? (
                <ul className="gap-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {usersToManage.map(({ id, slug, isActive, info }) => (
                    <Card
                      id={id}
                      key={`${info.reduce((acc, { key }) => acc + key, "")}-${id}`}
                      info={info}
                      link={`/users/${slug}`}
                      isActive={isActive}
                      deactivate={handleDeactivateUser}
                      restore={handleRestoreUser}
                    />
                  ))}
                </ul>
              ) : (
                <EmptyList />
              )
            ) : (
              <Loading size={45} className="h-80" />
            )}
          </Tab>

          <Tab label="Criar Usuário" name="createUser">
            <Register<ICreateUser>
              createForm={createForm}
              inputs={createInputs}
              selects={createSelects}
              tab={tab}
              type="Usuário"
              handleCreate={handleCreate}
            />
          </Tab>

          <Tab
            label="Formulários de usuários"
            name="userForm"
            className="flex justify-center items-center"
          >
            <div className="flex flex-col gap-5 w-full max-w-xl h-full select-none">
              <div className="flex justify-between items-center h-5">
                <label
                  htmlFor={"input-docs"}
                  className="font-medium text-light text-sm"
                >
                  {usersFile
                    ? `[ Arquivo "${usersFile.name}" selecionado ]`
                    : "Selecione um arquivo de formulário:"}
                </label>

                {usersFile && (
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    title={`Remover arquivo "${usersFile.name}"`}
                    tabIndex={-1}
                    className="flex hover:bg-gray-3 p-1 rounded-full w-fit h-fit font-bold text-red-500 text-lg/none cursor-pointer"
                  >
                    <IoClose />
                  </button>
                )}
              </div>

              {formUsers ? (
                <ul className="flex flex-col gap-4">
                  {formUsers.map((user, i) => (
                    <UserLine key={i} user={user} />
                  ))}
                </ul>
              ) : (
                <InputDocs id="input-docs" />
              )}
            </div>
          </Tab>
        </Tabs>
      </Container>

      <FixedModal
        isOpen={formUsersModal}
        size="2xl"
        close={() => {
          setFormUsersModal(false);
          setFormUserToCreate(null);
        }}
      >
        {formUserToCreate && (
          <>
            <ul className="gap-5 grid grid-cols-1">
              {Object.entries(formUserToCreate).map(([key, value], i) => (
                <li
                  key={`${i}-${key}-${value}`}
                  className="px-5 py-2 border-2 border-gray-3 rounded-md text-md"
                >
                  <p className="text-justify">
                    <span className="font-bold underline">
                      {captalize(key)}
                    </span>

                    <span>: </span>

                    <span>{value === "" ? "N/A" : value}</span>
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex md:flex-row flex-col justify-center gap-5">
              <button
                type="button"
                title="Adicionar Usuário"
                tabIndex={-1}
                onClick={handleAddUser}
                className="bg-secondary hover:bg-primary active:bg-primary/50 px-4 py-2 rounded font-bold text-xs transition-all duration-300 cursor-pointer"
              >
                Adicionar Usuário
              </button>

              <button
                type="button"
                title="Remover Usuário da Lista"
                tabIndex={-1}
                className="hover:bg-gray-3/50 active:bg-gray-3/20 px-4 py-2 border-1 rounded font-bold text-xs transition-all duration-300 cursor-pointer"
                onClick={() => {
                  handleRemoveUserFromList();
                  setFormUsersModal(false);
                  setFormUserToCreate(null);
                }}
              >
                Remover Usuário da Lista
              </button>
            </div>
          </>
        )}
      </FixedModal>
    </>
  );
};

export default Users;
