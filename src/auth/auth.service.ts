import { LoginUserInput } from './dto/login-user.input';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne({ where: { username} })

        if( user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(loginUserInput: LoginUserInput) {
        const user = await this.userService.findOne({ where: { username: loginUserInput.username } })
        const { password, ...result } = user;

        return {
            access_token: 'jwt',
            user: result
        }
    }
}
