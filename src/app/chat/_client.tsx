"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FaPaperPlane } from "react-icons/fa";

import { useAuth, useChat } from "@/contexts";

import Container from "@/components/container";
import ChatMessage from "@/components/chatMessage";
import Loading from "@/components/loading";
import NavigationTabs from "@/components/navigationTabs";

import { RiRobot2Line } from "react-icons/ri";
import { PiMedal } from "react-icons/pi";
import { chatMentals } from "@/constants/chat";
import { BiSolidLock } from "react-icons/bi";
import { IChatMental } from "@/constants/chat/interface";
import { captalize } from "@/utils/string.utils";

const Client = () => {
  const path = usePathname();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { token, loggedUser } = useAuth();
  const {
    chatMessages,
    handleSendMessage,
    sessionId,
    userMessageLoading,
    botMessageLoading,
    chatOptions,
    setSelectedOptions,
    selectedOptions,
  } = useChat();

  const [selectedMental, setSelectedMental] = useState<IChatMental | null>(
    chatMentals.find(({ defaultSelected }) => defaultSelected) ?? null
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (path === "/chat")
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, path, userMessageLoading]);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const formatedMessage = message.trim();

    if (!formatedMessage) return;

    setMessage("");

    await handleSendMessage(formatedMessage);

    inputRef.current?.focus();
  };

  const { Icon: SelectedMentalIcon, color: selectedMentalColor } =
    selectedMental?.icon ?? {
      SelectedMentalIcon: null,
      selectedMentalColor: null,
    };

  const selectedMentalBackground = `${selectedMentalColor?.replace("text-", "bg-")}/10`;

  if (!token || !loggedUser || !sessionId || !chatMessages)
    return (
      <Loading className="top-0 left-0 fixed flex justify-center items-center bg-background w-full h-full" />
    );

  return (
    <Container Tag="main" className="flex flex-col gap-6 my-5">
      <NavigationTabs />

      <div className="gap-6 grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6">
        <div className="order-first lg:order-last lg:col-span-3 xl:col-span-4 border-2 border-secondary/30 rounded-xl select-none">
          <div
            title={`Conversar com ${captalize(selectedMental?.name ?? "")}`}
            className="flex justify-between items-center p-6"
          >
            <div className="flex items-center gap-3">
              <div
                title={captalize(selectedMental?.name ?? "")}
                className={`p-3 rounded-xl ${selectedMentalBackground}`}
              >
                {!!SelectedMentalIcon && (
                  <SelectedMentalIcon
                    className={selectedMentalColor}
                    size={22}
                  />
                )}
              </div>

              <div className="flex flex-col text-bold">
                <b
                  title={`${captalize(selectedMental?.name ?? "")} - ${captalize(selectedMental?.category ?? "")}`}
                  className="flex gap-1 text-lg"
                >
                  {captalize(selectedMental?.name ?? "")}
                  <span className="hidden sm:flex">
                    {` - ${captalize(selectedMental?.category ?? "")}`}
                  </span>
                </b>

                <b
                  title={captalize(selectedMental?.category ?? "")}
                  className="text-foreground/60 text-sm"
                >
                  {captalize(selectedMental?.category ?? "")}
                </b>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-success-light shadow-md rounded-full w-3 h-3" />

              <span className="hidden sm:flex">Online</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="mr-2 p-6 pb-15 h-120 overflow-y-auto">
              <ul className="flex flex-col gap-5">
                {chatMessages.map(({ message, timestamp, direction, id }) => (
                  <ChatMessage
                    key={id}
                    message={message}
                    timestamp={timestamp}
                    direction={direction}
                    mentalName={captalize(selectedMental?.name ?? "")}
                    MentalIcon={SelectedMentalIcon}
                    mentalIconColor={selectedMentalColor}
                  />
                ))}
              </ul>

              {userMessageLoading && (
                <div className="relative flex flex-col items-center gap-1 bg-gray-7 shadow-md mt-5 ml-auto py-3 rounded-3xl w-15 max-w-[70%]">
                  <Loading className="w-4 h-4" color="text-light" />
                </div>
              )}

              {botMessageLoading && (
                <div
                  className={`relative flex flex-col items-center gap-1 shadow-md mt-5 mr-auto py-3 rounded-3xl w-15 max-w-[70%] ${selectedMentalBackground}`}
                >
                  <Loading className="w-4 h-4" color={selectedMentalColor} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {chatOptions && !botMessageLoading && !userMessageLoading && (
              <div className="px-6 w-full overflow-hidden">
                <ul className="flex gap-2 pb-2 w-full overflow-x-auto text-xs">
                  {chatOptions.allowMultiple && !!selectedOptions.length && (
                    <li
                      onClick={(e) => {
                        e.preventDefault();

                        handleSendMessage(selectedOptions as any);
                      }}
                      title="Enviar opções selecionadas"
                      className="right-1/3 bottom-5 absolute flex justify-center items-center bg-success-light hover:bg-success active:bg-success/70 shadow-md rounded-full w-10 h-10 transition-all -translate-x-1/3 duration-300 cursor-pointer"
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

                  {!!chatOptions.options &&
                    chatOptions.options.map((option, i) => (
                      <li
                        key={`${option.id}-${i}`}
                        title={option.description ?? option.title}
                        onClick={() => {
                          if (userMessageLoading) return;
                          if (chatOptions.allowMultiple)
                            if (
                              selectedOptions
                                .map(({ id }) => id)
                                .includes(option.id)
                            )
                              setSelectedOptions(
                                selectedOptions.filter(
                                  (selectedOption) =>
                                    selectedOption.id !== option.id
                                )
                              );
                            else
                              setSelectedOptions([...selectedOptions, option]);
                          else setSelectedOptions([option]);
                        }}
                        className={`shadow-md p-2 border-2 rounded-full whitespace-nowrap cursor-pointer ${selectedOptions.map(({ id }) => id).includes(option.id) ? "bg-primary border-primary text-light" : "bg-transparent border-secondary/30 text-primary"}`}
                      >
                        <button
                          type="button"
                          tabIndex={-1}
                          className="outline-none cursor-pointer"
                        >
                          {option.emoji} {option.title}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 p-6 border-secondary/30 border-t-2">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                name="message"
                ref={inputRef}
                title={
                  !!chatOptions?.options?.length && !chatOptions.chatUnlocked
                    ? "Selecione uma opção"
                    : "Digite sua pergunta"
                }
                placeholder={
                  !!chatOptions?.options?.length && !chatOptions.chatUnlocked
                    ? "Selecione uma opção..."
                    : "Digite sua pergunta..."
                }
                autoComplete="off"
                autoCapitalize="on"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={
                  (!!chatOptions?.options?.length &&
                    !chatOptions?.chatUnlocked) ||
                  userMessageLoading ||
                  botMessageLoading
                }
                className="disabled:bg-foreground/20 p-2 px-4 border-2 border-secondary/30 disabled:border-foreground/10 rounded-md outline-none w-full disabled:placeholder:text-foreground/60 transition-all duration-300"
              />

              <button
                type="submit"
                tabIndex={-1}
                title="Enviar pergunta"
                disabled={userMessageLoading && !message.trim()}
                className="bg-primary/70 hover:bg-primary active:bg-primary/70 disabled:bg-gray-7 p-3 rounded-md transition-all duration-300 cursor-pointer disabled:cursor-default"
              >
                <FaPaperPlane className="text-light" size={20} />
              </button>
            </form>

            <span
              title="Pressione Enter ou clique no botão para enviar"
              className="text-foreground/60 text-xs text-center sm:text-start"
            >
              Pressione Enter ou clique no botão para enviar.
            </span>
          </div>
        </div>

        <div className="gap-6 order-last lg:order-first grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:col-span-2 h-fit">
          <div
            title="Mentores Disponíveis"
            className="flex flex-col gap-6 p-6 border-2 border-secondary/30 rounded-xl h-fit select-none"
          >
            <div className="flex justify-center sm:justify-start items-center gap-3 h-fit font-title font-bold text-md sm:text-2xl">
              <RiRobot2Line className="text-primary" size={25} />

              <h3>Mentores Disponíveis</h3>
            </div>

            <ul className="flex flex-col gap-3 lg:pr-2 lg:max-h-80 lg:overflow-y-auto">
              {chatMentals.map((mental) => {
                const { id, name, category, icon, disabled } = mental;
                const { Icon, color } = icon;

                const background = `${color.replace("text-", "bg-")}/10`;

                const selected = Boolean(selectedMental?.id === id);

                return (
                  <li
                    key={`chat-mental-${id}`}
                    title={
                      disabled
                        ? "Desbloqueado em breve"
                        : selected
                          ? "Mentor selecionado"
                          : captalize(name)
                    }
                    onClick={() => {
                      if (disabled || selected) return;

                      setSelectedMental(mental);
                    }}
                    className={`flex justify-between items-center p-6 border-2 rounded-2xl ${!disabled ? (selected ? "cursor-default border-primary" : "cursor-pointer border-secondary/30") : "cursor-default border-gray-7/30"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-xl ${disabled ? "bg-gray-7/10" : background}`}
                      >
                        {disabled ? (
                          <BiSolidLock className="text-gray-7" size={22} />
                        ) : (
                          <Icon className={color} size={22} />
                        )}
                      </div>

                      <div className="flex flex-col font-bold text-lg/normal">
                        <b className={disabled ? "text-gray-7" : ""}>
                          {disabled ? "Desbloqueado em breve" : captalize(name)}
                        </b>

                        <span
                          title={captalize(category)}
                          className={`text-foreground/60 text-sm ${disabled ? "text-gray-7/40" : ""}`}
                        >
                          {captalize(category, true)}
                        </span>
                      </div>
                    </div>

                    {!disabled && (
                      <div className="bg-success-light shadow-md rounded-full w-2.5 h-2.5" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            title="Sobre o Mentor"
            className="flex flex-col gap-6 p-6 border-2 border-secondary/30 rounded-xl h-fit select-none"
          >
            <div className="flex justify-center sm:justify-start items-center gap-3 font-title font-bold text-xl sm:text-2xl">
              <PiMedal className="text-warning" size={25} />

              <h3>Sobre o Mentor</h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center gap-3">
                <div
                  title={captalize(selectedMental?.name ?? "")}
                  className={`flex w-fit p-3 rounded-full ${selectedMentalBackground}`}
                >
                  {!!SelectedMentalIcon && (
                    <SelectedMentalIcon className="text-primary" size={35} />
                  )}
                </div>

                <div className="flex flex-col items-center text-center">
                  <b
                    title={`${captalize(selectedMental?.name ?? "")} - ${captalize(selectedMental?.category ?? "")}`}
                    className="font-bold text-xl"
                  >
                    {captalize(selectedMental?.name ?? "")}
                    {` - ${captalize(selectedMental?.category ?? "")}`}
                  </b>

                  <span className="text-foreground/60">
                    {captalize(selectedMental?.details.description ?? "")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2" title="Especialidades">
                <b className="font-bold text-lg">Especialidades:</b>

                <ul className="flex flex-wrap gap-2 pl-2">
                  {selectedMental?.details.specialties.map((specialty, i) => (
                    <li
                      key={`mentor-specialty-${specialty}-${i}`}
                      title={captalize(specialty)}
                      className="bg-secondary/30 px-3 rounded-full text-primary"
                    >
                      <span>{captalize(specialty)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Client;
