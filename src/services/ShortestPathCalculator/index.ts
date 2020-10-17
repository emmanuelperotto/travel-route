import Graph from "node-dijkstra";
import { IShortestPathCalculation } from "./interfaces";

export default class ShortestPathCalculator {
  private _graph: Graph;
  private _sourceNode: string;
  private _targetNode: string;

  constructor(graph: Graph, sourceNode: string, targetNode: string) {
    this._graph = graph;
    this._sourceNode = sourceNode;
    this._targetNode = targetNode;
  }

  calculate(calculator: IShortestPathCalculation) {
    return calculator.shortestPath(this.graph, this.sourceNode, this.targetNode);
  }

  // Getters
  private get graph() {
    return this._graph;
  }

  private get sourceNode() {
    return this._sourceNode;
  }

  private get targetNode() {
    return this._targetNode;
  }
}
