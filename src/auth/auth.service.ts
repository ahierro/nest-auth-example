import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './types/User';

@Injectable()
export class AuthService {

  testUser: User;

  constructor() {
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

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
