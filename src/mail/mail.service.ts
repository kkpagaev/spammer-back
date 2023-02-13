import { Transporter } from "nodemailer"

export class MailService {
  constructor(private transporter: Transporter) {}

  async sendMail() {
    await this.transporter.sendMail({
      from: "kapagaev111@gmail.com",
      to: "kkpagaev@gmail.com",
      subject: "Hello",
      text: "Hello world",
    })
  }
}
