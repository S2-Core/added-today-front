"use client";

import Container from "@/components/container";

import { useParams } from "next/navigation";

const EditUser = () => {
  const { id } = useParams();

  return <Container Tag={"main"}>{id}</Container>;
};

export default EditUser;
