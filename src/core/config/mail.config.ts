export interface SMTPConfig {
  host: string
  port: number
  user: string
  pass: string
}

export interface GmailConfig {
  service: string
  auth: {
    user: string
    pass: string
  }
}

export type MailConfig = SMTPConfig | GmailConfig

export function getMailConfig(): MailConfig {
  if (process.env.NODE_ENV !== "test") {
    return {
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    }
  }
  return {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
}
