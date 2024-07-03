import {
  prepareFightID,
  allLevels,
  selectedLevels,
  wrapElement,
} from "../dom.js";
export const levelButtons = ["w", "s", "x", "e", "d", "c"];

const fullTable = false;
// const chosenRow = true;

let levelStage = fullTable;
export const isTableFull = (answer) => {
  levelStage = answer;
  if (answer) {
    allLevels.style.display = "grid";
    selectedLevels.style.display = "none";
  } else {
    allLevels.style.display = "none";
    selectedLevels.style.display = "grid";
  }
};
export const levelsFn = (key) => {
  if (!levelStage && key === "r") isTableFull(true);
  if (levelButtons.includes(key)) {
    if (!levelStage) return prepareFightID;
    else {
      isTableFull(false);
      const buttonRow = levelButtons.findIndex((b) => b === key) + 1;
      selectedLevels.style.gridRow = buttonRow + "/" + (buttonRow + 2);
      let selectedLevelsContent = wrapElement("");
      levelButtons.forEach((b) => {
        selectedLevelsContent += wrapElement(b.toLocaleUpperCase());
      });
      selectedLevelsContent+=wrapElement("r")
      for (let i = buttonRow; i < 37; i += 6)
        selectedLevelsContent += wrapElement(i);
      selectedLevels.innerHTML = selectedLevelsContent;
    }
  }
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
