// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 0;

const calculate = (pattern: string, numbers: number[]): number => {
  if (pattern.includes("?"))
    return (
      calculate(pattern.replace("?", "."), numbers) +
      calculate(pattern.replace("?", "#"), numbers)
    );
  let d = pattern
    .split(".")
    .filter(Boolean)
    .map((d) => d.length);
  if (d.length < numbers.length) return 0;
  return d.every((d, i) => d === numbers[i]) ? 1 : 0;
};

input.split("\n").forEach((d) => {
  let [pattern, rawNumbers] = d.split(" ");
  const numbers = rawNumbers.split(",").map((d) => parseInt(d));
  let da = calculate(pattern, numbers);
  console.log(pattern, da);
  res += da;
});

console.log(res);
