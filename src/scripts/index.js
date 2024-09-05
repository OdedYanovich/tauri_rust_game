import { fightFn, fightInit } from "./mods/fight.js";
import { creditFn, creditKeys } from "./mods/credit.js";
import { exitFn, exitKeys } from "./mods/exit.js";
import { soundFn, keyToValue } from "./mods/sound.js";
import { levelsFn, isTableFull, levelKeys } from "./mods/levels-selector.js";
import {
  levels,
  menu,
  sound,
  exit,
  levelsID,
  soundID,
  exitID,
  creditID,
  fightID,
  content,
} from "./dom.js";
import { getButtons } from "./interop.js";

const sideOptionText = [levels, sound, exit];

const modsFunction = {
  1: levelsFn,
  2: soundFn,
  3: exitFn,
  4: creditFn,
  5: fightFn,
};

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
    menu.style.setProperty("--credit", this.current);
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
window.addEventListener("keydown", async (event) => {
  if (event.repeat) return;
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
  const modKeys = [
    levelKeys,
    Object.keys(keyToValue),
    exitKeys,
    creditKeys,
    await getButtons(), // Should be determine by the current level that doesn't exist at the start.
  ];
  if (modKeys[menuMod.current - 1].includes(key)) {
    const modRequestedTransition = await menuMod.fn(key);
    if (modRequestedTransition) menuMod.set(modRequestedTransition);
  }
});

window.addEventListener("keydown", async (event) => {
  if (event.repeat) return;
  await invoke("activate_menu", { key: event.key.toLowerCase() });
});
