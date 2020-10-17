import CSVReader from ".";
const csvFile = "input-routes.test.csv";

// TODO: add specs for file reading
describe("CSVReader", () => {
  describe("#parse", () => {
    it("expects to return an Object instance", async () => {
      const csvReader = new CSVReader(csvFile);
      const result = await csvReader.parse();

      expect(result).toBeInstanceOf(Object);
    });

    it("expects to return graph nodes in the right format", async () => {
      const csvReader = new CSVReader(csvFile);
      const result = await csvReader.parse();

      expect(result).toEqual({
        GRU: { BRC: 10, CDG: 75, ORL: 56, SCL: 20 },
        BRC: { SCL: 5 },
        ORL: { CDG: 5 },
        SCL: { ORL: 20 },
      });
    });
  });
});
