"use client";

import ReactMarkdown from "react-markdown";

import { formatDate } from "@/utils/date.utils";
import { captalize } from "@/utils/string.utils";

import { MessageDirection } from "@/constants/chat";

export interface IProps {
  message: string;
  timestamp: string;
  direction: MessageDirection;
}

const ChatMessage = ({ message, timestamp, direction }: IProps) => {
  return (
    <li title={message} className="flex flex-col justify-center gap-2">
      <div
        className={`flex flex-col gap-1 py-2 px-4 rounded-3xl shadow-md w-fit max-w-[70%] text-light ${direction === MessageDirection.USER ? "ml-auto bg-success-light items-end" : "mr-auto bg-gray-7 items-start"}`}
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
    </li>
  );
};

export default ChatMessage;
