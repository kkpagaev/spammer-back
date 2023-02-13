export interface MailConfig {
  host: string
  port: number
  user: string
  pass: string
}

export function getMailConfig(): MailConfig {
  return {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
}
