import { useContext } from "react";

import { AuthContext } from "./auth";
import { WebSocketsContext } from "./webSockets";
import { UsersContext } from "./users";
import { MentalsContext } from "./mentals";
import { ChatContext } from "./chat";

export const useAuth = () => useContext(AuthContext);
export const useWebSockets = () => useContext(WebSocketsContext);
export const useMentals = () => useContext(MentalsContext);
export const useUsers = () => useContext(UsersContext);
export const useChat = () => useContext(ChatContext);
