import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

export const formatPhoneNumber = (
  phone: string,
  defaultCountry: CountryCode = "BR"
): string => {
  const phoneNumber = parsePhoneNumberFromString(phone, defaultCountry);

  if (phoneNumber && phoneNumber.isValid()) {
    return phoneNumber.formatInternational();
  }

  return phone;
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
