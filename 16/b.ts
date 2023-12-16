// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

type Direction = {
  x: number;
  y: number;
};

const field = input.split("\n").map((d) => Array.from(d));

const startRun = (x: number, y: number, direction: Direction) => {
  const energized: Record<string, Direction[]> = {};
  const run = async (x: number, y: number, direction: Direction) => {
    if (x < 0 || y < 0 || x >= field[0].length || y >= field.length) return;
    const key = `${x},${y}`;
    if (!energized[key]) energized[key] = [];
    if (energized[key].some((d) => d.x === direction.x && d.y === direction.y))
      return;
    energized[key].push(direction);

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
  run(x, y, direction);
  return Object.keys(energized).length;
};

let res = 0;

for (let i = 0; i < field[0].length; i++) {
  let a = startRun(i, 0, { x: 0, y: 1 });
  let b = startRun(i, field.length - 1, { x: 0, y: -1 });
  if (a > res) res = a;
  if (b > res) res = b;
}

for (let i = 0; i < field.length; i++) {
  let a = startRun(0, i, { x: 1, y: 0 });
  let b = startRun(field[0].length - 1, i, { x: -1, y: 0 });
  if (a > res) res = a;
  if (b > res) res = b;
}

console.log(res);
