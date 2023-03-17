import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { RefreshTokenDto } from "./dto/refresh.dto";
import { ConfirmMailDto } from "src/mail/dto/confirmMailDto";
import { LoginDto } from "src/mail/dto/login.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post("/login")
  login(@Body() userDto: LoginDto){
    return this.authService.login(userDto);    
  }

  @Post("/refresh")
  refresh(@Body() refreshToken:RefreshTokenDto){
    return this.authService.refresh(refreshToken);    
  }

  @Post("/sign-up")
  async registration(@Body() userDto: CreateUserDto){
    const user = await this.authService.registration(userDto);    
    return user
  }

  @Post("/confirm")
  async confirmEmail(@Body() userDto: ConfirmMailDto){
    const user = await this.authService.confirmEmail(userDto);    
    return user
  }
}
