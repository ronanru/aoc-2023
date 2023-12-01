const input = await Bun.file("input.txt").text();
// const input = await Bun.file("test.txt").text();

const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const replaceDigitNames = (s: string) => {
  for (let i = 0; i < digits.length; i++) {
    s = s.replaceAll(digits[i], `${digits[i]}${i + 1}${digits[i]}`);
  }
  return s;
};

const lines = input.split("\n").map((line) => {
  const d = replaceDigitNames(line);
  console.log(d);
  return Array.from(d)
    .map((d) => parseInt(d))
    .filter((d) => !isNaN(d));
});

let acc = 0;

for (const line of lines) {
  acc += line[0] * 10 + line.at(-1)!;
}

console.log(acc);
