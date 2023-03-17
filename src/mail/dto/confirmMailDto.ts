import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from "class-validator";

export class ConfirmMailDto {
  @IsString({message:"Должно быть строкой"})
  @IsEmail({}, {message: "Не корректный email"})
  @ApiProperty({example: "example@gmail.com"})
  readonly email: string;
  
  @Length(6, 16, {message: "Не меньше 6 символов, не больше 16"})
  @ApiProperty({example: "password"})
  readonly code: string;
}