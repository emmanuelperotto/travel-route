import Graph from "node-dijkstra";

export interface IShortestPathResult {
  path: string[];
  cost: number;
}

export interface IShortestPathCalculation {
  shortestPath(graph: Graph, sourceNode: string, targetNode: string): IShortestPathResult;
}
