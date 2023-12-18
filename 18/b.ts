// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let y = 0;
let x = 0;

let dist = 0;

const points = input.split("\n").map((d) => {
  const [_dir, _num, rawColor] = d.split(" ");
  const hexNum = rawColor.slice(2, -2);
  const dir = rawColor[7];
  const len = parseInt(hexNum, 16);
  // const dir = _dir;
  // const len = parseInt(_num);
  if (dir === "0" || dir === "R") {
    x += len;
  }
  if (dir === "2" || dir === "L") {
    x -= len;
  }
  if (dir === "3" || dir === "U") {
    y -= len;
  }
  if (dir === "1" || dir === "D") {
    y += len;
  }
  dist += len;
  return {
    x,
    y,
  };
});

let area = 0;
for (let i = 0; i < points.length - 2; i += 2) {
  let j = (i + 1) % points.length;
  area += points[i].x * points[j].y - points[j].x * points[i].y;
}
console.log(area + 1 + Math.floor(dist / 2));
