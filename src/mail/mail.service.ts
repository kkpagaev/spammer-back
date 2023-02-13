import { Transporter } from "nodemailer"

export class MailService {
  constructor(private transporter: Transporter) {}

  async sendMail() {
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: "kkpagaev@gmail.com",
      subject: "Hello",
      text: "Hello world",
    })
  }

  async sendMailList(emails: string[], subject: string, text: string) {
    const result = await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: emails,
      subject,
      text,
    })

    return result
  }
}
