"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";

import { useAuth, useOpportunities } from "@/contexts";

import Container from "@/components/container";
import Tabs, { Tab } from "@/components/tabs";
import Register from "@/components/register";
import EmptyList from "@/components/emptyList";
import Loading from "@/components/loading";
import Opportunity from "@/components/opportunity";
import Filters from "@/components/filters";
import FixedModal from "@/components/fixedModal";

import createOpportunitySchema from "@/validators/opportunities/create.validator";

import { decriptValue, encriptValue } from "@/utils/encryption.utils";

import {
  createInputs,
  createSelects,
  createTagsInputs,
} from "@/constants/opportunities";

import { safeCast } from "@/types";

import { ICreateOpportunity } from "@/contexts/opportunities/interfaces";

const Client = () => {
  const { tab, setTab, handleCreateOpportunity, opportunities } =
    useOpportunities();

  const { loggedUser } = useAuth();

  const isAdmin = loggedUser && loggedUser.role === "ADMIN";

  const [open, setOpen] = useState(false);

  const createForm = useForm<ICreateOpportunity>({
    mode: "onChange",
    resolver: yupResolver(createOpportunitySchema),
  });

  useEffect(() => {
    const modalWasClosed = Boolean(
      decriptValue(Cookies.get("opportunitiesModal") ?? "")
    );

    if (!modalWasClosed) setOpen(true);
  }, []);

  const handleCreate = async ({
    deadline,
    compensationMin,
    compensationMax,
    ...data
  }: ICreateOpportunity): Promise<void> => {
    const formattedDeadline = (deadline as Date).toISOString();
    const formattedCompensationMin =
      compensationMin !== undefined && compensationMin !== null
        ? Number(compensationMin)
        : null;
    const formattedCompensationMax =
      compensationMax !== undefined && compensationMax !== null
        ? Number(compensationMax)
        : null;

    const formattedData = {
      ...data,
      deadline: formattedDeadline,
      compensationMin: formattedCompensationMin,
      compensationMax: formattedCompensationMax,
    };

    const filteredData = safeCast<ICreateOpportunity>(
      Object.fromEntries(
        Object.entries(formattedData).filter(
          ([_, value]) => value !== null && value !== ""
        )
      )
    );

    await handleCreateOpportunity(filteredData).then(() => {
      createForm.reset();
    });
  };

  return (
    <>
      <Container Tag="main">
        {isAdmin ? (
          <Tabs setTab={setTab} tab={tab}>
            <Tab name="manageOpportunities" label="Gerenciar Oportunidades">
              <div className="flex flex-col gap-10">
                <Filters />

                <ul className="flex flex-col gap-5 w-full">
                  {opportunities ? (
                    !!opportunities.length ? (
                      opportunities.map((opportunity) => (
                        <Opportunity
                          key={opportunity.id}
                          opportunity={opportunity}
                        />
                      ))
                    ) : (
                      <EmptyList />
                    )
                  ) : (
                    <Loading />
                  )}
                </ul>
              </div>
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
          <div className="flex flex-col gap-5">
            <Filters />

            <ul className="flex flex-col gap-5 w-full">
              {opportunities ? (
                !!opportunities.length ? (
                  opportunities.map((opportunity) => (
                    <Opportunity
                      key={opportunity.id}
                      opportunity={opportunity}
                    />
                  ))
                ) : (
                  <EmptyList />
                )
              ) : (
                <Loading />
              )}
            </ul>
          </div>
        )}
      </Container>

      <FixedModal
        isOpen={open}
        close={() => {
          setOpen(false);

          Cookies.set("opportunitiesModal", encriptValue("true"));
        }}
        size="43rem"
        className="pt-5 pb-10"
      >
        <div className="flex flex-col gap-10">
          <h1 className="font-bold text-foreground text-3xl text-center">
            Campanhas no seu radar, em tempo real
          </h1>

          <p className="mx-auto max-w-2xl text-foreground text-center">
            Descubra e compare campanhas abertas nas principais plataformas de
            influência. É como um “Google Flights” da influência: você encontra
            a marca certa, no momento certo.
          </p>
        </div>

        <></>
      </FixedModal>
    </>
  );
};

export default Client;
