console.log('1');
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

export class HTML {
  constructor() {
    this.sideText = [
      document.querySelector("#Levels"),
      document.querySelector("#Sound"),
      document.querySelector("#Exit"),
    ];
    this.mainText = [
      document.querySelector("#LevelsContent"),
      document.querySelector("#SoundContent"),
      document.querySelector("#ExitContent"),
      document.querySelector("#CreditContent"),
      document.querySelector("#GameContent"),
    ];
    document.querySelector("#SoundTable").innerHTML = soundOptionsDisplayHTML;
    this.mainText[0].innerHTML = levelsOptionsDisplayHTML;
  }
}
