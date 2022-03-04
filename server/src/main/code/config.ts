import { logger } from "./utils/misc";

export enum EnvKey {
  ENV = "PEOPLE_API_ENV",
  PORT = "PEOPLE_API_PORT",
}

export enum Env {
  DEV = "dev",
  PROD = "prod",
}

const env = ((): Env => {
  switch (process.env[EnvKey.ENV]) {
    case Env.PROD:
      return Env.PROD;

    default:
      return Env.DEV;
  }
})();

const port = Number(process.env[EnvKey.PORT]) || 8000;

export class Config {
  constructor(
    readonly ENV: Env = env,
    readonly PORT: number = port,
    readonly BASE_URL: string = "http://localhost:" + port,
    readonly DB_URI = "mongodb://localhost/people"
  ) {}

  display() {
    logger.info(`ENV:\t\t${this.ENV}`);
    logger.info(`PORT:\t\t${this.PORT}`);
    logger.info(`BASE_URL:\t${this.BASE_URL}`);
    logger.info(`DB_URI:\t${this.DB_URI}`);
  }
}

export const getConfig = (env: Env) => {
  switch (env) {
    case Env.PROD:
      return new Config(
        undefined,
        undefined,
        "https://pm10-people-api.deno.dev"
      );

    default:
      return new Config();
  }
};

export default getConfig(env);
