"use client";

import { FieldValues } from "react-hook-form";

import { IProps } from "./interfaces";

const Select = <T extends FieldValues>({
  name,
  label,
  errors,
  register,
  className,
  items,
  ...rest
}: IProps<T>) => {
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="font-medium text-sm">
          {label}
        </label>
      )}

      <select
        id={name}
        {...register(name)}
        {...rest}
        defaultValue=""
        className={`border w-full rounded-md px-3 py-2 outline-none transition cursor-pointer ${
          error ? "border-red-500" : "border-light"
        } ${className ?? ""}`}
      >
        <option value="" disabled hidden>
          Selecione o {label}
        </option>

        {items.map(({ label, value }) => (
          <option key={value} value={value} className="bg-gray-2">
            {label}
          </option>
        ))}
      </select>

      <span className={`text-xs text-red-500 ${!error && "opacity-0"}`}>
        {error ?? "Null"}
      </span>
    </div>
  );
};

export default Select;
