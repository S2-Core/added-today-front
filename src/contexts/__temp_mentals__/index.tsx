"use client";

import { createContext } from "react";

import { IMentalsContext, IMentalsProps } from "./interfaces";

export const MentalsContext = createContext({} as IMentalsContext);

const MentalsProvider = ({ children }: IMentalsProps) => {
  return (
    <MentalsContext.Provider value={{}}>{children}</MentalsContext.Provider>
  );
};

export default MentalsProvider;
