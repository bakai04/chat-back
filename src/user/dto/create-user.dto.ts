import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from "class-validator";

export class CreateUserDto {
  @ApiProperty({example: "example@gmail.com"})
  @IsString({message:"Должно быть строкой"})
  @IsEmail({}, {message: "Не корректный email"})
  readonly email: string;
  
  @Length(6, 16, {message: "Не меньше 6 символов, не больше 16"})
  @ApiProperty({example: "password"})
  readonly password: string;
}