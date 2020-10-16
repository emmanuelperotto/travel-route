import CSVReader from ".";

// TODO: add specs for file reading
describe("CSVReader", () => {
  describe("#parse", () => {
    it("expects to return an object with vertices", async () => {
      const csvReader = new CSVReader();
      const result = await csvReader.parse();

      expect(result).toHaveProperty("vertices");
    });

    it("expects to return an object with edges", async () => {
      const csvReader = new CSVReader();
      const result = await csvReader.parse();

      expect(result).toHaveProperty("edges");
    });
  });
});
