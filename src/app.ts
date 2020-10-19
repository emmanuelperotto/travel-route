import express from "express";
import * as shortestPathController from "./controllers/shortestPathController";
import * as edgesController from "./controllers/edgesController";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/shortestPath", shortestPathController.show);
app.post("/edge", edgesController.create);

export { app };
