import { Metadata, Viewport } from "next";

import Client from "./_client";

import { layoutViewport, plansMetadata } from "@/constants/metadata";

export const metadata: Metadata = plansMetadata;
export const viewport: Viewport = layoutViewport;

const Plans = () => {
  return <Client />;
};

export default Plans;
