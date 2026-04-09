import { api } from "../api";

const deleteCalendarItem = async (id: string): Promise<void> => {
  await api.delete(`/calendar/${id}`);
};

export default deleteCalendarItem;
