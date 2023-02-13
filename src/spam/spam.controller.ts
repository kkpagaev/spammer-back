import { SpamService } from "./spam.service"
import { Request, Response } from "express"
import { CreateSpamDto } from "./dto/create-spam.dto"

export class SpamController {
  constructor(private spamService: SpamService) {}

  async send(req: Request, res: Response) {
    const dto = new CreateSpamDto()
    dto.title = req.body.title
    dto.content = req.body.content

    const targetIdsStr: string[] = req.body.target_id

    const targets = targetIdsStr.map((str: string) => {
      return parseInt(str, 10)
    })

    await this.spamService.sendSpam(targets, dto)

    res.redirect("/spam")
  }

  create(req: Request, res: Response) {
    res.render("spam/create")
  }
}
