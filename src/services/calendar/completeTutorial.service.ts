import { api } from "../api";

const completeCalendarTutorial = async (): Promise<void> => {
  const {
    data: { success },
  } = await api.post("/calendar/tutorial/complete");

  if (!success) {
    throw new Error("Erro ao concluir o tutorial do calendário!");
  }
};

export default completeCalendarTutorial;
