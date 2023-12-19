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

let firstWorkflow = "in";

let acc: number[] = [];
let rej: number[] = [];

rawInput.split("\n").forEach((line) => {
  const vars = Object.fromEntries(
    line
      .slice(1, -1)
      .split(",")
      .map((v) => {
        let a = v.split("=");
        return [a[0], parseInt(a[1], 10)];
      })
  );
  let workflow = firstWorkflow;
  let varsSum = Object.values(vars).reduce((a, b) => a + b, 0);
  while (true) {
    if (workflow === "A") {
      console.log(vars["x"]);
      acc.push(varsSum);
      break;
    }
    if (workflow === "R") {
      rej.push(varsSum);
      break;
    }
    for (let rule of workflows[workflow]) {
      if (rule.rule === "always") {
        workflow = rule.workflow;
        break;
      }
      if (rule.rule === ">") {
        if (vars[rule.variable!] > rule.num!) {
          workflow = rule.workflow;
          break;
        }
      }
      if (rule.rule === "<") {
        if (vars[rule.variable!] < rule.num!) {
          workflow = rule.workflow;
          break;
        }
      }
    }
  }
});

const accSum = acc.reduce((a, b) => a + b, 0);

console.log(accSum);
