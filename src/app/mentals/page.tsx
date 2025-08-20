import { Metadata, Viewport } from "next";

import Client from "./_client";

import { layoutViewport, mentalsMetadata } from "@/constants/metadata";

export const metadata: Metadata = mentalsMetadata;
export const viewport: Viewport = layoutViewport;

const Mentals = () => {
  return <Client />;
};

export default Mentals;
