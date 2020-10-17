import readline from "readline";
import graphFactory from "../../factories/graphFactory";
import ShortestPathCalculator from "../../services/ShortestPathCalculator";
import Dijkstra from "../../services/ShortestPathCalculator/Dijkstra";

const filePath = process.argv[2];

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function handleRouteInput(route: string) {
  // TODO: validate input
  const [sourceNode, targetNode] = route.trim().toUpperCase().split("-");
  const graph = await graphFactory(filePath);

  const shortestPathCalculator = new ShortestPathCalculator(graph, sourceNode, targetNode);
  const dijkstra = new Dijkstra();
  const { path, cost } = shortestPathCalculator.calculate(dijkstra);

  cli.write(`best route: ${path?.join(" - ")} > $${cost}\n\n`);
  cli.question("please enter the route: ", (route: string) => {
    handleRouteInput(route);
  });
}

cli.question("please enter the route: ", (route: string) => {
  handleRouteInput(route);
});
