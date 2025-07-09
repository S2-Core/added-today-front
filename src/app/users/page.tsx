"use client";

import { users } from "@/mocks/users.mock";

import Container from "@/components/container";
import Card from "@/components/card";

const Users = () => {
  return (
    <Container Tag={"main"}>
      <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {users.map(({ id, isActive, info }) => (
          <Card
            key={`${info.reduce((acc, { key }) => acc + key, "")}-${id}`}
            info={info}
            link={`/mentals/${id}`}
            isActive={isActive}
          />
        ))}
      </ul>
    </Container>
  );
};

export default Users;
