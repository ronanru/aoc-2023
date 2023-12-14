// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 0;

const lines = input.split("\n").map((line) => line.split(""));

const prevStates: string[] = [];

for (let c = 0; c < 1000000000; c++) {
  if (c % 1_000_000 === 0) console.log(c);
  for (let j = 0; j < lines[0].length; j++) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i][j] !== ".") continue;
      for (let k = i + 1; k < lines.length; k++) {
        if (lines[k][j] === "#") break;
        if (lines[k][j] === "O") {
          lines[k][j] = ".";
          lines[i][j] = "O";
          i++;
        }
      }
    }
  }
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] !== ".") continue;
      for (let k = j + 1; k < lines[i].length; k++) {
        if (lines[i][k] === "#") break;
        if (lines[i][k] === "O") {
          lines[i][k] = ".";
          lines[i][j] = "O";
          j++;
        }
      }
    }
  }
  for (let j = 0; j < lines[0].length; j++) {
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i][j] !== ".") continue;
      for (let k = i - 1; k >= 0; k--) {
        if (lines[k][j] === "#") break;
        if (lines[k][j] === "O") {
          lines[k][j] = ".";
          lines[i][j] = "O";
          i--;
        }
      }
    }
  }
  for (let i = 0; i < lines.length; i++) {
    for (let j = lines[i].length - 1; j >= 0; j--) {
      if (lines[i][j] !== ".") continue;
      for (let k = j - 1; k >= 0; k--) {
        if (lines[i][k] === "#") break;
        if (lines[i][k] === "O") {
          lines[i][k] = ".";
          lines[i][j] = "O";
          j--;
        }
      }
    }
  }

  let str = JSON.stringify(lines);
  let index = prevStates.indexOf(str);
  if (index !== -1) {
    console.log("Found loop", index, c);
    c += Math.floor((1000000000 - c) / (c - index)) * (c - index);
  }
  prevStates.push(str);
}

console.log(lines.map((line) => line.join("")).join("\n"));

lines.reverse();

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (lines[i][j] === "O") res += i + 1;
  }
}

console.log(res);
