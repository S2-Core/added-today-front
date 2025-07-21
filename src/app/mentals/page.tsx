"use client";

import { useContext, useState } from "react";

import { MentalsContext } from "@/contexts/mentals";

import Container from "@/components/container";
import Card from "@/components/card";
import Tabs, { Tab } from "@/components/tabs";
import Loading from "@/components/loading";

const Mentals = () => {
  const [tab, setTab] = useState("manageMentals");

  const { mentalsToManage } = useContext(MentalsContext);

  return (
    <Container Tag={"main"}>
      <Tabs setTab={setTab} tab={tab} id="mentals">
        <Tab label="Gerenciar Mentals" name="manageMentals">
          {mentalsToManage ? (
            <ul className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 xl:grid-cols-4">
              {!!mentalsToManage.length ? (
                mentalsToManage.map(
                  ({ id, slug, imageUrl, properties, title, isActive }) => (
                    <Card
                      key={`${title}-${id}`}
                      id={id}
                      image={imageUrl}
                      properties={properties}
                      title={title}
                      link={`/mentals/${slug}`}
                      isActive={isActive}
                    />
                  )
                )
              ) : (
                <></>
              )}
            </ul>
          ) : (
            <Loading size={45} className="h-80" />
          )}
        </Tab>

        <Tab label="Criar Mental" name="createMental">
          <></>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Mentals;
