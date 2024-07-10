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
let ranges;
let commandRows;
let currentLevel;

const healthHTML = document.querySelector(".health");
let currentRanges;
let incompleteSequence;

const newCommand = (commandsPerTurn) => {
  currentRanges = structuredClone(ranges);
  let availableRanges = Array.from(ranges.keys());
  for (let commandIndex = 0; commandIndex < commandsPerTurn; commandIndex++) {
    const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
    const selectedCommandIndex = getRandomIndex(currentLevel.commands[commandIndex]);
    const selectedRangeIndex = getRandomIndex(availableRanges);
    const selectedButtonIndex = getRandomIndex(
      currentRanges[selectedRangeIndex]
    );

    commandRows[commandIndex].innerText =
      currentRanges[selectedRangeIndex][selectedButtonIndex] +
      (selectedRangeIndex + 1);
    switch (currentLevel.commands[commandIndex][selectedCommandIndex]) {
      case commandBi:
        currentRanges[selectedRangeIndex] = [
          currentRanges[selectedRangeIndex][selectedButtonIndex],
        ];
        availableRanges.splice(selectedRangeIndex, 1);
        for (let rangeIndex of availableRanges) {
          currentRanges[rangeIndex] = currentRanges[rangeIndex].filter(
            (e) => e !== currentRanges[selectedRangeIndex][0]
          );
        }
        commandRows[commandIndex].style.border = "none";
        break;

      case commandNbi:
        currentRanges[selectedRangeIndex] = currentRanges[
          selectedRangeIndex
        ].toSpliced(selectedButtonIndex, 1);
        commandRows[commandIndex].style.border = "solid";
        break;
    }
  }
  console.table(currentRanges);
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
  newCommand(currentLevel.commands.length);
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
    newCommand(currentLevel.commands.length);
  }
};
window.addEventListener("keyup", () => (incompleteSequence = []));
