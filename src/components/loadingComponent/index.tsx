"use client";

import Loading from "../loading";

import { generateRandomNumbers } from "@/utils/number.utils";

const LoadingComponent = () => {
  const [ramdomNumber] = generateRandomNumbers(1, 3);

  return (
    <Loading
      color={
        ramdomNumber === 1
          ? "text-tertiary"
          : ramdomNumber === 2
            ? "text-secondary"
            : "text-primary"
      }
      className="top-0 left-0 z-9999 fixed flex justify-center items-center bg-background w-full h-full"
    />
  );
};

export default LoadingComponent;
