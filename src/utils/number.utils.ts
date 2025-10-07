import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

export const formatPhoneNumber = (
  phone: string,
  defaultCountry: CountryCode = "BR"
): string => {
  try {
    const phoneNumber = parsePhoneNumberFromString(phone, defaultCountry);

    if (phoneNumber && phoneNumber.isValid()) {
      return phoneNumber.formatInternational();
    }

    return phone;
  } catch (error) {
    console.error(error);

    return phone;
  }
};

export const generateRandomNumbers = (
  min: number,
  max: number,
  quantity = 1
): number[] => {
  let numbers: number[] = [];

  for (let i = 0; i < quantity; i++) {
    numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return numbers;
};

export const formatCurrency = (
  num: number,
  currency = "BRL",
  locale = "pt-BR"
): string => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    num
  );
};

export const formatInputNumber = (value: number | null | undefined): string => {
  if (value == null || isNaN(value)) return "";

  return value
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
