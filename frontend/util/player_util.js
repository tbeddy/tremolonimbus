export const toMinutesAndSeconds = n => {
  const rounded = Math.floor(n);
  if (isNaN(rounded)) return null;
  let minutes = Math.floor(rounded / 60);
  let seconds = rounded % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}