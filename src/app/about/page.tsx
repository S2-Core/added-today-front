import { Metadata, Viewport } from "next";

import Client from "./_client";

import { aboutMetadata, layoutViewport } from "@/constants/metadata";

export const metadata: Metadata = aboutMetadata;
export const viewport: Viewport = layoutViewport;

const About = () => {
  return <Client />;
};

export default About;
