export const shortUsername = (username: string): string =>
  username.split(" ").reduce((acc, part, i) => {
    if (i >= 2) return acc;

    acc += part.charAt(0).toUpperCase();

    return acc;
  }, "");

export const captalize = (str: string, eachWord = false): string =>
  eachWord
    ? str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : str.charAt(0).toUpperCase() + str.slice(1);

export const formatCEP = (cep: string): string =>
  cep.replace(/(\d{5})(\d{3})/, "$1-$2");

export const normalizeStr = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-");
