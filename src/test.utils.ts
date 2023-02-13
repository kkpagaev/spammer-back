import * as dotenv from "dotenv"
import { getConfig } from "./core/config/config"
import { createDataSource } from "./data-source"

export async function getTestDataSource() {
  dotenv.config({
    path: ".env.test",
  })
  const config = getConfig()
  const dataSources = createDataSource(config.db)
  await dataSources.initialize()
  return dataSources
}
