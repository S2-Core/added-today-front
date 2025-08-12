"use client";

import Loading from "@/components/loading";

const LoadingPage = () => {
  return (
    <div className="top-0 left-0 z-9999 fixed flex justify-center items-center bg-background w-full h-full">
      <Loading />
    </div>
  );
};

export default LoadingPage;
