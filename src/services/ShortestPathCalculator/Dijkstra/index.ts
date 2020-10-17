import DijkstraGraph from "node-dijkstra";
import { IShortestPathCalculation, IShortestPathResult } from "../interfaces";

export default class Dijkstra implements IShortestPathCalculation {
  shortestPath(dijkstraGraph: DijkstraGraph, sourceNode: string, targetNode: string) {
    return dijkstraGraph.path(sourceNode, targetNode, { cost: true }) as IShortestPathResult;
  }
}
