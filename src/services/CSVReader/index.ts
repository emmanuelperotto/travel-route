import csvParser from "csv-parser";
import fileSystem from "fs";

interface IEdge {
  from: string;
  to: string;
  weight: number;
}

interface IResult {
  vertices: Set<string>;
  edges: Array<IEdge>;
}

interface IDataRow {
  firstVertex: string;
  secondVertex: string;
  weight: string;
}

export default class CSVReader {
  private _result: IResult;
  private _filePath: string;

  // TODO: add input validation
  constructor(filePath = "input-routes.csv") {
    this._result = { vertices: new Set(), edges: [] };
    this._filePath = filePath;
  }

  parse() {
    // TODO: add error treatment
    return new Promise((resolve, reject) => {
      fileSystem
        .createReadStream(this.filePath)
        .pipe(csvParser())
        .on("data", ({ firstVertex, secondVertex, weight }: IDataRow) => {
          this.addVertex(firstVertex);
          this.addVertex(secondVertex);
          this.addEdge(firstVertex, secondVertex, Number(weight));
        })
        .on("end", () => {
          resolve(this.result);
        });
    });
  }

  private addVertex(vertex: string) {
    this._result.vertices.add(vertex);
  }

  private addEdge(firstVertex: string, secondVertex: string, weight: number) {
    this._result.edges.push({
      from: firstVertex,
      to: secondVertex,
      weight,
    });
  }

  // Getters
  public get result() {
    return this._result;
  }

  public get filePath() {
    return this._filePath;
  }
}
