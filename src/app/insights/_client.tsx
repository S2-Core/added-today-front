"use client";

import { useEffect, useState } from "react";

import { useAuth, useInsights } from "@/contexts";

import Container from "@/components/container";
import Tabs, { Tab } from "@/components/tabs";
import Loading from "@/components/loading";
import EmptyList from "@/components/emptyList";
import Insight from "@/components/insight";
import InsightsConfig from "@/components/insightsSttings";

const Client = () => {
  const { loggedUser } = useAuth();

  const { tab, setTab, insights } = useInsights();

  if (!loggedUser) return null;

  return (
    <>
      <Container Tag={"main"} className="flex flex-col gap-20">
        <div className="flex flex-col gap-10 select-none">
          <h1 className="font-bold text-foreground text-3xl text-center">
            Conteúdo que importa para você
          </h1>

          <p className="mx-auto max-w-2xl text-foreground text-center">
            Receba um compilado inteligente de notícias, tendências e dados
            ajustados ao seu nicho. Insights que economizam tempo e mantêm você
            sempre atualizado para criar com relevância.
          </p>
        </div>

        <Tabs setTab={setTab} tab={tab}>
          <Tab name="myInsights" label="Meus Insights">
            <ul className="flex flex-col gap-10 mx-auto max-w-2xl">
              {insights ? (
                !!insights.length ? (
                  insights.map((insight) => (
                    <Insight key={insight.id} insight={insight} />
                  ))
                ) : (
                  <EmptyList />
                )
              ) : (
                <Loading />
              )}
            </ul>
          </Tab>

          <Tab name="insightsSettings" label="Configurações de Insights">
            <InsightsConfig />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Client;
