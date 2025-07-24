"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TbArrowBackUp } from "react-icons/tb";
import { MdImageSearch } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

import { MentalsContext } from "@/contexts/mentals";

import Container from "@/components/container";
import Form from "@/components/form";
import Input from "@/components/input";
import Select from "@/components/select";

import updateMentalSchema from "@/validators/mentals/update.validator";

import { mentalStatusItems, mentalTypeItems } from "@/constants/mentals";

import { base64ToFile, fileToBase64 } from "@/utils/image.utils";

import { safeCast } from "@/types";

import { IUpdateMental, IMental } from "@/contexts/mentals/interfaces";

const EditMental = () => {
  const { id } = useParams();
  const defaultImage = "/images/defaults/mentals.png";

  const { mentals, handleUpdateMental } = useContext(MentalsContext);

  const [mental, setMental] = useState<IMental | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(defaultImage);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Partial<IUpdateMental>>({
    mode: "onChange",
    resolver: yupResolver(updateMentalSchema),
  });

  const images = watch("imageUrl");

  useEffect(() => {
    if (mentals) {
      const foundedMental = mentals.find((mental) => mental.slug === id);

      if (foundedMental) setMental(foundedMental);
    }
  }, [mentals]);

  useEffect(() => {
    handleInitialValues();
  }, [mental]);

  useEffect(() => {
    if (images) {
      if (images.length) {
        const image = images[0] as File;

        if (image.size > 5 * 1024 * 1024) {
          toast.error("O tamanho da imagem deve ser menor que 5MB!", {
            id: "image-size",
          });
          return;
        }

        handleBase64Image(image);

        return;
      }

      if (defaultImage) setImageBase64(defaultImage);
    }
  }, [images]);

  const handleBase64Image = async (file?: File) => {
    try {
      if (file) {
        setImageBase64(await fileToBase64(file));

        return;
      }

      setImageBase64(defaultImage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveImage = () => {
    if (defaultImage) setImageBase64(defaultImage);

    setValue("imageUrl", null);
  };

  const handleInitialValues = () => {
    if (mental) {
      setValue("title", mental.title);
      setValue("theme", mental.theme);
      setValue("status", mental.status);
      setValue("type", mental.type);
      setValue("creatorEditable", mental.creatorEditable);

      setValue(
        "imageUrl",
        mental.imageUrl !== null
          ? [base64ToFile(mental.imageUrl as string)]
          : mental.imageUrl
      );
    }
  };

  const handleUpdate = async (data: Partial<IUpdateMental>) => {
    if (mental) {
      const imageUrl = data.imageUrl?.[0] || null;

      (data as Partial<IUpdateMental>).imageUrl = imageUrl
        ? await fileToBase64(imageUrl as File)
        : imageUrl;

      const filteredData = { ...data };

      Object.entries(filteredData).forEach(([key, value]) => {
        const typedKey = key as keyof IUpdateMental;

        if (value === safeCast<IUpdateMental>(mental)[typedKey]) {
          delete safeCast<IUpdateMental>(filteredData)[typedKey];
        }
      });

      await handleUpdateMental(filteredData, mental.id);
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

      <Form onSubmit={handleSubmit(handleUpdate)} className="flex flex-col">
        <div className="items-center gap-5 grid md:grid-cols-[auto_1fr_1fr]">
          <figure className="group relative flex justify-center justify-self-center items-center row-span-3 bg-gray-3 shadow-md rounded-xl w-full max-w-full lg:max-w-xs min-h-100 md:min-h-80 lg:min-h-100 overflow-hidden">
            {images && !!images.length && (
              <button
                type="button"
                title="Remover imagem"
                tabIndex={-1}
                onClick={handleRemoveImage}
                className="top-2 right-2 z-100 absolute hover:bg-gray-4 p-1 rounded-full text-white transition-all duration-300 cursor-pointer"
              >
                <IoClose size={20} />
              </button>
            )}

            <div>
              <div
                title="Alterar imagem"
                className="top-0 left-0 z-99 absolute flex justify-center items-center bg-dark/50 md:bg-dark/0 md:group-hover:bg-dark/50 opacity-100 md:group-hover:opacity-100 md:opacity-0 w-full h-full transition-all duration-300 cursor-pointer"
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  {...register("imageUrl")}
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
                src={imageBase64 as string}
                width={257}
                height={257}
                alt={"Imagem do Mental"}
                className="rounded w-full object-cover aspect-square"
              />

              <figcaption className="hidden">Imagem do Mental</figcaption>
            </div>
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
            placeholder="Digite o tema do Mental"
            register={register}
            errors={errors}
          />

          <Select
            name="status"
            items={mentalStatusItems}
            label="Status do Mental"
            register={register}
            errors={errors}
          />

          <Select
            name="type"
            items={mentalTypeItems}
            label="Tipo do Mental"
            register={register}
            errors={errors}
          />

          <Input
            name="creatorEditable"
            label="Editável pelo Criador"
            type="checkbox"
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
