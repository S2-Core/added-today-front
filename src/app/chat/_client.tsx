"use client";

import { SubmitEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { FaPaperPlane } from "react-icons/fa";
import { PiMedal } from "react-icons/pi";
import toast from "react-hot-toast";

import { useAnalytics, useAuth, useBillings, useChat } from "@/contexts";

import Container from "@/components/container";
import ChatMessage from "@/components/chatMessage";
import Loading from "@/components/loading";
import NavigationTabs from "@/components/navigationTabs";
import PlansModal from "@/components/plansModal";

import { ANALYTICS_EVENTS } from "@/lib/analytics/events";
import {
  mapChatPageViewedEventProperties,
  mapChatStartedEventProperties,
  mapChatUserMessageSentEventProperties,
} from "@/lib/analytics";

import { captalize } from "@/utils/string.utils";

import { chatMentals } from "@/constants/chat";
import { planPeriods } from "@/constants/plans";

const Client = () => {
  const path = usePathname();

  const selectedMental = chatMentals.find(
    ({ defaultSelected }) => defaultSelected,
  );

  const messagesEndRef = useRef<HTMLLIElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hasTrackedChatPage = useRef<boolean>(false);
  const hasTrackedChatStarted = useRef<boolean>(false);

  const { trackEvent } = useAnalytics();
  const { allUIPlans } = useBillings();
  const { token, loggedUser, userCurrentPlan, handleFindUserCurrentPlan } =
    useAuth();
  const {
    chatMessages,
    handleSendMessage,
    userMessageLoading,
    botMessageLoading,
    chatOptions,
    setSelectedOptions,
    selectedOptions,
  } = useChat();

  const [message, setMessage] = useState<string>("");
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (hasTrackedChatPage.current) return;

    hasTrackedChatPage.current = true;

    trackEvent(
      ANALYTICS_EVENTS.CHAT_PAGE_VIEWED,
      mapChatPageViewedEventProperties({
        path,
        user: loggedUser,
        userPlan: userCurrentPlan,
      }),
    );
  }, [path, loggedUser, userCurrentPlan]);

  useEffect(() => {
    if (scrollEnabled)
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, userMessageLoading, botMessageLoading, scrollEnabled]);

  useEffect(() => {
    if (!userCurrentPlan) return;

    const entitlement = userCurrentPlan.entitlements.find(
      ({ key }) => key === "LAILA_INTERACTIONS",
    );

    if (entitlement && entitlement.remaining === 0) setOpen(true);
  }, [userCurrentPlan]);

  const handleSubmit = async (
    e: SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const formatedMessage = message.trim();
    if (!formatedMessage) return;

    setMessage("");

    try {
      if (!interactionRemaining) {
        toast.error("Limite de Precificações por dia atingido!", {
          id: "send-message",
        });

        setOpen(true);
      } else {
        trackEvent(
          ANALYTICS_EVENTS.SENDING_CHAT_USER_MESSAGE,
          mapChatUserMessageSentEventProperties({
            path,
            user: loggedUser,
            userPlan: userCurrentPlan,
            messageLength: message.length,
            message,
          }),
        );

        await handleFindUserCurrentPlan();
        await handleSendMessage(formatedMessage);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFirstInteraction = () => {
    if (hasTrackedChatStarted.current) return;

    hasTrackedChatStarted.current = true;

    trackEvent(
      ANALYTICS_EVENTS.CHAT_STARTED,
      mapChatStartedEventProperties(path),
    );
  };

  const { Icon: SelectedMentalIcon, color: selectedMentalColor } =
    selectedMental?.icon ?? {
      SelectedMentalIcon: null,
      selectedMentalColor: null,
    };

  const selectedMentalBackground = `${selectedMentalColor?.replace("text-", "bg-")}/10`;

  if (!userCurrentPlan) return null;

  const { entitlements } = userCurrentPlan;
  const interactionEntitlement = entitlements.find(
    ({ key }) => key === "LAILA_INTERACTIONS",
  );
  const interactionRemaining = interactionEntitlement?.remaining ?? 0;
  const interactionLimit = interactionEntitlement?.limit ?? 0;
  const interactionPeriod = interactionEntitlement?.period ?? null;

  return (
    <>
      <Container Tag="main" className="flex flex-col gap-6 my-5">
        <NavigationTabs subTitle="Um agente de IA para ajudar você a organizar sua rotina como creator." />

        <motion.section
          className="gap-6 grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="order-first lg:order-last lg:col-span-3 xl:col-span-4 border-2 border-secondary/30 rounded-xl select-none"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
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
                    title={captalize(selectedMental?.name ?? "")}
                    className="flex gap-1 text-lg"
                  >
                    {captalize(selectedMental?.name ?? "")}
                  </b>

                  <b
                    title={captalize(selectedMental?.subtitle ?? "")}
                    className="hidden sm:flex w-[90%] text-foreground/60 text-sm"
                  >
                    {captalize(selectedMental?.subtitle ?? "")}
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

            {!token || !loggedUser || !Array.isArray(chatMessages) ? (
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
                  onAnimationComplete={() => setScrollEnabled(true)}
                >
                  {chatMessages.map(({ message, timestamp, direction, id }) => (
                    <li key={id}>
                      <ChatMessage
                        message={message}
                        timestamp={timestamp}
                        direction={direction}
                        mentalName={captalize(selectedMental?.name ?? "")}
                        MentalIcon={SelectedMentalIcon}
                        mentalIconColor={selectedMentalColor}
                      />
                    </li>
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
                      <Loading
                        className="w-4 h-4"
                        color={selectedMentalColor}
                      />
                    </motion.li>
                  )}

                  <li ref={messagesEndRef} />
                </motion.ul>
              </motion.div>
            )}

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
                              : [...prev, option],
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

            <motion.div
              className="flex flex-col gap-3 p-6 border-secondary/30 border-t-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={(e) => handleSubmit(e)} className="flex gap-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={message}
                  onFocus={handleFirstInteraction}
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

              <div className="flex sm:flex-row flex-col-reverse sm:justify-between items-center gap-2 sm:gap-5 w-full text-foreground/60 text-xs text-center sm:text-start">
                <span title="Pressione Enter ou clique no botão para enviar">
                  Pressione Enter ou clique no botão para enviar.
                </span>

                <div className="flex items-center gap-1">
                  {interactionLimit !== null && interactionPeriod !== null ? (
                    <>
                      <span className="text-sm">
                        Interações restantes por
                        {` ${planPeriods[interactionPeriod] ?? interactionPeriod}`}
                        :
                      </span>

                      <span className="text-sm">{interactionRemaining}</span>
                    </>
                  ) : (
                    <span>Ilimitado</span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="gap-6 order-last lg:order-first grid grid-cols-1 lg:grid-cols-1 lg:col-span-2 h-fit"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
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
                <h3>Sobre o agente</h3>
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
                      title={captalize(selectedMental?.name ?? "")}
                      className="font-bold text-xl"
                    >
                      {captalize(selectedMental?.name ?? "")}
                    </b>
                    <span
                      title={captalize(
                        selectedMental?.details.description ?? "",
                      )}
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
                  <b className="font-bold text-lg">
                    Você pode pedir ajuda para:
                  </b>
                  <motion.ul
                    className="flex flex-wrap gap-2 pl-10"
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
                        className="text-primary text-sm list-disc"
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

      <PlansModal
        isOpen={open}
        close={() => setOpen(false)}
        usedFeature="LAILA_INTERACTIONS"
        allUIPlans={(allUIPlans || []).filter(
          ({ isCurrentPlan }) => !isCurrentPlan,
        )}
      />
    </>
  );
};

export default Client;
