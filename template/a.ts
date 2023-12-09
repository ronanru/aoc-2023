const input = await Bun.file("test.txt").text();
// const input = await Bun.file("input.txt").text();

let res = 0;

const lines = input.split("\n").map((d) => parseInt(d));

console.log(res);
