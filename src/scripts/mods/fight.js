import { levels, commandBi, commandNbi } from "../levels.js";
import { levelsID } from "../dom.js";
import { chosenLevel } from "./menu.js";

const progressLostMax = 50;
let progressLost = progressLostMax;
setInterval(() => {
  if (progressLost < progressLostMax) progressLost += 0.007;
  healthHTML.style.setProperty("--progressLost", progressLost + "%");
}, 1);

const fightContent = document.querySelector("#GameContent");
const levelButtonsMax = ["f", "g", "h", "j", "k"];
let levelsButtons;
let levelRanges;
let commandRowsDom;
let currentLevel;

const healthHTML = document.querySelector(".health");
let currentRanges;
let incompleteSequence;

const shuffle = (arr) => {
  for (const i in arr) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
const newCommand = (commandsPerTurn) => {
  currentRanges = structuredClone(levelRanges);
  const commandsShuffledIndices = shuffle(
    Array.from(currentLevel.commands.keys())
  );
  let availableRanges = Array.from(currentRanges.keys());
  for (const commandIndex of commandsShuffledIndices) {
    const selectedCommandIndex = getRandomIndex(
      currentLevel.commands[commandIndex]
    );
    const selectedRangeIndex = getRandomIndex(availableRanges);
    const selectedButtonIndex = getRandomIndex(
      currentRanges[selectedRangeIndex]
    );

    commandRowsDom[commandIndex].innerText =
      currentRanges[selectedRangeIndex][selectedButtonIndex] +
      (selectedRangeIndex + 1);
    switch (currentLevel.commands[commandIndex][selectedCommandIndex]) {
      case commandBi:
        currentRanges[selectedRangeIndex] = [
          currentRanges[selectedRangeIndex][selectedButtonIndex],
        ];
        availableRanges = availableRanges.toSpliced(selectedRangeIndex, 1); //.splice(selectedRangeIndex, 1); //
        for (let rangeIndex of availableRanges) {
          currentRanges[rangeIndex] = currentRanges[rangeIndex].filter(
            (e) => e !== currentRanges[selectedRangeIndex][0]
          );
        }
        commandRowsDom[commandIndex].style.border = "none";
        break;

      case commandNbi:
        currentRanges[selectedRangeIndex] = currentRanges[
          selectedRangeIndex
        ].toSpliced(selectedButtonIndex, 1);
        commandRowsDom[commandIndex].style.border = "solid";
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
  levelRanges = Array(currentLevel.presses).fill(levelsButtons);

  commandRowsDom = [];
  fightContent.innerHTML = "";
  for (let i = 0; i < currentLevel.commands.length; i++) {
    commandRowsDom.push(document.createElement("d"));
    fightContent.appendChild(commandRowsDom[i]);
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
      progressLost -= 4;
      if (progressLost < 0) return levelsID;
    } else if (progressLost < progressLostMax) progressLost += 4;
    else progressLost = progressLostMax;
    incompleteSequence = [];
    newCommand(currentLevel.commands.length);
  }
};
window.addEventListener("keyup", () => (incompleteSequence = []));
