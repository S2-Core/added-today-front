"use client";

import { IconType } from "react-icons";
import ReactMarkdown from "react-markdown";

import { formatDate } from "@/utils/date.utils";
import { captalize } from "@/utils/string.utils";

import { MessageDirection } from "@/constants/chat";

export interface IProps {
  message: string;
  timestamp: string;
  direction: MessageDirection;
  mentalName: string;
  MentalIcon?: IconType;
  mentalIconColor?: string;
}

const ChatMessage = ({
  message,
  timestamp,
  direction,
  mentalName,
  MentalIcon,
  mentalIconColor,
}: IProps) => {
  const mentalBackgroundColor = `${mentalIconColor?.replace("text-", "bg-")}/10`;

  return (
    <div
      title={
        direction === MessageDirection.USER
          ? "Sua mensagem"
          : `Mensagem de ${mentalName}`
      }
      className="flex items-start gap-3"
    >
      {direction === MessageDirection.BOT && MentalIcon && (
        <div className={`p-2 rounded-full ${mentalBackgroundColor}`}>
          <MentalIcon size={18} className={mentalIconColor} />
        </div>
      )}

      <div
        className={`flex flex-col gap-1 py-2 px-4 rounded-3xl shadow-md w-fit max-w-[70%] ${direction === MessageDirection.USER ? "ml-auto bg-gray-7 text-light items-end" : `mr-auto items-start ${mentalBackgroundColor} ${mentalIconColor}`}`}
      >
        <div className="prose-invert w-fit max-w-full text-sm break-words whitespace-pre-line prose">
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>

        <span className="opacity-70 w-fit font-normal text-[10px] select-none">
          {captalize(
            formatDate(new Date(timestamp), {
              getHours: true,
              getMinutes: true,
            })
          )}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
