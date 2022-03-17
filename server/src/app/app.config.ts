export enum EnvVar {
  ENV = 'PEOPLE_API_ENV',
  PORT = 'PEOPLE_API_PORT',
}

export enum Env {
  TEST = 'test',
  DEV = 'dev',
  PROD = 'prod',
}

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  VERBOSE = 4,
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

export class Config {
  constructor(
    readonly ENV: Env,
    readonly PORT: number,
    readonly DB_URI: string,
    readonly LOG_LEVEL: LogLevel,
  ) {}
}

export const getConfig = (env: Env) => {
  switch (env) {
    case Env.PROD:
      return new Config(
        Env.PROD,
        80,
        'mongodb://localhost/people',
        LogLevel.INFO,
      );

    case Env.DEV:
      return new Config(
        Env.DEV,
        8000,
        'mongodb://localhost/people_dev',
        LogLevel.DEBUG,
      );

    default:
      return new Config(
        Env.TEST,
        8080,
        'mongodb://localhost/people_test',
        LogLevel.VERBOSE,
      );
  }
};

const config = getConfig(env);
export default config;
