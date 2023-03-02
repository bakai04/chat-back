import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({example: "Админ"})
  readonly value: string;
  @ApiProperty({example: "Описание роли"})
  readonly description: string;
}