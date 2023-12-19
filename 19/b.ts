// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

const [rawWorkflows, rawInput] = input.split("\n\n");

const workflows = Object.fromEntries(
  rawWorkflows.split("\n").map((line) => {
    let splitIndex = line.indexOf("{");
    let name = line.slice(0, splitIndex);
    let rawRules = line.slice(splitIndex + 1, -1).split(",");
    let rules = rawRules.map((line) => {
      if (!line.includes(":")) {
        return { workflow: line, rule: "always" };
      }
      if (line.includes(">")) {
        const [rule, workflow] = line.split(":");
        const [variable, rawNum] = rule.split(">");
        return { workflow, rule: ">", variable, num: parseInt(rawNum, 10) };
      }
      if (line.includes("<")) {
        const [rule, workflow] = line.split(":");
        const [variable, rawNum] = rule.split("<");
        return { workflow, rule: "<", variable, num: parseInt(rawNum, 10) };
      }
      console.log("ERROR");
      console.log(line);
      process.exit(1);
    });
    return [name, rules];
  })
);

let res = 0;

const run = (
  minVars: Record<string, number>,
  maxVars: Record<string, number>,
  workflow: string
) => {
  for (const varName of ["x", "m", "a", "s"]) {
    if (minVars[varName] > maxVars[varName]) return;
  }
  if (workflow === "A") {
    let a = 1;
    for (const varName of ["x", "m", "a", "s"]) {
      a *= maxVars[varName] - minVars[varName] + 1;
    }
    res += a;
    return;
  }
  if (workflow === "R") {
    return;
  }
  for (let rule of workflows[workflow]) {
    for (const varName of ["x", "m", "a", "s"]) {
      if (minVars[varName] > maxVars[varName]) return;
    }
    let newMaxVars = { ...maxVars };
    let newMinVars = { ...minVars };
    if (rule.rule === ">") {
      if (newMinVars[rule.variable!] < rule.num!) {
        newMinVars[rule.variable!] = rule.num! + 1;
        maxVars[rule.variable!] = rule.num!;
      }
      run(newMinVars, newMaxVars, rule.workflow);
    } else if (rule.rule === "<") {
      if (newMaxVars[rule.variable!] > rule.num!) {
        newMaxVars[rule.variable!] = rule.num! - 1;
        minVars[rule.variable!] = rule.num!;
      }
      run(newMinVars, newMaxVars, rule.workflow);
    } else if (rule.rule === "always") {
      run(minVars, maxVars, rule.workflow);
    }
  }
};

run(
  {
    x: 1,
    m: 1,
    a: 1,
    s: 1,
  },
  {
    x: 4000,
    m: 4000,
    a: 4000,
    s: 4000,
  },
  "in"
);

console.log(res);
