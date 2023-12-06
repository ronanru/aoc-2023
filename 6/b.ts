// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

const [time, distance] = input.split("\n").map((d) =>
  parseInt(
    d
      .split(" ")
      .filter((d) => d !== "")
      .slice(1)
      .join("")
  )
);

let c = 0;
for (let j = 1; j < time; j++) {
  const timeRemain = time - j;
  const myDistance = timeRemain * j;
  if (myDistance > distance) {
    c++;
  }
}

console.log(c);
