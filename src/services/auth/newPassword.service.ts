import { api } from "../api";

interface IBody {
  token: string;
  password: string;
}

const setNewPassword = async (data: IBody): Promise<void> => {
  await api.post("/auth/reset-password", data);

  return;
};

export default setNewPassword;
