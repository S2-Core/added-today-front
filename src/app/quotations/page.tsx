import { Metadata, Viewport } from "next";

import Client from "./_client";

import { layoutViewport, quotationsMetadata } from "@/constants/metadata";

export const metadata: Metadata = quotationsMetadata;
export const viewport: Viewport = layoutViewport;

const Quotations = () => {
  return <Client />;
};

export default Quotations;
