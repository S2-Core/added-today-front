"use client";

import { createContext } from "react";

import { IOportunitiesContext, IProps } from "./interfaces";

export const OportunitiesContext = createContext({} as IOportunitiesContext);

const OportunitiesProvider = ({ children }: IProps) => {
  return (
    <OportunitiesContext.Provider value={{}}>
      {children}
    </OportunitiesContext.Provider>
  );
};

export default OportunitiesProvider;
