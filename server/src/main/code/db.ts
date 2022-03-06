import mongoose, { Types } from "mongoose";
import config from "./config";
import { Person, Name, PersonModel } from "./models/person";
import { logger } from "./utils/misc";

export class DB {
  private static _state: DB.State;

  static getState = () => this._state;

  private constructor() {}

  static async connect(): Promise<void> {
    try {
      await mongoose.connect(config.DB_URI);
      this._state = DB.State.CONNECTED;
    } catch (err) {
      logger.error("failed to connect to DB", err);
    }
  }

  static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      this._state = DB.State.DISCONNECTED;
    } catch (err) {
      logger.error("failed to disconnect from DB", err);
    }
  }
}

export namespace DB {
  export enum State {
    CONNECTED = "connected",
    DISCONNECTED = "connected",
  }
}

export const people = new Map<string, Person>();
export const eminem = new Person(
  new Name("marshal", ["bruce"], "mathers", ["eminem", "slim shady"]),
  "1972-10-17"
);
export const jayZ = new Person(
  new Name("shawn", ["corey"], "carter", ["jay z", "hova", "jigga"]),
  "1969-12-04"
);
export const pac = new Person(
  new Name("lesane", ["parish"], "crooks", ["2 pac"]),
  "1971-06-16"
);
export const biggie = new Person(
  new Name("christopher", ["george", "latore"], "wallace", ["biggie smalls"]),
  "1972-05-21"
);
export const logic = new Person(
  new Name("robert", ["bryson"], "hall", ["logic"]),
  "1990-01-22"
);

export async function seedPeople(): Promise<void> {
  if (DB.getState() !== DB.State.CONNECTED) {
    logger.info("Can't seed people, DB not connected.");
    return;
  }

  logger.info("clearing db");
  await PersonModel.deleteMany();

  logger.info("adding new dummy data");
  const people: Person[] = [eminem, jayZ, pac, biggie, logic];
  await Promise.all(
    people.map((p) => {
      //logger.info(`saving ${p.name.first} ${p.name.last}`);
      return new PersonModel(p).save();
    })
  );
}

export async function clearPeople(): Promise<void> {
  if (DB.getState() !== DB.State.CONNECTED) {
    logger.info("Can't clear people, DB not connected.");
    return;
  }

  logger.info("clearing db");
  await PersonModel.deleteMany();
}
