import { TargetService } from "./target.service"
import { Request, Response } from "express"
import { CreateTargetDto } from "./dto/create-target.dto"
import { UpdateTargetDto } from "./dto/update-target.dto"
import { Target } from "./entities/target.entity"
import { PaginationResponse } from "../core/reponses/pagination-responce"

export class TargetController {
  constructor(private targetService: TargetService) {}

  async list(_req: Request, res: Response): Promise<void> {
    const targets = await this.targetService.getAll()

    res.json(targets)
  }

  async single(req: Request, res: Response): Promise<void> {
    const id = +req.params.id
    const target = await this.targetService.getTarget(id)

    res.json(target)
  }

  async paginate(req: Request, res: Response): Promise<void> {
    const limit = +req.query.limit || 10
    const page = +req.query.page || 1
    const books = await this.targetService.getTargets(
      limit,
      page * limit - limit
    )
    const total = await this.targetService.getTotal()
    const response = {
      data: books,
      total,
      page,
      limit,
    } as PaginationResponse<Target>

    res.json(response)
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

  async update(req: Request, res: Response) {
    const id = +req.params.id
    const dto = new UpdateTargetDto()
    dto.name = req.body.name
    dto.surname = req.body.surname
    dto.patronymic = req.body.patronymic
    dto.email = req.body.email

    try {
      const target = await this.targetService.updateTarget(id, dto)

      res.redirect(`/targets/${target.id}`)
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  async delete(req: Request, res: Response) {
    const id = +req.params.id

    try {
      await this.targetService.deleteTarget(id)

      res.status(204).send()
    } catch (e) {
      res.status(400).send(e.message)
    }
  }
}
