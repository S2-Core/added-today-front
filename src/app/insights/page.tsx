import { Metadata, Viewport } from "next";

import Client from "./_client";

import { layoutViewport, insightsMetadata } from "@/constants/metadata";

export const metadata: Metadata = insightsMetadata;
export const viewport: Viewport = layoutViewport;

const Insights = () => {
  return <Client />;
};

export default Insights;
