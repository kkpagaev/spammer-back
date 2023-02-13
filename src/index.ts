import * as dotenv from "dotenv"
import * as express from "express"
import { Application } from "express"
import helmet from "helmet"
import { createDataSource } from "./data-source"
import { Request, Response } from "express"
import { json, urlencoded } from "body-parser"
import { APIRouter } from "./router"
import { getConfig } from "./core/config/config"
import { TargetService } from "./targets/target.service"
import { TargetController } from "./targets/target.cotroller"
import { Target } from "./targets/entities/target.entity"

async function main() {
  dotenv.config()
  const app: Application = express()
  const port = process.env.PORT || 3000
  app.use(
    urlencoded({
      extended: true,
    })
  )

  app.set("view engine", "hbs")

  app.use(json())
  app.use(helmet())

  const config = getConfig()
  // typeorm
  const dataSource = createDataSource(config.db)
  await dataSource.initialize()

  // target
  const targetRepository = dataSource.getRepository(Target)
  const targetService = new TargetService(targetRepository)
  const targetController = new TargetController(targetService)

  // router
  const apiRouter = new APIRouter(app)

  apiRouter.get("/target", async (req: Request, res: Response) => {
    await targetController.paginate(req, res)
  })

  apiRouter.post("/target", async (req: Request, res: Response) => {
    await targetController.create(req, res)
  })

  apiRouter.get("/target/:id", async (req: Request, res: Response) => {
    await targetController.getOne(req, res)
  })

  apiRouter.put("/target/:id", async (req: Request, res: Response) => {
    await targetController.update(req, res)
  })

  apiRouter.delete("/target/:id", async (req: Request, res: Response) => {
    await targetController.delete(req, res)
  })

  app.get("/", (_req: Request, res: Response) => {
    res.render("index")
  })

  app.get("/targets", (_req: Request, res: Response) => {
    res.render("targets")
  })

  app.listen(port, () => console.log(`Server is listening on port ${port}!`))
}
/*eslint-disable*/
main().catch((err) => console.error(err))
/*eslint-enable*/
