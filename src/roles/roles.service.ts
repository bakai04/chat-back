import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Roles } from "./roles.model";

@Injectable()
export class RolesService {
  constructor(@InjectModel( Roles ) private roleRepository: typeof Roles){}
  
  async createRole(dto:CreateRoleDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getById(id:number) {
    const role = await this.roleRepository.findOne({ where: {id} });
    return role;
  }

  async getByValue(value:string) {
    const role = await this.roleRepository.findOne({ where: {value} });
    return role;
  }

  async getAllRoles() {
    const roles = await this.roleRepository.findAll();
    return roles;
  }

  async deleteRole(id:number) {
    const deletedRole = await this.roleRepository.destroy({ where: {id} })
    return deletedRole
  }
}
