import { captalize } from "@/utils/string.utils";

import { CalendarFormValues } from "../../domain/form.mapper";

export const mapEnumToSelectItems = <TEnum extends Record<string, string>>(
  enumValue: TEnum,
) =>
  Object.entries(enumValue).map(([key, value]) => ({
    label: captalize(value),
    value: key,
  }));

export const getStatusLabel = (
  type?: CalendarFormValues["type"],
): "Status do conteúdo" | "Status da campanha" | "Status do recebimento" => {
  if (type === "EARNING") {
    return "Status do recebimento";
  }

  if (type === "CAMPAIGN") {
    return "Status da campanha";
  }

  return "Status do conteúdo";
};
