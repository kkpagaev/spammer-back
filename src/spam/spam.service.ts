import { Repository } from "typeorm"
import { MailService } from "../mail/mail.service"
import { TargetService } from "../targets/target.service"
import { Spam } from "./enitities/spam.enity"

export class SpamService {
  constructor(
    private mailService: MailService,
    private targetService: TargetService,
    private spamRepository: Repository<Spam>
  ) {}

  async create(title: string, content: string) {
    const spam = new Spam()
    spam.title = title
    spam.content = content

    const result = await this.spamRepository.save(spam)

    return result
  }

  async sendSpam() {
    const targets = await this.targetService.getAll()
    const mails = targets.map((target) => target.email)

    await this.mailService.sendMailList(mails, "Spam", "Spam content")
  }
}
