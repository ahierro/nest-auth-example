import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './types/User';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    console.log("AuthController#login:", req.user);
    // req.user is the same as returned in LocalStrategy#validate
    return this.authService.login(req.user);
  }

  @Post("register")
  async register(@Body() user:User) {
    return this.authService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    console.log("AuthController#getProfile:", req.user);
    return req.user;
  }

}
