import { Metadata, Viewport } from "next";

import Client from "./_client";

import { dashboardMetadata, layoutViewport } from "@/constants/metadata";

export const metadata: Metadata = dashboardMetadata;
export const viewport: Viewport = layoutViewport;

const Dashboard = () => {
  return <Client />;
};

export default Dashboard;
