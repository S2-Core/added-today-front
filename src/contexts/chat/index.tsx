"use client";

import { createContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import { useAuth, useWebSockets } from "..";

import findAllChatMessages from "@/services/chat/findAllchatMessages.service";
import startChatSession from "@/services/chat/startChatSession.service";
import sendChatMessage from "@/services/chat/sendChatMessage.service";

import { decriptValue, encriptValue } from "@/utils/encryption.utils";

import {
  IChatContext,
  IChatMessage,
  IProps,
  IUIComponents,
  IUIComponentsOption,
} from "./interfaces";
import { MessageDirection } from "@/constants/chat";

export const ChatContext = createContext({} as IChatContext);

const ChatProvider = ({ children }: IProps) => {
  const path = usePathname();

  const { token, loggedUser } = useAuth();
  const { webSocket } = useWebSockets();

  const chatInitialized = useRef(false);
  const sessionJoined = useRef(false);

  const [sessionId, setSessionId] = useState<string | undefined>();
  const [chatMessages, setChatMessages] = useState<IChatMessage[] | null>(null);
  const [messageLoading, setMessageLoading] = useState<boolean>(false);
  const [chatOptions, setChatOptions] = useState<IUIComponents | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<IUIComponentsOption[]>(
    []
  );

  useEffect(() => {
    if (token && loggedUser && path === "/chat") {
      setTimeout(() => {
        handleFindAllChatMessages();
      }, 1000);
    }
  }, [loggedUser, path]);

  useEffect(() => {
    if (chatInitialized.current || sessionId || !loggedUser) return;

    const sessionIdCookie = Cookies.get("sessionId");

    if (sessionIdCookie && !sessionId) {
      setSessionId(decriptValue(sessionIdCookie));

      return;
    }

    chatInitialized.current = true;

    handleInitSession();
  }, [loggedUser]);

  useEffect(() => {
    if (!webSocket || !sessionId || !loggedUser || sessionJoined.current)
      return;

    webSocket.emit("join", { sessionId, userId: loggedUser.id });

    sessionJoined.current = true;
  }, [webSocket, sessionId, loggedUser]);

  useEffect(() => {
    if (!webSocket || !chatMessages) return;

    webSocket.on("message", (message: IChatMessage) => {
      if (chatMessages.find((chatMessage) => chatMessage.id === message.id))
        return;

      const parsedMessage =
        message.direction === MessageDirection.BOT
          ? message.message
          : JSON.parse(message.message);

      const formattedMessage = {
        ...message,
        message: Array.isArray(parsedMessage)
          ? parsedMessage
              .map(({ emoji, title }) => `${emoji} ${title}`)
              .join(", ")
          : typeof parsedMessage === "string"
            ? parsedMessage
            : `${parsedMessage.emoji} ${parsedMessage.title}`,
      };

      const { uiComponents: allOptions } = formattedMessage;

      if (formattedMessage.direction === MessageDirection.BOT)
        setChatOptions(allOptions);

      setMessageLoading(false);
      setSelectedOptions([]);

      setChatMessages([...(chatMessages || []), formattedMessage]);
    });

    return () => {
      webSocket.off("message");

      setMessageLoading(false);
      setSelectedOptions([]);
    };
  }, [webSocket, chatMessages]);

  useEffect(() => {
    if (chatOptions && !chatOptions.allowMultiple && !!selectedOptions.length) {
      handleSendMessage(selectedOptions[0]);
    }
  }, [selectedOptions]);

  const handleFindAllChatMessages = async (): Promise<void> => {
    try {
      if (!loggedUser) throw new Error("Usuário não logado!");

      const { messages: allMessages } = await findAllChatMessages(
        loggedUser.id,
        20
      );

      const formattedMessages = allMessages.map((messages) => {
        const parsedMessage: string | IUIComponentsOption =
          messages.direction === MessageDirection.BOT
            ? messages.message
            : JSON.parse(messages.message);

        if (typeof parsedMessage === "string")
          return { ...messages, message: parsedMessage };

        if (Array.isArray(parsedMessage)) {
          const formattedMessage = parsedMessage
            .map(({ title, emoji }) => `${emoji} ${title}`)
            .join(", ");

          return { ...messages, message: formattedMessage };
        }

        const { title, emoji } = parsedMessage;

        return {
          ...messages,
          message: `${emoji} ${title}`,
        };
      });

      const lastMessage = formattedMessages[formattedMessages.length - 1];

      const { uiComponents: allOptions } = lastMessage;

      setChatOptions(allOptions ?? null);
      setChatMessages(formattedMessages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async (
    message: string | IUIComponentsOption | IUIComponentsOption[]
  ): Promise<void> => {
    try {
      setMessageLoading(true);

      if (!loggedUser) throw new Error("Usuário não logado!");

      if (!sessionId) throw new Error("Sessão não iniciada!");

      if (!chatMessages) throw new Error("Mensagens não carregadas!");

      await sendChatMessage({
        sessionId,
        userId: loggedUser.id,
        message: Array.isArray(message)
          ? message.length > 1
            ? message
            : message[0]
          : message,
      });
    } catch (err) {
      console.error(err);

      toast.error("Ocorreu um erro inesperado ao enviar a mensagem!");
    }
  };

  const handleInitSession = async (): Promise<void> => {
    try {
      if (!loggedUser) throw new Error("Usuário não logado!");

      const { sessionId: loggedSessionId } = await startChatSession(
        loggedUser.id
      );

      Cookies.set("sessionId", encriptValue(loggedSessionId));

      setSessionId(loggedSessionId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chatMessages,
        handleSendMessage,
        sessionId,
        messageLoading,
        chatOptions,
        setSelectedOptions,
        selectedOptions,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
