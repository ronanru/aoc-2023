// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 0;

input.split("\n").forEach((line, i) => {
  const [first, second] = line.split(": ");
  const max = {
    red: 0,
    green: 0,
    blue: 0,
  } as Record<string, number>;
  second.split("; ").forEach((item) => {
    const rev = item.split(", ");
    console.log(rev);
    rev.forEach((item) => {
      const [num, color] = item.split(" ");
      max[color] = Math.max(max[color], parseInt(num));
    });
  });
  console.log(max);
  const power = max.red * max.green * max.blue;
  console.log(power);
  res += power;
});

console.log(res);
