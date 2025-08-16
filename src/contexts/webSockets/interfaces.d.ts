import { ReactNode } from "react";
import { Socket } from "socket.io-client";

export interface IProps {
  children: ReactNode;
}

export interface IWebSocketsContext {
  status: SocketStatus;
  webSocket: Socket | null;
}
