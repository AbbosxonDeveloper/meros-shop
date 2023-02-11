import { DataSource } from "typeorm"
import path from "path"

export const datasource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "abbos",
  database: "meros_exam",
  entities: [path.resolve(__dirname, "..", "entities", "*.entity.{ts,js}")],
  migrations: [path.resolve(__dirname, "..", "migrations", "**/*.{ts,js}")],
  logging: true,
  synchronize: false,
})
