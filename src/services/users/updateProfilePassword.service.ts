import { api } from "../api";

import { IUpdateProfilePassword } from "@/contexts/users/interfaces";

const updateProfilePasswordService = async (
  data: IUpdateProfilePassword,
): Promise<void> => {
  await api.patch("/users/me/password", data);

  return;
};

export default updateProfilePasswordService;
