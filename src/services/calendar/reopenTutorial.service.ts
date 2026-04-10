import { api } from "../api";

const reopenCalendarTutorial = async (): Promise<void> => {
  const {
    data: { success },
  } = await api.post("/calendar/tutorial/reopen");

  if (!success) {
    throw new Error("Erro ao reabrir o tutorial do calendário!");
  }
};

export default reopenCalendarTutorial;
