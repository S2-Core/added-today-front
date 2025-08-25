"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";

import { useAuth, useChat } from "@/contexts";

import Container from "@/components/container";
import ChatMessage from "@/components/chatMessage";
import Loading from "@/components/loading";

const Client = () => {
  const path = usePathname();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { token, loggedUser } = useAuth();
  const { chatMessages, handleSendMessage, sessionId, messageLoading } =
    useChat();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (path === "/chat")
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, path, messageLoading]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const formatedMessage = message.trim();

    if (!formatedMessage) return;

    setMessage("");

    await handleSendMessage(formatedMessage);
  };

  if (!token || !loggedUser || !sessionId || !chatMessages)
    return (
      <Loading className="top-0 left-0 fixed flex justify-center items-center bg-background w-full h-full" />
    );

  return (
    <Container Tag="main" className="flex justify-center">
      {chatMessages && !!chatMessages.length && (
        <div className="pb-20 w-full max-w-2xl">
          <ul className="flex flex-col gap-5">
            {chatMessages.map(({ message, timestamp, direction, id }) => (
              <ChatMessage
                key={id}
                message={message}
                timestamp={timestamp}
                direction={direction}
              />
            ))}
          </ul>

          {messageLoading && (
            <div className="relative flex flex-col items-center gap-1 bg-gray-7 shadow-md ml-auto py-3 rounded-3xl w-15 max-w-[70%]">
              <Loading className="w-4 h-4" color="text-light" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="bottom-0 left-0 fixed w-full">
        <div className="bottom-6 z-99 absolute flex justify-center w-full h-full">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center px-5 w-full h-12 container"
          >
            <div
              onClick={() => inputRef.current?.focus()}
              className="flex items-center bg-gray-7 shadow-md pr-2 pl-6 rounded-full w-full max-w-2xl h-full max-h-[366.844px] cursor-text"
            >
              <input
                ref={inputRef}
                name="message"
                type="text"
                title="Digite sua mensagem"
                placeholder="Digite sua mensagem..."
                autoComplete="off"
                autoCapitalize="on"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 mr-5 pr-3 outline-none h-5 max-h-[366.844px] overflow-y-auto text-light placeholder:text-light/70 text-sm placeholder:text-sm resize-none"
                style={{
                  scrollbarColor: "#222 #333",
                }}
              />

              {!!message.trim() && (
                <button
                  type="submit"
                  title="Enviar mensagem"
                  disabled={messageLoading}
                  tabIndex={-1}
                  className="bg-gray-5 hover:bg-tertiary active:bg-tertiary/50 disabled:bg-gray-10 disabled:opacity-50 p-2.5 rounded-full transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="text-light text-sm" />
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="z-9 bg-background w-full h-12" />
      </div>
    </Container>
  );
};

export default Client;
