import { api } from "../api";

const deactivateMental = async (mentalId: string): Promise<void> => {
  await api.delete(`/mental/${mentalId}`);

  return;
};

export default deactivateMental;
