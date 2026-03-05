import { Metadata, Viewport } from "next";

import Client from "./_client";

import { layoutViewport, profileMetadata } from "@/constants/metadata";

export const metadata: Metadata = profileMetadata;
export const viewport: Viewport = layoutViewport;

const Profile = () => {
  return <Client />;
};

export default Profile;
