import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { ValidationPipe } from "../pipes/validationPipe";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post("/login")
  login(@Body() userDto: CreateUserDto){
    return this.authService.login(userDto);    
  }

  @Post("/registration")
  async registration(@Body() userDto: CreateUserDto){
    const user = await this.authService.registration(userDto);    
    return user
  }
}
