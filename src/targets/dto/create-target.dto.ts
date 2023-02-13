import { IsString, IsNotEmpty, IsEmail } from "class-validator"

export class CreateTargetDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  surname: string
  @IsString()
  @IsNotEmpty()
  patronymic: string
  @IsEmail()
  @IsNotEmpty()
  email: string
}
