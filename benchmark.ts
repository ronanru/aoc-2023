import fs from "fs";

const days = fs
  .readdirSync(".")
  .map((d) => Number(d))
  .filter((d) => !isNaN(d))
  .sort((a, b) => a - b);

type Cache = Record<
  number,
  {
    go: [number, number];
    ts: [number, number];
  }
>;

const cacheFile = Bun.file(".benchCache.json");
if (!(await cacheFile.exists())) {
  Bun.write(".benchCache.json", "{}");
}

const cache: Cache = await Bun.file(".benchCache.json").json();

const exec = (command: string[], day?: number) => {
  let time = performance.now();
  let { exitCode } = Bun.spawnSync(command, {
    cwd: day?.toString(),
  });
  if (exitCode !== 0) {
    console.error("Error running", command);
    process.exit(exitCode);
  }
  return performance.now() - time;
};

const formatMs = (ms: number) => `${ms.toFixed(2).padStart(6, " ")}ms`;

for (const day of days) {
  process.stdout.write(`Day ${day}: Go `);
  if (!cache[day]) cache[day] = { go: [-1, -1], ts: [-1, -1] };
  if (cache[day].go[0] === -1) {
    exec(["go", "build", "a.go"], day);
    cache[day].go[0] = exec([`${import.meta.dir}/${day}/a`], day);
  }
  process.stdout.write(`${formatMs(cache[day].go[0])} `);
  if (cache[day].go[1] === -1) {
    exec(["go", "build", "b.go"], day);
    cache[day].go[1] = exec([`${import.meta.dir}/${day}/b`], day);
  }
  process.stdout.write(`${formatMs(cache[day].go[1])}, TS `);
  if (cache[day].ts[0] === -1) {
    cache[day].ts[0] = exec(["bun", "run", "a.ts"], day);
  }
  process.stdout.write(`${formatMs(cache[day].ts[0])} `);
  if (cache[day].ts[1] === -1) {
    cache[day].ts[1] = exec(["bun", "run", "b.ts"], day);
  }
  process.stdout.write(`${formatMs(cache[day].ts[1])}\n`);
}

Bun.write(".benchCache.json", JSON.stringify(cache, null, 2));
