import { Metadata, Viewport } from "next";

import Client from "./_client";

import { layoutViewport, campaignsMetadata } from "@/constants/metadata";

export const metadata: Metadata = campaignsMetadata;
export const viewport: Viewport = layoutViewport;

const Campaigns = () => {
  return <Client />;
};

export default Campaigns;
