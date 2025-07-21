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
