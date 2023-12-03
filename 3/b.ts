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

const stars = new Map<string, number[]>();

for (let i = 1; i < lines.length - 1; i++) {
  let currentNumber = 0;
  let starCoords: [number, number][] = [];
  let currentLine = "";
  for (let j = 0; j < lines[i].length; j++) {
    const num = parseInt(lines[i][j]);
    if (isNaN(num)) {
      if (starCoords.length > 0) {
        const starArr = stars.get(starCoords[0].toString()) || [];
        starArr.push(currentNumber);
        stars.set(starCoords[0].toString(), starArr);
        currentLine += chalk.green(currentNumber.toString());
      } else if (currentNumber > 0)
        currentLine += chalk.red(currentNumber.toString());
      currentLine += isSymbol(lines[i][j])
        ? chalk.blue(lines[i][j])
        : lines[i][j];
      starCoords = [];
      currentNumber = 0;
      continue;
    }
    currentNumber = currentNumber * 10 + num;
    [
      [i + 1, j],
      [i - 1, j],
      [i, j + 1],
      [i, j - 1],
      [i + 1, j + 1],
      [i - 1, j - 1],
      [i + 1, j - 1],
      [i - 1, j + 1],
    ].forEach(([i, j]) => {
      if (
        lines[i][j] === "*" &&
        !starCoords.some(([i, j]) => i === i && j === j)
      ) {
        starCoords.push([i, j]);
      }
    });
  }
  console.log(currentLine);
}

console.log(stars);

for (const value of stars.values()) {
  if (value.length === 2) {
    console.log(value);
    res += value[0] * value[1];
  }
}

console.log(res);
