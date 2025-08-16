import { api } from "../api";

import { IUser } from "@/contexts/users/interfaces";

const findLoggedUser = async (): Promise<IUser> => {
  const { data } = await api.get<IUser>("/users/me");

  return data;
};

export default findLoggedUser;
