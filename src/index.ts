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
import { Target } from "./targets/entities/target.entity"
import { TargetController } from "./targets/target.controller"
import * as methodOverride from "method-override"
import { createTransport } from "nodemailer"
import { MailService } from "./mail/mail.service"
import { Spam } from "./spam/enitities/spam.enity"
import { SpamService } from "./spam/spam.service"
import { SpamController } from "./spam/spam.controller"

async function main() {
  dotenv.config()
  const app: Application = express()
  const port = process.env.PORT || 3000
  app.use(methodOverride("_method"))
  app.use(
    urlencoded({
      extended: true,
    })
  )

  app.use(express.static("public"))

  app.set("view engine", "hbs")

  app.use(json())
  app.use(helmet())

  const config = getConfig()

  // mailer
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  transport.verify((err) => {
    if (err) {
      console.error(err)
    } else {
      console.log("Server is ready to take our messages")
    }
  })

  const mailService = new MailService(transport)

  // typeorm
  const dataSource = createDataSource(config.db)
  await dataSource.initialize()

  // target
  const targetRepository = dataSource.getRepository(Target)
  const targetService = new TargetService(targetRepository)
  const targetController = new TargetController(targetService)

  // spam
  const spamRepository = dataSource.getRepository(Spam)
  const spamService = new SpamService(
    mailService,
    targetService,
    spamRepository
  )
  const spamController = new SpamController(spamService)

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

  app.get("/targets", async (_req: Request, res: Response) => {
    await targetController.list(_req, res)
  })

  app.get("/targets/create", (_req: Request, res: Response) => {
    targetController.createForm(_req, res)
  })

  app.post("/targets/create", async (req: Request, res: Response) => {
    await targetController.create(req, res)
  })

  app.use("/static", express.static("public"))

  app.get("/targets/:id", async (req: Request, res: Response) => {
    await targetController.single(req, res)
  })

  app.get("/targets/:id/edit", async (req: Request, res: Response) => {
    await targetController.updateForm(req, res)
  })

  app.put("/targets/:id", async (req: Request, res: Response) => {
    await targetController.update(req, res)
  })

  app.delete("/targets/:id", async (req: Request, res: Response) => {
    await targetController.delete(req, res)
  })

  app.get("/spam", (_req: Request, res: Response) => {
    spamController.create(_req, res)
  })

  app.post("/spam", async (req: Request, res: Response) => {
    await spamController.send(req, res)
  })

  app.listen(port, () => console.log(`Server is listening on port ${port}!`))
}
/*eslint-disable*/
main().catch((err) => console.error(err))
/*eslint-enable*/
