import Graph from "node-dijkstra";
import readline from "readline";
import CSVReader from "../../services/CSVReader";
const fileName = process.argv[2];
const csvReader = new CSVReader(fileName);

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function graphFactory(): Promise<Graph> {
  return new Promise((resolve, reject) => {
    csvReader.parse().then((csvResult) => {
      const graph = new Graph();

      csvResult.forEach((neighborhood, node) => {
        graph.addNode(node, neighborhood);
      });

      resolve(graph);
    });
  });
}

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
  const graph = await graphFactory();

  const { path, cost } = calculateShortestPath(graph, sourceNode, targetNode);

  cli.write(`best route: ${path?.join(" - ")} > $${cost}\n\n`);
  cli.question("please enter the route: ", (route: string) => {
    handleRouteInput(route);
  });
}

cli.question("please enter the route: ", (route: string) => {
  handleRouteInput(route);
});
