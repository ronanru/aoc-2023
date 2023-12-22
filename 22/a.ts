// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let maxZ = 0;
let maxY = 0;
let maxX = 0;

let blocks = input.split("\n").map((d) => {
  let [start, end] = d.split("~");
  let startNumbers = start.split(",").map((d) => parseInt(d));
  let endNumbers = end.split(",").map((d) => parseInt(d));
  if (endNumbers[0] > maxX) maxX = endNumbers[0];
  if (endNumbers[1] > maxY) maxY = endNumbers[1];
  if (endNumbers[2] > maxZ) maxZ = endNumbers[2];
  return {
    start: startNumbers,
    end: endNumbers,
    dimensions: endNumbers.map((d, i) => d - startNumbers[i]),
  };
});

blocks.sort((a, b) => {
  return a.start[2] - b.start[2];
});

let grid = new Array(maxZ + 1)
  .fill(0)
  .map((_, z) =>
    new Array(maxY + 1)
      .fill(0)
      .map((_, y) =>
        new Array(maxX + 1)
          .fill(0)
          .map(
            (_, x) =>
              blocks.findIndex(
                (block) =>
                  block.start[0] <= x &&
                  block.end[0] >= x &&
                  block.start[1] <= y &&
                  block.end[1] >= y &&
                  block.start[2] <= z &&
                  block.end[2] >= z
              ) + 1
          )
      )
  );

blocks = blocks.map((block, i) => {
  let minZ = block.start[2] - 1;
  while (true) {
    let canGoDown = minZ >= 0;
    if (!canGoDown) break;
    for (let y = block.start[1]; y <= block.end[1]; y++) {
      for (let x = block.start[0]; x <= block.end[0]; x++) {
        if (grid[minZ][y][x] !== 0) canGoDown = false;
      }
    }
    if (!canGoDown) break;
    minZ--;
  }
  const moveDownBy = block.start[2] - minZ - 1;

  grid = grid.map((layer) =>
    layer.map((row) => row.map((brick) => (brick === i + 1 ? 0 : brick)))
  );
  grid = grid.map((layer, z) =>
    layer.map((row, y) =>
      row.map((brick, x) =>
        z >= block.start[2] - moveDownBy &&
        z <= block.end[2] - moveDownBy &&
        y >= block.start[1] &&
        y <= block.end[1] &&
        x >= block.start[0] &&
        x <= block.end[0]
          ? i + 1
          : brick
      )
    )
  );

  return {
    ...block,
    start: [block.start[0], block.start[1], block.start[2] - moveDownBy],
    end: [block.end[0], block.end[1], block.end[2] - moveDownBy],
  };
});

let supportedBy: Record<number, number[]> = {};
for (let z = 1; z < grid.length; z++) {
  for (let y = 0; y < grid[z].length; y++) {
    for (let x = 0; x < grid[z][y].length; x++) {
      if (grid[z][y][x] === 0) continue;
      if (
        z === 0 ||
        (grid[z - 1][y][x] !== 0 && grid[z - 1][y][x] !== grid[z][y][x])
      ) {
        let brick = grid[z][y][x];
        supportedBy[brick] ||= [];
        if (!supportedBy[brick].includes(grid[z - 1][y][x]))
          supportedBy[brick].push(grid[z - 1][y][x]);
      }
    }
  }
}

let res = 0;
console.log(grid);

let values = Object.values(supportedBy);
for (let i = 0; i < blocks.length; i++) {
  if (values.every((v) => !v.includes(i + 1) || v.length > 1)) {
    console.log(i + 1);
    res++;
  }
}

console.log(res);
