import { DBConfig, getDBConfig } from "./db.config"

export interface Config {
  db: DBConfig
}

export function getConfig(): Config {
  return {
    db: getDBConfig(),
  }
}
