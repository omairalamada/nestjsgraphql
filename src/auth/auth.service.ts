import { BadRequestException } from '@nestjs/common';
import { LoginUserInput } from './dto/login-user.input';
import { CreateUserInput } from './../users/dto/input/create-user.input';
import { UserModel } from './../users/models/user.model';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne({ where: { username } })

        const valid = await bcrypt.compare(password, user?.password);

        if( user && valid) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: UserModel,) {

        return {
            access_token: this.jwtService.sign({ 
                username: user.username,
                sub: user.userId
            }),
            user,
        }
    }

    async signup(createUserInput: CreateUserInput) {
        const { username } = createUserInput
        const user = await this.userService.findOne({
            where: { username } 
        })

        if(user) throw new BadRequestException('User already exist!');

        const password = await bcrypt.hash(createUserInput.password, 10);

        return this.userService.createUser({
            ...createUserInput,
            password
        })        
    }
}
