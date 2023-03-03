import { ApiProperty } from "@nestjs/swagger"

export class AddRoleDto {
  @ApiProperty({example:"User | Admin"})
  readonly value: string
  @ApiProperty({example: 1})
  readonly userId: number
}