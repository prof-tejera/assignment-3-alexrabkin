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

export const calculateTotalWorkout = (sequence) => {
  let total = 0;

  sequence.forEach((t) => {
    let workSeconds = 0;
    let restSeconds = 0;

    if (t.config.rounds) {
      workSeconds = t.config.workSeconds * t.config.rounds;

      if (t.config.restSeconds) {
        restSeconds = t.config.restSeconds * t.config.rounds;
      }
    } else {
      workSeconds = t.config.workSeconds;
    }

    total = total + workSeconds + restSeconds;
  });

  return total;
};

export const isFormInvalid = (data) => {
  const { config } = data;

  if (
    "workSeconds" in config &&
    (config.workSeconds < 1 || !config.workSeconds)
  ) {
    return true;
  }

  if ("rounds" in config && (config.rounds < 1 || !config.rounds)) return true;

  if (
    "restSeconds" in config &&
    (config.restSeconds < 1 || !config.restSeconds)
  ) {
    return true;
  }
};
