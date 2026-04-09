import { api } from "../api";

const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/calendar/${id}`);

  return;
};

export default deleteEvent;
