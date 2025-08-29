import { Dispatch, ReactNode, SetStateAction } from "react";

import { MessageDirection } from "@/constants/chat";

export interface IChatMessageMetadata {
  interactionId: string;
}

export interface IUIComponentsMetadata {
  instruction: string;
  maxSelection: number;
  minSelection: number;
}

export interface IUIComponentsOption {
  id: string;
  emoji: string;
  title: string;
  description: string;
  value: string;
}

export interface IUIComponents {
  allowMultiple: boolean;
  metadata: IUIComponentsMetadata;
  options: IUIComponentsOption[];
  type: string;
  chatUnlocked?: boolean;
}

export interface IChatMessage {
  id: string;
  message: string;
  metadata: IChatMessageMetadata;
  direction: MessageDirection;
  timestamp: string;
  type: string;
  uiComponents: IUIComponents | null;
}

export interface IChatPagination {
  hasNext: boolean;
  hasPrev: boolean;
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

export interface IChatSessionInfo {
  sessionId: string;
  userId: string;
  lastActivity: string;
}

export interface IChatMessagesResponse {
  messages: IChatMessage[];
  pagination: IChatPagination;
  sessionInfo: ISessionInfo;
}

export interface IChatHistoryResponse {
  data: IChatMessagesResponse;
  success: boolean;
}

export interface IStartChatSessionResponse {
  sessionId: string;
  userId: string;
  createdAt: string;
}

export interface ISendChatMessage {
  userId: string;
  sessionId: string;
  message: string | IUIComponentsOption | IUIComponentsOption[];
}

export interface IProps {
  children: ReactNode;
}

export interface IChatContext {
  chatMessages: IChatMessage[] | null;
  handleSendMessage: (message: string) => Promise<void>;
  sessionId: string | undefined;
  userMessageLoading: boolean;
  botMessageLoading: boolean;
  chatOptions: IUIComponents | null;
  setSelectedOptions: Dispatch<SetStateAction<IUIComponentsOption[]>>;
  selectedOptions: IUIComponentsOption[];
}
