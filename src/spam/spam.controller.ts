import { SpamService } from "./spam.service"
import { Request, Response } from "express"

export class SpamController {
  constructor(private spamService: SpamService) {}

  async send(req: Request, res: Response) {
    // const { title, content } = req.body

    // const result = await this.spamService.create(title, content)

    await this.spamService.sendSpam()

    res.redirect("/spam")
  }

  create(_req: Request, res: Response) {
    res.render("spam/create")
  }
}
