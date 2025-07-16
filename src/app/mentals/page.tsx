"use client";

import { useState } from "react";

import { mentals } from "@/mocks/mentals.mock";

import Container from "@/components/container";
import Card from "@/components/card";
import Tabs, { Tab } from "@/components/tabs";

const Mentals = () => {
  const [tab, setTab] = useState("manageMentals");

  return (
    <Container Tag={"main"}>
      <Tabs setTab={setTab} tab={tab}>
        <Tab label="Gerenciar Mentals" name="manageMentals">
          <ul className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 xl:grid-cols-4">
            {mentals.map(
              ({ id, slug, imageUrl, properties, title, isActive }) => (
                <Card
                  key={`${title}-${id}`}
                  image={imageUrl}
                  properties={properties}
                  title={title}
                  link={`/mentals/${slug}`}
                  isActive={isActive}
                />
              )
            )}
          </ul>
        </Tab>

        <Tab label="Criar Mental" name="createMental">
          <></>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Mentals;
