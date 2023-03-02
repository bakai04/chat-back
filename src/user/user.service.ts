import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ){}

 async creatUser(dto: CreateUserDto){
  const user = await this.userRepository.create(dto);
  // const role = await this.roleService.getByValue("USER");
  // console.log(role);
  // await user.$set("roles", [role.id]);
  return user;  
 }

 async getAllUser(){
  const users = await this.userRepository.findAll();
  return users;
 }
}
