import express from "express";
import * as shortestPathController from "./controllers/shortestPathController";

const app = express();

// TODO: add create
// show
app.get("/shortestPath", shortestPathController.show);

export { app };
