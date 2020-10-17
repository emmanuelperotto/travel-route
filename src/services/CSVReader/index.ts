const csvParser = require("csv-parser");
const fileSystem = require("fs");

export type CSVParseResult = Record<string, Record<string, number>>;

interface IDataRow {
  sourceNode: string;
  targetNode: string;
  weight: string;
}

export default class CSVReader {
  private _result: CSVParseResult;
  private _filePath: string;

  // TODO: add input validation
  constructor(filePath: string) {
    this._result = {};
    this._filePath = filePath;
  }

  async parse(): Promise<CSVParseResult> {
    // TODO: add error treatment
    return new Promise((resolve, reject) => {
      fileSystem
        .createReadStream(this.filePath)
        .pipe(csvParser())
        .on("data", ({ sourceNode, targetNode, weight }: IDataRow) => {
          this.addEdge(sourceNode, targetNode, Number(weight));
        })
        .on("end", () => {
          resolve(this.result);
        });
    });
  }

  private addEdge(sourceNode: string, targetNode: string, weight: number) {
    const nodeNeighborhood = {
      ...this.result[sourceNode],
      [targetNode]: weight,
    };

    this.result = {
      ...this.result,
      [sourceNode]: nodeNeighborhood,
    };
  }

  // Getters
  private get result() {
    return this._result;
  }

  private set result(newResult) {
    this._result = newResult;
  }

  private get filePath() {
    return this._filePath;
  }
}
