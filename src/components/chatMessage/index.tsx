"use client";

import { formatDate } from "@/utils/date.utils";

import { IUserMessage } from "@/contexts/users/interfaces";
import { MessageDirection } from "@/constants/chat";

type IProps = Omit<IUserMessage, "id">;

const ChatMessage = ({ message, date, direction }: IProps) => {
  return (
    <li title={message} className="flex flex-col justify-center gap-2">
      {direction === MessageDirection.USER ? (
        <div
          className={
            "relative flex flex-col gap-1 py-2 px-4 rounded-3xl shadow-md w-fit max-w-[70%] ml-auto bg-gray-3/50"
          }
        >
          <p className="w-fit max-w-full text-sm break-words whitespace-normal">
            {message}
          </p>

          <span className="self-end w-fit font-medium text-[10px] text-gray-7 select-none">
            {formatDate(date, { getHours: true, getMinutes: true })}
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <p
            title={message}
            className="w-fit max-w-full text-sm break-words whitespace-normal"
          >
            {message}
          </p>

          <span className="w-fit font-medium text-[10px] text-gray-7">
            {formatDate(date, { getHours: true, getMinutes: true })}
          </span>
        </div>
      )}
    </li>
  );
};

export default ChatMessage;
