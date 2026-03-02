import { api } from "../api";

const deactivateUser = async (userId: string): Promise<void> => {
  await api.delete(`/users/admin/${userId}`);

  return;
};

export default deactivateUser;
