import { Metadata, Viewport } from "next";

import Client from "./_client";

import { chatMetadata, layoutViewport } from "@/constants/metadata";

export const metadata: Metadata = chatMetadata;
export const viewport: Viewport = layoutViewport;

const Chat = () => {
  return <Client />;
};

export default Chat;
