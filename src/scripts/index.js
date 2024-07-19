import { fightFn, fightInit } from "./mods/fight.js";
import {
  levelsFn,
  soundFn,
  exitFn,
  creditFn,
  isTableFull,
} from "./mods/menu.js";
import {
  levels,
  sound,
  exit,
  levelsID,
  soundID,
  exitID,
  creditID,
  fightID,
  allLevels,
  selectedLevels,
} from "./dom.js";

const sideOptionText = [levels, sound, exit];
const content = [
  document.querySelector("#LevelsContent"),
  document.querySelector("#SoundContent"),
  document.querySelector("#ExitContent"),
  document.querySelector("#CreditContent"),
  document.querySelector("#GameContent"),
  document.querySelector("#GameContent"),
];

const modsFunction = {
  1: levelsFn,
  2: soundFn,
  3: exitFn,
  4: creditFn,
  5: fightFn,
};
// getComputedStyle(document.documentElement).getPropertyValue("--credit")

class MenuMod {
  constructor() {
    this.current = creditID; // Necessary for the first check of "set"
    this.set(creditID);
  }
  set(mod) {
    content[this.current - 1].classList.remove("seen");
    if (this.current < creditID)
      sideOptionText[this.current - 1].classList.add("seen");

    this.current = mod;
    document.documentElement.style.setProperty("--credit", this.current);
    content[this.current - 1].classList.add("seen");
    if (this.current < creditID)
      sideOptionText[this.current - 1].classList.remove("seen");
    this.fn = modsFunction[this.current];

    if (this.current === fightID) fightInit();

    if (this.current === levelsID) {
      isTableFull(true);
    }
  }
}
let menuMod = new MenuMod();

const keyToMod = {
  q: levelsID,
  a: soundID,
  z: exitID,
};
window.addEventListener("keydown", async(event) => {
  let key = event.key.toLowerCase();
  let mod_associated_with_current_press = keyToMod[key];
  if (mod_associated_with_current_press) {
    if (menuMod.current === mod_associated_with_current_press) {
      menuMod.set(creditID);
    } else {
      menuMod.set(mod_associated_with_current_press);
    }
    return;
  }
  const modRequestedTransition = await menuMod.fn(key);
  if (modRequestedTransition)  menuMod.set(modRequestedTransition);
});

const currentLevel = 36;
// setAttribute;
