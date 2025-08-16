import { api } from "../api";

import {
  IChatMessage,
  IChatMessagesResponse,
} from "@/contexts/chat/interfaces";

const findAllChatMessages = async (
  userId: string,
  limit?: number
): Promise<IChatMessage[]> => {
  const { data } = await api.get<IChatMessagesResponse>("/chat/history", {
    params: { userId, limit },
  });

  const { interactions } = data;

  return interactions;
};

export default findAllChatMessages;
