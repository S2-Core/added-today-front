"use client";

import { useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";

import RequiredDropDown from "../requiredDropDown";

import { IProps } from "./interfaces";

const Input = <T extends FieldValues>({
  name,
  label,
  errors,
  register,
  type = "text",
  hide = true,
  className,
  title,
  required,
  ...rest
}: IProps<T>) => {
  // Title/tooltip padrão vem do placeholder se não for passado
  const resolvedTitle = title ?? rest.placeholder;

  const error = errors[name]?.message as string | undefined;

  const [showPassword, setShowPassword] = useState(false);

  // Mantém referência local + RHF sem duplicar "ref"
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref: rhfRef, ...field } = register(name, {
    valueAsDate: type === "date",
  });
  const mergedRef = (el: HTMLInputElement | null) => {
    rhfRef(el);
    inputRef.current = el;
  };

  const handleOpenCalendar = () => {
    const input = inputRef.current;
    if (!input) return;

    if (typeof (input as any).showPicker === "function") {
      (input as any).showPicker();
      return;
    }
    input.focus();
  };

  // Classes base reutilizáveis
  const baseWrapper =
    "relative rounded-md border transition-colors focus-within:border-tertiary";
  const okWrapperColors = "border-foreground text-foreground";
  const errWrapperColors = `border-error placeholder:text-error/50 ${
    type === "date" ? "text-error focus-within:text-tertiary" : ""
  }`;

  const baseInput =
    "w-full px-3 py-2 outline-none transition placeholder:text-sm";
  const okInputColors =
    "border-foreground text-foreground focus:placeholder:text-tertiary/50";
  const errInputColors = `border-error placeholder:text-error/50 ${
    type === "date" ? "text-error" : ""
  }`;

  return (
    <div title={resolvedTitle} className="flex flex-col gap-1 w-full">
      {type === "checkbox" ? (
        <label className="flex items-center gap-2 w-fit font-medium text-sm">
          {label}
          <input
            id={name}
            type="checkbox"
            aria-invalid={!!error}
            {...register(name)}
            {...rest}
            className={`w-4 h-4 accent-tertiary outline-none cursor-pointer ${
              className ?? ""
            } ${error ? "border-error" : ""}`}
          />
        </label>
      ) : (
        <>
          {label && (
            <label
              htmlFor={name}
              className="flex items-center gap-2 min-w-0 font-medium text-foreground text-sm"
            >
              <span title={label} className="flex-1 w-0 truncate">
                {label}
              </span>
              <RequiredDropDown required={!!required} />
            </label>
          )}

          <div
            className={`${baseWrapper} ${
              error ? errWrapperColors : okWrapperColors
            }`}
          >
            <input
              id={name}
              aria-invalid={!!error}
              type={
                type === "password" && hide
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              min={type === "number" ? 0 : undefined}
              ref={mergedRef}
              {...field}
              {...rest}
              className={`${baseInput} ${
                error ? errInputColors : okInputColors
              } ${className ?? ""}`}
            />

            {type === "date" && (
              <button
                type="button"
                title="Escolher data"
                tabIndex={-1}
                onClick={handleOpenCalendar}
                className="top-1/2 right-3 absolute text-foreground/60 text-xl -translate-y-1/2 cursor-pointer"
              >
                <IoCalendarOutline />
              </button>
            )}

            {type === "password" && hide && (
              <button
                type="button"
                title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="top-1/2 right-3 absolute text-foreground/60 text-xl -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
              </button>
            )}
          </div>

          <span className={`text-xs text-error ${!error && "opacity-0"}`}>
            {error ?? "Null"}
          </span>
        </>
      )}
    </div>
  );
};

export default Input;
