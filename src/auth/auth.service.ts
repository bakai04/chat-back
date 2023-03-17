import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "src/user/user.model";
import { RefreshTokenDto } from "./dto/refresh.dto";
import { MailService } from "src/mail/mail.service";
import { ConfirmMailDto } from "src/mail/dto/confirmMailDto";
import { LoginDto } from "src/mail/dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailerService: MailService,
  ){}

  async login(userDto:LoginDto){
    const user = await this.validateUser(userDto);
    if(user){
      return this.generateToken(user);
    }
  }

  async confirmEmail(confirmDto: ConfirmMailDto) {
    const isValidCode = await this.mailerService.verifyCode(confirmDto);

    if(isValidCode) {
      const user = await this.userService.getOne(confirmDto.email);
      user.isActivate = true;
      user.save();
      return new HttpException("Вы успешно зарегистрировались", HttpStatus.OK);
    }
  }

  async registration(userDto:CreateUserDto){
    const isValidUser = await this.validateForRegistration(userDto);

    if(isValidUser) {
      const hashPassword = await bcrypt.hash(userDto.password, 5);
      await this.userService.creatUser({...userDto, password: hashPassword,});
      return await this.mailerService.sendConfirmationCode(userDto.email);
    }
  }

  async refresh(refreshToken: RefreshTokenDto) {
    try {
      const userDto = this.jwtService.verify(refreshToken.refresh_token);
      const payload = { email: userDto.email, id: userDto.id, roles: userDto.roles }
      const accessToken = this.jwtService.sign(payload);
      return { access_token: accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  } 

  private async generateToken(userDto:User) {
    const payload = { email: userDto.email, id: userDto.id, roles: userDto.roles }
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      })
    }
  }

  private async validateForRegistration(userDto: CreateUserDto){
    const candidate = await this.userService.getOne(userDto.email);
    if(candidate) {
      throw new HttpException("Пользователь с таким email существует", HttpStatus.BAD_REQUEST);
    } else {
      return true
    }
  }

  private async validateUser(userDto:LoginDto) {
    const user = await this.userService.getOne(userDto.email);
    if(user && user.isActivate) {
      const passwordEquals = await bcrypt.compare(userDto.password, user.password);
      if(passwordEquals){
        return user
      }     
    }
    throw new UnauthorizedException({message: "Не правильный пароль или email"});
  }
}
