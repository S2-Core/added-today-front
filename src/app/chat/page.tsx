"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";

import { useAuth, useChat } from "@/contexts";

import Container from "@/components/container";
import ChatMessage from "@/components/chatMessage";
import Loading from "@/components/loading";

const Chat = () => {
  const path = usePathname();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { token, loggedUser } = useAuth();
  const { chatMessages, handleSendMessage, sessionId } = useChat();

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (path === "/chat")
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, path]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const formatedMessage = message.trim();

    if (!formatedMessage) return;

    handleSendMessage(formatedMessage).then(() => setMessage(""));
  };

  if (!token || !loggedUser || !sessionId || !chatMessages)
    return (
      <Loading className="top-0 left-0 fixed flex justify-center items-center bg-background w-full h-full" />
    );

  return (
    <Container Tag={"main"} className="flex justify-center">
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

          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="bottom-0 left-0 fixed bg-background w-full h-15">
        <div className="bottom-8 absolute flex justify-center w-full">
          <form
            onSubmit={handleSubmit}
            className="flex justify-center px-5 w-full h-12 container"
          >
            <div className="flex items-center bg-gray-3 shadow-md pr-2 pl-6 rounded-full w-full max-w-2xl h-full">
              <input
                type="text"
                name="message"
                title="Digite sua mensagem"
                placeholder="Digite sua mensagem..."
                autoComplete="off"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 pr-3 outline-none text-light placeholder:text-gray-7 text-sm placeholder:text-sm"
              />

              {!!message.trim() && (
                <button
                  type="submit"
                  title="Enviar mensagem"
                  tabIndex={-1}
                  className="bg-gray-4 hover:bg-tertiary active:bg-tertiary/50 p-2.5 rounded-full transition-all duration-300 cursor-pointer"
                >
                  <FaPaperPlane className="text-light text-sm" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Chat;
