export const runningTimeCalculator = (time: string) => {
  const timeAsNumber = Number(time);
  const hourResult = Math.floor(timeAsNumber / 60);
  const minResult = timeAsNumber % 60;
  return `${hourResult}h ${minResult}m`
}