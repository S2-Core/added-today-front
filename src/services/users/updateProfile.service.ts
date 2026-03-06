import { api } from "../api";

import { IUpdateProfileBody } from "@/contexts/users/interfaces";

const updateProfileService = async (
  data: IUpdateProfileBody,
): Promise<void> => {
  await api.patch("/users/me/profile", data);

  return;
};

export default updateProfileService;
