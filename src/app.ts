import express from "express";
import graphFactory from "./factories/graphFactory";
import ShortestPathCalculator from "./services/ShortestPathCalculator";
import Dijkstra from "./services/ShortestPathCalculator/Dijkstra";

const app = express();

// show
app.get("/route", async (req, res) => {
  const filePath = "input-routes.csv";
  const { sourceNode, targetNode } = req.query;

  if (sourceNode && targetNode) {
    const graph = await graphFactory(filePath);
    const shortestPathCalculator = new ShortestPathCalculator(graph, sourceNode.toString(), targetNode.toString());
    const dijkstra = new Dijkstra();

    const { path, cost } = shortestPathCalculator.calculate(dijkstra);

    if (path) {
      res.status(200).send({ path, cost });
    } else {
      res.status(422).send({ error: `Unable to find a route between ${sourceNode} and ${targetNode}` })
    }
  } else {
    res.status(400).send({ error: "Invalid Params. Please provide valid sourceNode and targetNode." });
  }
});
export { app };
