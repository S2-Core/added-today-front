export const shortUsername = (username: string) =>
  username.split(" ").reduce((acc, part, i) => {
    if (i >= 2) return acc;

    acc += part.charAt(0).toUpperCase();

    return acc;
  }, "");
