const TIMEOUT = 300;

export const debounce = (callback, ms = TIMEOUT) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    return setTimeout(() => callback(...args), ms);
  };
};
