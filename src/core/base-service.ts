import { validate } from "class-validator"
import { InvalidBodyException } from "./exceptions/invalid-body.exception"

export class Service {
  async validate(dto: any) {
    const errors = await validate(dto)
    if (errors.length > 0) {
      throw new InvalidBodyException(errors)
    }
  }
}
