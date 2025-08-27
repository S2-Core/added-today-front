"use client";

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
    <Container Tag={"main"}>
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
  );
};

export default Client;
