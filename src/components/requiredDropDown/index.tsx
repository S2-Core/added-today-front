"use client";

import { BsExclamationCircle } from "react-icons/bs";

const RequiredDropDown = ({ required }: { required: boolean }) => {
  return (
    required && (
      <div className="relative w-max">
        <BsExclamationCircle className="peer text-warning cursor-pointer" />

        <span className="top-[-0.4rem] after:top-full right-[-0.55rem] after:right-3 absolute after:absolute bg-foreground opacity-0 peer-hover:opacity-100 shadow px-2 py-1 after:border-4 after:border-t-foreground after:border-transparent rounded text-light text-xs after:content-[''] transition -translate-y-full">
          Obrigatório
        </span>
      </div>
    )
  );
};

export default RequiredDropDown;
