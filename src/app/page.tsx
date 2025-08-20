import { Metadata } from "next";

import Client from "./_client";

import { loginMetadata } from "@/constants/metadata";

export const metadata: Metadata = loginMetadata;

const Login = () => {
  return <Client />;
};

export default Login;
