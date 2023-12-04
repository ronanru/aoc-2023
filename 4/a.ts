// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 0;

const lines = input.split("\n");

lines.forEach((d, i) => {
  const data = d.split(": ")[1];
  const [win, my] = data.split(" | ").map((d) =>
    d
      .split(" ")
      .filter(Boolean)
      .map((d) => {
        const a = parseInt(d.trim());
        if (isNaN(a)) {
          console.log("error", d);
        }
        return a;
      })
  );
  let score = 0;
  my.forEach((d) => {
    if (win.includes(d)) {
      console.log("win", i, d);
      if (score === 0) {
        score = 1;
      } else {
        score *= 2;
      }
    }
  });
  res += score;
  console.log(i, score);
});

console.log(res);
