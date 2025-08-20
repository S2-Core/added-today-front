import { Metadata, Viewport } from "next";

import Client from "./_client";

import { layoutViewport, usersMetadata } from "@/constants/metadata";

export const metadata: Metadata = usersMetadata;
export const viewport: Viewport = layoutViewport;

const Users = () => {
  return <Client />;
};

export default Users;
