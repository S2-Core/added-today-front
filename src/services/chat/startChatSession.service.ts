import { api } from "../api";

import { IStartChatSessionResponse } from "@/contexts/chat/interfaces";

const startChatSession = async (
  userId: string
): Promise<IStartChatSessionResponse> => {
  const { data } = await api.post<IStartChatSessionResponse>(
    "/chat/session/start",
    {
      userId,
    }
  );

  return data;
};

export default startChatSession;
