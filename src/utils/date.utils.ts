interface IDateOptions {
  getHours?: boolean;
  getMinutes?: boolean;
  getSeconds?: boolean;
}

export const formatDate = (
  date: Date,
  getOptions: IDateOptions = {}
): string => {
  const {
    getHours = false,
    getMinutes = false,
    getSeconds = false,
  } = getOptions;
  const datePTBR = (num: number): string => (num >= 10 ? `${num}` : `0${num}`);

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const isFuture = diffMs < 0;

  const diffAbs = Math.abs(diffMs);
  const seconds = Math.floor(diffAbs / 1000);
  const minutes = Math.floor(diffAbs / (1000 * 60));
  const hours = Math.floor(diffAbs / (1000 * 60 * 60));
  const days = Math.floor(diffAbs / (1000 * 60 * 60 * 24));

  const passedDay = datePTBR(date.getDate());
  const passedMonth = datePTBR(date.getMonth() + 1);
  const passedYear = date.getFullYear();
  const passedHours = datePTBR(date.getHours());
  const passedMinutes = datePTBR(date.getMinutes());
  const passedSeconds = datePTBR(date.getSeconds());

  if (days >= 1) {
    const passedDate = `${passedDay}/${passedMonth}/${passedYear}`;
    const timeParts: string[] = [];

    if (getHours) timeParts.push(passedHours);
    if (getMinutes) timeParts.push(passedMinutes);
    if (getSeconds) timeParts.push(passedSeconds);

    const timeStr = timeParts.length ? ` - ${timeParts.join(":")}` : "";
    return passedDate + timeStr;
  }

  if (hours >= 1) return isFuture ? `daqui à ${hours}h` : `${hours}h atrás`;

  if (minutes >= 1)
    return isFuture ? `daqui à ${minutes}min` : `${minutes}min atrás`;

  if (seconds === 0) return "agora";

  return isFuture ? `daqui à ${seconds}s` : `${seconds}s atrás`;
};
