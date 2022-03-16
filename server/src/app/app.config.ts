export enum EnvVar {
  ENV = "PEOPLE_API_ENV",
  PORT = "PEOPLE_API_PORT",
}

export enum Env {
  TEST = "test",
  DEV = "dev",
  PROD = "prod",
}

const env = ((): Env => {
  switch (process.env[EnvVar.ENV]) {
    case Env.PROD:
      return Env.PROD;

    case Env.DEV:
      return Env.DEV;

    default:
      return Env.TEST;
  }
})();

const port = Number(process.env[EnvVar.PORT]) || 8000;

export class Config {
  constructor(
    readonly ENV: Env = env,
    readonly PORT: number = port,
    readonly DB_URI = "mongodb://localhost/people_test"
  ) {}
}

export const getConfig = (env: Env) => {
  switch (env) {
    case Env.PROD:
      return new Config(undefined, undefined, "mongodb://localhost/people");

    case Env.DEV:
      return new Config(undefined, undefined, "mongodb://localhost/people_dev");

    default:
      return new Config();
  }
};

const config = getConfig(env);
export default config;
