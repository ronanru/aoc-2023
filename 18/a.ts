// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let y = 0;
let x = 0;
let maxX = 0;
let maxY = 0;
let minY = 0;
let minX = 0;

let moves = input.split("\n").map((d) => {
  const [dir, rawLen, rawColor] = d.split(" ");
  const len = parseInt(rawLen);
  if (dir === "R") x += len;
  if (dir === "L") x -= len;
  if (dir === "U") y -= len;
  if (dir === "D") y += len;
  maxX = Math.max(x, maxX);
  maxY = Math.max(y, maxY);
  minY = Math.min(y, minY);
  minX = Math.min(x, minX);
  return {
    dir,
    len,
  };
});

console.log(maxX, maxY, minX, minY);

const grid = Array.from({ length: maxY + 1 - minY }, () =>
  Array.from({ length: maxX + 1 - minX }, () => ".")
);

x = -minX;
y = -minY;
moves.forEach(({ dir, len }) => {
  console.log(x, y);
  if (dir === "R") {
    for (let i = 0; i < len; i++) {
      x++;
      grid[y][x] = "#";
    }
  }
  if (dir === "L") {
    for (let i = 0; i < len; i++) {
      x--;
      grid[y][x] = "#";
    }
  }
  if (dir === "U") {
    for (let i = 0; i < len; i++) {
      y--;
      grid[y][x] = "#";
    }
  }
  if (dir === "D") {
    for (let i = 0; i < len; i++) {
      y++;
      grid[y][x] = "#";
    }
  }
});

const newGrid = [...grid.map((d) => [...d])];

newGrid[100][100] = "O";

const run = (x: number, y: number) => {
  if (newGrid[y][x] === "#") return;
  newGrid[y][x] = "#";
  run(x + 1, y);
  run(x - 1, y);
  run(x, y + 1);
  run(x, y - 1);
};
run(100, 100);

console.log(newGrid.map((d) => d.join("")).join("\n"));
let res = 0;
newGrid.forEach((d) => {
  res += d.filter((d) => d === "#").length;
});

console.log(res);
