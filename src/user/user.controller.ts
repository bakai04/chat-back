import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesAuthGuard } from "src/roles/roles.guard";
import { Roles } from "src/roles/roles-auth.decorator";
import { AddRoleDto } from "src/roles/dto/add-role.dto";

@ApiTags("Пользователи")
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({summary:"Создание пользователя"})
  @ApiResponse({status: 200, type: User})
  @Roles("Admin")
  @UseGuards(RolesAuthGuard)
  @Post()
  async create(@Body() userDto: CreateUserDto){
    const newUser = await this.userService.creatUser(userDto);
    return newUser
  } 

  @ApiOperation({summary:"Добавить роль для пользователя"})
  @ApiResponse({status: 200, type: AddRoleDto})
  @Roles("Admin")
  @UseGuards(RolesAuthGuard)
  @Post("/role")
  async addRole(@Body() userDto: AddRoleDto){
    const newRole = await this.userService.addRole(userDto);
    return newRole
  } 

  @ApiOperation({summary:"Получение всех пользователей"})
  @ApiResponse({status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(){
    const users = await this.userService.getAllUser();
    return users
  } 

}
