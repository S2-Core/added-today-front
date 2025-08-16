"use client";

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
      {direction === MessageDirection.USER ? (
        <div
          className={
            "relative flex flex-col gap-1 py-2 px-4 rounded-3xl shadow-md w-fit max-w-[70%] ml-auto bg-gray-3/50"
          }
        >
          <p className="w-fit max-w-full text-sm break-words whitespace-pre-line">
            {message}
          </p>

          <span className="self-end w-fit font-medium text-[10px] text-gray-7 select-none">
            {captalize(
              formatDate(new Date(timestamp), {
                getHours: true,
                getMinutes: true,
              })
            )}
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <p
            title={message}
            className="w-fit max-w-full text-sm break-words whitespace-pre-line"
          >
            {message}
          </p>

          <span className="w-fit font-medium text-[10px] text-gray-7">
            {captalize(
              formatDate(new Date(timestamp), {
                getHours: true,
                getMinutes: true,
              })
            )}
          </span>
        </div>
      )}
    </li>
  );
};

export default ChatMessage;
