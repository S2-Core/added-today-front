import { api } from "../api";

import { IRecovery } from "@/contexts/auth/interfaces";

const sendRecoveryEmail = async (data: IRecovery): Promise<void> => {
  await api.post("/auth/forgot-password", data);

  return;
};

export default sendRecoveryEmail;
