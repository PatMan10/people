import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexController from "./controllers/index";
import peopleController from "./controllers/people";
import config from "./config";
import logger from "./utils/logger";
import { DB, seedPeople } from "./db";
import { errHandler } from "./middleware/error";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(peopleController);
app.use(indexController);
app.use(errHandler);

export default app;

if (require.main === module) {
  (async () => {
    await DB.connect();

    app.listen(config.PORT, () => {
      logger.info(`Server running...`);
      logger.info(config);
    });
  })();
}
