"use client";

import { ReactNode, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface IProps {
  children: ReactNode;
  isOpen: boolean;
  size?: string;
  close?: () => void;
  className?: string;
}

const FixedModal = ({
  isOpen,
  close,
  children,
  className = "",
  size = "28rem",
}: IProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (close && e.key === "Escape") close();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="z-9999 fixed inset-0 flex justify-center items-center bg-dark/30 backdrop-blur-sm p-5 pt-20"
      onClick={() => {
        if (close) close();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          "bg-background rounded-lg text-foreground shadow-md w-full h-fit overflow-hidden max-w-md"
        }
        style={{ maxWidth: size }}
      >
        {close && (
          <div className="relative p-6 w-full">
            <button
              type="button"
              title="Fechar modal"
              onClick={close}
              aria-label="Fechar modal"
              tabIndex={-1}
              className="top-2 right-2 absolute hover:bg-gray-3 p-1 rounded-full text-gray-4 hover:text-gray-7 active:text-gray-4 transition-all duration-300 cursor-pointer"
            >
              <IoClose size={24} />
            </button>
          </div>
        )}

        <div
          className={`flex flex-col gap-5 p-5 max-h-[calc(80vh)] overflow-x-hidden overflow-y-auto ${className ?? ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default FixedModal;
