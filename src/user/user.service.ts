import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "src/roles/dto/add-role.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ){}

 async creatUser(dto: CreateUserDto){
  const user = await this.userRepository.create(dto);
  const role = await this.roleService.getByValue("Admin");
  await user.$set("roles", [role.id]);
  user.roles = [role];
  return user;  
 }

 async getAllUser(){
  const users = await this.userRepository.findAll({include: { all:true }});
  return users;
 }

 async getOne(email:string){
  const user = await this.userRepository.findOne({where:{email}});
  return user
 }

 async addRole(dto: AddRoleDto){
  const user = await this.userRepository.findByPk(dto.userId);
  const role = await this.roleService.getByValue(dto.value);

  if(user && role) {
    await user.$add("roles", role.id);
    return {message: "Операция успешно выполнена"}
  }

  throw new HttpException("Пользователь или роль не найден", HttpStatus.NOT_FOUND);
 }
}
