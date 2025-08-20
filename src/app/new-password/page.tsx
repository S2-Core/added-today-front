import { Metadata, Viewport } from "next";

import Client from "./_client";

import { layoutViewport, newPasswordMetadata } from "@/constants/metadata";

export const metadata: Metadata = newPasswordMetadata;
export const viewport: Viewport = layoutViewport;

const NewPassword = () => {
  return <Client />;
};

export default NewPassword;
