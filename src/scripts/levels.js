class Level {
  constructor(buttons, presses, commands) {
    this.buttons = buttons;
    this.presses = presses;
    this.commands = commands;
  }
}
export const commandBi = 0;
const commandNbi = 1;
export const levels = [
  new Level(2, 1, [[commandBi]]),
  new Level(2, 1, [[commandNbi]]),
  new Level(2, 1, [[commandBi, commandNbi]]),
  new Level(3, 1, [[commandBi]]),
  new Level(3, 1, [[commandNbi]]),
  new Level(3, 1, [[commandBi, commandNbi]]),
];
