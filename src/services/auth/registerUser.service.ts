import { api } from "../api";

import { IRegister } from "@/contexts/auth/interfaces";
import { IUser } from "@/contexts/users/interfaces";

const registerUser = async (body: IRegister): Promise<IUser> => {
  const {
    data: { success, data },
  } = await api.post<{ success: boolean; data: IUser }>("/auth/register", body);

  if (!success) throw new Error("Erro ao cadastrar usuário!");

  return data;
};

export default registerUser;
