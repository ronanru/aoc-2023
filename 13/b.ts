// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 0;

const blocks = input.split("\n\n").map((d) => d.split("\n"));

const doBlock = (block: string[]) => {
  for (let i = 1; i < block.length; i++) {
    let before = block.slice(0, i);
    let after = block.slice(i);
    // console.log(before, after);
    let j = 0;
    let err = 0;
    while (true) {
      let bef = before.at(-j - 1);
      let aft = after[j];
      if (!bef || !aft) {
        break;
      }
      for (let k = 0; k < bef.length; k++) {
        if (bef[k] !== aft[k]) {
          err++;
          if (err > 1) {
            break;
          }
        }
      }
      j++;
    }

    if (err === 1) {
      return i;
    }
  }
  return 0;
};

for (const block of blocks) {
  let score = 0;
  score += doBlock(block) * 100;
  if (score === 0) {
    const block2: string[][] = [];
    for (const line of block) {
      for (let i = 0; i < line.length; i++) {
        if (!block2[i]) {
          block2[i] = [];
        }
        block2[i].unshift(line[i]);
      }
    }
    score += doBlock(block2.map((d) => d.join("")));
  }
  res += score;
  console.log(block.join("\n"), score, "\n\n");
}

console.log(res);
