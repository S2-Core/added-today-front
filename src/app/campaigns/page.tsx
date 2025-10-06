import { Metadata, Viewport } from "next";

import Client from "./_client";

import { layoutViewport, oportunitiesMetadata } from "@/constants/metadata";

export const metadata: Metadata = oportunitiesMetadata;
export const viewport: Viewport = layoutViewport;

const Campaigns = () => {
  return <Client />;
};

export default Campaigns;
