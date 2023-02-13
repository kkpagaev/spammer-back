import { TargetService } from "./target.service"
import { Request, Response } from "express"
import { CreateTargetDto } from "./dto/create-target.dto"
import { UpdateTargetDto } from "./dto/update-target.dto"

export class TargetController {
  constructor(private targetService: TargetService) {}

  async paginate(req: Request, res: Response): Promise<void> {
    const limit = +req.query.limit || 10
    const page = +req.query.page || 1
    const books = await this.targetService.getTargets(page, limit)

    res.status(200).send(books)
  }

  async create(req: Request, res: Response) {
    const dto = new CreateTargetDto()
    dto.name = req.body.name
    dto.surname = req.body.surname
    dto.patronymic = req.body.patronymic
    dto.email = req.body.email

    const target = await this.targetService.createTarget(dto)

    res.status(201).send(target)
  }

  async getOne(req: Request, res: Response) {
    const id = +req.params.id
    const target = await this.targetService.getTarget(id)

    res.status(200).send(target)
  }

  async update(req: Request, res: Response) {
    const id = +req.params.id
    const dto = new UpdateTargetDto()
    dto.name = req.body.name
    dto.surname = req.body.surname
    dto.patronymic = req.body.patronymic
    dto.email = req.body.email

    const target = await this.targetService.updateTarget(id, dto)

    res.status(200).send(target)
  }

  async delete(req: Request, res: Response) {
    const id = +req.params.id
    await this.targetService.getTarget(id)

    res.status(204).send()
  }
}
