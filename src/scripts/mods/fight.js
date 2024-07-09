import { levels, commandBi, commandNbi } from "../levels.js";
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
let currentRanges;
let incompleteSequence;

const newCommand = () => {
  currentRanges = structuredClone(ranges);
  let availableRanges = Array.from(ranges.keys());
  const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
  const selectedCommandIndex = getRandomIndex(currentLevel.commands[0]);
  const selectedRangeIndex = getRandomIndex(availableRanges);
  const selectedButtonIndex = getRandomIndex(currentRanges[selectedRangeIndex]);

  commandRows[0].innerText =
    currentRanges[selectedRangeIndex][selectedButtonIndex] +
    (selectedRangeIndex + 1);
  switch (currentLevel.commands[0][selectedCommandIndex]) {
    case commandBi:
      currentRanges[selectedRangeIndex] = [
        currentRanges[selectedRangeIndex][selectedButtonIndex],
      ];
      availableRanges.splice(selectedRangeIndex,1);
      for (let rangeIndex of availableRanges) {
        currentRanges[rangeIndex] = currentRanges[rangeIndex].filter(
          (e) => e !== currentRanges[selectedRangeIndex][0]
        );
      }
      commandRows[0].style.border = "none";
      break;

    case commandNbi:
      currentRanges[0].splice(selectedButtonIndex, 1);
      commandRows[0].style.border = "solid";
      break;
  }
  // console.log(currentRanges);
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
        currentRanges[index].find(
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
