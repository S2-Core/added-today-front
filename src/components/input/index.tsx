"use client";

import { useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import { BsExclamationCircle } from "react-icons/bs";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";

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
  title = title ?? rest.placeholder;

  const error = errors[name]?.message as string | undefined;

  const [showPassword, setShowPassword] = useState(false);

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

    if (typeof input.showPicker === "function") {
      input.showPicker();

      return;
    }

    input.focus();

    return;
  };

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
            className={`w-4 h-4 accent-tertiary outline-none cursor-pointer ${className ?? ""} ${error ? "border-error" : ""}`}
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

          <div
            className={`relative border focus-within:border-tertiary rounded-md ${error ? `border-error placeholder:text-error/50 ${type === "date" ? "text-error focus-within:text-tertiary" : ""}` : "border-foreground text-foreground"}`}
          >
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
              ref={mergedRef}
              {...field}
              {...rest}
              className={`w-full placeholder:text-sm focus-within:placeholder:text-tertiary/50 px-3 py-2 outline-none transition ${error ? `border-error placeholder:text-error/50 ${type === "date" ? "text-error focus-within:text-tertiary" : ""}` : "border-foreground text-foreground"} ${className ?? ""}`}
            />

            {type === "date" && (
              <button
                type="button"
                title={"Escolher data"}
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
                onClick={() => setShowPassword(!showPassword)}
                className="top-1/2 right-3 absolute text-foreground/60 text-xl -translate-y-1/2 cursor-pointer"
              >
                {!showPassword ? <IoIosEyeOff /> : <IoIosEye />}
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
