import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MailModule } from "src/mail/mail.module";
import { UserModule } from "src/user/user.module";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(()=> UserModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || "secret",
      signOptions: { expiresIn: '24h' },
    }),
    MailModule
  ],
  exports: [
    JwtModule,
    AuthService
  ]
})
export class AuthModule {}
