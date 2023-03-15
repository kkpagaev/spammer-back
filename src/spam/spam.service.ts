import { Repository } from "typeorm"
import { Service } from "../core/base-service"
import { MailService } from "../mail/mail.service"
import { TargetService } from "../targets/target.service"
import { CreateSpamDto } from "./dto/create-spam.dto"
import { Spam } from "./enitities/spam.enity"

export class SpamService extends Service {
  constructor(
    private mailService: MailService,
    private targetService: TargetService,
    private spamRepository: Repository<Spam>
  ) {
    super()
  }

  async getAll() {
    const spams = await this.spamRepository.find()

    return spams
  }
  async findOrCreate(dto: CreateSpamDto) {
    const spam = await this.spamRepository.findOne({
      where: {
        title: dto.title,
        content: dto.content,
      },
    })

    if (!spam) {
      return await this.create(dto)
    }

    return spam
  }

  async create(dto: CreateSpamDto) {
    await this.validate(dto)
    const spam = new Spam()
    spam.title = dto.title
    spam.content = dto.content

    const result = await this.spamRepository.save(spam)

    return result
  }

  async sendSpam(targetIds: number[], spam: Spam) {
    const targets = await this.targetService.findByIds(targetIds)

    const mails = targets.map((target) => target.email)

    await this.mailService.sendMailList(mails, spam.title, spam.content)
  }
}
