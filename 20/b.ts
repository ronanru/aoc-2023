// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

let rawCasters = input.split("\n").map((d) => {
  let [first, second] = d.split(" -> ");
  const dest = second.split(", ");
  let type = "";
  if (first.startsWith("%")) {
    type = "%";
    first = first.slice(1);
  } else if (first.startsWith("&")) {
    type = "&";
    first = first.slice(1);
  } else if (first === "broadcaster") {
    type = "broadcaster";
  }
  return [
    first,
    {
      type,
      dest,
      isOn: first.startsWith("&"),
      last: {},
    },
  ] as [
    string,
    {
      type: string;
      dest: string[];
      isOn: boolean;
      last: Record<string, boolean>;
    }
  ];
});

let casters = {
  ...Object.fromEntries(
    rawCasters.map((c) => {
      if (c[1].type === "&") {
        return [
          c[0],
          {
            ...c[1],
            last: Object.fromEntries(
              rawCasters
                .filter((d) => d[1].dest.includes(c[0]))
                .map((d) => [d[0], false])
            ),
          },
        ];
      }
      return c;
    })
  ),
};

const rxBefore = Object.entries(casters).find(([_, c]) =>
  c.dest.includes("rx")
)![0];

const rxBeforeBefore = Object.entries(casters)
  .filter(([_, c]) => c.dest.includes(rxBefore))
  .map(([d]) => d);

console.log(rxBeforeBefore);

const rxBeforeBeforeMap = Object.fromEntries(rxBeforeBefore.map((d) => [d, 0]));

for (let i = 0; i < Infinity; i++) {
  await new Promise((r) => {
    let queue: {
      caster: string;
      isHigh: boolean;
      from: string;
    }[] = [
      {
        from: "button",
        caster: "broadcaster",
        isHigh: false,
      },
    ];
    while (queue.length) {
      let { caster, isHigh, from } = queue.shift()!;
      let cas = casters[caster];
      if (!cas) {
        continue;
      }

      if (caster === rxBefore && isHigh) {
        console.log(i + 1);
        rxBeforeBeforeMap[from] = i + 1;
        if (Object.values(rxBeforeBeforeMap).every((d) => d > 0)) {
          console.log("all");
          console.log(
            Object.values(rxBeforeBeforeMap).reduce((a, b) => a * b, 1)
          );
          process.exit(0);
        }
      }

      if (cas.type === "%" && isHigh) {
        continue;
      } else if (cas.type === "%" && !isHigh) {
        casters[caster].isOn = !cas.isOn;
        if (casters[caster].isOn) isHigh = true;
      } else if (cas.type === "&") {
        casters[caster].last[from] = isHigh;
        isHigh = !Object.values(casters[caster].last).every((d) => d);
      }
      cas.dest.forEach((d) => {
        queue.push({
          from: caster,
          caster: d,
          isHigh,
        });
      });
    }
    r(null);
  });
}
