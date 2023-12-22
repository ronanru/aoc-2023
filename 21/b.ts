// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let startY = 0;
let startX = 0;

const board = input.split("\n").map((d, y) => {
  return d.split("").map((d, x) => {
    if (d === "#") {
      return true;
    }
    if (d === "S") {
      startY = y;
      startX = x;
    }
    return false;
  });
});

let res = [];

let canReach: [number, number][] = [[startX, startY]];

const test = (x: number, y: number) => {
  x %= board[0].length;
  y %= board.length;
  if (x < 0) x += board[0].length;
  if (y < 0) y += board.length;
  return !board[y][x];
};

let step = 1;

while (true) {
  console.log(step, canReach.length);
  const newCanReach: [number, number][] = [];
  for (const [x, y] of canReach) {
    if (
      test(x - 1, y) &&
      !newCanReach.some((d) => d[0] === x - 1 && d[1] === y)
    ) {
      newCanReach.push([x - 1, y]);
    }
    if (
      test(x + 1, y) &&
      !newCanReach.some((d) => d[0] === x + 1 && d[1] === y)
    ) {
      newCanReach.push([x + 1, y]);
    }
    if (
      test(x, y - 1) &&
      !newCanReach.some((d) => d[0] === x && d[1] === y - 1)
    ) {
      newCanReach.push([x, y - 1]);
    }
    if (
      test(x, y + 1) &&
      !newCanReach.some((d) => d[0] === x && d[1] === y + 1)
    ) {
      newCanReach.push([x, y + 1]);
    }
  }
  if (step === Math.floor(0.5 * board.length) + res.length * board.length) {
    res.push(newCanReach.length);
    if (res.length === 3) {
      let n = 26501365 / board.length;

      let a0 = res[0];
      let a1 = res[1];
      let a2 = res[2];

      let b0 = a0;
      let b1 = a1 - a0;
      let b2 = a2 - a1;
      console.log(b0 + b1 * n + ((n * (n - 1)) / 2) * (b2 - b1));
      break;
    }
  }
  step++;
  canReach = newCanReach;
}
