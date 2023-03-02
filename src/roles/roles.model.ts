import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from "src/user/user.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs{
  value: string,
  description: string,
}

@Table({ tableName: 'roles' })
export class Roles extends Model<Roles, RoleCreationAttrs> {
  
  @ApiProperty({ example: 1 })
  @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "Админ", description:"Уникальное название" }, )
  @Column({type:DataType.STRING, unique: true, allowNull: true })
  value: string;

  @ApiProperty({ example: "Администратор проекта", description: "Описание роли" })
  @Column({type:DataType.STRING, allowNull: true})
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}