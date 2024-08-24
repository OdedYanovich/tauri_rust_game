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

const newCommand = async () => {
  let commands = await create_commands();
  // console.table(commands)
  for (const command in commands) {
    // console.log(command);
    // console.log(commandRowsDom[command]);
    switch (commands[command]["command_type"]) {
      case "Bi":
        commandRowsDom[command].style.borderStyle = "none";
        break;

      case "Nbi":
        commandRowsDom[command].style.borderStyle = "solid";
        break;
    }
    commandRowsDom[command].innerHTML =
      wrapElement(commands[command]["button"]) +
      wrapElement(commands[command]["index"] + 1);
  }
  // console.log(commandRowsDom); //Debug
};
export const fightInit = async () => {
  commandRowsDom = [];
  fightContent.innerHTML = "";
  for (let i = 0; i < (await initFight()); i++) {
    commandRowsDom.push(document.createElement("d"));
    fightContent.appendChild(commandRowsDom[i]);
  }
  // create_commands();
  newCommand();
};
export const fightFn = async (key) => {
  incompleteSequence.push(key);
  let result = await check_player_action(incompleteSequence);
  // console.log(result);

  switch (result) {
    // await check_player_action(incompleteSequence)
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
