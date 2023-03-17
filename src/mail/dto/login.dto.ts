import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from "class-validator";

export class LoginDto {
  @ApiProperty({example: "example@gmail.com"})
  @IsString({message:"Должно быть строкой"})
  @IsEmail({}, {message: "Не корректный email"})
  readonly email: string;
  
  @ApiProperty({example: "password"})
  readonly password: string;
}