import { Metadata, Viewport } from "next";

import Client from "./_client";

import { layoutViewport, loginMetadata } from "@/constants/metadata";

export const metadata: Metadata = loginMetadata;
export const viewport: Viewport = layoutViewport;

const Login = () => {
  return <Client />;
};

export default Login;
