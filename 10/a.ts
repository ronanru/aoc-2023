// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let start: [number, number] = [0, 0];

const sShape = "L";

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

visit(start);

console.log(visited.length / 2);
