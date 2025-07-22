"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { MdImageSearch } from "react-icons/md";

import Form from "../form";
import Input from "../input";

import { fileToBase64 } from "@/utils/image.utils";

import { ICreateInputs } from "@/types/general";

interface IProps<T extends FieldValues> {
  createForm: UseFormReturn<T, any, T>;
  inputs: ICreateInputs<T>[];
  tab: string;
}

const Register = <T extends FieldValues>({
  createForm,
  inputs,
  tab,
}: IProps<T>) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = createForm;

  const [imageBase64, setImageBase64] = useState<string>(
    "/defaults/mentals.png"
  );

  useEffect(() => {
    handleReset();
  }, [tab]);

  const handleBase64Image = async (file?: File) => {
    try {
      if (file) {
        setImageBase64(await fileToBase64(file));

        return;
      }

      setImageBase64("/defaults/mentals.png");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = async () => {
    setImageBase64("/defaults/mentals.png");

    setValue("imageUrl" as Path<T>, null as PathValue<T, Path<T>>);

    reset();
  };

  return (
    <Form
      onSubmit={handleSubmit((data) => console.log(data))}
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
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setValue(
                    "imageUrl" as Path<T>,
                    file as PathValue<T, Path<T>>
                  );

                  handleBase64Image(file);
                }
              }}
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
            src={imageBase64}
            width={257}
            height={257}
            priority
            alt="Imagem do Mental"
            className="rounded w-full object-cover aspect-square"
          />

          <figcaption className="hidden">Imagem do Mental</figcaption>
        </figure>

        {inputs.map(({ name, label, placeholder }) => (
          <Input
            key={`${name}-${label}-${placeholder}`}
            name={name}
            label={label}
            placeholder={placeholder}
            register={register}
            errors={errors}
          />
        ))}
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
          onClick={handleReset}
          className="hover:bg-gray-3 active:bg-gray-3/50 mt-5 px-7 py-2 border-1 rounded w-full md:w-fit text-light transition-all duration-300 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </Form>
  );
};

export default Register;
