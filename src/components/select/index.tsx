"use client";

import { FieldValues } from "react-hook-form";
import { BsExclamationCircle } from "react-icons/bs";

import { IProps } from "./interfaces";

const Select = <T extends FieldValues>({
  name,
  label,
  errors,
  register,
  className,
  items,
  title,
  required,
  ...rest
}: IProps<T>) => {
  title = title ?? label;

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="flex items-center gap-2 font-medium text-foreground text-sm"
        >
          {label}

          {required && (
            <div className="relative w-max">
              <BsExclamationCircle className="peer text-warning cursor-pointer" />

              <span className="top-[-0.4rem] after:top-full left-[-0.55rem] after:left-3 absolute after:absolute bg-gray-3 opacity-0 peer-hover:opacity-100 shadow px-2 py-1 after:border-4 after:border-t-gray-3 after:border-transparent rounded text-xs after:content-[''] transition -translate-y-full">
                Obrigatório
              </span>
            </div>
          )}
        </label>
      )}

      <select
        id={name}
        defaultValue=""
        title={title}
        {...register(name)}
        {...rest}
        className={`border w-full rounded-md px-3 py-2 text-sm outline-none focus:border-tertiary focus:text-tertiary transition cursor-pointer ${error ? "border-error text-error" : "border-foreground text-foreground"} ${className ?? ""}`}
      >
        <option value="" disabled hidden>
          Selecione o {label}
        </option>

        {items.map(({ label, value }, i) => (
          <option
            key={`${i}-${label}-${value}`}
            value={value}
            className="bg-background text-foreground"
          >
            {label}
          </option>
        ))}
      </select>

      <span className={`text-xs text-error ${!error && "opacity-0"}`}>
        {error ?? "Null"}
      </span>
    </div>
  );
};

export default Select;
