import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from "./jwt-auth.guard";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(()=> UserModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "secret",
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [
    JwtModule,
    AuthService
  ]
})
export class AuthModule {}
