import { Module } from '@nestjs/common';
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Roles } from "./roles.model";
import { User } from "src/user/user.model";
import { UserRoles } from "./user-roles.model";

@Module({
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Roles, User, UserRoles])
  ],
  controllers: [RolesController],
  exports: [
    RolesService
  ]
})
export class RolesModule {}
