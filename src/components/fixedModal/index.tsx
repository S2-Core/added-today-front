"use client";

import { ReactNode, useEffect, useRef } from "react";
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
  const DRAG_THRESHOLD_PX = 6;

  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const didDragRef = useRef(false);

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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ("button" in e && e.button !== 0) return;

    startPointRef.current = { x: e.clientX, y: e.clientY };
    didDragRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!startPointRef.current) return;

    const dx = Math.abs(e.clientX - startPointRef.current.x);
    const dy = Math.abs(e.clientY - startPointRef.current.y);

    if (dx > DRAG_THRESHOLD_PX || dy > DRAG_THRESHOLD_PX) {
      didDragRef.current = true;
    }
  };

  const handlePointerUp = () => {
    startPointRef.current = null;
  };

  const handleOverlayClick = () => {
    if (!close) return;

    if (didDragRef.current) return;

    close();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="z-9999 fixed inset-0 flex justify-center items-center bg-dark/30 backdrop-blur-sm p-5 pt-20"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleOverlayClick}
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
          tabIndex={-1}
          className={`flex flex-col gap-5 p-5 max-h-[calc(80vh)] overflow-x-hidden overflow-y-auto ${className ?? ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default FixedModal;
