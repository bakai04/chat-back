import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RefreshTokenDto {
  @ApiProperty({example: "token"})
  @IsString({message:"Должно быть строкой"})
  readonly refresh_token: string;
}