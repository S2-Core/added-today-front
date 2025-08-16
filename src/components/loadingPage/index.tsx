"use client";

import Loading from "../loading";

import { generateRandomNumbers } from "@/utils/number.utils";

const LoadingPageComponent = () => {
  const [ramdomNumber] = generateRandomNumbers(1, 3);

  return (
    <div className="top-0 left-0 z-9999 fixed flex justify-center items-center bg-background w-full h-full">
      <Loading
        color={`var(--${ramdomNumber === 1 ? "tertiary" : ramdomNumber === 2 ? "secondary" : "primary"})`}
      />
    </div>
  );
};

export default LoadingPageComponent;
