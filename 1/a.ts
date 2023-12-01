const input = await Bun.file("input.txt").text();
// const input = await Bun.file("test.txt").text();
const lines = input.split("\n").map((line) =>
  Array.from(line)
    .map((d) => parseInt(d))
    .filter((d) => !isNaN(d))
);

let acc = 0;

for (const line of lines) {
  console.log(line);
  acc += line[0] * 10 + line.at(-1)!;
}

console.log(acc);
