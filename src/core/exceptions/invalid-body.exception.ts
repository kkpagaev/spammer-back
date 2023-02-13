import { ValidationError } from "class-validator"

export class InvalidBodyException extends Error {
  public errors: ValidationError[]
  constructor(errors: ValidationError[]) {
    super("Invalid body")
    this.errors = errors
  }
}
