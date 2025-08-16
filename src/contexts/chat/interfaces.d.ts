import { ReactNode } from "react";

import { MessageDirection } from "@/constants/chat";

export interface IChatMessage {
  id: string;
  userId: string;
  direction: MessageDirection;
  message: string;
  timestamp: string;
}

export interface IChatMessagesResponse {
  interactions: IChatMessage[];
}

export interface IStartChatSessionResponse {
  sessionId: string;
  userId: string;
  createdAt: string;
}

export interface ISendChatMessage {
  userId: string;
  sessionId: string;
  message: string;
}

export interface IProps {
  children: ReactNode;
}

export interface IChatContext {
  chatMessages: IChatMessage[] | null;
  handleSendMessage: (message: string) => Promise<void>;
  sessionId: string | undefined;
}
