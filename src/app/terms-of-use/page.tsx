import { Metadata, Viewport } from "next";

import Client from "./_client";

import { layoutViewport, termsOfUseMetadata } from "@/constants/metadata";

export const metadata: Metadata = termsOfUseMetadata;
export const viewport: Viewport = layoutViewport;

const TermsOfService = () => {
  return <Client />;
};

export default TermsOfService;
