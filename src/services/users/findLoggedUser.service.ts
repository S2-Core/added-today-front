import { api } from "../api";

import { ILoggedUser } from "@/contexts/auth/interfaces";

const findLoggedUser = async (): Promise<ILoggedUser> => {
  const { data } = await api.get<ILoggedUser>("/users/me");

  return data;
};

export default findLoggedUser;
