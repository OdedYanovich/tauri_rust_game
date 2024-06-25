// import init, { Command } from "../pkg/hello_wasm.js";
console.log('2');
class Level {
  constructor(buttons, presses, commands) {
    this.buttons = buttons;
    this.presses = presses;
    this.commands = commands;
  }
}
export const levels = {
  1: new Level(2, 1, [[0 /*Command.Bi*/]]),
  2: new Level(2, 1, [[1 /*Command.Nbi*/]]),
  3: new Level(2, 1, [[0 /*Command.Bi*/, 1 /*Command.Nbi*/]]),
  4: new Level(3, 1, [[0 /*Command.Bi*/]]),
  5: new Level(3, 1, [[1 /*Command.Nbi*/]]),
  6: new Level(3, 1, [[0 /*Command.Bi*/, 1 /*Command.Nbi*/]]),
};
