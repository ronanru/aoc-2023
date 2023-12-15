// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

const res = input
  .split(",")
  .map((line) => {
    let acc = 0;
    for (const char of line) {
      acc += char.charCodeAt(0);
      acc *= 17;
      acc %= 256;
    }
    return acc;
  })
  .reduce((acc, cur) => acc + cur, 0);

console.log(res);
