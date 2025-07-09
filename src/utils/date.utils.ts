export const datePTBR = (date: number) => (date >= 10 ? date : `0${date}`);

export const formatDate = (date: Date) =>
  `${datePTBR(date.getDate())}/${datePTBR(date.getMonth() + 1)}/${date.getFullYear()}`;
