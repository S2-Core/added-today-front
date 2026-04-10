"use client";

import { ReactNode, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

interface IProps {
  children: ReactNode;
  isOpen: boolean;
  size?: string;
  close?: () => void;
  className?: string;
  overlayClassName?: string;
  panelClassName?: string;
  contentClassName?: string;
}

const FixedModal = ({
  isOpen,
  close,
  children,
  className = "",
  overlayClassName = "",
  panelClassName = "",
  contentClassName = "",
  size = "28rem",
}: IProps) => {
  const dragThresholdPx = 6;

  const startPointRef = useRef<{ x: number; y: number } | null>(null);
  const didDragRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (close && event.key === "Escape") {
        close();
      }
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

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ("button" in event && event.button !== 0) return;

    startPointRef.current = { x: event.clientX, y: event.clientY };
    didDragRef.current = false;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!startPointRef.current) return;

    const deltaX = Math.abs(event.clientX - startPointRef.current.x);
    const deltaY = Math.abs(event.clientY - startPointRef.current.y);

    if (deltaX > dragThresholdPx || deltaY > dragThresholdPx) {
      didDragRef.current = true;
    }
  };

  const handlePointerUp = () => {
    startPointRef.current = null;
  };

  const handleOverlayClick = () => {
    if (!close || didDragRef.current) return;

    close();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={[
        "fixed inset-0 z-9999 flex items-center justify-center bg-dark/30 p-4 pt-20 backdrop-blur-sm sm:p-5 sm:pt-20",
        overlayClassName,
      ].join(" ")}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleOverlayClick}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={[
          "h-fit w-full overflow-hidden rounded-2xl bg-background text-foreground shadow-md",
          panelClassName,
        ].join(" ")}
        style={{ maxWidth: size }}
      >
        {close && (
          <div className="relative w-full px-5 pt-5 sm:px-6 sm:pt-6">
            <button
              type="button"
              title="Fechar modal"
              onClick={close}
              aria-label="Fechar modal"
              tabIndex={-1}
              className="absolute right-2 top-2 cursor-pointer rounded-full p-1 text-gray-4 transition-all duration-300 hover:bg-gray-3 hover:text-gray-7 active:text-gray-4"
            >
              <IoClose size={24} />
            </button>
          </div>
        )}

        <div
          tabIndex={-1}
          className={[
            "flex max-h-[80vh] flex-col gap-5 overflow-x-hidden overflow-y-auto px-5 pb-5 sm:px-6 sm:pb-6",
            className,
            contentClassName,
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default FixedModal;
