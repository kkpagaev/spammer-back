import { In, Repository } from "typeorm"
import { Service } from "../core/base-service"
import NotFoundException from "../core/exceptions/not-found.exception"
import { CreateTargetDto } from "./dto/create-target.dto"
import { UpdateTargetDto } from "./dto/update-target.dto"
import { Target } from "./entities/target.entity"

export class TargetService extends Service {
  getTotal() {
    return this.targetRepository.count()
  }
  constructor(private targetRepository: Repository<Target>) {
    super()
  }

  async createTarget(dto: CreateTargetDto): Promise<Target> {
    await this.validate(dto)
    const target = this.targetRepository.create(dto)
    return this.targetRepository.save(target)
  }

  async getTarget(id: number): Promise<Target> {
    const target = await this.targetRepository.findOne({
      where: { id },
    })
    if (!target) {
      throw new NotFoundException()
    }
    return target
  }

  async getAll(): Promise<Target[]> {
    const targets = await this.targetRepository.find()

    return targets
  }

  async getTargets(limit: number, offset: number): Promise<Target[]> {
    const targets = await this.targetRepository.find({
      take: limit,
      skip: offset,
    })
    return targets
  }

  async updateTarget(id: number, dto: UpdateTargetDto): Promise<Target> {
    await this.validate(dto)
    const target = await this.getTarget(id)
    const updatedTarget = this.targetRepository.merge(target, dto)
    return this.targetRepository.save(updatedTarget)
  }

  async deleteTarget(id: number): Promise<Target> {
    const target = await this.getTarget(id)
    return this.targetRepository.remove(target)
  }

  async findByIds(targetIds: number[]) {
    const targets = await this.targetRepository.find({
      where: {
        id: In(targetIds),
      },
    })
    return targets
  }
}
