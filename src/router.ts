import { Application, Request, Response } from "express"
import { exceptionFilter } from "./core/exception-filter"

export class APIRouter {
  constructor(private app: Application) {}

  get(path: string, callback: (req: Request, res: Response) => Promise<void>) {
    this.app.get("/api" + path, async (req: Request, res: Response) => {
      await exceptionFilter(async () => {
        await callback(req, res)
      }, res)
    })
  }

  post(path: string, callback: (req: Request, res: Response) => Promise<void>) {
    this.app.post("/api" + path, async (req: Request, res: Response) => {
      await exceptionFilter(async () => {
        await callback(req, res)
      }, res)
    })
  }

  put(path: string, callback: (req: Request, res: Response) => Promise<void>) {
    this.app.put("/api" + path, async (req: Request, res: Response) => {
      await exceptionFilter(async () => {
        await callback(req, res)
      }, res)
    })
  }

  delete(
    path: string,
    callback: (req: Request, res: Response) => Promise<void>
  ) {
    this.app.delete("/api" + path, async (req: Request, res: Response) => {
      await exceptionFilter(async () => {
        await callback(req, res)
      }, res)
    })
  }
}
