import { api } from "../api";

import { ILogin, ILoginResponse } from "@/contexts/Auth/interfaces";

const loginService = async (body: ILogin): Promise<ILoginResponse> => {
  const { data } = await api.post<ILoginResponse>("/auth/login", body);

  return data;
};

export default loginService;
