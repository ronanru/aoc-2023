// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

const totals = {
  red: 12,
  green: 13,
  blue: 14,
} as Record<string, number>;

let res = 0;

input.split("\n").forEach((line, i) => {
  let isOkBig = true;
  const [first, second] = line.split(": ");
  second.split("; ").forEach((item) => {
    const rev = item.split(", ");
    console.log(rev);
    rev.forEach((item) => {
      const [num, color] = item.split(" ");
      console.log(num, color);
      if (totals[color] < parseInt(num)) {
        // console.log(i + 1, color, parseInt(num));
        isOkBig = false;
      }
    });
  });
  // console.log(isOkBig, i + 1);
  if (isOkBig) {
    const num = parseInt(first.split(" ")[1]);
    console.log(i + 1);
    res += num;
  }
});

console.log(res);
