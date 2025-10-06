"use client";

import Loading from "../loading";

import { generateRandomNumbers } from "@/utils/number.utils";

const LoadingComponent = () => {
  const colors: Record<number, string> = {
    1: "text-primary",
    2: "text-secondary",
    3: "text-tertiary",
    4: "text-success",
    5: "text-success-light",
    6: "text-warning",
    7: "text-error",
  };

  const [ramdomNumber] = generateRandomNumbers(1, Object.keys(colors).length);

  return (
    <Loading
      color={colors[ramdomNumber]}
      className="top-0 left-0 z-9999 fixed flex justify-center items-center bg-background w-full h-full"
    />
  );
};

export default LoadingComponent;
