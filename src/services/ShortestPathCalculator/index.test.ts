import Graph from "node-dijkstra";
import ShortestPathCalculator from ".";
import { IShortestPathCalculation } from "./interfaces";

describe("ShortestPathCalculator", () => {
  const calculatorMock: IShortestPathCalculation = {
    shortestPath(graph: Graph, sourceNode, targetNode) {
      return {
        path: [sourceNode, targetNode],
        cost: 1
      }
    }
  }

  const targetNode = "B";
  const sourceNode = "A";

  it("calls the 'shortestPath' method from element that implements IShortestPathCalculation", () => {
    jest.spyOn(calculatorMock, "shortestPath");
    const graph = new Graph();
    const shortestPathCalculator = new ShortestPathCalculator(graph, sourceNode, targetNode);

    shortestPathCalculator.calculate(calculatorMock);

    expect(calculatorMock.shortestPath).toHaveBeenCalledWith(graph, sourceNode, targetNode);
  });
});
