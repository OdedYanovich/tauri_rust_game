import { levels } from "./levels.js";

const levelStageFullTable = false;
const levelStageChosenColumn = true;
const gameStagePrepare = false;
const gameStageAction = true;

let levelStage = levelStageFullTable;
let gameStage = gameStagePrepare;

export const levelsFn = (key) => {
  ["w", "s", "x", "e", "d", "c"];
  if (key !== 0) {
    if (key === "x" || gameStage) {
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

const allButtonsInLargestLevel = ["c", "v", "b", "n"];
let levelButtons;
let potentialPresses;

let selectedLevel = levels[1];
const gameInit = () => {
  levelButtons = [];
  for (let i = 0; i < selectedLevel.buttons; i++) {
    levelButtons.push(allButtonsInLargestLevel[i]);
  }
  potentialPresses = [];
  for (let i = 0; i < selectedLevel.presses; i++) {
    potentialPresses.push(levelButtons);
  }
};
export const gameFn = (key) => {
  if (!gameStage) {
    gameInit();
    gameStage = gameStageAction;
  }
  let currentPotentialPresses = potentialPresses;//Loop
};
