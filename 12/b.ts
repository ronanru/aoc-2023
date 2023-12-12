// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 0;

let memo = new Map<string, number>();

const cache = (key: string, val: number) => {
  memo.set(key, val);
  return val;
};

const calculate = (pattern: string, numbers: number[], acc = 0): number => {
  let key = `${pattern} ${numbers.join()} ${acc}`;
  if (memo.has(key)) return memo.get(key)!;
  if (pattern.length === 0) {
    if (numbers.length === 0 && acc === 0) {
      return cache(key, 1);
    }
    if (numbers.length === 1 && acc > 0 && acc === numbers[0]) {
      return cache(key, 1);
    }
    return cache(key, 0);
  }
  if (acc > 0 && numbers.length === 0) {
    return cache(key, 0);
  }
  let a = 0;

  if (pattern[0] === "." && acc > 0) {
    if (acc === numbers[0])
      a += calculate(pattern.slice(1), numbers.slice(1), 0);
    else return cache(key, 0);
  }
  if (pattern[0] === "?" && acc > 0 && acc === numbers[0]) {
    a += calculate(pattern.slice(1), numbers.slice(1), 0);
  }
  if (pattern[0] === "#" || pattern[0] === "?") {
    a += calculate(pattern.slice(1), numbers, acc + 1);
  }
  if ((pattern[0] === "." || pattern[0] === "?") && acc === 0) {
    a += calculate(pattern.slice(1), numbers, 0);
  }
  return cache(key, a);
};

input.split("\n").forEach((d, i) => {
  let [pattern, rawNumbers] = d.split(" ");
  pattern = `${pattern}?`.repeat(5).slice(0, -1);
  rawNumbers = `${rawNumbers},`.repeat(5).slice(0, -1);
  const numbers = rawNumbers.split(",").map((d) => parseInt(d));
  let da = calculate(pattern, numbers);
  console.log(i, da);
  res += da;
});

console.log(res);
