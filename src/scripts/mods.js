import { levels } from "./levels.js";

const levelStageFullTable = false;
const levelStageChosenRow = true;
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

const gameContent = document.querySelector("#GameContent");
const levelButtonsMax = ["c", "v", "b", "n", "m"];
let levelsButtons;
let potentialSequences;
let commandRows;
let currentLevel; //Hopefully the main loop will not need a direct access to the level
const gameInit = () => {
  currentLevel = levels[1]; //Should be based on the keys
  // Repeated "reset then loop"
  levelsButtons = [];
  for (let i = 0; i < currentLevel.buttons; i++)
    levelsButtons.push(levelButtonsMax[i]);

  potentialSequences = [];
  for (let i = 0; i < currentLevel.presses; i++)
    potentialSequences.push(levelsButtons);

  gameContent.innerHTML = "";
  commandRows = [];
  for (let i = 0; i < currentLevel.commands.length; i++)
    commandRows.push(gameContent.createElement("d"));
};
export const gameFn = (key) => {
  if (!gameStage) {
    gameInit();
    gameStage = gameStageAction;
  }
  while (true) {
    let turnsAvailableButtons = levelsButtons;
    let turnPotentialSequences = potentialSequences;
    let turnPotentialSequenceIndex = []; // If the potential presses only has 1 button then his index is removed from the array
    for (let i = 0; i < turnPotentialSequences.length; i++)
      turnPotentialSequenceIndex.push(i);
    currentLevel.commands.array.forEach((element) => {
      let turnsPotentialPresses =
        turnPotentialSequences[
          turnPotentialSequenceIndex[
            Math.floor(Math.random() * turnAmbiguousSequenceIndex.length)
          ]
        ];
    });
  }
};
