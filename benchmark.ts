import fs from "fs";
import chalk from "chalk";
import { table } from "table";

const days = fs
  .readdirSync(".")
  .map((d) => Number(d))
  .filter((d) => !isNaN(d))
  .sort((a, b) => a - b);

type BenchResult = number | undefined;

type Cache = Record<
  number,
  {
    go: [BenchResult, BenchResult];
    ts: [BenchResult, BenchResult];
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

const runTS = (day: number, part: string) =>
  exec(["bun", "run", `${part}.ts`], day);

const runGo = (day: number, part: string) => {
  exec(["go", "build", `${part}.go`], day);
  return exec([`${import.meta.dir}/${day}/${part}`], day);
};

const formatMs = (ms = 0) =>
  chalk[ms > 15 ? (ms > 30 ? "red" : "yellow") : "green"](
    `${ms.toFixed(2).padStart(10, " ")}ms`
  );

for (const day of days) {
  if (!cache[day])
    cache[day] = { go: [undefined, undefined], ts: [undefined, undefined] };
  cache[day].go[0] ??= runGo(day, "a");
  cache[day].go[1] ??= runGo(day, "b");
  cache[day].ts[0] ??= runTS(day, "a");
  cache[day].ts[1] ??= runTS(day, "b");
}

console.log(
  table(
    [
      ["D\na\ny", chalk.blueBright(" Go"), "", chalk.blue("󰛦 TypeScript"), ""],
      ["", "Part 1", "Part 2", "Part 1", "Part 2"],
      ...Object.entries(cache).map(([day, { go, ts }]) => [
        day,
        ...go.map(formatMs),
        ...ts.map(formatMs),
      ]),
    ],
    {
      spanningCells: [
        { row: 0, col: 0, rowSpan: 2 },
        { row: 0, col: 1, colSpan: 2, alignment: "center" },
        { row: 0, col: 3, colSpan: 2, alignment: "center" },
      ],
    }
  )
);

Bun.write(".benchCache.json", JSON.stringify(cache, null, 2));
