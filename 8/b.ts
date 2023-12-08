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

const gcd = (a: number, b: number): number => (b == 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number): number => (a / gcd(a, b)) * b;
const lcmAll = (ns: number[]) => ns.reduce(lcm, 1);

let i = 0;
let current = Object.keys(obj).filter((k) => k.endsWith("A"));
let prevCurrent: string[][] = [];
let loops = current.map(() => -1);
while (true) {
  if (i > sequence.length - 1) i = 0;
  let a = sequence[i];
  current = current.map((c) => obj[c][a as "R" | "L"]);
  for (let j = 0; j < prevCurrent.length; j++) {
    for (let k = 0; k < current.length; k++) {
      if (loops[k] !== -1 || !current[k].endsWith("Z")) continue;
      if (current[k] === prevCurrent[j][k]) {
        loops[k] = j + 1;
        console.log(j + 1, res);
      }
    }
  }
  prevCurrent.unshift(current);

  res++;
  i++;
  // console.log(prevCurrent, loops);
  if (loops.every((a) => a !== -1)) break;
  // await new Promise((r) => setTimeout(r, 1000));
  if (res % 1000000 === 0) console.log(res);
}

console.log(lcmAll(loops));
