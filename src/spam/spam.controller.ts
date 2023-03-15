import { Request, Response } from "express"
import { CreateSpamDto } from "./dto/create-spam.dto"
import { SpamService } from "./spam.service"

export class SpamController {
  constructor(private spamService: SpamService) {}

  async send(req: Request, res: Response) {
    const dto = new CreateSpamDto()
    dto.title = req.body.title
    dto.content = req.body.content

    dto.targets = req.body.targets

    const spam = await this.spamService.findOrCreate(dto)

    await this.spamService.sendSpam(dto.targets, spam)

    res.status(200).json({
      message: "success",
    })
  }

  async getAll(_req: Request, res: Response) {
    const spams = await this.spamService.getAll()

    res.status(200).json({
      message: "success",
      data: spams,
    })
  }
}
