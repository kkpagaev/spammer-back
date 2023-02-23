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

  async create(title: string, content: string) {
    const spam = new Spam()
    spam.title = title
    spam.content = content

    const result = await this.spamRepository.save(spam)

    return result
  }

  async sendSpam(targetIds: number[], dto: CreateSpamDto) {
    await this.validate(dto)

    const targets = await this.targetService.findByIds(targetIds)

    const mails = targets.map((target) => target.email)

    await this.mailService.sendMailList(mails, dto.title, dto.content)
  }
}
