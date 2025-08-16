"use client";

import { createContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { getWebSocket } from "@/lib";

import { SocketStatus } from "@/constants/sockets";

import { IProps, IWebSocketsContext } from "./interfaces";
import { API_URL } from "@/config";

export const WebSocketsContext = createContext({} as IWebSocketsContext);

const WebSocketsProvider = ({ children }: IProps) => {
  const [webSocket, setWebSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<SocketStatus>(SocketStatus.DISCONNECTED);

  useEffect(() => {
    const socket = getWebSocket();
    setWebSocket(socket);

    const onDisconnect = () => setStatus(SocketStatus.DISCONNECTED);
    const onConnect = () => setStatus(SocketStatus.CONNECTED);
    const onReconnecting = () => setStatus(SocketStatus.CONNECTING);

    socket.on("disconnect", onDisconnect);
    socket.on("connect", onConnect);
    socket.io.on("reconnect_attempt", onReconnecting);

    return () => {
      socket.off("disconnect", onDisconnect);
      socket.off("connect", onConnect);
      socket.io.off("reconnect_attempt", onReconnecting);
    };
  }, []);

  return (
    <WebSocketsContext.Provider value={{ status, webSocket }}>
      {children}
    </WebSocketsContext.Provider>
  );
};

export default WebSocketsProvider;
