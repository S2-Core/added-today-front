"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FieldValues, Path, PathValue } from "react-hook-form";
import { MdImageSearch } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

import Form from "../form";
import Input from "../input";

import { fileToBase64 } from "@/utils/image.utils";

import { IProps } from "./interfaces";
import Select from "../select";
import InputTags from "../inputTags";

const Register = <T extends FieldValues>({
  createForm,
  inputs,
  tagInputs,
  selects,
  tab,
  type,
  defaultImage,
  handleCreate,
}: IProps<T>) => {
  const checkboxes = inputs?.filter((input) => input.type === "checkbox");

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = createForm;

  const images: File[] | null = watch("imageUrl" as Path<T>);

  const [imageBase64, setImageBase64] = useState<string>(defaultImage || "");

  useEffect(() => {
    handleReset();
  }, [tab]);

  useEffect(() => {
    if (images) {
      if (images.length) {
        const image = images[0];

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

  const handleBase64Image = async (file: File) => {
    try {
      setImageBase64(await fileToBase64(file));

      return;
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveImage = () => {
    if (defaultImage) setImageBase64(defaultImage);

    setValue("imageUrl" as Path<T>, null as PathValue<T, Path<T>>);
  };

  const handleReset = async () => {
    handleRemoveImage();

    reset();
  };

  return (
    <Form
      onSubmit={handleSubmit(handleCreate)}
      id={tab}
      className="flex flex-col gap-5"
    >
      <div
        className={`items-center gap-5 w-full grid md:${type === "Mental" ? "grid-cols-[auto_1fr_1fr]" : "grid-cols-3"}`}
      >
        {type === "Mental" && (
          <figure className="group relative flex justify-center justify-self-center items-center row-span-3 bg-gray-4 shadow-md rounded-xl w-full max-w-full lg:max-w-xs min-h-100 md:min-h-80 lg:min-h-100 overflow-hidden">
            {imageBase64 !== defaultImage && imageBase64 && (
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
                title="Definir imagem"
                className="top-0 left-0 z-99 absolute flex justify-center items-center bg-dark/50 md:bg-dark/0 md:group-hover:bg-dark/50 opacity-100 md:group-hover:opacity-100 md:opacity-0 w-full h-full transition-all duration-300 cursor-pointer"
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  {...register("imageUrl" as Path<T>)}
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />

                <div className="flex flex-col justify-center items-center gap-2">
                  <MdImageSearch
                    size={50}
                    className="z-10 text-white pointer-events-none"
                  />

                  <p className="text-light">Definir Imagem</p>
                </div>
              </div>

              <Image
                src={imageBase64}
                width={257}
                height={257}
                alt={`Imagem do ${type}`}
                className="rounded w-full object-cover aspect-square"
              />

              <figcaption className="hidden">Imagem do {type}</figcaption>
            </div>
          </figure>
        )}

        {!!inputs?.filter((input) => input.type !== "checkbox").length &&
          inputs
            .filter((input) => input.type !== "checkbox")
            .map(
              (
                {
                  name,
                  label,
                  placeholder,
                  type,
                  className,
                  hide,
                  required,
                  step,
                },
                i
              ) => (
                <Input
                  key={`${i}-${name}-${label}-${placeholder}-${type}-${hide}-${required}-input`}
                  form={tab}
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  register={register}
                  errors={errors}
                  type={type}
                  className={className}
                  hide={hide}
                  required={required}
                  step={step}
                />
              )
            )}

        {!!selects?.length &&
          selects.map(({ name, label, items, className, required }, i) => (
            <Select
              key={`${i}-${name}-${label}-${items.reduce((acc, { label, value }) => acc + `${label}:${value}`, "")}-${required}-select`}
              name={name}
              label={label}
              items={items}
              register={register}
              control={control}
              errors={errors}
              className={className}
              form={tab}
              required={required}
            />
          ))}
      </div>

      {!!tagInputs?.length &&
        tagInputs.map(
          ({ name, label, placeholder, className, required }, i) => (
            <InputTags
              key={`${i}-${name}-${label}-${placeholder}-${required}-tagInput`}
              form={tab}
              name={name}
              label={label}
              placeholder={placeholder}
              control={control}
              errors={errors}
              className={className}
              required={required}
            />
          )
        )}

      {!!checkboxes?.length &&
        checkboxes.map(({ name, label, className, type, required }, i) => (
          <Input
            key={`${i}-${name}-${label}-${type}-${required}-checkbox`}
            form={tab}
            name={name}
            label={label}
            register={register}
            errors={errors}
            type={type}
            className={className}
            required={required}
          />
        ))}

      <div className="flex md:flex-row flex-col md:justify-end gap-5 w-full">
        <button
          type="submit"
          form={tab}
          tabIndex={-1}
          title={`Criar ${type}`}
          disabled={!!Object.keys(errors).length}
          className="bg-tertiary hover:bg-primary active:bg-primary/70 disabled:bg-error disabled:opacity-50 px-7 py-2 rounded w-full md:w-fit text-light transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
        >
          Criar {type}
        </button>

        <button
          type="button"
          tabIndex={-1}
          title="Limpar campos"
          onClick={handleReset}
          className="hover:bg-gray-3 active:bg-gray-3/50 px-7 py-2 border-1 border-foreground rounded w-full md:w-fit text-foreground transition-all duration-300 cursor-pointer"
        >
          Limpar campos
        </button>
      </div>
    </Form>
  );
};

export default Register;
