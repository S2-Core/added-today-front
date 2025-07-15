"use client";

import { users } from "@/mocks/users.mock";

import Container from "@/components/container";
import Card from "@/components/card";

const Users = () => {
  return (
    <Container Tag={"main"}>
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
    </Container>
  );
};

export default Users;
