import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: "example@gmail.com"})
  readonly email: string;
  @ApiProperty({example: "password"})
  readonly password: string;
}