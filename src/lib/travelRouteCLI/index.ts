import Graph from "node-dijkstra";
import readline from "readline";
import graphFactory from "../../factories/graphFactory";

const filePath = process.argv[2];

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// TODO: extract it to a class and make it "Open-Closed"
function calculateShortestPath(
  graph: Graph,
  sourceNode: string,
  targetNode: string
) {
  return graph.path(sourceNode, targetNode, { cost: true });
}

async function handleRouteInput(route: string) {
  // TODO: validate input
  const [sourceNode, targetNode] = route.trim().toUpperCase().split("-");
  const graph = await graphFactory(filePath);

  const { path, cost } = calculateShortestPath(graph, sourceNode, targetNode);

  cli.write(`best route: ${path?.join(" - ")} > $${cost}\n\n`);
  cli.question("please enter the route: ", (route: string) => {
    handleRouteInput(route);
  });
}

cli.question("please enter the route: ", (route: string) => {
  handleRouteInput(route);
});
