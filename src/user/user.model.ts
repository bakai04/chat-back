import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Roles } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs{
  email: string,
  passowrd: string,
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {

  @ApiProperty({ example: 1 })
  @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "example@gmail.com" })
  @Column({type:DataType.STRING, unique: true, allowNull: true })
  email: string;

  @ApiProperty({ example: "password" })
  @Column({type:DataType.STRING, allowNull: true})
  password: string;
  
  @ApiProperty({ example: "name" })
  @Column({type:DataType.STRING, allowNull: true})
  userName: string

  @BelongsToMany(() => Roles, () => UserRoles)
  roles: Roles[];

  @Column({type:DataType.BOOLEAN, defaultValue: false})
  isActivate: boolean;
}