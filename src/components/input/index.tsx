"use client";

import { InputHTMLAttributes } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface IProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label?: string;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
}

const Input = <T extends FieldValues>({
  name,
  label,
  errors,
  register,
  ...rest
}: IProps<T>) => {
  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}

      <input
        id={name}
        className={`border rounded-md px-3 py-2 outline-none transition ${
          error ? "border-red-500" : "border-gray-300 focus:border-black"
        }`}
        {...register(name)}
        {...rest}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
