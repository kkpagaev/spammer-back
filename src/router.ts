import { Application, Request, Response } from "express"
import { exceptionFilter } from "./core/exception-filter"

export class Router {
  constructor(private app: Application) {}

  get(path: string, callback: (req: Request, res: Response) => Promise<void>) {
    this.app.get(path, async (req: Request, res: Response) => {
      await exceptionFilter(async () => {
        await callback(req, res)
      }, res)
    })
  }

  post(path: string, callback: (req: Request, res: Response) => Promise<void>) {
    this.app.post(path, async (req: Request, res: Response) => {
      await exceptionFilter(async () => {
        await callback(req, res)
      }, res)
    })
  }

  put(path: string, callback: (req: Request, res: Response) => Promise<void>) {
    this.app.put(path, async (req: Request, res: Response) => {
      await exceptionFilter(async () => {
        await callback(req, res)
      }, res)
    })
  }

  delete(
    path: string,
    callback: (req: Request, res: Response) => Promise<void>
  ) {
    this.app.delete(path, async (req: Request, res: Response) => {
      await exceptionFilter(async () => {
        await callback(req, res)
      }, res)
    })
  }
}
