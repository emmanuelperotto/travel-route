import { Request, Response } from "express";
import CSVWriter from "../../services/CSVWriter";

export function create(req: Request, res: Response) {
  try {
    const { sourceNode, targetNode, weight } = req.body;
    const csvWriter = new CSVWriter("input-routes.csv");

    csvWriter.write(sourceNode, targetNode, Number(weight));

    res.status(201).json({ sourceNode, targetNode, weight });
  } catch (error) {
    res.status(422).json({ error: error.message })
  }
}
