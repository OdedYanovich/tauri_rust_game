import { levelsID, wrapElement } from "../dom.js";
import { chosenLevel } from "./levels.js";
import {
  getButtons,
  getLevel,
  new_command,
} from "../interop.js";

const progressLostMax = 50;
let progressLost = progressLostMax;
setInterval(() => {
  if (progressLost < progressLostMax) progressLost += 0.007;
  healthHTML.style.setProperty("--progressLost", progressLost + "%");
}, 1);

const fightContent = document.querySelector("#GameContent");
let levelRanges;
let commandRowsDom;
let currentLevel;

const healthHTML = document.querySelector(".health");
let currentRanges;
let incompleteSequence;

const newCommand = async (instructionsPerTurn) => {
  let commandData = await new_command(chosenLevel);
  for (const instructions in commandData) {
    switch (commandData[instructions][0]) {
      case "Bi":
        commandRowsDom[instructions].style.border = "none";
        break;

      case "Nbi":
        commandRowsDom[instructions].style.border = "solid";
        break;
    }
    commandRowsDom[instructions].innerHTML += wrapElement(commandData[instructions][1]);
    commandRowsDom[instructions].innerHTML += wrapElement(commandData[instructions][2]);
  }
  // console.table(currentRanges); //Debug
};
export const fightInit = async () => {
  currentLevel = await getLevel(chosenLevel);
  progressLost = progressLostMax;
  incompleteSequence = [];
  levelRanges = Array(currentLevel.presses).fill(
    await getButtons(currentLevel.buttons)
  );

  commandRowsDom = [];
  fightContent.innerHTML = "";
  for (let i = 0; i < currentLevel.instructions.length; i++) {
    commandRowsDom.push(document.createElement("d"));
    fightContent.appendChild(commandRowsDom[i]);
  }
  newCommand(currentLevel.instructions.length);
};
export const fightFn = async (key) => {
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
  newCommand(currentLevel.instructions.length);
};
window.addEventListener("keyup", () => (incompleteSequence = []));
