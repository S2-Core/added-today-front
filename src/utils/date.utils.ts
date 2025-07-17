export const datePTBR = (date: number): string | number =>
  date >= 10 ? date : `0${date}`;

export const formatDate = (date: Date): string =>
  `${datePTBR(date.getDate())}/${datePTBR(date.getMonth() + 1)}/${date.getFullYear()}`;
