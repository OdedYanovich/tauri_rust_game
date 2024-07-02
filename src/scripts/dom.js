export const levelsID = 1;
export const soundID = 2;
export const exitID = 3;
export const creditID = 4;
export const fightID = 5;
export const prepareFightID = 6;

const menu = document.querySelector("#menu");
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
const levelsButton = makeElement(buttonColumn, levelsID, "Q");
const soundButton = makeElement(buttonColumn, soundID, "A");
const exitButton = makeElement(buttonColumn, exitID, "Z");
export const levels = makeElement(optionColumn, levelsID, "Levels");
export const sound = makeElement(optionColumn, soundID, "Sound");
export const exit = makeElement(optionColumn, exitID, "Exit");
const credit = makeElement(optionColumn, "var(--credit)", "Credit");
const continueFight = makeElement("1/3", 3, "X Continue");
continueFight.style.fontSize = "2rem";
continueFight.style.justifyItems = "center";
continueFight.style.alignItems = "end";

const wrapElement = (c) => {
  return "<d>" + c + "</d>";
};
let soundOptionsDisplayHTML = ``;
[
  ["y", 1],
  ["u", 5],
  ["i", 10],
  ["o", 25],
  ["h", -1],
  ["j", -5],
  ["k", -10],
  ["l", -25],
].forEach(([key, value], index, array) => {
  soundOptionsDisplayHTML += wrapElement(key);
  soundOptionsDisplayHTML += wrapElement(value);
});

document.querySelector("#SoundTable").innerHTML = soundOptionsDisplayHTML;
let levelsFullGrid = ["W", "S", "E", "D", "R", "F"];
for (let index = 1; index < 37; index++) levelsFullGrid.push(index);
for (let index = 0; index < levelsFullGrid.length; index++) {
  const element = array[index];
  
}

// let levelsOptionsDisplayHTML = ``;
// [
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "W",
//   "DO",
//   7,
//   13,
//   19,
//   25,
//   31,
//   "S",
//   "Don't",
//   8,
//   14,
//   20,
//   26,
//   32,
//   "X",
//   3,
//   9,
//   15,
//   21,
//   27,
//   "",
//   "E",
//   4,
//   10,
//   16,
//   22,
//   28,
//   "",
//   "D",
//   5,
//   11,
//   17,
//   23,
//   29,
//   "",
//   "C",
//   6,
//   12,
//   18,
//   24,
//   "Score",
//   "Rush",
// ].forEach((c) => {
//   levelsOptionsDisplayHTML += wrapElement(c);
// });
// document.querySelector("#LevelsContent").innerHTML = levelsOptionsDisplayHTML;
document.querySelector("#LevelsContent").innerHTML = levelsOptionsDisplayHTML;