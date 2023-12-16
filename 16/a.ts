// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

type Direction = {
  x: number;
  y: number;
};

const energized: Record<string, Direction[]> = {};

const field = input.split("\n").map((d) => Array.from(d));

const run = async (x: number, y: number, direction: Direction) => {
  if (x < 0 || y < 0 || x >= field[0].length || y >= field.length) return;
  const key = `${x},${y}`;
  if (!energized[key]) energized[key] = [];
  if (energized[key].some((d) => d.x === direction.x && d.y === direction.y))
    return;
  energized[key].push(direction);

  // console.clear();
  // console.log(
  //   field
  //     .map((d, i) => {
  //       if (i === y) {
  //         return d
  //           .map((d, j) => {
  //             if (j === x) return "O";
  //             return d;
  //           })
  //           .join("");
  //       }
  //       return d.join("");
  //     })
  //     .join("\n")
  // );
  // await new Promise((r) => setTimeout(r, 500));

  switch (field[y][x]) {
    case ".": {
      run(x + direction.x, y + direction.y, direction);
      break;
    }
    case "|": {
      if (direction.x === 0) {
        run(x + direction.x, y + direction.y, direction);
        break;
      }
      run(x, y + 1, {
        x: 0,
        y: 1,
      });
      run(x, y - 1, {
        x: 0,
        y: -1,
      });
      break;
    }
    case "-": {
      if (direction.y === 0) {
        run(x + direction.x, y + direction.y, direction);
        break;
      }
      run(x + 1, y, {
        x: 1,
        y: 0,
      });
      run(x - 1, y, {
        x: -1,
        y: 0,
      });
      break;
    }
    case "/": {
      if (direction.x === 0) {
        if (direction.y === 1) {
          run(x - 1, y, {
            x: -1,
            y: 0,
          });
          break;
        }
        run(x + 1, y, {
          x: 1,
          y: 0,
        });
        break;
      }
      if (direction.x === 1) {
        run(x, y - 1, {
          x: 0,
          y: -1,
        });
        break;
      }
      run(x, y + 1, {
        x: 0,
        y: 1,
      });
      break;
    }
    case "\\": {
      if (direction.x === 0) {
        if (direction.y === 1) {
          run(x + 1, y, {
            x: 1,
            y: 0,
          });
          break;
        }
        run(x - 1, y, {
          x: -1,
          y: 0,
        });
        break;
      }
      if (direction.x === 1) {
        run(x, y + 1, {
          x: 0,
          y: 1,
        });
        break;
      }
      run(x, y - 1, {
        x: 0,
        y: -1,
      });
      break;
    }
  }
};

run(0, 0, {
  x: 1,
  y: 0,
});

console.log(Object.keys(energized).length);
