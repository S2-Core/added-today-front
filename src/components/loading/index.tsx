"use client";

import "./animation.css";

interface IProps {
  className?: string;
  size?: number;
  color?: string;
}

const Loading = ({
  className = "",
  size = 30,
  color = "text-primary",
}: IProps) => {
  return (
    <div
      className={`flex justify-center items-center ${className ?? ""} ${color}`}
    >
      <div
        className="loader"
        style={{
          width: `${size}px`,
        }}
      />
    </div>
  );
};

export default Loading;
