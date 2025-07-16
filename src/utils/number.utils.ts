export const formatPhoneNumberFlexible = (phone: string) => {
  const cleaned = phone.toString().replace(/\D/g, "");

  switch (cleaned.length) {
    case 10:
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    case 11:
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;

    default:
      return phone;
  }
};
