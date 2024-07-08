import { fightID, allLevels, selectedLevels, wrapElement } from "../dom.js";
export const levelButtons = ["w", "s", "x", "e", "d", "c"];

export let chosenLevel = 0;

export const isTableFull = (answer) => {
  if (answer) {
    chosenLevel = 0;
    allLevels.style.display = "grid";
    selectedLevels.style.display = "none";
  } else {
    allLevels.style.display = "none";
    selectedLevels.style.display = "grid";
  }
};
export const levelsFn = (key) => {
  if (chosenLevel !== 0 && key === "r") isTableFull(true);
  const chosenLevelIndex = levelButtons.findIndex((b) => key === b);
  if (chosenLevelIndex === -1) return false;
  if (chosenLevel !== 0) {
    chosenLevel += 6 * chosenLevelIndex;
    return fightID;
  }
  isTableFull(false);
  chosenLevel += chosenLevelIndex + 1;
  const buttonRow = chosenLevelIndex + 1;
  selectedLevels.style.gridRow = buttonRow + "/" + (buttonRow + 2);
  let selectedLevelsContent = wrapElement("");
  levelButtons.forEach((b) => {
    selectedLevelsContent += wrapElement(b.toLocaleUpperCase());
  });
  selectedLevelsContent += wrapElement("r");
  for (let i = buttonRow; i < 37; i += 6)
    selectedLevelsContent += wrapElement(i);
  selectedLevels.innerHTML = selectedLevelsContent;
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
  if (key === "y") close();
  return false;
};
export const creditFn = (key) => {
  return false;
};
