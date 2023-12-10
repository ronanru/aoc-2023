import chalk from "chalk";

// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let start: [number, number] = [0, 0];

const sShape = "F";

const lines = input.split("\n").map((d, i) => {
  let a = d.split("");
  let s = a.indexOf("S");
  if (s !== -1) {
    start = [s, i];
    a = a.map((d) => (d === "S" ? sShape : d));
  }
  return a;
});

let visited: [number, number][] = [];

const visit = ([x, y]: [number, number]) => {
  if (visited.some((v) => v[0] === x && v[1] === y)) return;
  visited.push([x, y]);
  switch (lines[y][x]) {
    case "F":
      visit([x + 1, y]);
      visit([x, y + 1]);
      break;
    case "L":
      visit([x, y - 1]);
      visit([x + 1, y]);
      break;
    case "-":
      visit([x - 1, y]);
      visit([x + 1, y]);
      break;
    case "|":
      visit([x, y - 1]);
      visit([x, y + 1]);
      break;
    case "J":
      visit([x - 1, y]);
      visit([x, y - 1]);
      break;
    case "7":
      visit([x - 1, y]);
      visit([x, y + 1]);
      break;
  }
};

let res = 0;
visit(start);

for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    if (!visited.some((v) => v[0] === x && v[1] === y)) {
      lines[y][x] = ".";
    }
  }
}
for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    let intersectionsRight = 0;
    let intersectionsLeft = 0;
    let intersectionsDown = 0;
    let intersectionsUp = 0;
    if (lines[y][x] === ".") {
      let pathRight = lines[y].slice(x + 1).join("");
      pathRight = pathRight.replaceAll(".", "");
      pathRight = pathRight.replaceAll("-", "");
      pathRight = pathRight.replaceAll("FJ", "|");
      pathRight = pathRight.replaceAll("L7", "|");
      intersectionsRight = Array.from(pathRight).filter(
        (d) => d === "|"
      ).length;
      let pathLeft = lines[y].slice(0, x).join("");
      pathLeft = pathLeft.replaceAll(".", "");
      pathLeft = pathLeft.replaceAll("-", "");
      pathLeft = pathLeft.replaceAll("FJ", "|");
      pathLeft = pathLeft.replaceAll("L7", "|");
      intersectionsLeft = Array.from(pathLeft).filter((d) => d === "|").length;
      let pathDown = lines
        .slice(y + 1)
        .map((d) => d[x])
        .join("");
      pathDown = pathDown.replaceAll(".", "");
      pathDown = pathDown.replaceAll("|", "");
      pathDown = pathDown.replaceAll("FJ", "-");
      pathDown = pathDown.replaceAll("7L", "-");
      intersectionsDown = Array.from(pathDown).filter((d) => d === "-").length;
      let pathUp = lines
        .slice(0, y)
        .map((d) => d[x])
        .join("");
      pathUp = pathUp.replaceAll(".", "");
      pathUp = pathUp.replaceAll("|", "");
      pathUp = pathUp.replaceAll("FJ", "-");
      pathUp = pathUp.replaceAll("7L", "-");
      intersectionsUp = Array.from(pathUp).filter((d) => d === "-").length;
    }

    if (
      intersectionsRight % 2 === 1 &&
      intersectionsDown % 2 === 1 &&
      intersectionsUp % 2 === 1 &&
      intersectionsLeft % 2 === 1
    ) {
      res++;
      lines[y][x] = chalk.green("X");
    }
  }
}

console.log(lines.map((d) => d.join("")).join("\n"));
console.log(res);
