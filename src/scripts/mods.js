import { levels } from "./levels";
console.log('3');
// import init, { LevelStage,GameStage } from "../pkg/hello_wasm.js";

let levelStage = 0; /*LevelStage.FullTable*/
let gameStage = 0; /*GameStage.Prepare*/
let gameStarted = false;

export const levelsFn = (key) => {
  ["w", "s", "x", "e", "d", "c"];
  if (key !== 0) {
    if (key === "x" || gameStarted) {
      return true;
    }
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
export const gameFn = (key) => {
  const allButtons = ["c", "v", "b", "n"];
  const selectedLevel = levels[1];
  let levelButtons = [];
  for (let i = 0; i < selectedLevel.buttons; i++) {
    levelButtons.push(allButtons[i]);
  }
  let potentialPresses = [];
  for (let i = 0; i < selectedLevel.presses; i++) {
    potentialPresses.push(levelButtons);
  }
  // Initialization ends
  let currentPotentialPresses = potentialPresses;
};
