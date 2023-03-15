import { DataSource } from "typeorm"
import { DBConfig } from "./core/config/db.config"
import { Spam } from "./spam/enitities/spam.enity"
import { Target } from "./targets/entities/target.entity"

export const createDataSource = (cfg: DBConfig): DataSource => {
  const entities = [Target, Spam]

  const dataSource = new DataSource({
    type: "mysql",
    host: cfg.host,
    port: cfg.port,
    username: cfg.username,
    password: cfg.password,
    database: cfg.database,
    entities: entities,
    logging: process.env.NODE_ENV === "development",
    synchronize: true,
  })

  return dataSource
}
