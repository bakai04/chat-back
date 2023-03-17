import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from "./user/user.model";
import { RolesModule } from './roles/roles.module';
import { Roles } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { MailerModule } from "@nestjs-modules/mailer";
import { Mail } from "./mail/mail.model";
import { ScheduleModule } from "@nestjs/schedule";
import { DataCleanerService } from "./providers/data-cleaner/data-cleaner.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Roles, UserRoles, Mail],
      autoLoadModels: true,
    }),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
    
    ScheduleModule.forRoot(),
    UserModule,
    RolesModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, DataCleanerService],
})
export class AppModule {}