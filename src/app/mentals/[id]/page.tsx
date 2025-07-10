"use client";

import Container from "@/components/container";

import { useParams } from "next/navigation";

const EditMental = () => {
  const { id } = useParams();

  return <Container Tag={"main"}>{id}</Container>;
};

export default EditMental;
