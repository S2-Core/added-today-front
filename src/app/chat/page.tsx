"use client";

import { FormEvent, useContext, useState } from "react";
import { usePathname } from "next/navigation";

import { AuthContext } from "@/contexts/auth";

import ChatMessage from "@/components/chatMessage";

import { excludedRoutes, routeLinks } from "@/constants/header";
import { chatMessages, MessageDirection } from "@/constants/chat";
import Container from "@/components/container";
import { FaPaperPlane } from "react-icons/fa";

const Chat = () => {
  const page = usePathname();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);

  const { token } = useContext(AuthContext);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (!message) return;

    setMessages((messages) => [
      ...messages,
      {
        id: String(chatMessages.length + 1),
        direction: MessageDirection.USER,
        message,
        date: new Date(),
      },
    ]);

    setMessage("");
  };

  if (
    excludedRoutes.includes(page) ||
    !routeLinks.map(({ href }) => href).includes(page) ||
    !token
  )
    return <></>;

  return (
    <Container Tag={"main"} className="flex justify-center">
      <div className="pb-20 w-full max-w-2xl">
        <ul className="flex flex-col gap-5">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.message}
              date={message.date}
              direction={message.direction}
            />
          ))}
        </ul>
      </div>

      <div className="bottom-0 left-0 fixed bg-background w-full h-15">
        <div className="bottom-8 absolute flex justify-center w-full">
          <form
            onSubmit={handleSendMessage}
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
                onChange={(e) => setMessage(e.target.value.trim())}
                className="flex-1 pr-3 outline-none text-light placeholder:text-gray-7 text-sm placeholder:text-sm"
              />

              {message && (
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
