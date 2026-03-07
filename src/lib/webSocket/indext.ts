import { io, Socket } from "socket.io-client";

import { API_URL } from "@/config";

let webSocket: Socket | null = null;

export const getWebSocket = (url = API_URL): Socket => {
  if (!webSocket)
    webSocket = io(url, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 800,
      reconnectionDelayMax: 4000,
    });

  return webSocket;
};
