"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { FaPaperPlane } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import { PiMedal } from "react-icons/pi";
import { BiSolidLock } from "react-icons/bi";

import { useAuth, useChat } from "@/contexts";

import Container from "@/components/container";
import ChatMessage from "@/components/chatMessage";
import Loading from "@/components/loading";
import NavigationTabs from "@/components/navigationTabs";

import { chatMentals } from "@/constants/chat";
import { IChatMental } from "@/constants/chat/interface";
import { captalize } from "@/utils/string.utils";

const Client = () => {
  const messagesEndRef = useRef<HTMLLIElement | null>(null);
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
  const [message, setMessage] = useState<string>("");
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);

  useEffect(() => {
    if (scrollEnabled)
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, userMessageLoading, botMessageLoading, scrollEnabled]);

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

  return (
    <Container Tag="main" className="flex flex-col gap-6 my-5">
      <NavigationTabs />

      <motion.section
        className="gap-6 grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* BLOCO PRINCIPAL DO CHAT */}
        <motion.div
          className="order-first lg:order-last lg:col-span-3 xl:col-span-4 border-2 border-secondary/30 rounded-xl select-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* CABEÇALHO */}
          <motion.div
            className="flex justify-between items-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
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
                  title={`${captalize(selectedMental?.name ?? "")} - ${captalize(
                    selectedMental?.category ?? ""
                  )}`}
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
              <motion.div
                className="bg-success-light shadow-md rounded-full w-3 h-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
              />
              <span className="hidden sm:flex">Online</span>
            </div>
          </motion.div>

          {/* MENSAGENS */}
          {!token || !loggedUser || !sessionId || !chatMessages ? (
            <Loading className="h-120" />
          ) : (
            <motion.div
              className="flex flex-col gap-2"
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.ul
                className="flex flex-col gap-5 mr-2 p-6 pb-15 h-120 overflow-y-auto"
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                }}
              >
                {chatMessages.map(({ message, timestamp, direction, id }) => (
                  <motion.li
                    key={id}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    onAnimationComplete={() => setScrollEnabled(true)}
                  >
                    <ChatMessage
                      message={message}
                      timestamp={timestamp}
                      direction={direction}
                      mentalName={captalize(selectedMental?.name ?? "")}
                      MentalIcon={SelectedMentalIcon}
                      mentalIconColor={selectedMentalColor}
                    />
                  </motion.li>
                ))}

                {userMessageLoading && (
                  <motion.li
                    className="relative flex flex-col items-center gap-1 bg-gray-7 shadow-md mt-5 ml-auto py-3 rounded-3xl w-15 max-w-[70%]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Loading className="w-4 h-4" color="text-light" />
                  </motion.li>
                )}

                {botMessageLoading && (
                  <motion.li
                    className={`relative flex flex-col items-center gap-1 shadow-md mt-5 mr-auto py-3 rounded-3xl w-15 max-w-[70%] ${selectedMentalBackground}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Loading className="w-4 h-4" color={selectedMentalColor} />
                  </motion.li>
                )}

                <li ref={messagesEndRef} />
              </motion.ul>
            </motion.div>
          )}

          {/* OPÇÕES */}
          {chatOptions && !botMessageLoading && !userMessageLoading && (
            <motion.div
              className="px-6 w-full overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.ul
                className="flex gap-2 pb-2 w-full overflow-x-auto text-xs"
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
              >
                {chatOptions.options.map((option, i) => (
                  <motion.li
                    key={`${option.id}-${i}`}
                    title={option.description ?? option.title}
                    whileHover={{ scale: 1.03 }}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => {
                      if (chatOptions.allowMultiple)
                        setSelectedOptions((prev) =>
                          prev.map(({ id }) => id).includes(option.id)
                            ? prev.filter(({ id }) => id !== option.id)
                            : [...prev, option]
                        );
                      else setSelectedOptions([option]);
                    }}
                    className={`shadow-md p-2 border-2 rounded-full whitespace-nowrap cursor-pointer ${
                      selectedOptions.map(({ id }) => id).includes(option.id)
                        ? "bg-primary border-primary text-light"
                        : "bg-transparent border-secondary/30 text-primary"
                    }`}
                  >
                    {option.emoji} {option.title}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}

          {/* INPUT */}
          <motion.div
            className="flex flex-col gap-3 p-6 border-secondary/30 border-t-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua pergunta..."
                title="Digite sua pergunta"
                autoComplete="off"
                disabled={
                  (!!chatOptions?.options?.length &&
                    !chatOptions?.chatUnlocked) ||
                  userMessageLoading ||
                  botMessageLoading
                }
                className="disabled:bg-foreground/20 p-2 px-4 border-2 border-secondary/30 disabled:border-foreground/10 rounded-md outline-none w-full text-foreground/60 disabled:placeholder:text-foreground/60 transition-all duration-300"
              />
              <button
                type="submit"
                tabIndex={-1}
                title="Enviar mensagem"
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
          </motion.div>
        </motion.div>

        {/* COLUNA LATERAL */}
        <motion.div
          className="gap-6 order-last lg:order-first grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:col-span-2 h-fit"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* MENTORES */}
          <motion.div
            className="flex flex-col gap-6 p-6 border-2 border-secondary/30 rounded-xl h-fit select-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="flex justify-center sm:justify-start items-center gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <RiRobot2Line className="text-primary" size={25} />
              <h3>Mentores Disponíveis</h3>
            </motion.div>

            <motion.ul
              className="flex flex-col gap-3 lg:pr-2 lg:max-h-80 lg:overflow-y-auto"
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {chatMentals.map((mental) => {
                const { id, name, category, icon, disabled } = mental;
                const { Icon, color } = icon;
                const background = `${color.replace("text-", "bg-")}/10`;
                const selected = Boolean(selectedMental?.id === id);

                return (
                  <motion.li
                    key={`chat-mental-${id}`}
                    title={
                      disabled
                        ? "Desbloqueado em breve"
                        : selected
                          ? "Mentor selecionado"
                          : captalize(name)
                    }
                    whileHover={!disabled && !selected ? { scale: 1.03 } : {}}
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                    onClick={() => {
                      if (!disabled && !selected) setSelectedMental(mental);
                    }}
                    className={`flex justify-between items-center p-6 border-2 rounded-2xl ${
                      !disabled
                        ? selected
                          ? "border-primary cursor-default"
                          : "cursor-pointer border-secondary/30"
                        : "cursor-default border-gray-7/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-xl ${
                          disabled ? "bg-gray-7/10" : background
                        }`}
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
                          className={`text-foreground/60 text-sm ${
                            disabled ? "text-gray-7/40" : ""
                          }`}
                        >
                          {captalize(category, true)}
                        </span>
                      </div>
                    </div>

                    {!disabled && (
                      <div className="bg-success-light shadow-md rounded-full w-2.5 h-2.5" />
                    )}
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>

          {/* SOBRE O MENTOR */}
          <motion.div
            className="flex flex-col gap-6 p-6 border-2 border-secondary/30 rounded-xl h-fit select-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="flex justify-center sm:justify-start items-center gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <PiMedal className="text-warning" size={25} />
              <h3>Sobre o Mentor</h3>
            </motion.div>

            <motion.div
              className="flex flex-col gap-3"
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.div
                className="flex flex-col items-center gap-3"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
              >
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
                    title={`${captalize(
                      selectedMental?.name ?? ""
                    )} - ${captalize(selectedMental?.category ?? "")}`}
                    className="font-bold text-xl"
                  >
                    {captalize(selectedMental?.name ?? "")} -{" "}
                    {captalize(selectedMental?.category ?? "")}
                  </b>
                  <span
                    title={captalize(selectedMental?.details.description ?? "")}
                    className="text-foreground/60"
                  >
                    {captalize(selectedMental?.details.description ?? "")}
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col gap-2"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <b className="font-bold text-lg">Especialidades:</b>
                <motion.ul
                  className="flex flex-wrap gap-2 pl-2"
                  initial="hidden"
                  animate="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.05 } },
                  }}
                >
                  {selectedMental?.details.specialties.map((specialty, i) => (
                    <motion.li
                      key={`mentor-specialty-${specialty}-${i}`}
                      title={captalize(specialty)}
                      className="bg-secondary/30 px-3 rounded-full text-primary"
                      variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>{captalize(specialty)}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
    </Container>
  );
};

export default Client;
