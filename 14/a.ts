// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 0;

const lines = input.split("\n").map((line) => line.split(""));

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (lines[i][j] !== ".") continue;
    for (let k = i + 1; k < lines.length; k++) {
      if (lines[k][j] === "#") break;
      if (lines[k][j] === "O") {
        lines[k][j] = ".";
        lines[i][j] = "O";
        break;
      }
    }
  }
}

console.log(lines.map((line) => line.join("")).join("\n"));

lines.reverse();

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (lines[i][j] === "O") res += i + 1;
  }
}

console.log(res);
