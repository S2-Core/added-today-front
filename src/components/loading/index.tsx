"use client";

import "./animation.css";

interface IProps {
  className?: string;
  size?: number;
}

const Loading = ({ className = "", size = 30 }: IProps) => {
  return (
    <div className={`flex justify-center items-center ${className ?? ""}`}>
      <div className="loader" style={{ width: `${size}px` }} />
    </div>
  );
};

export default Loading;
