import CSVParser from ".";

describe("CSVParser", () => {
  describe("#parse", () => {
    it("expects to return an object with vertices and edges", () => {
      const csvParser = new CSVParser();

      expect(csvParser.parse()).toEqual({ vertices: [], edges: [] });
    });
  });
});
