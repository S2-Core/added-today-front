import { useContext } from "react";

import { AuthContext } from "./auth";
import { WebSocketsContext } from "./webSockets";
import { UsersContext } from "./users";
import { MentalsContext } from "./mentals";
import { ChatContext } from "./chat";
import { OpportunitiesContext } from "./opportunities";

const useAuth = () => useContext(AuthContext);
const useWebSockets = () => useContext(WebSocketsContext);
const useMentals = () => useContext(MentalsContext);
const useUsers = () => useContext(UsersContext);
const useChat = () => useContext(ChatContext);
const useOpportunities = () => useContext(OpportunitiesContext);

export {
  useAuth,
  useWebSockets,
  useMentals,
  useUsers,
  useChat,
  useOpportunities,
};
