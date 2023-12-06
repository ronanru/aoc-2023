// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 1;

const [times, didstances] = input.split("\n").map((d) =>
  d
    .split(" ")
    .filter((d) => d !== "")
    .slice(1)
    .map((d) => parseInt(d))
);

for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const distance = didstances[i];
  let c = 0;
  for (let j = 1; j < time; j++) {
    const timeRemain = time - j;
    const myDistance = timeRemain * j;
    if (myDistance > distance) {
      c++;
    }
  }
  res *= c;
}

console.log(res);
