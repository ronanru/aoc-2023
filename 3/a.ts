import chalk from "chalk";

// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 0;

const rawLines = input.split("\n");
const str = new Array(rawLines[0].length + 2).fill(".").join("");

const lines = [str, ...rawLines.map((d) => `.${d}.`), str];

const isSymbol = (char: string) => {
  return char !== "." && isNaN(parseInt(char));
};

for (let i = 1; i < lines.length - 1; i++) {
  let currentNumber = 0;
  let isOk = false;
  let currentLine = "";
  for (let j = 0; j < lines[i].length; j++) {
    const num = parseInt(lines[i][j]);
    if (isNaN(num)) {
      // console.log(currentNumber, j);
      if (isOk) {
        res += currentNumber;
        // if (currentNumber > 0) console.log(currentNumber);
        currentLine += chalk.green(currentNumber.toString());
      } else if (currentNumber > 0)
        currentLine += chalk.red(currentNumber.toString());
      currentLine += isSymbol(lines[i][j])
        ? chalk.blue(lines[i][j])
        : lines[i][j];
      isOk = false;
      currentNumber = 0;
      continue;
    }
    currentNumber = currentNumber * 10 + num;
    if (
      lines[i + 1][j] !== "." ||
      lines[i - 1][j] !== "." ||
      isSymbol(lines[i][j + 1]) ||
      isSymbol(lines[i][j - 1]) ||
      lines[i + 1][j + 1] !== "." ||
      lines[i - 1][j - 1] !== "." ||
      lines[i + 1][j - 1] !== "." ||
      lines[i - 1][j + 1] !== "."
    ) {
      isOk = true;
    }
  }
  console.log(currentLine);
}

console.log(res);
