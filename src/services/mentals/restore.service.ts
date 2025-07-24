import { api } from "../api";

const restoreMental = async (mentalId: string): Promise<void> => {
  await api.patch(`/mental/${mentalId}/restore`);

  return;
};

export default restoreMental;
