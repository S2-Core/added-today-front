import { api } from "../api";

import {
  IChatHistoryResponse,
  IChatMessagesResponse,
} from "@/contexts/chat/interfaces";

const findAllChatMessages = async (
  userId: string,
  limit?: number
): Promise<IChatMessagesResponse> => {
  const { data } = await api.get<IChatHistoryResponse>("/chat/history", {
    params: { userId, limit },
  });

  const { data: history } = data;

  return history;
};

export default findAllChatMessages;
