"use client";

import React, {
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEvent,
  KeyboardEventHandler,
  useState,
} from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { IoClose } from "react-icons/io5";

import RequiredDropDown from "../requiredDropDown";

export interface IProps<T extends FieldValues>
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "value"
  > {
  name: Path<T>;
  label: string;
  errors: FieldErrors<T>;
  control: Control<T>;
  initialTags?: string[];
  normalizeTag?: (tag: string) => string;
  dedupeCaseInsensitive?: boolean;
}

const InputTags = <T extends FieldValues>({
  name,
  label,
  errors,
  control,
  className,
  title,
  required,
  initialTags = [],
  normalizeTag,
  dedupeCaseInsensitive = true,
  ...rest
}: IProps<T>) => {
  const computedTitle = title ?? rest.placeholder;

  const error = errors[name]?.message as string | undefined;

  const [inputValue, setInputValue] = useState("");

  const prepare = (raw: string): string => {
    const trimmed = raw.replace(/\s+/g, " ").trim();

    return normalizeTag ? normalizeTag(trimmed) : trimmed;
  };

  const isDuplicate = (list: string[], candidate: string): boolean => {
    if (dedupeCaseInsensitive) {
      const formattedCandidate = candidate.toLowerCase();

      return list.some((tag) => tag.toLowerCase() === formattedCandidate);
    }
    return list.includes(candidate);
  };

  const handleAdd = (
    list: string[],
    raw: string,
    onChange: (tags: string[]) => void
  ) => {
    const tag = prepare(raw);

    if (!tag) return;

    if (!isDuplicate(list, tag)) onChange([...list, tag]);
  };

  const onKeyDown =
    (
      tags: string[],
      onChange: (tags: string[]) => void
    ): KeyboardEventHandler<HTMLInputElement> =>
    (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === ",") {
        e.preventDefault();

        if (inputValue.trim()) {
          handleAdd(tags, inputValue, onChange);

          setInputValue("");
        }
      } else if (e.key === "Backspace" && !inputValue)
        if (tags.length > 0) onChange(tags.slice(0, -1));
    };

  const onBlur =
    (
      tags: string[],
      onChange: (tags: string[]) => void
    ): FocusEventHandler<HTMLInputElement> =>
    () => {
      if (inputValue.trim()) {
        handleAdd(tags, inputValue, onChange);

        setInputValue("");
      }
    };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={
        Array.isArray(initialTags)
          ? (initialTags as PathValue<T, Path<T>>)
          : ([] as PathValue<T, Path<T>>)
      }
      render={({ field }) => {
        const tags: string[] = Array.isArray(field.value) ? field.value : [];

        const onChange = (v: string[]) => field.onChange(v);

        return (
          <div title={computedTitle} className="flex flex-col gap-1 w-full">
            {label && (
              <label
                htmlFor={`${String(name)}-visible-input`}
                className="flex items-center gap-2 font-medium text-sm"
              >
                {label}

                <RequiredDropDown required={!!required} />
              </label>
            )}

            <div
              onClick={() => {
                const input = document.getElementById(
                  `${String(name)}-visible-input`
                );

                input?.focus();
              }}
              className={`w-full overflow-y-auto max-h-31 border rounded-md px-2 py-2 flex items-center gap-2 flex-wrap cursor-text transition focus-within:border-tertiary ${error ? "border-error" : "border-foreground"} ${className ?? ""}`}
            >
              {tags.map((tag, i) => (
                <span
                  key={`${i}-${tag}`}
                  title={tag}
                  aria-label={`Remover ${tag}`}
                  onClick={() => onChange(tags.filter((_, idx) => idx !== i))}
                  className="inline-flex items-center gap-2 bg-tertiary/30 px-2 py-1 border border-tertiary/50 rounded min-w-0 max-w-full cursor-pointer"
                >
                  <span className="flex-1 min-w-0 text-tertiary text-sm truncate">
                    {tag}
                  </span>

                  <IoClose title="Remover" className="text-tertiary" />
                </span>
              ))}

              <input
                id={`${String(name)}-visible-input`}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={onKeyDown(tags, onChange)}
                onBlur={onBlur(tags, onChange)}
                placeholder={tags.length === 0 ? rest.placeholder : ""}
                autoComplete="off"
                {...rest}
                className={`flex-1 min-w-[8ch] px-1 py-1 outline-none bg-transparent placeholder:text-sm placeholder:text-foreground/50 focus:placeholder:text-tertiary/50 ${error ? "placeholder:text-error/50" : "text-foreground"}`}
              />
            </div>

            <span className={`text-xs text-error ${!error && "opacity-0"}`}>
              {error ?? "Null"}
            </span>
          </div>
        );
      }}
    />
  );
};

export default InputTags;
