import CSVWriter from ".";

const mockWriteRecords = jest.fn();

jest.mock("csv-writer", () => {
  return {
    createObjectCsvWriter: () => ({
      writeRecords: mockWriteRecords
    })
  }
})

describe("CSVWriter", () => {
  describe("when trying to write empty nodes", () => {
    it("expects to throw an Exception", () => {
      const csvWriter = new CSVWriter("test.csv")
      expect(() => csvWriter.write("", "", 10)).toThrow("Node can't be an empty string")
    });
  });

  it("calls the writeRecords function from csv-writer", () => {
    const csvWriter = new CSVWriter("test.csv")
    csvWriter.write("a", "b", 10)

    expect(mockWriteRecords).toHaveBeenCalledWith([{ sourceNode: "a", targetNode: "b", weight: 10 }])
  });
});
