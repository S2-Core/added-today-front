"use client";

import { InputHTMLAttributes, useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

interface IProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label: string;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  hide?: boolean;
}

const Input = <T extends FieldValues>({
  name,
  label,
  errors,
  register,
  type = "text",
  hide = true,
  className,
  title,
  ...rest
}: IProps<T>) => {
  title = title ?? rest.placeholder;

  const error = errors[name]?.message as string | undefined;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div title={title} className="flex flex-col gap-1 w-full">
      {type === "checkbox" ? (
        <label className="flex items-center gap-2 w-fit font-medium text-sm">
          {label}

          <input
            id={name}
            type="checkbox"
            {...register(name)}
            {...rest}
            className={`w-4 h-4 accent-primary cursor-pointer ${
              className ?? ""
            } ${error ? "border-red-500" : ""}`}
          />
        </label>
      ) : (
        <>
          {label && (
            <label htmlFor={name} className="font-medium text-sm">
              {label}
            </label>
          )}

          <div className="relative">
            <input
              id={name}
              type={
                type === "password" && hide
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              min={type === "number" ? 0 : undefined}
              {...register(name)}
              {...rest}
              className={`border w-full rounded-md px-3 py-2 outline-none transition ${
                error ? "border-red-500" : "border-light"
              } ${className ?? ""}`}
            />

            {type === "password" && hide && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="top-1/2 right-3 absolute text-light text-xl -translate-y-1/2 cursor-pointer"
              >
                {!showPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            )}
          </div>

          <span className={`text-xs text-red-500 ${!error && "opacity-0"}`}>
            {error ?? "Null"}
          </span>
        </>
      )}
    </div>
  );
};

export default Input;
