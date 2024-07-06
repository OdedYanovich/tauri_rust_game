class Level {
  constructor(buttons, presses, commands) {
    this.buttons = buttons;
    this.presses = presses;
    this.commands = commands;
  }
}
export const commandBi = 0;
const commandNbi = 1;
export const levels = {
  1: new Level(2, 1, [[commandBi]]),
  2: new Level(2, 1, [[commandNbi]]),
  3: new Level(2, 1, [[commandBi, commandNbi]]),
  4: new Level(3, 1, [[commandBi]]),
  5: new Level(3, 1, [[commandNbi]]),
  6: new Level(3, 1, [[commandBi, 1]]),
};
