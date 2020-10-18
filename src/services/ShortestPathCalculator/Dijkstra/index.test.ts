import Graph from "node-dijkstra";
import Dijkstra from ".";

describe("Dijkstra", () => {
  describe("when graph has no vertices and edges", () => {
    const graph = new Graph();

    it("returns a null path", () => {
      const dijkstra = new Dijkstra();

      expect(dijkstra.shortestPath(graph, "A", "B").path).toBeNull();
    });

    it("returns a 0 cost", () => {
      const dijkstra = new Dijkstra();

      expect(dijkstra.shortestPath(graph, "A", "B").cost).toEqual(0);
    });
  });

  describe("when there is no possible path between the given nodes", () => {
    const sourceNode = "A";
    const targetNode = "C";
    const graph = new Graph();
    graph
      .addNode(sourceNode, { B: 1 })
      .addNode(targetNode, { D: 1 });

    it("returns a null path", () => {
      const dijkstra = new Dijkstra();

      expect(dijkstra.shortestPath(graph, sourceNode, targetNode).path).toBeNull();
    });

    it("returns a 0 cost", () => {
      const dijkstra = new Dijkstra();

      expect(dijkstra.shortestPath(graph, sourceNode, targetNode).cost).toEqual(0);
    });
  });

  describe("when there is a possible path between the given nodes", () => {
    const sourceNode = "A";
    const targetNode = "C";
    const graph = new Graph();
    graph.addNode(sourceNode, { [targetNode]: 1 });

    it("returns the path", () => {
      const dijkstra = new Dijkstra();

      expect(dijkstra.shortestPath(graph, sourceNode, targetNode).path).toEqual([sourceNode, targetNode]);
    });

    it("returns the cost", () => {
      const dijkstra = new Dijkstra();

      expect(dijkstra.shortestPath(graph, sourceNode, targetNode).cost).toEqual(1);
    });
  });
});
