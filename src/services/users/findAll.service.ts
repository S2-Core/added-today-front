import { api } from "../api";

import { IUser } from "@/contexts/users/interfaces";

const findAllUsers = async (): Promise<IUser[]> => {
  const { data } = await api.get<IUser[]>("/users");

  return data;
};

export default findAllUsers;
