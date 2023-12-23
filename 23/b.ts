// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

const grid = input.split("\n").map((d) => Array.from(d));

let intersections: Record<
  string,
  {
    length: number;
    intersection: string;
  }[]
> = {
  START: [],
};

let visited = new Set<string>();

const run = (
  x: number,
  y: number,
  lastIntersection: string,
  localVisited: string[]
) => {
  let key = `${x},${y}`;
  if (key === lastIntersection) return;
  if (y < 0 || y >= grid.length || x < 0 || x >= grid[0].length) return;
  if (y === 0) return;
  if (visited.has(key) || localVisited.includes(key)) return;
  if (grid[y][x] === "#") return;
  let isIntersection = false;
  if (y === grid.length - 1) {
    key = "GOAL";
    isIntersection = true;
  }
  if (!isIntersection) {
    let turns = 0;
    if (grid[y - 1][x] !== "#") turns++;
    if (grid[y + 1][x] !== "#") turns++;
    if (grid[y][x - 1] !== "#") turns++;
    if (grid[y][x + 1] !== "#") turns++;
    if (turns > 2) isIntersection = true;
  }
  if (isIntersection) {
    intersections[lastIntersection].push({
      length: localVisited.length,
      intersection: key,
    });
    intersections[key] ||= [];
    intersections[key].push({
      length: localVisited.length,
      intersection: lastIntersection,
    });
    // console.log(lastIntersection, key, localVisited, localVisited.length);
    lastIntersection = key;
    for (let i = 0; i < localVisited.length; i++) {
      visited.add(localVisited[i]);
    }
    localVisited = [];
  } else {
    localVisited = [...localVisited, key];
  }
  // visited.add(key);
  run(x + 1, y, lastIntersection, localVisited);
  run(x, y + 1, lastIntersection, localVisited);
  run(x - 1, y, lastIntersection, localVisited);
  run(x, y - 1, lastIntersection, localVisited);
};

run(grid[0].indexOf("."), 1, "START", []);

let res = 0;

// console.log(intersections);

const find = (key: string, lengths: number[], visited: string[]) => {
  if (visited.includes(key)) return;
  if (key === "GOAL") {
    let a = lengths.reduce((a, b) => a + b + 1, 0);
    if (a > res) {
      res = a;
    }
    return;
  }
  let i = intersections[key];
  for (let j of i) {
    find(j.intersection, [...lengths, j.length], [...visited, key]);
  }
};

find("START", [], []);

console.log(res);
