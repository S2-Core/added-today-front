export const strToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return `#${[0, 1, 2]
    .map((i) =>
      (127 + ((hash >> (i * 8)) & 0x3f)).toString(16).padStart(2, "0")
    )
    .join("")}`;
};
