import { levelsID, wrapElement } from "../dom.js";
import { initFight, create_commands, check_player_action } from "../interop.js";

const progressLostMax = 50;
let progressLost = progressLostMax;
setInterval(() => {
  if (progressLost < progressLostMax) progressLost += 0.007;
  healthHTML.style.setProperty("--progressLost", progressLost + "%");
}, 1);

const fightContent = document.querySelector("#GameContent");
let commandRowsDom;

const healthHTML = document.querySelector(".health");
let incompleteSequence;

export const fightInit = async () => {
  progressLost = progressLostMax;
  commandRowsDom = [];
  fightContent.innerHTML = "";
  for (let i = 0; i < (await initFight()); i++) {
    commandRowsDom.push(document.createElement("d"));
    fightContent.appendChild(commandRowsDom[i]);
  }
  newCommand();
};
const newCommand = async () => {
  let commands = await create_commands();
  for (const i in commands) {
    switch (commands[i]["relation"]) {
      case "Bi":
        commandRowsDom[i].style.borderStyle = "none";
        break;

      case "Nbi":
        commandRowsDom[i].style.borderStyle = "solid";
        break;
    }
    commandRowsDom[i].innerHTML = wrapElement(commands[i]["visual"]["Button"]);
    // +wrapElement(commands[i]["index"] + 1);
  }
};
export const fightFn = async (key) => {
  incompleteSequence.push(key);
  switch (await check_player_action(incompleteSequence)) {
    case 0:
      if (progressLost < progressLostMax) progressLost += 4;
      else progressLost = progressLostMax;
      break;
    case 1:
      progressLost -= 4;
      if (progressLost < 0) return levelsID;

      break;
    default:
      return;
  }
  incompleteSequence = [];
  newCommand();
};
window.addEventListener("keyup", () => (incompleteSequence = []));
