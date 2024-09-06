import { levelButtons } from "./mods/levels-selector.js";
import { keyToValue } from "./mods/sound.js";
export const levelsID = 1;
export const soundID = 2;
export const exitID = 3;
export const creditID = 4;
export const fightID = 5;

export const menu = document.querySelector("#menu");
const makeElement = (column, row, text, name = "d") => {
  const id = document.createElement(name);
  id.style.gridColumn = column;
  id.style.gridRow = row;
  id.innerText = text;
  id.classList.add("seen");
  menu.appendChild(id);
  return id;
};

const buttonColumn = 1;
const optionColumn = 2;
/*const levelsButton =*/ makeElement(buttonColumn, levelsID, "Q");
/*const soundButton =*/ makeElement(buttonColumn, soundID, "A");
/*const exitButton =*/ makeElement(buttonColumn, exitID, "Z");
export const levelSelector = makeElement(optionColumn, levelsID, "Levels");
export const sound = makeElement(optionColumn, soundID, "Sound");
export const exit = makeElement(optionColumn, exitID, "Exit");
/*const credit =*/ makeElement(optionColumn, "var(--credit)", "Credit");

// const continueFight = makeElement("1/3", 3, "X Continue");
// continueFight.style.fontSize = "2rem";
// continueFight.style.justifyItems = "center";
// continueFight.style.alignItems = "end";

export const wrapElement = (c) => {
  return "<d>" + c + "</d>";
};
const soundOptionsDisplayHTML = Object.entries(keyToValue)
  .map(([key, value]) => wrapElement(key) + wrapElement(value))
  .join("");

menu.querySelector("#SoundTable").innerHTML = soundOptionsDisplayHTML;
let levelsFullGridContent = levelButtons //.slice(0, 6)
  .map((v) => {
    return v.toLocaleUpperCase();
  });
for (let index = 1; index < 37; index++) levelsFullGridContent.push(index);
let levelsFullGrid = "";
levelsFullGridContent.forEach((v) => {
  levelsFullGrid += wrapElement(v);
});
export const allLevels = menu.querySelector("#allLevels");
allLevels.innerHTML = levelsFullGrid;
export const selectedLevels = menu.querySelector("#selectedLevels");

export const content = [
  document.querySelector("#LevelsContent"),
  document.querySelector("#SoundContent"),
  document.querySelector("#ExitContent"),
  document.querySelector("#CreditContent"),
  document.querySelector("#GameContent"),
  document.querySelector("#GameContent"),
];
