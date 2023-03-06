import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "src/user/user.model";
import { RefreshTokenDto } from "./dto/refresh.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ){}

  async login(userDto:CreateUserDto){
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto:CreateUserDto){
    const candidate = await this.userService.getOne(userDto.email);
    if(candidate) {
      throw new HttpException("Пользователь с таким email существует", HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.userService.creatUser({ password: hashPassword, ...userDto});
    return this.generateToken(user);
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

  private async validateUser(userDto:CreateUserDto) {
    const user = await this.userService.getOne(userDto.email);
    const passwordEquals = bcrypt.compare(user.password, userDto.password);
    if(user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({message: "Не правильный пароль или email"});
  }
}
