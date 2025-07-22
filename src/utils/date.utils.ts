export const formatDate = (date: Date): string => {
  const datePTBR = (num: number): string => (num >= 10 ? `${num}` : `0${num}`);

  const now = new Date();

  const diffMs = now.getTime() - date.getTime();

  const [seconds, minutes, hours] = [
    Math.floor(diffMs / 1000),
    Math.floor(diffMs / (1000 * 60)),
    Math.floor(diffMs / (1000 * 60 * 60)),
  ];

  if (hours >= 24) {
    return `${datePTBR(date.getDate())}/${datePTBR(date.getMonth() + 1)}/${date.getFullYear()}`;
  }

  if (hours >= 1) return `${hours}h atrás`;
  if (minutes >= 1) return `${minutes}min atrás`;
  return `${seconds}s atrás`;
};
