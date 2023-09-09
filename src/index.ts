import express from "express";
import { logger } from "./logger";

import { logStorage } from "./logger";

const app = express();

let counter = 0;

// Add request number to each request
app.use((req, _res, next) => {
  req.requestNumber = counter++;
  next();
});

// Add request number to each log
app.use((req, _res, next) => {
  const store = new Map([["request", req.requestNumber.toString()]]);
  logStorage.run(store, () => next());
});

app.get("/", async (req, res) => {
  logger.info(`Request received`);
  const delay =
    1000 + Math.random() * 1000 * Math.max(5 - req.requestNumber, 1);
  setTimeout(() => {
    logger.info(`Timeout from request`);
    res.send("OK");
  }, delay);
});

app.listen(3333);

export default app;
