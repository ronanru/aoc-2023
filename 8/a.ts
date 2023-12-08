// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 0;

const lines = input.split("\n");

const sequence = lines.shift()!;
lines.shift();

const obj: Record<
  string,
  {
    R: string;
    L: string;
  }
> = {};

lines.forEach((line) => {
  const [key, value] = line.split(" = ");
  obj[key] = {
    L: value.slice(1, 4),
    R: value.slice(6, 9),
  };
});

let i = 0;
let current = "AAA";
while (true) {
  if (i > sequence.length - 1) i = 0;
  let a = sequence[i];
  current = obj[current][a as "R" | "L"];
  res++;
  i++;
  console.log(current, a, i);
  if (current === "ZZZ") break;
  // await new Promise((r) => setTimeout(r, 1000));
}

console.log(res);
