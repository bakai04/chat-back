import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.model";
import { UserService } from "./user.service";

@ApiTags("Пользователи")
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({summary:"Создание пользователя"})
  @ApiResponse({status: 200, type: User})
  @Post()
  async create(@Body() userDto: CreateUserDto){
    const newUser = await this.userService.creatUser(userDto);
    return newUser
  } 

  @ApiOperation({summary:"Получение всех пользователей"})
  @ApiResponse({status: 200, type: [User]})
  @Get()
  async getAll(){
    const users = await this.userService.getAllUser();
    return users
  } 

}
