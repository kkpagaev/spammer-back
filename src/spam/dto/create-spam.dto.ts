import { IsString, IsNotEmpty, IsNumber } from "class-validator"

export class CreateSpamDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  targets: number[]
}
