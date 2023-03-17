import { MailerService } from "@nestjs-modules/mailer";
import * as randomstring from 'randomstring';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Mail } from "./mail.model";
import { ConfirmMailDto } from "./dto/confirmMailDto";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class MailService {
  constructor(
    @InjectModel(Mail) private mailRepository: typeof Mail,
    private mailerService: MailerService
  ){}

  protected async addConfirmCode( mailDto: ConfirmMailDto ){
    return await this.mailRepository.create(mailDto);
  }

  async sendConfirmationCode( to: string ) {
    const code:string = randomstring.generate({ length: 6, charset: 'numeric'});
    await this.mailerService.sendMail({
      to,
      subject: 'Confirmation Code',
      text: `Your confirmation code is ${code}`,
    });
    await this.addConfirmCode({email: to, code})
    return new HttpException("Мы отправили на вашу почту код подтверждение", HttpStatus.OK);
  }
  
  async verifyCode (confirmDto:ConfirmMailDto) {
    const confirmationCode = await this.mailRepository.findOne({where: {email: confirmDto.email}});

    if(!confirmationCode) {
      throw new HttpException("email не существует или срок уже истёк", HttpStatus.BAD_REQUEST);
    }

    if(confirmationCode.code !== confirmDto.code) {
      throw new HttpException("Не правильный код", HttpStatus.BAD_REQUEST)
    }

    return true 
  }
}
