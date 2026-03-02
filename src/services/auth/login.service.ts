import { api } from "../api";

import { ILogin, ILoginResponse } from "@/contexts/auth/interfaces";

const loginService = async (body: ILogin): Promise<ILoginResponse> => {
  const {
    data: { success, data },
  } = await api.post<{ success: boolean; data: ILoginResponse }>(
    "/auth/login",
    body,
  );

  if (!success) throw new Error("Email ou senha inválidos!");

  return data;
};

export default loginService;
