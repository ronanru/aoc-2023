// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

const hash = (line: string) => {
  let acc = 0;
  for (const char of line) {
    acc += char.charCodeAt(0);
    acc *= 17;
    acc %= 256;
  }
  return acc;
};

let map: [string, number][][] = [];

input.split(",").forEach((line) => {
  if (line.includes("=")) {
    let [label, focalLength] = line.split("=");
    let n = hash(label);
    if (!map[n]) map[n] = [];
    let idx = map[n].findIndex((pair) => pair[0] === label);
    if (idx !== -1) {
      map[n][idx][1] = parseInt(focalLength);
    } else {
      map[n].push([label, parseInt(focalLength)]);
    }
  } else {
    let label = line.slice(0, -1);
    let n = hash(label);
    if (!map[n]) map[n] = [];
    map[n] = map[n].filter((pair) => pair[0] !== label);
  }
});

let res = 0;
map.forEach((arr, i) => {
  arr.forEach((pair, j) => {
    res += (i + 1) * (j + 1) * pair[1];
  });
});

console.log(res);
