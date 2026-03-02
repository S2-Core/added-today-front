import { Metadata, Viewport } from "next";

import Client from "./_client";

import { layoutViewport, registerMetadata } from "@/constants/metadata";

export const metadata: Metadata = registerMetadata;
export const viewport: Viewport = layoutViewport;

const Rigister = () => {
  return <Client />;
};

export default Rigister;
