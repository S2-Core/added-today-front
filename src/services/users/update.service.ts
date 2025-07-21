import { api } from "../api";

import { IUser, IUpdateUser } from "@/contexts/users/interfaces";

const updateUser = async (
  body: Partial<IUpdateUser>,
  userId: string
): Promise<void> => {
  await api.patch<IUser>(`/users/${userId}`, body);

  return;
};

export default updateUser;
