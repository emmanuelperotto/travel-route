import { createObjectCsvWriter } from "csv-writer";
import { CsvWriter } from "csv-writer/src/lib/csv-writer";
import { ObjectMap } from "csv-writer/src/lib/lang/object";

export default class CSVWriter {
  private _filePath: string;
  private _writer: CsvWriter<ObjectMap<any>>

  constructor(filePath: string) {
    this._filePath = filePath;
    this._writer = createObjectCsvWriter({
      path: this.filePath,
      header: [
        { id: "sourceNode", title: "sourceNode" },
        { id: "targetNode", title: "targetNode" },
        { id: "weight", title: "weight" },
      ]
    })
  }

  write(sourceNode: string, targetNode: string, weight: number) {
    this.writer.writeRecords([
      { sourceNode, targetNode, weight }
    ])
  }

  // Getters
  private get filePath() {
    return this._filePath;
  }

  private get writer() {
    return this._writer;
  }
}
