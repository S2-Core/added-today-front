"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbArrowBackUp } from "react-icons/tb";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";

import editMentalSchema from "@/validators/mentals/editMental.validator";

import { mentals } from "@/mocks/mentals.mock";

import { IMentals } from "@/contexts/Mentals/interfaces";

const EditMental = () => {
  const [{ id }, navigate] = [useParams(), useRouter()];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IMentals>>({
    mode: "onChange",
    resolver: yupResolver(editMentalSchema),
  });

  const mental = mentals.find(({ slug }) => slug === id);

  if (!mental) return <></>;

  return (
    <Container Tag="main" className="gap-10 grid grid-cols-1 mt-10">
      <Link
        href="/mentals"
        title="Voltar para o gerenciamento de mentals"
        tabIndex={-1}
        className="top-5 left-5 absolute hover:bg-gray-2 p-2 rounded-full text-light hover:text-secondary active:text-primary text-4xl transition-all duration-300 cursor-pointer"
      >
        <TbArrowBackUp />
      </Link>

      <Form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="items-center gap-5 grid md:grid-cols-[auto_1fr_1fr]"
      >
        <figure className="flex justify-center justify-self-center items-center row-span-3 bg-gray-2 rounded-xl w-full min-h-100 md:min-h-90 lg:min-h-120 overflow-hidden cursor-pointer">
          <img
            src={mental.imageUrl}
            alt={`Imagem de ${mental.title}`}
            className="w-full object-cover aspect-square"
          />

          <figcaption className="hidden">{`Imagem de ${mental.title}`}</figcaption>
        </figure>

        <Input
          name="title"
          label="Nome do Mental"
          placeholder="Digite o nome do Mental"
          register={register}
          errors={errors}
          value={mental.title}
        />

        <Input
          name="slug"
          label="Link personalizado"
          placeholder="Digite o link personalizado"
          register={register}
          errors={errors}
          value={mental.slug}
        />
      </Form>
    </Container>
  );
};

export default EditMental;
