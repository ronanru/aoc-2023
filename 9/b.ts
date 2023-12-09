// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let res = 0;

const days = input.split("\n").map((d) => d.split(" ").map((d) => parseInt(d)));

const findLastNumber = (arr: number[]): number => {
  const steps = [arr];
  while (!steps[0].every((d) => d === 0)) {
    let newArr = [];
    for (let i = 0; i < steps[0].length - 1; i++) {
      newArr.push(steps[0][i + 1] - steps[0][i]);
    }
    steps.unshift(newArr);
  }
  let a = 0;
  for (let i = 0; i < steps.length; i++) {
    a = steps[i].at(0)! - a;
  }
  return a;
};
days.forEach((d) => {
  res += findLastNumber(d);
});

console.log(res);
