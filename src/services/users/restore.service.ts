import { api } from "../api";

const restoreUser = async (userId: string): Promise<void> => {
  await api.patch(`/users/${userId}/restore`);

  return;
};

export default restoreUser;
