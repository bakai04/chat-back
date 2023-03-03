import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Роли")
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService){}

  @Post()
  async create(@Body() dto:CreateRoleDto ){
    return await this.roleService.createRole(dto);
  }

  @Get("/:id")
  async getByValue(@Param("id") id: number){
    const role = this.roleService.getById(id)
    return role;
  }

  @Get()
  async getAll(){
    const roles = this.roleService.getAllRoles()
    return roles;
  }

  @Delete("/:id")
  async delete(@Param("id") id: number){
    const deletedRole = await this.roleService.deleteRole(id)
    return deletedRole;
  }
}
