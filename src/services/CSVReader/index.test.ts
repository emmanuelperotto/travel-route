import CSVReader from ".";

describe("CSVReader", () => {
  describe("#parse", () => {
    it("expects to return an object with vertices and edges", () => {
      const csvReader = new CSVReader();

      expect(csvReader.parse()).toEqual({ vertices: [], edges: [] });
    });
  });
});
