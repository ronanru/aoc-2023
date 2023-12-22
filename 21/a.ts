// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let canReach: [number, number][][] = [];

let startY = 0;
let startX = 0;

const board = input.split("\n").map((d, y) => {
  return d.split("").map((d, x) => {
    if (d === "#") {
      return 1;
    }
    if (d === "S") {
      startY = y;
      startX = x;
    }
    return 0;
  });
});

const run = (x: number, y: number, currentStep: number) => {
  if (x < 0 || x >= board[0].length || y < 0 || y >= board.length) {
    return;
  }
  if (board[y][x] === 1) {
    return;
  }
  if (!canReach[currentStep]) {
    canReach[currentStep] = [];
  }
  if (canReach[currentStep].some((d) => d[0] === x && d[1] === y)) {
    return;
  }
  if (currentStep > 64) {
    return;
  }
  canReach[currentStep].push([x, y]);
  run(x + 1, y, currentStep + 1);
  run(x - 1, y, currentStep + 1);
  run(x, y + 1, currentStep + 1);
  run(x, y - 1, currentStep + 1);
};

run(startX, startY, 0);

console.log(canReach[64].length);
