import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errHandler } from "./middleware";
import controller from "./controller";
import config from "./config";
import { logger } from "./utils";
import { seedPeople, people } from "./db";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(controller);
app.use(errHandler);

export default app;

if (require.main === module) {
  seedPeople();
  app.listen(config.PORT, () => {
    logger.info(`Server running...`);
    config.display();
  });
}
