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
let commandRows;
const siblings = document.querySelector("#GameContent").childNodes;
const commandToRow = {
  1: [2],
  2: [1, 3],
  3: [1, 2, 3],
};

// let currentLevel;
const gameInit = () => {
  let currentLevel = levels[1];
  levelButtons = [];
  for (let i = 0; i < currentLevel.buttons; i++) {
    levelButtons.push(allButtonsInLargestLevel[i]);
  }
  potentialPresses = [];
  for (let i = 0; i < currentLevel.presses; i++) {
    potentialPresses.push(levelButtons);
  }
  commandRows = [];
  commandToRow[currentLevel.commands.length].forEach((e) =>
    commandRows.push(siblings[e])
  );//Just set a variable
};
export const gameFn = (key) => {
  if (!gameStage) {
    gameInit();
    gameStage = gameStageAction;
  }
  let currentPotentialPresses = potentialPresses; //Loop
};
