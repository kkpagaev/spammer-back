import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UpdateTargetDto {
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
  email: boolean
}
