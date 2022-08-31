import { CreateUserInput } from './../users/dto/input/create-user.input';
import { UserModel } from './../users/models/user.model';
import { GqlAuthGuard } from './gql.auth.guard';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from './auth.service';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
        return this.authService.login(context.user);
    }

    @Mutation(() => UserModel)
    signup(@Args('registerUserInput') createUserInput: CreateUserInput) {
        return this.authService.signup(createUserInput)
    }
}
