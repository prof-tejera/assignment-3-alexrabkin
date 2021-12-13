// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

export const formatTime = (count) => {
  let h = Math.floor(count / 3600);
  count %= 3600;
  let m = Math.floor(count / 60);
  let s = count % 60;

  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  return `${h}:${m}:${s}`;
};
