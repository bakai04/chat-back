import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { RefreshTokenDto } from "./dto/refresh.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post("/login")
  login(@Body() userDto: CreateUserDto){
    return this.authService.login(userDto);    
  }

  @Post("/refresh")
  refresh(@Body() refreshToken:RefreshTokenDto){
    return this.authService.refresh(refreshToken);    
  }

  @Post("/registration")
  async registration(@Body() userDto: CreateUserDto){
    const user = await this.authService.registration(userDto);    
    return user
  }
}
