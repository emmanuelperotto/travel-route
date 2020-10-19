import { Request, Response } from "express";
import graphFactory from "../../factories/graphFactory";
import ShortestPathCalculator from "../../services/ShortestPathCalculator";
import Dijkstra from "../../services/ShortestPathCalculator/Dijkstra";
const filePath = "input-routes.csv"

export async function show(req: Request, res: Response) {
  const { sourceNode, targetNode } = req.query;

  if (sourceNode && targetNode) {
    const graph = await graphFactory(filePath);
    const shortestPathCalculator = new ShortestPathCalculator(graph, sourceNode.toString(), targetNode.toString());
    const dijkstra = new Dijkstra();

    const shortestPathResult = shortestPathCalculator.calculate(dijkstra);

    const response = shortestPathResult.path
      ? {
        status: 200,
        body: shortestPathResult
      } : {
        status: 422,
        body: { error: `Unable to find a route between ${sourceNode} and ${targetNode}` }
      }

    res.status(response.status).json(response.body);
  } else {
    res.status(400).json({ error: "Invalid Params. Please provide valid sourceNode and targetNode." });
  }
}
