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
  const {
    chatMessages,
    handleSendMessage,
    sessionId,
    messageLoading,
    chatOptions,
    setSelectedOptions,
    selectedOptions,
  } = useChat();

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
        <div className="pb-40 w-full max-w-2xl">
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
            <div className="relative flex flex-col items-center gap-1 bg-success/50 shadow-md ml-auto py-3 rounded-3xl w-15 max-w-[70%]">
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
            className="relative flex justify-center px-5 w-full h-12 container"
          >
            {chatOptions && !messageLoading && (
              <div className="bottom-14 absolute flex px-5 w-full text-xs">
                <ul
                  style={{ scrollbarWidth: "none" }}
                  className="flex justify-start gap-2 mx-auto px-4 max-w-2xl overflow-x-auto"
                >
                  {chatOptions.allowMultiple && !!selectedOptions.length && (
                    <li
                      onClick={(e) => {
                        e.preventDefault();

                        const optionsMessage = selectedOptions.join(", ");

                        handleSendMessage(optionsMessage);
                      }}
                      className="bottom-10 left-1/2 absolute flex justify-center items-center bg-success-light hover:bg-success active:bg-success/70 shadow-md rounded-full w-10 h-10 -translate-x-1/2 cursor-pointer"
                    >
                      <button
                        type="button"
                        tabIndex={-1}
                        disabled={!selectedOptions.length}
                        className="cursor-pointer"
                      >
                        <FaPaperPlane
                          className="text-light text-sm"
                          size={20}
                        />
                      </button>
                    </li>
                  )}

                  {chatOptions.options ? (
                    chatOptions.options.map(
                      ({ id, emoji, title, description, value }, i) => (
                        <li
                          key={`${id}-${i}`}
                          title={description}
                          onClick={() => {
                            if (messageLoading) return;

                            if (chatOptions.allowMultiple)
                              if (selectedOptions.includes(value))
                                setSelectedOptions(
                                  selectedOptions.filter(
                                    (selectedOption) => selectedOption !== value
                                  )
                                );
                              else
                                setSelectedOptions([...selectedOptions, value]);
                            else setSelectedOptions([value]);
                          }}
                          className={`shadow-md p-2 border-1 rounded-full text-foreground whitespace-nowrap cursor-pointer ${selectedOptions.includes(value) ? "bg-tertiary/30 border-tertiary" : "bg-success/30 border-success"}`}
                        >
                          <button
                            type="button"
                            tabIndex={-1}
                            className="outline-none cursor-pointer"
                          >
                            {emoji} {title}
                          </button>
                        </li>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            )}

            <div
              onClick={() => inputRef.current?.focus()}
              className={`flex items-center  shadow-md pr-2 pl-6 rounded-full w-full max-w-2xl h-full max-h-23 ${!!chatOptions?.options?.length || messageLoading ? "bg-gray-7 cursor-not-allowed" : "bg-success-light cursor-text"}`}
            >
              <input
                ref={inputRef}
                name="message"
                type="text"
                title={
                  !!chatOptions?.options?.length
                    ? "Selecione uma opção"
                    : "Digite sua mensagem"
                }
                placeholder={
                  !!chatOptions?.options?.length
                    ? "Selecione uma opção..."
                    : "Digite sua mensagem..."
                }
                autoComplete="off"
                autoCapitalize="on"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!!chatOptions?.options?.length || messageLoading}
                style={{
                  scrollbarColor: "#222 #333",
                }}
                className="flex-1 disabled:bg-gray-7 mr-5 pr-3 outline-none h-5 max-h-23 overflow-y-auto text-light placeholder:text-light/70 text-sm placeholder:text-sm resize-none disabled:cursor-not-allowed"
              />

              {!!message.trim() && (
                <button
                  type="submit"
                  title="Enviar mensagem"
                  disabled={messageLoading && !message.trim()}
                  tabIndex={-1}
                  className="bg-success-light hover:bg-success active:bg-success/50 disabled:bg-gray-10 disabled:opacity-50 p-2.5 rounded-full transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
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
