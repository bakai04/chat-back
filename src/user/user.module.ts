import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { Roles } from "src/roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([User, Roles, UserRoles]),
    RolesModule,
    forwardRef(()=>AuthModule)
  ],
  exports: [
    UserService,
  ]
})
export class UserModule {}
