import { DBConfig, getDBConfig } from "./db.config"
import { getMailConfig, MailConfig } from "./mail.config"

export interface Config {
  db: DBConfig
  mail: MailConfig
}

export function getConfig(): Config {
  return {
    db: getDBConfig(),
    mail: getMailConfig(),
  }
}
