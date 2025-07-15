"use client";

import { mentals } from "@/mocks/mentals.mock";

import Container from "@/components/container";
import Card from "@/components/card";

const Mentals = () => {
  return (
    <Container Tag={"main"}>
      <ul className="gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 xl:grid-cols-4">
        {mentals.map(({ id, slug, imageUrl, properties, title, isActive }) => (
          <Card
            key={`${title}-${id}`}
            image={imageUrl}
            properties={properties}
            title={title}
            link={`/mentals/${slug}`}
            isActive={isActive}
          />
        ))}
      </ul>
    </Container>
  );
};

export default Mentals;
