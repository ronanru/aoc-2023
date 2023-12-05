// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = Infinity;

const seeds = input
  .split("\n")[0]
  .split(": ")[1]
  .split(" ")
  .map((d) => parseInt(d));
// const seeds = [79];

let converters = input
  .split("\n\n")
  .slice(1)
  .map((d) =>
    d
      .split("\n")
      .slice(1)
      .map((d) => d.split(" ").map((d) => parseInt(d)))
  );
// converters = [converters.shift()!];

console.log(seeds);

seeds.forEach((seed) => {
  for (const map of converters) {
    for (const [to, from, l] of map) {
      if (from <= seed && from + l > seed) {
        seed = to + (seed - from);
        break;
      }
    }
  }
  console.log(seed);
  if (seed < res) res = seed;
});

console.log();
console.log(res);
