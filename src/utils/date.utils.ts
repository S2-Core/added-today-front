export const formatDate = (date: Date, getHours = false): string => {
  const datePTBR = (num: number): string => (num >= 10 ? `${num}` : `0${num}`);

  const now = new Date();

  const diffMs = now.getTime() - date.getTime();

  const [seconds, minutes, hours] = [
    Math.floor(diffMs / 1000),
    Math.floor(diffMs / (1000 * 60)),
    Math.floor(diffMs / (1000 * 60 * 60)),
  ];

  const [
    passedDay,
    passedMonth,
    passedYear,
    passedHours,
    passedMinutes,
    passedSeconds,
  ] = [
    datePTBR(date.getDate()),
    datePTBR(date.getMonth() + 1),
    date.getFullYear(),
    datePTBR(date.getHours()),
    datePTBR(date.getMinutes()),
    datePTBR(date.getSeconds()),
  ];

  if (hours >= 24) {
    const passedTime = getHours
      ? ` | ${passedHours}:${passedMinutes}:${passedSeconds}`
      : "";

    const passedDate = `${passedDay}/${passedMonth}/${passedYear}`;

    return `${passedDate}${passedTime}`;
  }

  if (hours >= 1) return `${hours}h atrás`;
  if (minutes >= 1) return `${minutes}min atrás`;
  return `${seconds}s atrás`;
};
