import { api } from "../api";

import { ICreateUser } from "@/contexts/users/interfaces";

const createUser = async (body: ICreateUser): Promise<void> => {
  await api.post("/users", body);

  return;
};

export default createUser;
