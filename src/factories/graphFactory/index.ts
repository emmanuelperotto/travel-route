import Graph from "node-dijkstra";
import CSVReader from "../../services/CSVReader";

async function graphFactory(filePath = "input-routes.csv"): Promise<Graph> {
  const csvReader = new CSVReader(filePath);

  return new Promise((resolve, reject) => {
    csvReader.parse().then((csvResult) => {
      const graph = new Graph();

      Object.keys(csvResult).forEach((node) => {
        const neighborhood = csvResult[node];
        graph.addNode(node, neighborhood);
      });

      resolve(graph);
    });
  });
}

export default graphFactory;
