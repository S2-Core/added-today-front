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
  type = "text",
  className,
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

      <input
        id={name}
        type={type}
        className={`border rounded-md px-3 py-2 outline-none transition ${
          error ? "border-red-500" : "border-light"
        } ${className ?? ""}`}
        {...register(name)}
        {...rest}
      />

      <span className={`text-xs text-red-500 ${!error && "opacity-0"}`}>
        {error ?? "Null"}
      </span>
    </div>
  );
};

export default Input;
