"use client";

import { strToColor } from "@/utils/color.utils";
import { shortUsername } from "@/utils/string.utils";

interface IProps {
  username: string;
  isActive?: boolean;
  className?: string;
}

const UserBubble = ({ isActive = true, className = "", username }: IProps) => {
  return (
    <div
      className={`flex justify-center items-center text-light rounded-full w-full h-full font-bold ${className}`}
      style={{
        backgroundColor: !isActive ? "var(--gray-6)" : strToColor(username),
        color: !isActive ? "var(--gray-2)" : "var(--light)",
      }}
    >
      {shortUsername(username)}
    </div>
  );
};

export default UserBubble;
