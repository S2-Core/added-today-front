"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth, useOpportunities } from "@/contexts";

import Container from "@/components/container";
import Tabs, { Tab } from "@/components/tabs";
import Register from "@/components/register";
import EmptyList from "@/components/emptyList";
import Loading from "@/components/loading";
import Opportunity from "@/components/opportunity";
import Filters from "@/components/filters";

import createOpportunitySchema from "@/validators/opportunities/create.validator";

import {
  createInputs,
  createSelects,
  createTagsInputs,
} from "@/constants/opportunities";

import { safeCast } from "@/types";
import { ICreateOpportunity } from "@/contexts/opportunities/interfaces";

const Client = () => {
  const path = usePathname();

  const { tab, setTab, handleCreateOpportunity, opportunities } =
    useOpportunities();

  const { loggedUser } = useAuth();

  const isAdmin = loggedUser && loggedUser.role === "ADMIN";

  const opportunitiesEndRef = useRef<HTMLLIElement | null>(null);

  const createForm = useForm<ICreateOpportunity>({
    mode: "onChange",
    resolver: yupResolver(createOpportunitySchema),
  });

  useEffect(() => {
    if (path === "/opportunities")
      opportunitiesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [opportunities, path]);

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
      compensationMin: formattedCompensationMin,
      compensationMax: formattedCompensationMax,
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
            <div className="flex flex-col gap-5">
              <Filters />

              <ul className="flex flex-col gap-5 w-full">
                {opportunities ? (
                  !!opportunities.length ? (
                    <>
                      {opportunities.map((opportunity) => (
                        <Opportunity
                          key={opportunity.id}
                          opportunity={opportunity}
                        />
                      ))}

                      <li ref={opportunitiesEndRef} />
                    </>
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
                <>
                  {opportunities.map((opportunity) => (
                    <Opportunity
                      key={opportunity.id}
                      opportunity={opportunity}
                    />
                  ))}

                  <li ref={opportunitiesEndRef} />
                </>
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
  );
};

export default Client;
