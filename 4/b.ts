// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 0;

const lines = input.split("\n");

const queue: string[] = [];

queue.push(lines.shift()!);

let i = 0;
while (true) {
  i++;
  const array = queue.length > 0 ? queue : lines;
  if (array.length === 0) {
    console.log("done");
    break;
  }
  const d = array.shift()!;
  if (!d) {
    console.log("error");
    break;
  }
  const [meta, data] = d.split(": ");
  const cardNum = parseInt(meta.split(" ").at(-1)!);
  // console.log(i, cardNum);
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
  // console.log(i, win, my);
  let a = cardNum + 1;
  my.forEach((d) => {
    if (win.includes(d)) {
      const z = lines.find((d) =>
        d.startsWith(
          `Card ${new Array(3 - a.toString().length).fill(" ").join("")}${a}`
        )
      )!;
      // console.log("win", i, d, z);
      queue.push(z);
      a++;
    }
  });
}

// lines.forEach((d, i) => {
//   const data = d.split(": ")[1];
//   const [win, my] = data.split(" | ").map((d) =>
//     d
//       .split(" ")
//       .filter(Boolean)
//       .map((d) => {
//         const a = parseInt(d.trim());
//         if (isNaN(a)) {
//           console.log("error", d);
//         }
//         return a;
//       })
//   );
//   let score = 0;
//   my.forEach((d) => {
//     if (win.includes(d)) {
//       console.log("win", i, d);
//       if (score === 0) {
//         score = 1;
//       } else {
//         score *= 2;
//       }
//     }
//   });
//   res += score;
//   console.log(i, score);
// });

console.log(i - 1);
