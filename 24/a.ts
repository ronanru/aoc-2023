// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

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

let res = 0;

const findCollisionCoordinate = ({
  x11,
  x12,
  x21,
  x22,
  y11,
  y12,
  y21,
  y22,
}: {
  x11: number;
  x12: number;
  x21: number;
  x22: number;
  y11: number;
  y12: number;
  y21: number;
  y22: number;
}): { x: number; y: number } | null => {
  const a1 = y12 - y11;
  const b1 = x11 - x12;
  const c1 = a1 * x11 + b1 * y11;
  const a2 = y22 - y21;
  const b2 = x21 - x22;
  const c2 = a2 * x21 + b2 * y21;
  const determinant = a1 * b2 - a2 * b1;
  if (determinant === 0) return null;
  const x = (b2 * c1 - b1 * c2) / determinant;
  const y = (a1 * c2 - a2 * c1) / determinant;
  const time1 = (x - x11) / (x12 - x11);
  const time2 = (x - x21) / (x22 - x21);
  if (time1 < 0 || time2 < 0) return null;
  return { x, y };
};

let min = 200000000000000;
let max = 400000000000000;
// let min = 7;
// let max = 27;

for (let i = 0; i < stones.length; i++) {
  const stone1 = stones[i];
  for (let j = i + 1; j < stones.length; j++) {
    const stone2 = stones[j];
    const collisionCoordinate = findCollisionCoordinate({
      x11: stone1.x,
      x12: stone1.x + stone1.velocityX * 10,
      x21: stone2.x,
      x22: stone2.x + stone2.velocityX * 10,
      y11: stone1.y,
      y12: stone1.y + stone1.velocityY * 10,
      y21: stone2.y,
      y22: stone2.y + stone2.velocityY * 10,
    });
    if (
      !collisionCoordinate ||
      collisionCoordinate.x < min ||
      collisionCoordinate.x > max ||
      collisionCoordinate.y < min ||
      collisionCoordinate.y > max
    )
      continue;
    // console.log(i + 1, j + 1, collisionCoordinate);
    res++;
  }
}

console.log(res);
