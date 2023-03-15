import { Transporter } from "nodemailer"
import { getTestTransporter } from "../test.utils"
import { MailService } from "./mail.service"

describe("Mail Service", () => {
  let mailService: MailService
  let transporter: Transporter

  beforeEach(() => {
    transporter = getTestTransporter()
    mailService = new MailService(transporter)
  })

  it("should send mail", async () => {
    // await expect(mailService.sendMail()).resolves.not.toThrow()
  })
})
