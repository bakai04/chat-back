import { Injectable } from '@nestjs/common';
import { Cron } from "@nestjs/schedule";
import { Mail } from "src/mail/mail.model";
import * as moment from 'moment';


@Injectable()
export class DataCleanerService {
  
  @Cron("* * * * *")
  async cleanOldMail() {
    const now = moment();
    await Mail.destroy({
      where: {
        expiresAt: { $lt: now },
      },
    });
  }
}