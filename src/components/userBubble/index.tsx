"use client";

import { strToColor } from "@/utils/color.utils";
import { shortUsername } from "@/utils/string.utls";

interface IProps {
  username: string;
  isActive?: boolean;
}

const UserBubble = ({ isActive = true, username }: IProps) => {
  return (
    <div
      className="flex justify-center items-center bg-gray-3 rounded-full w-full h-full font-bold text-light sm:text-2xl text-5xl lg:text-5xl"
      style={{
        backgroundColor: !isActive ? "var(--gray-4)" : strToColor(username),
        color: !isActive ? "var(--gray-3)" : "var(--light)",
      }}
    >
      {shortUsername(username)}
    </div>
  );
};

export default UserBubble;
