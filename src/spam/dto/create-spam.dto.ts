import { IsString, IsNotEmpty } from "class-validator"

export class CreateSpamDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string
}
