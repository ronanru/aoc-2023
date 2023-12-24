import { init } from "z3-solver";
import fs from "node:fs";

const { Context } = await init();
const z3 = Context("main");

// const input = fs.readFileSync("test.txt", "utf8");
const input = fs.readFileSync("input.txt", "utf8");

const stones = input.split("\n").map((d) => {
  const [positions, velocities] = d.split("@");
  const [x, y, z] = positions.split(",").map((d) => parseInt(d.trim()));
  const [velocityX, velocityY, velocityZ] = velocities
    .split(",")
    .map((d) => parseInt(d.trim()));
  return {
    x,
    y,
    z,
    velocityX,
    velocityY,
    velocityZ,
  };
});

let magicX = z3.Real.const("x");
let magicY = z3.Real.const("y");
let magicZ = z3.Real.const("z");
let magicVelocityX = z3.Real.const("velocityX");
let magicVelocityY = z3.Real.const("velocityY");
let magicVelocityZ = z3.Real.const("velocityZ");

let solver = new z3.Solver();

for (let i = 0; i < stones.length; i++) {
  const { velocityX, velocityY, velocityZ, x, y, z } = stones[i];
  let t = z3.Real.const(`t${i}`);
  solver.add(
    t.mul(velocityX).add(x).eq(t.mul(magicVelocityX).add(magicX)),
    t.mul(velocityY).add(y).eq(t.mul(magicVelocityY).add(magicY)),
    t.mul(velocityZ).add(z).eq(t.mul(magicVelocityZ).add(magicZ))
  );
}

await solver.check();
let model = solver.model();

console.log(
  Number(model.eval(magicX).toString()) +
    Number(model.eval(magicY).toString()) +
    Number(model.eval(magicZ).toString())
);
// console.log(
//   model.get(magicX).ptr,
//   model.get(magicY).ptr,
//   model.get(magicZ).ptr
// );
