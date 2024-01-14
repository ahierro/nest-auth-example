import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from './../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        //passwordField default 'password'
        //usernameField default 'username'
        super({usernameField: 'username', passwordField:'password'});
    }

     validate(username: string, password: string){
        console.log(`LocalStrategy#validate userName: ${username} password: ${password} `)
        const user = this.authService.validateUser(username,password);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}