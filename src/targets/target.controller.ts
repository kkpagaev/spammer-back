import { TargetService } from "./target.service"
import { Request, Response } from "express"
import { CreateTargetDto } from "./dto/create-target.dto"
import { UpdateTargetDto } from "./dto/update-target.dto"

export class TargetController {
  constructor(private targetService: TargetService) {}

  async list(req: Request, res: Response): Promise<void> {
    const targets = await this.targetService.getAll()

    res.render("target/list", { targets })
  }

  async single(req: Request, res: Response): Promise<void> {
    const id = +req.params.id
    const target = await this.targetService.getTarget(id)

    res.render("target/single", { target })
  }

  async paginate(req: Request, res: Response): Promise<void> {
    const limit = +req.query.limit || 10
    const page = +req.query.page || 1
    const books = await this.targetService.getTargets(page, limit)

    res.status(200).send(books)
  }

  createForm(_req: Request, res: Response) {
    res.render("target/create")
  }

  async create(req: Request, res: Response) {
    const dto = new CreateTargetDto()
    dto.name = req.body.name
    dto.surname = req.body.surname
    dto.patronymic = req.body.patronymic
    dto.email = req.body.email

    const target = await this.targetService.createTarget(dto)

    res.redirect(`/targets/${target.id}`)
  }

  async getOne(req: Request, res: Response) {
    const id = +req.params.id
    const target = await this.targetService.getTarget(id)

    res.status(200).send(target)
  }

  async updateForm(req: Request, res: Response) {
    const id = +req.params.id
    const target = await this.targetService.getTarget(id)

    res.render("target/update", { target })
  }

  async update(req: Request, res: Response) {
    const id = +req.params.id
    const dto = new UpdateTargetDto()
    dto.name = req.body.name
    dto.surname = req.body.surname
    dto.patronymic = req.body.patronymic
    dto.email = req.body.email

    const target = await this.targetService.updateTarget(id, dto)

    res.redirect(`/targets/${target.id}`)
  }

  async delete(req: Request, res: Response) {
    const id = +req.params.id
    await this.targetService.deleteTarget(id)

    res.redirect("/targets")
  }
}
