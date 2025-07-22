import { api } from "../api";

const deactivateUser = async (userId: string): Promise<void> => {
  await api.delete(`/users/${userId}`);

  return;
};

export default deactivateUser;
