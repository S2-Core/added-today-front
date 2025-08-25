"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth, useOpportunities } from "@/contexts";

import Container from "@/components/container";
import Tabs, { Tab } from "@/components/tabs";
import Register from "@/components/register";

import createOpportunitySchema from "@/validators/opportunities/create.validator";

import {
  createInputs,
  createSelects,
  createTagsInputs,
} from "@/constants/opportunities";

import { safeCast } from "@/types";

import { ICreateOpportunity } from "@/contexts/opportunities/interfaces";

const Client = () => {
  const { tab, setTab, handleCreateOpportunity } = useOpportunities();

  const { loggedUser } = useAuth();

  const isAdmin = loggedUser && loggedUser.role === "ADMIN";

  const createForm = useForm<ICreateOpportunity>({
    mode: "onChange",
    resolver: yupResolver(createOpportunitySchema),
  });

  const handleCreate = async ({
    deadline,
    compensationMin,
    compensationMax,
    ...data
  }: ICreateOpportunity): Promise<void> => {
    const formattedDeadline = (deadline as Date).toISOString();
    const formattedCompensationMin = Number(compensationMin) ?? null;
    const formattedCompensationMax = Number(compensationMax) ?? null;

    const formattedData = {
      ...data,
      deadline: formattedDeadline,
      formattedCompensationMin,
      formattedCompensationMax,
    };

    const filteredData = safeCast<ICreateOpportunity>(
      Object.fromEntries(
        Object.entries(formattedData).filter(([_, value]) => !!value)
      )
    );

    await handleCreateOpportunity(filteredData).then(() => {
      createForm.reset();
    });
  };

  return (
    <Container Tag="main">
      {isAdmin ? (
        <Tabs setTab={setTab} tab={tab}>
          <Tab name="manageOpportunities" label="Gerenciar Oportunidades">
            <></>
          </Tab>

          <Tab name="createOpportunities" label="Criar Oportunidade">
            <Register<ICreateOpportunity>
              createForm={createForm}
              tab={tab}
              inputs={createInputs}
              tagInputs={createTagsInputs}
              selects={createSelects}
              type="Oportunidade"
              handleCreate={handleCreate}
            />
          </Tab>
        </Tabs>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Client;
