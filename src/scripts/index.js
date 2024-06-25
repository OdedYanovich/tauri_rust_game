import { HTML } from "./dom.js";
import { levelsFn, soundFn, exitFn, creditFn, gameFn } from "./mods.js";
console.log('4');
// import init, { Mod } from "../pkg/hello_wasm.js";
const { invoke } = window.__TAURI__.tauri;

let greetInputEl;
async function greet() {
  // https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}
const tempMenuHTML = document.querySelector(".tempMenu");
let isTempMenuOpen = false;

const html = new HTML();
const modsFunction = {
  1: levelsFn,
  2: soundFn,
  3: exitFn,
  4: creditFn,
  5: gameFn,
};
class MenuMod {
  // clearInterval(intervalId); //should happened after the mod "game" is left
  constructor() {
    this.current = 4; // Necessary for the first check of "set"
    this.set(4 /*Mod.Credit*/);
  }
  set(i) {
    html.mainText[this.current - 1].classList.remove("seen");
    if (this.current < 4) html.sideText[this.current - 1].classList.add("seen");
    this.current = i;
    this.fn = modsFunction[this.current];

    // Will be Necessary
    // getComputedStyle(document.documentElement).getPropertyValue("--credit")
    // document.documentElement.style.getPropertyValue("--credit", this.current)

    document.documentElement.style.setProperty("--credit", this.current);
    html.mainText[this.current - 1].classList.add("seen");
    if (this.current < 4 /*Mod.Credit*/)
      html.sideText[this.current - 1].classList.remove("seen");
  }
}
let menuMod = new MenuMod();

let intervalId;

let healthAmount = 100; //Why dose the bar refill every time 'game mod' begin?
// html.health.style.height = healthAmount + "%";

const keyToMod = {
  q: 1 /*Mod.Levels*/,
  a: 2 /*Mod.Sound*/,
  z: 3 /*Mod.Exit*/,
};
window.addEventListener("keydown", (event) => {
  let key = event.key.toLowerCase();

  if (key === "m") {
    isTempMenuOpen = !isTempMenuOpen;
    tempMenuHTML.classList.toggle("open", isTempMenuOpen);
    return;
  }
  let mod_associated_with_current_press = keyToMod[key];
  if (mod_associated_with_current_press) {
    if (menuMod.current === mod_associated_with_current_press) {
      menuMod.set(4 /*Mod.Credit*/);
    } else {
      menuMod.set(mod_associated_with_current_press);
    }
    return;
  }
  if (menuMod.fn(key)) menuMod.set(5 /*Mod.Game*/);
});

const currentLevel = 36;
// setAttribute;
