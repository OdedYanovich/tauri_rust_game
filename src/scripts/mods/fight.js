import { levels, commandBi } from "../levels.js";
import { levelsID } from "../dom.js";
import { chosenLevel } from "./menu.js";

const progressLostMax = 50;
let progressLost = progressLostMax;
setInterval(() => {
  if (progressLost < progressLostMax) progressLost += 0.02;
  healthHTML.style.setProperty("--progressLost", progressLost + "%");
}, 1);

const fightContent = document.querySelector("#GameContent");
const levelButtonsMax = ["f", "g", "h", "j", "k"];
let levelsButtons;
var ranges;
let commandRows;
let currentLevel;

const healthHTML = document.querySelector(".health");
let currentPotentialSequences;
let incompleteSequence;

const newCommand = () => {
  currentPotentialSequences = structuredClone(ranges);
  let availableRanges = ranges.keys();console.log(availableRanges);
  const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
  const selectedCommandIndex = getRandomIndex(currentLevel.commands[0]);
  const selectedRangeIndex = getRandomIndex(currentPotentialSequences);
  const selectedButtonIndex = getRandomIndex(
    currentPotentialSequences[selectedRangeIndex]
  );

  commandRows[0].innerText =
    currentPotentialSequences[selectedRangeIndex][selectedButtonIndex] +
    (selectedRangeIndex + 1);
  if (currentLevel.commands[0][selectedCommandIndex] === commandBi) {
    currentPotentialSequences[selectedRangeIndex] = currentPotentialSequences[
      selectedRangeIndex
    ].filter((e, i) => i === selectedButtonIndex);
    commandRows[0].style.border = "none";
  } else {
    commandRows[0].style.border = "solid";
    currentPotentialSequences[0].splice(selectedButtonIndex, 1);
  }
};
export const fightInit = () => {
  currentLevel = levels[chosenLevel - 1];
  progressLost = progressLostMax;
  incompleteSequence = [];
  levelsButtons = levelButtonsMax.slice(0, currentLevel.buttons);
  ranges = Array(currentLevel.presses).fill(levelsButtons);

  commandRows = [];
  fightContent.innerHTML = "";
  for (let i = 0; i < currentLevel.commands.length; i++) {
    commandRows.push(document.createElement("d"));
    fightContent.appendChild(commandRows[i]);
  }
  newCommand();
};
export const fightFn = (key) => {
  if (levelsButtons.includes(key)) {
    incompleteSequence.push(key);
    if (incompleteSequence.length !== currentLevel.presses) return;
    let result = true;
    for (let index = 0; index < currentLevel.presses; index++) {
      if (
        currentPotentialSequences[index].find(
          (element) => element === incompleteSequence[index]
        ) === undefined
      ) {
        result = false;
        break;
      }
    }
    if (result) {
      progressLost -= 8;
      if (progressLost < 0) return levelsID;
    } else if (progressLost < progressLostMax) progressLost += 8;
    else progressLost = progressLostMax;
    incompleteSequence = [];
    newCommand();
  }
};
window.addEventListener("keyup", () => (incompleteSequence = []));
