"use client";

import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";

import { UsersContext } from "@/contexts/users";

import { users } from "@/mocks/users.mock";

import Container from "@/components/container";
import Card from "@/components/card";
import Tabs, { Tab } from "@/components/tabs";
import InputDocs from "@/components/inputDocs";

const Users = () => {
  const [tab, setTab] = useState("userForm");

  const { usersFile, removeFile, formUsers } = useContext(UsersContext);

  return (
    <Container Tag={"main"}>
      <Tabs setTab={setTab} tab={tab}>
        <Tab label="Gerenciar Usuários" name="manageUsers">
          <ul className="gap-5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
          <div className="flex flex-col gap-2 w-full max-w-140 h-full select-none">
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
                  onClick={removeFile}
                  tabIndex={-1}
                  className="flex hover:bg-gray-3 p-1 rounded-full w-fit h-fit font-bold text-red-500 text-lg/none cursor-pointer"
                >
                  <IoClose />
                </button>
              )}
            </div>

            {formUsers && formUsers.length ? (
              <ul>
                {formUsers.map(({ name }, i) => (
                  <li key={i} className="font-medium text-light text-sm">
                    {name}
                  </li>
                ))}
              </ul>
            ) : (
              <InputDocs id="input-docs" />
            )}
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Users;
