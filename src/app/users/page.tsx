"use client";

import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";

import { UsersContext } from "@/contexts/users";

import Container from "@/components/container";
import Card from "@/components/card";
import Tabs, { Tab } from "@/components/tabs";
import InputDocs from "@/components/inputDocs";
import UserLine from "@/components/userLine";
import FixedModal from "@/components/fixedModal";

import { users } from "@/mocks/users.mock";

import { captalize } from "@/utils/string.utls";

import { ICreateUser } from "@/contexts/users/interfaces";
import { UserRole } from "@/constants/users";

const Users = () => {
  const [tab, setTab] = useState("userForm");

  const {
    usersFile,
    handleRemoveFile,
    formUsers,
    formUsersModal,
    setFormUsersModal,
    setFormUserToCreate,
    formUserToCreate,
    handleCreateUser,
    handleFindAllUsers,
    handleRemoveUserFromList,
  } = useContext(UsersContext);

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
        handleFindAllUsers();
      });
    }
  };

  return (
    <>
      <Container Tag={"main"}>
        <Tabs setTab={setTab} tab={tab}>
          <Tab label="Gerenciar Usuários" name="manageUsers">
            <ul className="gap-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {users.map(({ id, slug, isActive, info }) => (
                <Card
                  key={`${info.reduce((acc, { key }) => acc + key, "")}-${id}`}
                  info={info}
                  link={`/users/${slug}`}
                  isActive={isActive}
                />
              ))}
            </ul>
          </Tab>

          <Tab label="Criar Usuário" name="createUser">
            <></>
          </Tab>

          <Tab
            label="Formulários de usuários"
            name="userForm"
            className="flex justify-center items-center h-70"
          >
            <div
              className={`flex flex-col ${"gap-5"} w-full max-w-140 h-full select-none`}
            >
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

              {formUsers && formUsers.length ? (
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
        size="140"
        close={() => {
          setFormUsersModal(false);
          setFormUserToCreate(null);
        }}
        className="flex flex-col gap-5 px-5 pb-5 max-h-180 overflow-x-hidden overflow-y-auto"
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
