import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { Mail } from "./mail.model";
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  providers: [ MailService ],
  imports:[
    SequelizeModule.forFeature([Mail]),
  ],
  controllers: [MailController],
  exports: [MailService]
})
export class MailModule {}
