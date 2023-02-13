export interface DBConfig {
  host: string
  port: number
  username: string
  password: string
  database: string
}

export function getDBConfig(): DBConfig {
  return {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  }
}
