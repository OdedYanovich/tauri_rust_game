const keyToValue = { y: 1, u: 5, i: 10, o: 25, h: -1, j: -5, k: -10, l: -25 };
export const soundKeys = Object.keys(keyToValue);
let volume = 50;
export const soundFn = (key) => {
  volume += keyToValue[key];
  volume < 0 ? (volume = 0) : volume > 100 ? (volume = 100) : volume;
  document.querySelector("#volume").innerHTML = volume;
  return false;
};
