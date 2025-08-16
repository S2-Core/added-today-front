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
  color = "var(--secondary)",
}: IProps) => {
  return (
    <div className={`flex justify-center items-center ${className ?? ""}`}>
      <div className="loader" style={{ width: `${size}px`, color }} />
    </div>
  );
};

export default Loading;
