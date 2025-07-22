"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbArrowBackUp } from "react-icons/tb";
import { MdImageSearch } from "react-icons/md";

import { MentalsContext } from "@/contexts/mentals";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";

import updateMentalSchema from "@/validators/mentals/update.validator";

import { IUpdateMental, IMental } from "@/contexts/mentals/interfaces";

const EditMental = () => {
  const { id } = useParams();

  const { mentals, handleUpdateMental } = useContext(MentalsContext);

  const [mental, setMental] = useState<IMental | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Partial<IUpdateMental>>({
    mode: "onChange",
    resolver: yupResolver(updateMentalSchema),
  });

  useEffect(() => {
    if (mentals) {
      const foundedMental = mentals.find((mental) => mental.slug === id);

      if (foundedMental) setMental(foundedMental);
    }
  }, [mentals]);

  useEffect(() => {
    handleInitialValues();
  }, [mental]);

  const handleInitialValues = () => {
    if (mental) {
      setValue("title", mental.title);
      setValue("theme", mental.theme);
    }
  };

  if (!mental) return <></>;

  return (
    <Container Tag="main" className="gap-10 grid grid-cols-1 mt-15">
      <Link
        href="/mentals"
        title="Voltar para o gerenciamento de Mentals"
        tabIndex={-1}
        className="top-5 left-5 z-9 fixed hover:bg-gray-3 p-2 rounded-full text-light hover:text-secondary active:text-primary text-4xl transition-all duration-300 cursor-pointer"
      >
        <TbArrowBackUp />
      </Link>

      <Form
        onSubmit={handleSubmit((data) => handleUpdateMental(data, mental.id))}
        className="flex flex-col"
      >
        <div className="items-center gap-5 grid md:grid-cols-[auto_1fr_1fr]">
          <figure className="group relative flex justify-center justify-self-center items-center row-span-3 bg-gray-3 shadow-md rounded-xl w-full max-w-full lg:max-w-xs min-h-100 md:min-h-80 lg:min-h-100 overflow-hidden">
            <div
              title="Alterar imagem"
              className="top-0 left-0 z-99 absolute flex justify-center items-center bg-dark/50 md:bg-dark/0 md:group-hover:bg-dark/50 opacity-100 md:group-hover:opacity-100 md:opacity-0 w-full h-full transition-all duration-300 cursor-pointer"
            >
              <input
                type="file"
                accept="image/*"
                multiple={false}
                onChange={(e) => console.log(e.target.files)}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              />

              <div className="flex flex-col justify-center items-center gap-2">
                <MdImageSearch
                  size={50}
                  className="z-10 text-white pointer-events-none"
                />

                <p>Alterar Imagem</p>
              </div>
            </div>

            <Image
              src={
                !mental.imageUrl || mental.imageUrl.trim() === ""
                  ? "/defaults/mentals.png"
                  : mental.imageUrl
              }
              width={257}
              height={257}
              priority
              alt={`Imagem de ${mental.title}`}
              className="rounded w-full object-cover aspect-square"
            />

            <figcaption className="hidden">{`Imagem de ${mental.title}`}</figcaption>
          </figure>

          <Input
            name="title"
            label="Nome do Mental"
            placeholder="Digite o nome do Mental"
            register={register}
            errors={errors}
          />

          <Input
            name="theme"
            label="Tema do Mental"
            placeholder="Digite o thema do Mental"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex md:flex-row flex-col md:justify-end gap-5 w-full">
          <button
            type="submit"
            tabIndex={-1}
            className="bg-secondary hover:bg-primary active:bg-primary/50 mt-5 px-7 py-2 rounded w-full md:w-fit text-light transition-all duration-300 cursor-pointer"
          >
            Salvar Edição
          </button>

          <button
            type="button"
            tabIndex={-1}
            onClick={handleInitialValues}
            className="hover:bg-gray-3 active:bg-gray-3/50 mt-5 px-7 py-2 border-1 rounded w-full md:w-fit text-light transition-all duration-300 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default EditMental;
