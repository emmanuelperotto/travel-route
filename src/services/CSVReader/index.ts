const csvParser = require("csv-parser");
const fileSystem = require("fs");

export type CSVParseResult = Map<string, Record<string, number>>;

interface IDataRow {
  sourceNode: string;
  targetNode: string;
  weight: string;
}

export default class CSVReader {
  private _result: CSVParseResult;
  private _filePath: string;

  // TODO: add input validation
  constructor(filePath = "input-routes.csv") {
    this._result = new Map();
    this._filePath = filePath;
  }

  parse(): Promise<CSVParseResult> {
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
    const vertexNeighborhood = {
      ...this.result.get(sourceNode),
      [targetNode]: weight,
    };

    this.result.set(sourceNode, vertexNeighborhood);
  }

  // Getters
  private get result() {
    return this._result;
  }

  private get filePath() {
    return this._filePath;
  }
}
