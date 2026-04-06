import { Metadata, Viewport } from "next";

import Client from "./_client";

import { homeMetadata, layoutViewport } from "@/constants/metadata";

export const metadata: Metadata = homeMetadata;
export const viewport: Viewport = layoutViewport;

const Home = () => {
  return <Client />;
};

export default Home;
