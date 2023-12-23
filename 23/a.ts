// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

const grid = input.split("\n").map((d) => Array.from(d));

const f: number[] = [];

const run = (x: number, y: number, visited: [number, number][]) => {
  if (visited.some(([x2, y2]) => x2 === x && y2 === y)) return;
  if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) return;
  if (grid[y][x] === "#") return;
  visited = [...visited, [x, y]];
  if (y === grid.length - 1) {
    console.log("DONE", visited.length, visited);
    f.push(visited.length - 1);
  }
  switch (grid[y][x]) {
    case ".":
      run(x, y + 1, visited);
      run(x, y - 1, visited);
      run(x + 1, y, visited);
      run(x - 1, y, visited);
      break;
    case ">":
      run(x + 1, y, visited);
      break;
    case "<":
      run(x - 1, y, visited);
      break;
    case "^":
      run(x, y - 1, visited);
      break;
    case "v":
      run(x, y + 1, visited);
      break;
  }
};

run(grid[0].indexOf("."), 0, []);

console.log(Math.max(...f));
