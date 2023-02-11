import express, { Application, Request, Response } from "express"
import { datasource } from "./config/orm.config"
import swagger from "swagger-ui-express"
import modules from "./modules"
import jwt from "./lib/jwt"
import document from "./config/swagger.json"

const options: Object = {
  exprorer: true,
}

const app: Application = express()

!(async function (): Promise<any> {
  try {
    app.use(express.json())
    await datasource.initialize()
    app.use(modules)
    app.use("/swagger", swagger.serve, swagger.setup(document, options))

    app.all("/*", (req: Request, res: Response) => res.status(404).send("not found"))
  } catch (error) {
    console.log(error)
  } finally {
    app.listen(7070, (): void => console.log("*7070"))
  }
})()
