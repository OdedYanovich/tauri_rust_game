import { levels, commandBi } from "../levels.js";
import { levelsID } from "../dom.js";
import { chosenLevel } from "./menu.js";

const fightContent = document.querySelector("#GameContent");
const levelButtonsMax = ["f", "g", "h", "j", "k"];
let levelsButtons;
var potentialSequences;
let commandRows;
let currentLevel; //Hopefully the main loop will not need a direct access to the level

const healthHTML = document.querySelector(".health");
let progressLost = 0;
let currentPotentialSequences;

setInterval(() => {
  if (progressLost < 50) progressLost += 0.02;
  healthHTML.style.setProperty("--progressLost", progressLost + "%");
}, 1);

progressLost = 50;
const newCommand = () => {
  currentPotentialSequences = structuredClone(potentialSequences);
  const selectedButtonIndex = Math.floor(
    Math.random() * currentPotentialSequences[0].length
  );
  const selectedCommandIndex = Math.floor(
    Math.random() * currentLevel.commands[0].length
  );
  commandRows[0].innerText = currentPotentialSequences[0][selectedButtonIndex];
  if (currentLevel.commands[0][selectedCommandIndex] === commandBi) {
    currentPotentialSequences[0] = currentPotentialSequences[0].filter(
      (e, i) => i === selectedButtonIndex
    );
    commandRows[0].style.border = "none";
  } else {
    commandRows[0].style.border = "solid";
    currentPotentialSequences[0].splice(selectedButtonIndex, 1);
  }
};
export const fightInit = () => {
  currentLevel = levels[chosenLevel - 1];
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
  // healthHTML.style.setProperty("--progressLost", progressLost + "%");
  newCommand();
};

export const fightFn = (key) => {
  if (levelsButtons.includes(key)) {
    if (
      currentPotentialSequences[0].find((element) => element === key) !==
      undefined
    ) {
      progressLost -= 8;
      if (progressLost < 0) return levelsID;
    } else progressLost += 8;
    newCommand();
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
