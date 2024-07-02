import { prepareFightID } from "../dom.js";
export const levelsFn = (key) => {
  // ["w", "s", "e", "d", "r", "f"];
  if (key === "x") {
    return prepareFightID;
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
  if (key === "y") close();
  return false;
};
export const creditFn = (key) => {
  
  return false;
};
