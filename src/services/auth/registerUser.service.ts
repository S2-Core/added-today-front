import { api } from "../api";

import { IRegister, IRegisterResponse } from "@/contexts/auth/interfaces";

const registerUser = async (body: IRegister): Promise<IRegisterResponse> => {
  const {
    data: { success, data },
  } = await api.post<{ success: boolean; data: IRegisterResponse }>(
    "/auth/register",
    body,
  );

  if (!success) throw new Error("Erro ao cadastrar usuário!");

  return data;
};

export default registerUser;
