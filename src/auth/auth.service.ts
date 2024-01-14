import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './types/User';

@Injectable()
export class AuthService {

  testUser: User;

  constructor(private jwtService: JwtService) {
    this.testUser = {
      id: 1,
      name: 'ale',
      password: 'test'
    };
  }

  validateUser(userName: string, password: string): any {
    console.log(`AuthService#validateUser userName: ${userName} password: ${password} `)

    if (userName === this.testUser.name && password === this.testUser.password) {
      return {
        id: this.testUser?.id,
        name: this.testUser?.name
      };
    }
    return null;
  }

  register(user: User){
    this.testUser = user;
    console.log("this.testUser",this.testUser);
  }

  login(user: User){
    const payload = {
      username: user.name,
      sub: user.id
    }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}
