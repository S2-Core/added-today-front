"use client";

import Container from "@/components/container";
import Card from "@/components/card";

import { mentals } from "@/mocks/mentals.mock";

const Mentals = () => {
  return (
    <Container Tag={"main"}>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {mentals.map(({ id, image, properties, title, isActive }) => (
          <Card
            key={`${title}-${id}`}
            image={image}
            properties={properties}
            title={title}
            link={`/mentals/${id}`}
            isActive={isActive}
          />
        ))}
      </ul>
    </Container>
  );
};

export default Mentals;
