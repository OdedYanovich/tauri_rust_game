import { levels } from "../levels.js";
import { fightID } from "../dom.js";

const fightContent = document.querySelector("#GameContent");
const levelButtonsMax = ["f", "g", "h", "j", "k"];
let levelsButtons;
let potentialSequences;
let commandRows;
let currentLevel; //Hopefully the main loop will not need a direct access to the level

const healthHTML = document.querySelector(".health");
let progressLost = 0;
let turnPotentialSequences;
export const gameInit = () => {
  currentLevel = levels[1]; //Should be based on the keys
  progressLost = 25;
  // Repeated "reset then loop"
  levelsButtons = [];
  for (let i = 0; i < currentLevel.buttons; i++)
    levelsButtons.push(levelButtonsMax[i]);

  potentialSequences = [];
  for (let i = 0; i < currentLevel.presses; i++)
    potentialSequences.push(levelsButtons);

  commandRows = [];
  fightContent.innerHTML = "";
  for (let i = 0; i < currentLevel.commands.length; i++) {
    commandRows.push(document.createElement("d"));
    fightContent.appendChild(commandRows[i]);
  }

  healthHTML.style.setProperty("--progressLost", progressLost + "%");
  turnPotentialSequences = potentialSequences;
  const selectedButtonIndex = Math.floor(
    Math.random() * turnPotentialSequences[0].length
  );
  commandRows[0].innerText = turnPotentialSequences[0][selectedButtonIndex];
  turnPotentialSequences[0] = turnPotentialSequences[0].filter(
    (e, i) => i === selectedButtonIndex
  );
};

export let intervalId = 0;

export const prepareFight = (key) => {
  if (key === turnPotentialSequences[0][0]) {
    progressLost -= 4;
    intervalId = setInterval(() => {
      progressLost += 0.02;
      healthHTML.style.setProperty("--progressLost", progressLost + "%");
    }, 1);
    turnPotentialSequences = potentialSequences;
    const selectedButtonIndex = Math.floor(
      Math.random() * turnPotentialSequences[0].length
    );
    commandRows[0].innerText = turnPotentialSequences[0][selectedButtonIndex];
    turnPotentialSequences[0] = turnPotentialSequences[0].filter(
      (e, i) => i === selectedButtonIndex
    );
    return fightID;
  }
};
export const fight = (key) => {
  if (levelsButtons.includes(key)) {
    if (key === turnPotentialSequences[0][0]) progressLost -= 4;
    else progressLost += 4;
    turnPotentialSequences = potentialSequences;
    const selectedButtonIndex = Math.floor(
      Math.random() * turnPotentialSequences[0].length
    );
    commandRows[0].innerText = turnPotentialSequences[0][selectedButtonIndex];
    turnPotentialSequences[0] = turnPotentialSequences[0].filter(
      (e, i) => i === selectedButtonIndex
    );
    // commandRows[0].innerText =
    //   levelsButtons[Math.floor(Math.random() * levelsButtons.length)];
  }
  // let turnsAvailableButtons = levelsButtons;
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
