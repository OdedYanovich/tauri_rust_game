import { modPrepareFight } from "../index.js";
export const levelsFn = (key) => {
  // ["w", "s", "x", "e", "d", "c"];
  if (key === "x") {
    return modPrepareFight;
  }
  // if (key !== "r") {
  //   // Modify the table
};

let volume = 50;
export const soundFn = (key) => {
  const keyToValue = { y: 1, u: 5, i: 10, o: 25, h: -1, j: -5, k: -10, l: -25 };
  if (!isNaN(keyToValue[key])) {
    volume += keyToValue[key];
    volume < 0 ? (volume = 0) : volume > 100 ? (volume = 100) : volume;
    document.querySelector("#volume").innerHTML = volume;
  }
  return false;
};
export const exitFn = (key) => {
  // ["y"];
  return false;
};
export const creditFn = (key) => {
  // ["y"];
  return false;
};
