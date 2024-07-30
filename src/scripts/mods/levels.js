import { fightID, allLevels, selectedLevels, wrapElement } from "../dom.js";

export let chosenLevel = 0;
export const levelKeys = ["w", "s", "x", "e", "d", "c", "r"];
export const levelButtons = ["w", "s", "x", "e", "d", "c"];
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
  const chosenLevelIndex = levelButtons //.slice(0, 6)
    .findIndex((b) => key === b);
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
