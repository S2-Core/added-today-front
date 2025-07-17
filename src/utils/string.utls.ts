export const shortUsername = (username: string): string =>
  username.split(" ").reduce((acc, part, i) => {
    if (i >= 2) return acc;

    acc += part.charAt(0).toUpperCase();

    return acc;
  }, "");

export const captalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const formatCEP = (cep: string): string =>
  cep.replace(/(\d{5})(\d{3})/, "$1-$2");
