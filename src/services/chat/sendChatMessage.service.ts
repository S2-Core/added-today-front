import { api } from "../api";

import { ISendChatMessage } from "@/contexts/chat/interfaces";

const sendChatMessage = async (body: ISendChatMessage): Promise<void> => {
  await api.post("/chat/webhook/message", body);

  return;
};

export default sendChatMessage;
