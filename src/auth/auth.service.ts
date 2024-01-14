import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './types/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  testUsers: User[];
  saltRounds = 10;

  constructor(private jwtService: JwtService) {
    this.testUsers = [];
  }

  async validateUser(userName: string, password: string): Promise<any> {
    console.log(`AuthService#validateUser userName: ${userName} password: ${password} `);
    let user = null;
    for (const testUser of this.testUsers) {
      if (userName === testUser.name) {
        const isValidPass = await bcrypt.compare(password, testUser.password);
        console.log(testUser,isValidPass);
        if(isValidPass){
          user = testUser;
          break;
        }
      }
    }
    if (user) {
      console.log("User Found:", user);
      return {
        id: user?.id,
        name: user?.name
      };
    } else {
      console.log("User Not Found");
      return null;
    }
  }

  async register(user: User) {
    user.id = (this.testUsers.at(-1)?.id || 0) + 1;
    console.log("bcrypt", bcrypt);
    user.password = await bcrypt.hash(user.password, this.saltRounds);
    this.testUsers.push(user);
    console.log("this.testUsers", this.testUsers);
  }

  login(user: User) {
    const payload = {
      username: user.name,
      sub: user.id
    }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

}
