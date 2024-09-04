export const keyToValue = {
  l: -25,
  k: -10,
  j: -5,
  h: -1,
  y: 1,
  u: 5,
  i: 10,
  o: 25,
};
let volume = 50;
export const soundFn = (key) => {
  volume += keyToValue[key];
  volume < 0 ? (volume = 0) : volume > 100 ? (volume = 100) : volume;
  document.querySelector("#volume").innerHTML = volume;
  return false;
};
