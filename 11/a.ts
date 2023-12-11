// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let lines = input.split("\n").map((d) => d.split(""));
let freeColumns = lines[0].map((_, i) => i);
let freeRows = lines.map((_, i) => i);
lines.forEach((line, y) => {
  line.forEach((char, x) => {
    if (char === "#") {
      freeColumns = freeColumns.filter((c) => c !== x);
      freeRows = freeRows.filter((r) => r !== y);
    }
  });
});
lines = lines.flatMap((line, y) =>
  freeRows.includes(y) ? [line, line] : [line]
);
lines = lines.map((line) =>
  line.flatMap((char, x) => (freeColumns.includes(x) ? [char, char] : [char]))
);
const stars: [number, number][] = [];
lines.forEach((line, y) => {
  line.forEach((char, x) => {
    if (char === "#") {
      stars.push([x, y]);
    }
  });
});

let res = 0;

for (let i = 0; i < stars.length; i++) {
  const [x, y] = stars[i];
  for (let j = 0; j < i; j++) {
    const [x2, y2] = stars[j];
    const dx = Math.abs(x2 - x);
    const dy = Math.abs(y2 - y);
    const distance = dx + dy;
    console.log(i + 1, j + 1, distance);
    res += distance;
  }
}

console.log(stars);
console.log(lines.map((d) => d.join("")).join("\n"));
console.log();
console.log(res);
