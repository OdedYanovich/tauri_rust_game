import { gameFn, gameInit } from "./mods/fight.js";
import { levelsFn, soundFn, exitFn, creditFn } from "./mods/menu.js";
// const { invoke } = window.__TAURI__.tauri;

const sideText = [
  document.querySelector("#Levels"),
  document.querySelector("#Sound"),
  document.querySelector("#Exit"),
];
const mainText = [
  document.querySelector("#LevelsContent"),
  document.querySelector("#SoundContent"),
  document.querySelector("#ExitContent"),
  document.querySelector("#CreditContent"),
  document.querySelector("#GameContent"),
];
{
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

  let levelsOptionsDisplayHTML = ``;
  [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "W",
    "DO",
    7,
    13,
    19,
    25,
    31,
    "S",
    "Don't",
    8,
    14,
    20,
    26,
    32,
    "X",
    3,
    9,
    15,
    21,
    27,
    "",
    "E",
    4,
    10,
    16,
    22,
    28,
    "",
    "D",
    5,
    11,
    17,
    23,
    29,
    "",
    "C",
    6,
    12,
    18,
    24,
    "Score",
    "Rush",
  ].forEach((c) => {
    levelsOptionsDisplayHTML += wrapElement(c);
  });
  document.querySelector("#SoundTable").innerHTML = soundOptionsDisplayHTML;
  mainText[0].innerHTML = levelsOptionsDisplayHTML;
}
const modLevels = 1;
const modSound = 2;
const modExit = 3;
const modCredit = 4;
const modGame = 5;

// let greetInputEl;
// async function greet() {
//   // https://tauri.app/v1/guides/features/command
//   greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
// }

const modsFunction = {
  1: levelsFn,
  2: soundFn,
  3: exitFn,
  4: creditFn,
  5: gameFn,
};
// Will be Necessary
// getComputedStyle(document.documentElement).getPropertyValue("--credit")
// document.documentElement.style.getPropertyValue("--credit", this.current)

class MenuMod {
  // clearInterval(intervalId); //should happened after the mod "game" is left
  constructor() {
    this.current = modCredit; // Necessary for the first check of "set"
    this.set(modCredit);
  }
  set(i) {
    mainText[this.current - 1].classList.remove("seen");
    if (this.current < modCredit)
      sideText[this.current - 1].classList.add("seen");
    this.current = i;
    this.fn = modsFunction[this.current];
    if (this.current === modGame) gameInit();

    document.documentElement.style.setProperty("--credit", this.current);
    mainText[this.current - 1].classList.add("seen");
    if (this.current < modCredit)
      sideText[this.current - 1].classList.remove("seen");
  }
}
let menuMod = new MenuMod();

let intervalId;

// sideText[0].style.height =   "1%";

const keyToMod = {
  q: modLevels,
  a: modSound,
  z: modExit,
};
window.addEventListener("keydown", (event) => {
  // if (key === "Escape") {}
  let key = event.key.toLowerCase();

  let mod_associated_with_current_press = keyToMod[key];
  if (mod_associated_with_current_press) {
    if (menuMod.current === mod_associated_with_current_press) {
      menuMod.set(modCredit);
    } else {
      menuMod.set(mod_associated_with_current_press);
    }
    return;
  }
  if (menuMod.fn(key)) menuMod.set(modGame);
});

const currentLevel = 36;
// setAttribute;
