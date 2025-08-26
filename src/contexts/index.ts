import { useContext } from "react";

import { AuthContext } from "./auth";
import { WebSocketsContext } from "./webSockets";
import { UsersContext } from "./users";
import { OpportunitiesContext } from "./opportunities";
import { MentalsContext } from "./mentals";
import { ChatContext } from "./chat";
import { InsightsContext } from "./insights";

const useAuth = () => useContext(AuthContext);
const useWebSockets = () => useContext(WebSocketsContext);
const useUsers = () => useContext(UsersContext);
const useOpportunities = () => useContext(OpportunitiesContext);
const useMentals = () => useContext(MentalsContext);
const useChat = () => useContext(ChatContext);
const useInsights = () => useContext(InsightsContext);

export {
  useAuth,
  useWebSockets,
  useUsers,
  useOpportunities,
  useMentals,
  useChat,
  useInsights,
};
