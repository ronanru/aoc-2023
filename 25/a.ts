import Graph from "graphology";
import {
  countConnectedComponents,
  forEachConnectedComponent,
} from "graphology-components";

// const input = await Bun.file("test.txt").text();
const input = await Bun.file("input.txt").text();

const graph = new Graph();

input.split("\n").forEach((d) => {
  let [a, b] = d.split(": ");
  if (!graph.hasNode(a)) graph.addNode(a);
  b.split(" ").forEach((c) => {
    if (!graph.hasNode(c)) graph.addNode(c);
    graph.addEdgeWithKey(`${a}|${c}`, a, c);
  });
});

graph.dropEdge("rcn|xkf");
graph.dropEdge("dht|xmv");
graph.dropEdge("cms|thk");

if (countConnectedComponents(graph) === 2) {
  let a = 1;
  forEachConnectedComponent(graph, (component) => {
    a *= component.length;
  });
  console.log(a);
  process.exit(0);
}

console.log(countConnectedComponents(graph));
