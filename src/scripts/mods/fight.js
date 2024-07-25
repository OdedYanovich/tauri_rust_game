import { levelsID, selectedLevels } from "../dom.js";
import { chosenLevel } from "./menu.js";

const { invoke } = window.__TAURI__.tauri;
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
  currentRanges = structuredClone(levelRanges);
  let instructionsShuffledIndices = await invoke("get_shuffled_indices", {
    length: currentLevel.instructions.length,
  });
  let availableRanges = Array.from(currentRanges.keys());
  for (const instructionIndex of instructionsShuffledIndices) {
    const [selectedCommandIndex, selectedRangeIndex, selectedButtonIndex] =
      await invoke("selected_correct_actions", {
        currentRangers: currentRanges,
        availableRangersLen: availableRanges.length,
      });

    commandRowsDom[instructionIndex].innerText =
      currentRanges[selectedRangeIndex][selectedButtonIndex] +
      (selectedRangeIndex + 1);
    switch (currentLevel.instructions[instructionIndex][selectedCommandIndex]) {
      case "Bi":
        currentRanges[selectedRangeIndex] = [
          currentRanges[selectedRangeIndex][selectedButtonIndex],
        ];
        availableRanges = availableRanges.toSpliced(selectedRangeIndex, 1); //.splice(selectedRangeIndex, 1); //
        for (let rangeIndex of availableRanges) {
          currentRanges[rangeIndex] = currentRanges[rangeIndex].filter(
            (e) => e !== currentRanges[selectedRangeIndex][0]
          );
        }
        commandRowsDom[instructionIndex].style.border = "none";
        break;

      case "Nbi":
        currentRanges[selectedRangeIndex] = currentRanges[
          selectedRangeIndex
        ].toSpliced(selectedButtonIndex, 1);
        commandRowsDom[instructionIndex].style.border = "solid";
        break;
    }
  }
  // console.table(currentRanges); //Debug
};
export const fightInit = async () => {
  await invoke("set_level", { selectedLevel: chosenLevel });
  currentLevel = await invoke("get_level");
  progressLost = progressLostMax;
  incompleteSequence = [];
  await invoke("set_buttons", { length: currentLevel.buttons });
  levelRanges = Array(currentLevel.presses).fill(
    await invoke("get_buttons", { length: currentLevel.buttons })
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
  if (
    (await invoke("get_buttons", { length: currentLevel.buttons })).includes(
      key
    )
  ) {
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
  }
};
window.addEventListener("keyup", () => (incompleteSequence = []));
