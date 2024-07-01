import { levels } from "../levels.js";
import { modFight } from "../index.js";

const levelStageFullTable = false;
const levelStageChosenRow = true;

let levelStage = levelStageFullTable;

const gameContent = document.querySelector("#GameContent");
const levelButtonsMax = ["c", "v", "b", "n", "m"];
let levelsButtons;
let potentialSequences;
let commandRows;
let currentLevel; //Hopefully the main loop will not need a direct access to the level
const gameInit2 = () => {
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

let progressLost = 0;
const buttons = ["v", "b"];
let row;
const healthHTML = document.querySelector(".health");
export const gameInit = () => {
  progressLost = 25;
  document.documentElement.style.setProperty("--rows", 1);
  row = document.createElement("d");
  row.innerText = buttons[Math.floor(Math.random() * buttons.length)];
  gameContent.innerHTML = "";
  gameContent.appendChild(row);
  healthHTML.style.setProperty("--progressLost", progressLost + "%");
};

export let intervalId = 0;

export const prepareFight = (key) => {
  if (key === row.innerText) {
    progressLost -= 4;
    intervalId = setInterval(() => {
      progressLost += 0.01;
      healthHTML.style.setProperty("--progressLost", progressLost + "%");
    }, 1);
    return modFight;
  }
};
export const gameFn = (key) => {
  if (buttons.includes(key)) {
    if (key == row.innerText) progressLost -= 4;
    else progressLost += 4;
    // healthHTML.style.setProperty("--progressLost", progressLost + "%");
    row.innerText = buttons[Math.floor(Math.random() * buttons.length)];
  }
  // let turnsAvailableButtons = levelsButtons;
  // let turnPotentialSequences = potentialSequences;
  // let turnPotentialSequenceIndex = []; // If the potential presses only has 1 button then his index is removed from the array
  // for (let i = 0; i < turnPotentialSequences.length; i++)
  //   turnPotentialSequenceIndex.push(i);
  // currentLevel.commands.array.forEach((element) => {
  //   let turnsPotentialPresses =
  //     turnPotentialSequences[
  //       turnPotentialSequenceIndex[
  //         Math.floor(Math.random() * turnAmbiguousSequenceIndex.length)
  //       ]
  //     ];
  // });
};
